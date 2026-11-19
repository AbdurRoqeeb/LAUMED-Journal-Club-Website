import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { FormsPaused } from './FormsPaused';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Join LAUMED Journal Club"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#0d0704] border border-[#ea580c]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#ea580c]/20 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
              College of Health Sciences · LAUTECH
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
              Join LAUMED Journal Club
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-[#a89f91] hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-[#1e0e06]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <FormsPaused topic="membership" />
      </div>
    </div>
  );
};  