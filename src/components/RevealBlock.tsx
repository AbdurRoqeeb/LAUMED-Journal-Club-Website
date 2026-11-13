import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../utils/scrollPerformance';

interface RevealBlockProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Subtle single-shot reveal wrapper (max 14px movement, ~340ms, transform/opacity only).
 * Always visible immediately if reduced motion is enabled or IntersectionObserver is unavailable.
 */
export const RevealBlock: React.FC<RevealBlockProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<'visible' | 'hidden'>(() => {
    if (
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      prefersReducedMotion()
    ) {
      return 'visible';
    }
    return 'hidden';
  });

  useEffect(() => {
    if (state === 'visible') return;

    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setState('visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.04, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);

    // Safety net: never leave content hidden if observer doesn't fire promptly
    const safetyTimer = window.setTimeout(() => {
      setState('visible');
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(safetyTimer);
    };
  }, [state]);

  return (
    <div ref={ref} data-reveal={state} className={`reveal-block ${className}`}>
      {children}
    </div>
  );
};
