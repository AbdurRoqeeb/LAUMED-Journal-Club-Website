import React, { useEffect, useState } from 'react';
import { ArchiveJournalIssue, ISSUES, JOURNAL_INFO } from '../data/clubData';
import { Publication } from '../types';
import { BookOpen, CheckCircle, ChevronRight, Download, ExternalLink, FileText, Send, X } from 'lucide-react';

interface JournalViewProps {
  openSubmitModal: () => void;
  onSelectPublication?: (pub: Publication) => void;
  onOpenIssueAbstracts?: (issueId: string) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  openSubmitModal,
  onOpenIssueAbstracts
}) => {
  const [viewerIssue, setViewerIssue] = useState<ArchiveJournalIssue | null>(null);

  const sortedIssues = [...ISSUES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  useEffect(() => {
    if (!viewerIssue) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setViewerIssue(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewerIssue]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl bg-[#1E0C08] border border-[#ea580c]/40 p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-[#ea580c] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-md">
              Peer-Reviewed Scholarly Journal
            </span>
            <span className="text-xs font-mono text-[#fed7aa]">
              {JOURNAL_INFO.frequency}
            </span>
            <span className="text-xs font-mono text-[#8c7e72]">
              {JOURNAL_INFO.issn}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            Medificial <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fed7aa] via-[#f97316] to-[#ea580c]">Intelligence</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#d6cebe] leading-relaxed">
            {JOURNAL_INFO.description}
          </p>

          <p className="text-xs sm:text-sm text-[#fed7aa] bg-[#140a05]/80 border border-[#ea580c]/30 rounded-xl px-4 py-3 leading-relaxed">
            First published in <strong className="text-white">2020</strong> as{' '}
            <span className="italic">LAUMED, Journal of the Ladoke Akintola University Medical Students&apos; Association</span>,
            our archive preserves earlier print and digital editions—including{' '}
            <a
              href="#issues"
              className="underline decoration-[#ea580c] underline-offset-4 text-white hover:text-[#fed7aa] font-semibold"
            >
              Volume 1, Number 2 (Health &amp; Lifestyle, December 2020)
            </a>{' '}
            available below in the Issues archive.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={openSubmitModal}
              className="btn-flame px-6 py-3 flex items-center gap-2 shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Submit a Manuscript</span>
            </button>
            <a
              href="#current-issue"
              className="btn-outline-amber px-6 py-3"
            >
              Browse Inaugural Launch Issue
            </a>
            <a
              href="#issues"
              className="btn-outline-amber px-6 py-3"
            >
              Browse Issues Archive
            </a>
          </div>
        </div>
      </div>

      {/* 2. Current Issue Section with Initial UI Styling */}
      <div id="current-issue" className="space-y-6 scroll-mt-24">
        <div className="border-b border-[#ea580c]/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
              Current Issue
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Volume {JOURNAL_INFO.currentIssue.volume}, Issue {JOURNAL_INFO.currentIssue.issue}
            </h2>
            <p className="text-xs sm:text-sm text-[#fed7aa] font-serif italic mt-0.5">
              "{JOURNAL_INFO.currentIssue.title}"
            </p>
          </div>
          <span className="font-mono text-xs text-[#8c7e72]">
            Published {JOURNAL_INFO.currentIssue.publicationDate}
          </span>
        </div>

        <div className="p-4 bg-[#140a05] rounded-xl border border-[#ea580c]/20 text-xs text-[#d6cebe]">
          <strong className="text-white">Editorial Note:</strong> {JOURNAL_INFO.currentIssue.editorialNote}
        </div>
      </div>

      {/* 2B. Issues Section (Downloadable Archive Editions) */}
      <section id="issues" aria-labelledby="issues-heading" className="space-y-6 scroll-mt-24">
        <div className="border-b border-[#ea580c]/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
              Published PDF Editions
            </span>
            <h2 id="issues-heading" className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Issues
            </h2>
          </div>
          <span className="text-xs text-[#fed7aa] font-mono">
            LAUMED Journal · Established 2020
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#fed7aa] font-semibold">
            Back issues
          </h3>
          <span className="text-xs font-mono text-[#a89f91]">
            Sorted newest first
          </span>
        </div>

        <div className="space-y-6">
          {sortedIssues.map((issue, index) => {
            const isLatest = index === 0;
            return (
              <article
                key={issue.id}
                className="rounded-2xl bg-[#1E0C08] border border-[#ea580c]/35 hover:border-[#f97316]/70 transition-all duration-200 p-5 sm:p-7 shadow-xl"
              >
                <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
                  {/* Cover Thumbnail rendered from PDF Page 1 */}
                  <div className="w-full max-w-[210px] mx-auto md:mx-0 md:w-52 shrink-0">
                    <div className="aspect-[520/735] rounded-xl overflow-hidden border border-[#ea580c]/35 bg-white shadow-lg">
                      <img
                        src={issue.cover}
                        alt={`Cover of ${issue.journal} — ${issue.title}, Volume ${issue.volume}, Number ${issue.number}, ${issue.date}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>

                  {/* Issue Details & Actions */}
                  <div className="flex-1 min-w-0 w-full space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        {isLatest && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#c2410c] text-white text-[11px] font-mono font-bold uppercase tracking-wider">
                            Latest
                          </span>
                        )}
                        <span className="text-xs font-mono font-semibold text-[#fed7aa]">
                          Volume {issue.volume}, Number {issue.number} · {issue.date}
                        </span>
                      </div>

                      <p className="text-xs text-[#d6cebe] leading-snug">
                        {issue.journal}
                      </p>

                      <h4 className="leading-tight">
                        <button
                          type="button"
                          onClick={() => onOpenIssueAbstracts?.(issue.id)}
                          aria-label={`View article abstracts for ${issue.title} (${issue.date})`}
                          className="group/title text-left inline-flex items-center gap-2 text-2xl sm:text-3xl font-serif font-bold text-white hover:text-[#f97316] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa] rounded"
                        >
                          <span className="underline decoration-[#ea580c]/60 underline-offset-4 group-hover/title:decoration-[#f97316]">
                            {issue.title}
                          </span>
                          <ChevronRight
                            className="w-5 h-5 text-[#ea580c] group-hover/title:translate-x-1 transition-transform shrink-0"
                            aria-hidden="true"
                          />
                        </button>
                      </h4>

                      <p className="text-sm font-serif italic text-[#fed7aa]">
                        &ldquo;{issue.tagline}&rdquo;
                      </p>
                    </div>

                    {/* Metadata Line */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-[#d6cebe] py-2.5 px-3.5 rounded-xl bg-[#140a05] border border-[#ea580c]/20">
                      <span>
                        <strong className="text-white">ISSN:</strong> {issue.issn}
                      </span>
                      <span aria-hidden="true" className="text-[#ea580c]">·</span>
                      <span>
                        <strong className="text-white">{issue.pages}</strong> pages
                      </span>
                      <span aria-hidden="true" className="text-[#ea580c]">·</span>
                      <span>
                        <strong className="text-white">{issue.size}</strong> · {issue.format}
                      </span>
                    </div>

                    {/* Featured Articles */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#fed7aa] font-semibold">
                        Featured articles
                      </div>
                      <ul className="space-y-1.5 text-sm text-[#f5ebe0] list-disc pl-5 marker:text-[#ea580c]">
                        {issue.articles.map((article) => (
                          <li key={article.title}>
                            <span>&ldquo;{article.title}&rdquo;</span>{' '}
                            <span className="font-mono text-xs text-[#fed7aa]">(p. {article.page})</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Link to Dedicated Article Abstracts Page */}
                    {issue.pdfArticles && issue.pdfArticles.length > 0 && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => onOpenIssueAbstracts?.(issue.id)}
                          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#fed7aa] hover:text-white bg-[#140a05] hover:bg-[#2A120B] border border-[#ea580c]/35 hover:border-[#f97316] px-3.5 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-[#ea580c] shrink-0" aria-hidden="true" />
                          <span>Read article abstracts ({issue.pdfArticles.length} articles)</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#ea580c]" aria-hidden="true" />
                        </button>
                      </div>
                    )}

                    {/* Actions Row */}
                    <div className="pt-3 border-t border-[#ea580c]/20 flex flex-col min-[600px]:flex-row min-[600px]:flex-wrap min-[600px]:items-center gap-3">
                      <a
                        href={issue.file}
                        download={issue.downloadFilename}
                        aria-label="Download LAUMED Volume 1 Number 2, Health and Lifestyle, PDF, 1.6 MB"
                        className="w-full min-[600px]:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] text-white font-semibold text-sm shadow-lg shadow-[#ea580c]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E0C08]"
                      >
                        <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Download PDF</span>
                      </a>

                      {/* Mobile: direct new-tab link */}
                      <a
                        href={issue.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-[600px]:w-auto inline-flex md:hidden items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2A120B] hover:bg-[#36170E] border border-[#ea580c]/50 hover:border-[#f97316] text-[#fed7aa] hover:text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E0C08]"
                      >
                        <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Read online</span>
                      </a>

                      {/* Desktop: opens iframe modal viewer */}
                      <button
                        type="button"
                        onClick={() => setViewerIssue(issue)}
                        className="hidden md:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2A120B] hover:bg-[#36170E] border border-[#ea580c]/50 hover:border-[#f97316] text-[#fed7aa] hover:text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E0C08]"
                      >
                        <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Read online</span>
                      </button>

                      <span className="inline-flex items-center justify-center min-[600px]:justify-start gap-1.5 text-xs font-mono text-[#d6cebe] min-[600px]:ml-auto">
                        <FileText className="w-3.5 h-3.5 text-[#ea580c] shrink-0" aria-hidden="true" />
                        <span>{issue.format} · {issue.size}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Empty-state placeholder for upcoming back/future issues */}
          <div className="rounded-2xl bg-[#140a05] border border-dashed border-[#ea580c]/30 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#fed7aa]">
                Archive Slot
              </span>
              <p className="text-base font-serif font-semibold text-white">
                [Next issue coming soon]
              </p>
              <p className="text-xs text-[#d6cebe]">
                Additional digitized back issues from the LAUMED Journal archive will appear here as downloadable PDFs.
              </p>
            </div>
            <span className="text-xs font-mono text-[#a89f91] shrink-0">
              PDF · Pending upload
            </span>
          </div>
        </div>
      </section>

      {/* Past Issues Section */}
      <div className="space-y-6">
        <div className="border-b border-[#ea580c]/20 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
              Archival Compendium
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Past Issues & Conference Proceedings
            </h2>
          </div>
          <span className="text-xs text-[#8c7e72] font-mono">
            Open Access Biomedical Archive
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="initial-card p-6 space-y-4 bg-[#140a05]">
            <div className="flex items-center justify-between text-xs text-[#a89f91]">
              <span className="text-[#ea580c] font-bold font-mono">Volume 1, Issue 1</span>
              <span className="font-mono text-[#fed7aa]">February 2025</span>
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">
                Inaugural Launch Edition: Revolutionizing Healthcare with Technology
              </h3>
              <p className="text-xs text-[#d6cebe] mt-1 leading-relaxed">
                Maiden issue featuring 3 peer-reviewed studies on AI diabetic retinopathy screening, refractory hypertension risk modeling, and algorithmic bias in West African clinical medicine.
              </p>
            </div>
            <div className="pt-2 border-t border-[#ea580c]/15 flex items-center justify-between text-xs">
              <span className="font-mono text-[#8c7e72]">3 Articles · 38 Pages</span>
              <button
                onClick={() => {
                  const elem = document.getElementById('current-issue');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#ea580c] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Read Articles</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="initial-card p-6 space-y-4 bg-[#140a05]">
            <div className="flex items-center justify-between text-xs text-[#a89f91]">
              <span className="text-[#ea580c] font-bold font-mono">Special Supplement</span>
              <span className="font-mono text-[#fed7aa]">November 2024</span>
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">
                Pre-Conference Symposium Abstracts: Critical Appraisal & POCUS
              </h3>
              <p className="text-xs text-[#d6cebe] mt-1 leading-relaxed">
                Collection of 14 student research abstracts and CASP appraisals delivered during the LAUMED Journal Club 2024 academic cycle at LAUTECH Teaching Hospital.
              </p>
            </div>
            <div className="pt-2 border-t border-[#ea580c]/15 flex items-center justify-between text-xs">
              <span className="font-mono text-[#8c7e72]">14 Abstracts · Archived</span>
              <span className="text-[#fed7aa] font-mono text-[11px]">
                Available at Conference Archive
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Aims and Scope */}
      <div className="space-y-6">
        <div className="border-b border-[#ea580c]/20 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
            Editorial Focus
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Aims & Scope
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JOURNAL_INFO.aimsAndScope.map((scope, idx) => (
            <div
              key={idx}
              className="initial-card p-5 flex items-start gap-3.5"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1f0d06] border border-[#ea580c]/50 text-[#ea580c] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                0{idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-[#d6cebe] leading-relaxed">
                {scope}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Article Types & Word Counts */}
      <div className="space-y-6">
        <div className="border-b border-[#ea580c]/20 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
            Manuscript Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Article Types Accepted
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOURNAL_INFO.articleTypes.map((type, idx) => (
            <div key={idx} className="initial-card p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-white text-sm">{type.type}</span>
                <span className="font-mono text-[#ea580c] text-[11px] font-semibold">{type.wordCount}</span>
              </div>
              <p className="text-xs text-[#d6cebe] leading-relaxed">
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Author Instructions */}
      <div className="space-y-6">
        <div className="border-b border-[#ea580c]/20 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
            Submission Criteria
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Author Guidelines & Ethical Rigor
          </h2>
        </div>

        <div className="initial-card p-6 sm:p-8 space-y-4">
          <ul className="space-y-3 text-xs sm:text-sm text-[#d6cebe]">
            {JOURNAL_INFO.submissionGuidelines.map((guide, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{guide}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-[#ea580c]/15 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#fed7aa] font-mono">
              Direct editorial submissions: <a href="mailto:laumedjc@gmail.com" className="underline">laumedjc@gmail.com</a>
            </span>
            <button
              onClick={openSubmitModal}
              className="btn-flame px-6 py-2.5 text-xs"
            >
              Open Online Submission Portal
            </button>
          </div>
        </div>
      </div>

      {/* 6. Editorial Board */}
      <div className="space-y-6">
        <div className="border-b border-[#ea580c]/20 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
            Scholarly Governance
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Editorial Board
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOURNAL_INFO.editorialBoard.map((member, i) => (
            <div key={i} className="initial-card p-6 space-y-3 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#1e0e06] border-2 border-[#ea580c] mx-auto flex items-center justify-center text-[#ea580c] font-serif font-bold text-xl shadow-[0_0_15px_rgba(234,88,12,0.25)]">
                {member.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <h3 className="text-base font-serif font-bold text-white">
                  {member.name}
                </h3>
                <div className="text-xs text-[#ea580c] font-semibold mt-0.5">
                  {member.role}
                </div>
                <div className="text-[11px] text-[#8c7e72] mt-1 font-mono">
                  {member.affiliation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop In-Page PDF Reader Modal */}
      {viewerIssue && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-viewer-title"
          onClick={() => setViewerIssue(null)}
        >
          <div
            className="w-full max-w-5xl h-[86vh] rounded-2xl bg-[#1E0C08] border border-[#ea580c]/50 shadow-2xl flex flex-col overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="px-5 py-3.5 border-b border-[#ea580c]/25 flex flex-wrap items-center justify-between gap-3 bg-[#140a05]">
              <div className="min-w-0">
                <h3 id="pdf-viewer-title" className="text-sm sm:text-base font-serif font-bold text-white truncate">
                  {viewerIssue.title} — Volume {viewerIssue.volume}, Number {viewerIssue.number} ({viewerIssue.date})
                </h3>
                <p className="text-xs font-mono text-[#fed7aa] truncate">
                  {viewerIssue.journal} · ISSN {viewerIssue.issn}
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={viewerIssue.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2A120B] hover:bg-[#36170E] border border-[#ea580c]/40 text-xs font-semibold text-[#fed7aa] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Open in new tab</span>
                </a>
                <a
                  href={viewerIssue.file}
                  download={viewerIssue.downloadFilename}
                  aria-label="Download LAUMED Volume 1 Number 2, Health and Lifestyle, PDF, 1.6 MB"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#c2410c] hover:bg-[#ea580c] text-xs font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download PDF</span>
                </a>
                <button
                  type="button"
                  onClick={() => setViewerIssue(null)}
                  aria-label="Close PDF viewer"
                  className="p-2 rounded-full bg-[#2A120B] hover:bg-[#ea580c] text-[#fed7aa] hover:text-white border border-[#ea580c]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <iframe
              src={viewerIssue.file}
              title={`${viewerIssue.title} PDF Viewer`}
              className="w-full flex-1 bg-[#120605]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

