import React, { useState, useMemo } from 'react';
import { Publication, ArticleType, MedicalSpecialty } from '../types';
import { Search, Filter, BookOpen, Download, Quote, Bookmark, Check, ArrowUpDown, FileText, ChevronRight } from 'lucide-react';

interface PublicationsArchiveProps {
  publications: Publication[];
  onSelectPublication: (pub: Publication) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onDownloadPdf: (pub: Publication) => void;
  searchFilter: string;
  setSearchFilter: (query: string) => void;
}

export const PublicationsArchive: React.FC<PublicationsArchiveProps> = ({
  publications,
  onSelectPublication,
  bookmarks,
  onToggleBookmark,
  onDownloadPdf,
  searchFilter,
  setSearchFilter
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All Specialties');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'citations' | 'downloads'>('recent');

  const specialties: MedicalSpecialty[] = [
    'All Specialties',
    'AI & Digital Health',
    'Cardiology & Vascular',
    'Endocrinology & Diabetes',
    'Public Health & Epidemiology',
    'Infectious Diseases',
    'Surgery & Anaesthesia',
    'Medical Education'
  ];

  const articleTypes = [
    'All',
    'Original Research',
    'Systematic Review',
    'Clinical Case Report',
    'Journal Club Appraisal'
  ];

  const filteredPublications = useMemo(() => {
    return publications
      .filter((pub) => {
        const matchesSearch =
          !searchFilter.trim() ||
          pub.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
          pub.abstract.toLowerCase().includes(searchFilter.toLowerCase()) ||
          pub.authors.some(a => a.name.toLowerCase().includes(searchFilter.toLowerCase())) ||
          pub.keywords.some(k => k.toLowerCase().includes(searchFilter.toLowerCase())) ||
          pub.doi.toLowerCase().includes(searchFilter.toLowerCase());

        const matchesSpecialty =
          selectedSpecialty === 'All Specialties' || pub.specialty === selectedSpecialty;

        const matchesType =
          selectedType === 'All' || pub.articleType === selectedType;

        const matchesYear =
          selectedYear === 'All' || pub.year.toString() === selectedYear;

        return matchesSearch && matchesSpecialty && matchesType && matchesYear;
      })
      .sort((a, b) => {
        if (sortBy === 'citations') return b.citationsCount - a.citationsCount;
        if (sortBy === 'downloads') return b.downloads - a.downloads;
        return b.volume - a.volume || (b.issue - a.issue);
      });
  }, [publications, searchFilter, selectedSpecialty, selectedType, selectedYear, sortBy]);

  return (
    <div className="py-10 bg-[#080402]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="border-b border-[#ea580c]/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
              LAUMED Medical Journal (LMJ) Repository
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#faf5ee] mt-1">
              Recent Publication Archives
            </h2>
            <p className="text-sm text-[#d6cebe] mt-2 max-w-2xl">
              Peer-reviewed clinical manuscripts, epidemiological surveys, critical appraisals, and biomedical machine learning papers published by the LAUMED Journal Club and faculty collaborators.
            </p>
          </div>

          <div className="text-xs text-[#a89f91] font-mono tabular-nums">
            Showing <strong className="text-white">{filteredPublications.length}</strong> of {publications.length} archived articles
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-[#120804] border border-[#ea580c]/30 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
          {/* Main search line */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#ea580c]" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search publications by title, author, keyword, or DOI..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#090402] border border-[#ea580c]/25 rounded-xl text-xs text-white placeholder-[#8c7e72] focus:outline-none focus:border-[#ea580c]"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-2.5 text-xs text-[#8c7e72] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-[#090402] border border-[#ea580c]/25 rounded-xl text-xs text-[#d6cebe]">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#ea580c]" />
                <span className="text-[#8c7e72]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  <option value="recent" className="bg-[#120804]">Most Recent</option>
                  <option value="citations" className="bg-[#120804]">Most Cited</option>
                  <option value="downloads" className="bg-[#120804]">Most Downloaded</option>
                </select>
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-1.5 px-3 py-2 bg-[#090402] border border-[#ea580c]/25 rounded-xl text-xs text-[#d6cebe]">
                <span className="text-[#8c7e72]">Year:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-[#120804]">All</option>
                  <option value="2025" className="bg-[#120804]">2025</option>
                  <option value="2024" className="bg-[#120804]">2024</option>
                  <option value="2023" className="bg-[#120804]">2023</option>
                </select>
              </div>
            </div>
          </div>

          {/* Specialty Filter Buttons (Interactive Segmented controls allowed by §1.A) */}
          <div className="space-y-2 pt-2 border-t border-[#ea580c]/15">
            <div className="flex items-center justify-between text-[11px] text-[#a89f91] uppercase tracking-wider font-mono">
              <span>Medical Specialty</span>
              {selectedSpecialty !== 'All Specialties' && (
                <button
                  onClick={() => setSelectedSpecialty('All Specialties')}
                  className="text-[#ea580c] hover:underline"
                >
                  Reset Specialty
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                    selectedSpecialty === spec
                      ? 'bg-[#ea580c] text-white shadow-[0_0_10px_rgba(234,88,12,0.4)]'
                      : 'bg-[#180b06] text-[#d6cebe] hover:bg-[#25120a] hover:text-white border border-[#ea580c]/15'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Article Type filter line */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#ea580c]/15 text-xs">
            <span className="text-[#8c7e72] text-[11px] uppercase tracking-wider font-mono">Type:</span>
            {articleTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  selectedType === type
                    ? 'bg-[#291208] text-[#f97316] font-semibold border border-[#ea580c]/40'
                    : 'text-[#a89f91] hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Publications List */}
        {filteredPublications.length === 0 ? (
          <div className="bg-[#120804] border border-[#ea580c]/20 rounded-2xl p-12 text-center space-y-3">
            <FileText className="w-10 h-10 text-[#ea580c] mx-auto opacity-70" />
            <h3 className="text-lg font-serif font-bold text-white">No articles matched your filter criteria</h3>
            <p className="text-xs text-[#a89f91] max-w-md mx-auto">
              Try adjusting your specialty filter, search keywords, or selecting "All Specialties" to view the full archives.
            </p>
            <button
              onClick={() => {
                setSearchFilter('');
                setSelectedSpecialty('All Specialties');
                setSelectedType('All');
                setSelectedYear('All');
              }}
              className="px-4 py-2 bg-[#ea580c] text-white text-xs font-semibold rounded-lg hover:bg-[#f97316] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPublications.map((pub) => {
              const isBookmarked = bookmarks.includes(pub.id);

              return (
                <div
                  key={pub.id}
                  className="group bg-gradient-to-r from-[#120804] to-[#0f0603] hover:from-[#190c06] hover:to-[#140804] border border-[#ea580c]/25 hover:border-[#ea580c]/60 rounded-2xl p-6 transition-all duration-200 shadow-md space-y-4"
                >
                  {/* Clean unboxed metadata with typographic separators (Strictly Zero-Pill §1.A) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#a89f91]">
                    <span className="text-[#ea580c] font-medium">{pub.articleType}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#fed7aa]">{pub.specialty}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">Vol. {pub.volume}, No. {pub.issue}</span>
                    <span aria-hidden="true">·</span>
                    <span>{pub.publicationDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[#8c7e72]">DOI: {pub.doi}</span>
                  </div>

                  {/* Headline & Abstract */}
                  <div className="space-y-2">
                    <h3
                      onClick={() => onSelectPublication(pub)}
                      className="text-xl sm:text-2xl font-serif font-bold text-[#faf5ee] group-hover:text-[#f97316] transition-colors cursor-pointer leading-snug"
                    >
                      {pub.title}
                    </h3>
                    <p className="text-sm text-[#d6cebe] line-clamp-3 leading-relaxed font-sans max-w-4xl">
                      {pub.abstract}
                    </p>
                  </div>

                  {/* Authors line with affiliations */}
                  <div className="text-xs text-[#d6cebe] space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[#8c7e72] font-mono uppercase text-[11px]">Authors:</span>
                      {pub.authors.map((author, idx) => (
                        <span key={idx} className="font-medium text-white">
                          {author.name}
                          {author.isCorresponding && (
                            <span className="text-[#ea580c] ml-0.5">*</span>
                          )}
                          {idx < pub.authors.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                    <div className="text-[11px] text-[#8c7e72]">
                      {pub.authors[0]?.affiliation}
                    </div>
                  </div>

                  {/* Keywords (clean unboxed text) */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#fed7aa]">
                    <span className="text-[#8c7e72]">Keywords:</span>
                    {pub.keywords.map((kw, i) => (
                      <span key={i} className="hover:text-white cursor-pointer">
                        {kw}{i < pub.keywords.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>

                  {/* Card Action Controls & Metrics */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#ea580c]/15 text-xs">
                    <div className="flex items-center gap-4 text-[#8c7e72] font-mono tabular-nums">
                      <span>{pub.readTime}</span>
                      <span>·</span>
                      <span>{pub.citationsCount} citations</span>
                      <span>·</span>
                      <span>{pub.downloads} downloads</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleBookmark(pub.id)}
                        className={`p-2 rounded-lg border transition-colors ${
                          isBookmarked
                            ? 'bg-[#ea580c] border-[#ea580c] text-white'
                            : 'bg-[#180b06] border-[#ea580c]/25 text-[#d6cebe] hover:text-white hover:border-[#ea580c]'
                        }`}
                        title={isBookmarked ? 'Remove from reading list' : 'Save to reading list'}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onDownloadPdf(pub)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#180b06] border border-[#ea580c]/30 hover:border-[#ea580c] text-[#fed7aa] hover:text-white rounded-lg transition-colors font-medium text-xs whitespace-nowrap shrink-0"
                      >
                        <Download className="w-3.5 h-3.5 text-[#ea580c]" />
                        PDF
                      </button>

                      <button
                        onClick={() => onSelectPublication(pub)}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] text-white rounded-lg transition-all font-semibold text-xs whitespace-nowrap shrink-0 shadow-sm"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Read Full Article
                        <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
