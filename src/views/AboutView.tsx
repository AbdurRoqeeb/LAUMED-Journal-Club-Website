import React from 'react';
import { ABOUT_INFO } from '../data/clubData';
import { Award, Users, BookOpen, Shield, Target, Compass, Sparkles } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-[#ea580c]/20 pb-6 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
          Foundational Heritage & Leadership
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fed7aa] via-[#f97316] to-[#ea580c]">LAUMED</span> Journal Club
        </h1>
        <p className="text-xs sm:text-sm text-[#d6cebe] max-w-2xl leading-relaxed">
          The history, mission, governance structure, and faculty advisory behind our student-led scholarly society at LAUTECH, Ogbomoso.
        </p>
      </div>

      {/* Mission & Vision Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="initial-card p-6 sm:p-8 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#ea580c] flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">
            Our Mission
          </h2>
          <p className="text-xs sm:text-sm text-[#d6cebe] leading-relaxed">
            {ABOUT_INFO.mission}
          </p>
        </div>

        <div className="initial-card p-6 sm:p-8 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#ea580c] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">
            Our Vision
          </h2>
          <p className="text-xs sm:text-sm text-[#d6cebe] leading-relaxed">
            {ABOUT_INFO.vision}
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="initial-card p-6 sm:p-10 space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
          Origins & Evolution
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
          Our Story
        </h2>
        <p className="text-xs sm:text-sm text-[#d6cebe] leading-relaxed font-sans">
          {ABOUT_INFO.story}
        </p>
        <div className="pt-2 text-xs font-serif italic text-[#fed7aa]">
          "more is definitely better…" — An ethos of relentlessly pursuing academic depth, higher evidence quality, and broader collaboration.
        </div>
      </div>

      {/* Executive Team Grid */}
      <div className="space-y-6">
        <div className="border-b border-[#ea580c]/20 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
            Student Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Executive Committee (2025–2026)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ABOUT_INFO.executiveTeam.map((member, i) => (
            <div key={i} className="initial-card p-6 space-y-4 text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#1e0e06] border-2 border-[#ea580c] mx-auto flex items-center justify-center text-[#ea580c] font-serif font-bold text-xl shadow-[0_0_15px_rgba(234,88,12,0.25)]">
                {member.role.split(' ')[0][0]}{member.name.split(' ')[1]?.[0] || 'L'}
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-serif font-bold text-white">
                  {member.name}
                </h3>
                <div className="text-xs font-semibold text-[#ea580c]">
                  {member.role}
                </div>
                <div className="text-[11px] font-mono text-[#8c7e72]">
                  {member.academicLevel}
                </div>
              </div>

              <div className="text-[10px] font-mono text-[#fed7aa] pt-2 border-t border-[#ea580c]/15">
                [Photo: {member.photoPlaceholder}]
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Advisors */}
      <div className="space-y-6">
        <div className="border-b border-[#ea580c]/20 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
            Academic Mentorship
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Faculty Advisors & Patrons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ABOUT_INFO.facultyAdvisors.map((advisor, i) => (
            <div key={i} className="initial-card p-6 space-y-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#ea580c] flex items-center justify-center font-bold text-sm shrink-0">
                  {advisor.name.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-base font-serif font-bold text-white">
                    {advisor.name}
                  </h3>
                  <div className="text-xs text-[#ea580c] font-medium">
                    {advisor.title}
                  </div>
                  <div className="text-[11px] text-[#8c7e72]">
                    {advisor.department}
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#d6cebe] leading-relaxed pt-2 border-t border-[#ea580c]/15">
                {advisor.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
