import React, { useState, useEffect } from 'react';
import { JournalSession } from '../data/clubData';
import { X, Download, Calendar, User, BookOpen, Image as ImageIcon, FileText, ExternalLink } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface SessionDetailModalProps {
  session: JournalSession | null;
  onClose: () => void;
}

export const SessionDetailModal: React.FC<SessionDetailModalProps> = ({ session, onClose }) => {
  const [viewMode, setViewMode] = useState<'text' | 'image'>('text');

  useEffect(() => {
    setViewMode('text');
  }, [session?.id]);

  useEffect(() => {
    if (!session) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [session, onClose]);

  if (!session) return null;

  const handleDownloadArticle = () => {
    const content = [
      'LAUMED JOURNAL CLUB - WEEKLY ARTICLE',
      'Ladoke Akintola University of Technology (LAUTECH), Ogbomoso',
      '========================================================================',
      '',
      `Title: ${session.title}`,
      `Author: ${session.author}`,
      `Date: ${session.date}`,
      `Topic: ${session.topicTag}`,
      '',
      '------------------------------------------------------------------------',
      '',
      ...session.paragraphs.flatMap((p) => [p, '']),
      '------------------------------------------------------------------------',
      'LAUMED Journal Club · "more is definitely better…"'
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${session.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={session.title}
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full bg-[#0d0704] border border-[#ea580c]/30 rounded-2xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col my-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header Bar */}
        <div className="px-6 py-3.5 border-b border-[#ea580c]/20 bg-[#140a05] flex items-center justify-between gap-4 shrink-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#fb923c] font-bold">
            <span>WEEKLY ARTICLE</span>
            <span className="text-[#8c7e72]">·</span>
            <span className="text-[#fed7aa]">{session.monthYear}</span>
            <span className="text-[#8c7e72]">·</span>
            <span className="text-[#a89f91]">{session.topicTag}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#a89f91] hover:text-white rounded-lg hover:bg-[#1e0e06] transition-colors shrink-0"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto overscroll-contain space-y-6">
          {/* Article Title */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              {session.title}
            </h2>

            {/* Authentic Author & Date Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#140a05] rounded-xl border border-[#ea580c]/20 text-xs">
              <div className="flex items-start gap-2.5">
                <User className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#8c7e72] block text-[10px] font-mono uppercase">
                    Author
                  </span>
                  <strong className="text-white">{session.author}</strong>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#8c7e72] block text-[10px] font-mono uppercase">
                    Publication Date
                  </span>
                  <span className="text-[#fed7aa] font-medium">{session.date}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#8c7e72] block text-[10px] font-mono uppercase">
                    Club
                  </span>
                  <span className="text-[#d6cebe]">LAUMED Journal Club, LAUTECH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle between Formatted Article Text and Original Weekly Sheet (if image provided) */}
          {session.imageUrl && (
            <div className="flex items-center gap-2 border-b border-[#ea580c]/20 pb-3">
              <button
                type="button"
                onClick={() => setViewMode('text')}
                className={`px-3.5 py-2 min-h-[44px] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'text'
                    ? 'bg-[#ea580c] text-white'
                    : 'bg-[#180a05] text-[#d6cebe] border border-[#ea580c]/25 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Article Text</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('image')}
                className={`px-3.5 py-2 min-h-[44px] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'image'
                    ? 'bg-[#ea580c] text-white'
                    : 'bg-[#180a05] text-[#d6cebe] border border-[#ea580c]/25 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Original Article Sheet</span>
              </button>
            </div>
          )}

          {/* Body Content */}
          {viewMode === 'image' && session.imageUrl ? (
            <div className="rounded-xl overflow-hidden border border-[#ea580c]/30 bg-[#080402] p-2 sm:p-4 flex justify-center">
              <LazyImage
                src={session.imageUrl}
                alt={`${session.title} by ${session.author} (${session.date})`}
                aspectRatioClassName="aspect-[4/5]"
                wrapperClassName="w-full max-w-md rounded-lg"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="space-y-4 text-sm sm:text-[15px] text-[#e6ddd4] leading-relaxed font-sans">
              {session.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="px-6 py-4 border-t border-[#ea580c]/20 bg-[#140a05] flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="font-mono text-[#8c7e72] text-[11px]">
            LAUMED Journal Club · Ladoke Akintola University of Technology
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {session.link && (
              <a
                href={session.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-amber px-4 py-2 flex items-center gap-2"
              >
                <span>Read on Medium</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={handleDownloadArticle}
              className="btn-flame px-4 py-2 flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Summary</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
