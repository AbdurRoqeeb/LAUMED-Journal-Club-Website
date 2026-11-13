import React, { useState } from 'react';
import { Search, ArrowRight, Sparkles, BookOpen, Calendar, Award, ExternalLink, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  goToPublications: () => void;
  goToConference: () => void;
  openSubmitModal: () => void;
  openMembershipModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  goToPublications,
  goToConference,
  openSubmitModal,
  openMembershipModal
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      goToPublications();
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 border-b border-[#ea580c]/20 bg-[#080402]">
      {/* Background ambient lighting matching the fiery orange/amber flyer aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-[#ea580c]/15 via-[#c2410c]/8 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 right-10 w-80 h-80 bg-[#f97316]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Banner from Flyer */}
        <div className="flex items-center justify-center mb-6">
          <div
            onClick={goToConference}
            className="group cursor-pointer inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#180a04] border border-[#ea580c]/40 hover:border-[#ea580c] transition-all duration-200 shadow-[0_0_15px_rgba(234,88,12,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#f97316] ring-4 ring-[#ea580c]/20" />
            <span className="text-xs font-semibold text-[#fed7aa] tracking-wide uppercase">
              Scientific Conference & Journal Launch
            </span>
            <span className="text-[#ea580c] text-xs font-bold">·</span>
            <span className="text-xs text-[#d6cebe] group-hover:text-white transition-colors flex items-center gap-1">
              Medificial Intelligence <ArrowRight className="w-3 h-3 text-[#f97316] group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* Hero 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Editorial Headline & Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold block">
                College of Health Sciences · LAUTECH
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#faf5ee] leading-[1.12] tracking-tight text-balance">
                Pioneering Evidence-Based{' '}
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#fdba74] via-[#f97316] to-[#ea580c]">
                  Medical Inquiry
                </span>{' '}
                & Research.
              </h1>
              <p className="text-base sm:text-lg text-[#d6cebe] font-sans leading-relaxed max-w-2xl">
                The official academic repository and peer-review platform for{' '}
                <strong className="text-white font-medium">LAUMED Journal Club</strong>. 
                Fostering critical appraisal rigor, undergraduate clinical publications, 
                and breakthrough healthcare technology at LAUTECH Teaching Hospital and College of Health Sciences.
              </p>
            </div>

            {/* Quick Publication Search Bar */}
            <form onSubmit={handleSubmitSearch} className="max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-[#ea580c]" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search articles, DOIs, clinical keywords, authors..."
                  className="w-full pl-12 pr-28 py-3.5 bg-[#140a05] border border-[#ea580c]/30 rounded-xl text-sm text-[#faf5ee] placeholder-[#8c7e72] focus:outline-none focus:border-[#ea580c] focus:ring-2 focus:ring-[#ea580c]/20 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-sm"
                >
                  Search
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-[#a89f91]">
                <span>Popular:</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('Diabetic Retinopathy'); onSearch('Diabetic Retinopathy'); goToPublications(); }}
                  className="hover:text-[#f97316] underline underline-offset-2 transition-colors"
                >
                  Diabetic Retinopathy AI
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('Hypertension'); onSearch('Hypertension'); goToPublications(); }}
                  className="hover:text-[#f97316] underline underline-offset-2 transition-colors"
                >
                  Refractory Hypertension
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => { setSearchInput('CASP'); onSearch('CASP'); goToPublications(); }}
                  className="hover:text-[#f97316] underline underline-offset-2 transition-colors"
                >
                  CASP Trials
                </button>
              </div>
            </form>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={goToPublications}
                className="px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#ea580c] to-[#c2410c] rounded-xl hover:from-[#f97316] hover:to-[#ea580c] shadow-[0_0_20px_rgba(234,88,12,0.35)] transition-all flex items-center gap-2 shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                Browse Publication Archives
              </button>
              <button
                onClick={openSubmitModal}
                className="px-5 py-3 text-sm font-semibold text-[#fed7aa] bg-[#1a0c06] border border-[#ea580c]/40 rounded-xl hover:bg-[#251008] hover:border-[#ea580c] transition-all flex items-center gap-2 shrink-0"
              >
                Submit Manuscript
              </button>
              <button
                onClick={openMembershipModal}
                className="px-4 py-3 text-sm font-medium text-[#d6cebe] hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
              >
                Join LAUMED JC
                <ArrowRight className="w-4 h-4 text-[#ea580c]" />
              </button>
            </div>
          </div>

          {/* Right Column: Featured Flyer Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#1b0d06] to-[#0e0603] border border-[#ea580c]/40 p-5 shadow-[0_10px_35px_rgba(234,88,12,0.2)] overflow-hidden">
              {/* Flyer Tag header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ea580c]/20 text-xs">
                <div className="flex items-center gap-2 text-[#fed7aa] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
                  <span>FLAGSHIP EVENT · 2025</span>
                </div>
                <span className="text-[#a89f91] font-mono tabular-nums">27 Feb 2025 · 8:30 AM</span>
              </div>

              {/* Flyer thumbnail & highlights */}
              <div className="space-y-3">
                <div 
                  onClick={goToConference}
                  className="group relative cursor-pointer rounded-xl overflow-hidden border border-[#ea580c]/30 aspect-[16/10] bg-[#070302]"
                >
                  <img
                    src="/assets/aistudio/IMG-20250226-WA0041_7faf2e65.jpg"
                    alt="LAUMED Scientific Conference and Journal Launch Flyer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#fdba74]">Conference & Journal Launch</span>
                    <h3 className="text-lg font-serif font-bold text-white leading-tight">
                      MEDIFICIAL INTELLIGENCE: Revolutionizing Healthcare With Technology
                    </h3>
                  </div>
                </div>

                <div className="bg-[#120703] rounded-lg p-3 border border-[#ea580c]/15 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#271106] border border-[#ea580c]/40 flex items-center justify-center shrink-0 text-[#ea580c] font-bold text-xs">
                      KS
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#faf5ee]">Keynote: Prof. Oluwadiya Kehinde Sunday</div>
                      <div className="text-[11px] text-[#a89f91] line-clamp-1">
                        Acting CMD, Univ. of Sierra Leone Teaching Hospitals Complex
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-[#fed7aa]">
                    <span>Venue: The Hall, LAUTECH, Ogbomoso</span>
                    <button
                      onClick={goToConference}
                      className="text-[#ea580c] hover:text-[#f97316] font-semibold underline underline-offset-2 flex items-center gap-1"
                    >
                      View Details & Register
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Academic Rigor Metric Strip (Constitution Requirement §1.C) */}
        <div className="mt-12 pt-8 border-t border-[#ea580c]/20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#faf5ee] tabular-nums">
              48<span className="text-[#ea580c]">+</span>
            </div>
            <div className="text-xs text-[#a89f91] uppercase tracking-wider font-medium">
              Peer-Reviewed Publications
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#faf5ee] tabular-nums">
              51
            </div>
            <div className="text-xs text-[#a89f91] uppercase tracking-wider font-medium">
              Journal Club Critical Appraisals
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#faf5ee] tabular-nums">
              1,420<span className="text-[#ea580c]">+</span>
            </div>
            <div className="text-xs text-[#a89f91] uppercase tracking-wider font-medium">
              Regional Citations & Downloads
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#faf5ee] tabular-nums">
              18.4<span className="text-[#ea580c]">%</span>
            </div>
            <div className="text-xs text-[#a89f91] uppercase tracking-wider font-medium">
              Competitive Acceptance Rate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
