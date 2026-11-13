import React, { useState, useMemo } from 'react';
import { JOURNAL_SESSIONS, JournalSession } from '../data/clubData';
import { Search, ChevronRight, FileText, BookOpen, Calendar, User } from 'lucide-react';

interface JournalClubViewProps {
  onOpenSessionModal: (session: JournalSession) => void;
}

export const JournalClubView: React.FC<JournalClubViewProps> = ({ onOpenSessionModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  // Extract unique topics and years
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#ea580c]/20 pb-6 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
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

      {/* Filter and Search Bar in Initial UI Style */}
      <div className="initial-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#ea580c]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search weekly articles by title, author, topic, or keyword..."
              className="w-full pl-10 pr-14 py-2.5 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white placeholder-[#8c7e72] focus:outline-none focus:border-[#ea580c]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-[#8c7e72] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Topic & Year Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-[#d6cebe]">
              <span className="font-mono text-[#ea580c]">Topic:</span>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                aria-label="Filter articles by topic"
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                {topics.map((t) => (
                  <option key={t} value={t} className="bg-[#120804]">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-[#d6cebe]">
              <span className="font-mono text-[#ea580c]">Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Filter articles by year"
                className="bg-transparent text-white focus:outline-none cursor-pointer"
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

        <div className="flex items-center justify-between text-[11px] font-mono text-[#8c7e72]">
          <span>
            Showing <strong className="text-[#fed7aa]">{filteredSessions.length}</strong> of{' '}
            {JOURNAL_SESSIONS.length} weekly articles
          </span>
          {(searchQuery || selectedTopic !== 'All' || selectedYear !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTopic('All');
                setSelectedYear('All');
              }}
              className="text-[#ea580c] hover:text-[#f97316] hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Weekly Articles Cards Grid */}
      {filteredSessions.length === 0 ? (
        <div className="initial-card p-12 text-center space-y-3">
          <FileText className="w-8 h-8 text-[#ea580c] mx-auto opacity-70" />
          <h3 className="text-base font-serif font-bold text-white">No articles match your search</h3>
          <p className="text-xs text-[#a89f91]">
            Try selecting "All" topics or clearing your search query.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTopic('All');
              setSelectedYear('All');
            }}
            className="btn-flame px-4 py-2 text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSessions.map((article) => (
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
                  <span className="font-mono text-[#ea580c] font-bold uppercase tracking-wider">
                    {article.monthYear}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1e0e06] border border-[#ea580c]/30 text-[#fed7aa] text-[10px] font-mono">
                    {article.topicTag}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#8c7e72] font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#ea580c]" />
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
                <div className="flex items-center gap-2 text-[11px] text-[#8c7e72]">
                  <User className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
                  <span>
                    <span className="text-white font-semibold">Author:</span> {article.author}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[11px] text-[#a89f91] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#ea580c]" />
                    <span>Weekly Article · LAUTECH</span>
                  </span>
                  <span className="text-xs font-semibold text-[#ea580c] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Full Article
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
