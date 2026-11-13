/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LAUMED Journal Club Web Platform
 * College of Health Sciences, LAUTECH, Ogbomoso, Nigeria
 * Tagline: "more is definitely better…"
 */

import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { LoadingOverlay } from './components/LoadingOverlay';
import { SiteWideBackground } from './components/SiteWideBackground';
import { SessionDetailModal } from './components/SessionDetailModal';
import { ManuscriptSubmitModal } from './components/ManuscriptSubmitModal';
import { MembershipModal } from './components/MembershipModal';
import { ArticleModal } from './components/ArticleModal';

import { ISSUES, JournalSession } from './data/clubData';
import { Publication } from './types';

// 8 Core Views blending initial UI styling and current multi-page structure
import { HomeView } from './views/HomeView';
import { JournalClubView } from './views/JournalClubView';
import { JournalView } from './views/JournalView';
import { JournalIssueAbstractsView } from './views/JournalIssueAbstractsView';
import { EventsView } from './views/EventsView';
import { MembershipView } from './views/MembershipView';
import { AboutView } from './views/AboutView';
import { ResourcesView } from './views/ResourcesView';
import { ContactView } from './views/ContactView';

import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedIssueId, setSelectedIssueId] = useState<string>(ISSUES[0]?.id ?? '');
  const [selectedSession, setSelectedSession] = useState<JournalSession | null>(null);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const openIssueAbstracts = (issueId: string) => {
    setSelectedIssueId(issueId);
    setCurrentPage('journal-issue-abstracts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('laumed_bookmarks');
      return saved ? JSON.parse(saved) : ['lmj-2025-01', 'lmj-2025-02'];
    } catch {
      return ['lmj-2025-01', 'lmj-2025-02'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('laumed_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      // ignore
    }
  }, [bookmarks]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      if (prev.includes(id)) {
        showNotification('Article removed from your reading list');
        return prev.filter((item) => item !== id);
      } else {
        showNotification('Article saved to your researcher reading list!');
        return [...prev, id];
      }
    });
  };

  const handleDownloadPdf = (pub: Publication) => {
    const textContent = `================================================================================
MEDIFICIAL INTELLIGENCE - LAUMED MEDICAL JOURNAL
Official Repository of LAUMED Journal Club
College of Health Sciences, Ladoke Akintola University of Technology (LAUTECH)
================================================================================

TITLE: ${pub.title}
ARTICLE TYPE: ${pub.articleType}
SPECIALTY: ${pub.specialty}
CITATION: Vol. ${pub.volume}, Issue ${pub.issue} (${pub.year}) · ${pub.publicationDate}
DOI: https://doi.org/${pub.doi}

AUTHORS & AFFILIATIONS:
${pub.authors.map((a) => `- ${a.name} (${a.affiliation}) ${a.email ? `[${a.email}]` : ''}`).join('\n')}

ABSTRACT:
${pub.abstract}

KEYWORDS:
${pub.keywords.join(', ')}

--------------------------------------------------------------------------------
01. BACKGROUND:
${pub.fullArticle.background}

02. METHODS:
${pub.fullArticle.methods}

03. RESULTS:
${pub.fullArticle.results}

04. DISCUSSION:
${pub.fullArticle.discussion}

05. CONCLUSION:
${pub.fullArticle.conclusion}

${pub.fullArticle.ethicalApproval ? `ETHICAL APPROVAL:\n${pub.fullArticle.ethicalApproval}\n` : ''}
${pub.fullArticle.conflictOfInterest ? `CONFLICT OF INTEREST:\n${pub.fullArticle.conflictOfInterest}\n` : ''}

================================================================================
Published by LAUMED Journal Club | Contact: laumedjc@gmail.com | @Laumedjc
"more is definitely better…"
================================================================================`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pub.id}_${pub.title.slice(0, 25).replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showNotification(`Downloading official manuscript reprint: ${pub.id}`);
  };

  return (
    <div className="relative z-0 min-h-screen text-[#f5ede6] flex flex-col font-sans selection:bg-[#ea580c] selection:text-white">
      {/* Calm, Ultra-Dark Site-Wide Medical Background (fixed behind all pages & routes) */}
      <SiteWideBackground />

      {/* Initial Logo Loading Pulse */}
      <LoadingOverlay />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-22 right-4 z-50 bg-[#1f0d06] border border-[#ea580c] text-white px-4 py-2.5 rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.4)] flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#ea580c]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Sticky Translucent Navbar with Authentic Logo & Page Links */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        openSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            setCurrentPage={setCurrentPage}
            onOpenSessionModal={(session) => setSelectedSession(session)}
            openSubmitModal={() => setIsSubmitModalOpen(true)}
          />
        )}

        {currentPage === 'journal-club' && (
          <JournalClubView
            onOpenSessionModal={(session) => setSelectedSession(session)}
          />
        )}

        {currentPage === 'journal' && (
          <JournalView
            openSubmitModal={() => setIsSubmitModalOpen(true)}
            onSelectPublication={(pub) => setSelectedPublication(pub)}
            onOpenIssueAbstracts={openIssueAbstracts}
          />
        )}

        {currentPage === 'journal-issue-abstracts' && (
          <JournalIssueAbstractsView
            issueId={selectedIssueId}
            onBackToJournal={() => {
              setCurrentPage('journal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'events' && (
          <EventsView />
        )}

        {currentPage === 'membership' && (
          <MembershipView />
        )}

        {currentPage === 'about' && (
          <AboutView />
        )}

        {currentPage === 'resources' && (
          <ResourcesView />
        )}

        {currentPage === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Modals */}
      <SessionDetailModal
        session={selectedSession}
        onClose={() => setSelectedSession(null)}
      />

      <ManuscriptSubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      <MembershipModal
        isOpen={isMembershipModalOpen}
        onClose={() => setIsMembershipModalOpen(false)}
      />

      <ArticleModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
        isBookmarked={selectedPublication ? bookmarks.includes(selectedPublication.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onDownloadPdf={handleDownloadPdf}
      />

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />

      {/* Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        openSubmitModal={() => setIsSubmitModalOpen(true)}
      />
    </div>
  );
}
