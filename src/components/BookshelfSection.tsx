import React, { useState, useEffect, useRef } from 'react';
import { Volume, Category } from '../types';
import { BookOpen, Layers, RotateCw } from 'lucide-react';
import { SpiralBookshelfCanvas } from './SpiralBookshelfCanvas';

interface BookshelfSectionProps {
  volumes: Volume[];
  onSelectVolume: (vol: Volume) => void;
  onOpenPreview?: (vol: Volume) => void;
}

// Smooth Hermite S-curve easing function to maintain the quiet, editorial tactile feel
const easeInOutEditorial = (t: number): number => {
  const sign = Math.sign(t);
  const abs = Math.min(1, Math.abs(t));
  // Hermite smoothstep: 3*x^2 - 2*x^3 gives smooth acceleration and deceleration (zero derivative at edges)
  const smooth = abs * abs * (3 - 2 * abs);
  return sign * smooth;
};

export const BookshelfSection: React.FC<BookshelfSectionProps> = ({
  volumes,
  onSelectVolume,
  onOpenPreview,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [shelfView, setShelfView] = useState<'spiral' | 'flat'>('spiral');
  const [activeCategory, setActiveCategory] = useState<Category>('ALL VOLUMES');
  const [hoveredBook, setHoveredBook] = useState<Volume | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll-triggered viewport measurement with requestAnimationFrame
  useEffect(() => {
    let animFrameId: number;

    const updateScrollProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionCenterY = rect.top + rect.height / 2;
      const viewportCenterY = window.innerHeight / 2;
      
      // Normalized distance from viewport center: -1.0 (above center) to +1.0 (below center)
      const normalized = (sectionCenterY - viewportCenterY) / (window.innerHeight * 0.75);
      const clamped = Math.max(-1, Math.min(1, normalized));
      setScrollProgress(clamped);
    };

    const handleScroll = () => {
      cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const categories: Category[] = [
    'ALL VOLUMES',
    'FICTION',
    'CLASSICS',
    'PHILOSOPHY',
    'THRILLER',
    'MENTAL HEALTH',
    'MONEY & MIND',
  ];

  const displayedVolumes = activeCategory === 'ALL VOLUMES'
    ? volumes
    : volumes.filter(v => v.category === activeCategory);

  // Calculate subtle Y-axis rotation as books move through viewport center
  const getBookRotationY = (index: number, total: number) => {
    // Staggered perspective offset across the physical shelf from left to right
    const stagger = ((index - (total - 1) / 2) / Math.max(1, total - 1)) * 0.35;
    const localProgress = Math.max(-1, Math.min(1, scrollProgress + stagger));
    
    // Apply editorial Hermite easing
    const eased = easeInOutEditorial(localProgress);
    // Smooth, subtle rotation on Y-axis (between -12deg and +12deg)
    return eased * 12;
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 border-t border-[#E7E2D6] bg-[#F3EFE7] relative select-none"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#DDD5C7] gap-4">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#BC472A] uppercase font-semibold">
              01 / PHYSICAL ARCHIVAL STACKS
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1C1917] tracking-tight uppercase">
              THE BOOKSELLER&apos;S SHELF
            </h2>
            <p className="text-xs sm:text-[13px] text-[#6B6359] max-w-lg font-normal">
              Scroll down or drag to rotate through the cylindrical archival shelf. Click any edition to inspect curatorial bindings.
            </p>
          </div>

          {/* Mode Switcher & Category Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center border border-[#DDD5C7] rounded-[2px] bg-white p-0.5 shadow-xs text-xs font-mono">
              <button
                onClick={() => setShelfView('spiral')}
                className={`px-3 py-1 rounded-[2px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                  shelfView === 'spiral'
                    ? 'bg-[#1C1917] text-white font-bold'
                    : 'text-[#6B6359] hover:bg-[#EAE4D8]'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>3D Spiral Cylinder</span>
              </button>
              <button
                onClick={() => setShelfView('flat')}
                className={`px-3 py-1 rounded-[2px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                  shelfView === 'flat'
                    ? 'bg-[#1C1917] text-white font-bold'
                    : 'text-[#6B6359] hover:bg-[#EAE4D8]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Linear Wood Shelf</span>
              </button>
            </div>

            {/* Category Filter for Flat Shelf */}
            {shelfView === 'flat' && (
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none text-[11px] font-mono uppercase tracking-wider">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 rounded-[2px] transition-colors cursor-pointer whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-[#1C1917] text-white font-bold'
                        : 'text-[#6B6359] hover:text-[#1C1917] hover:bg-[#EAE4D8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 
          1. 3D ROTATING SPIRAL CYLINDER BOOKSHELF (Chrome Experiment Style)
        */}
        {shelfView === 'spiral' ? (
          <SpiralBookshelfCanvas
            volumes={volumes}
            onSelectVolume={onSelectVolume}
            onOpenPreview={onOpenPreview}
          />
        ) : (
          /* 
            2. PHYSICAL WOODEN SHELF:
            Books sit inside the smoked walnut shelf with scroll-triggered Y-axis rotation
            as they move through the center of the viewport!
          */
          <div
            className="relative rounded-[4px] shadow-2xl overflow-hidden border border-[#2A1D15]"
            style={{
              perspective: '1200px',
            }}
          >
            {/* Top Shelf Beam */}
            <div className="h-6 sm:h-8 bg-gradient-to-b from-[#2E2018] via-[#241912] to-[#1A120D] border-b border-[#3D2C22] shadow-md relative z-20">
              <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(0,0,0,0.5)_20px,rgba(0,0,0,0.5)_40px)]" />
            </div>

            {/* Shelf Interior Cavity */}
            <div className="bg-[#18110D] relative pt-6 pb-0 px-4 sm:px-8 overflow-x-auto scrollbar-none flex justify-center">
              
              <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />

              <div
                className="relative z-10 flex items-end justify-center gap-1 sm:gap-2 pt-8 pb-0 min-w-max"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {displayedVolumes.map((volume, idx) => {
                  const isHovered = hoveredBook?.id === volume.id;
                  const widthPx = volume.physicalDimensions?.widthPx || 46;
                  const heightPx = (volume.physicalDimensions?.heightPx || 430) * 0.92;
                  
                  // Scroll-triggered subtle Y-axis rotation
                  const rotationY = getBookRotationY(idx, displayedVolumes.length);

                  return (
                    <div
                      key={volume.id}
                      onClick={() => onSelectVolume(volume)}
                      onMouseEnter={() => setHoveredBook(volume)}
                      onMouseLeave={() => setHoveredBook(null)}
                      className="group relative cursor-pointer select-none origin-bottom flex flex-col justify-end"
                      style={{
                        transform: `perspective(900px) rotateY(${rotationY.toFixed(2)}deg) ${
                          isHovered ? 'translateY(-10px) translateZ(16px)' : 'translateY(0) translateZ(0)'
                        }`,
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease-out',
                      }}
                    >
                      {/* The Book Spine */}
                      <div
                        className="relative flex flex-col justify-between rounded-t-[2px] rounded-b-[1px] transition-all duration-250 overflow-hidden shadow-lg"
                        style={{
                          width: `${widthPx}px`,
                          height: `${heightPx}px`,
                          backgroundColor: volume.spineColor,
                          boxShadow: isHovered
                            ? '0 16px 28px rgba(0,0,0,0.75), 0 0 12px rgba(212,175,55,0.4)'
                            : '2px 6px 14px rgba(0,0,0,0.5), inset 1px 0 2px rgba(255,255,255,0.12)',
                        }}
                      >
                        <div className="h-3.5 bg-gradient-to-b from-[#F5EED9] to-[#D5C9AE] border-b border-black/40 flex items-center justify-center">
                          <div className="w-full h-full opacity-40 bg-[repeating-linear-gradient(90deg,#7A6A50,#7A6A50_1px,transparent_1px,transparent_2px)]" />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-white/10 to-black/40 pointer-events-none" />

                        <div className="pt-4 flex flex-col items-center relative z-10">
                          <div className="w-4 h-4 rounded-full border border-[#D4AF37]/80 bg-black/30 flex items-center justify-center">
                            <span className="text-[#E2C26E] text-[8px] leading-none select-none font-serif">✦</span>
                          </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center py-2 relative z-10 overflow-hidden">
                          <div
                            className="whitespace-nowrap font-serif tracking-widest text-[#FAF8F5] uppercase text-[10px] sm:text-[11px] font-semibold select-none opacity-90 transition-opacity group-hover:opacity-100"
                            style={{
                              writingMode: 'vertical-rl',
                              transform: 'rotate(180deg)',
                              letterSpacing: '0.14em',
                              textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                            }}
                          >
                            {volume.title}
                          </div>
                        </div>

                        <div className="px-1 pb-2 pt-1 relative z-10">
                          <div className="border border-[#D4AF37]/60 bg-black/40 py-1 text-center rounded-[1px]">
                            <div className="text-[8px] font-mono text-[#D4AF37] uppercase font-bold">
                              {volume.volString}
                            </div>
                            <div className="text-[9px] font-mono text-[#F3E2A9] font-bold mt-0.5">
                              ${volume.price.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-600 ease-out pointer-events-none" />
                      </div>

                      <div className="w-full h-2 bg-black/60 blur-[3px] pointer-events-none" />
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Bottom Shelf Ledge */}
            <div className="h-6 sm:h-8 bg-gradient-to-b from-[#38261C] via-[#2A1D15] to-[#1C130D] border-t border-[#4A3427] relative z-20 shadow-inner flex items-center justify-between px-6 text-[10px] font-mono text-[#B8A798]/70">
              <span>SOLID SMOKED WALNUT · SHELF BEARING MMXXVI</span>
              <span>{displayedVolumes.length} TITLES IN STACKS</span>
            </div>

          </div>
        )}

        {/* Hovered Book Quick Preview Bar for flat shelf */}
        {shelfView === 'flat' && hoveredBook && (
          <div className="mt-6 bg-[#FAF7F2] border border-[#DDD5C7] rounded-[2px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm animate-fadeIn">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-[#BC472A] font-semibold">
                <span>{hoveredBook.category}</span>
                <span aria-hidden="true">·</span>
                <span>{hoveredBook.volString}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#1E5638]">{hoveredBook.stockCount} IN STOCK</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1C1917]">
                {hoveredBook.title} <span className="font-serif italic text-sm font-normal text-[#6B6359]">by {hoveredBook.author}</span>
              </h3>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-base font-bold text-[#1C1917]">${hoveredBook.price.toFixed(2)}</span>
              {onOpenPreview && (
                <button
                  onClick={() => onOpenPreview(hoveredBook)}
                  className="bg-[#EDE7DA] hover:bg-[#E2D9C8] text-[#1C1917] border border-[#C5BBA9] px-3.5 py-2 rounded-[2px] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer select-none"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#BC472A]" />
                  <span>READ SAMPLE</span>
                </button>
              )}
              <button
                onClick={() => onSelectVolume(hoveredBook)}
                className="bg-[#1C1917] hover:bg-black text-[#FAF8F5] px-4 py-2 rounded-[2px] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer select-none"
              >
                <span>INSPECT BINDING</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
