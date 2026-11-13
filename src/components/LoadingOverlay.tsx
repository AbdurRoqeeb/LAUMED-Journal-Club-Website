import React, { useEffect, useState } from 'react';
import { LAUMED_LOGO_SRC, LAUMED_LOGO_ALT } from '../data/logoConfig';

export const LoadingOverlay: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdTime = prefersReducedMotion ? 250 : 650;

    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
    }, holdTime);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, holdTime + 320);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] bg-[#120605] flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-none ${
        fadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="p-8 flex flex-col items-center gap-5">
        <img
          src={LAUMED_LOGO_SRC}
          alt={LAUMED_LOGO_ALT}
          className="h-16 w-16 rounded-2xl object-contain animate-pulse shadow-[0_0_28px_rgba(242,106,33,0.45)]"
        />
        <span className="text-xs font-mono tracking-widest uppercase text-[#FFB27A]">
          LAUMED Journal Club
        </span>
      </div>
    </div>
  );
};
