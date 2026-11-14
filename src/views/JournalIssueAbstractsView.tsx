import React, { useEffect, useState } from 'react';
import { ArchiveIssueArticleAbstract, ArchiveJournalIssue, ISSUES } from '../data/clubData';
import {
  ArrowLeft,
  ArrowUp,
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  List,
  X
} from 'lucide-react';
import { LazyImage } from '../components/LazyImage';
import { prefersReducedMotion } from '../utils/scrollPerformance';

interface JournalIssueAbstractsViewProps {
  issueId: string;
  onBackToJournal: () => void;
}

export const JournalIssueAbstractsView: React.FC<JournalIssueAbstractsViewProps> = ({
  issueId,
  onBackToJournal
}) => {
  const issue: ArchiveJournalIssue =
    ISSUES.find((item) => item.id === issueId) ?? ISSUES[0];

  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

  useEffect(() => {
    if (!isPdfViewerOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPdfViewerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPdfViewerOpen]);

  const editorialArticles = issue.pdfArticles.filter(
    (article) => article.category === 'Editorial Article'
  );
  const guestEditorialArticles = issue.pdfArticles.filter(
    (article) => article.category === 'Guest Editorial Article'
  );

  const scrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  };

  const renderAbstractText = (text: string) => {
    const blocks = text.split('\n\n');
    return blocks.map((block, blockIdx) => {
      const lines = block.split('\n');
      const hasBullets = lines.some((line) => line.trim().startsWith('•'));
      if (hasBullets) {
        const headingLine = !lines[0].trim().startsWith('•') ? lines[0] : null;
        const bulletLines = lines.filter((line) => line.trim().startsWith('•'));
        return (
          <div key={blockIdx} className="space-y-2">
            {headingLine && (
              <div className="text-xs font-mono font-semibold text-[#fed7aa]">
                {headingLine}
              </div>
            )}
            <ul className="space-y-1.5 text-sm text-[#f5ebe0] list-disc pl-5 marker:text-[#ea580c]">
              {bulletLines.map((bullet, idx) => (
                <li key={idx}>{bullet.replace(/^•\s*/, '')}</li>
              ))}
            </ul>
          </div>
        );
      }
      return (
        <p key={blockIdx} className="text-sm sm:text-[15px] text-[#f5ebe0] leading-relaxed">
          {block}
        </p>
      );
    });
  };

  const renderArticleCard = (article: ArchiveIssueArticleAbstract, indexInIssue: number) => (
    <article
      key={article.id}
      id={`article-${article.id}`}
      className="scroll-mt-28 rounded-2xl bg-[#1E0C08] border border-[#ea580c]/30 hover:border-[#ea580c]/60 transition-colors p-6 sm:p-7 space-y-5 shadow-lg"
    >
      {/* Header Metadata Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#2A120B] border border-[#ea580c]/40 text-[#fed7aa] font-semibold">
            {article.category}
          </span>
          <span className="px-2.5 py-0.5 rounded bg-[#140a05] border border-[#ea580c]/25 text-[#d6cebe]">
            Page {article.page}
          </span>
          <span className="px-2.5 py-0.5 rounded bg-[#c2410c]/25 border border-[#ea580c]/40 text-[#fed7aa] font-semibold">
            {article.summaryLabel}
          </span>
        </div>
        <span className="text-[#a89f91]">
          Article {String(indexInIssue).padStart(2, '0')}
        </span>
      </div>

      {/* Article Title & Authors */}
      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
          {article.title}
        </h3>
        <div className="text-sm text-[#fed7aa] font-medium">
          {article.authors}
        </div>
        {article.affiliations && article.affiliations.length > 0 && (
          <ul className="space-y-0.5 text-xs text-[#d6cebe] pt-0.5">
            {article.affiliations.map((aff, idx) => (
              <li key={idx}>{aff}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Verbatim Abstract / Summary / Opening Text */}
      <div className="rounded-xl bg-[#140a05] border border-[#ea580c]/20 p-4 sm:p-5 space-y-3">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#ea580c] font-bold">
          {article.summaryLabel}
        </div>
        <div className="space-y-3">{renderAbstractText(article.abstract)}</div>

        {article.keywords && article.keywords.length > 0 && (
          <div className="pt-3 mt-2 border-t border-[#ea580c]/15 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-semibold text-[#fed7aa]">
              Keywords:
            </span>
            {article.keywords.map((kw) => (
              <span
                key={kw}
                className="px-2.5 py-0.5 rounded-md bg-[#2A120B] border border-[#ea580c]/25 text-xs font-mono text-[#f5ebe0]"
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer Navigation */}
      <div className="pt-1 flex items-center justify-between text-xs">
        <span className="font-mono text-[#a89f91]">
          {issue.title} · Vol. {issue.volume}, No. {issue.number} ({issue.date})
        </span>
        <button
          type="button"
          onClick={() => scrollToSection('abstracts-toc')}
          className="inline-flex items-center gap-1 font-mono text-[#fed7aa] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa] rounded px-2 min-h-[44px]"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#ea580c]" aria-hidden="true" />
          <span>Back to contents</span>
        </button>
      </div>
    </article>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      {/* Top Breadcrumb & Back Navigation */}
      <nav
        aria-label="Issue Abstracts Navigation"
        className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ea580c]/20 pb-4"
      >
        <button
          type="button"
          onClick={onBackToJournal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2A120B] hover:bg-[#36170E] border border-[#ea580c]/40 hover:border-[#f97316] text-xs sm:text-sm font-semibold text-[#fed7aa] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
        >
          <ArrowLeft className="w-4 h-4 text-[#ea580c]" aria-hidden="true" />
          <span>Back to Journal</span>
        </button>

        <div className="text-xs font-mono text-[#d6cebe] flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onBackToJournal}
            className="text-[#fed7aa] hover:text-white underline decoration-[#ea580c]/60 underline-offset-4"
          >
            Journal
          </button>
          <span aria-hidden="true" className="text-[#ea580c]">/</span>
          <span>Published PDF Editions</span>
          <span aria-hidden="true" className="text-[#ea580c]">/</span>
          <span className="text-white font-semibold">{issue.title}</span>
        </div>
      </nav>

      {/* Edition Overview Hero Card */}
      <header className="rounded-3xl bg-[#1E0C08] border border-[#ea580c]/40 p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          <div className="w-40 sm:w-44 mx-auto md:mx-0 shrink-0">
            <LazyImage
              src={issue.cover}
              width={issue.coverWidth ?? 520}
              height={issue.coverHeight ?? 735}
              alt={`Cover of ${issue.journal} — ${issue.title}, Volume ${issue.volume}, Number ${issue.number}, ${issue.date}`}
              aspectRatioClassName={issue.coverHeight === 673 ? 'aspect-[520/673]' : 'aspect-[520/735]'}
              wrapperClassName="rounded-xl border border-[#ea580c]/35 bg-[#140a05] shadow-lg"
              priority
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-[#c2410c] text-white font-bold uppercase tracking-wider">
                Article Abstracts
              </span>
              {issue.editionLabel && (
                <span className="px-2.5 py-1 rounded-full bg-[#2A120B] border border-[#ea580c]/45 text-[#fed7aa] font-semibold">
                  {issue.editionLabel}
                </span>
              )}
              <span className="text-[#fed7aa] font-semibold">
                Volume {issue.volume}, Number {issue.number} · {issue.date}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#d6cebe]">{issue.journal}</p>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              {issue.title}
            </h1>

            <p className="text-sm sm:text-base font-serif italic text-[#fed7aa]">
              &ldquo;{issue.tagline}&rdquo;
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-[#d6cebe] py-2.5 px-4 rounded-xl bg-[#140a05] border border-[#ea580c]/20">
              {issue.issn && (
                <>
                  <span>
                    <strong className="text-white">ISSN:</strong> {issue.issn}
                  </span>
                  <span aria-hidden="true" className="text-[#ea580c]">·</span>
                </>
              )}
              <span>
                <strong className="text-white">{issue.pages}</strong> pages
              </span>
              <span aria-hidden="true" className="text-[#ea580c]">·</span>
              <span>
                <strong className="text-white">{issue.pdfArticles.length}</strong> indexed articles
              </span>
              <span aria-hidden="true" className="text-[#ea580c]">·</span>
              <span>
                <strong className="text-white">{issue.size}</strong> · {issue.format}
              </span>
            </div>

            <div className="pt-2 flex flex-col min-[600px]:flex-row min-[600px]:flex-wrap min-[600px]:items-center gap-3">
              <a
                href={issue.file}
                download={issue.downloadFilename}
                aria-label={`Download ${issue.title.replace(/&/g, 'and')}, Volume ${issue.volume} Number ${issue.number}, ${issue.format}, ${issue.size}`}
                className="w-full min-[600px]:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] text-white font-semibold text-sm shadow-lg shadow-[#ea580c]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
              >
                <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Download Full PDF</span>
              </a>

              <a
                href={issue.file}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-[600px]:w-auto inline-flex md:hidden items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2A120B] hover:bg-[#36170E] border border-[#ea580c]/50 text-[#fed7aa] hover:text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
              >
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Read PDF online</span>
              </a>

              <button
                type="button"
                onClick={() => setIsPdfViewerOpen(true)}
                className="hidden md:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2A120B] hover:bg-[#36170E] border border-[#ea580c]/50 hover:border-[#f97316] text-[#fed7aa] hover:text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
              >
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Read PDF online</span>
              </button>

              <span className="inline-flex items-center justify-center min-[600px]:justify-start gap-1.5 text-xs font-mono text-[#d6cebe] min-[600px]:ml-auto">
                <FileText className="w-3.5 h-3.5 text-[#ea580c] shrink-0" aria-hidden="true" />
                <span>{issue.format} · {issue.size}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout: Table of Contents Sidebar + Article Abstracts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Table of Contents */}
        <aside
          id="abstracts-toc"
          aria-label="Issue Table of Contents"
          style={{ top: 'var(--nav-sticky-top)' }}
          className="lg:col-span-4 lg:sticky rounded-2xl bg-[#1E0C08] border border-[#ea580c]/30 p-5 sm:p-6 space-y-5 shadow-xl scroll-mt-24 transition-[top] duration-200"
        >
          <div className="border-b border-[#ea580c]/20 pb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-[#ea580c]" aria-hidden="true" />
              <h2 className="text-base font-serif font-bold text-white">
                Table of Contents
              </h2>
            </div>
            <span className="text-[11px] font-mono text-[#fed7aa]">
              {issue.pdfArticles.length} Articles
            </span>
          </div>

          {/* Editorial Articles TOC */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => scrollToSection('section-editorial-articles')}
              className="text-xs font-mono uppercase tracking-wider text-[#ea580c] font-bold hover:underline"
            >
              Editorial Articles ({editorialArticles.length})
            </button>
            <ol className="space-y-1.5">
              {editorialArticles.map((article, idx) => (
                <li key={article.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(`article-${article.id}`)}
                    className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg bg-[#140a05] hover:bg-[#2A120B] border border-[#ea580c]/15 hover:border-[#ea580c]/45 transition-colors flex items-start justify-between gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
                  >
                    <span className="text-xs text-[#f5ebe0] group-hover:text-white leading-snug">
                      <span className="font-mono text-[#fb923c] mr-1.5">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      {article.title}
                    </span>
                    <span className="text-[11px] font-mono text-[#fed7aa] shrink-0">
                      p.{article.page}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Guest Editorial Articles TOC */}
          {guestEditorialArticles.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#ea580c]/15">
              <button
                type="button"
                onClick={() => scrollToSection('section-guest-editorial-articles')}
                className="text-xs font-mono uppercase tracking-wider text-[#fb923c] font-bold hover:underline min-h-[44px] inline-flex items-center"
              >
                Guest Editorial Articles ({guestEditorialArticles.length})
              </button>
              <ol className="space-y-1.5">
                {guestEditorialArticles.map((article, idx) => (
                  <li key={article.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(`article-${article.id}`)}
                      className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg bg-[#140a05] hover:bg-[#2A120B] border border-[#ea580c]/15 hover:border-[#ea580c]/45 transition-colors flex items-start justify-between gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
                    >
                      <span className="text-xs text-[#f5ebe0] group-hover:text-white leading-snug">
                        <span className="font-mono text-[#fb923c] mr-1.5">
                          {String(editorialArticles.length + idx + 1).padStart(2, '0')}.
                        </span>
                        {article.title}
                      </span>
                      <span className="text-[11px] font-mono text-[#fed7aa] shrink-0">
                        p.{article.page}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {issue.nonEditorialContents && issue.nonEditorialContents.length > 0 && (
            <div className="pt-2 border-t border-[#ea580c]/15">
              <button
                type="button"
                onClick={() => scrollToSection('section-non-editorial-contents')}
                className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg bg-[#140a05] hover:bg-[#2A120B] border border-[#ea580c]/20 text-xs font-mono text-[#fed7aa] hover:text-white transition-colors flex items-center justify-between"
              >
                <span>Non-Editorial Features ({issue.nonEditorialContents.length})</span>
                {issue.nonEditorialPageRange && <span>{issue.nonEditorialPageRange}</span>}
              </button>
            </div>
          )}
        </aside>

        {/* Article Abstracts Feed */}
        <div className="lg:col-span-8 space-y-12">
          {/* Section 1: Editorial Articles */}
          <section
            id="section-editorial-articles"
            aria-labelledby="heading-editorial-articles"
            className="space-y-6 scroll-mt-24"
          >
            <div className="border-b border-[#ea580c]/25 pb-3 flex flex-wrap items-end justify-between gap-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
                  Section 01{issue.editorialPageRange ? ` · ${issue.editorialPageRange}` : ''}
                </span>
                <h2
                  id="heading-editorial-articles"
                  className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1"
                >
                  Editorial Articles
                </h2>
              </div>
              <span className="text-xs font-mono text-[#fed7aa]">
                {editorialArticles.length} Articles
              </span>
            </div>

            <div className="space-y-6">
              {editorialArticles.map((article, idx) =>
                renderArticleCard(article, idx + 1)
              )}
            </div>
          </section>

          {/* Section 2: Guest Editorial Articles */}
          {guestEditorialArticles.length > 0 && (
            <section
              id="section-guest-editorial-articles"
              aria-labelledby="heading-guest-editorial-articles"
              className="cv-auto space-y-6 scroll-mt-24"
            >
              <div className="border-b border-[#ea580c]/25 pb-3 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
                    Section 02{issue.guestEditorialPageRange ? ` · ${issue.guestEditorialPageRange}` : ''}
                  </span>
                  <h2
                    id="heading-guest-editorial-articles"
                    className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1"
                  >
                    Guest Editorial Articles
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#fed7aa]">
                  {guestEditorialArticles.length} Articles
                </span>
              </div>

              <div className="space-y-6">
                {guestEditorialArticles.map((article, idx) =>
                  renderArticleCard(article, editorialArticles.length + idx + 1)
                )}
              </div>
            </section>
          )}

          {/* Section 3: Non-Editorial Contents Reference from PDF */}
          {issue.nonEditorialContents && issue.nonEditorialContents.length > 0 && (
            <section
              id="section-non-editorial-contents"
              aria-labelledby="heading-non-editorial-contents"
              className="cv-auto rounded-2xl bg-[#1E0C08] border border-[#ea580c]/25 p-6 sm:p-7 space-y-4 scroll-mt-24"
            >
              <div className="border-b border-[#ea580c]/20 pb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#ea580c]" aria-hidden="true" />
                  <h2
                    id="heading-non-editorial-contents"
                    className="text-xl font-serif font-bold text-white"
                  >
                    Non-Editorial Features in This PDF
                  </h2>
                </div>
                {issue.nonEditorialPageRange && (
                  <span className="text-xs font-mono text-[#fed7aa]">
                    {issue.nonEditorialPageRange}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#d6cebe] leading-relaxed">
                {issue.nonEditorialDescription ??
                  'The following creative works, essays, book reviews, interview, and club report also appear in the full PDF edition (no standalone research abstracts printed in the PDF):'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {issue.nonEditorialContents.map((item, idx) => (
                  <div
                    key={`${item.title}-${idx}`}
                    className="p-3 rounded-xl bg-[#140a05] border border-[#ea580c]/15 flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-serif font-bold text-white leading-snug">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#d6cebe] mt-0.5">
                        {item.author}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#fed7aa] shrink-0">
                      p. {item.page}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Bottom Return & Download Bar */}
      <div className="pt-6 border-t border-[#ea580c]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToJournal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2A120B] hover:bg-[#36170E] border border-[#ea580c]/45 text-sm font-semibold text-[#fed7aa] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
        >
          <ArrowLeft className="w-4 h-4 text-[#ea580c]" aria-hidden="true" />
          <span>Back to Journal</span>
        </button>

        <a
          href={issue.file}
          download={issue.downloadFilename}
          aria-label={`Download ${issue.title.replace(/&/g, 'and')}, Volume ${issue.volume} Number ${issue.number}, ${issue.format}, ${issue.size}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] text-white font-semibold text-sm shadow-lg shadow-[#ea580c]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
        >
          <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Download Full PDF ({issue.size})</span>
        </a>
      </div>

      {/* Desktop In-Page PDF Reader Modal */}
      {isPdfViewerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 overscroll-contain"
          role="dialog"
          aria-modal="true"
          aria-labelledby="abstracts-pdf-viewer-title"
          onClick={() => setIsPdfViewerOpen(false)}
        >
          <div
            className="w-full max-w-5xl h-[86dvh] rounded-2xl bg-[#1E0C08] border border-[#ea580c]/50 shadow-2xl flex flex-col overflow-hidden overscroll-contain"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="px-5 py-3.5 border-b border-[#ea580c]/25 flex flex-wrap items-center justify-between gap-3 bg-[#140a05]">
              <div className="min-w-0">
                <h3
                  id="abstracts-pdf-viewer-title"
                  className="text-sm sm:text-base font-serif font-bold text-white truncate"
                >
                  {issue.title} — Volume {issue.volume}, Number {issue.number} ({issue.date})
                </h3>
                <p className="text-xs font-mono text-[#fed7aa] truncate">
                  {issue.journal}{issue.issn ? ` · ISSN ${issue.issn}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={issue.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-full bg-[#2A120B] hover:bg-[#36170E] border border-[#ea580c]/40 text-xs font-semibold text-[#fed7aa] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Open in new tab</span>
                </a>
                <a
                  href={issue.file}
                  download={issue.downloadFilename}
                  aria-label={`Download ${issue.title.replace(/&/g, 'and')}, Volume ${issue.volume} Number ${issue.number}, ${issue.format}, ${issue.size}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-full bg-[#c2410c] hover:bg-[#ea580c] text-xs font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download PDF</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsPdfViewerOpen(false)}
                  aria-label="Close PDF viewer"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#2A120B] hover:bg-[#ea580c] text-[#fed7aa] hover:text-white border border-[#ea580c]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <iframe
              src={issue.file}
              title={`${issue.title} PDF Viewer`}
              className="w-full flex-1 bg-[#120605]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
