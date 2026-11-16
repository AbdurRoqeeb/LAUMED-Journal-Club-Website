-- LAUMED Journal Club: core (admin roles, helper functions, site settings)

create type public.admin_role as enum ('super_admin', 'editor', 'moderator');
create type public.content_status as enum ('draft', 'published', 'archived');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role public.admin_role not null default 'moderator',
  created_at timestamptz not null default now()
);

alter table public.admin_profiles enable row level security;

create or replace function public.has_admin_role(allowed public.admin_role[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = (select auth.uid())
      and role = any (allowed)
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.has_admin_role(array['super_admin']::public.admin_role[]);
$$;

-- super_admin or editor: manages content and orders
create or replace function public.can_edit()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.has_admin_role(array['super_admin', 'editor']::public.admin_role[]);
$$;

-- any admin account, including moderators
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.has_admin_role(array['super_admin', 'editor', 'moderator']::public.admin_role[]);
$$;

create policy "read own profile"
  on public.admin_profiles for select to authenticated
  using (user_id = (select auth.uid()));

create policy "super admins manage profiles"
  on public.admin_profiles for all to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

-- Public, non-secret settings only (contact email, social links, banner text).
-- Never store keys or secrets here: everything in this table is world-readable.
create table public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "public read settings"
  on public.site_settings for select
  using (true);

create policy "super admins write settings"
  on public.site_settings for all to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

create trigger set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();