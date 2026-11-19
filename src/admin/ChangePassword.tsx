import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button, inputClass } from './ui';

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const save = async () => {
    if (pw.length < 10) return setMsg({ ok: false, text: 'Use at least 10 characters.' });
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) return setMsg({ ok: false, text: error.message });
    setPw('');
    setMsg({ ok: true, text: 'Password changed.' });
  };

  if (!open) {
    return (
      <Button variant="secondary" className="mt-4" onClick={() => setOpen(true)}>
        Change password
      </Button>
    );
  }

  return (
    <div className="mt-4 space-y-2 rounded-lg border border-line bg-black/20 p-3">
      <input
        type="password"
        autoComplete="new-password"
        className={inputClass}
        placeholder="New password (10+ characters)"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      {msg && <p className={`text-xs ${msg.ok ? 'text-emerald-300' : 'text-red-300'}`}>{msg.text}</p>}
      <div className="flex gap-2">
        <Button onClick={save} disabled={busy || !pw} className="flex-1">
          {busy ? 'Saving…' : 'Save'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setOpen(false);
            setPw('');
            setMsg(null);
          }}
        >
          Close
        </Button>
      </div>
    </div>
  );
}