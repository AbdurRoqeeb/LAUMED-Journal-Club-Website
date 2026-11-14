import React from 'react';
import { ABOUT_INFO } from '../data/clubData';
import { RevealBlock } from '../components/RevealBlock';
import { Target, BookOpen, Calendar, CheckCircle2, FileText } from 'lucide-react';

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header & Intro */}
      <div id="about-overview" className="scroll-mt-24 border-b border-[#ea580c]/20 pb-6 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
          Foundational Heritage & Leadership
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          About{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fed7aa] via-[#f97316] to-[#ea580c]">
            LAUMED
          </span>{' '}
          Journal Club
        </h1>
        <p className="text-xs sm:text-sm text-[#d6cebe] max-w-3xl leading-relaxed">
          {ABOUT_INFO.intro}
        </p>
      </div>

      {/* Mission & Biweekly Focus Areas Split */}
      <section id="about-mission" className="scroll-mt-24 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="initial-card p-6 sm:p-8 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#fb923c] flex items-center justify-center">
                  <Target className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  Our Mission
                </h2>
                <div className="space-y-3">
                  {ABOUT_INFO.missionParagraphs.map((paragraph, index) => (
                    <p key={index} className="text-xs sm:text-sm text-[#d6cebe] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="initial-card p-6 sm:p-8 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#fb923c] flex items-center justify-center">
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  Biweekly Meetings & Focus
                </h2>
                <p className="text-xs sm:text-sm text-[#fed7aa] font-medium">
                  {ABOUT_INFO.focusIntro}
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#d6cebe]">
                  {ABOUT_INFO.focusAreas.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Meeting Structure Strip */}
            <div className="rounded-2xl bg-[#1E0C08] border border-[#ea580c]/40 p-5 sm:p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#ea580c]/20">
                <div className="pt-2 md:pt-0 md:pr-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#fb923c] font-bold">
                    Frequency
                  </span>
                  <div className="text-sm sm:text-base font-serif font-bold text-white mt-1">
                    {ABOUT_INFO.meetingStructure.frequency}
                  </div>
                </div>
                <div className="pt-3 md:pt-0 md:px-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#fb923c] font-bold">
                    Format
                  </span>
                  <div className="text-sm sm:text-base font-serif font-bold text-white mt-1">
                    {ABOUT_INFO.meetingStructure.format}
                  </div>
                </div>
                <div className="pt-3 md:pt-0 md:pl-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#fb923c] font-bold">
                    Focus
                  </span>
                  <div className="text-sm sm:text-base font-serif font-bold text-white mt-1">
                    {ABOUT_INFO.meetingStructure.focus}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Approach: 5 Numbered Cards */}
          <section id="about-approach" className="scroll-mt-24 cv-auto space-y-6">
            <div className="border-b border-[#ea580c]/20 pb-4 space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
                Core Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Our Approach
              </h2>
              <p className="text-xs sm:text-sm text-[#d6cebe] max-w-2xl">
                {ABOUT_INFO.approachIntro}
              </p>
            </div>

            <RevealBlock>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {ABOUT_INFO.approachPillars.map((pillar) => (
                  <div key={pillar.num} className="initial-card p-5 space-y-3 group">
                    <div className="w-9 h-9 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#fb923c] text-xs font-mono font-bold flex items-center justify-center group-hover:bg-[#ea580c] group-hover:text-white transition-colors">
                      {pillar.num}
                    </div>
                    <h3 className="text-base font-serif font-bold text-white group-hover:text-[#f97316] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#d6cebe] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </section>

          {/* How the Club Works: 6-Step Vertical Timeline */}
          <section id="about-how-it-works" className="scroll-mt-24 cv-auto space-y-6">
            <div className="border-b border-[#ea580c]/20 pb-4 space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
                Participatory Framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                How the Club Works
              </h2>
              <p className="text-xs sm:text-sm text-[#d6cebe] max-w-3xl leading-relaxed">
                {ABOUT_INFO.howClubWorksIntro}
              </p>
            </div>

            <RevealBlock>
              <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-px before:bg-[#ea580c]/35">
                {ABOUT_INFO.howClubWorksSteps.map((item) => (
                  <div key={item.step} className="relative initial-card p-5 sm:p-6 space-y-3">
                    <div
                      aria-hidden="true"
                      className="absolute -left-[25px] sm:-left-[29px] top-6 w-5 h-5 rounded-full bg-[#1e0e06] border-2 border-[#ea580c] text-[#fb923c] text-[10px] font-mono font-bold flex items-center justify-center"
                    >
                      {item.step}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                        {item.step}. {item.title}
                      </h3>
                      {item.scheduleNote && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#2A120B] border border-[#ea580c]/35 text-[#fed7aa] text-[11px] font-mono">
                          {item.scheduleNote}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#d6cebe] list-disc pl-5 marker:text-[#ea580c]">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </section>

          {/* Annual Journal Publication: Featured Card */}
          <section
            id="about-journal"
            className="scroll-mt-24 cv-auto rounded-3xl bg-[#1E0C08] border border-[#ea580c]/40 p-6 sm:p-10 space-y-6 shadow-2xl"
          >
            <div className="space-y-3 border-b border-[#ea580c]/20 pb-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>Flagship Initiative</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Annual Journal Publication
              </h2>
              <p className="text-xs sm:text-sm text-[#d6cebe] max-w-3xl leading-relaxed">
                {ABOUT_INFO.annualJournal.intro}
              </p>
            </div>

            <RevealBlock>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {ABOUT_INFO.annualJournal.points.map((point, idx) => (
                  <div key={idx} className="rounded-2xl bg-[#140a05] border border-[#ea580c]/25 p-5 space-y-2">
                    <div className="text-[11px] font-mono text-[#fb923c] font-bold">
                      0{idx + 1} · {point.title}
                    </div>
                    <p className="text-xs text-[#d6cebe] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </section>

          {/* Executive and Editorial Team Grid */}
          <section id="about-team" className="scroll-mt-24 cv-auto space-y-6">
            <div className="border-b border-[#ea580c]/20 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
                The Club Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Executive and Editorial Team
              </h2>
            </div>

            <RevealBlock>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ABOUT_INFO.executiveTeam.map((member, i) => (
                  <div key={i} className="initial-card p-6 space-y-4 text-center">
                    <div
                      aria-hidden="true"
                      className="w-20 h-20 rounded-2xl bg-[#1e0e06] border-2 border-[#ea580c] mx-auto flex items-center justify-center text-[#fb923c] font-serif font-bold text-xl shadow-[0_0_15px_rgba(234,88,12,0.25)]"
                    >
                      {getInitials(member.name)}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-serif font-bold text-white">
                        {member.name}
                      </h3>
                      <div className="text-xs font-semibold text-[#fb923c]">
                        {member.role}
                      </div>
                      {member.academicLevel && (
                        <div className="text-[11px] font-mono text-[#b5a89c]">
                          {member.academicLevel}
                        </div>
                      )}
                    </div>

                    <div className="text-[10px] font-mono text-[#fed7aa] pt-2 border-t border-[#ea580c]/15">
                      [Photo: {member.photoPlaceholder}]
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </section>

          {/* History of the Club */}
          <section
            id="about-history"
            className="scroll-mt-24 cv-auto rounded-3xl bg-[#1E0C08] border border-[#ea580c]/35 p-6 sm:p-10 space-y-6 shadow-2xl"
          >
            <div className="border-b border-[#ea580c]/20 pb-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>Founding Heritage &amp; Archives</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {ABOUT_INFO.history.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="rounded-xl bg-[#140a05] border border-[#ea580c]/25 px-4 py-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#fb923c]">
                    Inaugural Meeting
                  </div>
                  <div className="text-xs sm:text-sm font-serif font-semibold text-white mt-0.5">
                    {ABOUT_INFO.history.inauguralDate}
                  </div>
                </div>
                <div className="rounded-xl bg-[#140a05] border border-[#ea580c]/25 px-4 py-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#fb923c]">
                    Founder
                  </div>
                  <div className="text-xs sm:text-sm font-serif font-semibold text-white mt-0.5">
                    {ABOUT_INFO.history.founder}
                  </div>
                </div>
                <div className="rounded-xl bg-[#140a05] border border-[#ea580c]/25 px-4 py-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#fb923c]">
                    Co-Founders
                  </div>
                  <div className="text-xs sm:text-sm font-serif font-semibold text-white mt-0.5">
                    {ABOUT_INFO.history.coFounders.join(' & ')}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#e6dfd3] leading-relaxed">
              {ABOUT_INFO.history.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-[#ea580c]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-sm font-serif font-bold text-white">
                  {ABOUT_INFO.history.attributionName}
                </div>
                <div className="text-xs font-serif italic text-[#fed7aa]">
                  {ABOUT_INFO.history.attributionTitle}
                </div>
              </div>
              <div className="text-xs font-serif italic text-[#d6cebe]">
                &ldquo;more is definitely better…&rdquo;
              </div>
            </div>
          </section>

          {/* LAUMED JC Board of Consultants */}
          <section id="about-advisors" className="scroll-mt-24 cv-auto space-y-6">
            <div className="border-b border-[#ea580c]/20 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
                Consultant Oversight &amp; Mentorship
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                LAUMED JC Board of Consultants
              </h2>
            </div>

            <RevealBlock>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ABOUT_INFO.boardOfConsultants.map((consultant, i) => {
                  const nameParts = consultant.name
                    .replace(/^(Professor|Prof\.|Dr\.?)\s+/i, '')
                    .trim()
                    .split(/\s+/);
                  const initials =
                    nameParts.length >= 2
                      ? `${nameParts[0][0] ?? ''}${nameParts[nameParts.length - 1][0] ?? ''}`.toUpperCase()
                      : (nameParts[0]?.slice(0, 2) ?? '').toUpperCase();

                  return (
                    <div key={i} className="initial-card p-6 space-y-3">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#fb923c] flex items-center justify-center font-bold text-sm shrink-0">
                          {initials}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-base font-serif font-bold text-white">
                            {consultant.name}
                          </h3>
                          {consultant.title && (
                            <div className="text-xs text-[#fb923c] font-medium leading-snug">
                              {consultant.title}
                            </div>
                          )}
                          {consultant.department && (
                            <div className="text-[11px] text-[#b5a89c] leading-snug">
                              {consultant.department}
                            </div>
                          )}
                        </div>
                      </div>
                      {consultant.bio && (
                        <p className="text-xs text-[#d6cebe] leading-relaxed pt-2 border-t border-[#ea580c]/15">
                          {consultant.bio}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </RevealBlock>
          </section>
    </div>
  );
};
