import React, { useState } from 'react';
import { MEMBERSHIP_INFO } from '../data/clubData';
import { UserPlus, CheckCircle2, ShieldCheck, Award, Users, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';

export const MembershipView: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [level, setLevel] = useState('500L MB;BS');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState('Critical Appraisal & Systematic Reviews');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  const EXTERNAL_FORM_LINK_PLACEHOLDER = "[https://forms.gle/placeholder-or-formspree-id]";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `LAUMED-MBR-${Math.floor(1000 + Math.random() * 9000)}`;
    setAppId(id);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-[#ea580c]/20 pb-6 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
          Student Research Society Induction
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fed7aa] via-[#f97316] to-[#ea580c]">LAUMED</span> Journal Club
        </h1>
        <p className="text-xs sm:text-sm text-[#d6cebe] max-w-2xl leading-relaxed">
          Become part of a dedicated community of clinical researchers, critical appraisers, and student editors transforming medical inquiry at LAUTECH.
        </p>
      </div>

      {/* Conference Notice Banner */}
      <div className="initial-card p-6 sm:p-8 bg-[#1E0C08] border border-[#ea580c]/60 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#ea580c] font-bold uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>Membership Enrollment Notice</span>
        </div>
        <p className="text-xs sm:text-sm text-white leading-relaxed">
          {MEMBERSHIP_INFO.noteOnLaunchConference}
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="space-y-6">
        <div className="border-b border-[#ea580c]/20 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
            Member Privileges
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Membership Benefits
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEMBERSHIP_INFO.benefits.map((benefit, i) => (
            <div key={i} className="initial-card p-6 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#ea580c] text-xs font-mono font-bold flex items-center justify-center">
                0{i + 1}
              </div>
              <h3 className="text-base font-serif font-bold text-white">
                {benefit.title}
              </h3>
              <p className="text-xs text-[#d6cebe] leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How to Join Steps */}
      <div className="space-y-6">
        <div className="border-b border-[#ea580c]/20 pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
            Induction Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            How to Join
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MEMBERSHIP_INFO.howToJoin.map((step, idx) => (
            <div key={idx} className="initial-card p-5 space-y-2 bg-[#2A120B]">
              <span className="text-[10px] font-mono text-[#ea580c] font-bold">STAGE 0{idx + 1}</span>
              <p className="text-xs text-white leading-relaxed font-medium">
                {step.replace(/^Step 0\d:\s*/, '')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Online Membership Form in Initial UI Style */}
      <div className="initial-card p-6 sm:p-10 space-y-6 max-w-2xl mx-auto border-2 border-[#ea580c]/30">
        <div className="border-b border-[#ea580c]/20 pb-4 text-center space-y-1">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
            Official Application Form
          </span>
          <h3 className="text-2xl font-serif font-bold text-white">
            Online Membership Intake
          </h3>
          <p className="text-xs text-[#a89f91]">
            Open to all LAUTECH medical students, residents, and healthcare scholars.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-serif font-bold text-white">
                Application Received!
              </h4>
              <p className="text-xs text-[#d6cebe] max-w-md mx-auto">
                Your membership application has been submitted to the Executive Secretariat.
              </p>
            </div>

            <div className="p-4 bg-[#180a05] border border-[#ea580c]/30 rounded-xl text-left space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[#ea580c] font-bold border-b border-[#ea580c]/20 pb-2">
                <span>APPLICANT REGISTRATION</span>
                <span>{appId}</span>
              </div>
              <div className="text-white">Name: {fullName}</div>
              <div className="text-white">Matric: {matricNumber}</div>
              <div className="text-white">Level: {level}</div>
              <div className="text-[#fed7aa] text-[11px] pt-1">
                You will be contacted via WhatsApp/Email before the next monthly journal club session.
              </div>
            </div>

            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-flame px-6 py-2.5 text-xs"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#faf5ee]">
                Full Name <span className="text-[#ea580c]">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="[Name Placeholder: e.g. Oluwadarasimi Adebayo]"
                className="w-full px-3.5 py-2.5 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#faf5ee]">
                  Matric Number <span className="text-[#ea580c]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={matricNumber}
                  onChange={(e) => setMatricNumber(e.target.value)}
                  placeholder="[e.g. 19/30HC/042]"
                  className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#faf5ee]">Academic Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                >
                  <option value="300L MB;BS">300L MB;BS (Pre-clinical)</option>
                  <option value="400L MB;BS">400L MB;BS (Junior Clinical)</option>
                  <option value="500L MB;BS">500L MB;BS (Senior Clinical)</option>
                  <option value="600L MB;BS">600L MB;BS (Finalist)</option>
                  <option value="Allied Health Sciences">Allied Health Sciences</option>
                  <option value="House Officer / Resident">House Officer / Resident</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#faf5ee]">
                  Email Address <span className="text-[#ea580c]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@lautech.edu.ng"
                  className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#faf5ee]">
                  Phone / WhatsApp <span className="text-[#ea580c]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0811..."
                  className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#faf5ee]">Primary Research Interests</label>
              <select
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
              >
                <option value="Critical Appraisal & Systematic Reviews">Critical Appraisal & Systematic Reviews</option>
                <option value="Artificial Intelligence & Clinical Computing">Artificial Intelligence & Clinical Computing</option>
                <option value="Cardiology & Vascular Medicine">Cardiology & Vascular Medicine</option>
                <option value="Endocrinology & Diabetes (SWEDIG)">Endocrinology & Diabetes (SWEDIG)</option>
                <option value="Surgery & Trauma Epidemiology">Surgery & Trauma Epidemiology</option>
                <option value="Clinical Microbiome & Infectious Diseases">Clinical Microbiome & Infectious Diseases</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-flame w-full py-3"
              >
                Submit Membership Application
              </button>
            </div>

            <div className="text-[11px] text-center text-[#8c7e72] font-mono pt-2">
              <span>Backend Endpoint Hook: </span>
              <span className="text-[#fed7aa]">{EXTERNAL_FORM_LINK_PLACEHOLDER}</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
