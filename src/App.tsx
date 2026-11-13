/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * LAUMED Journal Club Web Platform
 * College of Health Sciences, LAUTECH, Ogbomoso, Nigeria
 * Tagline: "more is definitely better…"
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { prefersReducedMotion } from './utils/scrollPerformance';

// Core Views
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

const VALID_PAGES: PageId[] = [
  'home',
  'journal-club',
  'journal',
  'journal-issue-abstracts',
  'events',
  'membership',
  'about',
  'resources',
  'contact'
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined' && window.history.state?.page) {
      const statePage = window.history.state.page as PageId;
      if (VALID_PAGES.includes(statePage)) return statePage;
    }
    return 'home';
  });
  const [selectedIssueId, setSelectedIssueId] = useState<string>(ISSUES[0]?.id ?? '');
  const [selectedSession, setSelectedSession] = useState<JournalSession | null>(null);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const mainRef = useRef<HTMLElement | null>(null);
  const scrollPositionsRef = useRef<Map<string, number>>(new Map());
  const routeKeyRef = useRef<string>('home');

  const getRouteKey = (page: PageId, issueId: string) =>
    page === 'journal-issue-abstracts' ? `${page}:${issueId}` : page;

  useEffect(() => {
    routeKeyRef.current = getRouteKey(currentPage, selectedIssueId);
  }, [currentPage, selectedIssueId]);

  const restoreScrollOrTop = useCallback((targetScrollY: number | undefined, hash?: string) => {
    window.requestAnimationFrame(() => {
      if (hash) {
        const cleanHash = hash.replace(/^#/, '');
        const el = cleanHash ? document.getElementById(cleanHash) : null;
        if (el) {
          el.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            block: 'start'
          });
          return;
        }
      }

      if (typeof targetScrollY === 'number') {
        window.scrollTo({ top: targetScrollY, behavior: 'auto' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    });
  }, []);

  const focusMainContent = useCallback(() => {
    window.requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true });
    });
  }, []);

  // Seed initial history state without overwriting hash
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.history.state?.page) {
      window.history.replaceState(
        { page: currentPage, issueId: selectedIssueId },
        '',
        window.location.href
      );
    }
  }, []);

  // Handle browser Back/Forward buttons with scroll restoration & hash awareness
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      scrollPositionsRef.current.set(routeKeyRef.current, window.scrollY);
      const nextState = event.state as { page?: PageId; issueId?: string } | null;
      const nextPage: PageId =
        nextState?.page && VALID_PAGES.includes(nextState.page) ? nextState.page : 'home';
      const nextIssueId = nextState?.issueId || selectedIssueId;
      const nextKey = getRouteKey(nextPage, nextIssueId);
      const savedY = scrollPositionsRef.current.get(nextKey) ?? 0;

      setSelectedIssueId(nextIssueId);
      setCurrentPage(nextPage);
      restoreScrollOrTop(savedY, window.location.hash);
      focusMainContent();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [focusMainContent, restoreScrollOrTop, selectedIssueId]);

  const navigateToPage = useCallback(
    (nextPage: PageId, options?: { issueId?: string; restoreScroll?: boolean; hash?: string }) => {
      const nextIssueId = options?.issueId ?? selectedIssueId;
      const currentKey = getRouteKey(currentPage, selectedIssueId);
      const nextKey = getRouteKey(nextPage, nextIssueId);

      // Save current page scroll position before leaving
      scrollPositionsRef.current.set(currentKey, window.scrollY);

      if (nextPage === currentPage && nextIssueId === selectedIssueId && !options?.hash) {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
        focusMainContent();
        return;
      }

      const targetHash = options?.hash ?? '';
      const targetUrl = targetHash
        ? `${window.location.pathname}${window.location.search}${targetHash}`
        : `${window.location.pathname}${window.location.search}`;

      if (typeof window !== 'undefined' && window.history?.pushState) {
        window.history.pushState({ page: nextPage, issueId: nextIssueId }, '', targetUrl);
      }

      if (options?.issueId) {
        setSelectedIssueId(options.issueId);
      }
      setCurrentPage(nextPage);

      const savedY = options?.restoreScroll ? scrollPositionsRef.current.get(nextKey) : undefined;
      restoreScrollOrTop(savedY, targetHash);
      focusMainContent();
    },
    [currentPage, focusMainContent, restoreScrollOrTop, selectedIssueId]
  );

  const openIssueAbstracts = (issueId: string) => {
    navigateToPage('journal-issue-abstracts', { issueId });
  };

  const handleBackToJournal = () => {
    navigateToPage('journal', { restoreScroll: true });
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
    } catch {
      // ignore storage errors
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
MEDIFICIAL INTELLIGENCE - ANNUAL JOURNAL OF LAUMED JOURNAL CLUB
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
    <div className="relative z-0 min-h-[100dvh] text-[#f5ede6] flex flex-col font-sans selection:bg-[#ea580c] selection:text-white">
      {/* Calm, Ultra-Dark Site-Wide Medical Background (fixed behind all pages & routes) */}
      <SiteWideBackground />

      {/* Initial Logo Loading Pulse */}
      <LoadingOverlay />

      {/* Toast Notification */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-22 right-4 z-50 bg-[#1f0d06] border border-[#ea580c] text-white px-4 py-2.5 rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.4)] flex items-center gap-2.5 text-xs"
        >
          <CheckCircle2 className="w-4 h-4 text-[#ea580c]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Sticky Auto-Hiding Navbar with Progress Bar & Skip Link */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={(page) => navigateToPage(page)}
        openSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Content Pages */}
      <main id="main-content" ref={mainRef} tabIndex={-1} className="flex-1 focus:outline-none">
        {currentPage === 'home' && (
          <HomeView
            setCurrentPage={(page) => navigateToPage(page)}
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
            onBackToJournal={handleBackToJournal}
          />
        )}

        {currentPage === 'events' && <EventsView />}

        {currentPage === 'membership' && <MembershipView />}

        {currentPage === 'about' && <AboutView />}

        {currentPage === 'resources' && <ResourcesView />}

        {currentPage === 'contact' && <ContactView />}
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
        setCurrentPage={(page) => navigateToPage(page)}
        openSubmitModal={() => setIsSubmitModalOpen(true)}
      />
    </div>
  );
}
