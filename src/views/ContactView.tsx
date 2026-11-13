import React, { useState } from 'react';
import { CLUB_INFO } from '../data/clubData';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Handshake } from 'lucide-react';

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

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-[#ea580c]/20 pb-6 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fed7aa] via-[#f97316] to-[#ea580c]">LAUMED</span> Journal Club
        </h1>
        <p className="text-xs sm:text-sm text-[#d6cebe] max-w-2xl leading-relaxed">
          Inquiries regarding student membership, manuscript submissions for Medificial Intelligence, scientific conference partnerships, and guest speaking engagements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="initial-card p-6 space-y-4">
            <h3 className="text-base font-serif font-bold text-white">
              Direct Communication Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#ea580c] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#b5a89c]">Email Secretariat</div>
                  <a href={`mailto:${CLUB_INFO.contact.email}`} className="text-sm font-semibold text-white hover:text-[#fb923c] transition-colors inline-flex items-center min-h-[44px] sm:min-h-0">
                    {CLUB_INFO.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#fb923c] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#b5a89c]">Phone / WhatsApp Support</div>
                  <a href={`tel:${CLUB_INFO.contact.phone}`} className="text-sm font-semibold text-white hover:text-[#fb923c] transition-colors inline-flex items-center min-h-[44px] sm:min-h-0">
                    {CLUB_INFO.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#fb923c] flex items-center justify-center shrink-0">
                  <XLogoIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#b5a89c]">X (Twitter)</div>
                  <a href={CLUB_INFO.contact.xUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#fed7aa] hover:underline inline-flex items-center min-h-[44px] sm:min-h-0">
                    {CLUB_INFO.contact.xHandle}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#fb923c] flex items-center justify-center shrink-0">
                  <MediumLogoIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#b5a89c]">Medium Weekly Articles</div>
                  <a href={CLUB_INFO.contact.mediumUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#fed7aa] hover:underline inline-flex items-center min-h-[44px] sm:min-h-0">
                    medium.com/{CLUB_INFO.contact.mediumHandle}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#fb923c] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#b5a89c]">Physical Secretariat</div>
                  <div className="text-xs text-white leading-snug">
                    {CLUB_INFO.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collaborate with Us Section */}
          <div className="cv-auto initial-card p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#fb923c] font-bold">
              <Handshake className="w-4 h-4" />
              <span>Collaborate With Us</span>
            </div>
            <h4 className="text-base font-serif font-bold text-white">
              Partner on Research & Seminars
            </h4>
            <p className="text-xs text-[#d6cebe] leading-relaxed">
              We welcome clinical departments, research groups (such as SWEDIG), hospital resident associations, and health tech firms interested in joint clinical trials, student internships, and research grants.
            </p>
          </div>
        </div>

        {/* Embedded Contact Form */}
        <div className="lg:col-span-7">
          <div className="initial-card p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
                Online Message
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-1">
                Send a Message to the Secretariat
              </h3>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif font-bold text-white">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-[#d6cebe] max-w-sm mx-auto">
                  Thank you for reaching out to LAUMED Journal Club. A member of our secretariat will respond to your email shortly.
                </p>
                <button
                  onClick={() => {
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                    setSubmitted(false);
                  }}
                  className="btn-flame px-6 py-2 text-xs mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#faf5ee]">Your Full Name <span className="text-[#ea580c]">*</span></label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="[Name Placeholder: e.g. Dr. Kehinde / Scholar]"
                      className="w-full px-3.5 py-2.5 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#faf5ee]">Your Email Address <span className="text-[#ea580c]">*</span></label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full px-3.5 py-2.5 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#faf5ee]">Subject <span className="text-[#ea580c]">*</span></label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Research Collaboration / Journal Submission Inquiry"
                    className="w-full px-3.5 py-2.5 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#faf5ee]">Message <span className="text-[#ea580c]">*</span></label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter details of your inquiry or proposed collaboration..."
                    className="w-full px-3.5 py-2.5 bg-[#080402] border border-[#ea580c]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#ea580c]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-flame w-full py-3 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
