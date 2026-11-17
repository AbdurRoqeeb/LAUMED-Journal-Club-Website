import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Badge, Button, Card, PageHeader, inputClass } from './ui';
import { csvCell, downloadCsv, formatDateTime, naira, textCell } from './util';

type OrderStatus = 'pending' | 'paid' | 'fulfilled' | 'cancelled' | 'refunded';
type Filter = OrderStatus | 'all';
type Variant = 'primary' | 'secondary' | 'danger';

interface Order {
  id: string;
  order_ref: string;
  buyer_name: string;
  email: string;
  phone: string;
  quantity: number;
  delivery_method: 'pickup' | 'delivery' | 'digital';
  delivery_address: string | null;
  amount_kobo: number;
  status: OrderStatus;
  payment_reference: string | null;
  paid_at: string | null;
  created_at: string;
  products: { name: string } | null;
}

const COLUMNS =
  'id, order_ref, buyer_name, email, phone, quantity, delivery_method, delivery_address, amount_kobo, status, payment_reference, paid_at, created_at, products(name)';

const NEXT: Record<OrderStatus, { to: OrderStatus; label: string; variant: Variant }[]> = {
  pending: [
    { to: 'paid', label: 'Mark paid', variant: 'primary' },
    { to: 'cancelled', label: 'Cancel', variant: 'danger' },
  ],
  paid: [
    { to: 'fulfilled', label: 'Mark fulfilled', variant: 'primary' },
    { to: 'refunded', label: 'Refund', variant: 'danger' },
  ],
  fulfilled: [{ to: 'refunded', label: 'Refund', variant: 'danger' }],
  cancelled: [{ to: 'pending', label: 'Reopen', variant: 'secondary' }],
  refunded: [{ to: 'pending', label: 'Reopen', variant: 'secondary' }],
};

const tone = (s: OrderStatus) =>
  s === 'paid' || s === 'fulfilled' ? 'green' : s === 'pending' ? 'amber' : 'gray';

