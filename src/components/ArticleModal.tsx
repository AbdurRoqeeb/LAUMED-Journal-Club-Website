import React, { useState, useEffect } from 'react';
import { Publication } from '../types';
import { X, Download, Share2, Bookmark, Check, Copy, Quote, MessageSquare, ShieldCheck, ExternalLink } from 'lucide-react';

interface ArticleModalProps {
  publication: Publication | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onDownloadPdf: (pub: Publication) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  publication,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onDownloadPdf
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'citations' | 'discussion'>('text');
  const [citationFormat, setCitationFormat] = useState<'vancouver' | 'apa' | 'harvard' | 'bibtex'>('vancouver');
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [comments, setComments] = useState<Array<{ name: string; role: string; text: string; date: string }>>([
    {
      name: 'Dr. Tunde Alade',
      role: 'Resident in Internal Medicine, LTH',
      text: 'Remarkable concordance on the MobileNetV3 architecture. What was the false negative rate on grade 1 non-proliferative microaneurysms specifically?',
      date: 'Feb 14, 2025'
    },
    {
      name: 'Oluwaseun D. Adeleke',
      role: 'Student Editor-in-Chief, LAUMED JC',
      text: 'Grade 1 microaneurysms had an 88.4% detection rate, which improved to 96% when combined with the 45-degree macula-centered view.',
      date: 'Feb 16, 2025'
    }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentRole, setNewCommentRole] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    if (!publication) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [publication, onClose]);

  if (!publication) return null;

