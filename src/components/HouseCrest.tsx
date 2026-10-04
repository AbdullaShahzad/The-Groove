import React from 'react';
import { HogwartsHouse } from '../types';

interface HouseCrestProps {
  house: HogwartsHouse;
  className?: string;
  size?: number | string;
}

export const HouseCrest: React.FC<HouseCrestProps> = ({ house, className = '', size = 32 }) => {
  if (house === 'gryffindor') {
    // Gryffindor: Rampant Lion on heraldic shield with checkered field
    return (
      <svg
        viewBox="0 0 100 120"
        width={size}
        height={typeof size === 'number' ? (size * 1.2) : undefined}
        className={`drop-shadow-xs shrink-0 ${className}`}
        fill="none"
      >
        <defs>
          <linearGradient id="gryffRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A0002" />
            <stop offset="100%" stopColor="#550000" />
          </linearGradient>
          <linearGradient id="gryffGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8F6215" />
          </linearGradient>
        </defs>
        {/* Shield Frame */}
        <path
          d="M 12,10 L 88,10 Q 88,65 50,112 Q 12,65 12,10 Z"
          fill="url(#gryffRedGrad)"
          stroke="url(#gryffGoldGrad)"
          strokeWidth="3.5"
        />
        {/* Inner Diamond Quilt Pattern */}
        <path
          d="M 50,16 L 80,45 L 50,75 L 20,45 Z M 50,45 L 80,75 L 50,105 L 20,75 Z"
          fill="none"
          stroke="rgba(212, 175, 55, 0.28)"
          strokeWidth="1.2"
        />
        {/* Heraldic Rampant Lion Silhouette */}
        <path
          d="M 46,32 C 48,27 54,26 57,29 C 61,31 63,35 60,38 C 66,37 72,40 70,47 C 69,51 64,52 61,50 C 64,56 65,63 68,69 C 71,70 75,69 77,72 C 77,75 73,76 70,76 C 68,82 66,88 68,95 L 61,95 C 60,89 60,82 58,78 C 55,83 52,90 51,96 L 44,96 C 45,88 48,81 51,75 C 47,75 42,76 40,73 C 41,70 44,70 47,70 C 44,64 43,56 46,50 C 43,51 38,50 37,46 C 36,40 42,37 47,38 C 45,35 44,33 46,32 Z"
          fill="url(#gryffGoldGrad)"
          stroke="#400000"
          strokeWidth="0.8"
        />
        {/* Crown/Banner Arch */}
        <path
          d="M 22,18 Q 50,26 78,18"
          stroke="url(#gryffGoldGrad)"
          strokeWidth="1.8"
          fill="none"
        />
      </svg>
    );
  }

  if (house === 'slytherin') {
    // Slytherin: Coiled Serpent on emerald shield
    return (
      <svg
        viewBox="0 0 100 120"
        width={size}
        height={typeof size === 'number' ? (size * 1.2) : undefined}
        className={`drop-shadow-xs shrink-0 ${className}`}
        fill="none"
      >
        <defs>
          <linearGradient id="slythGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1C4B30" />
            <stop offset="100%" stopColor="#0B2014" />
          </linearGradient>
          <linearGradient id="slythSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#B0BDB5" />
            <stop offset="100%" stopColor="#6C7A72" />
          </linearGradient>
        </defs>
        <path
          d="M 12,10 L 88,10 Q 88,65 50,112 Q 12,65 12,10 Z"
          fill="url(#slythGreenGrad)"
          stroke="url(#slythSilverGrad)"
          strokeWidth="3.5"
        />
        {/* Diamond Lattice */}
        <path
          d="M 50,16 L 80,45 L 50,75 L 20,45 Z M 50,45 L 80,75 L 50,105 L 20,75 Z"
          fill="none"
          stroke="rgba(176, 189, 181, 0.22)"
          strokeWidth="1.2"
        />
        {/* Coiled Serpent S-Curve Silhouette */}
        <path
          d="M 62,30 C 68,30 73,34 71,40 C 69,45 61,46 56,48 C 45,51 40,56 41,64 C 42,71 49,75 58,74 C 65,73 70,69 72,64 L 76,67 C 73,74 66,80 57,80 C 44,80 34,73 34,62 C 34,51 42,45 52,42 C 60,39 65,37 64,34 C 63,31 59,30 55,32 L 53,28 C 56,27 60,27 62,30 Z"
          fill="url(#slythSilverGrad)"
          stroke="#09170E"
          strokeWidth="0.8"
        />
        {/* Serpent Head Accent */}
        <circle cx="70" cy="38" r="1.5" fill="#1C4B30" />
      </svg>
    );
  }

  if (house === 'ravenclaw') {
    // Ravenclaw: Soaring Eagle on sapphire shield
    return (
      <svg
        viewBox="0 0 100 120"
        width={size}
        height={typeof size === 'number' ? (size * 1.2) : undefined}
        className={`drop-shadow-xs shrink-0 ${className}`}
        fill="none"
      >
        <defs>
          <linearGradient id="ravenBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14244D" />
            <stop offset="100%" stopColor="#080F21" />
          </linearGradient>
          <linearGradient id="ravenBronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5DFB8" />
            <stop offset="50%" stopColor="#C28B45" />
            <stop offset="100%" stopColor="#7E5421" />
          </linearGradient>
        </defs>
        <path
          d="M 12,10 L 88,10 Q 88,65 50,112 Q 12,65 12,10 Z"
          fill="url(#ravenBlueGrad)"
          stroke="url(#ravenBronzeGrad)"
          strokeWidth="3.5"
        />
        {/* Diagonal Ray Pinstripes */}
        <path
          d="M 25,12 L 25,50 M 40,12 L 40,80 M 60,12 L 60,80 M 75,12 L 75,50"
          stroke="rgba(194, 139, 69, 0.22)"
          strokeWidth="1.2"
        />
        {/* Soaring Eagle Silhouette */}
        <path
          d="M 50,30 C 53,26 58,26 60,30 C 65,33 76,38 82,45 C 76,46 68,46 62,49 C 70,55 74,62 76,70 C 68,67 62,63 56,61 C 54,69 56,77 58,85 L 53,86 C 51,79 49,72 47,66 C 45,72 43,79 41,86 L 36,85 C 38,77 40,69 38,61 C 32,63 26,67 18,70 C 20,62 24,55 32,49 C 26,46 18,46 12,45 C 18,38 29,33 34,30 C 36,26 41,26 44,30 Z"
          fill="url(#ravenBronzeGrad)"
          stroke="#070D1C"
          strokeWidth="0.8"
        />
        {/* Eagle Beak */}
        <path d="M 44,31 L 40,34 L 45,35 Z" fill="#FFF2B2" />
      </svg>
    );
  }

  // Hufflepuff: Sturdy Badger on yellow/amber shield
  return (
    <svg
      viewBox="0 0 100 120"
      width={size}
      height={typeof size === 'number' ? (size * 1.2) : undefined}
      className={`drop-shadow-xs shrink-0 ${className}`}
      fill="none"
    >
      <defs>
        <linearGradient id="huffYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5C036" />
          <stop offset="100%" stopColor="#C4880B" />
        </linearGradient>
        <linearGradient id="huffBlackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D332A" />
          <stop offset="100%" stopColor="#1A1512" />
        </linearGradient>
      </defs>
      <path
        d="M 12,10 L 88,10 Q 88,65 50,112 Q 12,65 12,10 Z"
        fill="url(#huffYellowGrad)"
        stroke="url(#huffBlackGrad)"
        strokeWidth="3.5"
      />
      {/* Black Chevron Sash Stripes */}
      <path
        d="M 16,35 L 75,90 M 24,20 L 84,76"
        stroke="rgba(38, 30, 24, 0.28)"
        strokeWidth="4"
      />
      {/* Badger Silhouette */}
      <path
        d="M 32,48 C 36,44 44,45 48,47 C 56,43 66,45 72,52 C 78,57 78,66 74,72 C 72,77 65,78 60,76 C 58,81 56,86 52,88 L 47,86 C 48,82 49,77 48,74 C 44,75 39,76 34,74 C 30,72 26,67 27,61 C 28,55 30,51 32,48 Z"
        fill="url(#huffBlackGrad)"
        stroke="#FFFFFF"
        strokeWidth="0.8"
      />
      {/* Badger White Head Stripe */}
      <path
        d="M 30,52 C 34,51 38,52 42,54"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="34" cy="55" r="1.2" fill="#FFFFFF" />
    </svg>
  );
};
