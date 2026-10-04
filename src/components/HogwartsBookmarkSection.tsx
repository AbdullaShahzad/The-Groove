import React, { useState } from 'react';
import { HogwartsHouse } from '../types';
import { HOGWARTS_HOUSES } from '../data/houses';
import { HouseGoldOutlineLogo } from './HouseGoldOutlineLogo';
import { Bookmark, Download, ShoppingBag, Check, Award, ShieldCheck, Image as ImageIcon, ExternalLink, X } from 'lucide-react';

interface HogwartsBookmarkSectionProps {
  currentHouse: HogwartsHouse;
  onOpenSettings?: () => void;
  onAddBookmarkToCart: (bookmarkItem: {
    title: string;
    house: HogwartsHouse;
    recipientName: string;
    price: number;
  }) => void;
}

// Utility to wrap words cleanly for SVG export
function wrapTextLines(text: string, maxCharsPerLine: number = 22): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let cur = '';

  for (const w of words) {
    if ((cur + ' ' + w).trim().length <= maxCharsPerLine) {
      cur = (cur + ' ' + w).trim();
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines.length > 0 ? lines : [text];
}

// House-specific bookmark color palettes
interface HousePalette {
  bgStart: string;
  bgEnd: string;
  borderFoil: string;
  accentFoil: string;
  tasselPrimary: string;
  tasselSecondary: string;
}

const HOUSE_BOOKMARK_PALETTES: Record<HogwartsHouse, HousePalette> = {
  gryffindor: {
    bgStart: '#5A0B11', // Deep Scarlet Crimson
    bgEnd: '#290508',
    borderFoil: '#D4AF37',
    accentFoil: '#FFF5BD',
    tasselPrimary: '#7A1018',
    tasselSecondary: '#D4AF37',
  },
  slytherin: {
    bgStart: '#0E3D2D', // Deep Noble Emerald Green
    bgEnd: '#061D15',
    borderFoil: '#D4AF37',
    accentFoil: '#C5D4CB',
    tasselPrimary: '#124C38',
    tasselSecondary: '#D4AF37',
  },
  ravenclaw: {
    bgStart: '#0F2242', // Deep Midnight Sapphire Blue
    bgEnd: '#061122',
    borderFoil: '#D4AF37',
    accentFoil: '#C9A15B',
    tasselPrimary: '#172C52',
    tasselSecondary: '#D4AF37',
  },
  hufflepuff: {
    bgStart: '#2A1F13', // Warm Obsidian Umber & Golden Amber
    bgEnd: '#150F08',
    borderFoil: '#D4AF37',
    accentFoil: '#F0B823',
    tasselPrimary: '#C4880B',
    tasselSecondary: '#D4AF37',
  },
};

export const HogwartsBookmarkSection: React.FC<HogwartsBookmarkSectionProps> = ({
  currentHouse,
  onOpenSettings,
  onAddBookmarkToCart,
}) => {
  const [patronName, setPatronName] = useState('Abdulla Shahzad');
  const [activeTab, setActiveTab] = useState<'bookmark' | 'certificate'>('bookmark');
  const [isOrdered, setIsOrdered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccessModal, setDownloadSuccessModal] = useState<{
    url: string;
    filename: string;
    type: 'svg' | 'png';
  } | null>(null);

  const house = HOGWARTS_HOUSES[currentHouse];
  const palette = HOUSE_BOOKMARK_PALETTES[currentHouse];
  const safeName = patronName.trim() || 'ABDULLA SHAHZAD';

  // Dynamic font sizing for UI preview
  const getDynamicFontSizeClass = (text: string) => {
    const len = text.trim().length;
    if (len <= 13) return 'text-base sm:text-lg';
    if (len <= 20) return 'text-sm sm:text-base';
    if (len <= 28) return 'text-xs sm:text-sm';
    return 'text-[11px] leading-tight';
  };

  // Pure SVG string with 100% valid XML tags, strict wrapping, and zero foreignObject issues
  const generateSvgContent = (): string => {
    if (activeTab === 'bookmark') {
      const rawMotto = house.motto.split('(')[0].replace(/^["']|["']$/g, '').trim();
      const mottoLines = wrapTextLines(rawMotto, 22);
      const mottoTspans = mottoLines
        .map((line, idx) => `<tspan x="120" dy="${idx === 0 ? 0 : 14}">${idx === 0 ? '“' : ''}${line}${idx === mottoLines.length - 1 ? '”' : ''}</tspan>`)
        .join('');

      // Wrap Patron Name into 1 or 2 lines
      const nameWords = safeName.toUpperCase().split(/\s+/);
      let nameTspans = '';
      if (nameWords.length > 1 && safeName.length > 13) {
        const mid = Math.ceil(nameWords.length / 2);
        const l1 = nameWords.slice(0, mid).join(' ');
        const l2 = nameWords.slice(mid).join(' ');
        nameTspans = `
          <tspan x="120" dy="0">${l1}</tspan>
          <tspan x="120" dy="18">${l2}</tspan>
        `;
      } else {
        const fSize = safeName.length > 20 ? 11 : safeName.length > 13 ? 13 : 15;
        nameTspans = `<tspan x="120" dy="0" font-size="${fSize}">${safeName.toUpperCase()}</tspan>`;
      }

      const trait1 = `${house.traits[0]?.toUpperCase() || ''} · ${house.traits[1]?.toUpperCase() || ''}`;
      const trait2 = house.traits[2]?.toUpperCase() || '';

      return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 580" width="240" height="580">
  <defs>
    <linearGradient id="bkHouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.bgStart}"/>
      <stop offset="100%" stop-color="${palette.bgEnd}"/>
    </linearGradient>

    <linearGradient id="goldFoilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5BD"/>
      <stop offset="35%" stop-color="#D4AF37"/>
      <stop offset="70%" stop-color="#AA8228"/>
      <stop offset="100%" stop-color="#E2C26E"/>
    </linearGradient>

    <!-- Radial Mask for Background Logo -->
    <mask id="crestFadeMask">
      <rect x="0" y="0" width="240" height="580" fill="white" />
      <radialGradient id="dimZone" cx="50%" cy="44%" r="35%">
        <stop offset="0%" stop-color="black" stop-opacity="0.88" />
        <stop offset="65%" stop-color="black" stop-opacity="0.45" />
        <stop offset="100%" stop-color="black" stop-opacity="0.0" />
      </radialGradient>
      <rect x="0" y="0" width="240" height="580" fill="url(#dimZone)" />
    </mask>
  </defs>

  <!-- Bookmark Base Body with House Color -->
  <rect x="12" y="24" width="216" height="536" rx="4" fill="url(#bkHouseGrad)" stroke="#16120F" stroke-width="1.5"/>

  <!-- Ornate Double Gold Foil Borders -->
  <rect x="18" y="30" width="204" height="524" rx="2" fill="none" stroke="url(#goldFoilGrad)" stroke-width="1.1"/>
  <rect x="22" y="34" width="196" height="516" rx="1" fill="none" stroke="url(#goldFoilGrad)" stroke-width="0.75" stroke-dasharray="3,2" opacity="0.6"/>

  <!-- Top Ribbon Eyelet and Silk Cord -->
  <circle cx="120" cy="24" r="5.5" fill="${palette.tasselPrimary}" stroke="url(#goldFoilGrad)" stroke-width="1.5"/>
  <line x1="120" y1="18" x2="120" y2="4" stroke="${palette.tasselSecondary}" stroke-width="3" stroke-linecap="round"/>

  <!-- Thin Gold Outline House Logo partially placed and masked -->
  <g transform="translate(110, 275) scale(1.3)" mask="url(#crestFadeMask)" opacity="0.32" fill="none" stroke="url(#goldFoilGrad)">
    <path d="M 20,20 C 35,12 50,16 60,10 C 70,16 85,12 100,20 C 104,45 104,80 60,126 C 16,80 16,45 20,20 Z" stroke-width="1.1"/>
    <path d="M 12,96 C 24,90 40,94 60,91 C 80,94 96,90 108,96 L 104,106 C 92,100 80,103 60,101 C 40,103 28,100 16,106 Z" stroke-width="0.85"/>
    <path d="M 52,32 C 54,26 62,25 66,29 C 71,31 73,36 70,40 C 77,39 83,43 81,50 C 80,54 75,56 71,53 C 74,60 76,68 79,74 C 82,75 87,74 89,77 C 89,81 85,82 81,81 C 79,88 77,94 79,101 L 71,101 C 70,94 70,87 68,83 C 65,88 61,96 60,102 L 52,102 C 53,93 57,86 60,79 C 55,79 50,81 47,77 C 48,74 52,74 55,74 C 52,67 51,59 54,53 C 51,54 45,53 44,48 C 43,42 49,39 55,40 C 53,36 51,33 52,32 Z" stroke-width="0.95"/>
  </g>

  <!-- 1. Header & House Title (Strict Safe Area) -->
  <text x="120" y="68" font-family="'JetBrains Mono', monospace" font-size="7" letter-spacing="2" text-anchor="middle" fill="#C5BBAA">HOGWARTS CANONICAL ATELIER</text>
  <text x="120" y="104" font-family="Georgia, serif" font-size="18" font-weight="bold" letter-spacing="3" text-anchor="middle" fill="url(#goldFoilGrad)">${house.name.toUpperCase()}</text>
  <text x="120" y="122" font-family="'JetBrains Mono', monospace" font-size="7.5" letter-spacing="1.8" text-anchor="middle" fill="#E2D9C8">FOUNDED 990 A.D.</text>

  <line x1="55" y1="138" x2="185" y2="138" stroke="url(#goldFoilGrad)" stroke-width="0.75" opacity="0.65"/>
  <text x="120" y="141" font-size="7.5" text-anchor="middle" fill="url(#goldFoilGrad)">✦</text>

  <!-- 2. Patron Inscription -->
  <text x="120" y="210" font-family="'JetBrains Mono', monospace" font-size="7" letter-spacing="2" text-anchor="middle" fill="#E5D9CA">EX · LIBRIS</text>
  <text x="120" y="235" font-family="Georgia, serif" font-weight="bold" letter-spacing="1" text-anchor="middle" fill="#FFFFFF">
    ${nameTspans}
  </text>
  <text x="120" y="278" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="bold" letter-spacing="2" text-anchor="middle" fill="#D4AF37">PATRON OF THE ARCHIVE</text>

  <line x1="55" y1="298" x2="185" y2="298" stroke="url(#goldFoilGrad)" stroke-width="0.75" opacity="0.65"/>

  <!-- 3. Traits across 2 lines -->
  <text x="120" y="335" font-family="'JetBrains Mono', monospace" font-size="7" letter-spacing="1.5" text-anchor="middle" fill="#E2D9C8">
    <tspan x="120" dy="0">${trait1}</tspan>
    <tspan x="120" dy="12">${trait2}</tspan>
  </text>

  <!-- 4. Motto wrapped -->
  <text x="120" y="385" font-family="Georgia, serif" font-size="8.5" font-style="italic" text-anchor="middle" fill="#FAF8F5">
    ${mottoTspans}
  </text>

  <!-- 5. The Groove Footer Seal -->
  <line x1="55" y1="455" x2="185" y2="455" stroke="url(#goldFoilGrad)" stroke-width="0.75" opacity="0.65"/>
  <text x="120" y="485" font-family="Georgia, serif" font-size="11" font-weight="bold" letter-spacing="3" text-anchor="middle" fill="#FFFFFF">THE GROOVE</text>
  <text x="120" y="502" font-family="'JetBrains Mono', monospace" font-size="7" letter-spacing="2" text-anchor="middle" fill="#C5BBAA">OCTAVO &amp; FOLIO PRESS</text>
  <text x="120" y="517" font-family="'JetBrains Mono', monospace" font-size="6.5" letter-spacing="1.5" text-anchor="middle" fill="#A89F91">MMXXVI · ARCHIVE</text>
  <text x="120" y="538" font-size="8.5" text-anchor="middle" fill="url(#goldFoilGrad)">✦</text>
</svg>`;
    } else {
      // Matriculation Certificate
      return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="800" height="560">
  <defs>
    <linearGradient id="certParchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCFAF5"/>
      <stop offset="50%" stop-color="#F5EFE2"/>
      <stop offset="100%" stop-color="#ECE2CD"/>
    </linearGradient>
    <linearGradient id="certGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5BD"/>
      <stop offset="35%" stop-color="#D4AF37"/>
      <stop offset="70%" stop-color="#AA8228"/>
      <stop offset="100%" stop-color="#E2C26E"/>
    </linearGradient>
  </defs>

  <rect x="15" y="15" width="770" height="530" rx="4" fill="url(#certParchGrad)" stroke="${house.colors.primary}" stroke-width="2.5"/>
  <rect x="25" y="25" width="750" height="510" rx="2" fill="none" stroke="url(#certGoldGrad)" stroke-width="1.1" stroke-dasharray="6,3"/>

  <text x="400" y="85" font-family="Georgia, serif" font-size="22" font-weight="bold" letter-spacing="4" text-anchor="middle" fill="#16120F">HOGWARTS SCHOOL OF WITCHCRAFT &amp; WIZARDRY</text>
  <text x="400" y="110" font-family="'JetBrains Mono', monospace" font-size="9.5" letter-spacing="3" text-anchor="middle" fill="#7A7165">OFFICIAL ARCHIVAL MATRICULATION REGISTER · MMXXVI</text>

  <line x1="200" y1="130" x2="600" y2="130" stroke="url(#certGoldGrad)" stroke-width="1"/>
  <text x="400" y="133" font-size="10" text-anchor="middle" fill="url(#certGoldGrad)">✦</text>

  <text x="400" y="175" font-family="Georgia, serif" font-size="14" font-style="italic" text-anchor="middle" fill="#524B43">By authority of the Board of Curators, be it known that</text>
  
  <text x="400" y="235" font-family="Georgia, serif" font-size="${safeName.length > 24 ? 20 : safeName.length > 16 ? 24 : 28}" font-weight="bold" letter-spacing="2" text-anchor="middle" fill="${house.colors.primary}">${safeName.toUpperCase()}</text>

  <text x="400" y="280" font-family="Georgia, serif" font-size="14" font-style="italic" text-anchor="middle" fill="#524B43">has been formally inscribed and admitted to the sovereign fellowship of</text>
  
  <text x="400" y="325" font-family="Georgia, serif" font-size="26" font-weight="bold" letter-spacing="3" text-anchor="middle" fill="${house.colors.primary}">${house.name.toUpperCase()} HOUSE</text>
  <text x="400" y="355" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="2.5" text-anchor="middle" fill="#7A7165">HONORING: ${house.traits.join(' · ').toUpperCase()}</text>

  <line x1="120" y1="460" x2="310" y2="460" stroke="#7A7165" stroke-width="0.8"/>
  <text x="215" y="482" font-family="Georgia, serif" font-size="12" font-style="italic" text-anchor="middle" fill="#16120F">Minerva McGonagall</text>
  <text x="215" y="500" font-family="'JetBrains Mono', monospace" font-size="8.5" text-anchor="middle" fill="#7A7165">DEPUTY HEADMISTRESS</text>

  <circle cx="400" cy="455" r="32" fill="${house.colors.primary}" stroke="url(#certGoldGrad)" stroke-width="1.8"/>
  <circle cx="400" cy="455" r="28" fill="none" stroke="url(#certGoldGrad)" stroke-width="0.8" stroke-dasharray="3,2"/>
  <text x="400" y="452" font-family="Georgia, serif" font-size="9" font-weight="bold" letter-spacing="2" text-anchor="middle" fill="#FFFFFF">SEAL OF</text>
  <text x="400" y="466" font-family="Georgia, serif" font-size="11" font-weight="bold" letter-spacing="2" text-anchor="middle" fill="#FFFFFF">${house.name.slice(0, 4).toUpperCase()}</text>

  <line x1="490" y1="460" x2="680" y2="460" stroke="#7A7165" stroke-width="0.8"/>
  <text x="585" y="482" font-family="Georgia, serif" font-size="12" font-style="italic" text-anchor="middle" fill="#16120F">The Groove Conservator</text>
  <text x="585" y="500" font-family="'JetBrains Mono', monospace" font-size="8.5" text-anchor="middle" fill="#7A7165">CURATORIAL ATELIER</text>
</svg>`;
    }
  };

  // Pure Canvas 2D Drawing (100% UNTAINTED - NEVER throws SecurityError)
  const drawToCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    if (activeTab === 'bookmark') {
      canvas.width = 480;
      canvas.height = 1160;
      const ctx = canvas.getContext('2d');
      if (!ctx) return canvas;

      // Scale for 2x crispness
      ctx.scale(2, 2);

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 240, 580);
      bgGrad.addColorStop(0, palette.bgStart);
      bgGrad.addColorStop(1, palette.bgEnd);
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.roundRect(12, 24, 216, 536, 4);
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#16120F';
      ctx.stroke();

      // Gold Foil Borders
      ctx.strokeStyle = palette.borderFoil;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.roundRect(18, 30, 204, 524, 2);
      ctx.stroke();

      // Inner dashed gold border
      ctx.strokeStyle = palette.borderFoil;
      ctx.lineWidth = 0.75;
      ctx.setLineDash([3, 2]);
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.roundRect(22, 34, 196, 516, 1);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // Tassel Eyelet
      ctx.fillStyle = palette.tasselPrimary;
      ctx.strokeStyle = palette.borderFoil;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(120, 24, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Tassel Cord
      ctx.strokeStyle = palette.tasselSecondary;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(120, 18);
      ctx.lineTo(120, 4);
      ctx.stroke();

      // Header Text
      ctx.textAlign = 'center';
      ctx.fillStyle = '#C5BBAA';
      ctx.font = '7px monospace';
      ctx.fillText('HOGWARTS CANONICAL ATELIER', 120, 68);

      // House Title
      ctx.fillStyle = palette.borderFoil;
      ctx.font = 'bold 18px Georgia, serif';
      ctx.fillText(house.name.toUpperCase(), 120, 104);

      ctx.fillStyle = '#E2D9C8';
      ctx.font = '7.5px monospace';
      ctx.fillText('FOUNDED 990 A.D.', 120, 122);

      // Divider
      ctx.strokeStyle = palette.borderFoil;
      ctx.lineWidth = 0.75;
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.moveTo(55, 138);
      ctx.lineTo(185, 138);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = palette.borderFoil;
      ctx.font = '7.5px serif';
      ctx.fillText('✦', 120, 141);

      // Inscription
      ctx.fillStyle = '#E5D9CA';
      ctx.font = '7px monospace';
      ctx.fillText('EX · LIBRIS', 120, 210);

      // Patron Name
      ctx.fillStyle = '#FFFFFF';
      const words = safeName.toUpperCase().split(/\s+/);
      if (words.length > 1 && safeName.length > 13) {
        const mid = Math.ceil(words.length / 2);
        const l1 = words.slice(0, mid).join(' ');
        const l2 = words.slice(mid).join(' ');
        ctx.font = 'bold 13px Georgia, serif';
        ctx.fillText(l1, 120, 235);
        ctx.fillText(l2, 120, 252);
      } else {
        const sz = safeName.length > 20 ? 11 : safeName.length > 13 ? 13 : 15;
        ctx.font = `bold ${sz}px Georgia, serif`;
        ctx.fillText(safeName.toUpperCase(), 120, 240);
      }

      ctx.fillStyle = palette.borderFoil;
      ctx.font = 'bold 7.5px monospace';
      ctx.fillText('PATRON OF THE ARCHIVE', 120, 278);

      // Divider 2
      ctx.strokeStyle = palette.borderFoil;
      ctx.lineWidth = 0.75;
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.moveTo(55, 298);
      ctx.lineTo(185, 298);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Traits
      ctx.fillStyle = '#E2D9C8';
      ctx.font = '7px monospace';
      ctx.fillText(`${house.traits[0]?.toUpperCase() || ''} · ${house.traits[1]?.toUpperCase() || ''}`, 120, 335);
      ctx.fillText(`${house.traits[2]?.toUpperCase() || ''}`, 120, 347);

      // Motto
      const rawMotto = house.motto.split('(')[0].replace(/^["']|["']$/g, '').trim();
      const mottoLines = wrapTextLines(rawMotto, 22);
      ctx.fillStyle = '#FAF8F5';
      ctx.font = 'italic 8.5px Georgia, serif';
      mottoLines.forEach((line, idx) => {
        const q = idx === 0 ? '“' : '';
        const endQ = idx === mottoLines.length - 1 ? '”' : '';
        ctx.fillText(`${q}${line}${endQ}`, 120, 385 + idx * 14);
      });

      // Footer
      ctx.strokeStyle = palette.borderFoil;
      ctx.lineWidth = 0.75;
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.moveTo(55, 455);
      ctx.lineTo(185, 455);
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px Georgia, serif';
      ctx.fillText('THE GROOVE', 120, 485);

      ctx.fillStyle = '#C5BBAA';
      ctx.font = '7px monospace';
      ctx.fillText('OCTAVO & FOLIO PRESS', 120, 502);
      ctx.font = '6.5px monospace';
      ctx.fillText('MMXXVI · ARCHIVE', 120, 517);
      ctx.fillStyle = palette.borderFoil;
      ctx.font = '8.5px serif';
      ctx.fillText('✦', 120, 538);

    } else {
      // Certificate Canvas Drawing
      canvas.width = 1600;
      canvas.height = 1120;
      const ctx = canvas.getContext('2d');
      if (!ctx) return canvas;

      ctx.scale(2, 2);

      // Parchment Base
      ctx.fillStyle = '#FCFAF5';
      ctx.beginPath();
      ctx.roundRect(15, 15, 770, 530, 4);
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = house.colors.primary;
      ctx.stroke();

      // Gold Dash
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 1.1;
      ctx.setLineDash([6, 3]);
      ctx.beginPath();
      ctx.roundRect(25, 25, 750, 510, 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#16120F';
      ctx.font = 'bold 22px Georgia, serif';
      ctx.fillText('HOGWARTS SCHOOL OF WITCHCRAFT & WIZARDRY', 400, 85);

      ctx.fillStyle = '#7A7165';
      ctx.font = '9.5px monospace';
      ctx.fillText('OFFICIAL ARCHIVAL MATRICULATION REGISTER · MMXXVI', 400, 110);

      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(200, 130);
      ctx.lineTo(600, 130);
      ctx.stroke();

      ctx.fillStyle = '#524B43';
      ctx.font = 'italic 14px Georgia, serif';
      ctx.fillText('By authority of the Board of Curators, be it known that', 400, 175);

      ctx.fillStyle = house.colors.primary;
      const sz = safeName.length > 24 ? 20 : safeName.length > 16 ? 24 : 28;
      ctx.font = `bold ${sz}px Georgia, serif`;
      ctx.fillText(safeName.toUpperCase(), 400, 235);

      ctx.fillStyle = '#524B43';
      ctx.font = 'italic 14px Georgia, serif';
      ctx.fillText('has been formally inscribed and admitted to the sovereign fellowship of', 400, 280);

      ctx.fillStyle = house.colors.primary;
      ctx.font = 'bold 26px Georgia, serif';
      ctx.fillText(`${house.name.toUpperCase()} HOUSE`, 400, 325);

      ctx.fillStyle = '#7A7165';
      ctx.font = '10px monospace';
      ctx.fillText(`HONORING: ${house.traits.join(' · ').toUpperCase()}`, 400, 355);

      // Signatures
      ctx.strokeStyle = '#7A7165';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(120, 460);
      ctx.lineTo(310, 460);
      ctx.stroke();

      ctx.fillStyle = '#16120F';
      ctx.font = 'italic 12px Georgia, serif';
      ctx.fillText('Minerva McGonagall', 215, 482);
      ctx.fillStyle = '#7A7165';
      ctx.font = '8.5px monospace';
      ctx.fillText('DEPUTY HEADMISTRESS', 215, 500);

      // Seal
      ctx.fillStyle = house.colors.primary;
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(400, 455, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 9px Georgia, serif';
      ctx.fillText('SEAL OF', 400, 452);
      ctx.font = 'bold 11px Georgia, serif';
      ctx.fillText(house.name.slice(0, 4).toUpperCase(), 400, 466);

      ctx.beginPath();
      ctx.moveTo(490, 460);
      ctx.lineTo(680, 460);
      ctx.stroke();

      ctx.fillStyle = '#16120F';
      ctx.font = 'italic 12px Georgia, serif';
      ctx.fillText('The Groove Conservator', 585, 482);
      ctx.fillStyle = '#7A7165';
      ctx.font = '8.5px monospace';
      ctx.fillText('CURATORIAL ATELIER', 585, 500);
    }

    return canvas;
  };

  // Robust Trigger Download Helper (Direct blob + Data URL + deferred revoke)
  const triggerBrowserDownload = (dataUrlOrBlobUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = dataUrlOrBlobUrl;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 500);
  };

  // Download SVG
  const handleDownloadSvg = () => {
    setIsDownloading(true);
    const filename =
      activeTab === 'bookmark'
        ? `The_Groove_${house.name}_Bookmark_${safeName.replace(/\s+/g, '_')}.svg`
        : `The_Groove_${house.name}_Matriculation_${safeName.replace(/\s+/g, '_')}.svg`;

    const svgString = generateSvgContent();
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);

    // Trigger direct download
    triggerBrowserDownload(blobUrl, filename);

    // Open success modal fallback so users can always save/view directly
    setDownloadSuccessModal({
      url: blobUrl,
      filename,
      type: 'svg',
    });

    setIsDownloading(false);

    // Defer revoking so download completes safely
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 60000);
  };

  // Download High-Resolution PNG via Pure Untainted Canvas
  const handleDownloadPng = () => {
    setIsDownloading(true);
    const filename =
      activeTab === 'bookmark'
        ? `The_Groove_${house.name}_Bookmark_${safeName.replace(/\s+/g, '_')}.png`
        : `The_Groove_${house.name}_Matriculation_${safeName.replace(/\s+/g, '_')}.png`;

    const canvas = drawToCanvas();
    const pngDataUrl = canvas.toDataURL('image/png');

    // Trigger direct download
    triggerBrowserDownload(pngDataUrl, filename);

    // Open success modal fallback with preview and copy/save options
    setDownloadSuccessModal({
      url: pngDataUrl,
      filename,
      type: 'png',
    });

    setIsDownloading(false);
  };

  const handleOrderBookmark = () => {
    setIsOrdered(true);
    onAddBookmarkToCart({
      title: `${house.name.toUpperCase()} EMBOSSED BOOKMARK (${safeName})`,
      house: currentHouse,
      recipientName: safeName,
      price: 18.0,
    });
    setTimeout(() => setIsOrdered(false), 2200);
  };

  return (
    <section className="py-20 sm:py-28 border-t border-[#E8E5DF] bg-white relative select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-[#E8E5DF] gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] font-mono tracking-[0.24em] uppercase font-semibold text-[#16120F]">
              <Bookmark className="w-3.5 h-3.5 text-[#16120F]" />
              <span>SECTION 09 / ARCHIVAL ARTIFACT STUDIO</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#16120F] tracking-tight uppercase mt-1">
              HOUSE BOOKMARK &amp; MATRICULATION SCROLL
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-[#6B6359] mt-1.5">
              Personalized bookmarks rendered in authentic house colors with masked gold-outline heraldry.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#8C857B]">AFFILIATION:</span>
            <span className="font-bold text-[#16120F] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: house.colors.primary }} />
              <span>{house.name.toUpperCase()} HOUSE</span>
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-stretch">
          
          {/* LEFT COLUMN: Controls & Actions */}
          <div className="bg-[#FAF8F5] border border-[#E8E5DF] rounded-[3px] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-5">
              
              <div className="border-b border-[#E8E5DF] pb-3">
                <h3 className="font-serif font-bold text-lg text-[#16120F] uppercase tracking-wide">
                  ARTIFACT SPECIFICATIONS
                </h3>
                <p className="text-xs text-[#6B6359] mt-0.5">
                  Inscribe your name into the permanent matriculation registry.
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('bookmark')}
                  className={`py-2.5 px-3 rounded-[2px] text-xs font-mono font-semibold flex items-center justify-center gap-2 border transition-colors cursor-pointer ${
                    activeTab === 'bookmark'
                      ? 'bg-[#16120F] text-white border-[#16120F]'
                      : 'bg-white text-[#6B6359] border-[#E8E5DF] hover:bg-[#F8F7F4] hover:text-[#16120F]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>EMBOSSED BOOKMARK</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('certificate')}
                  className={`py-2.5 px-3 rounded-[2px] text-xs font-mono font-semibold flex items-center justify-center gap-2 border transition-colors cursor-pointer ${
                    activeTab === 'certificate'
                      ? 'bg-[#16120F] text-white border-[#16120F]'
                      : 'bg-white text-[#6B6359] border-[#E8E5DF] hover:bg-[#F8F7F4] hover:text-[#16120F]'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>MATRICULATION SCROLL</span>
                </button>
              </div>

              {/* Inscription Name Input */}
              <div>
                <label className="block text-[10.5px] font-mono uppercase tracking-[0.18em] text-[#8C857B] mb-1.5 font-semibold">
                  INSCRIBE YOUR PATRON NAME:
                </label>
                <input
                  type="text"
                  value={patronName}
                  onChange={(e) => setPatronName(e.target.value)}
                  placeholder="e.g. Abdulla Shahzad"
                  maxLength={36}
                  className="w-full bg-white border border-[#E8E5DF] focus:border-[#16120F] text-[#16120F] px-3.5 py-2.5 rounded-[2px] font-mono text-xs focus:outline-none transition-all shadow-inner"
                />
                <p className="text-[9px] font-mono text-[#8C857B] mt-1.5 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#124C38]" />
                  <span>Strict CSS max-width: 90%, word-wrap: break-word, and overflow: hidden enforced.</span>
                </p>
              </div>

              {/* Materials & House Color Spec Note */}
              <div className="bg-white p-3.5 rounded-[2px] border border-[#E8E5DF] text-[11px] font-mono space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#8C857B]">HOUSE PALETTE:</span>
                  <span className="font-semibold flex items-center gap-1.5" style={{ color: house.colors.primary }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.bgStart }} />
                    <span>{house.name.toUpperCase()} LIVERY</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C857B]">HERALDRY:</span>
                  <span className="text-[#A88A45] font-semibold">Masked Thin Gold Outline</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C857B]">SAFE BOUND:</span>
                  <span className="text-[#16120F] font-semibold">90% Strict Internal Boundary</span>
                </div>
              </div>

            </div>

            {/* Action Buttons: PNG, SVG, and Order */}
            <div className="pt-6 mt-6 border-t border-[#E8E5DF] space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  disabled={isDownloading}
                  className="w-full bg-[#16120F] hover:bg-black text-white py-3 rounded-[2px] font-mono text-[10.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
                  title="Download pixel-perfect rasterized PNG"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>DOWNLOAD PNG</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  disabled={isDownloading}
                  className="w-full bg-white hover:bg-[#F8F7F4] text-[#16120F] border border-[#E8E5DF] py-3 rounded-[2px] font-mono text-[10.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
                  title="Download clean vector SVG"
                >
                  <Download className="w-3.5 h-3.5 text-[#16120F]" />
                  <span>DOWNLOAD SVG</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleOrderBookmark}
                className="w-full bg-[#FAF8F5] hover:bg-white text-[#16120F] border border-[#D4AF37] py-3 rounded-[2px] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:scale-[1.01] active:scale-[0.99]"
              >
                {isOrdered ? (
                  <>
                    <Check className="w-4 h-4 text-[#124C38]" />
                    <span>ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#A88A45]" />
                    <span>ORDER PHYSICAL PRINT ($18.00)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Browser Preview Matching Export Dimensions */}
          <div className="bg-[#FAF8F5] border border-[#E8E5DF] rounded-[3px] p-6 sm:p-8 flex flex-col justify-between items-center shadow-xs">
            
            {/* Header Status */}
            <div className="w-full border-b border-[#E8E5DF] pb-3 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C857B] font-semibold">
                SAFE AREA PROOFING PREVIEW
              </span>
              <span className="text-[9.5px] font-mono uppercase text-[#124C38] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>90% BOUNDS LOCKED</span>
              </span>
            </div>

            {/* LIVE PREVIEW CANVAS */}
            <div className="my-auto py-6 flex items-center justify-center w-full">
              {activeTab === 'bookmark' ? (
                /* Luxury Physical Bookmark Preview with Corresponding House Color */
                <div className="relative">
                  {/* Hanging Tassel */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
                    <div
                      className="w-1.5 h-7 rounded-full shadow-xs"
                      style={{ backgroundColor: palette.tasselPrimary }}
                    />
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-xs"
                      style={{ backgroundColor: palette.tasselSecondary }}
                    />
                  </div>

                  {/* 
                    FIXED PHYSICAL BOOKMARK CARD
                    Width: 240px fixed
                    Height: 580px fixed
                    Features corresponding house color gradient
                  */}
                  <div
                    className="w-[240px] h-[580px] rounded-[4px] border-2 border-[#16120F] p-4 flex flex-col justify-between text-center relative overflow-hidden shadow-2xl transition-colors duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${palette.bgStart} 0%, ${palette.bgEnd} 100%)`,
                    }}
                  >
                    {/* Inner Gold Foil Frame */}
                    <div className="absolute inset-2 border border-[#D4AF37]/60 pointer-events-none rounded-[2px]" />
                    <div className="absolute inset-3 border border-dashed border-[#D4AF37]/35 pointer-events-none rounded-[1px]" />

                    {/* 
                      PARTIALLY MASKED, THIN GOLD OUTLINE OF HOUSE LOGO:
                      Integrated background element with CSS radial-gradient mask
                    */}
                    <div
                      className="absolute -right-6 bottom-16 pointer-events-none scale-125 transform rotate-6 transition-all duration-300"
                      style={{
                        maskImage: 'radial-gradient(circle at 45% 45%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,1) 100%)',
                        WebkitMaskImage: 'radial-gradient(circle at 45% 45%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,1) 100%)',
                        opacity: 0.32,
                      }}
                    >
                      <HouseGoldOutlineLogo house={currentHouse} size={145} />
                    </div>

                    {/* 
                      STRICT INTERNAL SAFE AREA USING CSS:
                      'max-width: 90%', 'word-wrap: break-word', and 'overflow: hidden'
                    */}
                    <div
                      className="relative z-10 w-full mx-auto h-full flex flex-col justify-between py-2"
                      style={{
                        maxWidth: '90%',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        overflow: 'hidden',
                        margin: '0 auto',
                        textAlign: 'center',
                      }}
                    >
                      
                      {/* 1. Header & House Title */}
                      <div className="space-y-0.5 pt-1">
                        <div className="text-[7px] font-mono tracking-[0.24em] uppercase text-[#E2D9C8]">
                          HOGWARTS CANONICAL ATELIER
                        </div>
                        <h4 className="font-serif font-bold text-lg tracking-[0.22em] uppercase mt-0.5 text-[#D4AF37]">
                          {house.name}
                        </h4>
                        <div className="text-[7.5px] font-mono tracking-widest uppercase text-[#FAF8F5]/85">
                          FOUNDED 990 A.D.
                        </div>
                        <div className="pt-1 flex items-center justify-center gap-1.5 opacity-65">
                          <span className="w-8 h-px bg-[#D4AF37]" />
                          <span className="text-[8px] text-[#D4AF37]">✦</span>
                          <span className="w-8 h-px bg-[#D4AF37]" />
                        </div>
                      </div>

                      {/* 
                        2. Patron Inscription with CSS max-width: 90%, word-wrap: break-word, overflow: hidden
                      */}
                      <div
                        className="border-y border-[#D4AF37]/30 py-3.5 my-auto space-y-1 bg-black/25 backdrop-blur-[1px]"
                        style={{
                          maxWidth: '90%',
                          width: '100%',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          overflow: 'hidden',
                          margin: '0 auto',
                          textAlign: 'center',
                        }}
                      >
                        <div className="text-[7.5px] font-mono uppercase tracking-[0.24em] text-[#E2D9C8]">
                          EX · LIBRIS
                        </div>
                        
                        <div
                          style={{
                            maxWidth: '90%',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            overflow: 'hidden',
                            textAlign: 'center',
                            margin: '0 auto',
                          }}
                          className={`font-serif font-bold uppercase tracking-wide text-white drop-shadow-sm leading-tight mx-auto ${getDynamicFontSizeClass(
                            safeName
                          )}`}
                        >
                          {safeName}
                        </div>

                        <div className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] pt-0.5 text-[#D4AF37]">
                          PATRON OF THE ARCHIVE
                        </div>
                      </div>

                      {/* 3. House Motto & Traits with CSS max-width: 90%, word-wrap: break-word, overflow: hidden */}
                      <div
                        className="space-y-1"
                        style={{
                          maxWidth: '90%',
                          width: '100%',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          overflow: 'hidden',
                          margin: '0 auto',
                          textAlign: 'center',
                        }}
                      >
                        <div className="text-[7px] font-mono uppercase tracking-widest text-[#E2D9C8] leading-tight mx-auto">
                          {house.traits.slice(0, 3).join(' · ')}
                        </div>
                        <p className="font-serif italic text-[8.5px] text-[#FAF8F5]/90 leading-tight mx-auto px-1">
                          &ldquo;{house.motto.split('(')[0].trim()}&rdquo;
                        </p>
                      </div>

                      {/* 4. The Groove Identity */}
                      <div className="border-t border-[#D4AF37]/30 pt-2 space-y-0.5">
                        <div className="font-serif font-bold text-xs uppercase tracking-[0.24em] text-white">
                          THE GROOVE
                        </div>
                        <div className="text-[7px] font-mono uppercase tracking-widest text-[#E2D9C8]">
                          OCTAVO &amp; FOLIO PRESS
                        </div>
                        <div className="text-[8.5px] text-[#D4AF37]">✦</div>
                      </div>

                    </div>

                  </div>
                </div>
              ) : (
                /* Matriculation Scroll Preview with House Accent and Masked Crest */
                <div
                  className="w-full max-w-[420px] h-[300px] bg-[#FCFAF5] border-2 rounded-[3px] p-6 shadow-xl flex flex-col justify-between text-center relative overflow-hidden"
                  style={{ borderColor: house.colors.primary }}
                >
                  {/* Gold Dash Border */}
                  <div className="absolute inset-2 border border-dashed border-[#D4AF37]/50 pointer-events-none" />

                  {/* 
                    SUBTLE, THIN GOLD OUTLINE HOUSE LOGO:
                    Partially placed along lower right flank and masked
                  */}
                  <div
                    className="absolute -right-6 bottom-4 pointer-events-none scale-150 transform rotate-3"
                    style={{
                      maskImage: 'radial-gradient(ellipse at 35% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,1) 100%)',
                      WebkitMaskImage: 'radial-gradient(ellipse at 35% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,1) 100%)',
                      opacity: 0.22,
                    }}
                  >
                    <HouseGoldOutlineLogo house={currentHouse} size={150} />
                  </div>

                  {/* Header */}
                  <div className="space-y-0.5 pt-1 relative z-10">
                    <div className="text-[8px] font-mono uppercase tracking-[0.22em] text-[#7A7165]">
                      HOGWARTS SCHOOL OF WITCHCRAFT &amp; WIZARDRY
                    </div>
                    <h4 className="font-serif font-bold text-base tracking-widest uppercase text-[#16120F]">
                      ARCHIVAL MATRICULATION REGISTER
                    </h4>
                    <div className="flex items-center justify-center gap-1.5 opacity-60">
                      <span className="w-12 h-px bg-[#D4AF37]" />
                      <span className="text-[8px] text-[#D4AF37]">✦</span>
                      <span className="w-12 h-px bg-[#D4AF37]" />
                    </div>
                  </div>

                  {/* Body Inscription with CSS max-width: 90%, word-wrap: break-word, overflow: hidden */}
                  <div
                    className="my-auto py-2 space-y-1 relative z-10 mx-auto"
                    style={{
                      maxWidth: '90%',
                      width: '100%',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      overflow: 'hidden',
                      textAlign: 'center',
                    }}
                  >
                    <div className="text-[8.5px] font-serif italic text-[#524B43]">
                      By authority of the Board of Curators, be it known that
                    </div>
                    <div
                      style={{
                        maxWidth: '90%',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        overflow: 'hidden',
                        textAlign: 'center',
                        margin: '0 auto',
                        color: house.colors.primary,
                      }}
                      className={`font-serif font-bold uppercase tracking-wide leading-tight ${getDynamicFontSizeClass(
                        safeName
                      )}`}
                    >
                      {safeName}
                    </div>
                    <div className="text-[8px] font-mono uppercase tracking-wider text-[#7A7165]">
                      HAS BEEN FORMALLY INSCRIBED AND ADMITTED TO
                    </div>
                    <div
                      className="font-serif font-bold text-sm tracking-widest uppercase"
                      style={{ color: house.colors.primary }}
                    >
                      {house.name.toUpperCase()} HOUSE
                    </div>
                  </div>

                  {/* Footer Signatures */}
                  <div className="border-t border-[#E8E5DF] pt-2.5 flex items-center justify-between text-[8px] font-mono text-[#7A7165] relative z-10">
                    <div className="text-left">
                      <div className="font-serif italic text-[9.5px] text-[#16120F]">Minerva McGonagall</div>
                      <div className="text-[7px]">DEPUTY HEADMISTRESS</div>
                    </div>
                    
                    {/* Center Seal Stamp */}
                    <div
                      className="w-7 h-7 rounded-full border flex items-center justify-center text-[7px] font-bold text-white shadow-xs"
                      style={{ backgroundColor: house.colors.primary, borderColor: '#D4AF37' }}
                    >
                      ✦
                    </div>

                    <div className="text-right">
                      <div className="font-serif italic text-[9.5px] text-[#16120F]">The Groove Conservator</div>
                      <div className="text-[7px]">REGISTERED MMXXVI</div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Bottom Proofing Footnote */}
            <div className="w-full border-t border-[#E8E5DF] pt-3 flex items-center justify-between text-[9.5px] font-mono text-[#8C857B]">
              <span>DIMENSIONS: 240 × 580 MM (EXACT PARITY)</span>
              <span>STRICT 90% SAFE AREA ENFORCED</span>
            </div>

          </div>

        </div>

      </div>

      {/* 
        DOWNLOAD SUCCESS & DIRECT SAVE FALLBACK MODAL
        Guarantees that regardless of browser/iframe security, the user can immediately download or save their file!
      */}
      {downloadSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none animate-fadeIn">
          <div className="relative bg-[#16120F] border border-[#2D231B] text-[#FAF8F5] rounded-[3px] shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-serif font-bold text-base text-white uppercase tracking-wider">
                  ARTIFACT GENERATED
                </h3>
              </div>
              <button
                onClick={() => setDownloadSuccessModal(null)}
                className="text-white/60 hover:text-white p-1 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Thumbnail */}
            <div className="bg-[#0E0B09] border border-[#241C16] rounded-[2px] p-4 flex flex-col items-center justify-center max-h-64 overflow-hidden">
              <img
                src={downloadSuccessModal.url}
                alt="Generated Artifact"
                className="max-h-52 w-auto object-contain drop-shadow-md rounded-[2px]"
              />
            </div>

            <div className="text-center space-y-1">
              <p className="font-mono text-xs text-[#D4AF37] font-semibold break-all">
                {downloadSuccessModal.filename}
              </p>
              <p className="text-[11px] font-mono text-[#8C857B]">
                Your download has started. If your browser blocked it, click the button below:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <a
                href={downloadSuccessModal.url}
                download={downloadSuccessModal.filename}
                className="py-2.5 px-3 bg-[#D4AF37] hover:bg-[#E5C77A] text-[#16120F] font-mono text-[10.5px] font-bold uppercase rounded-[2px] text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>SAVE FILE</span>
              </a>

              <a
                href={downloadSuccessModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-[#241D17] hover:bg-[#332A22] text-white border border-[#4A3B2F] font-mono text-[10.5px] font-bold uppercase rounded-[2px] text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>OPEN FULL VIEW</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
