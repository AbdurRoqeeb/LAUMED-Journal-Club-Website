import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Badge, Button, Card, Field, PageHeader, inputClass } from './ui';
import { formatDateTime } from './util';

type ReqStatus = 'new' | 'planned' | 'done' | 'declined';

interface Req {
  id: string;
  title: string;
  details: string | null;
  status: ReqStatus;
  submitted_name: string | null;
  created_at: string;
}

const AVAILABLE = [
  'Events: create, edit and publish, shown on the public site, with flyer upload',
  'Book products and pre-orders: prices, stock, open and close dates, order tracking',
  'Membership applications: review, approve or reject, export to Excel',
  'Contact inbox: read and reply to messages',
  'Separate logins and roles for each officer',
];

const NEXT = [
  'Connect the rest of the public website (journal issues, sessions, About, team) to this panel',
  'Online booking form for the journal, with spam protection',
'Journal issues and articles: covers, PDFs and publishing',
  'Resources and editorial board editing',
  'Add and remove officers from inside the panel',
];

const NEEDS_YOU = [
  'How buyers will pay (transfer, card, other) and who confirms payments',
  'Book rules: who can buy what, prices, printed vs digital, delivery',
  'Domain name and who pays for it each year',
  'Which website content is real and which is placeholder',
];

const STATUS_TONE: Record<ReqStatus, 'green' | 'amber' | 'gray'> = {
  new: 'amber',
  planned: 'amber',
  done: 'green',
  declined: 'gray',
};

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <h3 className="mb-3 font-serif text-lg font-bold text-white">{title}</h3>
      <ul className="list-disc space-y-1.5 pl-5 text-sm text-cream/85">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </Card>
  );
}

export default function FeedbackModule({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const [rows, setRows] = useState<Req[]>([]);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error: err } = await supabase
      .from('feature_requests')
      .select('id, title, details, status, submitted_name, created_at')
      .order('created_at', { ascending: false })
      .limit(300);
    if (err) setError(err.message);
    else setRows((data as Req[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async () => {
    if (title.trim().length < 3) return setError('Please describe the feature in a few words.');
    setSaving(true);
    setError(null);
    const { error: err } = await supabase
      .from('feature_requests')
      .insert({ title: title.trim(), details: details.trim() || null });
    setSaving(false);
    if (err) return setError(err.message);
    setTitle('');
    setDetails('');
    load();
  };

  const setStatus = async (r: Req, status: ReqStatus) => {
    const { error: err } = await supabase.from('feature_requests').update({ status }).eq('id', r.id);
    if (err) setError(err.message);
    else load();
  };

  const remove = async (r: Req) => {
    if (!window.confirm(`Delete "${r.title}"?`)) return;
    const { error: err } = await supabase.from('feature_requests').delete().eq('id', r.id);
    if (err) setError(err.message);
    else load();
  };

  return (
    <div>
      <PageHeader
        title="Feedback & roadmap"
        subtitle="See what is ready, what is coming, and tell us what else you need."
      />

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="mb-8 grid gap-4 lg:grid-cols-3">
        <List title="Available now" items={AVAILABLE} />
        <List title="Coming next" items={NEXT} />
        <List title="We need your input" items={NEEDS_YOU} />
      </div>

      <Card className="mb-8 space-y-4">
        <h3 className="font-serif text-lg font-bold text-white">Request a feature</h3>
        <Field label="What do you want?">
          <input
            className={inputClass}
            value={title}
            maxLength={150}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="For example: send an email when someone's membership is approved"
          />
        </Field>
        <Field label="More detail (optional)">
          <textarea
            rows={3}
            className={inputClass}
            value={details}
            maxLength={2000}
            onChange={(e) => setDetails(e.target.value)}
          />
        </Field>
        <Button onClick={submit} disabled={saving}>
          {saving ? 'Sending…' : 'Send request'}
        </Button>
      </Card>

      <h3 className="mb-3 font-serif text-lg font-bold text-white">Requests so far</h3>
      {rows.length === 0 ? (
        <Card>
          <p className="text-sm text-cream/80">Nothing yet. Be the first to ask.</p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => (
            <li key={r.id}>
              <Card className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-serif text-base font-bold text-white">{r.title}</h4>
                    <Badge tone={STATUS_TONE[r.status]}>{r.status}</Badge>
                  </div>
                  {r.details && (
                    <p className="mt-1 whitespace-pre-wrap text-sm text-cream/80">{r.details}</p>
                  )}
                  <p className="mt-1 text-xs text-cream/50">
                    {r.submitted_name ?? 'Unknown'} · {formatDateTime(r.created_at)}
                  </p>
                </div>
                {isSuperAdmin && (
                  <div className="flex flex-wrap gap-2">
                    <select
                      className={`${inputClass} w-auto`}
                      value={r.status}
                      onChange={(e) => setStatus(r, e.target.value as ReqStatus)}
                    >
                      <option value="new">New</option>
                      <option value="planned">Planned</option>
                      <option value="done">Done</option>
                      <option value="declined">Declined</option>
                    </select>
                    <Button variant="danger" onClick={() => remove(r)}>
                      Delete
                    </Button>
                  </div>
                )}
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}