  const getCitationString = () => {
    const authors = publication.authors.map(a => a.name).join(', ');
    const firstAuthor = publication.authors[0]?.name || 'LAUMED Researcher';
    switch (citationFormat) {
      case 'vancouver':
        return `${authors}. ${publication.title}. LAUMED Med J. ${publication.year};${publication.volume}(${publication.issue}):e${publication.doi.replace(/[^0-9]/g, '')}. doi:${publication.doi}`;
      case 'apa':
        return `${authors} (${publication.year}). ${publication.title}. LAUMED Medical Journal, ${publication.volume}(${publication.issue}). https://doi.org/${publication.doi}`;
      case 'harvard':
        return `${authors}, ${publication.year}. ${publication.title}. LAUMED Medical Journal, ${publication.volume}(${publication.issue}). Available at: <https://doi.org/${publication.doi}>.`;
      case 'bibtex':
        return `@article{laumed_${publication.year}_${publication.id.replace(/[^a-zA-Z0-9]/g, '_')},\n  title={${publication.title}},\n  author={${publication.authors.map(a => a.name).join(' and ')}},\n  journal={LAUMED Medical Journal},\n  volume={${publication.volume}},\n  number={${publication.issue}},\n  year={${publication.year}},\n  doi={${publication.doi}}\n}`;
    }
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(getCitationString());
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !newCommentName.trim()) return;
    setComments([
      ...comments,
      {
        name: newCommentName.trim(),
        role: newCommentRole.trim() || 'Medical Student / Clinical Researcher',
        text: newCommentText.trim(),
        date: 'Just now'
      }
    ]);
    setNewCommentName('');
    setNewCommentRole('');
    setNewCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={publication.title}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0d0704] border border-[#ea580c]/30 rounded-2xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col my-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-3.5 border-b border-[#ea580c]/20 bg-[#140a05] flex items-center justify-between shrink-0 gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
              LAUMED Medical Journal · Vol. {publication.volume}, No. {publication.issue}
            </span>
            <span className="text-[#8c7e72]">·</span>
            <span className="text-xs text-[#a89f91]">{publication.publicationDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleBookmark(publication.id)}
              aria-label={isBookmarked ? 'Remove from reading list' : 'Save to reading list'}
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-[#ea580c] border-[#ea580c] text-white'
                  : 'bg-[#1e0e06] border-[#ea580c]/30 text-[#d6cebe] hover:text-white hover:border-[#ea580c]'
              }`}
              title={isBookmarked ? 'Saved in reading list' : 'Save to reading list'}
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onDownloadPdf(publication)}
              className="flex items-center gap-1.5 px-3.5 min-h-[44px] bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#a89f91] hover:text-white rounded-lg hover:bg-[#200e06] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Sub-tabs */}
        <div className="px-6 py-1 bg-[#100703] border-b border-[#ea580c]/15 flex items-center gap-4 sm:gap-6 text-xs font-medium shrink-0 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`min-h-[44px] px-1 relative whitespace-nowrap transition-colors ${
              activeTab === 'text' ? 'text-[#fb923c] font-semibold' : 'text-[#a89f91] hover:text-white'
            }`}
          >
            Full Article Text
            {activeTab === 'text' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ea580c]" />}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('citations')}
            className={`min-h-[44px] px-1 relative whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'citations' ? 'text-[#fb923c] font-semibold' : 'text-[#a89f91] hover:text-white'
            }`}
          >
            <Quote className="w-3 h-3" />
            Cite & Export
            {activeTab === 'citations' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ea580c]" />}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('discussion')}
            className={`min-h-[44px] px-1 relative whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'discussion' ? 'text-[#fb923c] font-semibold' : 'text-[#a89f91] hover:text-white'
            }`}
          >
            <MessageSquare className="w-3 h-3" />
            Discussion ({comments.length})
            {activeTab === 'discussion' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ea580c]" />}
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto overscroll-contain px-6 py-6 space-y-8 flex-1">
          {activeTab === 'text' && (
            <article className="max-w-3xl mx-auto space-y-8">
              {/* Header Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#a89f91]">
                  <span className="text-[#ea580c] font-semibold">{publication.articleType}</span>
                  <span>·</span>
                  <span>{publication.specialty}</span>
                  <span>·</span>
                  <span className="font-mono">DOI: {publication.doi}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#faf5ee] leading-tight">
                  {publication.title}
                </h1>

                {/* Authors Grid */}
                <div className="bg-[#140a05] rounded-xl p-4 border border-[#ea580c]/20 space-y-2">
                  <div className="text-xs uppercase font-mono tracking-wider text-[#ea580c]">
                    Authors & Institutional Affiliations
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {publication.authors.map((author, i) => (
                      <div key={i} className="text-xs">
                        <div className="font-medium text-[#faf5ee] flex items-center gap-1.5">
                          {author.name}
                          {author.isCorresponding && (
                            <span className="text-[10px] text-[#ea580c] border border-[#ea580c]/40 px-1 rounded">
                              Corresponding Author
                            </span>
                          )}
                        </div>
                        <div className="text-[#a89f91] text-[11px] leading-tight mt-0.5">
                          {author.affiliation}
                        </div>
                        {author.email && (
                          <div className="text-[10px] text-[#fed7aa] font-mono mt-0.5">
                            {author.email}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Abstract Highlight Box */}
                <div className="bg-[#1a0e07] border-l-2 border-[#ea580c] p-4 rounded-r-xl space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#ea580c] font-bold">
                    Structured Abstract
                  </div>
                  <p className="text-sm text-[#f5ede6] leading-relaxed">
                    {publication.abstract}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 text-xs">
                    <span className="text-[#a89f91]">Keywords:</span>
                    {publication.keywords.map((kw, i) => (
                      <span key={i} className="text-[#fed7aa]">
                        {kw}{i < publication.keywords.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Full Text Sections */}
              <div className="space-y-6 text-[#d6cebe] text-sm leading-relaxed font-sans border-t border-[#ea580c]/15 pt-6">
                <section className="space-y-2">
                  <h2 className="text-base font-serif font-bold text-[#faf5ee] uppercase tracking-wide text-[#ea580c]">
                    01. Background & Clinical Rationale
                  </h2>
                  <p>{publication.fullArticle.background}</p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-base font-serif font-bold text-[#faf5ee] uppercase tracking-wide text-[#ea580c]">
                    02. Methods & Study Design
                  </h2>
                  <p>{publication.fullArticle.methods}</p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-base font-serif font-bold text-[#faf5ee] uppercase tracking-wide text-[#ea580c]">
                    03. Results & Findings
                  </h2>
                  <p>{publication.fullArticle.results}</p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-base font-serif font-bold text-[#faf5ee] uppercase tracking-wide text-[#ea580c]">
                    04. Discussion & Local Practice Implications
                  </h2>
                  <p>{publication.fullArticle.discussion}</p>
                </section>

                <section className="space-y-2">
                  <h2 className="text-base font-serif font-bold text-[#faf5ee] uppercase tracking-wide text-[#ea580c]">
                    05. Conclusion
                  </h2>
                  <p>{publication.fullArticle.conclusion}</p>
                </section>

                {/* Declarations */}
                <div className="mt-8 pt-6 border-t border-[#ea580c]/20 text-xs text-[#a89f91] space-y-2 bg-[#120703] p-4 rounded-xl">
                  {publication.fullArticle.ethicalApproval && (
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Ethical Approval:</strong> {publication.fullArticle.ethicalApproval}
                      </div>
                    </div>
                  )}
                  {publication.fullArticle.conflictOfInterest && (
                    <div className="pt-1">
                      <strong className="text-white">Conflict of Interest:</strong> {publication.fullArticle.conflictOfInterest}
                    </div>
                  )}
                </div>
              </div>
            </article>
          )}

          {activeTab === 'citations' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#faf5ee]">Cite This Publication</h3>
                <p className="text-xs text-[#a89f91] mt-1">
                  Export standard academic reference formats for citation managers, research bibliographies, or clinical papers.
                </p>
              </div>

              {/* Format Selectors */}
              <div className="flex items-center gap-2 p-1 bg-[#140a05] rounded-lg border border-[#ea580c]/20">
                {(['vancouver', 'apa', 'harvard', 'bibtex'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setCitationFormat(fmt)}
                    className={`flex-1 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${
                      citationFormat === fmt
                        ? 'bg-[#ea580c] text-white shadow-sm'
                        : 'text-[#d6cebe] hover:text-white'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              {/* Formatted Box */}
              <div className="relative bg-[#160a05] border border-[#ea580c]/30 rounded-xl p-4 font-mono text-xs text-[#faf5ee] leading-relaxed whitespace-pre-wrap select-all">
                {getCitationString()}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleCopyCitation}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all"
                >
                  {copiedCitation ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Citation
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#faf5ee]">
                  Academic Peer Inquiries & Discussion
                </h3>
                <p className="text-xs text-[#a89f91] mt-1">
                  Engage with LAUMED student researchers, authors, and faculty reviewers regarding methodology and clinical findings.
                </p>
              </div>

              {/* Previous Comments */}
              <div className="space-y-3">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-[#140a05] border border-[#ea580c]/15 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="font-semibold text-white">{comment.name}</div>
                      <div className="text-[11px] text-[#8c7e72] font-mono">{comment.date}</div>
                    </div>
                    <div className="text-[11px] text-[#ea580c]">{comment.role}</div>
                    <p className="text-xs text-[#d6cebe] leading-relaxed pt-1">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Post a comment */}
              <form onSubmit={handleAddComment} className="p-4 rounded-xl bg-[#140a05] border border-[#ea580c]/30 space-y-3">
                <div className="text-xs font-semibold text-[#fed7aa] uppercase tracking-wider">
                  Post Peer Question or Observation
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    placeholder="Your Full Name (e.g. Dr. / Scholar)"
                    className="px-3 py-2 bg-[#0d0603] border border-[#ea580c]/30 rounded-lg text-xs text-[#faf5ee] placeholder-[#8c7e72] focus:outline-none focus:border-[#ea580c]"
                  />
                  <input
                    type="text"
                    value={newCommentRole}
                    onChange={(e) => setNewCommentRole(e.target.value)}
                    placeholder="Institution / Academic Year (e.g. 500L LAUMED)"
                    className="px-3 py-2 bg-[#0d0603] border border-[#ea580c]/30 rounded-lg text-xs text-[#faf5ee] placeholder-[#8c7e72] focus:outline-none focus:border-[#ea580c]"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Enter your critical appraisal query, question on dataset, or clinical translation comment..."
                  className="w-full px-3 py-2 bg-[#0d0603] border border-[#ea580c]/30 rounded-lg text-xs text-[#faf5ee] placeholder-[#8c7e72] focus:outline-none focus:border-[#ea580c]"
                />
                <div className="flex items-center justify-between">
                  {commentSubmitted && (
                    <span className="text-xs text-emerald-400">Question published successfully!</span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                  >
                    Submit Question
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
