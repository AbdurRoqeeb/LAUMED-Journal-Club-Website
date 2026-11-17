import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Badge, Button, Card, PageHeader } from './ui';
import { formatDateTime } from './util';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function ContactModule({ canDelete }: { canDelete: boolean }) {
  const [rows, setRows] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [onlyUnread, setOnlyUnread] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('contact_messages')
      .select('id, name, email, subject, message, is_read, created_at')
      .order('created_at', { ascending: false })
      .limit(500);
    if (err) setError(err.message);
    else setRows((data as Message[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const unread = useMemo(() => rows.filter((r) => !r.is_read).length, [rows]);
  const visible = useMemo(
    () => (onlyUnread ? rows.filter((r) => !r.is_read) : rows),
    [rows, onlyUnread]
  );

  const setRead = async (m: Message, is_read: boolean) => {
    const { error: err } = await supabase.from('contact_messages').update({ is_read }).eq('id', m.id);
    if (err) setError(err.message);
    else setRows((rs) => rs.map((r) => (r.id === m.id ? { ...r, is_read } : r)));
  };

  const toggleOpen = (m: Message) => {
    const opening = openId !== m.id;
    setOpenId(opening ? m.id : null);
    if (opening && !m.is_read) setRead(m, true);
  };

  const remove = async (m: Message) => {
    if (!window.confirm(`Permanently delete the message from ${m.name}?`)) return;
    const { error: err } = await supabase.from('contact_messages').delete().eq('id', m.id);
    if (err) setError(err.message);
    else load();
  };

  return (
    <div>
      <PageHeader
        title="Contact inbox"
        subtitle="Messages sent through the website contact form."
        action={
          <Button variant="secondary" onClick={() => setOnlyUnread((v) => !v)}>
            {onlyUnread ? `Showing unread (${unread}), show all` : 'Showing all, show unread only'}
          </Button>
        }
      />

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-cream/70">Loading messages…</p>
      ) : visible.length === 0 ? (
        <Card>
          <p className="text-sm text-cream/80">
            {onlyUnread ? 'No unread messages.' : 'No messages yet.'}
          </p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {visible.map((m) => (
            <li key={m.id}>
              <Card>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-lg font-bold text-white">{m.name}</h3>
                      {!m.is_read && <Badge tone="amber">new</Badge>}
                    </div>
                    <p className="text-sm text-cream/70">{m.email}</p>
                    <p className="mt-1 text-sm text-cream/90">{m.subject || '(no subject)'}</p>
                    <p className="mt-1 text-xs text-cream/50">{formatDateTime(m.created_at)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => toggleOpen(m)}>
                      {openId === m.id ? 'Close' : 'Open'}
                    </Button>
                    <a
                      href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + (m.subject || 'Your message to LAUMED JC'))}`}
                      className="inline-flex items-center rounded-lg border border-line px-4 py-2 text-sm font-semibold text-cream hover:bg-white/5"
                    >
                      Reply by email
                    </a>
                    {m.is_read && (
                      <Button variant="secondary" onClick={() => setRead(m, false)}>
                        Mark unread
                      </Button>
                    )}
                    {canDelete && (
                      <Button variant="danger" onClick={() => remove(m)}>
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
                {openId === m.id && (
                  <p className="mt-4 whitespace-pre-wrap border-t border-line pt-4 text-sm text-cream/90">
                    {m.message}
                  </p>
                )}
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}