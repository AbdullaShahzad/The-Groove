import React from 'react';
import { Volume, Category } from '../types';
import { GrooveSpine } from './GrooveSpine';

interface SpineShelfProps {
  allVolumes: Volume[];
  selectedVolume: Volume | null;
  currentCategory: Category;
  searchQuery: string;
  onSelectVolume: (volume: Volume) => void;
  onOpenPreview?: (volume: Volume) => void;
}

export const SpineShelf: React.FC<SpineShelfProps> = ({
  allVolumes,
  selectedVolume,
  currentCategory,
  searchQuery,
  onSelectVolume,
  onOpenPreview,
}) => {
  return (
    <div className="relative w-full flex justify-center lg:justify-start items-end pt-10 sm:pt-14 pb-3 overflow-x-auto sm:overflow-visible scrollbar-none select-none max-w-full min-h-[290px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[500px]">
      {/* 
        FLATTENED BASELINE (0deg container tilt):
        The shelf sits level on the ground.
        Each individual book inside is slanted in parallel towards the left (-6.8 degrees),
        leaning directly towards the "BOOKS FOR all" headline.
      */}
      <div className="flex items-end justify-center lg:justify-start gap-[2px] xs:gap-[2.5px] sm:gap-[3.5px] md:gap-[4px] lg:gap-[4.5px] px-1 sm:px-2 pt-8 pb-2 origin-bottom">
        {allVolumes.map((volume, idx) => {
          const matchesCategory =
            currentCategory === 'ALL VOLUMES' || volume.category === currentCategory;
          const matchesSearch =
            !searchQuery.trim() ||
            volume.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            volume.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            volume.category.toLowerCase().includes(searchQuery.toLowerCase());

          const isDimmed = !matchesCategory || !matchesSearch;

          return (
            <GrooveSpine
              key={volume.id}
              volume={volume}
              index={idx}
              isSelected={selectedVolume?.id === volume.id}
              isDimmed={isDimmed}
              onSelect={onSelectVolume}
              onOpenPreview={onOpenPreview}
            />
          );
        })}
      </div>

      {/* Flat ambient desk shadow beneath the books */}
      <div className="absolute bottom-2 inset-x-4 h-3 bg-black/20 blur-md pointer-events-none rounded-full" />
    </div>
  );
};
