import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Anonymous client for the public site. It never stores or reuses a login session,
// so visitors (and admins browsing the public site) only ever see published content.
const publicClient =
  url && key
    ? createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
          storageKey: 'laumed-public',
        },
      })
    : null;

interface Options {
  select?: string;
  orderBy?: string;
  ascending?: boolean;
  // While content is still being moved over, an empty table shows the built-in content.
  // Set to false once a table is seeded so deleting everything really empties the page.
  emptyMeansFallback?: boolean;
}

const cache = new Map<string, unknown[]>();

/**
 * Loads rows from Supabase for a public page. Shows `fallback` (the built-in content)
 * instantly and whenever the request fails, so the site never goes blank.
 * `live` is true once the rows came from the database.
 */
export function useRows<T>(table: string, fallback: T[], opts: Options = {}) {
  const { select = '*', orderBy, ascending = true, emptyMeansFallback = true } = opts;
  const key = `${table}|${select}|${orderBy ?? ''}|${ascending}`;

  const [rows, setRows] = useState<T[]>(() => (cache.get(key) as T[] | undefined) ?? fallback);
  const [live, setLive] = useState(cache.has(key));

  useEffect(() => {
    if (!publicClient) return;
    let cancelled = false;

    let query = publicClient.from(table).select(select);
    if (orderBy) query = query.order(orderBy, { ascending });

    query.then(({ data, error }) => {
      if (cancelled || error || !data) return;
      if (data.length === 0 && emptyMeansFallback) return;
      cache.set(key, data);
      setRows(data as unknown as T[]);
      setLive(true);
    });

    return () => {
      cancelled = true;
    };
    // fallback is intentionally left out: it is a static object that never changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { rows, live };
}

export { publicClient };