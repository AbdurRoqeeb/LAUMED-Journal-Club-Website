import React from 'react';
import { LAUMED_LOGO_SRC, LAUMED_LOGO_ALT } from '../data/logoConfig';

interface LaumedLogoProps {
  className?: string;
  size?: 'footer' | 'navbar' | 'lg';
  showMotto?: boolean;
}

export const LaumedLogo: React.FC<LaumedLogoProps> = ({
  className = '',
  size = 'navbar',
  showMotto = true
}) => {
  // Enforce >= 28px minimum height: footer = 32px, navbar = 40px (within 36-44px), lg = 48px
  // Maintain clear space around the logo of at least half its height via padding/gap
  const imgSizeClass =
    size === 'footer'
      ? 'h-8 w-8 min-h-[32px] min-w-[32px]'
      : size === 'lg'
      ? 'h-12 w-12 min-h-[48px] min-w-[48px]'
      : 'h-10 w-10 min-h-[40px] min-w-[40px]';

  const clearSpaceClass =
    size === 'footer'
      ? 'py-4 pl-2 sm:pl-4 pr-2 gap-4'
      : size === 'lg'
      ? 'py-6 pl-6 pr-2 gap-6'
      : 'py-5 pl-1 sm:pl-2 pr-1 gap-5';

  const titleSize =
    size === 'footer'
      ? 'text-sm'
      : size === 'lg'
      ? 'text-lg'
      : 'text-sm sm:text-base';

  const mottoSize =
    size === 'footer'
      ? 'text-[11px]'
      : size === 'lg'
      ? 'text-xs'
      : 'text-[11px]';

  return (
    <div className={`flex items-center select-none ${clearSpaceClass} ${className}`}>
      {/* Official Club Logo (unmodified, uncropped, no color filters) */}
      <img
        src={LAUMED_LOGO_SRC}
        alt={LAUMED_LOGO_ALT}
        className={`${imgSizeClass} shrink-0 rounded-lg object-contain shadow-[0_0_12px_rgba(242,106,33,0.25)]`}
      />

      {/* Typography Lockup */}
      <div className="flex flex-col">
        <span
          className={`${titleSize} font-bold tracking-wider text-[#FFF4EC] leading-tight whitespace-nowrap`}
        >
          LAUMED Journal Club
        </span>
        {showMotto && (
          <span
            className={`${mottoSize} text-[#F26A21] italic font-serif tracking-wide leading-tight whitespace-nowrap`}
          >
            more is definitely better…
          </span>
        )}
      </div>
    </div>
  );
};
