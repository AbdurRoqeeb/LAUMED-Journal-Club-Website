import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Badge, Button, Card, PageHeader, inputClass } from './ui';

type AppStatus = 'pending' | 'approved' | 'rejected';
type Filter = AppStatus | 'all';

interface Application {
  id: string;
  full_name: string;
  matric_number: string;
  email: string;
  phone: string;
  level: string | null;
  department: string | null;
  reason: string | null;
  status: AppStatus;
  reviewed_at: string | null;
  created_at: string;
}

const COLUMNS =
  'id, full_name, matric_number, email, phone, level, department, reason, status, reviewed_at, created_at';

const tone = (s: AppStatus) => (s === 'approved' ? 'green' : s === 'pending' ? 'amber' : 'gray');

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-NG', { dateStyle: 'medium' });

// Spreadsheet apps run text that starts with = + - @ as a formula. Applicants type these
// fields themselves, so neutralise anything that could be abused before exporting.
const csvCell = (value: string | null) => {
  let s = value ?? '';
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

// Excel turns digit-only text into numbers (08012345678 becomes 8.01E+09 and loses its
// leading zero). Wrapping simple values in ="..." makes Excel and Google Sheets keep them
// as text. Anything with unusual characters falls back to the formula-safe csvCell.
const textCell = (value: string | null) => {
  const s = (value ?? '').trim();
  if (s && /^[0-9A-Za-z+\/\-\s().]+$/.test(s)) return `"=""${s}"""`;
  return csvCell(s);
};

function exportCsv(rows: Application[]) {
  const header = [
    'Full name',
    'Matric number',
    'Email',
    'Phone',
    'Level',
    'Department',
    'Status',
    'Applied on',
    'Reason',
  ];
  const lines = rows.map((r) =>
    [
      csvCell(r.full_name),
      textCell(r.matric_number),
      csvCell(r.email),
      textCell(r.phone),
      csvCell(r.level),
      csvCell(r.department),
      csvCell(r.status),
      csvCell(fmt(r.created_at)),
      csvCell(r.reason),
    ].join(',')
  );
  // The leading BOM makes Excel read the file as UTF-8
  const blob = new Blob(['\uFEFF' + [header.map(csvCell).join(','), ...lines].join('\r\n')], {
    type: 'text/csv;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `laumed-membership-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ApplicationsModule({ canDelete }: { canDelete: boolean }) {
  const [rows, setRows] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('pending');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    // Supabase returns at most 1,000 rows per request. Fine at club scale; paginate if it grows.
    const { data, error: err } = await supabase
      .from('membership_applications')
      .select(COLUMNS)
      .order('created_at', { ascending: false })
      .limit(1000);
    if (err) setError(err.message);
    else setRows((data as Application[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(
    () => ({
      all: rows.length,
      pending: rows.filter((r) => r.status === 'pending').length,
      approved: rows.filter((r) => r.status === 'approved').length,
      rejected: rows.filter((r) => r.status === 'rejected').length,
    }),
    [rows]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (filter === 'all' || r.status === filter) &&
        (!q ||
          r.full_name.toLowerCase().includes(q) ||
          r.matric_number.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q))
    );
  }, [rows, filter, query]);

  const review = async (row: Application, status: AppStatus) => {
    setError(null);
    const { data: auth } = await supabase.auth.getUser();
    const { error: err } = await supabase
      .from('membership_applications')
      .update({
        status,
        reviewed_by: status === 'pending' ? null : (auth.user?.id ?? null),
        reviewed_at: status === 'pending' ? null : new Date().toISOString(),
      })
      .eq('id', row.id);
    if (err) setError(err.message);
    else load();
  };

  const remove = async (row: Application) => {
    if (!window.confirm(`Permanently delete the application from ${row.full_name}?`)) return;
    const { error: err } = await supabase.from('membership_applications').delete().eq('id', row.id);
    if (err) setError(err.message);
    else load();
  };

  const FILTERS: { id: Filter; label: string }[] = [
    { id: 'pending', label: `Pending (${counts.pending})` },
    { id: 'approved', label: `Approved (${counts.approved})` },
    { id: 'rejected', label: `Rejected (${counts.rejected})` },
    { id: 'all', label: `All (${counts.all})` },
  ];

  return (
    <div>
      <PageHeader
        title="Membership applications"
        subtitle="Review applications, then export the list for the club's records."
        action={
          <Button
            variant="secondary"
            disabled={visible.length === 0}
            onClick={() => exportCsv(visible)}
          >
            Export CSV ({visible.length})
          </Button>
        }
      />

      <p className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
        This list holds personal data (matric numbers, phone numbers, emails). Share exports only
        with club officers who need them, and delete downloaded files when finished.
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
          placeholder="Search name, matric or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-sm text-cream/70">Loading applications…</p>
      ) : visible.length === 0 ? (
        <Card>
          <p className="text-sm text-cream/80">No applications match this view.</p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {visible.map((r) => (
            <li key={r.id}>
              <Card>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-lg font-bold text-white">{r.full_name}</h3>
                      <Badge tone={tone(r.status)}>{r.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-cream/70">
                      {r.matric_number}
                      {r.level ? ` · ${r.level}` : ''}
                      {r.department ? ` · ${r.department}` : ''}
                    </p>
                    <p className="text-sm text-cream/70">
                      {r.email} · {r.phone}
                    </p>
                    <p className="mt-1 text-xs text-cream/50">Applied {fmt(r.created_at)}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {r.status !== 'approved' && (
                      <Button onClick={() => review(r, 'approved')}>Approve</Button>
                    )}
                    {r.status !== 'rejected' && (
                      <Button variant="secondary" onClick={() => review(r, 'rejected')}>
                        Reject
                      </Button>
                    )}
                    {r.status !== 'pending' && (
                      <Button variant="secondary" onClick={() => review(r, 'pending')}>
                        Back to pending
                      </Button>
                    )}
                    {canDelete && (
                      <Button variant="danger" onClick={() => remove(r)}>
                        Delete
                      </Button>
                    )}
                  </div>
                </div>

                {r.reason && (
                  <div className="mt-3 border-t border-line pt-3">
                    <button
                      className="text-xs font-semibold uppercase tracking-wider text-brand"
                      onClick={() => setOpenId(openId === r.id ? null : r.id)}
                    >
                      {openId === r.id ? 'Hide reason' : 'Show reason'}
                    </button>
                    {openId === r.id && (
                      <p className="mt-2 whitespace-pre-wrap text-sm text-cream/80">{r.reason}</p>
                    )}
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