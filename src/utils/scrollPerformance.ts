import { useEffect, useState } from 'react';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isLowEndOrMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const narrowScreen = window.innerWidth < 768;
  const lowCores = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4;
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;
  return narrowScreen || lowCores || lowMemory;
}

type FastScrollListener = (isFastScrolling: boolean) => void;

class FastScrollTracker {
  private listeners = new Set<FastScrollListener>();
  private lastScrollY = 0;
  private lastTime = 0;
  private rafPending = false;
  private resetTimer: number | null = null;
  private fastScrolling = false;
  private bound = false;

  private notify(nextState: boolean) {
    if (this.fastScrolling === nextState) return;
    this.fastScrolling = nextState;
    this.listeners.forEach((cb) => cb(nextState));
  }

  private handleScroll = () => {
    if (this.rafPending) return;
    this.rafPending = true;

    requestAnimationFrame((now) => {
      this.rafPending = false;
      const currentY = window.scrollY;
      const dt = Math.max(1, now - this.lastTime);
      const speedPxPerMs = Math.abs(currentY - this.lastScrollY) / dt;

      this.lastScrollY = currentY;
      this.lastTime = now;

      // Throttle/pause heavy canvas work during fast mobile/low-end scroll bursts
      if (isLowEndOrMobileDevice() && speedPxPerMs > 0.35) {
        this.notify(true);
        if (this.resetTimer !== null) {
          window.clearTimeout(this.resetTimer);
        }
        this.resetTimer = window.setTimeout(() => {
          this.resetTimer = null;
          this.notify(false);
        }, 160);
      }
    });
  };

  private bindListeners() {
    if (this.bound || typeof window === 'undefined') return;
    this.lastScrollY = window.scrollY;
    this.lastTime = performance.now();
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    this.bound = true;
  }

  private unbindIfEmpty() {
    if (!this.bound || this.listeners.size > 0 || typeof window === 'undefined') return;
    window.removeEventListener('scroll', this.handleScroll);
    if (this.resetTimer !== null) {
      window.clearTimeout(this.resetTimer);
      this.resetTimer = null;
    }
    this.fastScrolling = false;
    this.bound = false;
  }

  subscribe(listener: FastScrollListener): () => void {
    this.listeners.add(listener);
    this.bindListeners();
    listener(this.fastScrolling);

    return () => {
      this.listeners.delete(listener);
      this.unbindIfEmpty();
    };
  }
}

export const fastScrollTracker = new FastScrollTracker();

/**
 * Tracks the currently active section ID using IntersectionObserver (no scroll polling).
 */
export function useSectionObserver(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window) || sectionIds.length === 0) {
      return;
    }

    setActiveId((prev) => (prev && sectionIds.includes(prev) ? prev : sectionIds[0]));

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleRatios.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleRatios.delete(entry.target.id);
          }
        });

        // Pick the first intersecting section in document order (or fallback to highest ratio)
        for (const id of sectionIds) {
          if (visibleRatios.has(id)) {
            setActiveId(id);
            return;
          }
        }
      },
      {
        rootMargin: '-18% 0px -62% 0px',
        threshold: [0, 0.15, 0.4]
      }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds.join('|')]);

  return activeId;
}
