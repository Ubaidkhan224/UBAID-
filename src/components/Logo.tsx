import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 40 : 32;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Cricket Inspired Geometric Icon in Lime Green */}
      <div 
        className="relative flex items-center justify-center rounded-lg bg-gradient-to-br from-lime-500 to-lime-600 text-zinc-950 shadow-md shadow-lime-500/30 p-1.5 border border-lime-400"
        style={{ width: iconSize + 8, height: iconSize + 8 }}
      >
        <svg 
          viewBox="0 0 36 36" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full text-zinc-950"
        >
          {/* Crossed Cricket Bats Silhouette */}
          <path 
            d="M8 6L14 12L25 29C25.5 29.8 24.8 30.8 23.9 30.5L16 27L8 6Z" 
            fill="currentColor" 
            fillOpacity="0.9"
          />
          <path 
            d="M28 6L22 12L11 29C10.5 29.8 11.2 30.8 12.1 30.5L20 27L28 6Z" 
            fill="currentColor" 
            fillOpacity="0.45"
          />
          {/* Bat Handles */}
          <path d="M6 3L9 7" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M30 3L27 7" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
          {/* Cricket Ball with Seam */}
          <circle cx="18" cy="20" r="4.5" fill="#ffffff" />
          <path d="M15.5 18.5C17.5 17.5 18.5 22.5 20.5 21.5" stroke="#4d7c0f" strokeWidth="1.1" strokeDasharray="1 1" />
        </svg>
      </div>

      {/* Brand Title */}
      <div className="flex flex-col leading-none">
        <span className="font-extrabold tracking-tight text-zinc-950 uppercase text-lg sm:text-xl font-heading">
          SPORT <span className="text-lime-600">ACCESSORIES</span>
        </span>
        <span className="text-[10px] tracking-widest text-zinc-500 font-bold uppercase mt-0.5">
          Cricket Gear · Pakistan
        </span>
      </div>
    </div>
  );
};
