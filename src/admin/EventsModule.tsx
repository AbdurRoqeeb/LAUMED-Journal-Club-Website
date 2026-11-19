import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Badge, Button, Card, Field, PageHeader, inputClass } from './ui';
import { formatDateTime, slugify, toIso, toLocalInput } from './util';

type Status = 'draft' | 'published' | 'archived';
type Details = Record<string, unknown>;

interface EventRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  starts_at: string | null;
  ends_at: string | null;
  venue: string | null;
  banner_url: string | null;
  registration_url: string | null;
  is_tentative: boolean;
  status: Status;
  details: Details | null;
}

interface FormState {
  id?: string;
  title: string;
  slug: string;
  description: string;
  subtitle: string;
  theme: string;
  dateTba: boolean;
  starts_at: string;
  ends_at: string;
  timeTba: boolean;
  venueTba: boolean;
  venue: string;
  highlightsTitle: string;
  highlights: string;
  speakers: string;
  registrationFee: string;
  registration_url: string;
  registrationOpen: boolean;
  banner_url: string;
  is_tentative: boolean;
  status: Status;
  details: Details; // everything stored for the event, including keys this form does not edit
}

const EMPTY: FormState = {
  title: '',
  slug: '',
  description: '',
  subtitle: '',
  theme: '',
  dateTba: false,
  starts_at: '',
  ends_at: '',
  timeTba: false,
  venueTba: false,
  venue: '',
  highlightsTitle: '',
  highlights: '',
  speakers: '',
  registrationFee: '',
  registration_url: '',
  registrationOpen: false,
  banner_url: '',
  is_tentative: false,
  status: 'draft',
  details: {},
};

const COLUMNS =
  'id, slug, title, description, starts_at, ends_at, venue, banner_url, registration_url, is_tentative, status, details';

const str = (v: unknown) => (typeof v === 'string' ? v : '');

const stringList = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];

const speakersToText = (v: unknown) =>
  Array.isArray(v)
    ? v
        .map((s) => {
          const o = (s ?? {}) as { name?: unknown; role?: unknown };
          const name = str(o.name);
          const role = str(o.role);
          return role ? `${name} | ${role}` : name;
        })
        .filter(Boolean)
        .join('\n')
    : '';

const textToSpeakers = (text: string) =>
  text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [name, ...rest] = l.split('|');
      const role = rest.join('|').trim();
      return role ? { name: name.trim(), role } : { name: name.trim() };
    });

const textToLines = (text: string) =>
  text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

// Links end up in href and src, so only allow web addresses or paths on this site
const isSafeLink = (s: string) => /^(https?:\/\/\S+|\/(?!\/)\S*)$/i.test(s);

