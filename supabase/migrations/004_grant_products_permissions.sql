-- ============================================================================
-- Migration 004: Grant PostgreSQL schema & table privileges + harden function
-- ============================================================================
-- PostgreSQL requires explicit table GRANTs in addition to RLS policies.
-- Public visitors (anon/authenticated) get SELECT only (filtered to published
-- rows by RLS). Server-side admin APIs using service_role get full access.

grant usage on schema public to anon, authenticated, service_role;

revoke all on table public.products from anon, authenticated;
grant select on table public.products to anon, authenticated;
grant all on table public.products to service_role;

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

notify pgrst, 'reload schema';
