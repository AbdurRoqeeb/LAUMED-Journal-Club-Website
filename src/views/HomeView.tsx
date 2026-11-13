import React from 'react';
import { PageId } from '../components/Navbar';
import { CLUB_INFO, JOURNAL_SESSIONS, CLUB_EVENTS, JOURNAL_INFO, JournalSession } from '../data/clubData';
import { 
  ArrowRight, 
  BookOpen, 
  UserPlus, 
  ChevronRight,
  MapPin
} from 'lucide-react';
import { HeroVisualBackground } from '../components/HeroVisualBackground';

interface HomeViewProps {
  setCurrentPage: (page: PageId) => void;
  onOpenSessionModal: (session: JournalSession) => void;
  openSubmitModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentPage,
  onOpenSessionModal,
  openSubmitModal
}) => {
  // Featured event card pulled from Events data (prioritize upcoming event, fallback to flagship)
  const featuredEvent =
    CLUB_EVENTS.find(e => e.status === 'upcoming') ||
    CLUB_EVENTS.find(e => e.isFlagship) ||
    CLUB_EVENTS[0];
  const recentSessions = JOURNAL_SESSIONS.slice(0, 3);

  const whatWeDoCards = [
    {
      num: "01",
      title: "Research",
      desc: "Mentoring medical students in ethical clinical trial design, proposal drafting, data collection, and publishing in peer-reviewed journals."
    },
    {
      num: "02",
      title: "Critical Appraisal",
      desc: "Interrogating landmark biomedical trials and clinical studies using validated appraisal frameworks (CASP, CONSORT, PRISMA, STROBE)."
    },
    {
      num: "03",
      title: "Scientific Communication",
      desc: "Equipping medical trainees to present research compellingly, master visual abstract design, and articulate findings with clinical authority."
    },
    {
      num: "04",
      title: "Collaboration",
      desc: "Connecting bedside medicine with artificial intelligence, health informatics, and clinical computing at LAUTECH and beyond."
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION WITH MEDICAL-TECH CANVAS BACKGROUND & LOGO WATERMARK */}
      <section className="relative isolate overflow-hidden pt-16 sm:pt-24 pb-24 bg-transparent">
        {/* Animated ECG Heartbeat, DNA Helix, Cells & Molecules + Breathing Logo Watermark */}
        <HeroVisualBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Tagline / Subtitle */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#180a04] border border-[#ea580c]/40 shadow-[0_0_15px_rgba(234,88,12,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#f97316] ring-4 ring-[#ea580c]/20" />
              <span className="text-xs font-mono tracking-wider uppercase text-[#fed7aa]">
                LAUMED Journal Club · LAUTECH, Ogbomoso
              </span>
            </div>

            {/* Headline "More is definitely better." with "better." in orange */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-[#faf5ee] leading-[1.1] tracking-tight">
              More is definitely{' '}
              <span className="text-[#ea580c] font-semibold italic">
                better.
              </span>
            </h1>

            {/* One-line mission */}
            <p className="text-base sm:text-xl text-[#d6cebe] font-sans max-w-2xl mx-auto leading-relaxed">
              Critical appraisal, research, and scientific communication at LAUTECH.
            </p>

            {/* Two Buttons: "Explore the Journal" and "Join the Club" */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage('journal')}
                className="btn-flame px-6 py-3.5 flex items-center gap-2 shadow-lg"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore the Journal</span>
              </button>
              <button
                onClick={() => setCurrentPage('membership')}
                className="btn-outline-amber px-6 py-3.5 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4 text-[#ea580c]" />
                <span>Join the Club</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CARD: "Upcoming Event" (pulled from Events data) */}
      {featuredEvent && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="initial-card p-6 sm:p-8 bg-[#1E0C08] border border-[#ea580c]/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-9 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono uppercase font-bold text-[#ea580c] tracking-wider">
                      {featuredEvent.status === 'upcoming' ? 'Upcoming Event Announcement' : 'Latest Event'}
                    </span>
                    {featuredEvent.isProvisional && (
                      <span className="px-2.5 py-0.5 rounded bg-[#2A120B] border border-[#f97316]/40 text-[11px] font-mono text-[#fed7aa]">
                        Tentative · Subject to Confirmation
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[#fed7aa]">
                    {featuredEvent.displayDate}
                    {featuredEvent.time && featuredEvent.time !== 'To be announced' ? ` · ${featuredEvent.time}` : ''}
                  </span>
                </div>

                <div className="space-y-2">
                  {featuredEvent.subtitle && (
                    <div className="text-xs font-mono uppercase tracking-wider text-[#fed7aa]">
                      {featuredEvent.subtitle}
                    </div>
                  )}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#fed7aa] font-serif italic">
                    "{featuredEvent.theme}"
                  </p>
                  <p className="text-xs sm:text-sm text-[#d6cebe] leading-relaxed max-w-3xl">
                    {featuredEvent.description}
                  </p>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#ea580c]/15">
                  <span className="text-[#a89f91] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#ea580c]" />
                    {featuredEvent.venue === 'To be announced' ? 'Venue & time to be announced' : featuredEvent.venue}
                  </span>
                  <button
                    onClick={() => setCurrentPage('events')}
                    className="text-[#ea580c] hover:text-[#f97316] font-semibold flex items-center gap-1 hover:underline"
                  >
                    <span>
                      {featuredEvent.status === 'upcoming' ? 'View Upcoming Event & Flyer' : 'View Event Details & Recap'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {featuredEvent.flyerUrl && (
                <div className="lg:col-span-3 flex justify-center lg:justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentPage('events')}
                    className="group relative rounded-xl overflow-hidden border border-[#ea580c]/40 bg-[#080402] hover:border-[#f97316] transition-colors"
                    aria-label={`View ${featuredEvent.title} flyer`}
                  >
                    <img
                      src={featuredEvent.flyerUrl}
                      alt={`${featuredEvent.title} flyer`}
                      className="w-44 sm:w-48 lg:w-full max-h-52 object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 3. "WHAT WE DO": FOUR NUMBERED CARDS (Research, Critical Appraisal, Scientific Communication, Collaboration) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[#ea580c]/20 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
            Pillars of Scholarly Rigor
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
            What We Do
          </h2>
          <p className="text-xs sm:text-sm text-[#d6cebe] mt-1 max-w-xl">
            Four pillars cultivating scientific inquiry, evidence synthesis, and medical innovation among future physicians.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whatWeDoCards.map((card) => (
            <div
              key={card.num}
              className="initial-card p-6 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Numbered badge in orange circle */}
                <div className="w-10 h-10 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#ea580c] text-xs font-mono font-bold flex items-center justify-center shadow-[0_0_12px_rgba(234,88,12,0.25)] group-hover:bg-[#ea580c] group-hover:text-white transition-colors">
                  {card.num}
                </div>

                <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#f97316] transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs text-[#d6cebe] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. "RECENT JOURNAL CLUB WEEKLY ARTICLES": LIST OF THREE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ea580c]/20 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
              Student-Authored Weekly Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Recent Journal Club Weekly Articles
            </h2>
            <p className="text-xs sm:text-sm text-[#d6cebe] mt-1">
              Weekly medical, clinical, and public health articles written by LAUMED Journal Club members at LAUTECH.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('journal-club')}
            className="text-xs font-semibold text-[#ea580c] hover:text-[#f97316] flex items-center gap-1 shrink-0 hover:underline"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentSessions.map((article) => (
            <div
              key={article.id}
              onClick={() => onOpenSessionModal(article)}
              className="initial-card p-6 flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                {/* Date & Topic Tag */}
                <div className="flex items-center justify-between text-xs text-[#a89f91]">
                  <span className="font-mono text-[#ea580c] font-bold">
                    {article.date}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1e0e06] border border-[#ea580c]/30 text-[#fed7aa] text-[10px] font-mono">
                    {article.topicTag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-serif font-bold text-white group-hover:text-[#f97316] transition-colors leading-snug line-clamp-3">
                  {article.title}
                </h3>

                <p className="text-xs text-[#d6cebe] line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              {/* Author */}
              <div className="pt-3 border-t border-[#ea580c]/15 text-xs">
                <div className="text-[11px] text-[#8c7e72] truncate">
                  <span className="text-white font-medium">Author:</span> {article.author}
                </div>
                <div className="mt-2 text-xs font-semibold text-[#ea580c] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. JOURNAL SPOTLIGHT: "Medificial Intelligence" JOURNAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#1E0C08] border border-[#ea580c]/40 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 bg-[#ea580c] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-md">
                Official Peer-Reviewed Journal
              </span>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
                Medificial <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fed7aa] via-[#f97316] to-[#ea580c]">Intelligence</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#d6cebe] leading-relaxed max-w-2xl">
                {JOURNAL_INFO.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentPage('journal')}
                  className="btn-flame px-6 py-3 flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore the Journal</span>
                </button>
                <button
                  onClick={openSubmitModal}
                  className="btn-outline-amber px-6 py-3"
                >
                  Submit a Manuscript
                </button>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl p-6 bg-[#2A120B] border border-[#ea580c]/30 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-[#261007] border-2 border-[#ea580c] mx-auto flex items-center justify-center text-[#ea580c] font-serif font-bold text-2xl shadow-[0_0_20px_rgba(234,88,12,0.3)]">
                  M
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-[#ea580c] font-bold">Inaugural Launch Issue</div>
                  <div className="text-sm font-serif font-bold text-white">Volume 1, Issue 1</div>
                  <div className="text-xs text-[#8c7e72] font-mono">{JOURNAL_INFO.currentIssue.publicationDate}</div>
                </div>
                <div className="text-[11px] text-[#fed7aa] italic font-serif">
                  "{JOURNAL_INFO.currentIssue.title}"
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL-TO-ACTION BAND: "BECOME A MEMBER" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="initial-card p-8 sm:p-12 text-center space-y-4 bg-[#1E0C08]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
            Join the Scholarly Movement
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Become a Member of LAUMED Journal Club
          </h2>
          <p className="text-xs sm:text-sm text-[#d6cebe] max-w-xl mx-auto leading-relaxed">
            Gain structured critical appraisal training, co-author clinical papers, and collaborate with leading faculty researchers at LAUTECH.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentPage('membership')}
              className="btn-flame px-8 py-3.5 shadow-lg"
            >
              Become a Member
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
