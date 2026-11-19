create type public.request_status as enum ('new', 'planned', 'done', 'declined');

create table public.feature_requests (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 150),
  details text check (char_length(details) <= 2000),
  status public.request_status not null default 'new',
  submitted_by uuid default auth.uid() references auth.users (id) on delete set null,
  submitted_name text,
  created_at timestamptz not null default now()
);

alter table public.feature_requests enable row level security;

-- The submitter's name always comes from their admin profile, never from the browser
create or replace function public.set_request_submitter()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.submitted_name := coalesce(
    (select full_name from public.admin_profiles where user_id = (select auth.uid())),
    'Unknown'
  );
  return new;
end;
$$;

create trigger set_submitter
  before insert on public.feature_requests
  for each row execute function public.set_request_submitter();

create policy "staff add requests"
  on public.feature_requests for insert to authenticated
  with check (public.is_staff() and submitted_by = (select auth.uid()) and status = 'new');

create policy "staff read requests"
  on public.feature_requests for select to authenticated
  using (public.is_staff());

create policy "super admins update requests"
  on public.feature_requests for update to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "super admins delete requests"
  on public.feature_requests for delete to authenticated
  using (public.is_super_admin());