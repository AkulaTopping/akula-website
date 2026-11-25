-- ============================================================================
-- Migration 001: Products table and Row Level Security
-- ============================================================================

create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  legacy_id integer,
  slug text not null unique,
  name_en text not null,
  name_ar text not null,
  tag text not null,
  category text not null check (category in ('topping', 'fruit')),
  description_en text not null,
  description_ar text not null,
  image_url text not null,
  image_path text,
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  intro_en text,
  intro_ar text,
  uses_en text[] not null default '{}',
  uses_ar text[] not null default '{}',
  method_en text,
  method_ar text,
  weight_en text,
  weight_ar text,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_status_sort_idx
  on public.products (status, sort_order, created_at);

create index if not exists products_category_status_idx
  on public.products (category, status, sort_order);

-- Automatically maintain updated_at timestamp on updates
create or replace function public.set_products_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
  before update on public.products
  for each row
  execute function public.set_products_updated_at();

-- Enable Row Level Security and PostgreSQL privileges
alter table public.products enable row level security;

grant usage on schema public to anon, authenticated, service_role;
revoke all on table public.products from anon, authenticated;
grant select on table public.products to anon, authenticated;
grant all on table public.products to service_role;

-- Public visitors (anon/authenticated) may only read published products.
-- Admin mutations and draft/archived reads go through server-side Next.js API
-- routes using SUPABASE_SERVICE_ROLE_KEY after HTTP-only session verification.
drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products"
  on public.products
  for select
  to anon, authenticated
  using (status = 'published');

notify pgrst, 'reload schema';
