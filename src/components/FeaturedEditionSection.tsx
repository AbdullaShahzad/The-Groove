import React, { useState } from 'react';
import { Volume } from '../types';
import { ShoppingBag, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedEditionSectionProps {
  volumes: Volume[];
  onSelectVolume: (vol: Volume) => void;
  onAddToCart: (vol: Volume, qty: number) => void;
  onOpenPreview?: (vol: Volume) => void;
}

export const FeaturedEditionSection: React.FC<FeaturedEditionSectionProps> = ({
  volumes,
  onSelectVolume,
  onAddToCart,
  onOpenPreview,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const volume = volumes[currentIndex] || volumes[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + volumes.length) % volumes.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % volumes.length);
  };

  return (
    <section className="py-16 sm:py-24 border-t border-[#E7E2D6] bg-[#FAF8F3] relative select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Kicker with Navigation Arrows */}
        <div className="flex flex-col xs:flex-row xs:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#DDD5C7] gap-3">
          <div>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#BC472A] uppercase font-semibold">
              02 / CURATORIAL SPOTLIGHT
            </span>
            <h2 className="font-serif font-bold text-2xl xs:text-3xl sm:text-4xl text-[#1C1917] tracking-tight uppercase mt-1">
              FEATURED CLOTHBOUND EDITION
            </h2>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-2 self-start xs:self-auto">
            <span className="text-[11px] xs:text-xs font-mono text-[#7A7165] mr-1 sm:mr-2">
              EDITION {currentIndex + 1} OF {volumes.length}
            </span>
            <div className="flex items-center border border-[#DDD5C7] rounded-[2px] bg-white overflow-hidden shadow-xs">
              <button
                onClick={handlePrev}
                className="p-1.5 sm:p-2 hover:bg-[#EFECE5] text-[#5A5247] hover:text-[#1C1917] transition-colors cursor-pointer select-none"
                aria-label="Previous featured volume"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-[#DDD5C7]" />
              <button
                onClick={handleNext}
                className="p-1.5 sm:p-2 hover:bg-[#EFECE5] text-[#5A5247] hover:text-[#1C1917] transition-colors cursor-pointer select-none"
                aria-label="Next featured volume"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Editorial Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Physical Book Front Cover Presentation */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div
              onClick={() => onSelectVolume(volume)}
              className="relative group cursor-pointer max-w-full"
            >
              {/* Hardcover Book Cover with Cloth Texture */}
              <div
                className="relative w-[230px] xs:w-[270px] sm:w-[310px] md:w-[340px] h-[350px] xs:h-[400px] sm:h-[450px] rounded-r-xs rounded-l-[3px] p-5 sm:p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 group-hover:-translate-y-2"
                style={{
                  backgroundColor: volume.spineColor,
                  boxShadow: '16px 20px 32px rgba(0, 0, 0, 0.38), inset 2px 0 4px rgba(255, 255, 255, 0.14)',
                }}
              >
                {/* Spine Shadow on Left */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none rounded-l-[3px]" />

                {/* Stitched Gold Foil Border Frame */}
                <div className="absolute inset-3.5 border border-[#D4AF37]/55 pointer-events-none rounded-xs">
                  <div className="absolute inset-1 border border-dashed border-[#D4AF37]/35 rounded-xs" />
                </div>

                {/* Top Medallion */}
                <div className="relative z-10 text-center pt-3 space-y-2">
                  <div className="w-8 h-8 mx-auto rounded-full border border-[#D4AF37] bg-black/25 flex items-center justify-center shadow-xs">
                    <span className="text-[#E2C26E] text-sm leading-none">✦</span>
                  </div>
                  <p className="text-[9px] tracking-widest text-[#E2C26E] font-mono uppercase font-semibold">
                    THE GROOVE ARCHIVE · {volume.volString}
                  </p>
                </div>

                {/* Title & Author in Gold Foil */}
                <div className="relative z-10 text-center py-4 space-y-3">
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#FAF8F5] uppercase tracking-tight px-2 leading-tight drop-shadow-xs">
                    {volume.title}
                  </h3>
                  <div className="w-10 h-[1px] bg-[#D4AF37]/60 mx-auto" />
                  <p className="font-serif italic text-base text-[#F1E9DB]">
                    {volume.author}
                  </p>
                </div>

                {/* Bottom Imprint */}
                <div className="relative z-10 text-center pb-1">
                  <p className="text-[8px] tracking-widest text-[#D4AF37]/80 font-mono uppercase font-semibold">
                    OCTAVO & FOLIO PRESS
                  </p>
                </div>

                {/* Ribbon */}
                <div
                  className="absolute bottom-[-18px] left-14 w-3 h-7 bg-[#9E1B26] shadow-sm pointer-events-none"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
                />
              </div>

              {/* Stacked Pages on Right */}
              <div className="absolute right-[-8px] top-2 bottom-2 w-[10px] bg-gradient-to-r from-[#D7CCA8] via-[#F4EBD4] to-[#EAE0CA] rounded-r-xs shadow-md border-r border-[#C4B793] pointer-events-none">
                <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(0deg,#7A6A50,#7A6A50_1px,transparent_1px,transparent_3px)]" />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Critique & Specifications */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3 text-xs">
              <span className="bg-[#F7EBE8] text-[#BC472A] font-mono font-semibold px-2 py-0.5 tracking-wider uppercase rounded-xs">
                {volume.category}
              </span>
              <span className="text-[#7A7165] font-mono">
                PUB. {volume.publishedYear} · ISBN {volume.isbn}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#1C1917] tracking-tight leading-tight">
                {volume.title}
              </h3>
              <p className="font-serif italic text-xl text-[#575047]">
                by {volume.author}
              </p>
            </div>

            <div className="flex items-baseline gap-4 pt-1">
              <span className="font-mono text-3xl font-bold text-[#1C1917]">
                ${volume.price.toFixed(2)}
              </span>
              <span className="bg-[#E2EDE5] text-[#1E5638] text-[11px] font-mono tracking-wider font-semibold px-2.5 py-0.5 rounded-xs uppercase">
                {volume.stockCount} PRESERVED COPIES IN STOCK
              </span>
            </div>

            <p className="text-sm text-[#473F35] leading-relaxed max-w-xl font-normal">
              {volume.synopsis}
            </p>

            {/* Material Binding Specifications Box */}
            <div className="bg-[#EFECE5] border border-[#DDD5C7] rounded-xs p-4 space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#A05C3B] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BINDING SPECIFICATION</span>
              </div>
              <p className="text-xs text-[#524A40] leading-relaxed">
                {volume.bindingSpecs.clothDescription}
              </p>
              <div className="text-[10px] font-mono text-[#786F63] tracking-wide pt-1 border-t border-[#DDD5C7]/70">
                FORMAT: {volume.bindingSpecs.format} · {volume.bindingSpecs.paperStock}
              </div>
            </div>

            {/* Commerce Actions */}
            <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 w-full">
              <button
                onClick={() => onAddToCart(volume, 1)}
                className="w-full sm:w-auto justify-center min-h-[44px] bg-[#1C1917] hover:bg-black text-[#FAF8F5] px-6 py-3 rounded-xs font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm cursor-pointer select-none active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG · ${volume.price.toFixed(2)}</span>
              </button>

              {onOpenPreview && (
                <button
                  onClick={() => onOpenPreview(volume)}
                  className="w-full sm:w-auto justify-center min-h-[44px] bg-[#EDE7DA] hover:bg-[#E2D9C8] text-[#1C1917] border border-[#C5BBA9] px-5 py-3 rounded-xs font-mono font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer select-none shadow-xs active:scale-[0.99]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#BC472A]" />
                  <span>READ SAMPLE [PAGES 1–2]</span>
                </button>
              )}

              <button
                onClick={() => onSelectVolume(volume)}
                className="w-full sm:w-auto justify-center min-h-[44px] bg-transparent hover:bg-[#EAE4D8] text-[#1C1917] border border-[#DDD5C7] px-5 py-3 rounded-xs font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer select-none active:scale-[0.99]"
              >
                <span>INSPECT FULL VOLUME</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick edition selector thumbnails */}
            <div className="pt-4 border-t border-[#DDD5C7]/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-mono uppercase text-[#7A7165] shrink-0 mr-1">
                CANON PREVIEWS:
              </span>
              {volumes.slice(0, 6).map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-5 h-8 rounded-[1px] transition-all cursor-pointer ${
                    currentIndex === idx ? 'ring-2 ring-[#BC472A] scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: v.spineColor }}
                  title={v.title}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
