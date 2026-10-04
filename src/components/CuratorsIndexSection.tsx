import React, { useState, useMemo } from 'react';
import { Volume } from '../types';
import { BookOpen, Sparkles, ShoppingBag, ArrowRight, Compass, Check } from 'lucide-react';

interface CuratorsIndexSectionProps {
  volumes: Volume[];
  onSelectVolume: (volume: Volume) => void;
  onAddToCart: (volume: Volume) => void;
  onOpenPreview?: (volume: Volume) => void;
}

type EraFilter = 'ALL' | 'CLASSICAL' | '19TH CENTURY' | '20TH CENTURY' | 'MODERN';
type MoodFilter = 'ALL' | 'REFLECTIVE' | 'ROMANTIC' | 'DARK' | 'HOPEFUL' | 'INTELLECTUAL';
type LengthFilter = 'ALL' | 'SHORT' | 'MEDIUM' | 'LONG';
type GenreFilter = 'ALL' | 'FICTION' | 'PHILOSOPHY' | 'CLASSICS' | 'THRILLER';

interface CuratedProfile {
  volId: string;
  era: EraFilter;
  mood: MoodFilter[];
  genre: GenreFilter;
  curatorNote: string;
  readingSetting: string;
}

const CURATED_PROFILES: CuratedProfile[] = [
  {
    volId: 'vol-01', // Gatsby
    era: '20TH CENTURY',
    mood: ['REFLECTIVE', 'ROMANTIC', 'INTELLECTUAL'],
    genre: 'CLASSICS',
    curatorNote: 'A restrained study of ephemeral wealth and yearning on Long Island. Best accompanied by rain against windowpanes.',
    readingSetting: 'Twilight salon, soft brass lamplight',
  },
  {
    volId: 'vol-02', // 1984
    era: '20TH CENTURY',
    mood: ['DARK', 'INTELLECTUAL'],
    genre: 'FICTION',
    curatorNote: 'An unsparing dissection of truth, surveillance, and cognitive rebellion. Demands quiet, uninterrupted scrutiny.',
    readingSetting: 'Late evening desk study',
  },
  {
    volId: 'vol-03', // Dorian Gray
    era: '19TH CENTURY',
    mood: ['DARK', 'REFLECTIVE', 'ROMANTIC'],
    genre: 'CLASSICS',
    curatorNote: 'Decadence and moral decay rendered in peerless Victorian prose. An intoxicating study of artistic aestheticism.',
    readingSetting: 'Velvet wingback chair, quiet midnight',
  },
  {
    volId: 'vol-04', // Meditations
    era: 'CLASSICAL',
    mood: ['INTELLECTUAL', 'REFLECTIVE'],
    genre: 'PHILOSOPHY',
    curatorNote: 'Private wartime notes written in imperial tents along the Danube. A daily compass for sovereign inner fortitude.',
    readingSetting: 'Early morning coffee before dawn',
  },
  {
    volId: 'vol-05', // Frankl
    era: '20TH CENTURY',
    mood: ['HOPEFUL', 'REFLECTIVE', 'INTELLECTUAL'],
    genre: 'PHILOSOPHY',
    curatorNote: 'A transcendent testament that human dignity can outshine the deepest barbarism. Essential reading for clarity.',
    readingSetting: 'Solitary weekend afternoon',
  },
  {
    volId: 'vol-06', // The Stranger
    era: '20TH CENTURY',
    mood: ['DARK', 'REFLECTIVE', 'INTELLECTUAL'],
    genre: 'PHILOSOPHY',
    curatorNote: 'The searing Algerian sun and emotional austerity collide in Camus’s existential triumph.',
    readingSetting: 'Blinding afternoon light, coastal silence',
  },
  {
    volId: 'vol-07', // Crime & Punishment
    era: '19TH CENTURY',
    mood: ['DARK', 'INTELLECTUAL', 'HOPEFUL'],
    genre: 'CLASSICS',
    curatorNote: 'St. Petersburg summer fever and the heavy weight of conscience. Psychological suspense of the highest order.',
    readingSetting: 'Winter hearth, deep midnight study',
  },
  {
    volId: 'vol-08', // Psychology of Money
    era: 'MODERN',
    mood: ['INTELLECTUAL', 'HOPEFUL'],
    genre: 'PHILOSOPHY',
    curatorNote: 'A gentle, counter-intuitive exploration of human behavior over spreadsheets. Reassuring and deeply pragmatic.',
    readingSetting: 'Morning train carriage, notebook at hand',
  },
  {
    volId: 'vol-09', // Atomic Habits
    era: 'MODERN',
    mood: ['HOPEFUL', 'INTELLECTUAL'],
    genre: 'PHILOSOPHY',
    curatorNote: 'The quiet compound interest of self-improvement. Elegant systems over volatile motivation.',
    readingSetting: 'Desk calendar planning session',
  },
  {
    volId: 'vol-10', // Deep Work
    era: 'MODERN',
    mood: ['INTELLECTUAL', 'REFLECTIVE'],
    genre: 'PHILOSOPHY',
    curatorNote: 'A rigorous defense of cognitive craftsmanship against the fractured tide of modern notifications.',
    readingSetting: 'Analog writing desk, fountain pen ready',
  },
];

