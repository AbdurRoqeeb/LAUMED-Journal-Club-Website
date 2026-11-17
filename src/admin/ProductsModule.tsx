import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Badge, Button, Card, Field, PageHeader, inputClass } from './ui';
import { formatDateTime, naira, slugify, toIso, toLocalInput } from './util';

type Format = 'printed' | 'digital';

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  format: Format;
  price_kobo: number;
  requires_product_id: string | null;
  available_from: string | null;
  available_until: string | null;
  stock: number | null;
  is_active: boolean;
}

interface FormState {
  id?: string;
  name: string;
  slug: string;
  description: string;
  format: Format;
  price: string; // in naira
  requires_product_id: string;
  available_from: string;
  available_until: string;
  stock: string; // blank = unlimited
  is_active: boolean;
}

const EMPTY: FormState = {
  name: '',
  slug: '',
  description: '',
  format: 'printed',
  price: '',
  requires_product_id: '',
  available_from: '',
  available_until: '',
  stock: '',
  is_active: false,
};

const COLUMNS =
  'id, slug, name, description, format, price_kobo, requires_product_id, available_from, available_until, stock, is_active';

export default function ProductsModule() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('products')
      .select(COLUMNS)
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    else setProducts((data as Product[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const nameOf = (id: string | null) => products.find((p) => p.id === id)?.name;

  const edit = (p: Product) => {
    setError(null);
    setForm({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description ?? '',
      format: p.format,
      price: String(p.price_kobo / 100),
      requires_product_id: p.requires_product_id ?? '',
      available_from: toLocalInput(p.available_from),
      available_until: toLocalInput(p.available_until),
      stock: p.stock === null ? '' : String(p.stock),
      is_active: p.is_active,
    });
  };

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => (f ? { ...f, [key]: value } : f));

  const save = async () => {
    if (!form) return;
    const name = form.name.trim();
    const slug = form.slug.trim() || slugify(name);
    if (!name || !slug) return setError('Please enter a product name.');

    const price = Number(form.price);
    if (form.price.trim() === '' || !Number.isFinite(price) || price < 0) {
      return setError('Enter the price in naira, for example 3500.');
    }
    let stock: number | null = null;
    if (form.stock.trim() !== '') {
      stock = Number(form.stock);
      if (!Number.isInteger(stock) || stock < 0) {
        return setError('Stock must be a whole number, or leave it blank for unlimited.');
      }
    }
    if (
      form.available_from &&
      form.available_until &&
      new Date(form.available_until) < new Date(form.available_from)
    ) {
      return setError('The closing date cannot be before the opening date.');
    }

    setSaving(true);
    setError(null);
    const payload = {
      name,
      slug,
      description: form.description.trim() || null,
      format: form.format,
      price_kobo: Math.round(price * 100),
      requires_product_id: form.requires_product_id || null,
      available_from: toIso(form.available_from),
      available_until: toIso(form.available_until),
      stock,
      is_active: form.is_active,
    };
    const { error: err } = form.id
      ? await supabase.from('products').update(payload).eq('id', form.id)
      : await supabase.from('products').insert(payload);
    setSaving(false);

    if (err) {
      setError(
        err.code === '23505'
          ? 'Another product already uses this URL name. Change it and try again.'
          : err.message
      );
      return;
    }
    setForm(null);
    load();
  };

  const toggle = async (p: Product) => {
    const { error: err } = await supabase
      .from('products')
      .update({ is_active: !p.is_active })
      .eq('id', p.id);
    if (err) setError(err.message);
    else load();
  };

  const remove = async (p: Product) => {
    if (!window.confirm(`Delete "${p.name}"? Products that have orders cannot be deleted.`)) return;
    const { error: err } = await supabase.from('products').delete().eq('id', p.id);
    if (err) {
      setError(
        err.code === '23503'
          ? 'This product has orders, so it cannot be deleted. Close it instead.'
          : err.message
      );
    } else load();
  };

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle="What the club sells: abstract book, full journal and so on. Prices are in naira."
        action={
          !form && (
            <Button
              onClick={() => {
                setError(null);
                setForm({ ...EMPTY });
              }}
            >
              New product
            </Button>
          )
        }
      />

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {form ? (
        <Card className="space-y-5">
          <h3 className="font-serif text-xl font-bold text-white">
            {form.id ? 'Edit product' : 'New product'}
          </h3>

          <Field label="Name">
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => {
                const name = e.target.value;
                setForm((f) =>
                  f ? { ...f, name, slug: f.id ? f.slug : slugify(name) } : f
                );
              }}
              placeholder="LAUMED Journal: Abstract Book"
            />
          </Field>

          <Field label="URL name" hint="Letters, numbers and dashes.">
            <input
              className={inputClass}
              value={form.slug}
              onChange={(e) => set('slug', slugify(e.target.value))}
            />
          </Field>

          <Field label="Description">
            <textarea
              rows={4}
              className={inputClass}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Format">
              <select
                className={inputClass}
                value={form.format}
                onChange={(e) => set('format', e.target.value as Format)}
              >
                <option value="printed">Printed</option>
                <option value="digital">Digital</option>
              </select>
            </Field>
            <Field label="Price (₦)">
              <input
                inputMode="decimal"
                className={inputClass}
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="3500"
              />
            </Field>
            <Field label="Stock" hint="Blank = unlimited.">
              <input
                inputMode="numeric"
                className={inputClass}
                value={form.stock}
                onChange={(e) => set('stock', e.target.value)}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Pre-orders open">
              <input
                type="datetime-local"
                className={inputClass}
                value={form.available_from}
                onChange={(e) => set('available_from', e.target.value)}
              />
            </Field>
            <Field label="Pre-orders close">
              <input
                type="datetime-local"
                className={inputClass}
                value={form.available_until}
                onChange={(e) => set('available_until', e.target.value)}
              />
            </Field>
          </div>

          <Field
            label="Requires buying first"
            hint="For rules like 'only abstract-book buyers can order the full journal'. Leave empty until the club confirms its rules."
          >
            <select
              className={inputClass}
              value={form.requires_product_id}
              onChange={(e) => set('requires_product_id', e.target.value)}
            >
              <option value="">No restriction</option>
              {products
                .filter((p) => p.id !== form.id)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </Field>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => set('is_active', e.target.checked)}
            />
            Open for pre-orders (visible to the public)
          </label>

          <div className="flex gap-3 border-t border-line pt-5">
            <Button onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save product'}
            </Button>
            <Button variant="secondary" onClick={() => setForm(null)} disabled={saving}>
              Cancel
            </Button>
          </div>
        </Card>
      ) : loading ? (
        <p className="text-sm text-cream/70">Loading products…</p>
      ) : products.length === 0 ? (
        <Card>
          <p className="text-sm text-cream/80">No products yet. Click "New product" to add one.</p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {products.map((p) => (
            <li key={p.id}>
              <Card className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-white">{p.name}</h3>
                    <Badge tone={p.is_active ? 'green' : 'amber'}>
                      {p.is_active ? 'open' : 'closed'}
                    </Badge>
                    <Badge>{p.format}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-cream/70">
                    {naira(p.price_kobo)} ·{' '}
                    {p.stock === null ? 'unlimited stock' : `${p.stock} left`}
                  </p>
                  {(p.available_from || p.available_until) && (
                    <p className="text-xs text-cream/50">
                      {formatDateTime(p.available_from)} → {formatDateTime(p.available_until)}
                    </p>
                  )}
                  {p.requires_product_id && (
                    <p className="text-xs text-amber-300">
                      Requires a paid order of: {nameOf(p.requires_product_id) ?? 'another product'}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => toggle(p)}>
                    {p.is_active ? 'Close' : 'Open'}
                  </Button>
                  <Button variant="secondary" onClick={() => edit(p)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => remove(p)}>
                    Delete
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}