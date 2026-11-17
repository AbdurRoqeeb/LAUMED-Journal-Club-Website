import type { ButtonHTMLAttributes, ReactNode } from 'react';

export const inputClass =
  'w-full rounded-lg bg-black/40 border border-line px-3 py-2 text-sm text-white placeholder:text-cream/40 outline-none focus:border-brand';

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
      <div>
        <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-cream/70">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

type Variant = 'primary' | 'secondary' | 'danger';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-orange-500',
  secondary: 'border border-line text-cream hover:bg-white/5',
  danger: 'border border-red-500/50 text-red-300 hover:bg-red-500/10',
};

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
    />
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-cream/80">{label}</span>
      {children}
      {hint && <span className="block text-xs text-cream/50">{hint}</span>}
    </label>
  );
}

type Tone = 'green' | 'amber' | 'gray';

const TONES: Record<Tone, string> = {
  green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  gray: 'bg-white/5 text-cream/70 border-line',
};

export function Badge({ tone = 'gray', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${TONES[tone]}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-ink-800 p-5 ${className}`}>{children}</div>
  );
}