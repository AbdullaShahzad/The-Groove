import React from 'react';
import { Volume } from '../types';

interface GrooveSpineProps {
  volume: Volume;
  index: number;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: (vol: Volume) => void;
  onOpenPreview?: (vol: Volume) => void;
}

export const GrooveSpine: React.FC<GrooveSpineProps> = ({
  volume,
  isSelected,
  isDimmed,
  onSelect,
  onOpenPreview,
}) => {
  return (
    <div
      onClick={() => onSelect(volume)}
      className={`group relative cursor-pointer select-none transition-all duration-300 ease-out origin-bottom shrink-0 ${
        isDimmed ? 'opacity-20 grayscale-30 scale-95 pointer-events-auto' : 'opacity-100 hover:scale-[1.01]'
      }`}
      style={{
        // Slanted in parallel towards the left (-6.8deg) like before
        transform: isSelected
          ? 'rotate(-6.8deg) translateY(-22px)'
          : 'rotate(-6.8deg) translateY(0)',
        transformOrigin: 'bottom center',
      }}
    >
      {/* Floating Preview Trigger Badge on Hover */}
      {onOpenPreview && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenPreview(volume);
          }}
          className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 bg-[#16120F] hover:bg-black text-[#A88432] text-[8px] sm:text-[9px] font-mono px-2.5 py-0.5 rounded-[2px] shadow-md whitespace-nowrap pointer-events-auto border border-[#A88432]/40"
          title="Open 3D archival book preview"
        >
          INSPECT FOLIO
        </button>
      )}

      {/* 
        Upright Archival Spine Body:
        Clean, straight, museum-grade leatherette clothbound volume
      */}
      <div
        className="relative flex flex-col justify-between w-[24px] xs:w-[28px] sm:w-[34px] md:w-[40px] lg:w-[45px] xl:w-[49px] h-[245px] xs:h-[285px] sm:h-[345px] md:h-[405px] lg:h-[455px] xl:h-[490px] rounded-[1px] transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.32)] overflow-hidden"
        style={{
          backgroundColor: volume.spineColor,
          boxShadow: isSelected
            ? '0 22px 35px rgba(0,0,0,0.4), 0 0 12px rgba(168,132,50,0.3)'
            : '2px 8px 18px rgba(0, 0, 0, 0.28), inset 1px 0 2px rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Top 3D Curled Book Head showing pages */}
        <div className="absolute top-0 inset-x-0 h-3 sm:h-4 bg-gradient-to-b from-[#F7F1E1] to-[#E2D9C3] border-b border-black/40 shadow-xs flex items-center justify-center overflow-hidden">
          <div className="w-full h-full opacity-50 bg-[repeating-linear-gradient(90deg,#998A72,#998A72_1px,transparent_1px,transparent_2.5px)]" />
        </div>

        {/* Cloth Texture Lighting & Spine Crease */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-white/10 to-black/35 pointer-events-none" />
        <div className="absolute left-0.5 top-3 bottom-0 w-[1px] bg-white/20 pointer-events-none" />
        <div className="absolute right-0.5 top-3 bottom-0 w-[1px] bg-black/40 pointer-events-none" />

        {/* Top Gold Medallion with Star */}
        <div className="relative pt-4 sm:pt-5 md:pt-6 pb-1 sm:pb-2 flex flex-col items-center z-10">
          <div className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 rounded-full border border-[#D4AF37]/90 bg-black/30 flex items-center justify-center shadow-xs">
            <span className="text-[#E2C26E] text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs leading-none select-none font-serif">✦</span>
          </div>
        </div>

        {/* Vertical Title reading upward towards star */}
        <div className="relative flex-1 flex items-center justify-center py-2 sm:py-3 z-10 overflow-hidden">
          <div
            className="whitespace-nowrap font-serif tracking-widest text-[#FAF8F5] uppercase text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] md:text-[11px] xl:text-xs font-semibold select-none drop-shadow-sm opacity-95 transition-opacity group-hover:opacity-100"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)',
              letterSpacing: '0.14em',
            }}
          >
            {volume.title}
          </div>
        </div>

        {/* Bottom Gold Foiled Plaque with Volume # & Price */}
        <div className="relative z-10 px-0.5 sm:px-1 pb-1.5 sm:pb-2.5 md:pb-3 pt-0.5">
          <div className="border border-[#D4AF37]/75 bg-black/40 py-1 sm:py-1.5 px-0.5 text-center rounded-[2px] backdrop-blur-[1px] shadow-xs">
            <div className="text-[6.5px] xs:text-[7.5px] sm:text-[8.5px] md:text-[9px] tracking-wider text-[#D4AF37] font-mono uppercase font-bold leading-tight">
              {volume.volString}
            </div>
            <div className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] md:text-[11px] text-[#F3E2A9] font-mono font-bold tracking-tight mt-0.5 leading-tight">
              ${volume.price.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Interactive Hover Sheen Sweep */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-700 ease-in-out pointer-events-none" />
      </div>

      {/* Surface Desk Cast Shadow leaning towards left */}
      <div className="absolute -bottom-2 inset-x-0.5 h-2 sm:h-3 bg-black/30 blur-[4px] rounded-full pointer-events-none transform skew-x-12 group-hover:scale-x-110 group-hover:opacity-60 transition-all duration-300" />
    </div>
  );
};
