import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Badge, Button, Card, Field, PageHeader, inputClass } from './ui';

type Status = 'draft' | 'published' | 'archived';

interface EventRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  starts_at: string | null;
  ends_at: string | null;
  venue: string | null;
  registration_url: string | null;
  is_tentative: boolean;
  status: Status;
}

interface FormState {
  id?: string;
  title: string;
  slug: string;
  description: string;
  starts_at: string;
  ends_at: string;
  venue: string;
  registration_url: string;
  is_tentative: boolean;
  status: Status;
}

const EMPTY: FormState = {
  title: '',
  slug: '',
  description: '',
  starts_at: '',
  ends_at: '',
  venue: '',
  registration_url: '',
  is_tentative: false,
  status: 'draft',
};

const COLUMNS =
  'id, slug, title, description, starts_at, ends_at, venue, registration_url, is_tentative, status';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const pad = (n: number) => String(n).padStart(2, '0');

const toLocalInput = (iso: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const toIso = (local: string) => (local ? new Date(local).toISOString() : null);

const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' })
    : 'No date set';

const statusTone = (s: Status) => (s === 'published' ? 'green' : s === 'draft' ? 'amber' : 'gray');

export default function EventsModule() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('events')
      .select(COLUMNS)
      .order('starts_at', { ascending: false, nullsFirst: true });
    if (err) setError(err.message);
    else setEvents((data as EventRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const edit = (e: EventRow) => {
    setError(null);
    setForm({
      id: e.id,
      title: e.title,
      slug: e.slug,
      description: e.description ?? '',
      starts_at: toLocalInput(e.starts_at),
      ends_at: toLocalInput(e.ends_at),
      venue: e.venue ?? '',
      registration_url: e.registration_url ?? '',
      is_tentative: e.is_tentative,
      status: e.status,
    });
  };

  const save = async () => {
    if (!form) return;
    const title = form.title.trim();
    const slug = form.slug.trim() || slugify(title);
    if (!title || !slug) {
      setError('Please enter a title.');
      return;
    }
    if (form.starts_at && form.ends_at && new Date(form.ends_at) < new Date(form.starts_at)) {
      setError('The end time cannot be before the start time.');
      return;
    }

    setSaving(true);
    setError(null);
    const payload = {
      title,
      slug,
      description: form.description.trim() || null,
      starts_at: toIso(form.starts_at),
      ends_at: toIso(form.ends_at),
      venue: form.venue.trim() || null,
      registration_url: form.registration_url.trim() || null,
      is_tentative: form.is_tentative,
      status: form.status,
    };

    const { error: err } = form.id
      ? await supabase.from('events').update(payload).eq('id', form.id)
      : await supabase.from('events').insert(payload);

    setSaving(false);
    if (err) {
      setError(
        err.code === '23505'
          ? 'Another event already uses this URL name. Change the URL name and try again.'
          : err.message
      );
      return;
    }
    setForm(null);
    load();
  };

  const toggleStatus = async (e: EventRow) => {
    const next: Status = e.status === 'published' ? 'draft' : 'published';
    const { error: err } = await supabase.from('events').update({ status: next }).eq('id', e.id);
    if (err) setError(err.message);
    else load();
  };

  const remove = async (e: EventRow) => {
    if (!window.confirm(`Delete "${e.title}"? This cannot be undone.`)) return;
    const { error: err } = await supabase.from('events').delete().eq('id', e.id);
    if (err) setError(err.message);
    else load();
  };

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => (f ? { ...f, [key]: value } : f));

  return (
    <div>
      <PageHeader
        title="Events & announcements"
        subtitle="Create events, then publish them when they are ready for the public site."
        action={
          !form && (
            <Button
              onClick={() => {
                setError(null);
                setForm({ ...EMPTY });
              }}
            >
              New event
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
            {form.id ? 'Edit event' : 'New event'}
          </h3>

          <Field label="Title">
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                setForm((f) =>
                  f
                    ? {
                        ...f,
                        title,
                        // keep the URL name in sync until the event is saved once
                        slug: f.id ? f.slug : slugify(title),
                      }
                    : f
                );
              }}
              placeholder="LAUMED Journal Launch 2026"
            />
          </Field>

          <Field label="URL name" hint="Used for the event's web address. Letters, numbers and dashes.">
            <input
              className={inputClass}
              value={form.slug}
              onChange={(e) => set('slug', slugify(e.target.value))}
            />
          </Field>

          <Field label="Description">
            <textarea
              rows={5}
              className={inputClass}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Starts">
              <input
                type="datetime-local"
                className={inputClass}
                value={form.starts_at}
                onChange={(e) => set('starts_at', e.target.value)}
              />
            </Field>
            <Field label="Ends">
              <input
                type="datetime-local"
                className={inputClass}
                value={form.ends_at}
                onChange={(e) => set('ends_at', e.target.value)}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Venue">
              <input
                className={inputClass}
                value={form.venue}
                onChange={(e) => set('venue', e.target.value)}
              />
            </Field>
            <Field label="Registration link">
              <input
                className={inputClass}
                value={form.registration_url}
                onChange={(e) => set('registration_url', e.target.value)}
                placeholder="https://"
              />
            </Field>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.is_tentative}
                onChange={(e) => set('is_tentative', e.target.checked)}
              />
              Tentative (show "Subject to confirmation")
            </label>
            <label className="flex items-center gap-2 text-sm">
              Status
              <select
                className={`${inputClass} w-auto`}
                value={form.status}
                onChange={(e) => set('status', e.target.value as Status)}
              >
                <option value="draft">Draft (hidden)</option>
                <option value="published">Published</option>
                <option value="archived">Archived (hidden)</option>
              </select>
            </label>
          </div>

          <div className="flex gap-3 border-t border-line pt-5">
            <Button onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save event'}
            </Button>
            <Button variant="secondary" onClick={() => setForm(null)} disabled={saving}>
              Cancel
            </Button>
          </div>
        </Card>
      ) : loading ? (
        <p className="text-sm text-cream/70">Loading events…</p>
      ) : events.length === 0 ? (
        <Card>
          <p className="text-sm text-cream/80">No events yet. Click "New event" to add the first one.</p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {events.map((e) => (
            <li key={e.id}>
              <Card className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-white">{e.title}</h3>
                    <Badge tone={statusTone(e.status)}>{e.status}</Badge>
                    {e.is_tentative && <Badge tone="amber">tentative</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-cream/70">
                    {formatDate(e.starts_at)}
                    {e.venue ? ` · ${e.venue}` : ''}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => toggleStatus(e)}>
                    {e.status === 'published' ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button variant="secondary" onClick={() => edit(e)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => remove(e)}>
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