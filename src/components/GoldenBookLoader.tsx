import React from 'react';

interface GoldenBookLoaderProps {
  message?: string;
  subMessage?: string;
  isOverlay?: boolean;
}

export const GoldenBookLoader: React.FC<GoldenBookLoaderProps> = ({
  message = 'PRESERVING CANONICAL FOLIO',
  subMessage = 'BINDING DECKLE EDGES & FOILING 24KT LEAF',
  isOverlay = true,
}) => {
  return (
    <div
      className={`${
        isOverlay
          ? 'fixed inset-0 z-50 bg-[#16120E]/90 backdrop-blur-md flex items-center justify-center'
          : 'flex flex-col items-center justify-center p-8'
      } select-none animate-fadeIn`}
    >
      <div className="flex flex-col items-center justify-center text-center max-w-sm px-6">
        
        {/* 
          GOLDEN BOOK OUTLINE WITH 10 PAGES TURNING
          Minimalist, crisp gold wireframe lines (#D4AF37, #E2C26E)
        */}
        <div className="relative w-28 h-20 sm:w-32 sm:h-24 flex items-center justify-center">
          
          {/* Ambient Golden Glow Aura */}
          <div className="absolute inset-0 bg-[#D4AF37]/15 rounded-full blur-xl animate-pulse" />

          {/* SVG Outline Book Structure */}
          <svg
            viewBox="0 0 140 100"
            className="w-full h-full drop-shadow-[0_0_12px_rgba(212,175,55,0.45)]"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer Hardcover Outline */}
            <path
              d="M 15,85 C 35,82 55,80 70,82 C 85,80 105,82 125,85 L 125,25 C 105,22 85,20 70,22 C 55,20 35,22 15,25 Z"
              stroke="#D4AF37"
              strokeWidth="2"
              fill="rgba(212, 175, 55, 0.04)"
            />

            {/* Central Spine Hinge */}
            <line x1="70" y1="22" x2="70" y2="82" stroke="#E2C26E" strokeWidth="2" />

            {/* Left Cover Static Pages Stack (5 faint outline layers) */}
            <path d="M 18,27 C 36,24 54,23 68,24 L 68,80 C 54,79 36,80 18,83" stroke="#D4AF37" strokeOpacity="0.4" />
            <path d="M 21,29 C 38,26 55,25 68,26 L 68,78 C 55,77 38,78 21,81" stroke="#D4AF37" strokeOpacity="0.5" />
            <path d="M 24,31 C 40,28 56,27 68,28 L 68,76 C 56,75 40,76 24,79" stroke="#D4AF37" strokeOpacity="0.6" />
            <path d="M 27,33 C 42,30 57,29 68,30 L 68,74 C 57,73 42,74 27,77" stroke="#D4AF37" strokeOpacity="0.7" />
            <path d="M 30,35 C 44,32 58,31 68,32 L 68,72 C 58,71 44,72 30,75" stroke="#E2C26E" strokeOpacity="0.8" />

            {/* Right Cover Static Pages Stack (5 faint outline layers) */}
            <path d="M 122,27 C 104,24 86,23 72,24 L 72,80 C 86,79 104,80 122,83" stroke="#D4AF37" strokeOpacity="0.4" />
            <path d="M 119,29 C 102,26 85,25 72,26 L 72,78 C 85,77 102,78 119,81" stroke="#D4AF37" strokeOpacity="0.5" />
            <path d="M 116,31 C 100,28 84,27 72,28 L 72,76 C 84,75 100,76 116,79" stroke="#D4AF37" strokeOpacity="0.6" />
            <path d="M 113,33 C 98,30 83,29 72,30 L 72,74 C 83,73 98,74 113,77" stroke="#D4AF37" strokeOpacity="0.7" />
            <path d="M 110,35 C 96,32 82,31 72,32 L 72,72 C 82,71 96,72 110,75" stroke="#E2C26E" strokeOpacity="0.8" />

            {/* 
              FLIPPING GOLDEN PAGES (Animated paths in rhythm)
              Ten turning page stages simulated through flowing sinusoidal waveforms
            */}
            <path
              d="M 70,22 C 78,14 96,18 108,30 L 108,70 C 96,58 78,54 70,62 Z"
              stroke="#FFF2B2"
              strokeWidth="1.2"
              fill="rgba(243, 226, 169, 0.08)"
              className="animate-pulse"
              style={{ animationDuration: '1.2s' }}
            />
            <path
              d="M 70,22 C 62,14 44,18 32,30 L 32,70 C 44,58 62,54 70,62 Z"
              stroke="#E2C26E"
              strokeWidth="1.2"
              fill="rgba(226, 194, 110, 0.08)"
              className="animate-pulse"
              style={{ animationDuration: '1.6s' }}
            />

            {/* Center Gold Star Emblem on Binding */}
            <circle cx="70" cy="22" r="2.5" fill="#FAF8F5" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="70" cy="82" r="2.5" fill="#FAF8F5" stroke="#D4AF37" strokeWidth="1" />
          </svg>

          {/* Rhythmic Page-Turn Flutter Animation (CSS) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            <div className="w-16 h-12 border-t-2 border-r-2 border-[#E2C26E] opacity-70 origin-bottom-left animate-spin" style={{ animationDuration: '2.4s', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }} />
          </div>
        </div>

        {/* Typographic Archival Status */}
        <div className="mt-6 space-y-1.5">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2C26E] animate-ping" />
            <h4 className="font-mono text-xs sm:text-[13px] uppercase font-bold tracking-[0.24em] text-[#FAF8F5]">
              {message}
            </h4>
          </div>
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#B8A798]/75">
            {subMessage}
          </p>
        </div>

        {/* Minimal Progress Line */}
        <div className="mt-5 w-32 sm:w-40 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#E2C26E] to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
        </div>

      </div>
    </div>
  );
};
