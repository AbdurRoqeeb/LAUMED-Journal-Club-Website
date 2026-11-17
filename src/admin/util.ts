export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const pad = (n: number) => String(n).padStart(2, '0');

export const toLocalInput = (iso: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const toIso = (local: string) => (local ? new Date(local).toISOString() : null);

export const formatDateTime = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

export const naira = (kobo: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(kobo / 100);

// CSV: neutralise values that a spreadsheet would run as a formula
export const csvCell = (value: string | null | undefined) => {
  let s = value ?? '';
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

// Keeps phone numbers and reference codes as text (no 8E+09, no lost leading zero)
export const textCell = (value: string | null | undefined) => {
  const s = (value ?? '').trim();
  if (s && /^[0-9A-Za-z+\/\-\s().]+$/.test(s)) return `"=""${s}"""`;
  return csvCell(s);
};

export function downloadCsv(filename: string, headers: string[], rows: string[][]) {
  const body = [headers.map(csvCell).join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob(['\uFEFF' + body], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}