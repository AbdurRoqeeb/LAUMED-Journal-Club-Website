import React, { useState, useMemo, useEffect } from 'react';
import { JOURNAL_SESSIONS, JournalSession } from '../data/clubData';
import { RevealBlock } from '../components/RevealBlock';
import {
  Search,
  ChevronRight,
  ChevronDown,
  FileText,
  BookOpen,
  Calendar,
  User,
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';

interface JournalClubViewProps {
  onOpenSessionModal: (session: JournalSession) => void;
}

const BATCH_SIZE = 8;

export const JournalClubView: React.FC<JournalClubViewProps> = ({ onOpenSessionModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const topics = useMemo(() => {
    const set = new Set<string>();
    JOURNAL_SESSIONS.forEach((s) => set.add(s.topicTag));
    return ['All', ...Array.from(set)];
  }, []);

  const years = useMemo(() => {
    const set = new Set<number>();
    JOURNAL_SESSIONS.forEach((s) => set.add(s.year));
    return ['All', ...Array.from(set).sort((a, b) => b - a).map((y) => y.toString())];
  }, []);

  const filteredSessions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return JOURNAL_SESSIONS.filter((article) => {
      const matchSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.author.toLowerCase().includes(q) ||
        article.topicTag.toLowerCase().includes(q) ||
        article.date.toLowerCase().includes(q) ||
        article.paragraphs.some((p) => p.toLowerCase().includes(q));

      const matchTopic = selectedTopic === 'All' || article.topicTag === selectedTopic;
      const matchYear = selectedYear === 'All' || article.year.toString() === selectedYear;

      return matchSearch && matchTopic && matchYear;
    });
  }, [searchQuery, selectedTopic, selectedYear]);

  // Reset pagination batch when search or filter changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [searchQuery, selectedTopic, selectedYear]);

  const displayedSessions = useMemo(
    () => filteredSessions.slice(0, visibleCount),
    [filteredSessions, visibleCount]
  );

  const activeFilterCount =
    (searchQuery.trim() ? 1 : 0) +
    (selectedTopic !== 'All' ? 1 : 0) +
    (selectedYear !== 'All' ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTopic('All');
    setSelectedYear('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Page Header */}
      <div id="jc-overview" className="scroll-mt-24 border-b border-[#ea580c]/20 pb-6 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
          LAUMED Journal Club · LAUTECH
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          Journal Club{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fed7aa] via-[#f97316] to-[#ea580c]">
            Weekly Articles
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-[#d6cebe] max-w-2xl leading-relaxed">
          Explore our weekly scholarly articles authored by student members of the LAUMED Journal Club at Ladoke Akintola University of Technology, Ogbomoso.
        </p>
      </div>

      {/* Sticky Filter Section (collapsed into single Filter button on mobile) */}
      <section
        id="jc-filters"
        aria-label="Filter weekly articles"
        className="scroll-mt-24 md:static sticky z-20"
        style={{ top: 'var(--nav-sticky-top, 5.25rem)' }}
      >
            {/* Mobile compact sticky trigger */}
            <div className="md:hidden initial-card px-4 py-2.5 flex items-center justify-between gap-3 bg-[#1E0C08]/95 backdrop-blur-md">
              <div className="text-xs font-mono text-[#d6cebe]">
                Showing <strong className="text-[#fed7aa]">{displayedSessions.length}</strong> of{' '}
                <strong className="text-white">{filteredSessions.length}</strong>
              </div>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen((prev) => !prev)}
                aria-expanded={mobileFiltersOpen}
                aria-controls="mobile-filter-panel"
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#2A120B] border border-[#ea580c]/45 text-xs font-semibold text-[#fed7aa] hover:text-white inline-flex items-center gap-2 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#ea580c]" aria-hidden="true" />
                <span>Filter</span>
                {activeFilterCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#ea580c] text-white text-[10px] font-mono font-bold">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    mobileFiltersOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Full filter controls (always visible on md+, collapsible on mobile) */}
            <div
              id="mobile-filter-panel"
              className={`initial-card p-4 sm:p-5 space-y-4 mt-2 md:mt-0 ${
                mobileFiltersOpen ? 'block' : 'hidden md:block'
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#ea580c]" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search weekly articles by title, author, topic, or keyword..."
                    aria-label="Search weekly articles"
                    className="w-full min-h-[44px] pl-10 pr-16 py-2.5 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white placeholder-[#b5a89c] focus:outline-none focus:border-[#ea580c]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[36px] px-2.5 text-xs text-[#fed7aa] hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Topic & Year Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 min-h-[44px] px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-[#d6cebe]">
                    <span className="font-mono text-[#fb923c]">Topic:</span>
                    <select
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      aria-label="Filter articles by topic"
                      className="bg-transparent text-white focus:outline-none cursor-pointer min-h-[36px]"
                    >
                      {topics.map((t) => (
                        <option key={t} value={t} className="bg-[#120804]">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5 min-h-[44px] px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-[#d6cebe]">
                    <span className="font-mono text-[#fb923c]">Year:</span>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      aria-label="Filter articles by year"
                      className="bg-transparent text-white focus:outline-none cursor-pointer min-h-[36px]"
                    >
                      {years.map((y) => (
                        <option key={y} value={y} className="bg-[#120804]">
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#b5a89c]">
                <span>
                  Showing <strong className="text-[#fed7aa]">{displayedSessions.length}</strong> of{' '}
                  <strong className="text-white">{filteredSessions.length}</strong> matching articles (
                  {JOURNAL_SESSIONS.length} total)
                </span>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="min-h-[44px] px-2 text-[#fb923c] hover:text-white hover:underline"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Weekly Articles Cards Grid */}
          <section id="jc-archive" aria-label="Weekly articles list" className="scroll-mt-24 cv-auto space-y-6">
            {filteredSessions.length === 0 ? (
              <div className="initial-card p-12 text-center space-y-3">
                <FileText className="w-8 h-8 text-[#ea580c] mx-auto opacity-80" aria-hidden="true" />
                <h2 className="text-base font-serif font-bold text-white">
                  No articles match your search
                </h2>
                <p className="text-xs text-[#d6cebe]">
                  Try selecting "All" topics or clearing your search query.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn-flame px-5 py-2.5 text-xs"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <RevealBlock>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayedSessions.map((article) => {
                      const isLatest = JOURNAL_SESSIONS[0]?.id === article.id;
                      return (
                        <article
                          key={article.id}
                          onClick={() => onOpenSessionModal(article)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onOpenSessionModal(article);
                            }
                          }}
                          tabIndex={0}
                          role="button"
                          className="initial-card p-6 flex flex-col justify-between space-y-4 cursor-pointer group focus:outline-none"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2 text-xs">
                              <div className="flex items-center gap-2">
                                {isLatest && (
                                  <span className="px-2 py-0.5 rounded-full bg-[#c2410c] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                                    Latest
                                  </span>
                                )}
                                <span className="font-mono text-[#fb923c] font-bold uppercase tracking-wider">
                                  {article.monthYear}
                                </span>
                              </div>
                              <span className="px-2.5 py-0.5 rounded-full bg-[#1e0e06] border border-[#ea580c]/30 text-[#fed7aa] text-[10px] font-mono">
                                {article.topicTag}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-[#b5a89c] font-mono">
                              <Calendar className="w-3.5 h-3.5 text-[#ea580c]" aria-hidden="true" />
                              <span>{article.date}</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-[#f97316] transition-colors leading-snug">
                              {article.title}
                            </h2>

                            <p className="text-xs text-[#d6cebe] leading-relaxed line-clamp-3">
                              {article.excerpt}
                            </p>
                          </div>

                          <div className="space-y-3 pt-3 border-t border-[#ea580c]/15 text-xs">
                            <div className="flex items-center gap-2 text-[11px] text-[#b5a89c]">
                              <User className="w-3.5 h-3.5 text-[#ea580c] shrink-0" aria-hidden="true" />
                              <span>
                                <span className="text-white font-semibold">Author:</span> {article.author}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                              <span className="font-mono text-[11px] text-[#d6cebe] flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-[#ea580c]" aria-hidden="true" />
                                <span>Weekly Article · LAUTECH</span>
                              </span>
                              <div className="flex items-center gap-3">
                                {article.link && (
                                  <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="min-h-[44px] inline-flex items-center gap-1 text-xs font-semibold text-[#fed7aa] hover:text-white hover:underline px-1"
                                  >
                                    <span>Read on Medium</span>
                                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                                  </a>
                                )}
                                <span className="text-xs font-semibold text-[#fb923c] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                  Read Full Article
                                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </RevealBlock>

                {/* Load More Pagination Bar */}
                {filteredSessions.length > displayedSessions.length && (
                  <div className="initial-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1E0C08]">
                    <span className="text-xs font-mono text-[#d6cebe]">
                      Showing <strong className="text-[#fed7aa]">{displayedSessions.length}</strong> of{' '}
                      <strong className="text-white">{filteredSessions.length}</strong> weekly articles
                    </span>
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleCount((prev) => Math.min(filteredSessions.length, prev + BATCH_SIZE))
                        }
                        className="btn-flame flex-1 sm:flex-initial px-5 py-2.5 text-xs"
                      >
                        Load more ({Math.min(BATCH_SIZE, filteredSessions.length - displayedSessions.length)} of{' '}
                        {filteredSessions.length - displayedSessions.length} remaining)
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
    </div>
  );
};
