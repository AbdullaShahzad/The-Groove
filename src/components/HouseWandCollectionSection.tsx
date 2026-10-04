import React, { useState, useEffect } from 'react';
import { HogwartsHouse, Volume } from '../types';
import { HOGWARTS_HOUSES } from '../data/houses';
import { CanonicalWandSVG } from './CanonicalWandSVG';
import { CANONICAL_WANDS_CATALOG } from './HouseArsenalSection';
import { Check, X } from 'lucide-react';

interface HouseWandCollectionSectionProps {
  house: HogwartsHouse;
  userPoints: number;
  onAddWandToCart: (wandVolume: Volume, pointCost: number) => void;
}

export const HouseWandCollectionSection: React.FC<HouseWandCollectionSectionProps> = ({
  house,
  userPoints,
  onAddWandToCart,
}) => {
  const houseData = HOGWARTS_HOUSES[house];

  // Default wand influenced by house
  const getDefaultWandId = (h: HogwartsHouse): string => {
    switch (h) {
      case 'gryffindor':
        return 'wand_dumbledore'; // The Elder Wand
      case 'slytherin':
        return 'wand_voldemort'; // Bone & Yew
      case 'ravenclaw':
        return 'wand_luna'; // Tulipwood
      case 'hufflepuff':
        return 'wand_ron'; // Willow & Unicorn
      default:
        return 'wand_dumbledore';
    }
  };

  const [activeWandId, setActiveWandId] = useState<string>(() => getDefaultWandId(house));
  const [selectedWandId, setSelectedWandId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSelectedToast, setShowSelectedToast] = useState(false);

  // Update default selection when house changes
  useEffect(() => {
    setActiveWandId(getDefaultWandId(house));
  }, [house]);

  const activeWand = CANONICAL_WANDS_CATALOG.find((w) => w.id === activeWandId) || CANONICAL_WANDS_CATALOG[0];
  const isSelected = selectedWandId === activeWand.id;

  const handleChooseWand = () => {
    setSelectedWandId(activeWand.id);
    setIsDetailOpen(false);
    setShowSelectedToast(true);

    const wandVolume: Volume = {
      id: activeWand.id,
      volNum: 99,
      volString: 'ARSENAL',
      title: `${activeWand.name} (${activeWand.wielder})`,
      author: `Ollivanders Archive · ${activeWand.wood}`,
      price: activeWand.moneyPriceUsd,
      category: 'CLASSICS',
      spineColor: '#16120F',
      accentColor: activeWand.accentColor || houseData.colors.primary,
      foilColor: houseData.colors.secondary,
      publishedYear: 2026,
      isbn: `WND-${activeWand.pointCost}-${Math.round(activeWand.moneyPriceUsd)}`,
      stockCount: 5,
      synopsis: `${activeWand.description} (${activeWand.length}, ${activeWand.core}). Chosen artifact for ${activeWand.wielder}.`,
      bindingSpecs: {
        clothDescription: `Hand-turned ${activeWand.wood} artifact`,
        format: `Wand ${activeWand.length}`,
        paperStock: 'Ollivanders Certificate of Authenticity',
      },
      itemType: 'wand',
      pointCost: activeWand.pointCost,
      currencyPrice: `$${activeWand.moneyPriceUsd.toFixed(2)}`,
      woodType: activeWand.wood,
      coreType: activeWand.core,
    };

    onAddWandToCart(wandVolume, activeWand.pointCost);

    setTimeout(() => {
      setShowSelectedToast(false);
    }, 2800);
  };

  return (
    <section className="py-16 sm:py-24 border-t border-[#E8E5DF] bg-white relative select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Pure Editorial Typographic Identity */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-5 border-b border-[#E8E5DF] gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] font-mono tracking-[0.24em] uppercase font-semibold text-[#16120F]">
              <span style={{ color: houseData.colors.primary }}>✦</span>
              <span>SECTION 10 / CANONICAL INSTRUMENTS</span>
            </div>
            <h2 className="font-serif font-bold text-2xl xs:text-3xl sm:text-5xl text-[#16120F] tracking-tight uppercase mt-1">
              THE HOUSE WAND COLLECTION
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-[#6B6359] mt-1">
              Pure artifact exhibition. Click the wand to inspect and acquire.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-[#E8E5DF] px-3.5 py-1.5 rounded-[2px] text-xs font-mono self-start md:self-auto shadow-xs">
            <span className="text-[#8C857B] uppercase text-[10.5px]">BALANCE:</span>
            <span className="font-bold text-[#16120F]">{userPoints} HOUSE POINTS</span>
          </div>
        </div>

        {/* 
          PURE ARTIFACT DISPLAY:
          Only the wand itself, with zero distracting mock-furniture, zero brass stanchions, zero velvet boxes.
        */}
        <div className="relative py-12 sm:py-20 flex flex-col items-center justify-center">
          
          {/* THE WAND - CLEAN & UNCLUTTERED */}
          <div
            onClick={() => setIsDetailOpen(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full max-w-4xl py-6 sm:py-12 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
            style={{
              transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
            }}
          >
            {/* The Wand Vector Artwork */}
            <div className="w-full max-w-3xl px-2 sm:px-6">
              <CanonicalWandSVG
                silhouetteType={activeWand.silhouetteType}
                className="w-full h-auto"
              />
            </div>

            {/* Character Signature underneath */}
            <div className="mt-8 text-center space-y-1">
              <div className="font-serif italic text-2xl sm:text-3xl text-[#16120F] tracking-wide">
                {activeWand.signature}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C857B] font-semibold">
                {activeWand.name} · {activeWand.wood} · {activeWand.length}
              </div>
              <div className="text-[10px] font-mono text-[#D4AF37] font-semibold pt-0.5">
                {activeWand.pointCost} HOUSE POINTS + ${activeWand.moneyPriceUsd.toFixed(2)} · CLICK TO INSPECT
              </div>
            </div>

            {/* Selection Confirmation Tag */}
            {isSelected && (
              <div className="mt-4 bg-[#124C38]/10 border border-[#124C38] text-[#124C38] px-4 py-1.5 rounded-[2px] text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 animate-fadeIn">
                <Check className="w-3.5 h-3.5 text-[#124C38]" />
                <span>CHOSEN ARTIFACT</span>
              </div>
            )}
          </div>

          {/* 
            HORIZONTAL CATALOGUE SELECTOR RAIL
            Clean, minimal selector to switch between all 11 wands
          */}
          <div className="w-full max-w-4xl border-t border-[#E8E5DF] pt-6 mt-6">
            <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.2em] text-[#8C857B] mb-3">
              <span>SELECT WAND:</span>
              <span className="hidden sm:inline">11 CANONICAL INSTRUMENTS</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CANONICAL_WANDS_CATALOG.map((wand, index) => {
                const isActive = wand.id === activeWand.id;
                const isWandChosen = wand.id === selectedWandId;
                const num = String(index + 1).padStart(2, '0');

                return (
                  <button
                    key={wand.id}
                    type="button"
                    onClick={() => setActiveWandId(wand.id)}
                    onMouseEnter={() => setActiveWandId(wand.id)}
                    className={`px-3 py-2 rounded-[2px] border text-left shrink-0 transition-all cursor-pointer font-mono text-[10.5px] uppercase tracking-wider flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#16120F] text-white border-[#16120F] font-bold shadow-xs'
                        : 'bg-white text-[#6B6359] border-[#E8E5DF] hover:bg-[#F3EFEA] hover:text-[#16120F]'
                    }`}
                  >
                    <span className={isActive ? 'text-[#D4AF37]' : 'text-[#8C857B]'}>{num}</span>
                    <span>{wand.name.split(' ')[0]}</span>
                    {isWandChosen && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#124C38]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* 
        CLEAN DETAIL OVERLAY
      */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs select-none animate-fadeIn">
          <div className="relative bg-white border border-[#E8E5DF] text-[#16120F] rounded-[3px] shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-5">
            
            {/* Header with Close */}
            <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-3">
              <div>
                <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] text-[#8C857B] font-semibold">
                  {houseData.name.toUpperCase()} EDITION
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#16120F] tracking-wide uppercase mt-0.5">
                  {activeWand.name}
                </h3>
              </div>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="text-[#8C857B] hover:text-[#16120F] p-1 cursor-pointer transition-colors"
                aria-label="Close wand detail"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pure Wand Presentation */}
            <div className="py-8 flex flex-col justify-center items-center bg-transparent px-2">
              <div className="w-full">
                <CanonicalWandSVG
                  silhouetteType={activeWand.silhouetteType}
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-4 font-serif italic text-lg text-[#16120F]">
                {activeWand.signature}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1 bg-[#FAF8F5] p-4 rounded-[2px] border-l-2 border-[#16120F]">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8C857B] font-bold block">
                CRAFTSMANSHIP &amp; PROVENANCE
              </span>
              <p className="font-serif italic text-sm text-[#524B43] leading-relaxed">
                &ldquo;{activeWand.description}&rdquo;
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-3 gap-3 bg-[#FAF8F5] p-3.5 rounded-[2px] border border-[#E8E5DF] text-[10.5px] font-mono">
              <div>
                <span className="text-[#8C857B] block text-[9px] uppercase tracking-wider">WOOD</span>
                <span className="text-[#16120F] font-bold">{activeWand.wood}</span>
              </div>
              <div>
                <span className="text-[#8C857B] block text-[9px] uppercase tracking-wider">CORE</span>
                <span className="text-[#16120F] font-bold">{activeWand.core}</span>
              </div>
              <div>
                <span className="text-[#8C857B] block text-[9px] uppercase tracking-wider">LENGTH</span>
                <span className="text-[#16120F] font-bold">{activeWand.length}</span>
              </div>
            </div>

            {/* Price & Choose Action */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E5DF]">
              <div className="font-mono text-center sm:text-left">
                <span className="text-[9px] uppercase tracking-wider text-[#8C857B] block">ACQUISITION REQUIREMENT:</span>
                <strong className="text-sm font-bold text-[#16120F]">
                  {activeWand.pointCost} HOUSE POINTS + ${activeWand.moneyPriceUsd.toFixed(2)}
                </strong>
              </div>

              <button
                type="button"
                onClick={handleChooseWand}
                className="w-full sm:w-auto px-7 py-3 bg-[#16120F] hover:bg-black text-white font-mono text-xs uppercase tracking-wider font-bold rounded-[2px] transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>CHOOSE WAND</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Selection Confirmation Toast */}
      {showSelectedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#16120E] text-[#FAF8F5] px-5 py-2.5 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.35)] flex items-center gap-2 animate-fadeIn max-w-[90vw]">
          <span className="text-sm text-[#D4AF37]">✦</span>
          <span className="font-mono text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            WAND SELECTED
          </span>
          <span className="text-xs text-[#FAF8F5]/80 font-serif italic truncate">
            · {activeWand.name} added
          </span>
        </div>
      )}

    </section>
  );
};
