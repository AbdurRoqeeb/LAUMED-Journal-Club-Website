import React, { useState } from 'react';
import { Publication, ManuscriptSubmission, ArticleType, MedicalSpecialty } from '../types';
import { INITIAL_SUBMISSIONS, CASP_CHECKLIST_TEMPLATE, JOURNAL_CLUB_SESSIONS } from '../data/mockData';
import { 
  LayoutDashboard, 
  Send, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Bookmark, 
  Users, 
  HelpCircle, 
  Download, 
  Plus, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  FileCheck,
  Calendar,
  Search,
  ExternalLink
} from 'lucide-react';

interface DashboardProps {
  publications: Publication[];
  onSelectPublication: (pub: Publication) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onOpenSubmitModal: () => void;
  openMembershipModal: () => void;
  onDownloadPdf: (pub: Publication) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  publications,
  onSelectPublication,
  bookmarks,
  onToggleBookmark,
  onOpenSubmitModal,
  openMembershipModal,
  onDownloadPdf
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'casp' | 'reading-list' | 'sessions'>('overview');
  const [submissionsList, setSubmissionsList] = useState<ManuscriptSubmission[]>(INITIAL_SUBMISSIONS);
  
  // Quick manuscript submission state
  const [subTitle, setSubTitle] = useState('');
  const [subCategory, setSubCategory] = useState<ArticleType>('Original Research');
  const [subSpecialty, setSubSpecialty] = useState<MedicalSpecialty>('AI & Digital Health');
  const [subLeadAuthor, setSubLeadAuthor] = useState('');
  const [subEmail, setSubEmail] = useState('');
  const [subAbstract, setSubAbstract] = useState('');
  const [submissionSuccessMsg, setSubmissionSuccessMsg] = useState('');

  // CASP appraisal interactive state
  const [caspResponses, setCaspResponses] = useState<Record<string, { answer: 'Yes' | 'Can\'t Tell' | 'No' | null; comment: string }>>({
    q1: { answer: 'Yes', comment: 'Clear PICO structure defined in primary trial protocol.' },
    q2: { answer: 'Yes', comment: 'Central web-based block randomization used.' },
    q3: { answer: 'Yes', comment: 'Complete 28-day outcome ascertainment.' },
    q4: { answer: 'No', comment: 'Pragmatic open-label design, but masked adjudicators.' },
    q5: { answer: 'Yes', comment: 'Baseline demographic characteristics well balanced.' }
  });