export default function OrdersModule() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('pending');
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('orders')
      .select(COLUMNS)
      .order('created_at', { ascending: false })
      .limit(1000);
    if (err) setError(err.message);
    else setOrders((data as unknown as Order[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    const count = (s: OrderStatus) => orders.filter((o) => o.status === s).length;
    const revenue = orders
      .filter((o) => o.status === 'paid' || o.status === 'fulfilled')
      .reduce((sum, o) => sum + o.amount_kobo, 0);
    return {
      all: orders.length,
      pending: count('pending'),
      paid: count('paid'),
      fulfilled: count('fulfilled'),
      cancelled: count('cancelled'),
      refunded: count('refunded'),
      revenue,
    };
  }, [orders]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter(
      (o) =>
        (filter === 'all' || o.status === filter) &&
        (!q ||
          o.order_ref.toLowerCase().includes(q) ||
          o.buyer_name.toLowerCase().includes(q) ||
          o.email.toLowerCase().includes(q) ||
          o.phone.includes(q))
    );
  }, [orders, filter, query]);

  const change = async (o: Order, to: OrderStatus) => {
    setError(null);
    const payload: Record<string, unknown> = { status: to };

    if (to === 'paid') {
      const ref = window.prompt(
        `Payment reference for ${o.order_ref} (e.g. transfer ID). Leave blank if none.`,
        o.payment_reference ?? ''
      );
      if (ref === null) return;
      payload.payment_reference = ref.trim() || null;
      payload.paid_at = new Date().toISOString();
    }
    if (
      (to === 'cancelled' || to === 'refunded') &&
      !window.confirm(`Mark ${o.order_ref} as ${to}? Its copies go back into stock.`)
    ) {
      return;
    }

    const { error: err } = await supabase.from('orders').update(payload).eq('id', o.id);
    if (err) setError(err.message);
    else load();
  };

  const exportOrders = () => {
    downloadCsv(
      `laumed-orders-${new Date().toISOString().slice(0, 10)}.csv`,
      [
        'Order ref',
        'Buyer',
        'Email',
        'Phone',
        'Product',
        'Qty',
        'Amount (NGN)',
        'Delivery',
        'Address',
        'Status',
        'Payment ref',
        'Ordered on',
      ],
      visible.map((o) => [
        textCell(o.order_ref),
        csvCell(o.buyer_name),
        csvCell(o.email),
        textCell(o.phone),
        csvCell(o.products?.name),
        String(o.quantity),
        String(o.amount_kobo / 100),
        csvCell(o.delivery_method),
        csvCell(o.delivery_address),
        csvCell(o.status),
        textCell(o.payment_reference),
        csvCell(formatDateTime(o.created_at)),
      ])
    );
  };

  const FILTERS: { id: Filter; label: string }[] = [
    { id: 'pending', label: `Pending (${stats.pending})` },
    { id: 'paid', label: `Paid (${stats.paid})` },
    { id: 'fulfilled', label: `Fulfilled (${stats.fulfilled})` },
    { id: 'cancelled', label: `Cancelled (${stats.cancelled})` },
    { id: 'refunded', label: `Refunded (${stats.refunded})` },
    { id: 'all', label: `All (${stats.all})` },
  ];

  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle="Pre-orders for the journal. Mark an order paid once you have confirmed the payment."
        action={
          <Button variant="secondary" disabled={visible.length === 0} onClick={exportOrders}>
            Export CSV ({visible.length})
          </Button>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Card>
          <div className="text-xs uppercase tracking-wider text-cream/60">Awaiting payment</div>
          <div className="mt-1 font-serif text-2xl font-bold text-white">{stats.pending}</div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-wider text-cream/60">Paid or fulfilled</div>
          <div className="mt-1 font-serif text-2xl font-bold text-white">
            {stats.paid + stats.fulfilled}
          </div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-wider text-cream/60">Confirmed revenue</div>
          <div className="mt-1 font-serif text-2xl font-bold text-white">{naira(stats.revenue)}</div>
        </Card>
      </div>

      <p className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
        Orders hold personal data (names, phone numbers, emails, addresses). Share exports only with
        club officers who need them, and delete downloaded files when finished.
      </p>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-3 py-1 text-sm transition ${
                filter === f.id
                  ? 'border-brand bg-brand text-white'
                  : 'border-line text-cream/80 hover:bg-white/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          className={`${inputClass} max-w-xs`}
          placeholder="Search ref, name, email or phone"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-sm text-cream/70">Loading orders…</p>
      ) : visible.length === 0 ? (
        <Card>
          <p className="text-sm text-cream/80">No orders match this view.</p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {visible.map((o) => (
            <li key={o.id}>
              <Card className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-mono text-sm font-semibold text-white">{o.order_ref}</h3>
                    <Badge tone={tone(o.status)}>{o.status}</Badge>
                    <Badge>{o.delivery_method}</Badge>
                  </div>
                  <p className="mt-1 font-serif text-lg font-bold text-white">{o.buyer_name}</p>
                  <p className="text-sm text-cream/70">
                    {o.email} · {o.phone}
                  </p>
                  <p className="mt-1 text-sm text-cream/80">
                    {o.products?.name ?? 'Unknown product'} × {o.quantity} ·{' '}
                    <span className="font-semibold text-white">{naira(o.amount_kobo)}</span>
                  </p>
                  {o.delivery_address && (
                    <p className="text-xs text-cream/60">Deliver to: {o.delivery_address}</p>
                  )}
                  <p className="mt-1 text-xs text-cream/50">
                    Ordered {formatDateTime(o.created_at)}
                    {o.paid_at ? ` · Paid ${formatDateTime(o.paid_at)}` : ''}
                    {o.payment_reference ? ` · Ref: ${o.payment_reference}` : ''}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {NEXT[o.status].map((a) => (
                    <Button key={a.to} variant={a.variant} onClick={() => change(o, a.to)}>
                      {a.label}
                    </Button>
                  ))}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}