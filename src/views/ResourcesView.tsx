import React from 'react';
import { RESOURCES_LIST } from '../data/clubData';
import { ExternalLink } from 'lucide-react';
import { RevealBlock } from '../components/RevealBlock';

export const ResourcesView: React.FC = () => {
  const usefulLinks = [
    {
      title: 'Cochrane Handbook for Systematic Reviews',
      url: 'https://training.cochrane.org/handbook',
      desc: 'Official guide to Cochrane methodology for intervention reviews.'
    },
    {
      title: 'EQUATOR Network',
      url: 'https://www.equator-network.org/',
      desc: 'International directory of reporting guidelines for health research.'
    },
    {
      title: 'PubMed / MEDLINE Search Builder',
      url: 'https://pubmed.ncbi.nlm.nih.gov/',
      desc: 'MeSH terms and clinical queries search interface.'
    },
    {
      title: 'PROSPERO International Prospective Register',
      url: 'https://www.crd.york.ac.uk/prospero/',
      desc: 'Registering systematic review protocols prospectively.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-[#ea580c]/20 pb-6 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
          Scholarly Toolkit & Official Appraisal Frameworks
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          Evidence{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fed7aa] via-[#f97316] to-[#ea580c]">
            Resources
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-[#d6cebe] max-w-2xl leading-relaxed">
          Direct links to official critical appraisal checklists, reporting guidelines, and evidence-based research portals for LAUMED members and medical trainees.
        </p>
      </div>

      {/* Official Critical Appraisal Checklists & Tools */}
      <section className="space-y-6">
        <div className="border-b border-[#ea580c]/20 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
            Appraisal Checklists & Reporting Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Official Critical Appraisal Tools
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES_LIST.map((res) => (
            <RevealBlock key={res.id}>
              <div className="initial-card p-6 h-full flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#2A120B] text-[#fb923c] font-mono font-bold text-[10px]">
                      {res.category}
                    </span>
                    <span className="text-[11px] font-mono text-[#C9A99A] truncate">
                      {res.organization}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-white group-hover:text-[#fb923c] transition-colors leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-[#d6cebe] leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ea580c]/15">
                  <a
                    href={res.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] py-2.5 px-3 text-xs font-semibold uppercase tracking-wider rounded-xl text-white bg-[#2A120B] border border-[#ea580c]/30 hover:border-[#ea580c] hover:text-[#fed7aa] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#fb923c]" />
                  </a>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* Useful Links Section */}
      <section className="cv-auto space-y-6">
        <div className="border-b border-[#ea580c]/20 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#fb923c] font-semibold">
            External Repositories
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Curated Evidence-Based Medicine Portals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {usefulLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="initial-card p-5 min-h-[44px] hover:border-[#ea580c] transition-colors flex items-start justify-between gap-4 group"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-serif font-bold text-white group-hover:text-[#fb923c] transition-colors">
                  {link.title}
                </h4>
                <p className="text-xs text-[#d6cebe]">
                  {link.desc}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-[#fb923c] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
