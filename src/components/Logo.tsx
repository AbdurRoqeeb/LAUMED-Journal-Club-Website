import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true
}) => {
  const boxDim = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const fontSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm';
  const titleSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';
  const taglineSize = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-xs' : 'text-[11px]';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 
        EASY LOGO SWAP:
        To replace this placeholder with your real image logo, swap the <div> below with:
        <img src="/your-logo.png" alt="LAUMED Journal Club Logo" className={`${boxDim} rounded-xl object-contain`} />
      */}
      <div
        className={`${boxDim} shrink-0 rounded-xl bg-gradient-to-br from-[var(--surface-2)] to-[var(--bg)] border-2 border-[var(--orange)] flex items-center justify-center shadow-[0_0_15px_rgba(242,106,33,0.3)] transition-transform hover:scale-105`}
        title="LAUMED Journal Club - Swap this placeholder with your custom logo file"
      >
        <span className={`font-mono font-black text-[var(--orange)] ${fontSize} tracking-tighter`}>
          LJC
        </span>
      </div>

      <div className="flex flex-col text-left">
        <span className={`${titleSize} font-heading font-extrabold text-[var(--text)] tracking-wider uppercase leading-tight`}>
          LAUMED <span className="text-[var(--orange)]">JC</span>
        </span>
        {showTagline && (
          <span className={`${taglineSize} font-serif-kicker italic text-[var(--muted)] leading-tight`}>
            "more is definitely <span className="text-[var(--orange)] font-semibold not-italic">better…</span>"
          </span>
        )}
      </div>
    </div>
  );
};
