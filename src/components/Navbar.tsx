import React, { useState } from 'react';
import { LaumedLogo } from './LaumedLogo';
import { Menu, X, UserPlus } from 'lucide-react';

export type PageId = 
  | 'home' 
  | 'journal-club' 
  | 'journal' 
  | 'journal-issue-abstracts'
  | 'events' 
  | 'membership' 
  | 'about' 
  | 'resources' 
  | 'contact';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  openSubmitModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  openSubmitModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'journal-club', label: 'Journal Club' },
    { id: 'journal', label: 'Journal' },
    { id: 'events', label: 'Events' },
    { id: 'membership', label: 'Membership' },
    { id: 'about', label: 'About' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNav = (id: PageId) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080402]/92 backdrop-blur-md border-b border-[#ea580c]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo brand mark from initial design */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center text-left hover:opacity-95 transition-opacity shrink-0"
            aria-label="LAUMED Journal Club Homepage"
          >
            <LaumedLogo size="navbar" showMotto={true} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold">
            {navItems.map((item) => {
              const isActive =
                currentPage === item.id ||
                (item.id === 'journal' && currentPage === 'journal-issue-abstracts');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`relative px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#f97316] font-bold bg-[#1a0c06]'
                      : 'text-[#d6cebe] hover:text-white hover:bg-[#140a05]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#ea580c] rounded-full shadow-[0_0_8px_#ea580c]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Button (Desktop) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('membership')}
              className="btn-flame px-4 py-2 flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Join Club</span>
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNav('membership')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#ea580c] rounded-lg"
            >
              Join Club
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#d6cebe] hover:text-white rounded-lg hover:bg-[#140a05] focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#ea580c]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0704] border-b border-[#ea580c]/30 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive =
                currentPage === item.id ||
                (item.id === 'journal' && currentPage === 'journal-issue-abstracts');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#220f07] text-[#f97316] font-bold border-l-2 border-[#ea580c]'
                      : 'text-[#d6cebe] hover:text-white hover:bg-[#150a05]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#2a1309] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openSubmitModal();
              }}
              className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#fed7aa] bg-[#1a0c06] border border-[#ea580c]/30 rounded-xl"
            >
              Submit a Manuscript
            </button>
            <button
              onClick={() => handleNav('membership')}
              className="btn-flame w-full py-2.5 text-center"
            >
              Become a Member
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
