import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Upload, FileText } from 'lucide-react';
import { JOURNAL_INFO } from '../data/clubData';

interface ManuscriptSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManuscriptSubmitModal: React.FC<ManuscriptSubmitModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [articleType, setArticleType] = useState('Original Research');
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [abstract, setAbstract] = useState('');
  const [hrecRef, setHrecRef] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tracking = `MEDIF-2026-${Math.floor(100 + Math.random() * 900)}`;
    setTrackingNumber(tracking);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setTitle('');
    setAuthorName('');
    setEmail('');
    setAbstract('');
    setHrecRef('');
    setFileName('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Submit a Manuscript to Medificial Intelligence Journal"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-[var(--surface)] border border-[var(--rust)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-auto max-h-[92dvh] overflow-y-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[var(--rust)]/40 pb-4 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--orange)] font-bold">
              Medificial Intelligence Journal
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[var(--text)] mt-0.5">
              Submit a Manuscript
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close submission modal"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--muted)] hover:text-white rounded-lg hover:bg-[var(--surface-2)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-heading font-bold text-[var(--text)]">
                Manuscript Received for Editorial Review!
              </h4>
              <p className="text-xs text-[var(--muted)] max-w-sm mx-auto">
                Your paper has entered initial desk triage with the editorial board of Medificial Intelligence.
              </p>
            </div>

            <div className="p-4 bg-[var(--surface-2)] border border-[var(--rust)] rounded-2xl text-left space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[var(--orange)] font-bold border-b border-[var(--rust)]/40 pb-2">
                <span>SUBMISSION RECEIPT</span>
                <span>{trackingNumber}</span>
              </div>
              <div className="text-[var(--text)]">
                <span className="text-[var(--muted)]">Title:</span> {title}
              </div>
              <div className="text-[var(--text)]">
                <span className="text-[var(--muted)]">Corresponding Author:</span> {authorName} ({email})
              </div>
              <div className="text-[var(--amber)] text-[11px] pt-1">
                You will receive initial peer-review feedback via email within 21 working days.
              </div>
            </div>

            <button
              onClick={handleReset}
              className="pill-btn-glow w-full py-2.5 text-xs font-heading font-bold uppercase tracking-wider rounded-full"
            >
              Close & Return to Journal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--text)]">
                Manuscript Full Title <span className="text-[var(--orange)]">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Diagnostic Accuracy of Machine Learning in Emergency Triage..."
                className="w-full px-3.5 py-2.5 bg-[var(--bg)] border border-[var(--rust)] rounded-xl text-xs text-[var(--text)] focus:outline-none focus:border-[var(--orange)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[var(--text)]">Article Type</label>
                <select
                  value={articleType}
                  onChange={(e) => setArticleType(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--rust)] rounded-xl text-xs text-[var(--text)] focus:outline-none focus:border-[var(--orange)]"
                >
                  {JOURNAL_INFO.articleTypes.map((t) => (
                    <option key={t.type} value={t.type}>{t.type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[var(--text)]">
                  Corresponding Author <span className="text-[var(--orange)]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="[Name Placeholder: e.g. Dr. / Scholar]"
                  className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--rust)] rounded-xl text-xs text-[var(--text)] focus:outline-none focus:border-[var(--orange)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[var(--text)]">
                  Author Email Address <span className="text-[var(--orange)]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@student.lautech.edu.ng"
                  className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--rust)] rounded-xl text-xs text-[var(--text)] focus:outline-none focus:border-[var(--orange)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[var(--text)]">
                  Ethics Clearance Ref (HREC)
                </label>
                <input
                  type="text"
                  value={hrecRef}
                  onChange={(e) => setHrecRef(e.target.value)}
                  placeholder="[e.g. LTH/HREC/2025/084]"
                  className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--rust)] rounded-xl text-xs text-[var(--text)] focus:outline-none focus:border-[var(--orange)]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[var(--text)]">
                Structured Abstract (Max 250 words) <span className="text-[var(--orange)]">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                placeholder="Background, Methods, Results, Conclusion..."
                className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--rust)] rounded-xl text-xs text-[var(--text)] focus:outline-none focus:border-[var(--orange)]"
              />
            </div>

            {/* Document attachment simulation */}
            <div
              onClick={() => setFileName('Manuscript_Complete_Draft_2026.docx')}
              className="p-3 bg-[var(--surface-2)] border border-dashed border-[var(--rust)] rounded-xl text-center cursor-pointer hover:border-[var(--orange)] transition-colors"
            >
              <Upload className="w-4 h-4 text-[var(--orange)] mx-auto mb-1" />
              <span className="text-xs text-[var(--muted)]">
                {fileName ? (
                  <strong className="text-emerald-400">Attached: {fileName}</strong>
                ) : (
                  'Click to simulate attaching manuscript (.docx or .pdf)'
                )}
              </span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="pill-btn-glow w-full py-3 text-xs font-heading font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Manuscript for Peer Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
