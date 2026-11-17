import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import EventsModule from './EventsModule';
import ApplicationsModule from './ApplicationsModule';
import BooksModule from './BooksModule';
import { Button, Card, PageHeader, inputClass } from './ui';

type Role = 'super_admin' | 'editor' | 'moderator';

interface Profile {
  full_name: string;
  role: Role;
}

const ROLE_LABEL: Record<Role, string> = {
  super_admin: 'Super admin',
  editor: 'Editor',
  moderator: 'Moderator',
};

// This only decides what to show. The real protection is Row Level Security in the database.
const MODULES: { id: string; label: string; roles: Role[] }[] = [
  { id: 'events', label: 'Events & announcements', roles: ['super_admin', 'editor'] },
  { id: 'issues', label: 'Journal issues & articles', roles: ['super_admin', 'editor'] },
  { id: 'orders', label: 'Book pre-orders', roles: ['super_admin', 'editor'] },
  { id: 'applications', label: 'Membership applications', roles: ['super_admin', 'editor', 'moderator'] },
  { id: 'messages', label: 'Contact inbox', roles: ['super_admin', 'editor', 'moderator'] },
  { id: 'resources', label: 'Resources & editorial board', roles: ['super_admin', 'editor'] },
  { id: 'admins', label: 'Admin accounts', roles: ['super_admin'] },
];

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 p-4 text-cream">
      {children}
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand font-serif text-sm font-bold text-white">
        LJ
      </div>
      <div className="leading-tight">
        <div className="font-serif text-base font-bold text-white">LAUMED JC</div>
        <div className="text-xs text-cream/60">Admin</div>
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const signIn = async () => {
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError('Sign-in failed. Check your email and password.');
    setBusy(false);
  };

  return (
    <Centered>
      <Card className="w-full max-w-sm space-y-5 p-8">
        <Brand />
        <p className="text-sm text-cream/70">Authorised editors only.</p>
        <input
          type="email"
          autoComplete="username"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        <input
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !busy && email && password && signIn()}
          className={inputClass}
        />
        {error && <p className="text-sm text-red-300">{error}</p>}
        <Button onClick={signIn} disabled={busy || !email || !password} className="w-full">
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>
      </Card>
    </Centered>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div>
      <PageHeader title={title} />
      <Card>
        <p className="text-sm text-cream/80">This module is built in an upcoming step.</p>
      </Card>
    </div>
  );
}

export default function AdminApp() {
  // undefined = still checking, null = signed out / no profile
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [active, setActive] = useState<string>(() => window.location.hash.slice(1) || 'events');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setProfile(session === null ? null : undefined);
      return;
    }
    setProfile(undefined);
    supabase
      .from('admin_profiles')
      .select('full_name, role')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => setProfile((data as Profile | null) ?? null));
  }, [session]);

  const go = (id: string) => {
    setActive(id);
    setMenuOpen(false);
    window.history.replaceState(null, '', `#${id}`);
  };

  if (session === undefined || (session && profile === undefined)) {
    return <Centered>Loading…</Centered>;
  }

  if (!session) return <LoginForm />;

  if (!profile) {
    return (
      <Centered>
        <Card className="max-w-sm space-y-4 text-center">
          <h1 className="font-serif text-xl font-bold text-white">No admin access</h1>
          <p className="text-sm text-cream/80">
            {session.user.email} is signed in but is not set up as an admin. Ask a super admin to add you.
          </p>
          <Button variant="secondary" onClick={() => supabase.auth.signOut()}>
            Sign out
          </Button>
        </Card>
      </Centered>
    );
  }

  const visible = MODULES.filter((m) => m.roles.includes(profile.role));
  const current = visible.find((m) => m.id === active) ?? visible[0];

  return (
    <div className="min-h-screen bg-ink-900 text-cream md:flex">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-ink-800 px-4 py-3 md:hidden">
        <Brand />
        <Button variant="secondary" onClick={() => setMenuOpen((o) => !o)}>
          {menuOpen ? 'Close' : 'Menu'}
        </Button>
      </header>

      <aside
        className={`${menuOpen ? 'flex' : 'hidden'} flex-col border-r border-line bg-ink-800 p-4 md:sticky md:top-0 md:flex md:h-screen md:w-64 md:shrink-0`}
      >
        <div className="mb-6 hidden md:block">
          <Brand />
        </div>
        <div className="mb-4 rounded-lg border border-line bg-black/20 px-3 py-2">
          <div className="truncate text-sm font-semibold text-white">{profile.full_name}</div>
          <div className="text-xs text-cream/60">{ROLE_LABEL[profile.role]}</div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {visible.map((m) => (
            <button
              key={m.id}
              onClick={() => go(m.id)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                current?.id === m.id
                  ? 'bg-brand font-semibold text-white'
                  : 'text-cream/80 hover:bg-white/5'
              }`}
            >
              {m.label}
            </button>
          ))}
        </nav>
        <Button variant="secondary" className="mt-4" onClick={() => supabase.auth.signOut()}>
          Sign out
        </Button>
      </aside>

      <main className="min-w-0 flex-1 p-5 md:p-10">
        <div className="mx-auto max-w-5xl">
          {current?.id === 'events' ? (
            <EventsModule />
          ) : current?.id === 'orders' ? (
            <BooksModule />
          ) : current?.id === 'applications' ? (
            <ApplicationsModule canDelete={profile.role === 'super_admin'} />
          ) : (
            <ComingSoon title={current?.label ?? ''} />
          )}
        </div>
      </main>
    </div>
  );
}