import React, { useState, useEffect } from 'react';
import { CLUB_EVENTS, ClubEvent } from '../data/clubData';
import {
  Calendar,
  Clock,
  MapPin,
  Download,
  ExternalLink,
  Bell,
  CheckCircle2,
  AlertCircle,
  Users,
  Video,
  X
} from 'lucide-react';
import { LazyImage } from '../components/LazyImage';
import { RevealBlock } from '../components/RevealBlock';

export const EventsView: React.FC = () => {
  const [interestModalOpen, setInterestModalOpen] = useState(false);
  const [selectedEventForInterest, setSelectedEventForInterest] = useState<ClubEvent | null>(null);
  const [interestSubmitted, setInterestSubmitted] = useState(false);
  const [activeFlyer, setActiveFlyer] = useState<{ url: string; title: string } | null>(null);

  // Interest form state for tentative upcoming announcements
  const [interestName, setInterestName] = useState('');
  const [interestEmail, setInterestEmail] = useState('');
  const [interestLevel, setInterestLevel] = useState('500L MB;BS');
  const [interestRef, setInterestRef] = useState('');

  const upcomingEvents = CLUB_EVENTS.filter((e) => e.status === 'upcoming');
  const pastEvents = CLUB_EVENTS.filter((e) => e.status === 'past');
  const primaryUpcoming = upcomingEvents[0];

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!primaryUpcoming) return;

    const target = new Date(primaryUpcoming.date).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(() => {
      if (!document.hidden) {
        updateTimer();
      }
    }, 1000);
    const onVisibility = () => {
      if (!document.hidden) updateTimer();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [primaryUpcoming]);

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `LAUMED-JJCC-${Math.floor(1000 + Math.random() * 9000)}`;
    setInterestRef(ref);
    setInterestSubmitted(true);
  };

  const handleDownloadConferenceReport = (event: ClubEvent) => {
    if (!event.recap) return;

    const reportText = [
      'LAUMED JOURNAL CLUB',
      `${event.title.toUpperCase()} - OFFICIAL SUMMARY`,
      '',
      `EVENT: ${event.title}`,
      `THEME: ${event.theme}`,
      `DATE: ${event.displayDate}`,
      `TIME: ${event.time}`,
      `VENUE: ${event.venue}`,
      '',
      'SUMMARY:',
      event.recap.summary,
      '',
      'KEYNOTE SPEAKER:',
      `${event.recap.keynoteSpeaker.name} (${event.recap.keynoteSpeaker.title})`,
      `Topic: "${event.recap.keynoteSpeaker.topic}"`,
      '',
      'PANELISTS:',
      ...event.recap.panelists.map(
        (p, idx) => `${idx + 1}. ${p.name} — ${p.affiliation}`
      ),
      '',
      'CONTACT:',
      '@Laumedjc · 08118908705 · laumedjc@gmail.com',
      'LAUMED Journal Club · "more is definitely better…"'
    ].join('\n');

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LAUMED_Scientific_Conference_2025_Summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="border-b border-[#ea580c]/20 pb-6 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
          Conferences, Webinars & Announcements
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          LAUMED{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fed7aa] via-[#f97316] to-[#ea580c]">
            Events
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-[#d6cebe] max-w-2xl leading-relaxed">
          Stay updated on upcoming LAUMED Journal Club conferences and announcements, and explore recaps and official flyers from our past webinars and scientific symposia.
        </p>
      </div>

      {/* 1. UPCOMING EVENTS & ANNOUNCEMENTS */}
      {upcomingEvents.length > 0 && (
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Upcoming Events & Announcements
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#1e0e06] border border-[#ea580c]/40 text-[11px] font-mono text-[#fed7aa]">
              Upcoming · Provisional Schedule
            </span>
          </div>

          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="initial-card p-6 sm:p-8 lg:p-10 bg-[#1E0C08] border-2 border-[#ea580c]/50"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Event Details */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs">
                    <span className="px-3 py-1 rounded-md bg-[#ea580c] text-white font-mono font-bold uppercase tracking-wider">
                      Anticipate!
                    </span>
                    {event.isProvisional && (
                      <span className="px-3 py-1 rounded-md bg-[#241106] border border-[#f97316]/50 text-[#fed7aa] font-mono font-semibold flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#f97316]" />
                        Provisional Date — Subject to Confirmation
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {event.subtitle && (
                      <div className="text-xs font-mono uppercase tracking-wider text-[#fed7aa]">
                        {event.subtitle}
                      </div>
                    )}
                    <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#d6cebe] leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Key Date & Logistics Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#080402] border border-[#ea580c]/30 flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] font-mono uppercase text-[#8c7e72]">
                          Tentative Date
                        </div>
                        <div className="text-white font-semibold mt-0.5">
                          12 December 2026
                        </div>
                        <div className="text-[11px] text-[#fed7aa]">
                          Provisional · Subject to confirmation
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#080402] border border-[#ea580c]/30 flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] font-mono uppercase text-[#8c7e72]">
                          Venue & Time
                        </div>
                        <div className="text-white font-semibold mt-0.5">
                          To be announced
                        </div>
                        <div className="text-[11px] text-[#a89f91]">
                          Official details forthcoming
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Countdown to Tentative Date */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase text-[#a89f91] tracking-wider block">
                      Countdown to Tentative Date (12 Dec 2026 — Subject to Confirmation):
                    </span>
                    <div className="grid grid-cols-4 max-w-md gap-3 text-center">
                      <div className="p-3 bg-[#080402] border border-[#ea580c]/30 rounded-xl">
                        <div className="text-xl sm:text-2xl font-mono font-bold text-[#ea580c]">
                          {timeLeft.days}
                        </div>
                        <div className="text-[10px] text-[#8c7e72] uppercase font-mono">Days</div>
                      </div>
                      <div className="p-3 bg-[#080402] border border-[#ea580c]/30 rounded-xl">
                        <div className="text-xl sm:text-2xl font-mono font-bold text-[#ea580c]">
                          {timeLeft.hours}
                        </div>
                        <div className="text-[10px] text-[#8c7e72] uppercase font-mono">Hours</div>
                      </div>
                      <div className="p-3 bg-[#080402] border border-[#ea580c]/30 rounded-xl">
                        <div className="text-xl sm:text-2xl font-mono font-bold text-[#ea580c]">
                          {timeLeft.minutes}
                        </div>
                        <div className="text-[10px] text-[#8c7e72] uppercase font-mono">Mins</div>
                      </div>
                      <div className="p-3 bg-[#080402] border border-[#ea580c]/30 rounded-xl">
                        <div className="text-xl sm:text-2xl font-mono font-bold text-[#ea580c]">
                          {timeLeft.seconds}
                        </div>
                        <div className="text-[10px] text-[#8c7e72] uppercase font-mono">Secs</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedEventForInterest(event);
                        setInterestSubmitted(false);
                        setInterestModalOpen(true);
                      }}
                      className="btn-flame px-5 py-2.5 flex items-center gap-2"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Get Updates / Express Interest</span>
                    </button>
                    <button
                      onClick={() =>
                        setActiveFlyer({ url: event.flyerUrl, title: event.title })
                      }
                      className="btn-outline-amber px-4 py-2.5 flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#ea580c]" />
                      <span>View Announcement Flyer</span>
                    </button>
                  </div>
                </div>

                {/* JJCC Official Flyer Preview */}
                <div className="lg:col-span-5">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveFlyer({ url: event.flyerUrl, title: event.title })
                    }
                    className="group relative block w-full cursor-pointer rounded-2xl overflow-hidden border-2 border-[#ea580c]/50 shadow-2xl bg-[#080402] max-w-sm mx-auto"
                    aria-label={`Enlarge ${event.title} announcement flyer`}
                  >
                    <LazyImage
                      src={event.flyerUrl}
                      alt="LAUMED Journal Club Joint Journal Club Conference (JJCC) Announcement Flyer"
                      aspectRatioClassName="aspect-[4/5]"
                      priority
                      className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 bg-[#ea580c] text-white text-xs font-bold uppercase rounded-lg shadow-lg">
                        Enlarge JJCC Flyer
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 2. PAST EVENTS & ARCHIVED RECAPS */}
      {pastEvents.length > 0 && (
        <section className="cv-auto space-y-12">
          <div className="border-b border-[#ea580c]/20 pb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
                Completed Programmes
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Past Events & Flyers
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#140a05] border border-[#ea580c]/25 text-[11px] font-mono text-[#a89f91]">
              {pastEvents.length} Past Events
            </span>
          </div>

          <div className="space-y-12">
            {pastEvents.map((event) => (
              <RevealBlock key={event.id}>
              <div
                className="initial-card p-6 sm:p-8 lg:p-10 space-y-8 bg-[#1E0C08]"
              >
                {/* Header & Meta */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#1e0e06] border border-[#ea580c]/40 text-[#fed7aa] font-mono font-bold uppercase">
                        Past Event
                      </span>
                      {event.isFlagship && (
                        <span className="px-2.5 py-0.5 rounded-md bg-[#ea580c]/20 border border-[#ea580c] text-[#f97316] font-mono font-bold uppercase">
                          Flagship Launch Conference
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {event.subtitle && (
                        <div className="text-xs font-mono uppercase tracking-wider text-[#ea580c]">
                          {event.subtitle}
                        </div>
                      )}
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#fed7aa] font-serif italic">
                        "{event.theme}"
                      </p>
                    </div>

                    {/* Event Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-[#080402] border border-[#ea580c]/20 flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#8c7e72]">
                            Date
                          </div>
                          <div className="text-white font-medium">{event.displayDate}</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#080402] border border-[#ea580c]/20 flex items-start gap-2">
                        <Clock className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#8c7e72]">
                            Time
                          </div>
                          <div className="text-white font-medium">{event.time}</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#080402] border border-[#ea580c]/20 flex items-start gap-2">
                        {event.venue.toLowerCase().includes('meet') ? (
                          <Video className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                        ) : (
                          <MapPin className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="text-[10px] font-mono uppercase text-[#8c7e72]">
                            Venue
                          </div>
                          <div className="text-white font-medium">{event.venue}</div>
                          {event.registrationFee && (
                            <div className="text-[11px] font-mono text-[#fed7aa] mt-0.5">
                              Registration fee: {event.registrationFee}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#d6cebe] leading-relaxed">
                      {event.recap ? event.recap.summary : event.description}
                    </p>

                    {/* Webinar / Programme Highlights */}
                    {event.highlights && event.highlights.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <div className="text-xs font-mono uppercase tracking-wider text-[#ea580c] font-bold">
                          {event.highlightsTitle || 'Featuring / Topics Covered'}
                        </div>
                        <ul className="space-y-2 text-xs sm:text-sm text-[#e6ddd4]">
                          {event.highlights.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-md bg-[#1e0e06] border border-[#ea580c] text-[#ea580c] font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                0{i + 1}
                              </span>
                              <span className="leading-relaxed">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Speakers (for Research Webinar Series) */}
                    {event.speakers && event.speakers.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ea580c] font-bold">
                          <Users className="w-4 h-4" />
                          <span>Speakers</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {event.speakers.map((speaker, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-xl bg-[#080402] border border-[#ea580c]/25 flex items-center gap-3"
                            >
                              <div className="w-7 h-7 rounded-full bg-[#1e0e06] border border-[#ea580c] text-[#ea580c] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                                0{idx + 1}
                              </div>
                              <div>
                                <div className="text-sm font-serif font-bold text-white">
                                  {speaker.name}
                                </div>
                                {speaker.role && (
                                  <div className="text-[11px] font-mono text-[#fed7aa]">
                                    {speaker.role}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Judges & Sponsor (for LAUMED Hackathon & Abstract Presentation) */}
                    {((event.judges && event.judges.length > 0) || event.sponsor) && (
                      <div className="space-y-4 pt-2">
                        {event.judges && event.judges.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ea580c] font-bold">
                              <Users className="w-4 h-4" />
                              <span>Judges</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {event.judges.map((judge, idx) => (
                                <div
                                  key={idx}
                                  className="p-3.5 rounded-xl bg-[#080402] border border-[#ea580c]/25 space-y-1.5"
                                >
                                  <div className="w-6 h-6 rounded-full bg-[#1e0e06] border border-[#ea580c] text-[#ea580c] font-mono text-[10px] font-bold flex items-center justify-center">
                                    0{idx + 1}
                                  </div>
                                  <div className="text-sm font-serif font-bold text-white leading-snug">
                                    {judge.name}
                                  </div>
                                  <div className="text-[11px] text-[#fed7aa] leading-relaxed">
                                    {judge.title}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {event.sponsor && (
                          <div className="p-4 rounded-xl bg-[#080402] border border-[#ea580c]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-[#ea580c] font-bold">
                                Sponsor
                              </div>
                              <div className="text-sm font-serif font-bold text-white mt-0.5">
                                {event.sponsor.name}
                              </div>
                              <div className="text-xs text-[#fed7aa]">
                                {event.sponsor.title}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Flyer Thumbnail Preview */}
                  <div className="lg:col-span-4 space-y-3">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveFlyer({ url: event.flyerUrl, title: event.title })
                      }
                      className="group relative block w-full cursor-pointer rounded-2xl overflow-hidden border-2 border-[#ea580c]/45 shadow-xl bg-[#080402] max-w-xs mx-auto"
                      aria-label={`Enlarge ${event.title} flyer`}
                    >
                      <LazyImage
                        src={event.flyerUrl}
                        alt={`${event.title} Official Flyer`}
                        aspectRatioClassName="aspect-[4/5]"
                        className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 bg-[#ea580c] text-white text-xs font-bold uppercase rounded-lg shadow-lg">
                          Enlarge Flyer
                        </span>
                      </div>
                    </button>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveFlyer({ url: event.flyerUrl, title: event.title })
                        }
                        className="text-xs font-semibold text-[#fb923c] hover:text-[#fed7aa] inline-flex items-center gap-1.5 hover:underline min-h-[44px] px-3"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Full Flyer</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Flagship Keynote & Panelists Recap */}
                {event.recap && (
                  <div className="space-y-6 pt-6 border-t border-[#ea580c]/20">
                    {/* Keynote Speaker */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#0d0603] border border-[#ea580c]/25 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ea580c]/15 pb-3">
                        <span className="text-xs font-mono uppercase text-[#ea580c] font-bold">
                          Keynote Address
                        </span>
                        <span className="text-xs font-mono text-[#fed7aa] bg-[#220d06] px-2.5 py-0.5 rounded border border-[#ea580c]/30">
                          Keynote Speaker
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
                          {event.recap.keynoteSpeaker.name}
                        </h4>
                        <div className="text-xs text-[#fed7aa] font-mono mt-0.5">
                          {event.recap.keynoteSpeaker.title}
                        </div>
                      </div>
                      <div className="p-3.5 bg-[#160a05] rounded-xl border border-[#ea580c]/20 text-xs sm:text-sm text-[#faf5ee]">
                        <strong className="text-[#ea580c] block mb-1">Keynote Topic:</strong>
                        "{event.recap.keynoteSpeaker.topic}"
                      </div>
                    </div>

                    {/* Panelists */}
                    <div className="space-y-3">
                      <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                        Conference Panelists
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {event.recap.panelists.map((panelist, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-[#0d0603] border border-[#ea580c]/25 space-y-2.5"
                          >
                            <div className="w-7 h-7 rounded-full bg-[#1e0e06] border border-[#ea580c] text-[#ea580c] font-mono text-xs font-bold flex items-center justify-center">
                              0{idx + 1}
                            </div>
                            <h5 className="text-sm font-serif font-bold text-white leading-snug">
                              {panelist.name}
                            </h5>
                            <div className="text-[11px] text-[#fed7aa] leading-relaxed">
                              {panelist.affiliation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              </RevealBlock>
            ))}
          </div>
        </section>
      )}

      {/* High-Resolution Flyer Lightbox Modal */}
      {activeFlyer && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeFlyer.title} Flyer Preview`}
          onClick={() => setActiveFlyer(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#0d0704] border border-[#ea580c]/40 rounded-2xl overflow-hidden p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#ea580c]/20 text-xs">
              <span className="font-semibold text-white">{activeFlyer.title} — Official Flyer</span>
              <button
                type="button"
                onClick={() => setActiveFlyer(null)}
                className="text-[#a89f91] hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-[#1e0e06]"
                aria-label="Close flyer preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 max-h-[82dvh] overflow-y-auto overscroll-contain flex justify-center bg-[#080402]">
              <img
                src={activeFlyer.url}
                alt={`${activeFlyer.title} Flyer`}
                decoding="async"
                className="max-w-full max-h-[76dvh] w-auto rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Express Interest / Updates Modal for Provisional JJCC Event */}
      {interestModalOpen && selectedEventForInterest && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedEventForInterest.title}
          onClick={() => {
            setInterestModalOpen(false);
            setInterestSubmitted(false);
          }}
        >
          <div
            className="relative max-w-md w-full bg-[#0e0704] border border-[#ea580c]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-auto max-h-[92dvh] overflow-y-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#ea580c]/20 pb-3 gap-3">
              <div>
                <span className="text-xs font-mono uppercase text-[#fb923c] font-bold">
                  Provisional Event Updates
                </span>
                <h3 className="text-lg font-serif font-bold text-white">
                  {selectedEventForInterest.title}
                </h3>
                <p className="text-[11px] font-mono text-[#fed7aa] mt-0.5">
                  Tentative Date: 12 December 2026 (Subject to Confirmation)
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setInterestModalOpen(false);
                  setInterestSubmitted(false);
                }}
                className="text-[#a89f91] hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-[#1e0e06]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {interestSubmitted ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold text-white">
                    Interest Recorded!
                  </h4>
                  <p className="text-xs text-[#d6cebe] mt-1">
                    You will be notified once the final date, venue, and registration portal for JJCC are confirmed.
                  </p>
                </div>
                <div className="p-3 bg-[#180a05] rounded-xl border border-[#ea580c]/30 font-mono text-xs text-left space-y-1">
                  <div className="text-[#ea580c] font-bold">{interestRef}</div>
                  <div className="text-white">Name: {interestName}</div>
                  <div className="text-[#d6cebe]">Email: {interestEmail}</div>
                  <div className="text-[#fed7aa]">Level: {interestLevel}</div>
                </div>
                <button
                  onClick={() => {
                    setInterestModalOpen(false);
                    setInterestSubmitted(false);
                  }}
                  className="btn-flame w-full py-2.5 text-xs font-bold uppercase rounded-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleInterestSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#faf5ee]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={interestName}
                    onChange={(e) => setInterestName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#faf5ee]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={interestEmail}
                    onChange={(e) => setInterestEmail(e.target.value)}
                    placeholder="name@student.lautech.edu.ng"
                    className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#faf5ee]">
                    Academic Level / Status
                  </label>
                  <select
                    value={interestLevel}
                    onChange={(e) => setInterestLevel(e.target.value)}
                    className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                  >
                    <option value="200L - 300L (Pre-clinical)">200L - 300L (Pre-clinical)</option>
                    <option value="400L MB;BS">400L MB;BS (Junior Clinical)</option>
                    <option value="500L MB;BS">500L MB;BS (Senior Clinical)</option>
                    <option value="600L MB;BS">600L MB;BS (Finalist)</option>
                    <option value="Junior Doctor / House Officer">
                      Junior Doctor / House Officer
                    </option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-flame w-full py-2.5 text-xs font-bold uppercase rounded-lg"
                  >
                    Notify Me When Confirmed
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
