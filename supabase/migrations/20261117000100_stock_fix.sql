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

  -- Lock the product row so two buyers cannot take the last copy at the same time
  select * into p from public.products where id = p_product_id for update;
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

  if p.stock is not null then
    update public.products set stock = stock - p_quantity where id = p.id;
  end if;

  return v_ref;
end;
$$;

-- Give copies back when an order is cancelled or refunded, take them again if it is reopened
create or replace function public.sync_stock_on_order_status()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.status not in ('cancelled', 'refunded') and new.status in ('cancelled', 'refunded') then
    update public.products set stock = stock + old.quantity
    where id = old.product_id and stock is not null;
  elsif old.status in ('cancelled', 'refunded') and new.status not in ('cancelled', 'refunded') then
    update public.products set stock = stock - old.quantity
    where id = old.product_id and stock is not null;
  end if;
  return new;
end;
$$;

create trigger orders_sync_stock
  after update of status on public.orders
  for each row
  when (old.status is distinct from new.status)
  execute function public.sync_stock_on_order_status();