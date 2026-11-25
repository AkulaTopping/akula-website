# Akula Topping — Centralized Product Admin & Supabase Setup Guide

This guide explains how to configure the **single-admin authentication**, **Supabase PostgreSQL** product catalog, and **Supabase Storage** bucket so all website visitors immediately see admin updates without redeploying.

---

## 1. Environment Variables

Copy `.env.example` to `.env.local` for local development (and add the exact same variables in your **Vercel Dashboard → Project → Settings → Environment Variables**):

| Variable | Visibility | Purpose |
|---|---|---|
| `ADMIN_EMAIL` | Server-only | Sole administrator email allowed to sign in (`Akulatopping@gmail.com`). |
| `ADMIN_PASSWORD_HASH` | Server-only | Salted `scrypt` password hash (`scrypt:<saltHex>:<hashHex>`). Generate via `pnpm run admin:hash "your-password"`. Never store plaintext passwords in source code. |
| `ADMIN_SESSION_SECRET` | Server-only | Random secret (>= 32 chars, e.g. 64 hex chars) used to sign HTTP-only session cookies via HMAC-SHA256. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. |
| `NEXT_PUBLIC_SUPABASE_URL` | Public + Server | Supabase project URL (`https://<project-ref>.supabase.co`). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public + Server | Supabase Publishable (`sb_publishable_...`) or legacy `anon` public key. Used for reading `published` products under Row Level Security. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-only** | Privileged Supabase Secret (`sb_secret_...`) or legacy `service_role` key. **Never** prefix with `NEXT_PUBLIC_` or expose in client code. Used strictly inside `/api/admin/**` and `/admin` SSR after HTTP-only cookie verification. |
| `SUPABASE_STORAGE_BUCKET` | Server-only (optional) | Storage bucket name for uploaded product images (defaults to `product-images`). |

### Generate or Rotate Admin Credentials

```bash
pnpm run admin:hash "<new-password>"
```

Copy the printed `ADMIN_PASSWORD_HASH=...` line into `.env.local` (locally) and Vercel Environment Variables (production). Changing `ADMIN_EMAIL` or `ADMIN_SESSION_SECRET` immediately invalidates existing admin cookies.

---

## 2. Database & Storage Migrations (Supabase)

Open your **Supabase Dashboard → SQL Editor** and execute the migrations in order:

1. [`supabase/migrations/001_create_products.sql`](./supabase/migrations/001_create_products.sql)
   - Creates `public.products` with constraints (`category in ('topping', 'fruit')`, `status in ('draft', 'published', 'archived')`).
   - Adds indexes, automatic `updated_at` trigger, table privileges, and RLS policy `"Public can read published products"`.
2. [`supabase/migrations/002_seed_products.sql`](./supabase/migrations/002_seed_products.sql)
   - Idempotently seeds all 15 initial products (`chocolate`, `caramel`, `condensed-milk`, `salted-caramel`, `watermelon`, `blueberry`, `pineapple`, `passion-fruit`, `strawberry`, `raspberry`, `mixberry`, `mango`, `peach`, `kiwi`, `green-apple`) with status `'published'`.
3. [`supabase/migrations/003_storage_bucket.sql`](./supabase/migrations/003_storage_bucket.sql)
   - Creates public Storage bucket `product-images` (`4 MB` file size limit, `image/jpeg`, `image/png`, `image/webp` only).
   - Grants public `SELECT` access to `product-images` so uploaded product photos load seamlessly for all visitors while blocking direct public uploads/deletes.
4. [`supabase/migrations/004_grant_products_permissions.sql`](./supabase/migrations/004_grant_products_permissions.sql)
   - Explicitly grants schema usage (`anon`, `authenticated`, `service_role`), `SELECT` on `public.products` (`anon`, `authenticated`), and full table privileges to `service_role`.

---

## 3. Security Model Overview

- **Single Admin Only**: Login checks both email equality (`ADMIN_EMAIL`) and `scrypt` password hash using `crypto.timingSafeEqual`. Session verification re-checks `ADMIN_EMAIL` on every request.
- **HTTP-Only Signed Cookies**: Sessions live inside `akula_admin_session` (`HttpOnly`, `SameSite=Lax`, `Secure` in production, signed via HMAC-SHA256). Client JavaScript cannot read the cookie.
- **Brute-Force Protection**: `/api/admin/login` applies failed-attempt rate limiting per client IP plus constant verification delay.
- **Server-Side Enforcement Everywhere**:
  - `/admin` (`src/app/admin/page.tsx`) verifies the HTTP-only cookie server-side and redirects unauthenticated requests to `/admin/login`.
  - All `/api/admin/products`, `/api/admin/products/[id]`, `/api/admin/upload`, and `/api/admin/session` handlers validate the signed cookie on the server before calling Supabase with `SUPABASE_SERVICE_ROLE_KEY`.
  - `/api/admin/upload` checks MIME type, 4 MB limit, and binary image file signatures (magic bytes) before uploading to Supabase Storage.

---

## 4. How Public Catalog Updates Work Immediately

- All public catalog pages (`/`, `/products`, `/products/[slug]`, `/store`, `/sitemap.xml`) use Next.js dynamic server rendering (`export const dynamic = "force-dynamic"`) and fetch published rows from PostgreSQL via `src/lib/products-repository.ts` with `cache: "no-store"`.
- Creating, editing, publishing, archiving, or deleting a product in `/admin` immediately calls PostgreSQL + `revalidatePath(...)` and becomes visible on the public website for all visitors without redeploying.
- While Supabase environment variables are still blank (before setup), the public storefront gracefully renders the built-in 15-item fallback catalog so preview builds stay functional, while `/admin` clearly notifies the administrator to connect Supabase before managing live records.

---

## 5. Admin Routes

- **Login**: `/admin/login`
- **Dashboard**: `/admin`
