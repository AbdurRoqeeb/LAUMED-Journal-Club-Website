import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { prefersReducedMotion } from '../utils/scrollPerformance';

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const checkThreshold = () => {
      rafId = null;
      const threshold = window.innerHeight * 1.5;
      setVisible(window.scrollY > threshold);
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(checkThreshold);
      }
    };

    checkThreshold();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      style={{
        bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
        right: 'max(1rem, env(safe-area-inset-right))'
      }}
      className="fixed z-40 w-12 h-12 min-w-[48px] min-h-[48px] inline-flex items-center justify-center rounded-full bg-[#2A120B] border border-[#ea580c] text-[#fb923c] hover:bg-[#ea580c] hover:text-white shadow-[0_6px_22px_rgba(8,4,2,0.85)] transition-[transform,opacity,background-color,color] duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fed7aa]"
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
};
