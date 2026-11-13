import React, { useState } from 'react';
import { CONFERENCE_DATA } from '../data/mockData';
import { Calendar, Clock, MapPin, Users, Ticket, ArrowRight, ShieldCheck, Mail, Phone, Share2, Download, CheckCircle, ExternalLink, QrCode } from 'lucide-react';

interface ConferenceSectionProps {
  openMembershipModal: () => void;
}

export const ConferenceSection: React.FC<ConferenceSectionProps> = ({ openMembershipModal }) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showFlyerModal, setShowFlyerModal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [delegateInfo, setDelegateInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'Medical Student (LAUTECH)',
    institution: 'LAUTECH College of Health Sciences',
    dietary: 'None',
    attendingInPerson: true
  });
  const [registeredTicketId, setRegisteredTicketId] = useState('');
  const [slotsRemaining, setSlotsRemaining] = useState(CONFERENCE_DATA.slotsRemaining);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketNum = 'LMJ-CONF-' + Math.floor(1000 + Math.random() * 9000);
    setRegisteredTicketId(ticketNum);
    setSlotsRemaining(prev => Math.max(1, prev - 1));
    setRegistrationSuccess(true);
  };

  const handleDownloadAbstractBook = () => {
    const element = document.createElement('a');
    const file = new Blob([
      `LAUMED JOURNAL CLUB - SCIENTIFIC CONFERENCE & JOURNAL LAUNCH 2025\n\nTHEME: MEDIFICIAL INTELLIGENCE: REVOLUTIONIZING HEALTHCARE WITH TECHNOLOGY\n\nDate: 27th February, 2025 · 8:30 am GMT +1\nVenue: The Hall, LAUTECH, Ogbomoso, Nigeria\n\nKEYNOTE ADDRESS:\nProfessor Oluwadiya Kehinde Sunday (Acting CMD, University of Sierra Leone Teaching Hospitals Complex)\nTopic: "The Trajectory of Artificial Intelligence in Nigeria's Healthcare System: Exploring Options and Opportunities"\n\nPANEL SESSIONS:\n1. Prof. Michael Olamoyegun (Founder, SWEDIG)\n2. Dr. Mrs. Oluyinka Titilayo Adedeji (LAUTECH LTH)\n3. Prof. Adeseye Akintunde (Editorial Board, Current Hypertension Review Journal)\n4. Prof. Justice (Director, LAUTECH Software Engineering Institute)\n\nABSTRACT LAUNCH COMPENDIUM:\n- LAUMED Medical Journal Volume 4, Issue 1 (Launch Edition)\n- Student Research Working Group Case Appraisals\n\nContact: laumedjc@gmail.com | 08118908705 | @Laumedjc`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'LAUMED-Conference-2025-Program.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="py-12 bg-[#080402] border-b border-[#ea580c]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner Announcement */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#220d04] via-[#160803] to-[#0c0502] border border-[#ea580c]/40 p-6 sm:p-10 overflow-hidden shadow-2xl">
          {/* Subtle Ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ea580c]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-[#ea580c] text-white text-xs font-bold uppercase tracking-wider rounded-md">
                  Annual Scientific Conference
                </span>
                <span className="text-[#fdba74] text-xs font-mono uppercase tracking-widest">
                  & Journal Launch Edition
                </span>
                <span className="text-red-400 text-xs font-semibold px-2 py-0.5 bg-red-950/60 border border-red-500/30 rounded">
                  ⚠️ 100 Slots Only!
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                MEDIFICIAL INTELLIGENCE:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fed7aa] via-[#f97316] to-[#ea580c]">
                  Revolutionizing Healthcare With Technology
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#d6cebe] leading-relaxed max-w-3xl">
                The flagship medical technology and clinical research summit hosted by the{' '}
                <strong className="text-white">LAUMED Journal Club</strong> at the College of Health Sciences, 
                LAUTECH. Unveiling the launch edition of the LAUMED Medical Journal (LMJ) and interrogating 
                the integration of artificial intelligence into Nigerian tertiary health delivery.
              </p>

              {/* Event Logistics Badge Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#130703] border border-[#ea580c]/20 text-[#faf5ee]">
                  <Calendar className="w-4 h-4 text-[#ea580c] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#8c7e72] uppercase font-mono">Date</div>
                    <div className="font-semibold">{CONFERENCE_DATA.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#130703] border border-[#ea580c]/20 text-[#faf5ee]">
                  <Clock className="w-4 h-4 text-[#ea580c] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#8c7e72] uppercase font-mono">Time</div>
                    <div className="font-semibold">{CONFERENCE_DATA.time}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#130703] border border-[#ea580c]/20 text-[#faf5ee]">
                  <MapPin className="w-4 h-4 text-[#ea580c] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#8c7e72] uppercase font-mono">Venue</div>
                    <div className="font-semibold line-clamp-1">{CONFERENCE_DATA.venue}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  Reserve Delegate Seat ({slotsRemaining} Remaining)
                </button>

                <button
                  onClick={handleDownloadAbstractBook}
                  className="px-5 py-3 bg-[#190b05] border border-[#ea580c]/40 hover:border-[#ea580c] text-[#fed7aa] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#ea580c]" />
                  Download Conference Program
                </button>

                <button
                  onClick={() => setShowFlyerModal(true)}
                  className="px-4 py-3 text-xs font-semibold text-[#d6cebe] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  View Original Flyer
                  <ExternalLink className="w-3.5 h-3.5 text-[#ea580c]" />
                </button>
              </div>
            </div>

            {/* Right Flyer Poster Preview Card */}
            <div className="lg:col-span-4">
              <div
                onClick={() => setShowFlyerModal(true)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border-2 border-[#ea580c]/50 shadow-2xl bg-black aspect-[3/4] max-w-xs mx-auto"
              >
                <img
                  src="/assets/aistudio/IMG-20250226-WA0041_7faf2e65.jpg"
                  alt="Official Conference Flyer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 bg-[#ea580c] text-white text-xs font-bold uppercase rounded-lg shadow-lg">
                    Click to Enlarge Flyer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Keynote Speaker Spotlight */}
        <div className="bg-[#120804] border border-[#ea580c]/30 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#ea580c]/20 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
                Distinguished Keynote Address
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                {CONFERENCE_DATA.keynote.name}
              </h3>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 bg-[#251006] border border-[#ea580c]/40 text-[#fed7aa] text-xs font-mono rounded-lg">
              {CONFERENCE_DATA.keynote.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-3">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-[#241006] border-2 border-[#ea580c]/40 mx-auto overflow-hidden flex items-center justify-center shadow-lg relative">
                {/* Fallback & Portrait Representation */}
                <div className="w-full h-full bg-gradient-to-br from-[#3b1708] to-[#120703] flex flex-col items-center justify-center p-3 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#ea580c] text-white flex items-center justify-center font-bold text-xl mb-2">
                    OKS
                  </div>
                  <span className="text-[11px] font-semibold text-[#fed7aa]">Prof. Oluwadiya</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-9 space-y-3">
              <div className="text-xs text-[#ea580c] font-mono">
                {CONFERENCE_DATA.keynote.institution}
              </div>
              <h4 className="text-lg font-serif font-bold text-[#faf5ee]">
                Lecture: "{CONFERENCE_DATA.keynote.topic}"
              </h4>
              <p className="text-xs sm:text-sm text-[#d6cebe] leading-relaxed font-sans">
                A seminal analysis exploring the pragmatic realities of machine learning deployment across 
                Nigerian state and federal health complexes. Addressing infrastructural challenges, algorithmic 
                evaluation criteria, doctor-in-the-loop workflows, and ethical guardrails required to prevent 
                clinical harms in under-resourced emergency departments.
              </p>
            </div>
          </div>
        </div>

        {/* Expert Panelists Roster */}
        <div className="space-y-6">
          <div className="border-b border-[#ea580c]/20 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
                Multidisciplinary Dialogue
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Distinguished Conference Panelists
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONFERENCE_DATA.panelists.map((panelist, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-b from-[#140a05] to-[#0d0603] border border-[#ea580c]/25 rounded-2xl p-5 space-y-3 hover:border-[#ea580c]/60 transition-colors shadow-md"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="w-6 h-6 rounded-full bg-[#ea580c]/20 border border-[#ea580c]/40 text-[#ea580c] flex items-center justify-center font-bold text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-[#8c7e72]">Panelist 0{idx + 1}</span>
                </div>

                <div>
                  <h4 className="text-base font-serif font-bold text-white leading-snug">
                    {panelist.name}
                  </h4>
                  <div className="text-xs text-[#ea580c] font-medium mt-1">
                    {panelist.role}
                  </div>
                  <div className="text-[11px] text-[#8c7e72] mt-0.5 line-clamp-2">
                    {panelist.institution}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ea580c]/15 text-xs text-[#fed7aa] italic font-serif">
                  "{panelist.topic}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Callout Note directly from Flyer */}
        <div className="rounded-2xl bg-gradient-to-r from-[#2a1206] to-[#150903] border border-[#ea580c]/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-mono text-[#ea580c] uppercase tracking-wider font-semibold">
              Official Club Announcement
            </div>
            <h4 className="text-lg font-serif font-bold text-white">
              "LAUMED Journal membership forms will be available only at the conference."
            </h4>
            <p className="text-xs text-[#d6cebe]">
              Interested LAUTECH medical students can pre-register their academic profile now to fast-track in-person verification on conference day.
            </p>
          </div>

          <button
            onClick={openMembershipModal}
            className="px-5 py-2.5 bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap shrink-0 shadow-md"
          >
            Pre-Fill Membership Form
          </button>
        </div>

        {/* Contact & Organizer Strip */}
        <div className="pt-4 border-t border-[#ea580c]/20 flex flex-wrap items-center justify-between gap-4 text-xs text-[#a89f91]">
          <div className="flex items-center gap-6">
            <a href="mailto:laumedjc@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#ea580c]" />
              laumedjc@gmail.com
            </a>
            <a href="tel:08118908705" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#ea580c]" />
              08118908705
            </a>
            <span className="flex items-center gap-1.5 text-[#fed7aa]">
              <Share2 className="w-3.5 h-3.5 text-[#ea580c]" />
              @Laumedjc
            </span>
          </div>
          <div className="text-[11px] font-mono">
            College of Health Sciences · Ladoke Akintola University of Technology, Ogbomoso
          </div>
        </div>
      </div>

      {/* High-Resolution Flyer Modal */}
      {showFlyerModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-[#0d0704] border border-[#ea580c]/40 rounded-2xl overflow-hidden p-2">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#ea580c]/20 text-xs">
              <span className="font-semibold text-white">LAUMED Scientific Conference Flyer</span>
              <button
                onClick={() => setShowFlyerModal(false)}
                className="text-[#a89f91] hover:text-white p-1 text-sm font-bold"
              >
                ✕ Close
              </button>
            </div>
            <div className="p-2 max-h-[80vh] overflow-y-auto flex justify-center">
              <img
                src="/assets/aistudio/IMG-20250226-WA0041_7faf2e65.jpg"
                alt="Original LAUMED Conference Flyer"
                className="max-w-full rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Delegate Seat Reservation Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-[#0e0704] border border-[#ea580c]/40 rounded-2xl p-6 space-y-6 my-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#ea580c]/20 pb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
                  Official Delegate Accreditation
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                  Reserve Conference Seat
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowRegisterModal(false);
                  setRegistrationSuccess(false);
                }}
                className="text-[#a89f91] hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {registrationSuccess ? (
              <div className="space-y-5 text-center py-4">
                <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-serif font-bold text-white">Accreditation Confirmed!</h4>
                  <p className="text-xs text-[#d6cebe]">
                    Your seat for the LAUMED Scientific Conference & Journal Launch is reserved.
                  </p>
                </div>

                {/* Digital Delegate Ticket */}
                <div className="bg-[#190c06] border border-[#ea580c]/40 rounded-xl p-4 text-left space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-[#ea580c]/20 pb-2">
                    <span className="text-[#ea580c] font-bold">DELEGATE PASS</span>
                    <span className="text-white font-bold">{registeredTicketId}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-[#8c7e72] block">Name</span>
                      <span className="text-white font-medium">{delegateInfo.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[#8c7e72] block">Institution</span>
                      <span className="text-white font-medium truncate">{delegateInfo.institution}</span>
                    </div>
                    <div>
                      <span className="text-[#8c7e72] block">Date</span>
                      <span className="text-[#fed7aa]">27 Feb 2025 · 8:30 AM</span>
                    </div>
                    <div>
                      <span className="text-[#8c7e72] block">Venue</span>
                      <span className="text-[#fed7aa]">The Hall, LAUTECH</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#ea580c]/20 text-[10px] text-[#8c7e72]">
                    <span>Bring digital pass or matric ID</span>
                    <span className="text-[#ea580c]">100 Slots Confirmed</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowRegisterModal(false);
                    setRegistrationSuccess(false);
                  }}
                  className="w-full py-2.5 bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="p-3 bg-[#180a05] border border-[#ea580c]/20 rounded-xl text-xs text-[#fed7aa] flex items-center justify-between">
                  <span>Available Capacity:</span>
                  <strong className="text-white font-mono">{slotsRemaining} of 100 slots remaining</strong>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#faf5ee]">Full Name (with Title)</label>
                  <input
                    type="text"
                    required
                    value={delegateInfo.fullName}
                    onChange={(e) => setDelegateInfo({ ...delegateInfo, fullName: e.target.value })}
                    placeholder="e.g. Dr. Kehinde Adeleke / Scholar"
                    className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#faf5ee]">Email Address</label>
                    <input
                      type="email"
                      required
                      value={delegateInfo.email}
                      onChange={(e) => setDelegateInfo({ ...delegateInfo, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#faf5ee]">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={delegateInfo.phone}
                      onChange={(e) => setDelegateInfo({ ...delegateInfo, phone: e.target.value })}
                      placeholder="0811..."
                      className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#faf5ee]">Category</label>
                    <select
                      value={delegateInfo.role}
                      onChange={(e) => setDelegateInfo({ ...delegateInfo, role: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                    >
                      <option value="Medical Student (LAUTECH)">Medical Student (LAUTECH)</option>
                      <option value="Resident Doctor / House Officer">Resident Doctor / House Officer</option>
                      <option value="Consultant / Faculty Member">Consultant / Faculty Member</option>
                      <option value="Biomedical Software Engineer">Biomedical Software Engineer</option>
                      <option value="Visiting Scholar">Visiting Scholar</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#faf5ee]">Institution</label>
                    <input
                      type="text"
                      value={delegateInfo.institution}
                      onChange={(e) => setDelegateInfo({ ...delegateInfo, institution: e.target.value })}
                      className="w-full px-3 py-2 bg-[#080402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all"
                  >
                    Confirm My Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
