import React from 'react';
import { HogwartsHouse } from '../types';

interface HouseGoldOutlineLogoProps {
  house: HogwartsHouse;
  className?: string;
  size?: number | string;
  opacity?: number;
}

export const HouseGoldOutlineLogo: React.FC<HouseGoldOutlineLogoProps> = ({
  house,
  className = '',
  size = 120,
  opacity = 1,
}) => {
  return (
    <svg
      viewBox="0 0 120 140"
      width={size}
      height={typeof size === 'number' ? size * 1.16 : undefined}
      className={`shrink-0 pointer-events-none ${className}`}
      fill="none"
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="thinGoldOutlineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF5BD" />
          <stop offset="35%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#AA8228" />
          <stop offset="100%" stopColor="#E2C26E" />
        </linearGradient>
      </defs>

      {/* Subtle, Thin Heraldic Shield Outlines (0.9px - 1.1px) */}
      <path
        d="M 20,20 C 35,12 50,16 60,10 C 70,16 85,12 100,20 C 104,45 104,80 60,126 C 16,80 16,45 20,20 Z"
        stroke="url(#thinGoldOutlineGrad)"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 24,24 C 36,18 48,20 60,15 C 72,20 84,18 96,24 C 100,46 99,76 60,118 C 21,76 20,46 24,24 Z"
        stroke="url(#thinGoldOutlineGrad)"
        strokeWidth="0.65"
        strokeDasharray="3,2"
        opacity="0.65"
      />

      {/* Heraldic Scroll Banner Outline */}
      <path
        d="M 12,96 C 24,90 40,94 60,91 C 80,94 96,90 108,96 L 104,106 C 92,100 80,103 60,101 C 40,103 28,100 16,106 Z"
        stroke="url(#thinGoldOutlineGrad)"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />

      {/* Subtle Thin Animal Contours */}
      {house === 'gryffindor' && (
        <g stroke="url(#thinGoldOutlineGrad)" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round">
          {/* Gryffindor Rampant Lion */}
          <path d="M 52,32 C 54,26 62,25 66,29 C 71,31 73,36 70,40 C 77,39 83,43 81,50 C 80,54 75,56 71,53 C 74,60 76,68 79,74 C 82,75 87,74 89,77 C 89,81 85,82 81,81 C 79,88 77,94 79,101 L 71,101 C 70,94 70,87 68,83 C 65,88 61,96 60,102 L 52,102 C 53,93 57,86 60,79 C 55,79 50,81 47,77 C 48,74 52,74 55,74 C 52,67 51,59 54,53 C 51,54 45,53 44,48 C 43,42 49,39 55,40 C 53,36 51,33 52,32 Z" />
          <path d="M 58,38 Q 66,43 62,50" strokeWidth="0.65" opacity="0.75" />
          <path d="M 55,46 Q 62,51 58,58" strokeWidth="0.65" opacity="0.75" />
        </g>
      )}

      {house === 'slytherin' && (
        <g stroke="url(#thinGoldOutlineGrad)" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round">
          {/* Slytherin Coiled Serpent */}
          <path d="M 72,32 C 79,32 85,37 83,44 C 81,50 72,52 66,54 C 53,58 48,64 49,72 C 50,80 58,85 68,84 C 76,83 82,78 84,73 L 89,76 C 85,84 77,91 67,91 C 52,91 40,83 40,70 C 40,58 50,51 61,48 C 70,45 76,43 75,39 C 74,35 69,33 65,36 L 63,31 C 66,30 70,30 72,32 Z" />
          <path d="M 75,38 Q 70,42 74,47" strokeWidth="0.65" opacity="0.75" />
          <path d="M 59,53 Q 52,59 55,67" strokeWidth="0.65" opacity="0.75" />
          <circle cx="81" cy="42" r="1.3" stroke="url(#thinGoldOutlineGrad)" strokeWidth="0.8" />
        </g>
      )}

      {house === 'ravenclaw' && (
        <g stroke="url(#thinGoldOutlineGrad)" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round">
          {/* Ravenclaw Soaring Eagle */}
          <path d="M 60,32 C 64,27 70,27 72,32 C 78,35 90,41 97,49 C 90,50 81,50 74,53 C 83,60 88,68 90,77 C 81,74 74,69 67,67 C 65,76 67,85 69,94 L 63,95 C 61,87 59,79 57,72 C 54,79 52,87 50,94 L 44,93 C 46,84 48,76 46,67 C 39,69 32,74 23,77 C 25,68 30,60 39,53 C 32,50 23,50 16,49 C 23,41 35,35 41,32 C 43,27 49,27 53,32 Z" />
          <path d="M 53,33 L 48,37 L 54,38 Z" strokeWidth="0.8" />
          <path d="M 33,48 L 42,58" strokeWidth="0.6" opacity="0.7" />
          <path d="M 87,48 L 78,58" strokeWidth="0.6" opacity="0.7" />
        </g>
      )}

      {house === 'hufflepuff' && (
        <g stroke="url(#thinGoldOutlineGrad)" strokeWidth="0.95" strokeLinecap="round" strokeLinejoin="round">
          {/* Hufflepuff Sturdy Badger */}
          <path d="M 38,50 C 43,45 52,46 57,48 C 66,44 78,46 85,54 C 92,60 92,70 87,77 C 85,82 77,83 71,81 C 69,87 66,92 61,95 L 55,93 C 56,88 57,83 56,80 C 51,81 45,82 39,80 C 34,78 30,72 31,65 C 32,58 35,54 38,50 Z" />
          <path d="M 36,54 C 41,53 46,54 51,57" strokeWidth="1.1" />
          <circle cx="41" cy="58" r="1.3" stroke="url(#thinGoldOutlineGrad)" strokeWidth="0.8" />
        </g>
      )}
    </svg>
  );
};
