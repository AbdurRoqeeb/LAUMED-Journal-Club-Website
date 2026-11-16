-- LAUMED Journal Club: public content (issues, articles, events, resources, editorial board)

create table public.journal_issues (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tagline text,
  volume int,
  number int,
  published_on date,
  cover_url text,
  page_count int,
  is_free boolean not null default true,
  file_url text, -- public PDF URL (free issues only). Paid files live in protected_files.
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.publications (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid references public.journal_issues (id) on delete set null,
  slug text not null unique,
  title text not null,
  authors jsonb not null default '[]'::jsonb, -- [{"name": "...", "affiliation": "..."}]
  article_type text,
  specialty text,
  abstract text,
  keywords text[] not null default '{}',
  page_start int,
  published_on date,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  starts_at timestamptz,
  ends_at timestamptz,
  venue text,
  banner_url text,
  registration_url text,
  is_tentative boolean not null default false,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  url text not null,
  category text,
  sort_order int not null default 0,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.editorial_board (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  photo_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index publications_issue_id_idx on public.publications (issue_id);
create index events_starts_at_idx on public.events (starts_at);

-- RLS + updated_at for the four tables that have a publish status
do $$
declare
  t text;
begin
  foreach t in array array['journal_issues', 'publications', 'events', 'resources'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format(
      'create policy "public read published" on public.%I for select using (status = ''published'')', t);
    execute format(
      'create policy "editors manage" on public.%I for all to authenticated using (public.can_edit()) with check (public.can_edit())', t);
    execute format(
      'create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  end loop;
end
$$;

alter table public.editorial_board enable row level security;

create policy "public read active board"
  on public.editorial_board for select
  using (is_active);

create policy "editors manage board"
  on public.editorial_board for all to authenticated
  using (public.can_edit())
  with check (public.can_edit());

create trigger set_updated_at
  before update on public.editorial_board
  for each row execute function public.set_updated_at();