  const handleCaspAnswer = (qId: string, answer: 'Yes' | 'Can\'t Tell' | 'No') => {
    setCaspResponses(prev => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        answer
      }
    }));
  };

  const handleCaspComment = (qId: string, comment: string) => {
    setCaspResponses(prev => ({
      ...prev,
      [qId]: {
        answer: prev[qId]?.answer || null,
        comment
      }
    }));
  };

  const handleInlineSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTitle.trim() || !subLeadAuthor.trim() || !subAbstract.trim()) return;

    const newCode = `LMJ-2025-0${Math.floor(85 + Math.random() * 20)}`;
    const newSub: ManuscriptSubmission = {
      id: `sub-${Date.now()}`,
      trackingCode: newCode,
      title: subTitle.trim(),
      category: subCategory,
      specialty: subSpecialty,
      abstract: subAbstract.trim(),
      leadAuthor: subLeadAuthor.trim(),
      email: subEmail.trim() || 'author@student.lautech.edu.ng',
      institution: 'LAUTECH College of Health Sciences, Ogbomoso',
      submissionDate: 'Today',
      status: 'Under Initial Screening',
      reviewProgress: 20,
      reviewersNotes: 'Manuscript received and assigned to Editorial Desk for plagiarism & formatting verification.'
    };

    setSubmissionsList([newSub, ...submissionsList]);
    setSubTitle('');
    setSubLeadAuthor('');
    setSubEmail('');
    setSubAbstract('');
    setSubmissionSuccessMsg(`Manuscript submitted successfully! Your tracking code is ${newCode}.`);
    setTimeout(() => setSubmissionSuccessMsg(''), 6000);
  };

  const bookmarkedArticles = publications.filter(p => bookmarks.includes(p.id));

  // Compute CASP summary score
  const yesCount = Object.values(caspResponses).filter(r => r?.answer === 'Yes').length;

  return (
    <div className="py-8 bg-[#080402]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dashboard Top Header */}
        <div className="bg-gradient-to-r from-[#170a04] via-[#100602] to-[#0a0402] border border-[#ea580c]/30 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#ea580c] uppercase tracking-wider">
              <span>Member & Researcher Portal</span>
              <span className="text-[#8c7e72]">·</span>
              <span className="text-emerald-400">System Live</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              LAUMED Academic Workspace
            </h1>
            <p className="text-xs sm:text-sm text-[#d6cebe]">
              Track student manuscript reviews, evaluate clinical trial methodologies, and coordinate journal club sessions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={openMembershipModal}
              className="px-4 py-2 bg-[#1b0d06] border border-[#ea580c]/40 hover:border-[#ea580c] text-[#fed7aa] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
            >
              Membership Status
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className="px-4 py-2 bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              New Manuscript
            </button>
          </div>
        </div>

        {/* Dashboard Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-[#ea580c]/20 pb-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#ea580c] text-white font-semibold shadow-sm'
                : 'text-[#d6cebe] hover:bg-[#160a04] hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview & Metrics
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'submissions'
                ? 'bg-[#ea580c] text-white font-semibold shadow-sm'
                : 'text-[#d6cebe] hover:bg-[#160a04] hover:text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            Manuscripts Tracker ({submissionsList.length})
          </button>

          <button
            onClick={() => setActiveTab('casp')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'casp'
                ? 'bg-[#ea580c] text-white font-semibold shadow-sm'
                : 'text-[#d6cebe] hover:bg-[#160a04] hover:text-white'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            CASP Critical Appraisal Tool
          </button>

          <button
            onClick={() => setActiveTab('sessions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'sessions'
                ? 'bg-[#ea580c] text-white font-semibold shadow-sm'
                : 'text-[#d6cebe] hover:bg-[#160a04] hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            JC Bi-Weekly Meetings
          </button>

          <button
            onClick={() => setActiveTab('reading-list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'reading-list'
                ? 'bg-[#ea580c] text-white font-semibold shadow-sm'
                : 'text-[#d6cebe] hover:bg-[#160a04] hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Saved Reading List ({bookmarkedArticles.length})
          </button>
        </div>

        {/* Tab 1: Overview & Metrics */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 4 Metric KPI Cards with Tabular Numerals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#120804] border border-[#ea580c]/25 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#a89f91]">
                  <span>Active Submissions</span>
                  <FileText className="w-4 h-4 text-[#ea580c]" />
                </div>
                <div className="text-3xl font-bold font-mono text-white tabular-nums">
                  {submissionsList.length}
                </div>
                <div className="text-[11px] text-[#fed7aa] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  1 revision requested, 2 in review
                </div>
              </div>

              <div className="bg-[#120804] border border-[#ea580c]/25 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#a89f91]">
                  <span>Published in LMJ</span>
                  <TrendingUp className="w-4 h-4 text-[#ea580c]" />
                </div>
                <div className="text-3xl font-bold font-mono text-white tabular-nums">
                  {publications.length}
                </div>
                <div className="text-[11px] text-[#8c7e72]">
                  Volumes 1–4 indexed online
                </div>
              </div>

              <div className="bg-[#120804] border border-[#ea580c]/25 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#a89f91]">
                  <span>Next JC Meeting</span>
                  <Calendar className="w-4 h-4 text-[#ea580c]" />
                </div>
                <div className="text-xl font-bold font-mono text-white">
                  Session 51
                </div>
                <div className="text-[11px] text-[#fed7aa] truncate">
                  March 13, 2025 · NEJM AI
                </div>
              </div>

              <div className="bg-[#120804] border border-[#ea580c]/25 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#a89f91]">
                  <span>Saved Articles</span>
                  <Bookmark className="w-4 h-4 text-[#ea580c]" />
                </div>
                <div className="text-3xl font-bold font-mono text-white tabular-nums">
                  {bookmarks.length}
                </div>
                <div className="text-[11px] text-[#8c7e72]">
                  In your personal research drawer
                </div>
              </div>
            </div>

            {/* Split View: Active Submissions Pipeline & Quick Appraisal Tool */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Recent Submissions Pipeline */}
              <div className="lg:col-span-7 bg-[#120804] border border-[#ea580c]/30 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#ea580c]/20 pb-3">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">
                      Current Peer Review Pipeline
                    </h3>
                    <p className="text-xs text-[#a89f91]">Tracking real-time progress of submitted student manuscripts.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className="text-xs text-[#ea580c] hover:underline flex items-center gap-1 font-semibold"
                  >
                    View All
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-3">
                  {submissionsList.slice(0, 3).map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 bg-[#180a04] border border-[#ea580c]/20 rounded-xl space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[#ea580c] font-semibold">{sub.trackingCode}</span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          sub.status === 'Accepted for Publication'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                            : sub.status === 'Revision Requested'
                            ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                            : 'bg-orange-950/60 text-orange-300 border border-orange-500/30'
                        }`}>
                          {sub.status}
                        </span>
                      </div>

                      <div className="text-sm font-serif font-bold text-[#faf5ee] leading-snug">
                        {sub.title}
                      </div>

                      <div className="text-xs text-[#8c7e72]">
                        Lead Author: <span className="text-[#d6cebe]">{sub.leadAuthor}</span> · {sub.category}
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[11px] text-[#a89f91] font-mono">
                          <span>Review Progress</span>
                          <span>{sub.reviewProgress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#291308] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#ea580c] to-[#f97316] rounded-full transition-all duration-500"
                            style={{ width: `${sub.reviewProgress}%` }}
                          />
                        </div>
                      </div>

                      {sub.reviewersNotes && (
                        <div className="text-[11px] text-[#fed7aa] bg-[#220d05] p-2 rounded-lg border border-[#ea580c]/15">
                          <strong className="text-white">Editorial Note:</strong> {sub.reviewersNotes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Upcoming Session & Critical Appraisal Snapshot */}
              <div className="lg:col-span-5 space-y-6">
                {/* Next Journal Club Card */}
                <div className="bg-[#120804] border border-[#ea580c]/30 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 bg-[#ea580c]/20 border border-[#ea580c]/40 text-[#ea580c] font-semibold rounded-md uppercase font-mono">
                      Upcoming JC Session 51
                    </span>
                    <span className="text-[#a89f91] font-mono">13 March 2025</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-base font-serif font-bold text-white leading-snug">
                      Artificial Intelligence in Point-of-Care Ultrasound for Left Ventricular Ejection Fraction
                    </h4>
                    <p className="text-xs text-[#d6cebe] font-mono">
                      Original paper: NEJM AI (2025) · Lead Presenter: Adeoluwa F. Ojedele (500L MB;BS)
                    </p>
                  </div>

                  <div className="p-3 bg-[#190a05] rounded-xl border border-[#ea580c]/15 text-xs text-[#a89f91] space-y-1">
                    <div><strong>Faculty Moderator:</strong> Prof. Adeseye Akintunde</div>
                    <div><strong>Venue:</strong> Clinical Skills Lab 2 / Hybrid Online</div>
                  </div>

                  <button
                    onClick={() => setActiveTab('casp')}
                    className="w-full py-2.5 bg-[#ea580c] hover:bg-[#f97316] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    Launch CASP Critical Appraisal Sheet
                  </button>
                </div>

                {/* Author Guidelines Card */}
                <div className="bg-[#120804] border border-[#ea580c]/20 rounded-2xl p-5 space-y-3">
                  <h4 className="text-sm font-serif font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#ea580c]" />
                    LAUMED Editorial & Submission Standards
                  </h4>
                  <ul className="text-xs text-[#a89f91] space-y-1.5 list-disc pl-4 leading-relaxed">
                    <li>Structured abstracts must not exceed 250 words (Background, Methods, Results, Conclusion).</li>
                    <li>References must strictly follow Vancouver citation style.</li>
                    <li>Ethics committee clearance number is mandatory for all human/patient studies.</li>
                    <li>Maximum 4,000 words for original articles; 1,500 words for case reports.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manuscript Submission & Tracker */}
        {activeTab === 'submissions' && (
          <div className="space-y-8">
            {/* Quick Submit Form */}
            <div className="bg-[#120804] border border-[#ea580c]/30 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#ea580c]/20 pb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
                  Online Peer-Review Portal
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  Submit a New Manuscript to LAUMED Medical Journal
                </h3>
                <p className="text-xs sm:text-sm text-[#d6cebe] mt-1">
                  Submissions undergo double-blind peer review by student editors and consultant faculty patrons.
                </p>
              </div>

              {submissionSuccessMsg && (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{submissionSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleInlineSubmission} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#faf5ee]">
                    Manuscript Title <span className="text-[#ea580c]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    placeholder="e.g. Diagnostic Concordance of Deep Learning vs. Specialist Clinicians..."
                    className="w-full px-3.5 py-2.5 bg-[#090402] border border-[#ea580c]/30 rounded-xl text-xs text-white placeholder-[#8c7e72] focus:outline-none focus:border-[#ea580c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#faf5ee]">Article Category</label>
                    <select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value as ArticleType)}
                      className="w-full px-3 py-2 bg-[#090402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                    >
                      <option value="Original Research">Original Research</option>
                      <option value="Systematic Review">Systematic Review</option>
                      <option value="Clinical Case Report">Clinical Case Report</option>
                      <option value="Journal Club Appraisal">Journal Club Appraisal</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#faf5ee]">Medical Specialty</label>
                    <select
                      value={subSpecialty}
                      onChange={(e) => setSubSpecialty(e.target.value as MedicalSpecialty)}
                      className="w-full px-3 py-2 bg-[#090402] border border-[#ea580c]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#ea580c]"
                    >
                      <option value="AI & Digital Health">AI & Digital Health</option>
                      <option value="Cardiology & Vascular">Cardiology & Vascular</option>
                      <option value="Endocrinology & Diabetes">Endocrinology & Diabetes</option>
                      <option value="Public Health & Epidemiology">Public Health & Epidemiology</option>
                      <option value="Infectious Diseases">Infectious Diseases</option>
                      <option value="Surgery & Anaesthesia">Surgery & Anaesthesia</option>
                      <option value="Medical Education">Medical Education</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#faf5ee]">
                      Lead / Corresponding Author <span className="text-[#ea580c]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={subLeadAuthor}
                      onChange={(e) => setSubLeadAuthor(e.target.value)}
                      placeholder="e.g. Adebayo T. Samuel"
                      className="w-full px-3 py-2 bg-[#090402] border border-[#ea580c]/30 rounded-lg text-xs text-white placeholder-[#8c7e72] focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#faf5ee]">Institutional Email</label>
                    <input
                      type="email"
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      placeholder="author@student.lautech.edu.ng"
                      className="w-full px-3 py-2 bg-[#090402] border border-[#ea580c]/30 rounded-lg text-xs text-white placeholder-[#8c7e72] focus:outline-none focus:border-[#ea580c]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#faf5ee]">
                    Structured Abstract (Max 300 words) <span className="text-[#ea580c]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={subAbstract}
                    onChange={(e) => setSubAbstract(e.target.value)}
                    placeholder="Include Background, Methods, Results, and Conclusion..."
                    className="w-full px-3.5 py-2.5 bg-[#090402] border border-[#ea580c]/30 rounded-xl text-xs text-white placeholder-[#8c7e72] focus:outline-none focus:border-[#ea580c]"
                  />
                </div>

                <div className="p-4 bg-[#190a05] border border-dashed border-[#ea580c]/40 rounded-xl text-center space-y-1 cursor-pointer hover:border-[#ea580c] transition-colors">
                  <Download className="w-5 h-5 text-[#ea580c] mx-auto" />
                  <div className="text-xs font-medium text-white">Attach Manuscript Document (.docx or .pdf)</div>
                  <div className="text-[11px] text-[#8c7e72]">Simulated secure institutional file drop (up to 25MB)</div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#f97316] hover:to-[#ea580c] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit for Double-Blind Peer Review
                  </button>
                </div>
              </form>
            </div>

            {/* Submissions Table */}
            <div className="bg-[#120804] border border-[#ea580c]/30 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-serif font-bold text-white">
                All Active Submissions ({submissionsList.length})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#ea580c]/20 text-[#8c7e72] font-mono uppercase text-[11px]">
                      <th className="py-3 px-3">Tracking Code</th>
                      <th className="py-3 px-3">Manuscript Title</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Lead Author</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ea580c]/10 text-[#d6cebe]">
                    {submissionsList.map((sub) => (
                      <tr key={sub.id} className="hover:bg-[#180a05] transition-colors">
                        <td className="py-3.5 px-3 font-mono text-[#ea580c] font-semibold whitespace-nowrap">
                          {sub.trackingCode}
                        </td>
                        <td className="py-3.5 px-3 font-serif font-bold text-white max-w-xs">
                          {sub.title}
                        </td>
                        <td className="py-3.5 px-3 whitespace-nowrap">{sub.category}</td>
                        <td className="py-3.5 px-3 whitespace-nowrap">{sub.leadAuthor}</td>
                        <td className="py-3.5 px-3 whitespace-nowrap font-mono">{sub.submissionDate}</td>
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            sub.status === 'Accepted for Publication'
                              ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/30'
                              : sub.status === 'Revision Requested'
                              ? 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
                              : 'bg-orange-950/70 text-orange-300 border border-orange-500/30'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono tabular-nums whitespace-nowrap text-white">
                          {sub.reviewProgress}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: CASP Critical Appraisal Tool */}
        {activeTab === 'casp' && (
          <div className="bg-[#120804] border border-[#ea580c]/30 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#ea580c]/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
                  Evidence-Based Medicine Tool
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-0.5">
                  CASP Randomized Controlled Trial Appraisal Instrument
                </h3>
                <p className="text-xs text-[#d6cebe] mt-1">
                  Used in LAUMED Journal Club bi-weekly deliberations to systematically evaluate clinical research validity.
                </p>
              </div>

              <div className="px-4 py-2 bg-[#1b0c05] border border-[#ea580c]/30 rounded-xl text-center shrink-0">
                <span className="text-[10px] uppercase font-mono text-[#8c7e72] block">Current Score</span>
                <span className="text-xl font-bold font-mono text-[#f97316] tabular-nums">
                  {yesCount} / {CASP_CHECKLIST_TEMPLATE.length} Criteria Met
                </span>
              </div>
            </div>

            {/* Questions Checklist */}
            <div className="space-y-4">
              {CASP_CHECKLIST_TEMPLATE.map((item, idx) => {
                const currentResp = caspResponses[item.id] || { answer: null, comment: '' };

                return (
                  <div
                    key={item.id}
                    className="p-4 bg-[#180a05] border border-[#ea580c]/20 rounded-xl space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-xs font-mono text-[#ea580c] font-semibold">
                          Question {idx + 1}
                        </div>
                        <h4 className="text-sm font-semibold text-white">
                          {item.question}
                        </h4>
                        <p className="text-xs text-[#8c7e72] italic">
                          {item.hint}
                        </p>
                      </div>

                      {/* Yes / Can't Tell / No Segmented Choice */}
                      <div className="flex items-center gap-1 p-1 bg-[#0d0603] border border-[#ea580c]/25 rounded-lg shrink-0">
                        {(['Yes', "Can't Tell", 'No'] as const).map((choice) => (
                          <button
                            key={choice}
                            onClick={() => handleCaspAnswer(item.id, choice)}
                            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                              currentResp.answer === choice
                                ? choice === 'Yes'
                                  ? 'bg-emerald-600 text-white'
                                  : choice === 'No'
                                  ? 'bg-rose-700 text-white'
                                  : 'bg-amber-600 text-white'
                                : 'text-[#a89f91] hover:text-white'
                            }`}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Student Reviewer Comment Line */}
                    <div>
                      <input
                        type="text"
                        value={currentResp.comment}
                        onChange={(e) => handleCaspComment(item.id, e.target.value)}
                        placeholder="Add critical appraisal rationale or citation line..."
                        className="w-full px-3 py-1.5 bg-[#090402] border border-[#ea580c]/20 rounded-lg text-xs text-[#fed7aa] placeholder-[#73665c] focus:outline-none focus:border-[#ea580c]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Journal Club Bi-Weekly Meetings */}
        {activeTab === 'sessions' && (
          <div className="bg-[#120804] border border-[#ea580c]/30 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#ea580c]/20 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
                Academic Deliberation Archive
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">
                LAUMED Journal Club Bi-Weekly Sessions
              </h3>
              <p className="text-xs text-[#d6cebe] mt-1">
                Medical students critically appraising breakthrough clinical trials with consultant guidance.
              </p>
            </div>

            <div className="space-y-4">
              {JOURNAL_CLUB_SESSIONS.map((session) => (
                <div
                  key={session.id}
                  className="p-5 bg-[#170a05] border border-[#ea580c]/25 rounded-2xl space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-[#ea580c] text-white font-bold rounded text-[11px] font-mono">
                        Session {session.sessionNumber}
                      </span>
                      <span className="text-[#fed7aa]">{session.date}</span>
                      <span className="text-[#8c7e72]">·</span>
                      <span className="text-[#8c7e72] font-mono">{session.time}</span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                      session.status === 'Upcoming'
                        ? 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {session.status}
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-white leading-snug">
                    {session.paperTitle}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#d6cebe]">
                    <div>
                      <strong className="text-white">Presenter:</strong> {session.presenter} ({session.presenterLevel})
                    </div>
                    <div>
                      <strong className="text-white">Moderator:</strong> {session.facultyModerator}
                    </div>
                    <div>
                      <strong className="text-white">Venue:</strong> {session.venue}
                    </div>
                    <div>
                      <strong className="text-white">CASP Assessment:</strong> {session.caspScore}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#ea580c]/15 text-xs text-[#fed7aa] space-y-1">
                    <span className="font-semibold text-white">Appraisal Takeaways:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-[#d6cebe]">
                      {session.keyTakeaways.map((takeaway, i) => (
                        <li key={i}>{takeaway}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Saved Reading List */}
        {activeTab === 'reading-list' && (
          <div className="bg-[#120804] border border-[#ea580c]/30 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#ea580c]/20 pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#ea580c] font-semibold">
                  Personal Research Library
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  Saved Reading List ({bookmarkedArticles.length})
                </h3>
              </div>
            </div>

            {bookmarkedArticles.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Bookmark className="w-10 h-10 text-[#ea580c] mx-auto opacity-60" />
                <h4 className="text-base font-serif font-bold text-white">No articles saved yet</h4>
                <p className="text-xs text-[#a89f91] max-w-sm mx-auto">
                  Click the bookmark icon on any paper in the Recent Publications Archive to save it to your research dashboard.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarkedArticles.map((pub) => (
                  <div
                    key={pub.id}
                    className="p-4 bg-[#180a05] border border-[#ea580c]/20 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-[#8c7e72]">
                        <span className="text-[#ea580c] font-medium">{pub.articleType}</span>
                        <span>·</span>
                        <span className="text-[#fed7aa]">{pub.specialty}</span>
                        <span>·</span>
                        <span className="font-mono">Vol {pub.volume}, No {pub.issue}</span>
                      </div>
                      <h4
                        onClick={() => onSelectPublication(pub)}
                        className="text-base font-serif font-bold text-white hover:text-[#f97316] cursor-pointer transition-colors"
                      >
                        {pub.title}
                      </h4>
                      <div className="text-xs text-[#a89f91]">
                        {pub.authors.map(a => a.name).join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onDownloadPdf(pub)}
                        className="px-3 py-1.5 bg-[#120804] border border-[#ea580c]/30 hover:border-[#ea580c] text-xs text-white rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-[#ea580c]" />
                        PDF
                      </button>
                      <button
                        onClick={() => onSelectPublication(pub)}
                        className="px-3.5 py-1.5 bg-[#ea580c] hover:bg-[#f97316] text-xs font-semibold text-white rounded-lg transition-colors"
                      >
                        Read
                      </button>
                      <button
                        onClick={() => onToggleBookmark(pub.id)}
                        className="p-1.5 text-xs text-[#a89f91] hover:text-white"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
