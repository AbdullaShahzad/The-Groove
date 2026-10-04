import React, { useState } from 'react';
import { Stamp, Check, Sparkles, Download, Layers } from 'lucide-react';

interface CrestOption {
  id: string;
  name: string;
  symbol: string;
  glyph: string;
}

const CRESTS: CrestOption[] = [
  { id: 'owl', name: 'Owl of Minerva', symbol: 'OWL', glyph: '🦉' },
  { id: 'quill', name: 'Folio & Quill', symbol: 'QUILL', glyph: '✒' },
  { id: 'lion', name: 'Oxford Lion', symbol: 'LION', glyph: '🦁' },
  { id: 'oak', name: 'Golden Oak', symbol: 'OAK', glyph: '🌿' },
  { id: 'raven', name: 'Tower Raven', symbol: 'RAVEN', glyph: '🦅' },
];

const FONTS = [
  { id: 'cormorant', name: 'Classical Serif', fontFamily: "'Cormorant Garamond', Georgia, serif" },
  { id: 'playfair', name: 'Editorial Antiqua', fontFamily: "'Playfair Display', Georgia, serif" },
  { id: 'sans', name: 'Modern Atelier', fontFamily: "'Plus Jakarta Sans', sans-serif" },
  { id: 'mono', name: 'Archival Typeset', fontFamily: "'JetBrains Mono', monospace" },
];

const INK_COLORS = [
  { id: 'gold', name: '24kt Antique Gold', hex: '#A88A45', borderHex: '#A88A45' },
  { id: 'crimson', name: 'Archival Crimson', hex: '#7A1018', borderHex: '#7A1018' },
  { id: 'forest', name: 'Deep Forest', hex: '#124C38', borderHex: '#124C38' },
  { id: 'navy', name: 'Imperial Navy', hex: '#172C52', borderHex: '#172C52' },
  { id: 'black', name: 'Carbon Black', hex: '#16120F', borderHex: '#16120F' },
];

const ALIGNMENTS = [
  { id: 'center', label: 'Centered' },
  { id: 'formal', label: 'Formal Symmetrical' },
  { id: 'left', label: 'Left Weighted' },
];

