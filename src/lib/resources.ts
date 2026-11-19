import { useMemo } from 'react';
import { RESOURCES_LIST, AppraisalToolLink } from '../data/clubData';
import { useRows } from './content';

interface ResourceRow {
  id: string;
  title: string;
  organization: string | null;
  category: string | null;
  description: string | null;
  url: string;
}

// Links become <a href>, so only ever allow web addresses
const safeUrl = (u: string) => (/^https?:\/\//i.test(u) ? u : '#');

export function useResources(): AppraisalToolLink[] {
  const { rows, live } = useRows<ResourceRow>('resources', [], {
    select: 'id, title, organization, category, description, url',
    orderBy: 'sort_order',
  });

  return useMemo(
    () =>
      live
        ? rows.map((r) => ({
            id: r.id,
            title: r.title,
            organization: r.organization ?? '',
            category: r.category ?? '',
            description: r.description ?? '',
            officialUrl: safeUrl(r.url),
          }))
        : RESOURCES_LIST,
    [rows, live]
  );
}