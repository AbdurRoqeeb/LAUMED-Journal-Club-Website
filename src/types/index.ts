export type ArticleType = 
  | 'Original Research' 
  | 'Systematic Review' 
  | 'Clinical Case Report' 
  | 'Journal Club Appraisal' 
  | 'Conference Abstract';

export type MedicalSpecialty =
  | 'All Specialties'
  | 'AI & Digital Health'
  | 'Cardiology & Vascular'
  | 'Endocrinology & Diabetes'
  | 'Public Health & Epidemiology'
  | 'Infectious Diseases'
  | 'Surgery & Anaesthesia'
  | 'Medical Education';

export interface Author {
  name: string;
  role?: string;
  affiliation: string;
  email?: string;
  isCorresponding?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  abstract: string;
  authors: Author[];
  articleType: ArticleType;
  specialty: MedicalSpecialty;
  volume: number;
  issue: number;
  year: number;
  publicationDate: string;
  doi: string;
  readTime: string;
  downloads: number;
  citationsCount: number;
  keywords: string[];
  fullArticle: {
    background: string;
    methods: string;
    results: string;
    discussion: string;
    conclusion: string;
    ethicalApproval?: string;
    conflictOfInterest?: string;
    funding?: string;
  };
}

export interface JournalClubSession {
  id: string;
  sessionNumber: number;
  date: string;
  time: string;
  paperTitle: string;
  originalJournal: string;
  doi: string;
  presenter: string;
  presenterLevel: string;
  facultyModerator: string;
  caspScore: string;
  status: 'Upcoming' | 'Completed' | 'Archived';
  keyTakeaways: string[];
  slidesUrl?: string;
  venue: string;
}

export interface Speaker {
  name: string;
  role: string;
  institution: string;
  image?: string;
  topic?: string;
  badge?: string;
}

export interface ConferenceDetails {
  title: string;
  theme: string;
  date: string;
  time: string;
  venue: string;
  slotsTotal: number;
  slotsRemaining: number;
  contactEmail: string;
  contactPhone: string;
  contactSocial: string;
  keynote: Speaker;
  panelists: Speaker[];
}

export interface ManuscriptSubmission {
  id: string;
  trackingCode: string;
  title: string;
  category: ArticleType;
  specialty: MedicalSpecialty;
  abstract: string;
  leadAuthor: string;
  email: string;
  institution: string;
  submissionDate: string;
  status: 'Under Initial Screening' | 'In Peer Review' | 'Revision Requested' | 'Accepted for Publication' | 'Published';
  reviewProgress: number; // 0 - 100
  reviewersNotes?: string;
}

export interface CASPCriteria {
  id: string;
  question: string;
  hint: string;
  score: 'Yes' | 'Can\'t Tell' | 'No' | null;
  comments: string;
}

export interface MembershipRecord {
  id: string;
  fullName: string;
  matricNumber: string;
  clinicalLevel: string;
  email: string;
  phone: string;
  researchInterests: string[];
  appliedDate: string;
  status: 'Active Member' | 'Under Review' | 'Alumni Fellow';
}
