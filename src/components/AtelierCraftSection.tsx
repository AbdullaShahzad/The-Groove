import React, { useState } from 'react';
import { Sparkles, Compass, Feather, ShieldCheck } from 'lucide-react';

interface CraftSpecimen {
  id: string;
  number: string;
  name: string;
  origin: string;
  specification: string;
  description: string;
  tactileNote: string;
  colorSwatch: string;
  foilTone: string;
  macroTexture: string;
}

const SPECIMENS: CraftSpecimen[] = [
  {
    id: 'gold_foil',
    number: 'SPECIMEN 01',
    name: '24kt Heated Brass Blind-Embossing',
    origin: 'Pforzheim, Germany · Goldsmith Guild Mill',
    specification: 'Genuine 24kt gold leaf · 2.5-tonne hydraulic strike at 115°C',
    description: 'Each volume title and medallion is stamped using hand-cut magnesium and brass matrices. Under hydraulic pressure, the heated gold molecularly fuses into the deep valleys of the bookcloth weave, guaranteeing zero flaking over centuries.',
    tactileNote: 'Pronounced relief indent with deep specular brilliance under ambient candlelight.',
    colorSwatch: '#1C1917',
    foilTone: '#D4AF37',
    macroTexture: 'bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:8px_8px]',
  },
  {
    id: 'deckle_paper',
    number: 'SPECIMEN 02',
    name: 'Swedish Munken Pure Deckle-Edge Stock',
    origin: 'Munkedal, Sweden · Arctic Paper Mill est. 1871',
    specification: '120gsm unbleached rag stock · Neutral pH 7.8 · FSC certified',
    description: 'Milled with pure fjord waters without optical brightening agents. The rough, un-trimmed deckle fore-edge evokes the hand-torn quires of Renaissance illuminated manuscripts, providing an organic tactile rhythm to every turned page.',
    tactileNote: 'Velvety tooth with low glare, optimized for non-fatiguing reading under incandescent warmth.',
    colorSwatch: '#FAF7F0',
    foilTone: '#8C827A',
    macroTexture: 'bg-[radial-gradient(#C5BBAA_1px,transparent_1px)] [background-size:6px_6px]',
  },
  {
    id: 'bookcloth',
    number: 'SPECIMEN 03',
    name: 'Imperial Japanese Buckram Bookcloth',
    origin: 'Osaka, Japan · Kyodo Cloth Works',
    specification: 'Tight 100% natural cotton warp · Acid-free sizing & starch seal',
    description: 'Woven on vintage shuttle looms from long-staple cotton threads. The textile is treated with natural wheat starch sizing to protect against moisture and oils while retaining the natural grain of woven cotton.',
    tactileNote: 'Firm textile grip with subtle slub variations that patina gently across generations.',
    colorSwatch: '#2E4A3D',
    foilTone: '#E2C26E',
    macroTexture: 'bg-[radial-gradient(#3E6352_1px,transparent_1px)] [background-size:4px_4px]',
  },
  {
    id: 'smyth_sewn',
    number: 'SPECIMEN 04',
    name: 'Smyth-Sewn Sectional Flax Signatures',
    origin: 'Folio Bindery · Florence, Italy',
    specification: '16-page signature collations · Unbleached Belgian linen thread',
    description: 'Unlike modern glued paperbacks that snap along the spine, each folio is folded into individual 16-page signatures and sewn through the spine fold with unbroken linen thread. The book opens completely flat to 180° with zero gutter tension.',
    tactileNote: 'Effortless lay-flat opening with rhythmic paper flexing and musical spine hinge flex.',
    colorSwatch: '#1E1813',
    foilTone: '#D4AF37',
    macroTexture: 'bg-[radial-gradient(#5C4535_1px,transparent_1px)] [background-size:6px_6px]',
  },
];