export const CuratorsIndexSection: React.FC<CuratorsIndexSectionProps> = ({
  volumes,
  onSelectVolume,
  onAddToCart,
  onOpenPreview,
}) => {
  const [selectedEra, setSelectedEra] = useState<EraFilter>('ALL');
  const [selectedMood, setSelectedMood] = useState<MoodFilter>('REFLECTIVE');
  const [selectedLength, setSelectedLength] = useState<LengthFilter>('ALL');
  const [selectedGenre, setSelectedGenre] = useState<GenreFilter>('ALL');
  const [activeVolumeId, setActiveVolumeId] = useState<string>('vol-01');

  // Filter volumes based on criteria
  const matchingVolumes = useMemo(() => {
    return volumes.filter((vol) => {
      const profile = CURATED_PROFILES.find((p) => p.volId === vol.id);
      if (!profile) return false;

      // Era
      if (selectedEra !== 'ALL' && profile.era !== selectedEra) return false;

      // Mood
      if (selectedMood !== 'ALL' && !profile.mood.includes(selectedMood)) return false;

      // Genre
      if (selectedGenre !== 'ALL' && profile.genre !== selectedGenre) return false;

      // Length
      const pages = vol.physicalDimensions?.pageCount || 250;
      if (selectedLength === 'SHORT' && pages > 200) return false;
      if (selectedLength === 'MEDIUM' && (pages <= 200 || pages > 350)) return false;
      if (selectedLength === 'LONG' && pages <= 350) return false;

      return true;
    });
  }, [volumes, selectedEra, selectedMood, selectedLength, selectedGenre]);

  // Primary active book
  const activeBook = useMemo(() => {
    if (matchingVolumes.length === 0) return volumes[0];
    const match = matchingVolumes.find((v) => v.id === activeVolumeId);
    return match || matchingVolumes[0];
  }, [matchingVolumes, activeVolumeId, volumes]);

  const activeProfile = useMemo(() => {
    return CURATED_PROFILES.find((p) => p.volId === activeBook.id) || CURATED_PROFILES[0];
  }, [activeBook]);

  return (
    <section className="py-20 sm:py-28 border-t border-[#E8E5DF] bg-[#FAF8F5] relative select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Pure Editorial Typographic Identity */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-[#E8E5DF] gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] font-mono tracking-[0.24em] uppercase font-semibold text-[#16120F]">
              <Compass className="w-3.5 h-3.5 text-[#16120F]" />
              <span>SECTION 06 / CATALOGUE CURATION</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#16120F] tracking-tight uppercase mt-1">
              THE CURATOR&apos;S INDEX
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-[#6B6359] mt-1.5">
              A more deliberate way to find your next book.
            </p>
          </div>

          <div className="text-[11px] font-mono text-[#6B6359] uppercase tracking-wider">
            <span>{matchingVolumes.length} CANONICAL VOLUMES MATCHING CRITERIA</span>
          </div>
        </div>

        {/* 
          COMPACT FILTERS MATRIX
          Compact segmented buttons for Era, Mood, Length, Genre
        */}
        <div className="bg-white border border-[#E8E5DF] rounded-[3px] p-5 sm:p-7 shadow-xs mb-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. ERA */}
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C857B] mb-2 font-semibold">
                HISTORICAL ERA:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(['ALL', '20TH CENTURY', '19TH CENTURY', 'CLASSICAL', 'MODERN'] as EraFilter[]).map((era) => (
                  <button
                    key={era}
                    type="button"
                    onClick={() => { setSelectedEra(era); }}
                    className={`px-2.5 py-1 text-[10.5px] font-mono rounded-[2px] transition-all cursor-pointer ${
                      selectedEra === era
                        ? 'bg-[#16120F] text-white font-bold'
                        : 'bg-[#F8F7F4] text-[#6B6359] hover:bg-[#EFECE5] hover:text-[#16120F]'
                    }`}
                  >
                    {era}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. MOOD */}
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C857B] mb-2 font-semibold">
                ATMOSPHERIC MOOD:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(['ALL', 'REFLECTIVE', 'ROMANTIC', 'DARK', 'HOPEFUL', 'INTELLECTUAL'] as MoodFilter[]).map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => { setSelectedMood(mood); }}
                    className={`px-2.5 py-1 text-[10.5px] font-mono rounded-[2px] transition-all cursor-pointer ${
                      selectedMood === mood
                        ? 'bg-[#16120F] text-white font-bold'
                        : 'bg-[#F8F7F4] text-[#6B6359] hover:bg-[#EFECE5] hover:text-[#16120F]'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. LENGTH */}
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C857B] mb-2 font-semibold">
                FOLIO VOLUME LENGTH:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(['ALL', 'SHORT', 'MEDIUM', 'LONG'] as LengthFilter[]).map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => { setSelectedLength(len); }}
                    className={`px-2.5 py-1 text-[10.5px] font-mono rounded-[2px] transition-all cursor-pointer ${
                      selectedLength === len
                        ? 'bg-[#16120F] text-white font-bold'
                        : 'bg-[#F8F7F4] text-[#6B6359] hover:bg-[#EFECE5] hover:text-[#16120F]'
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. GENRE */}
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C857B] mb-2 font-semibold">
                LITERARY CLASSIFICATION:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(['ALL', 'CLASSICS', 'PHILOSOPHY', 'FICTION'] as GenreFilter[]).map((gen) => (
                  <button
                    key={gen}
                    type="button"
                    onClick={() => { setSelectedGenre(gen); }}
                    className={`px-2.5 py-1 text-[10.5px] font-mono rounded-[2px] transition-all cursor-pointer ${
                      selectedGenre === gen
                        ? 'bg-[#16120F] text-white font-bold'
                        : 'bg-[#F8F7F4] text-[#6B6359] hover:bg-[#EFECE5] hover:text-[#16120F]'
                    }`}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 
          INDEX RESULT PANEL: An Old Intelligent Catalogue Page Turned Digitally
        */}
        <div className="bg-white border border-[#E8E5DF] rounded-[3px] p-6 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Physical Book Spine & Leatherette Texture Showcase */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#F8F7F4] border border-[#E8E5DF] rounded-[2px] min-h-[380px] relative overflow-hidden group">
            
            {/* Spine Mockup with Gold Foil Stamping */}
            <div
              onClick={() => onSelectVolume(activeBook)}
              className="relative w-28 sm:w-32 h-[340px] rounded-[2px] shadow-[0_15px_35px_rgba(0,0,0,0.25)] flex flex-col justify-between p-4 cursor-pointer transition-transform duration-300 group-hover:-translate-y-2"
              style={{
                backgroundColor: activeBook.spineColor,
                boxShadow: `0 16px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1) inset`,
              }}
            >
              {/* Top Gilded Head */}
              <div className="h-2.5 bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] rounded-t-xs -mt-1 -mx-2 opacity-90 shadow-inner" />

              {/* Volume Number */}
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-center font-bold" style={{ color: activeBook.foilColor }}>
                {activeBook.volString}
              </div>

              {/* Title Vertical / Rotated */}
              <div className="my-auto py-4 text-center">
                <h4
                  className="font-serif font-bold text-sm sm:text-base tracking-[0.14em] uppercase leading-tight line-clamp-3"
                  style={{ color: activeBook.foilColor }}
                >
                  {activeBook.title}
                </h4>
                <p className="text-[9px] font-mono text-white/80 uppercase tracking-widest mt-2 truncate">
                  {activeBook.author}
                </p>
              </div>

              {/* Publisher Monogram */}
              <div className="text-[8px] font-mono tracking-widest text-center text-white/60">
                THE GROOVE · MMXXVI
              </div>
            </div>

            <div className="text-[9.5px] font-mono text-[#8C857B] uppercase tracking-wider mt-4">
              CLICK SPINE TO INSPECT FULL CANONICAL BINDING
            </div>
          </div>

          {/* Right Side: Curator's Recommendation Dossier */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Metadata */}
            <div className="space-y-1.5 border-b border-[#E8E5DF] pb-4">
              <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C857B]">
                <span className="font-bold text-[#16120F]">{activeProfile.era}</span>
                <span>·</span>
                <span>{activeBook.publishedYear}</span>
                <span>·</span>
                <span>{activeBook.physicalDimensions?.pageCount || 240} PAGES</span>
                <span>·</span>
                <span>{activeBook.bindingSpecs.format}</span>
              </div>

              <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#16120F] tracking-tight uppercase">
                {activeBook.title}
              </h3>
              
              <div className="font-mono text-xs sm:text-sm text-[#6B6359]">
                BY {activeBook.author.toUpperCase()}
              </div>
            </div>

            {/* Curator's Reading Note */}
            <div className="space-y-2 bg-[#F8F7F4] p-4 sm:p-5 rounded-[2px] border-l-2 border-[#16120F]">
              <span className="text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#16120F] font-bold block">
                CURATOR&apos;S DOSSIER NOTE:
              </span>
              <p className="font-serif italic text-base sm:text-lg text-[#16120F] leading-snug">
                &ldquo;{activeProfile.curatorNote}&rdquo;
              </p>
              <div className="text-[10px] font-mono text-[#8C857B] pt-1">
                RECOMMENDED SETTING: {activeProfile.readingSetting.toUpperCase()}
              </div>
            </div>

            {/* Synopsis */}
            <p className="text-xs sm:text-[13px] text-[#524B43] leading-relaxed">
              {activeBook.synopsis}
            </p>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onAddToCart(activeBook)}
                className="bg-[#16120F] hover:bg-black text-white text-xs font-mono uppercase tracking-wider py-3.5 px-6 rounded-[2px] font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs hover:scale-[1.01] active:scale-[0.99]"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#A88A45]" />
                <span>ADD TO BAG (${activeBook.price.toFixed(2)})</span>
              </button>

              {onOpenPreview && (
                <button
                  type="button"
                  onClick={() => onOpenPreview(activeBook)}
                  className="bg-white hover:bg-[#F8F7F4] text-[#16120F] border border-[#E8E5DF] text-xs font-mono uppercase tracking-wider py-3.5 px-5 rounded-[2px] font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#6B6359]" />
                  <span>READ SAMPLE PAGES</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onSelectVolume(activeBook)}
                className="text-xs font-mono uppercase tracking-wider text-[#6B6359] hover:text-[#16120F] flex items-center gap-1.5 ml-auto py-2 transition-colors cursor-pointer"
              >
                <span>FULL PROVENANCE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Secondary Matches Rail if multiple */}
            {matchingVolumes.length > 1 && (
              <div className="pt-4 border-t border-[#E8E5DF]">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8C857B] block mb-2">
                  OTHER RELEVANT CATALOGUE MATCHES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {matchingVolumes.map((vol) => (
                    <button
                      key={vol.id}
                      type="button"
                      onClick={() => setActiveVolumeId(vol.id)}
                      className={`text-[10px] font-mono px-3 py-1.5 rounded-[2px] border transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeBook.id === vol.id
                          ? 'border-[#16120F] bg-white font-bold text-[#16120F] shadow-xs'
                          : 'border-[#E8E5DF] bg-[#F8F7F4] text-[#6B6359] hover:bg-white hover:text-[#16120F]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: vol.spineColor }} />
                      <span>{vol.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