const statusTone = (s: Status) => (s === 'published' ? 'green' : s === 'draft' ? 'amber' : 'gray');

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-5 border-t border-line pt-5">
    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand">{title}</h4>
    {children}
  </div>
);

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

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => (f ? { ...f, [key]: value } : f));

  const edit = (e: EventRow) => {
    setError(null);
    const d = e.details ?? {};
    setForm({
      id: e.id,
      title: e.title,
      slug: e.slug,
      description: e.description ?? '',
      subtitle: str(d.subtitle),
      theme: str(d.theme),
      dateTba: !e.starts_at,
      starts_at: toLocalInput(e.starts_at),
      ends_at: toLocalInput(e.ends_at),
      timeTba: d.timeTba === true,
      venueTba: !e.venue,
      venue: e.venue ?? '',
      highlightsTitle: str(d.highlightsTitle),
      highlights: stringList(d.highlights).join('\n'),
      speakers: speakersToText(d.speakers),
      registrationFee: str(d.registrationFee),
      registration_url: e.registration_url ?? '',
      registrationOpen:
        typeof d.registrationOpen === 'boolean' ? d.registrationOpen : !!e.registration_url,
      banner_url: e.banner_url ?? '',
      is_tentative: e.is_tentative,
      status: e.status,
      details: d,
    });
  };

  const save = async () => {
    if (!form) return;
    const title = form.title.trim();
    const slug = form.slug.trim() || slugify(title);
    if (!title || !slug) return setError('Please enter a title.');

    if (!form.dateTba && !form.starts_at) {
      return setError('Pick a start date, or tick "Date to be announced".');
    }
    if (!form.dateTba && form.ends_at && new Date(form.ends_at) < new Date(form.starts_at)) {
      return setError('The end time cannot be before the start time.');
    }
    if (!form.venueTba && !form.venue.trim()) {
      return setError('Enter a venue, or tick "Venue to be announced".');
    }
    const registration = form.registration_url.trim();
    const flyer = form.banner_url.trim();
    if (registration && !isSafeLink(registration)) {
      return setError('The registration link must start with http:// or https://');
    }
    if (flyer && !isSafeLink(flyer)) {
      return setError('The flyer link must start with http:// or https:// (or be a path like /assets/flyer.jpg).');
    }

    // Keep every detail this form does not edit (judges, sponsor, recap and so on)
    const details: Details = { ...form.details };
    const put = (key: string, value: unknown, keep: boolean) => {
      if (keep) details[key] = value;
      else delete details[key];
    };
    const highlights = textToLines(form.highlights);
    const speakers = textToSpeakers(form.speakers);
    put('subtitle', form.subtitle.trim(), !!form.subtitle.trim());
    put('theme', form.theme.trim(), !!form.theme.trim());
    put('highlightsTitle', form.highlightsTitle.trim(), !!form.highlightsTitle.trim());
    put('highlights', highlights, highlights.length > 0);
    put('speakers', speakers, speakers.length > 0);
    put('registrationFee', form.registrationFee.trim(), !!form.registrationFee.trim());
    put('timeTba', true, form.timeTba);
    details.registrationOpen = form.registrationOpen;

    setSaving(true);
    setError(null);
    const payload = {
      title,
      slug,
      description: form.description.trim() || null,
      starts_at: form.dateTba ? null : toIso(form.starts_at),
      ends_at: form.dateTba ? null : toIso(form.ends_at),
      venue: form.venueTba ? null : form.venue.trim(),
      banner_url: flyer || null,
      registration_url: registration || null,
      is_tentative: form.is_tentative,
      status: form.status,
      details,
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

  const hasExtras = form && ['judges', 'sponsor', 'recap'].some((k) => k in form.details);

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
        <Card className="space-y-6">
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
                  f ? { ...f, title, slug: f.id ? f.slug : slugify(title) } : f
                );
              }}
              placeholder="LAUMED Journal Launch 2026"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Subtitle" hint="Optional small heading above the title.">
              <input
                className={inputClass}
                value={form.subtitle}
                onChange={(e) => set('subtitle', e.target.value)}
              />
            </Field>
            <Field label="Theme" hint="Shown in quotes on the Home page.">
              <input
                className={inputClass}
                value={form.theme}
                onChange={(e) => set('theme', e.target.value)}
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              rows={4}
              className={inputClass}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </Field>

          <Section title="When and where">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.dateTba}
                onChange={(e) => set('dateTba', e.target.checked)}
              />
              Date to be announced
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Starts">
                <input
                  type="datetime-local"
                  className={`${inputClass} disabled:opacity-40`}
                  value={form.starts_at}
                  disabled={form.dateTba}
                  onChange={(e) => set('starts_at', e.target.value)}
                />
              </Field>
              <Field label="Ends (optional)">
                <input
                  type="datetime-local"
                  className={`${inputClass} disabled:opacity-40`}
                  value={form.ends_at}
                  disabled={form.dateTba}
                  onChange={(e) => set('ends_at', e.target.value)}
                />
              </Field>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.timeTba}
                disabled={form.dateTba}
                onChange={(e) => set('timeTba', e.target.checked)}
              />
              Time to be announced (the date shows, the time says "To be announced")
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.venueTba}
                onChange={(e) => set('venueTba', e.target.checked)}
              />
              Venue to be announced
            </label>
            <Field label="Venue">
              <input
                className={`${inputClass} disabled:opacity-40`}
                value={form.venue}
                disabled={form.venueTba}
                onChange={(e) => set('venue', e.target.value)}
                placeholder="Medicals Hall, LAUTECH"
              />
            </Field>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.is_tentative}
                onChange={(e) => set('is_tentative', e.target.checked)}
              />
              Tentative (shows "Subject to confirmation")
            </label>
          </Section>

          <Section title="Programme">
            <Field
              label="Speakers"
              hint="One per line. Add the role after a bar, for example: Dr. Ada Obi | Keynote speaker"
            >
              <textarea
                rows={4}
                className={inputClass}
                value={form.speakers}
                onChange={(e) => set('speakers', e.target.value)}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Highlights heading" hint="For example: What to expect">
                <input
                  className={inputClass}
                  value={form.highlightsTitle}
                  onChange={(e) => set('highlightsTitle', e.target.value)}
                />
              </Field>
              <Field label="Registration fee" hint="For example: ₦2,000, or Free">
                <input
                  className={inputClass}
                  value={form.registrationFee}
                  onChange={(e) => set('registrationFee', e.target.value)}
                />
              </Field>
            </div>
            <Field label="Highlights" hint="One per line.">
              <textarea
                rows={4}
                className={inputClass}
                value={form.highlights}
                onChange={(e) => set('highlights', e.target.value)}
              />
            </Field>
          </Section>

          <Section title="Registration and flyer">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Registration link">
                <input
                  className={inputClass}
                  value={form.registration_url}
                  onChange={(e) => set('registration_url', e.target.value)}
                  placeholder="https://"
                />
              </Field>
              <Field
                label="Flyer link"
                hint="A web address for now. Image upload comes with the storage step."
              >
                <input
                  className={inputClass}
                  value={form.banner_url}
                  onChange={(e) => set('banner_url', e.target.value)}
                  placeholder="https://"
                />
              </Field>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.registrationOpen}
                onChange={(e) => set('registrationOpen', e.target.checked)}
              />
              Registration is open
            </label>
          </Section>

          <Section title="Publishing">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="URL name" hint="Used for the event's web address.">
                <input
                  className={inputClass}
                  value={form.slug}
                  onChange={(e) => set('slug', slugify(e.target.value))}
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
            {hasExtras && (
              <p className="rounded-lg border border-line bg-black/20 px-4 py-3 text-xs text-cream/70">
                This event also has judges, sponsor or recap details. They are kept when you save,
                but cannot be edited here yet.
              </p>
            )}
          </Section>

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
                    {e.starts_at ? formatDateTime(e.starts_at) : 'Date to be announced'}
                    {' · '}
                    {e.venue || 'Venue to be announced'}
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