export const AtelierCraftSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState(SPECIMENS[0].id);
  const activeSpecimen = SPECIMENS.find((s) => s.id === selectedId) || SPECIMENS[0];

  return (
    <section className="py-16 sm:py-24 border-t border-[#E7E2D6] bg-[#F7F5EE] relative select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#DDD5C7] gap-3">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#BC472A] uppercase font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>04 / CONSERVATOR&apos;S BENCH</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1C1917] tracking-tight uppercase mt-1">
              THE ANATOMY OF 300-YEAR PRESERVATION
            </h2>
          </div>
          <div className="text-xs font-mono text-[#7A7165]">
            OCTAVO &amp; FOLIO PRESS · ARCHIVAL MATERIAL STANDARDS
          </div>
        </div>

        {/* 2-Column Specimen Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Specimen Selection Cards */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#7A7165] mb-2 font-semibold">
              SELECT MATERIAL SPECIMEN TO INSPECT
            </div>

            {SPECIMENS.map((specimen) => {
              const isSelected = specimen.id === selectedId;
              return (
                <div
                  key={specimen.id}
                  onClick={() => setSelectedId(specimen.id)}
                  className={`p-4 rounded-[3px] border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-[#BC472A] shadow-md -translate-x-1'
                      : 'bg-[#EFECE5]/80 hover:bg-white border-[#DDD5C7] text-[#473F35]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-[2px] border border-black/10 flex items-center justify-center shrink-0 shadow-inner"
                      style={{ backgroundColor: specimen.colorSwatch }}
                    >
                      <span className="text-[11px]" style={{ color: specimen.foilTone }}>✦</span>
                    </div>
                    <div>
                      <div className="text-[9.5px] font-mono tracking-widest uppercase text-[#BC472A] font-semibold">
                        {specimen.number}
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#1C1917] leading-tight">
                        {specimen.name}
                      </h4>
                      <p className="text-[11px] font-mono text-[#7A7165] mt-0.5">
                        {specimen.origin.split('·')[0]}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono transition-transform ${
                      isSelected ? 'text-[#BC472A] translate-x-1 font-bold' : 'text-[#8C827A]'
                    }`}
                  >
                    →
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Close-Up Material Specimen Viewer */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#DDD5C7] rounded-[4px] p-6 sm:p-8 shadow-xl relative overflow-hidden">
              
              {/* Top Archival Tag */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#EAE4D8] pb-4 mb-6 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#BC472A]" />
                  <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#1C1917]">
                    {activeSpecimen.number}: {activeSpecimen.name}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#7A7165] uppercase">
                  {activeSpecimen.origin}
                </span>
              </div>

              {/* Specimen Visual Texture Preview Card */}
              <div
                className={`relative h-44 sm:h-52 rounded-[3px] border border-[#DDD5C7] p-6 flex flex-col justify-between overflow-hidden shadow-inner mb-6 ${activeSpecimen.macroTexture}`}
                style={{ backgroundColor: activeSpecimen.colorSwatch }}
              >
                {/* Gold Foil Watermark Seal */}
                <div className="absolute right-4 bottom-4 opacity-30 pointer-events-none">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#D4AF37] flex items-center justify-center">
                    <span className="font-serif text-3xl text-[#E2C26E]">✦</span>
                  </div>
                </div>

                <div className="relative z-10">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-black/40 text-[#E2C26E] border border-[#D4AF37]/40">
                    MACRO SPECIMEN ANALYSIS
                  </span>
                </div>

                <div className="relative z-10 space-y-1">
                  <p className="font-serif italic text-sm text-[#F7F4EE] max-w-md drop-shadow-sm">
                    &ldquo;{activeSpecimen.tactileNote}&rdquo;
                  </p>
                  <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-semibold">
                    {activeSpecimen.specification}
                  </p>
                </div>
              </div>

              {/* Curatorial Commentary */}
              <div className="space-y-4 text-xs font-normal text-[#4A4237] leading-relaxed">
                <div>
                  <h5 className="font-mono text-[10.5px] uppercase tracking-wider font-bold text-[#1C1917] mb-1">
                    CONSERVATORIAL PROCESS &amp; LONGEVITY
                  </h5>
                  <p>{activeSpecimen.description}</p>
                </div>

                <div className="bg-[#FAF7F0] p-3 rounded-[2px] border border-[#DDD5C7] flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-2 text-[#2E4A3D] font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>GUARANTEED 300-YEAR ACID-FREE ARCHIVAL WARRANTY</span>
                  </div>
                  <span className="text-[#8C827A] hidden sm:inline">ISO 9706 COMPLIANT</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
