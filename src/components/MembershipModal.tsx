import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, UserCheck, Shield, Sparkles } from 'lucide-react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    matricNumber: '',
    clinicalLevel: '500L MB;BS',
    email: '',
    phone: '',
    researchInterest: 'Artificial Intelligence & Diagnostic Screening',
    previousResearch: 'Yes'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [membershipId, setMembershipId] = useState('');

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
    const id = `LAUMED-MBR-${Math.floor(1000 + Math.random() * 9000)}`;
    setMembershipId(id);
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="LAUMED Journal Club Membership Application"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#0d0704] border border-[#ea580c]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-auto max-h-[92dvh] overflow-y-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#ea580c]/20 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
              College of Health Sciences · LAUTECH
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
              LAUMED Journal Club Membership
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close membership modal"
            className="text-[#a89f91] hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-[#1e0e06]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="text-center py-4 space-y-5">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-serif font-bold text-white">
                Application Pre-Registered!
              </h4>
              <p className="text-xs text-[#d6cebe] max-w-sm mx-auto">
                As announced on the conference flyer, membership forms will be validated in person at the Scientific Conference on 27th February, 2025 at The Hall, LAUTECH.
              </p>
            </div>

            <div className="p-4 bg-[#180a04] border border-[#ea580c]/30 rounded-xl text-left space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[#ea580c] font-bold border-b border-[#ea580c]/20 pb-2">
                <span>PRE-ACCREDITATION PASS</span>
                <span>{membershipId}</span>
              </div>
              <div className="text-white">
                <span className="text-[#8c7e72]">Applicant:</span> {formData.fullName}
              </div>
              <div className="text-white">
                <span className="text-[#8c7e72]">Matric Number:</span> {formData.matricNumber}
              </div>
              <div className="text-white">
                <span className="text-[#8c7e72]">Level:</span> {formData.clinicalLevel}
              </div>
              <div className="text-[#fed7aa] text-[11px] pt-1">
                Bring this reference code or your university student ID card to the registration desk on conference morning.
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-[#170a04] border border-[#ea580c]/20 rounded-xl text-xs text-[#fed7aa]">
              Notice: As highlighted on the flyer, official membership verification takes place during the Scientific Conference & Journal Launch.
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#faf5ee]">Full Name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Oluwadarasimi Adebayo"
                className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#faf5ee]">Matriculation Number</label>
                <input
                  type="text"
                  required
                  value={formData.matricNumber}
                  onChange={(e) => setFormData({ ...formData, matricNumber: e.target.value })}
                  placeholder="e.g. 19/30HC/042"
                  className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#faf5ee]">Academic Level / Department</label>
                <select
                  value={formData.clinicalLevel}
                  onChange={(e) => setFormData({ ...formData, clinicalLevel: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                >
                  <option value="300L MB;BS (Pre-Clinical)">300L MB;BS (Pre-Clinical)</option>
                  <option value="400L MB;BS (Junior Clinical)">400L MB;BS (Junior Clinical)</option>
                  <option value="500L MB;BS (Senior Clinical)">500L MB;BS (Senior Clinical)</option>
                  <option value="600L MB;BS (Finalist)">600L MB;BS (Finalist)</option>
                  <option value="House Officer / Resident">House Officer / Resident</option>
                  <option value="Biomedical Engineering / Allied Sciences">Biomedical Engineering / Allied Sciences</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#faf5ee]">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@lautech.edu.ng"
                  className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#faf5ee]">Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0811..."
                  className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#faf5ee]">Primary Research Interest</label>
              <select
                value={formData.researchInterest}
                onChange={(e) => setFormData({ ...formData, researchInterest: e.target.value })}
                className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
              >
                <option value="Artificial Intelligence & Diagnostic Screening">Artificial Intelligence & Diagnostic Screening</option>
                <option value="Cardiology & Hypertension Research">Cardiology & Hypertension Research</option>
                <option value="Endocrinology & SWEDIG Diabetes Studies">Endocrinology & SWEDIG Diabetes Studies</option>
                <option value="Systematic Reviews & Meta-Analyses">Systematic Reviews & Meta-Analyses</option>
                <option value="Clinical Case Reports & Surgery">Clinical Case Reports & Surgery</option>
                <option value="Public Health & Infectious Diseases">Public Health & Infectious Diseases</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all"
              >
                Submit Pre-Registration
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
