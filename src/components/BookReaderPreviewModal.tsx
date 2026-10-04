import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag, BookOpen, Lock } from 'lucide-react';
import { Volume } from '../types';

interface BookReaderPreviewModalProps {
  volume: Volume | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (vol: Volume, qty: number) => void;
  onInspectFullVolume?: (vol: Volume) => void;
}

export const BookReaderPreviewModal: React.FC<BookReaderPreviewModalProps> = ({
  volume,
  isOpen,
  onClose,
  onAddToCart,
  onInspectFullVolume,
}) => {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [isBookOpened, setIsBookOpened] = useState(false);
  const [isPageFlipping, setIsPageFlipping] = useState(false);

  useEffect(() => {
    if (isOpen && volume) {
      setCurrentPage(1);
      // Give realistic physical opening delay
      const timer = setTimeout(() => {
        setIsBookOpened(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setIsBookOpened(false);
    }
  }, [isOpen, volume]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight' && currentPage === 1) {
        handlePageTurn(2);
      } else if (e.key === 'ArrowLeft' && currentPage === 2) {
        handlePageTurn(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage]);

  if (!isOpen || !volume) return null;

  const handleClose = () => {
    setIsBookOpened(false);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handlePageTurn = (targetPage: 1 | 2) => {
    if (currentPage === targetPage || isPageFlipping) return;
    setIsPageFlipping(true);
    setTimeout(() => {
      setCurrentPage(targetPage);
      setIsPageFlipping(false);
    }, 280);
  };

  const sample = volume.samplePages || {
    page1: {
      header: `${volume.title} · ARCHIVAL EDITION`,
      subHeader: 'PRINTED ON SWEDISH WOVE STOCK',
      epigraph: '“A great book should leave you with many experiences, and slightly exhausted at the end.”',
      bodyText: volume.synopsis,
    },
    page2: {
      chapterTitle: 'CHAPTER I',
      dropCap: volume.title.charAt(0) || 'I',
      bodyParagraphs: [
        volume.synopsis,
        `Preserved under catalogue reference ${volume.isbn}. Bound in ${volume.bindingSpecs.clothDescription}.`
      ],
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 select-none">
      
      {/* Dark Ambient Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-backdrop-in"
      />

      {/* Main 3D Book Stage */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
        
        {/* Top Floating Control Bar */}
        <div className="w-full flex items-center justify-between text-white/80 font-mono text-xs mb-4 px-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#BC472A] text-white px-2 py-0.5 rounded-[2px] font-bold text-[10px] uppercase tracking-wider">
              {volume.volString} SAMPLE
            </span>
            <span className="text-[#DDD5C7] hidden sm:inline">
              {volume.title} · EXCERPT PREVIEW
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-[2px] border border-white/10 text-[11px]">
              <Lock className="w-3 h-3 text-[#E2C26E]" />
              <span>PAGES 1–2 OF 2</span>
            </div>
            <button
              onClick={handleClose}
              className="text-[#DDD5C7] hover:text-white p-1 transition-colors cursor-pointer select-none"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 
          PHYSICAL BOOK OPENING CONTAINER:
          3D Perspective with realistic page curl, spine gutter, and deckle paper edges
        */}
        <div
          className="relative w-full max-w-[840px] max-h-[85vh] overflow-y-auto rounded-[4px] shadow-2xl transition-all duration-700 ease-out scrollbar-none"
          style={{
            perspective: '1600px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Outer Cover Wrapper */}
          <div
            className={`w-full min-h-[380px] sm:min-h-[480px] rounded-[4px] p-2 sm:p-4 flex transition-all duration-700 ease-out shadow-2xl relative ${
              isBookOpened ? 'bg-[#221A15]' : 'bg-transparent'
            }`}
            style={{
              boxShadow: '0 25px 60px rgba(0,0,0,0.65), 0 0 20px rgba(0,0,0,0.4)',
            }}
          >
            {/* If Closed: Realistic Closed Hardcover */}
            {!isBookOpened ? (
              <div
                className="w-[240px] xs:w-[280px] sm:w-[340px] h-[380px] xs:h-[430px] sm:h-[480px] mx-auto rounded-r-xs rounded-l-[4px] p-5 sm:p-6 flex flex-col justify-between shadow-2xl transition-transform duration-500 scale-95"
                style={{ backgroundColor: volume.spineColor }}
              >
                <div className="border border-[#D4AF37]/50 p-4 h-full flex flex-col justify-between text-center">
                  <div className="text-[10px] font-mono text-[#E2C26E] uppercase tracking-widest pt-2">
                    ✦ {volume.volString} ✦
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-white uppercase tracking-tight">
                      {volume.title}
                    </h3>
                    <p className="font-serif italic text-xs sm:text-sm text-[#F1E9DB] mt-2">
                      by {volume.author}
                    </p>
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider">
                    OCTAVO &amp; FOLIO PRESS
                  </div>
                </div>
              </div>
            ) : (
              /* If Opened: Realistic Dual-Page Archival Paper Spread */
              <div className="w-full flex flex-col md:flex-row rounded-[3px] overflow-hidden shadow-inner border border-[#D5CDC0] bg-[#FAF7F0] relative">
                
                {/* Center Spine Gutter Shadow (giving realistic book fold) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-12 -ml-6 bg-gradient-to-r from-transparent via-black/20 to-transparent pointer-events-none z-20" />
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -ml-[0.5px] bg-[#C5BBAA] z-20" />

                {/* LEFT PAGE (PAGE 1) */}
                <div
                  className={`w-full md:w-1/2 p-4 sm:p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5DECF] transition-opacity duration-300 ${
                    currentPage === 1 || window.innerWidth >= 768 ? 'block' : 'hidden'
                  } ${isPageFlipping ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'}`}
                >
                  <div className="space-y-4">
                    {/* Running Top Header */}
                    <div className="border-b border-[#DDD5C7] pb-2 text-[10px] font-mono text-[#8C827A] uppercase tracking-widest flex justify-between items-center">
                      <span>PAGE 1</span>
                      <span>{sample.page1.header}</span>
                    </div>

                    <div className="pt-2 space-y-3">
                      <div className="text-center py-2">
                        <div className="w-6 h-6 mx-auto rounded-full border border-[#BC472A]/40 flex items-center justify-center text-[#BC472A] text-xs">
                          ✦
                        </div>
                        <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1917] tracking-tight uppercase mt-2">
                          {volume.title}
                        </h4>
                        <p className="font-serif italic text-sm text-[#6B6359] mt-0.5">
                          {volume.author}
                        </p>
                      </div>

                      {/* Epigraph */}
                      {sample.page1.epigraph && (
                        <blockquote className="border-l-2 border-[#BC472A]/50 pl-3 py-1 my-3 text-xs font-serif italic text-[#4A4237] leading-relaxed">
                          {sample.page1.epigraph}
                        </blockquote>
                      )}

                      {/* Archival Body Note */}
                      <p className="text-xs font-serif text-[#524A40] leading-relaxed pt-2">
                        {sample.page1.bodyText}
                      </p>
                    </div>
                  </div>

                  {/* Page Footer */}
                  <div className="pt-4 border-t border-[#E5DECF] flex justify-between items-center text-[10px] font-mono text-[#8C827A]">
                    <span>THE GROOVE ARCHIVE</span>
                    <span className="font-bold text-[#1C1917]">1</span>
                  </div>
                </div>

                {/* RIGHT PAGE (PAGE 2) */}
                <div
                  className={`w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between transition-opacity duration-300 ${
                    currentPage === 2 || window.innerWidth >= 768 ? 'block' : 'hidden'
                  } ${isPageFlipping ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'}`}
                >
                  <div className="space-y-4">
                    {/* Running Top Header */}
                    <div className="border-b border-[#DDD5C7] pb-2 text-[10px] font-mono text-[#8C827A] uppercase tracking-widest flex justify-between items-center">
                      <span>{sample.page2.chapterTitle}</span>
                      <span>PAGE 2</span>
                    </div>

                    <div className="pt-2 space-y-3 font-serif">
                      <h4 className="text-center font-bold text-base sm:text-lg tracking-widest text-[#1C1917] uppercase mb-4">
                        {sample.page2.chapterTitle}
                      </h4>

                      {/* Drop Cap First Paragraph */}
                      {sample.page2.bodyParagraphs.map((para, idx) => {
                        if (idx === 0) {
                          return (
                            <p key={idx} className="text-xs sm:text-[13px] text-[#2C2621] leading-relaxed font-normal">
                              <span className="float-left text-4xl sm:text-5xl font-serif font-bold text-[#BC472A] leading-none pr-2 pt-1">
                                {sample.page2.dropCap}
                              </span>
                              {para}
                            </p>
                          );
                        }
                        return (
                          <p key={idx} className="text-xs sm:text-[13px] text-[#2C2621] leading-relaxed font-normal indent-4">
                            {para}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  {/* Page Footer */}
                  <div className="pt-4 border-t border-[#E5DECF] flex justify-between items-center text-[10px] font-mono text-[#8C827A]">
                    <span className="font-bold text-[#1C1917]">2</span>
                    <span className="text-[#BC472A] font-semibold uppercase">EXCERPT RESTRICTED</span>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions & Page Flip Controls */}
        <div className="mt-4 w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/60 backdrop-blur-xs px-5 py-3 rounded-[3px] border border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageTurn(1)}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-[2px] transition-colors ${
                currentPage === 1 ? 'opacity-40 cursor-not-allowed text-white/50' : 'hover:bg-white/20 text-white cursor-pointer'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[#DDD5C7] text-[11px]">
              Page {currentPage} of 2
            </span>
            <button
              onClick={() => handlePageTurn(2)}
              disabled={currentPage === 2}
              className={`p-1.5 rounded-[2px] transition-colors ${
                currentPage === 2 ? 'opacity-40 cursor-not-allowed text-white/50' : 'hover:bg-white/20 text-white cursor-pointer'
              }`}
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] text-[#D4AF37]/90 text-center">
            ✦ Complete text preserved in physical clothbound edition
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onInspectFullVolume && (
              <button
                onClick={() => {
                  onInspectFullVolume(volume);
                  handleClose();
                }}
                className="text-[#DDD5C7] hover:text-white border border-white/20 px-3 py-1.5 rounded-[2px] transition-colors cursor-pointer select-none text-[11px]"
              >
                INSPECT DETAILS &amp; 3D MODEL
              </button>
            )}
            <button
              onClick={handleClose}
              className="text-[#DDD5C7] hover:text-white px-2.5 py-1.5 rounded-[2px] transition-colors cursor-pointer select-none text-[11px]"
            >
              CLOSE [ESC]
            </button>
            <button
              onClick={() => {
                onAddToCart(volume, 1);
                handleClose();
              }}
              className="bg-[#FAF8F5] hover:bg-white text-[#1C1917] font-bold px-4 py-1.5 rounded-[2px] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer select-none text-[11px]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>ACQUIRE EDITION · ${volume.price.toFixed(2)}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