export const ExLibrisStudioSection: React.FC = () => {
  const [collectorName, setCollectorName] = useState('Julian Vance');
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [selectedCrest, setSelectedCrest] = useState(CRESTS[0]);
  const [selectedColor, setSelectedColor] = useState(INK_COLORS[0]);
  const [selectedAlign, setSelectedAlign] = useState(ALIGNMENTS[0]);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerated(true);
    setTimeout(() => setIsGenerated(false), 2200);
  };

  return (
    <section className="py-20 sm:py-28 border-t border-[#E8E5DF] bg-[#FAF8F5] relative select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-[#E8E5DF] gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] font-mono tracking-[0.24em] uppercase font-semibold text-[#16120F]">
              <Stamp className="w-3.5 h-3.5 text-[#16120F]" />
              <span>SECTION 08 / PERSONALIZATION ATELIER</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#16120F] tracking-tight uppercase mt-1">
              CUSTOM EX-LIBRIS BOOKPLATE ATELIER
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-[#6B6359] mt-1.5">
              Personalized archival bookplates printed on acid-free Swedish rag paper.
            </p>
          </div>

          <div className="text-[11px] font-mono text-[#6B6359] uppercase tracking-wider">
            HAND-INSCRIBED FOR THE PRIVATE REPOSITORY
          </div>
        </div>

        {/* 
          STRICT TWO-COLUMN STRUCTURE
          Desktop: 2 Equal Columns with matching top/bottom vertical alignment
          Tablet: 2 Columns with tightened spacing
          Mobile: Stacked cleanly (Editor -> Live Preview -> Generate)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT COLUMN: THE EDITOR */}
          <div className="bg-white border border-[#E8E5DF] rounded-[3px] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-5">
              
              <div className="border-b border-[#E8E5DF] pb-3">
                <h3 className="font-serif font-bold text-lg text-[#16120F] uppercase tracking-wide">
                  BOOKPLATE SPECIFICATIONS
                </h3>
                <p className="text-xs text-[#6B6359] mt-0.5">
                  Configure your personal Ex-Libris insignia. Changes reflect immediately.
                </p>
              </div>

              {/* 1. Collector Name */}
              <div>
                <label className="block text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#8C857B] mb-1.5 font-semibold">
                  1. BIBLIOPHILE / COLLECTOR NAME:
                </label>
                <input
                  type="text"
                  value={collectorName}
                  onChange={(e) => setCollectorName(e.target.value)}
                  placeholder="e.g. Julian Vance"
                  maxLength={36}
                  className="w-full bg-[#F8F7F4] border border-[#E8E5DF] focus:border-[#16120F] text-[#16120F] px-3.5 py-2.5 rounded-[2px] font-mono text-xs focus:bg-white focus:outline-none transition-all"
                />
              </div>

              {/* 2. Typographic Font */}
              <div>
                <label className="block text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#8C857B] mb-1.5 font-semibold">
                  2. EDITORIAL TYPEFACE:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {FONTS.map((font) => (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => setSelectedFont(font)}
                      className={`px-3 py-2 text-xs text-left rounded-[2px] border transition-all cursor-pointer truncate ${
                        selectedFont.id === font.id
                          ? 'border-[#16120F] bg-[#16120F] text-white font-bold'
                          : 'border-[#E8E5DF] bg-[#F8F7F4] text-[#6B6359] hover:bg-white hover:text-[#16120F]'
                      }`}
                    >
                      <span style={{ fontFamily: font.fontFamily }}>{font.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Heraldic Emblem Symbol */}
              <div>
                <label className="block text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#8C857B] mb-1.5 font-semibold">
                  3. HERALDIC CREST EMBLEM:
                </label>
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {CRESTS.map((crest) => (
                    <button
                      key={crest.id}
                      type="button"
                      onClick={() => setSelectedCrest(crest)}
                      className={`p-2 rounded-[2px] border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        selectedCrest.id === crest.id
                          ? 'border-[#16120F] bg-[#16120F] text-white font-bold'
                          : 'border-[#E8E5DF] bg-[#F8F7F4] text-[#6B6359] hover:bg-white hover:text-[#16120F]'
                      }`}
                    >
                      <span className="text-sm sm:text-base leading-none mb-1">{crest.glyph}</span>
                      <span className="text-[8.5px] font-mono uppercase truncate w-full">{crest.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Foil / Ink Palette */}
              <div>
                <label className="block text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#8C857B] mb-1.5 font-semibold">
                  4. EMBOSSED INK FOIL COLOR:
                </label>
                <div className="flex flex-wrap gap-2">
                  {INK_COLORS.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-[10.5px] font-mono rounded-[2px] border transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedColor.id === color.id
                          ? 'border-[#16120F] bg-white font-bold text-[#16120F] shadow-xs'
                          : 'border-[#E8E5DF] bg-[#F8F7F4] text-[#6B6359] hover:bg-white'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color.hex }} />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Alignment */}
              <div>
                <label className="block text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#8C857B] mb-1.5 font-semibold">
                  5. COMPOSITION ALIGNMENT:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {ALIGNMENTS.map((align) => (
                    <button
                      key={align.id}
                      type="button"
                      onClick={() => setSelectedAlign(align)}
                      className={`py-2 px-2 text-[10.5px] font-mono text-center rounded-[2px] border transition-all cursor-pointer ${
                        selectedAlign.id === align.id
                          ? 'border-[#16120F] bg-[#16120F] text-white font-bold'
                          : 'border-[#E8E5DF] bg-[#F8F7F4] text-[#6B6359] hover:bg-white hover:text-[#16120F]'
                      }`}
                    >
                      {align.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Primary Action Button */}
            <div className="pt-6 mt-6 border-t border-[#E8E5DF]">
              <button
                type="button"
                onClick={handleGenerate}
                className="w-full bg-[#16120F] hover:bg-black text-white py-3.5 rounded-[2px] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:scale-[1.01] active:scale-[0.99]"
              >
                {isGenerated ? (
                  <>
                    <Check className="w-4 h-4 text-[#A88A45]" />
                    <span>BOOKPLATE TEST-EMBOSSED &amp; SAVED</span>
                  </>
                ) : (
                  <>
                    <Stamp className="w-4 h-4 text-[#A88A45]" />
                    <span>GENERATE &amp; EMBOSS BOOKPLATE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: LIVE PREVIEW (MATCHING VERTICAL ALIGNMENT) */}
          <div className="bg-white border border-[#E8E5DF] rounded-[3px] p-6 sm:p-8 flex flex-col justify-between items-center shadow-xs">
            
            {/* Header Status */}
            <div className="w-full border-b border-[#E8E5DF] pb-3 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C857B] font-semibold">
                ARCHIVAL ENDPAPER PREVIEW
              </span>
              <span className="text-[9.5px] font-mono uppercase text-[#A88A45] font-bold">
                100% UNBLEACHED RAG
              </span>
            </div>

            {/* 
              VISUALLY CENTERED BOOKPLATE ARTIFACT
              Guaranteed safe padding, never touches or overlaps the frame
            */}
            <div className="my-auto py-6 sm:py-8 w-full flex items-center justify-center">
              <div
                className={`relative w-full max-w-[280px] sm:max-w-[310px] h-[370px] sm:h-[400px] bg-[#FAF8F5] rounded-[2px] p-6 flex flex-col justify-between shadow-[0_10px_28px_rgba(0,0,0,0.06)] border transition-all duration-300 ${
                  isGenerated ? 'scale-102 ring-2 ring-[#A88A45]/40' : 'scale-100'
                }`}
                style={{
                  borderColor: selectedColor.borderHex,
                }}
              >
                {/* Fine Inner Decorative Border */}
                <div
                  className="absolute inset-2 border pointer-events-none opacity-40"
                  style={{ borderColor: selectedColor.hex }}
                />

                {/* Corner Decorative Marks */}
                <div className="absolute top-3 left-3 text-[10px]" style={{ color: selectedColor.hex }}>✦</div>
                <div className="absolute top-3 right-3 text-[10px]" style={{ color: selectedColor.hex }}>✦</div>
                <div className="absolute bottom-3 left-3 text-[10px]" style={{ color: selectedColor.hex }}>✦</div>
                <div className="absolute bottom-3 right-3 text-[10px]" style={{ color: selectedColor.hex }}>✦</div>

                {/* Top Banner */}
                <div className={`space-y-0.5 pt-2 ${selectedAlign.id === 'left' ? 'text-left pl-2' : 'text-center'}`}>
                  <div
                    className="text-[9.5px] font-mono tracking-[0.28em] uppercase font-bold"
                    style={{ color: selectedColor.hex }}
                  >
                    EX · LIBRIS
                  </div>
                  <div className="text-[7.5px] font-mono tracking-widest text-[#8C857B] uppercase">
                    CANONICAL ARCHIVES MMXXVI
                  </div>
                </div>

                {/* Center Crest Emblem */}
                <div className="my-auto py-3 flex flex-col items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full border flex items-center justify-center text-xl shadow-xs mb-1.5"
                    style={{
                      borderColor: selectedColor.hex,
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <span>{selectedCrest.glyph}</span>
                  </div>
                  <div
                    className="text-[8px] font-mono uppercase tracking-[0.16em] font-semibold"
                    style={{ color: selectedColor.hex }}
                  >
                    {selectedCrest.name}
                  </div>
                </div>

                {/* Collector Name Inscription */}
                <div className={`space-y-1 pb-1 ${selectedAlign.id === 'left' ? 'text-left pl-2' : 'text-center'}`}>
                  <div className="text-[7.5px] font-mono uppercase tracking-widest text-[#8C857B]">
                    FROM THE PRIVATE LIBRARY OF
                  </div>
                  <h4
                    className="font-bold text-lg sm:text-xl uppercase tracking-tight leading-tight break-words px-1"
                    style={{
                      fontFamily: selectedFont.fontFamily,
                      color: selectedColor.hex,
                    }}
                  >
                    {collectorName.trim() || 'JULIAN VANCE'}
                  </h4>
                </div>

                {/* Latin Motto / Canonical Scriptorium Seal */}
                <div
                  className="pt-2 border-t text-center space-y-0.5"
                  style={{ borderColor: `${selectedColor.hex}30` }}
                >
                  <p className="font-serif italic text-[10px] text-[#524B43] leading-snug">
                    &ldquo;Vita sine libris mors est&rdquo;
                  </p>
                  <div className="text-[6.5px] font-mono uppercase tracking-widest text-[#8C857B]">
                    OCTAVO &amp; FOLIO PRESS · STOCKHOLM
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Proofing Footnote */}
            <div className="w-full border-t border-[#E8E5DF] pt-3 flex items-center justify-between text-[9.5px] font-mono text-[#8C857B]">
              <span>DIMENSIONS: 75 × 105 MM</span>
              <span>ADHESIVE: WHEAT STARCH ARCHIVAL PASTE</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
