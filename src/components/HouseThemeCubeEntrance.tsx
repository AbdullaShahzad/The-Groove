import React, { useState, useEffect } from 'react';
import { HogwartsHouse } from '../types';
import { HOGWARTS_HOUSES } from '../data/houses';

interface HouseThemeCubeEntranceProps {
  house: HogwartsHouse;
  onComplete?: () => void;
  triggerKey?: string | number;
}

interface CubeBlock {
  id: number;
  colSpan: string;
  rowSpan: string;
  delayMs: number;
  rotateAxis: 'Y' | 'X';
}

// 18 Asymmetrical Blocks with varied spans and delays like a mirror cube
const ASYMMETRIC_BLOCKS: CubeBlock[] = [
  { id: 1, colSpan: 'col-span-2', rowSpan: 'row-span-1', delayMs: 40, rotateAxis: 'Y' },
  { id: 2, colSpan: 'col-span-1', rowSpan: 'row-span-2', delayMs: 90, rotateAxis: 'X' },
  { id: 3, colSpan: 'col-span-1', rowSpan: 'row-span-1', delayMs: 140, rotateAxis: 'Y' },
  { id: 4, colSpan: 'col-span-2', rowSpan: 'row-span-1', delayMs: 70, rotateAxis: 'X' },
  
  { id: 5, colSpan: 'col-span-1', rowSpan: 'row-span-1', delayMs: 180, rotateAxis: 'Y' },
  { id: 6, colSpan: 'col-span-2', rowSpan: 'row-span-2', delayMs: 220, rotateAxis: 'X' },
  { id: 7, colSpan: 'col-span-1', rowSpan: 'row-span-1', delayMs: 160, rotateAxis: 'Y' },
  { id: 8, colSpan: 'col-span-2', rowSpan: 'row-span-1', delayMs: 250, rotateAxis: 'X' },

  { id: 9, colSpan: 'col-span-2', rowSpan: 'row-span-1', delayMs: 290, rotateAxis: 'Y' },
  { id: 10, colSpan: 'col-span-1', rowSpan: 'row-span-1', delayMs: 330, rotateAxis: 'X' },
  { id: 11, colSpan: 'col-span-1', rowSpan: 'row-span-2', delayMs: 270, rotateAxis: 'Y' },
  { id: 12, colSpan: 'col-span-2', rowSpan: 'row-span-1', delayMs: 360, rotateAxis: 'X' },

  { id: 13, colSpan: 'col-span-1', rowSpan: 'row-span-1', delayMs: 400, rotateAxis: 'Y' },
  { id: 14, colSpan: 'col-span-2', rowSpan: 'row-span-1', delayMs: 440, rotateAxis: 'X' },
  { id: 15, colSpan: 'col-span-1', rowSpan: 'row-span-1', delayMs: 380, rotateAxis: 'Y' },
  { id: 16, colSpan: 'col-span-2', rowSpan: 'row-span-2', delayMs: 480, rotateAxis: 'X' },
  
  { id: 17, colSpan: 'col-span-2', rowSpan: 'row-span-1', delayMs: 520, rotateAxis: 'Y' },
  { id: 18, colSpan: 'col-span-1', rowSpan: 'row-span-1', delayMs: 560, rotateAxis: 'X' },
];

export const HouseThemeCubeEntrance: React.FC<HouseThemeCubeEntranceProps> = ({
  house,
  onComplete,
  triggerKey,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDissolving, setIsDissolving] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);

  const houseData = HOGWARTS_HOUSES[house];

  useEffect(() => {
    // Reset and trigger flip animation
    setIsDestroyed(false);
    setIsDissolving(false);
    setIsFlipped(false);

    // 1. Initial pause where each panel starts pure white like mirror blocks
    const flipTimer = setTimeout(() => {
      setIsFlipped(true);
    }, 200);

    // 2. Once all blocks flip and match the theme, dissolve the mirror cube overlay
    const dissolveTimer = setTimeout(() => {
      setIsDissolving(true);
    }, 1450);

    // 3. Remove overlay from DOM completely
    const destroyTimer = setTimeout(() => {
      setIsDestroyed(true);
      if (onComplete) onComplete();
    }, 2050);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(dissolveTimer);
      clearTimeout(destroyTimer);
    };
  }, [triggerKey, house]);

  if (isDestroyed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-600 ease-out p-2 sm:p-4 flex flex-col justify-between overflow-hidden bg-black/40 backdrop-blur-[2px] ${
        isDissolving ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ perspective: '1400px' }}
    >
      {/* Asymmetrical 3D Mirror Cube Tiles */}
      <div className="w-full h-full grid grid-cols-4 sm:grid-cols-6 grid-rows-4 sm:grid-rows-4 gap-1.5 sm:gap-2.5">
        {ASYMMETRIC_BLOCKS.map((block) => {
          return (
            <div
              key={block.id}
              className={`${block.colSpan} ${block.rowSpan} relative w-full h-full`}
              style={{ perspective: '1000px' }}
            >
              {/* Dual-Sided Flip Tile */}
              <div
                className="w-full h-full relative transition-transform duration-700 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transitionDelay: `${block.delayMs}ms`,
                  transform: isFlipped
                    ? block.rotateAxis === 'Y'
                      ? 'rotateY(180deg)'
                      : 'rotateX(180deg)'
                    : 'rotateY(0deg) rotateX(0deg)',
                }}
              >
                {/* 
                  FRONT FACE: Pure Glossy Mirror White
                  Starts completely white with chrome reflection bevels 
                */}
                <div
                  className="absolute inset-0 rounded-[3px] bg-white border border-white/80 shadow-lg flex items-center justify-center overflow-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Subtle Mirror Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white via-[#F7F6F2] to-white opacity-95" />
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-white shadow-xs" />
                  <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/60 blur-md pointer-events-none" />
                </div>

                {/* 
                  BACK FACE: Matched House Color Theme
                  Flips around to reveal the authentic house colors and crest seal 
                */}
                <div
                  className="absolute inset-0 rounded-[3px] border shadow-2xl flex flex-col items-center justify-center p-2 overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform:
                      block.rotateAxis === 'Y'
                        ? 'rotateY(180deg)'
                        : 'rotateX(180deg)',
                    backgroundColor: houseData.theme.primary,
                    borderColor: houseData.theme.secondary,
                    boxShadow: `inset 0 0 15px rgba(0,0,0,0.35), 0 4px 14px ${houseData.theme.glow}`,
                  }}
                >
                  {/* Subtle Inner Gold/Silver Filigree Border */}
                  <div
                    className="absolute inset-1 border border-dashed rounded-[2px] opacity-40 pointer-events-none"
                    style={{ borderColor: houseData.theme.secondary }}
                  />

                  {/* Micro House Heraldic Motif */}
                  <div
                    className="text-[9px] font-mono tracking-widest uppercase font-bold opacity-85 select-none"
                    style={{ color: houseData.theme.secondary }}
                  >
                    {houseData.name}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
