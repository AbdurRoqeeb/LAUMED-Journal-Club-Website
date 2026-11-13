import React from 'react';
import { LaumedLogo } from './LaumedLogo';
import { PageId } from './Navbar';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';
import { prefersReducedMotion } from '../utils/scrollPerformance';

const XLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MediumLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
  openSubmitModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, openSubmitModal }) => {
  const navigate = (page: PageId) => {
    setCurrentPage(page);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  };

  return (
    <footer className="bg-[#050302] border-t border-[#ea580c]/25 text-[#a89f91] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info with Flyer Badge */}
          <div className="md:col-span-5 space-y-4">
            <LaumedLogo size="footer" showMotto={true} />
            <p className="text-xs sm:text-sm text-[#d6cebe] leading-relaxed max-w-sm font-sans">
              The premier biomedical research, critical appraisal, and scholarly publication society at the College of Health Sciences, Ladoke Akintola University of Technology (LAUTECH), Ogbomoso, Nigeria.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={CLUB_INFO.contact.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#1e0e06] border border-[#ea580c]/40 flex items-center justify-center text-[#fb923c] hover:bg-[#ea580c] hover:text-white transition-colors"
                aria-label="LAUMED Journal Club on X"
              >
                <XLogoIcon className="w-4 h-4" />
              </a>
              <a
                href={CLUB_INFO.contact.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#1e0e06] border border-[#ea580c]/40 flex items-center justify-center text-[#fb923c] hover:bg-[#ea580c] hover:text-white transition-colors"
                aria-label="LAUMED Journal Club on Medium"
              >
                <MediumLogoIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${CLUB_INFO.contact.email}`}
                className="w-11 h-11 rounded-xl bg-[#1e0e06] border border-[#ea580c]/40 flex items-center justify-center text-[#fb923c] hover:bg-[#ea580c] hover:text-white transition-colors"
                aria-label="Email LAUMED Journal Club"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${CLUB_INFO.contact.phone}`}
                className="w-11 h-11 rounded-xl bg-[#1e0e06] border border-[#ea580c]/40 flex items-center justify-center text-[#fb923c] hover:bg-[#ea580c] hover:text-white transition-colors"
                aria-label="Call LAUMED Journal Club"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-bold">
              Directory
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <button onClick={() => navigate('home')} className="hover:text-white transition-colors min-h-[44px] md:min-h-[32px] inline-flex items-center">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('journal-club')} className="hover:text-white transition-colors min-h-[44px] md:min-h-[32px] inline-flex items-center">
                  Journal Club
                </button>
              </li>
              <li>
                <button onClick={() => navigate('journal')} className="hover:text-white transition-colors min-h-[44px] md:min-h-[32px] inline-flex items-center">
                  Journal
                </button>
              </li>
              <li>
                <button onClick={() => navigate('events')} className="hover:text-white transition-colors min-h-[44px] md:min-h-[32px] inline-flex items-center">
                  Conferences & Events
                </button>
              </li>
              <li>
                <button onClick={() => navigate('membership')} className="hover:text-white transition-colors min-h-[44px] md:min-h-[32px] inline-flex items-center">
                  Membership & Benefits
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-white transition-colors min-h-[44px] md:min-h-[32px] inline-flex items-center">
                  About & Governance
                </button>
              </li>
              <li>
                <button onClick={() => navigate('resources')} className="hover:text-white transition-colors min-h-[44px] md:min-h-[32px] inline-flex items-center">
                  Checklists & Resources
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-white transition-colors min-h-[44px] md:min-h-[32px] inline-flex items-center">
                  Contact & Collaboration
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-bold">
              Secretariat
            </h4>
            <div className="space-y-2.5 text-xs text-[#d6cebe]">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ea580c] shrink-0" />
                <a href={`mailto:${CLUB_INFO.contact.email}`} className="text-white hover:text-[#f97316] transition-colors">
                  {CLUB_INFO.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ea580c] shrink-0" />
                <a href={`tel:${CLUB_INFO.contact.phone}`} className="text-white hover:text-[#f97316] transition-colors">
                  {CLUB_INFO.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <XLogoIcon className="w-4 h-4 text-[#ea580c] shrink-0" />
                <a href={CLUB_INFO.contact.xUrl} target="_blank" rel="noopener noreferrer" className="text-[#fed7aa] hover:underline">
                  {CLUB_INFO.contact.xHandle}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MediumLogoIcon className="w-4 h-4 text-[#ea580c] shrink-0" />
                <a href={CLUB_INFO.contact.mediumUrl} target="_blank" rel="noopener noreferrer" className="text-[#fed7aa] hover:underline">
                  Medium ({CLUB_INFO.contact.mediumHandle})
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1 text-[11px] text-[#8c7e72]">
                <MapPin className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                <span>{CLUB_INFO.location}</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={openSubmitModal}
                className="btn-outline-amber w-full sm:w-auto px-4 py-2"
              >
                Submit Manuscript to Journal
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#ea580c]/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c7e72]">
          <div>
            © 2026 LAUMED Journal Club, LAUTECH, Ogbomoso.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-serif italic text-[#fed7aa]">
              "more is definitely better…"
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#fb923c] hover:text-white transition-colors min-h-[44px] px-2"
            >
              Back to top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
