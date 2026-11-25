-- ============================================================================
-- Migration 003: Supabase Storage bucket for product images
-- ============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  4194304, -- 4 MB max upload size
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public read access so visitors can render uploaded product images.
-- Uploads and deletions are executed exclusively on the server through
-- authenticated Next.js admin routes using SUPABASE_SERVICE_ROLE_KEY.
drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'product-images');
