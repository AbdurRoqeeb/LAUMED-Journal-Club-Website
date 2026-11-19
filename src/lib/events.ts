import { useMemo } from 'react';
import { CLUB_EVENTS, ClubEvent } from '../data/clubData';
import { useRows } from './content';

interface EventRow {
  slug: string;
  title: string;
  description: string | null;
  starts_at: string | null;
  venue: string | null;
  banner_url: string | null;
  registration_url: string | null;
  is_tentative: boolean;
  details: Record<string, unknown> | null;
}

const LAGOS = 'Africa/Lagos';
const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: LAGOS,
  });
const fmtTime = (d: Date) =>
  d.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: LAGOS });

const text = (v: unknown) => (typeof v === 'string' && v ? v : undefined);

function toEvent(row: EventRow): ClubEvent {
  const d = row.details ?? {};
  const start = row.starts_at ? new Date(row.starts_at) : null;

  // The original date/time wording is only reused while the start time is unchanged.
  // If an admin moves the event, labels are regenerated from the new date instead.
  const labelsFor = text(d.labelsFor);
  const labelsValid = !!start && !!labelsFor && new Date(labelsFor).getTime() === start.getTime();

  return {
    ...d,
    id: row.slug,
    title: row.title,
    theme: text(d.theme) ?? '',
    status: start && start.getTime() < Date.now() ? 'past' : 'upcoming',
    isProvisional: row.is_tentative,
    date: start ? start.toISOString() : '',
    displayDate: (labelsValid && text(d.displayDate)) || (start ? fmtDate(start) : 'Date to be announced'),
    time: (labelsValid && text(d.time)) || (start ? fmtTime(start) : ''),
    venue: row.venue ?? '',
    flyerUrl: row.banner_url ?? text(d.flyerUrl) ?? '',
    description: row.description ?? '',
    registrationOpen:
      typeof d.registrationOpen === 'boolean' ? d.registrationOpen : !!row.registration_url,
    registrationLink: row.registration_url ?? undefined,
  } as unknown as ClubEvent;
}

export function useEvents(): ClubEvent[] {
  const { rows, live } = useRows<EventRow>('events', [], {
    select: 'slug, title, description, starts_at, venue, banner_url, registration_url, is_tentative, details',
    orderBy: 'starts_at',
  });

  return useMemo(() => {
    if (!live) return CLUB_EVENTS;
    const list = rows.map(toEvent);
    const ms = (e: ClubEvent) => new Date(e.date).getTime();
    // Next event first, then past events newest first
    const upcoming = list.filter((e) => e.status === 'upcoming').sort((a, b) => ms(a) - ms(b));
    const past = list.filter((e) => e.status === 'past').sort((a, b) => ms(b) - ms(a));
    return [...upcoming, ...past];
  }, [rows, live]);
}