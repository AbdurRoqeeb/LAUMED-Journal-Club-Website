import React from 'react';
import { JOURNAL_CLUB_SESSIONS } from '../data/mockData';
import { Calendar, Users, FileCheck, Download, Award, ChevronRight, BookOpen, Clock } from 'lucide-react';

interface JournalClubSectionProps {
  onOpenAppraisalTool: () => void;
}

export const JournalClubSection: React.FC<JournalClubSectionProps> = ({ onOpenAppraisalTool }) => {
  return (
    <div className="py-12 bg-[#080402] border-b border-[#ea580c]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="border-b border-[#ea580c]/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
              Bi-Weekly Scholarly Deliberation
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              LAUMED Journal Club Sessions
            </h2>
            <p className="text-sm text-[#d6cebe] mt-2 max-w-2xl">
              Fostering critical appraisal rigor, dissecting landmark clinical trials from NEJM, Lancet, and BMJ, and translating global clinical evidence into the context of Nigerian healthcare delivery.
            </p>
          </div>

          <button
            onClick={onOpenAppraisalTool}
            className="px-5 py-2.5 bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <FileCheck className="w-4 h-4" />
            Interactive CASP Tool
          </button>
        </div>

        {/* 3 Pillars of Journal Club */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#120804] border border-[#ea580c]/25 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#241006] border border-[#ea580c]/40 text-[#ea580c] flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white">CASP & PICO Rigor</h3>
            <p className="text-xs text-[#d6cebe] leading-relaxed">
              Every presentation follows structured appraisal frameworks (CASP, CONSORT, PRISMA). Students evaluate random sequence generation, allocation concealment, attrition bias, and true effect sizes.
            </p>
          </div>

          <div className="bg-[#120804] border border-[#ea580c]/25 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#241006] border border-[#ea580c]/40 text-[#ea580c] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white">Consultant Mentorship</h3>
            <p className="text-xs text-[#d6cebe] leading-relaxed">
              Consultants and honorary clinical professors from LAUTECH Teaching Hospital moderate each session, providing real-world contextualization for complex pathophysiological data.
            </p>
          </div>

          <div className="bg-[#120804] border border-[#ea580c]/25 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#241006] border border-[#ea580c]/40 text-[#ea580c] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white">Publication Output</h3>
            <p className="text-xs text-[#d6cebe] leading-relaxed">
              High-scoring critical appraisals are refined, structured according to CARE/STROBE guidelines, and published directly in the LAUMED Medical Journal repository with registered DOIs.
            </p>
          </div>
        </div>

        {/* Sessions Calendar & Archive */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#ea580c]/20 pb-4">
            <h3 className="text-xl font-serif font-bold text-white">
              Meeting Archive & Upcoming Agenda
            </h3>
            <span className="text-xs text-[#8c7e72] font-mono">Bi-Weekly Thursdays · 4:00 PM WAT</span>
          </div>

          <div className="space-y-4">
            {JOURNAL_CLUB_SESSIONS.map((session) => (
              <div
                key={session.id}
                className="bg-gradient-to-r from-[#140a05] to-[#0e0603] border border-[#ea580c]/25 rounded-2xl p-6 space-y-4 hover:border-[#ea580c]/50 transition-colors shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#ea580c] text-white font-mono font-bold rounded-lg text-xs">
                      Session #{session.sessionNumber}
                    </span>
                    <span className="text-[#fed7aa] font-medium">{session.date}</span>
                    <span className="text-[#8c7e72]">·</span>
                    <span className="text-[#a89f91] font-mono">{session.time}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                    session.status === 'Upcoming'
                      ? 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {session.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-white leading-snug">
                    {session.paperTitle}
                  </h4>
                  <div className="text-xs text-[#ea580c] font-mono">
                    Published in: {session.originalJournal} · DOI: {session.doi}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#180a05] rounded-xl border border-[#ea580c]/15 text-xs text-[#d6cebe]">
                  <div>
                    <span className="text-[#8c7e72] block text-[11px]">Presenter</span>
                    <strong className="text-white">{session.presenter}</strong>
                  </div>
                  <div>
                    <span className="text-[#8c7e72] block text-[11px]">Faculty Moderator</span>
                    <strong className="text-white">{session.facultyModerator}</strong>
                  </div>
                  <div>
                    <span className="text-[#8c7e72] block text-[11px]">Venue & Modality</span>
                    <span className="text-white">{session.venue}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ea580c]/15 space-y-1.5 text-xs">
                  <span className="font-semibold text-[#fed7aa]">Core Methodological Takeaways:</span>
                  <ul className="list-disc pl-5 space-y-1 text-[#d6cebe]">
                    {session.keyTakeaways.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
