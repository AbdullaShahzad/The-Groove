import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ShoppingBag, Sparkles, Box, BookOpen } from 'lucide-react';
import { Volume } from '../types';
import { ThreeBookCanvas } from './ThreeBookCanvas';
import { BookReaderPreviewModal } from './BookReaderPreviewModal';

interface BookDetailViewProps {
  volume: Volume;
  allVolumes: Volume[];
  onBack: () => void;
  onSelectVolume: (vol: Volume) => void;
  onAddToCart: (vol: Volume, quantity: number) => void;
}

export const BookDetailView: React.FC<BookDetailViewProps> = ({
  volume,
  allVolumes,
  onBack,
  onSelectVolume,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [viewMode, setViewMode] = useState<'classic' | 'three'>('classic');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Keyboard navigation [ESC] to return, left/right arrows for prev/next
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isPreviewOpen) return;
      if (e.key === 'Escape') {
        onBack();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [volume, allVolumes, isPreviewOpen]);

  const currentIndex = allVolumes.findIndex(v => v.id === volume.id);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + allVolumes.length) % allVolumes.length;
    onSelectVolume(allVolumes[prevIdx]);
    setQuantity(1);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % allVolumes.length;
    onSelectVolume(allVolumes[nextIdx]);
    setQuantity(1);
  };

  const handleAdd = () => {
    onAddToCart(volume, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="min-h-screen bg-[#F6F4EE] text-[#1C1917] flex flex-col transition-opacity duration-300">
      
      {/* Top Bar matching Screenshot 5 & 6 */}
      <div className="border-b border-[#E7E2D6] bg-[#F6F4EE]/90 backdrop-blur-xs sticky top-0 z-30">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6B6359] hover:text-[#1C1917] transition-colors cursor-pointer select-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO CANON [ESC]</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7A7165]">
              {volume.volString} · ARCHIVAL EDITION
            </span>
            <div className="flex items-center border border-[#DCD5C8] rounded-xs bg-white/70 overflow-hidden shadow-xs">
              <button
                onClick={handlePrev}
                className="p-1 hover:bg-[#EFECE5] text-[#5A5247] hover:text-[#1C1917] transition-colors cursor-pointer"
                aria-label="Previous volume"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-[#DCD5C8]" />
              <button
                onClick={handleNext}
                className="p-1 hover:bg-[#EFECE5] text-[#5A5247] hover:text-[#1C1917] transition-colors cursor-pointer"
                aria-label="Next volume"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div className="flex-1 max-w-[1520px] mx-auto px-4 sm:px-8 py-8 lg:py-14 w-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
          
          {/* Left Column: Metadata & Curatorial Narrative */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Category tag & Publication specs */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="bg-[#F7EBE8] text-[#BC472A] font-mono font-semibold px-2 py-0.5 tracking-wider uppercase rounded-xs">
                {volume.category}
              </span>
              <span className="text-[#7A7165] font-mono">
                PUB. {volume.publishedYear} · ISBN {volume.isbn}
              </span>
            </div>

            {/* Title & Author */}
            <div className="space-y-1.5">
              <h1 className="font-serif font-bold text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] tracking-tight leading-[1.06] break-words">
                {volume.title}
              </h1>
              <p className="font-serif italic text-lg xs:text-xl sm:text-2xl text-[#575047]">
                by {volume.author}
              </p>
            </div>

            {/* Price & Stock Badge */}
            <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 pt-1">
              <span className="font-mono text-2xl xs:text-3xl sm:text-4xl font-bold text-[#1C1917]">
                ${volume.price.toFixed(2)}
              </span>
              <span className="bg-[#E2EDE5] text-[#1E5638] text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold px-2 sm:px-2.5 py-0.5 rounded-xs uppercase">
                {volume.stockCount} VOLUMES PRESERVED IN STOCK
              </span>
            </div>

            {/* Curatorial Synopsis */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] uppercase tracking-widest text-[#7A7165] font-semibold">
                CURATORIAL SYNOPSIS
              </div>
              <p className="text-sm sm:text-base text-[#443E37] leading-relaxed font-normal">
                {volume.synopsis}
              </p>
            </div>

            {/* Material Binding Specifications Box */}
            <div className="bg-[#EFECE5] border border-[#DDD5C7] rounded-xs p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A05C3B] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MATERIAL BINDING SPECIFICATIONS</span>
              </div>
              <p className="text-xs text-[#524A40] leading-relaxed">
                {volume.bindingSpecs.clothDescription}
              </p>
              <div className="text-[11px] font-mono text-[#786F63] tracking-wide pt-1 border-t border-[#DDD5C7]/70">
                FORMAT: {volume.bindingSpecs.format} · {volume.bindingSpecs.paperStock}
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag & Open Preview */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center border border-[#CFC5B6] bg-white rounded-xs">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3.5 py-2 text-sm text-[#575047] hover:text-[#1C1917] hover:bg-[#FAF7F2] transition-colors cursor-pointer select-none"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-2 font-mono text-sm font-semibold text-[#1C1917] select-none min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3.5 py-2 text-sm text-[#575047] hover:text-[#1C1917] hover:bg-[#FAF7F2] transition-colors cursor-pointer select-none"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAdd}
                className="flex-1 min-w-[200px] bg-[#1C1917] hover:bg-black text-[#FAF8F5] px-6 py-3 rounded-xs font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer select-none"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedAnimation ? 'ADDED TO BAG ✓' : 'ADD TO ARCHIVAL BAG'}</span>
              </button>

              {/* OPEN ARCHIVAL PREVIEW BUTTON */}
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="w-full sm:w-auto bg-[#EDE7DA] hover:bg-[#E2D9C8] text-[#1C1917] border border-[#C5BBA9] px-5 py-3 rounded-xs font-mono font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer select-none shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-[#BC472A]" />
                <span>OPEN BOOK PREVIEW [PAGES 1–2]</span>
              </button>
            </div>

            {/* View Mode Toggle: Classic vs Three.js 3D */}
            <div className="pt-2 flex items-center gap-3 text-xs font-mono">
              <span className="text-[#8C827A] uppercase text-[10px]">INSPECTION MODE:</span>
              <button
                onClick={() => setViewMode('classic')}
                className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                  viewMode === 'classic'
                    ? 'bg-[#1C1917] text-white font-bold'
                    : 'text-[#6B6359] hover:bg-[#EAE5DA]'
                }`}
              >
                Archival Folio
              </button>
              <button
                onClick={() => setViewMode('three')}
                className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'three'
                    ? 'bg-[#1C1917] text-white font-bold'
                    : 'text-[#6B6359] hover:bg-[#EAE5DA]'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Three.js 3D Space</span>
              </button>
            </div>

          </div>

          {/* Right Column: Physical Clothbound Book Presentation */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
            {viewMode === 'three' ? (
              <ThreeBookCanvas volume={volume} />
            ) : (
              <div
                onClick={() => setIsPreviewOpen(true)}
                className="relative group select-none cursor-pointer max-w-full"
                title="Click to open book preview"
              >
                {/* Main Hardcover Book Body matching Screenshot 5 & 6 */}
                <div
                  className="relative w-[240px] xs:w-[280px] sm:w-[330px] md:w-[370px] h-[370px] xs:h-[430px] sm:h-[490px] md:h-[540px] rounded-r-xs rounded-l-[4px] p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-2"
                  style={{
                    backgroundColor: volume.spineColor,
                    boxShadow: '20px 24px 40px rgba(0, 0, 0, 0.42), inset 3px 0 6px rgba(255, 255, 255, 0.15)',
                  }}
                >
                  {/* Book Spine Shadow gradient on left */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none rounded-l-[4px]" />
                  <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none" />

                  {/* Stitched Gold Foil Border Frame */}
                  <div className="absolute inset-4 border border-[#D4AF37]/50 pointer-events-none rounded-xs">
                    <div className="absolute inset-1 border border-dashed border-[#D4AF37]/30 rounded-xs" />
                  </div>

                  {/* Top Center: Medallion with Star and Archival Volume */}
                  <div className="relative z-10 text-center pt-4 space-y-3">
                    <div className="w-9 h-9 mx-auto rounded-full border border-[#D4AF37] bg-black/25 flex items-center justify-center shadow-xs">
                      <span className="text-[#E2C26E] text-base leading-none">✦</span>
                    </div>
                    <p className="text-[10px] tracking-widest text-[#E2C26E] font-mono uppercase font-semibold">
                      THE GROOVE ARCHIVE · {volume.volString}
                    </p>
                  </div>

                  {/* Center Title and Author in Gold / Silver Foil */}
                  <div className="relative z-10 text-center py-6 space-y-4">
                    <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#FAF8F5] tracking-tight leading-tight uppercase px-4 drop-shadow-sm">
                      {volume.title}
                    </h2>
                    <div className="w-12 h-[1px] bg-[#D4AF37]/70 mx-auto" />
                    <p className="font-serif italic text-base sm:text-lg text-[#F1E9DB]">
                      {volume.author}
                    </p>
                  </div>

                  {/* Bottom Imprint: Octavo & Folio Press */}
                  <div className="relative z-10 text-center pb-2">
                    <p className="text-[9px] tracking-widest text-[#D4AF37]/80 font-mono uppercase font-semibold">
                      OCTAVO & FOLIO PRESS · CLICK TO OPEN PREVIEW
                    </p>
                  </div>

                  {/* Silk Bookmark Ribbon extending from bottom */}
                  <div
                    className="absolute bottom-[-22px] left-16 w-3.5 h-8 bg-[#9E1B26] shadow-md z-0 pointer-events-none"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
                  />
                </div>

                {/* Stacked Cream Book Page Edge on the right */}
                <div className="absolute right-[-10px] top-3 bottom-3 w-[12px] bg-gradient-to-r from-[#D7CCA8] via-[#F4EBD4] to-[#EAE0CA] rounded-r-xs shadow-md border-r border-[#C4B793] pointer-events-none">
                  <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(0deg,#7A6A50,#7A6A50_1px,transparent_1px,transparent_3px)]" />
                </div>

                {/* Surface Desk Shadow */}
                <div className="absolute -bottom-5 inset-x-4 h-6 bg-black/35 blur-md rounded-full pointer-events-none" />
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 3D Interactive Opening Book Preview Modal */}
      <BookReaderPreviewModal
        volume={volume}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onAddToCart={onAddToCart}
      />

    </div>
  );
};
