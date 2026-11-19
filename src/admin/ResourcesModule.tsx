import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Badge, Button, Card, Field, PageHeader, inputClass } from './ui';

type Status = 'draft' | 'published' | 'archived';

const isHttpUrl = (s: string) => /^https?:\/\/\S+$/i.test(s);

const Alert = ({ text }: { text: string }) => (
  <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
    {text}
  </div>
);

/* ---------- Resources ---------- */

interface Resource {
  id: string;
  title: string;
  description: string | null;
  url: string;
  category: string | null;
  organization: string | null;
  sort_order: number;
  status: Status;
}

interface ResForm {
  id?: string;
  title: string;
  description: string;
  url: string;
  category: string;
  organization: string;
  sort_order: string;
  status: Status;
}

const EMPTY_RES: ResForm = {
  title: '',
  description: '',
  url: '',
  category: '',
  organization: '',
  sort_order: '0',
  status: 'draft',
};

function Resources() {
  const [rows, setRows] = useState<Resource[]>([]);
  const [form, setForm] = useState<ResForm | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('resources')
      .select('id, title, description, url, category, organization, sort_order, status')      .order('sort_order')
      .order('title');
    if (err) setError(err.message);
    else setRows((data as Resource[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const set = <K extends keyof ResForm>(k: K, v: ResForm[K]) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const save = async () => {
    if (!form) return;
    const title = form.title.trim();
    const url = form.url.trim();
    const order = Number(form.sort_order);
    if (!title) return setError('Please enter a title.');
    if (!isHttpUrl(url)) return setError('The link must start with http:// or https://');
    if (!Number.isInteger(order)) return setError('Order must be a whole number.');

    setSaving(true);
    setError(null);
    const payload = {
      title,
      url,
      description: form.description.trim() || null,
      category: form.category.trim() || null,
      organization: form.organization.trim() || null,
      sort_order: order,
      status: form.status,
    };
    const { error: err } = form.id
      ? await supabase.from('resources').update(payload).eq('id', form.id)
      : await supabase.from('resources').insert(payload);
    setSaving(false);
    if (err) return setError(err.message);
    setForm(null);
    load();
  };

  const remove = async (r: Resource) => {
    if (!window.confirm(`Delete "${r.title}"?`)) return;
    const { error: err } = await supabase.from('resources').delete().eq('id', r.id);
    if (err) setError(err.message);
    else load();
  };

  const toggle = async (r: Resource) => {
    const { error: err } = await supabase
      .from('resources')
      .update({ status: r.status === 'published' ? 'draft' : 'published' })
      .eq('id', r.id);
    if (err) setError(err.message);
    else load();
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        {!form && (
          <Button
            onClick={() => {
              setError(null);
              setForm({ ...EMPTY_RES });
            }}
          >
            New resource
          </Button>
        )}
      </div>
      {error && <Alert text={error} />}

      {form ? (
        <Card className="space-y-5">
          <h3 className="font-serif text-xl font-bold text-white">
            {form.id ? 'Edit resource' : 'New resource'}
          </h3>
          <Field label="Title">
            <input className={inputClass} value={form.title} onChange={(e) => set('title', e.target.value)} />
          </Field>
          <Field label="Link">
            <input
              className={inputClass}
              value={form.url}
              onChange={(e) => set('url', e.target.value)}
              placeholder="https://"
            />
          </Field>
          <Field label="Description">
            <textarea
              rows={3}
              className={inputClass}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Organization" hint="Who publishes it, e.g. CASP or Cochrane.">
              <input
                className={inputClass}
                value={form.organization}
                onChange={(e) => set('organization', e.target.value)}
              />
            </Field>
            <Field label="Category" hint="For grouping, e.g. Reporting guidelines.">
              <input className={inputClass} value={form.category} onChange={(e) => set('category', e.target.value)} />
            </Field>
            <Field label="Order" hint="Lower numbers come first.">
              <input
                inputMode="numeric"
                className={inputClass}
                value={form.sort_order}
                onChange={(e) => set('sort_order', e.target.value)}
              />
            </Field>
            <Field label="Status">
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) => set('status', e.target.value as Status)}
              >
                <option value="draft">Draft (hidden)</option>
                <option value="published">Published</option>
                <option value="archived">Archived (hidden)</option>
              </select>
            </Field>
          </div>
          <div className="flex gap-3 border-t border-line pt-5">
            <Button onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save resource'}
            </Button>
            <Button variant="secondary" onClick={() => setForm(null)} disabled={saving}>
              Cancel
            </Button>
          </div>
        </Card>
      ) : loading ? (
        <p className="text-sm text-cream/70">Loading resources…</p>
      ) : rows.length === 0 ? (
        <Card>
          <p className="text-sm text-cream/80">No resources yet.</p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => (
            <li key={r.id}>
              <Card className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-white">{r.title}</h3>
                    <Badge tone={r.status === 'published' ? 'green' : 'amber'}>{r.status}</Badge>
                    {r.category && <Badge>{r.category}</Badge>}
                  </div>
                  <p className="mt-1 truncate text-sm text-cream/60">{r.url}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => toggle(r)}>
                    {r.status === 'published' ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setError(null);
                      setForm({
                        id: r.id,
                        title: r.title,
                        description: r.description ?? '',
                        url: r.url,
                        category: r.category ?? '',
                        organization: r.organization ?? '',
                        sort_order: String(r.sort_order),
                        status: r.status,
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => remove(r)}>
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

/* ---------- Editorial board ---------- */

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  sort_order: number;
  is_active: boolean;
}

interface MemForm {
  id?: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  sort_order: string;
  is_active: boolean;
}

const EMPTY_MEM: MemForm = {
  name: '',
  role: '',
  bio: '',
  photo_url: '',
  sort_order: '0',
  is_active: true,
};

function Board() {
  const [rows, setRows] = useState<Member[]>([]);
  const [form, setForm] = useState<MemForm | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('editorial_board')
      .select('id, name, role, bio, photo_url, sort_order, is_active')
      .order('sort_order')
      .order('name');
    if (err) setError(err.message);
    else setRows((data as Member[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const set = <K extends keyof MemForm>(k: K, v: MemForm[K]) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const save = async () => {
    if (!form) return;
    const name = form.name.trim();
    const role = form.role.trim();
    const photo = form.photo_url.trim();
    const order = Number(form.sort_order);
    if (!name || !role) return setError('Please enter a name and a role.');
    if (photo && !isHttpUrl(photo)) return setError('The photo link must start with http:// or https://');
    if (!Number.isInteger(order)) return setError('Order must be a whole number.');

    setSaving(true);
    setError(null);
    const payload = {
      name,
      role,
      bio: form.bio.trim() || null,
      photo_url: photo || null,
      sort_order: order,
      is_active: form.is_active,
    };
    const { error: err } = form.id
      ? await supabase.from('editorial_board').update(payload).eq('id', form.id)
      : await supabase.from('editorial_board').insert(payload);
    setSaving(false);
    if (err) return setError(err.message);
    setForm(null);
    load();
  };

  const remove = async (m: Member) => {
    if (!window.confirm(`Remove ${m.name} from the editorial board?`)) return;
    const { error: err } = await supabase.from('editorial_board').delete().eq('id', m.id);
    if (err) setError(err.message);
    else load();
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        {!form && (
          <Button
            onClick={() => {
              setError(null);
              setForm({ ...EMPTY_MEM });
            }}
          >
            New member
          </Button>
        )}
      </div>
      {error && <Alert text={error} />}

      {form ? (
        <Card className="space-y-5">
          <h3 className="font-serif text-xl font-bold text-white">
            {form.id ? 'Edit member' : 'New member'}
          </h3>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name">
              <input className={inputClass} value={form.name} onChange={(e) => set('name', e.target.value)} />
            </Field>
            <Field label="Role">
              <input
                className={inputClass}
                value={form.role}
                onChange={(e) => set('role', e.target.value)}
                placeholder="Editor-in-Chief"
              />
            </Field>
          </div>
          <Field label="Bio">
            <textarea rows={3} className={inputClass} value={form.bio} onChange={(e) => set('bio', e.target.value)} />
          </Field>
          <Field label="Photo link" hint="Photo upload comes with the storage step. Use a web address for now.">
            <input
              className={inputClass}
              value={form.photo_url}
              onChange={(e) => set('photo_url', e.target.value)}
              placeholder="https://"
            />
          </Field>
          <div className="flex flex-wrap items-center gap-6">
            <Field label="Order" hint="Lower numbers come first.">
              <input
                inputMode="numeric"
                className={`${inputClass} w-28`}
                value={form.sort_order}
                onChange={(e) => set('sort_order', e.target.value)}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => set('is_active', e.target.checked)}
              />
              Show on the public site
            </label>
          </div>
          <div className="flex gap-3 border-t border-line pt-5">
            <Button onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save member'}
            </Button>
            <Button variant="secondary" onClick={() => setForm(null)} disabled={saving}>
              Cancel
            </Button>
          </div>
        </Card>
      ) : loading ? (
        <p className="text-sm text-cream/70">Loading editorial board…</p>
      ) : rows.length === 0 ? (
        <Card>
          <p className="text-sm text-cream/80">No members yet.</p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {rows.map((m) => (
            <li key={m.id}>
              <Card className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-white">{m.name}</h3>
                    <Badge tone={m.is_active ? 'green' : 'gray'}>{m.is_active ? 'shown' : 'hidden'}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-cream/70">{m.role}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setError(null);
                      setForm({
                        id: m.id,
                        name: m.name,
                        role: m.role,
                        bio: m.bio ?? '',
                        photo_url: m.photo_url ?? '',
                        sort_order: String(m.sort_order),
                        is_active: m.is_active,
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => remove(m)}>
                    Remove
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

export default function ResourcesModule() {
  const [tab, setTab] = useState<'resources' | 'board'>('resources');

  return (
    <div>
      <PageHeader
        title="Resources & editorial board"
        subtitle="Useful links for members, and the people behind the journal."
      />
      <div className="mb-6 flex gap-2">
        {(
          [
            ['resources', 'Resources'],
            ['board', 'Editorial board'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === id ? 'bg-brand text-white' : 'border border-line text-cream/80 hover:bg-white/5'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === 'resources' ? <Resources /> : <Board />}
    </div>
  );
}