import React from 'react';
import { Award, BookOpen, Shield, Users, Mail, CheckCircle2 } from 'lucide-react';

export const EditorialBoard: React.FC = () => {
  const facultyAdvisors = [
    {
      name: 'Professor Adeseye Akintunde',
      role: 'Chief Faculty Patron & Consultant Cardiologist',
      department: 'Department of Internal Medicine, LAUTECH / LTH',
      bio: 'Member of the Editorial Board for Current Hypertension Review Journal. Pioneering clinical hypertension epidemiology and cardiovascular ultrasound risk stratification in Sub-Saharan Africa.',
      initials: 'AA'
    },
    {
      name: 'Professor Michael Olamoyegun',
      role: 'Senior Editorial Advisor & Consultant Endocrinologist',
      department: 'Founder, South West Diabetes Investigation Research Group (SWEDIG)',
      bio: 'Prolific researcher in metabolic syndrome, rural prediabetes profiling, and endocrine disorders with over 100 international peer-reviewed citations.',
      initials: 'MO'
    },
    {
      name: 'Professor Oluwadiya Kehinde Sunday',
      role: 'Distinguished Visiting Scholar & Orthopaedic Surgeon',
      department: 'Acting CMD, University of Sierra Leone Teaching Hospitals Complex',
      bio: 'Renowned expert in trauma epidemiology, biomedical data ethics, and clinical artificial intelligence adoption pathways across West African healthcare.',
      initials: 'OK'
    },
    {
      name: 'Dr. Mrs. Oluyinka Titilayo Adedeji',
      role: 'Faculty Advisor & Consultant Microbiologist',
      department: 'Department of Medical Microbiology & Parasitology, LAUTECH',
      bio: 'Lead investigator on antimicrobial resistance genomic tracking and student-mentored hospital infection control audits.',
      initials: 'OA'
    }
  ];

  const studentBoard = [
    {
      name: 'Oluwaseun D. Adeleke',
      role: 'Student Editor-in-Chief',
      level: '600L MB;BS · LAUTECH',
      focus: 'Cardiometabolic clinical trials & editorial oversight',
      email: 'adeleke.o@laumedjc.org'
    },
    {
      name: 'Khadijah O. Mustapha',
      role: 'Deputy Editor-in-Chief & Research Lead',
      level: '500L MB;BS · LAUTECH',
      focus: 'Health informatics, systematic reviews & CASP appraisal workshops',
      email: 'k.mustapha@laumedjc.org'
    },
    {
      name: 'Adebayo T. Samuel',
      role: 'Managing Editor & Digital Health Coordinator',
      level: '500L MB;BS · LAUTECH',
      focus: 'Machine learning diagnostic accuracy studies & repository curation',
      email: 'a.samuel@laumedjc.org'
    },
    {
      name: 'Zainab B. Lawal',
      role: 'Section Editor: Surgery & Case Reports',
      level: '500L MB;BS · LAUTECH',
      focus: 'Clinical case documentation & CARE guidelines compliance',
      email: 'z.lawal@laumedjc.org'
    }
  ];

  return (
    <div className="py-12 bg-[#080402] border-b border-[#ea580c]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-[#ea580c]/20 pb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
            Governance & Scholarly Stewardship
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
            Editorial Board & Faculty Advisory
          </h2>
          <p className="text-sm text-[#d6cebe] mt-2 max-w-3xl">
            LAUMED Journal Club operates under the clinical guidance of distinguished university professors and teaching hospital consultants, paired with an elected student editorial committee.
          </p>
        </div>

        {/* Faculty Advisory Board */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ea580c] font-semibold">
            <Award className="w-4 h-4 text-[#ea580c]" />
            Faculty Advisory Board & Patrons
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facultyAdvisors.map((advisor, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#150a05] to-[#0e0603] border border-[#ea580c]/25 rounded-2xl p-6 space-y-3 hover:border-[#ea580c]/50 transition-colors shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ea580c] to-[#9a3412] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md">
                    {advisor.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">
                      {advisor.name}
                    </h3>
                    <div className="text-xs text-[#ea580c] font-medium">
                      {advisor.role}
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

        {/* Student Editorial Committee */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ea580c] font-semibold">
            <Users className="w-4 h-4 text-[#ea580c]" />
            Student Editorial Committee (2024–2025)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studentBoard.map((editor, i) => (
              <div
                key={i}
                className="bg-[#120804] border border-[#ea580c]/25 rounded-2xl p-5 space-y-3"
              >
                <div className="text-xs font-mono text-[#ea580c] font-bold">
                  0{i + 1}
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-white">
                    {editor.name}
                  </h4>
                  <div className="text-xs text-[#fed7aa] font-medium mt-0.5">
                    {editor.role}
                  </div>
                  <div className="text-[11px] text-[#8c7e72] mt-0.5">
                    {editor.level}
                  </div>
                </div>
                <p className="text-xs text-[#d6cebe] line-clamp-2 pt-1">
                  {editor.focus}
                </p>
                <div className="pt-2 border-t border-[#ea580c]/15 flex items-center gap-1.5 text-[11px] text-[#ea580c]">
                  <Mail className="w-3 h-3" />
                  <span className="truncate font-mono">{editor.email}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Standards & Peer-Review Policy */}
        <div className="bg-[#120804] border border-[#ea580c]/30 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#ea580c]" />
            Double-Blind Peer Review & Publication Ethics
          </h3>
          <p className="text-xs sm:text-sm text-[#d6cebe] leading-relaxed max-w-4xl">
            The LAUMED Medical Journal adheres to the recommendations of the International Committee of Medical Journal Editors (ICMJE). Every submitted manuscript undergoes an initial technical triage by the student editorial committee followed by masked peer review by at least two independent expert reviewers (one student senior fellow and one faculty consultant).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-[#180a05] rounded-xl border border-[#ea580c]/15 space-y-1">
              <strong className="text-white block">Initial Desk Screening</strong>
              <span className="text-[#8c7e72]">Checks for plagiarism (&lt;15% threshold), scope relevance, and ethics approval within 5 days.</span>
            </div>
            <div className="p-3 bg-[#180a05] rounded-xl border border-[#ea580c]/15 space-y-1">
              <strong className="text-white block">Rigorous Peer Review</strong>
              <span className="text-[#8c7e72]">Evaluation of methodological validity, statistical analysis, and clinical relevance within 21 days.</span>
            </div>
            <div className="p-3 bg-[#180a05] rounded-xl border border-[#ea580c]/15 space-y-1">
              <strong className="text-white block">Open Access Archive</strong>
              <span className="text-[#8c7e72]">Free, unrestricted access to all accepted papers with persistent DOI metadata for global indexing.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
