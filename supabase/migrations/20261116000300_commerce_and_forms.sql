-- LAUMED Journal Club: book pre-orders, protected files, membership, contact

create type public.product_format as enum ('printed', 'digital');
create type public.delivery_method as enum ('pickup', 'delivery', 'digital');
create type public.order_status as enum ('pending', 'paid', 'fulfilled', 'cancelled', 'refunded');
create type public.application_status as enum ('pending', 'approved', 'rejected');

-- Products: abstract book, full journal, and so on. Prices are in kobo (NGN x 100).
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  format public.product_format not null,
  price_kobo int not null check (price_kobo >= 0),
  currency text not null default 'NGN',
  issue_id uuid references public.journal_issues (id) on delete set null,
  -- Set this to the abstract book's id to enforce "only abstract-book buyers can
  -- order the full journal". Leave null for no restriction (rules not yet confirmed).
  requires_product_id uuid references public.products (id) on delete set null,
  available_from timestamptz,
  available_until timestamptz,
  stock int check (stock is null or stock >= 0), -- null = unlimited
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "public read active products"
  on public.products for select
  using (is_active);

create policy "editors manage products"
  on public.products for all to authenticated
  using (public.can_edit())
  with check (public.can_edit());

create trigger set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- Where the paid files live in Cloudflare R2. Staff only; served later by a Worker
-- after payment is confirmed.
create table public.protected_files (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  r2_bucket text not null default 'laumed-private',
  r2_key text not null,
  created_at timestamptz not null default now(),
  unique (r2_bucket, r2_key)
);

alter table public.protected_files enable row level security;

create policy "editors manage protected files"
  on public.protected_files for all to authenticated
  using (public.can_edit())
  with check (public.can_edit());

-- Orders (bookings). Personal data: no public access of any kind.
-- Visitors place orders through place_order() below; the price is always
-- calculated on the server, never taken from the browser.
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_ref text not null unique
    default 'LJC-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8)),
  product_id uuid not null references public.products (id),
  buyer_name text not null check (char_length(buyer_name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 200 and position('@' in email) > 1),
  phone text not null check (char_length(phone) between 7 and 30),
  quantity int not null default 1 check (quantity between 1 and 20),
  delivery_method public.delivery_method not null,
  delivery_address text check (char_length(delivery_address) <= 500),
  amount_kobo int not null check (amount_kobo >= 0),
  status public.order_status not null default 'pending',
  payment_reference text,
  paid_at timestamptz,
  notes text,
  consent boolean not null check (consent),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (delivery_method <> 'delivery' or delivery_address is not null)
);

create index orders_email_idx on public.orders (lower(email));
create index orders_product_status_idx on public.orders (product_id, status);

alter table public.orders enable row level security;

create policy "editors read orders"
  on public.orders for select to authenticated
  using (public.can_edit());

create policy "editors update orders"
  on public.orders for update to authenticated
  using (public.can_edit())
  with check (public.can_edit());

create policy "super admins delete orders"
  on public.orders for delete to authenticated
  using (public.is_super_admin());

create trigger set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

create or replace function public.place_order(
  p_product_id uuid,
  p_buyer_name text,
  p_email text,
  p_phone text,
  p_quantity int,
  p_delivery_method public.delivery_method,
  p_delivery_address text,
  p_consent boolean
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  p public.products%rowtype;
  v_ref text;
begin
  if not coalesce(p_consent, false) then
    raise exception 'Consent is required to place an order';
  end if;

  select * into p from public.products where id = p_product_id;
  if not found or not p.is_active then
    raise exception 'This product is not available';
  end if;
  if p.available_from is not null and now() < p.available_from then
    raise exception 'Pre-orders have not opened yet';
  end if;
  if p.available_until is not null and now() > p.available_until then
    raise exception 'Pre-orders have closed';
  end if;
  if p.stock is not null and p.stock < p_quantity then
    raise exception 'Not enough copies available';
  end if;
  if p.requires_product_id is not null and not exists (
    select 1
    from public.orders o
    where o.product_id = p.requires_product_id
      and lower(o.email) = lower(trim(p_email))
      and o.status in ('paid', 'fulfilled')
  ) then
    raise exception 'This item can only be ordered by buyers of the required companion product';
  end if;

  insert into public.orders (
    product_id, buyer_name, email, phone, quantity,
    delivery_method, delivery_address, amount_kobo, consent
  )
  values (
    p.id, trim(p_buyer_name), trim(p_email), trim(p_phone), p_quantity,
    p_delivery_method, nullif(trim(p_delivery_address), ''), p.price_kobo * p_quantity, true
  )
  returning order_ref into v_ref;

  return v_ref;
end;
$$;

-- A buyer can check their own order with the reference plus the email used.
create or replace function public.get_order_status(p_order_ref text, p_email text)
returns table (
  order_ref text,
  product_name text,
  quantity int,
  amount_kobo int,
  status public.order_status,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select o.order_ref, p.name, o.quantity, o.amount_kobo, o.status, o.created_at
  from public.orders o
  join public.products p on p.id = o.product_id
  where o.order_ref = upper(trim(p_order_ref))
    and lower(o.email) = lower(trim(p_email));
$$;

-- Membership applications. Personal data: anyone can apply, only staff can read.
create table public.membership_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  matric_number text not null check (char_length(matric_number) between 3 and 40),
  email text not null check (char_length(email) between 5 and 200 and position('@' in email) > 1),
  phone text not null check (char_length(phone) between 7 and 30),
  level text,
  department text,
  reason text check (char_length(reason) <= 1000),
  consent boolean not null check (consent),
  status public.application_status not null default 'pending',
  reviewed_by uuid references auth.users (id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.membership_applications enable row level security;

create policy "anyone can apply"
  on public.membership_applications for insert to anon, authenticated
  with check (status = 'pending' and reviewed_by is null and reviewed_at is null);

create policy "staff read applications"
  on public.membership_applications for select to authenticated
  using (public.is_staff());

create policy "staff review applications"
  on public.membership_applications for update to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "super admins delete applications"
  on public.membership_applications for delete to authenticated
  using (public.is_super_admin());

-- Contact messages: anyone can send, only staff can read.
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 5 and 200 and position('@' in email) > 1),
  subject text check (char_length(subject) <= 200),
  message text not null check (char_length(message) between 5 and 3000),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "anyone can send a message"
  on public.contact_messages for insert to anon, authenticated
  with check (is_read = false);

create policy "staff read messages"
  on public.contact_messages for select to authenticated
  using (public.is_staff());

create policy "staff update messages"
  on public.contact_messages for update to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "super admins delete messages"
  on public.contact_messages for delete to authenticated
  using (public.is_super_admin());