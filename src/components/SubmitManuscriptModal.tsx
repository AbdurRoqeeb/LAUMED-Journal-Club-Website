import React, { useState } from 'react';
import { ArticleType, MedicalSpecialty, ManuscriptSubmission } from '../types';
import { X, Send, CheckCircle2, Upload, AlertCircle } from 'lucide-react';

interface SubmitManuscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewSubmission: (sub: ManuscriptSubmission) => void;
}

export const SubmitManuscriptModal: React.FC<SubmitManuscriptModalProps> = ({
  isOpen,
  onClose,
  onNewSubmission
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2>(1);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ArticleType>('Original Research');
  const [specialty, setSpecialty] = useState<MedicalSpecialty>('AI & Digital Health');
  const [leadAuthor, setLeadAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [abstract, setAbstract] = useState('');
  const [ethicsRef, setEthicsRef] = useState('');
  const [fileName, setFileName] = useState('');
  const [submittedCode, setSubmittedCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tracking = `LMJ-2025-0${Math.floor(86 + Math.random() * 20)}`;
    const newSub: ManuscriptSubmission = {
      id: `sub-${Date.now()}`,
      trackingCode: tracking,
      title: title.trim(),
      category,
      specialty,
      abstract: abstract.trim(),
      leadAuthor: leadAuthor.trim(),
      email: email.trim() || 'author@student.lautech.edu.ng',
      institution: 'LAUTECH College of Health Sciences, Ogbomoso',
      submissionDate: 'Today',
      status: 'Under Initial Screening',
      reviewProgress: 20,
      reviewersNotes: 'Manuscript uploaded. Initial plagiarism screening initiated.'
    };
    onNewSubmission(newSub);
    setSubmittedCode(tracking);
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative max-w-xl w-full bg-[#0d0704] border border-[#ea580c]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-auto">
        <div className="flex items-center justify-between border-b border-[#ea580c]/20 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
              LAUMED Medical Journal Peer Review
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
              Submit Manuscript
            </h3>
          </div>
          <button onClick={onClose} className="text-[#a89f91] hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 2 ? (
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-serif font-bold text-white">
                Manuscript Received for Triage!
              </h4>
              <p className="text-xs text-[#d6cebe]">
                Your article has been submitted to the LAUMED Journal editorial board for double-blind peer review.
              </p>
            </div>

            <div className="p-4 bg-[#180a05] border border-[#ea580c]/30 rounded-xl text-left space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[#ea580c] font-bold border-b border-[#ea580c]/20 pb-2">
                <span>MANUSCRIPT RECEIPT</span>
                <span>{submittedCode}</span>
              </div>
              <div className="text-white">
                <span className="text-[#8c7e72]">Title:</span> {title}
              </div>
              <div className="text-white">
                <span className="text-[#8c7e72]">Author:</span> {leadAuthor}
              </div>
              <div className="text-[#fed7aa] text-[11px] pt-1">
                You can track this manuscript live in the Researcher Dashboard.
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                setStep(1);
              }}
              className="w-full py-2.5 bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
            >
              Done & Return to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#faf5ee]">
                Manuscript Title <span className="text-[#ea580c]">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Full title of your clinical research or review"
                className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#faf5ee]">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ArticleType)}
                  className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                >
                  <option value="Original Research">Original Research</option>
                  <option value="Systematic Review">Systematic Review</option>
                  <option value="Clinical Case Report">Clinical Case Report</option>
                  <option value="Journal Club Appraisal">Journal Club Appraisal</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#faf5ee]">Specialty</label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value as MedicalSpecialty)}
                  className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                >
                  <option value="AI & Digital Health">AI & Digital Health</option>
                  <option value="Cardiology & Vascular">Cardiology & Vascular</option>
                  <option value="Endocrinology & Diabetes">Endocrinology & Diabetes</option>
                  <option value="Public Health & Epidemiology">Public Health & Epidemiology</option>
                  <option value="Infectious Diseases">Infectious Diseases</option>
                  <option value="Surgery & Anaesthesia">Surgery & Anaesthesia</option>
                  <option value="Medical Education">Medical Education</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#faf5ee]">Lead Author & Degree</label>
                <input
                  type="text"
                  required
                  value={leadAuthor}
                  onChange={(e) => setLeadAuthor(e.target.value)}
                  placeholder="e.g. Oluwaseun Adeleke (600L MB;BS)"
                  className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#faf5ee]">Corresponding Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@student.lautech.edu.ng"
                  className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#faf5ee]">
                Structured Abstract <span className="text-[#ea580c]">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                placeholder="Background, Methods, Results, Conclusion..."
                className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#faf5ee]">
                Health Research Ethics Committee Reference (Optional for reviews)
              </label>
              <input
                type="text"
                value={ethicsRef}
                onChange={(e) => setEthicsRef(e.target.value)}
                placeholder="e.g. LTH/HREC/2024/091"
                className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            {/* Document upload simulation */}
            <div
              onClick={() => setFileName('Manuscript_Revision_Clean_v2.docx')}
              className="p-3 bg-[#150a04] border border-dashed border-[#ea580c]/40 rounded-xl text-center cursor-pointer hover:border-[#ea580c] transition-colors"
            >
              <Upload className="w-4 h-4 text-[#ea580c] mx-auto mb-1" />
              <span className="text-xs text-[#d6cebe]">
                {fileName ? (
                  <strong className="text-emerald-400">Attached: {fileName}</strong>
                ) : (
                  'Click to upload Word (.docx) or PDF manuscript'
                )}
              </span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Submit for Editorial Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
