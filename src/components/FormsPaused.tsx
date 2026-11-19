import React from 'react';
import { Mail } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

type Topic = 'contact' | 'membership' | 'event';

const COPY: Record<Topic, { title: string; body: string; subject: string }> = {
  contact: {
    title: 'Send us an email',
    body: 'Our online contact form is not open yet. Write to us directly and we will reply.',
    subject: 'Enquiry from the LAUMED JC website',
  },
  membership: {
    title: 'Applications open soon',
    body: 'Online membership applications are not open yet. To join in the meantime, email us and we will guide you through the next steps.',
    subject: 'LAUMED JC membership',
  },
  event: {
    title: 'Details coming soon',
    body: 'Registration details will be announced here once the event is confirmed. Questions in the meantime? Email us.',
    subject: 'Question about an upcoming LAUMED JC event',
  },
};

export const FormsPaused: React.FC<{ topic: Topic }> = ({ topic }) => {
  const copy = COPY[topic];
  const email = CLUB_INFO.contact.email;

  return (
    <div className="rounded-xl border border-[#ea580c]/30 bg-[#140a05] p-6 space-y-4 text-center">
      <div className="w-11 h-11 rounded-xl bg-[#1e0e06] border border-[#ea580c] text-[#ea580c] flex items-center justify-center mx-auto">
        <Mail className="w-5 h-5" />
      </div>
      <h4 className="text-lg font-serif font-bold text-white">{copy.title}</h4>
      <p className="text-xs text-[#d6cebe] leading-relaxed">{copy.body}</p>
      <a
        href={`mailto:${email}?subject=${encodeURIComponent(copy.subject)}`}
        className="btn-flame inline-flex px-6 py-2.5 text-xs"
      >
        {email}
      </a>
    </div>
  );
};