import React, { useState } from 'react';
import { Disc3, Play, Pause, Volume2, Sparkles, Music } from 'lucide-react';

interface SoundscapeTrack {
  id: string;
  volumeTitle: string;
  author: string;
  soundscapeName: string;
  tempoBpm: string;
  acousticElements: string[];
  curatorialNote: string;
  vinylColor: string;
  accentColor: string;
}

const TRACKS: SoundscapeTrack[] = [
  {
    id: 'gatsby',
    volumeTitle: 'THE GREAT GATSBY',
    author: 'F. Scott Fitzgerald',
    soundscapeName: 'Long Island Rain & 78rpm Jazz Crackle',
    tempoBpm: '64 BPM · Lento',
    acousticElements: ['Summer veranda rain', 'Muted brass trumpet', 'Vintage 1925 shellac surface noise', 'Faint harbor buoy'],
    curatorialNote: 'Crafted to reflect Jay Gatsby’s nocturnal vigilance across the bay. The warm analog crackle mirrors the ephemeral glamour and haunting melancholy of West Egg.',
    vinylColor: '#1A292C',
    accentColor: '#4A7C59',
  },
  {
    id: 'meditations',
    volumeTitle: 'MEDITATIONS',
    author: 'Marcus Aurelius',
    soundscapeName: 'Danubian Campfire & Monastic Wind',
    tempoBpm: '48 BPM · Adagio',
    acousticElements: ['Distant tent wind', 'Low Tibetan prayer chime', 'Crackling dry oak embers', 'Distant nocturnal river'],
    curatorialNote: 'Recorded at dawn in Carnuntum. A solitary, meditative ambient soundscape designed to ground the mind in stoic tranquility and detachment.',
    vinylColor: '#4A1D24',
    accentColor: '#C28D5A',
  },
  {
    id: '1984',
    volumeTitle: '1984',
    author: 'George Orwell',
    soundscapeName: 'Ministry of Truth Tape Drone & Resonant Cellos',
    tempoBpm: '56 BPM · Grave',
    acousticElements: ['Low analog tape flutter', 'Bowed contrabass cello', 'Subterranean mechanical hum', 'Subtle telegraph pulse'],
    curatorialNote: 'A tense, hypnotic sonic field echoing Winston Smith’s solitary diary entries. Deep low-frequency warmth that sharpens focus for nocturnal reading.',
    vinylColor: '#2B2B2B',
    accentColor: '#BC472A',
  },
  {
    id: 'hobbit',
    volumeTitle: 'THE HOBBIT',
    author: 'J.R.R. Tolkien',
    soundscapeName: 'The Shire Hearth & Oxford Woodland Flute',
    tempoBpm: '72 BPM · Andante',
    acousticElements: ['Celtic wooden flute', 'Hobbiton hearth fire', 'Bramble woodland breeze', 'Acoustic nylon lute'],
    curatorialNote: 'Inspired by Tolkien’s walks through the Berkshire and Oxfordshire meadows. Warm, nostalgic, and joyful accompaniment for heroic adventure.',
    vinylColor: '#2E4A3D',
    accentColor: '#D4AF37',
  },
];

export const ListeningSalonSection: React.FC = () => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const activeTrack = TRACKS[activeTrackIndex];

  return (
    <section className="py-16 sm:py-24 border-t border-[#E7E2D6] bg-[#FAF8F5] relative select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#DDD5C7] gap-3">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#BC472A] uppercase font-semibold">
              <Music className="w-3.5 h-3.5" />
              <span>05 / ACOUSTIC CANON COMPANION</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1C1917] tracking-tight uppercase mt-1">
              THE CURATORIAL LISTENING SALON
            </h2>
          </div>
          <div className="text-xs font-mono text-[#7A7165]">
            ANALOG TAPE &amp; VINYL SOUNDSCAPES FOR LITERARY IMMERSION
          </div>
        </div>

        {/* 2-Column Salon Player */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#18130F] text-[#FAF8F5] rounded-[4px] p-6 sm:p-10 border border-[#2D221A] shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Background Warmth */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#BC472A]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Vinyl Turntable & Animated Frequency Rhythm */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
            
            {/* Rotating Vinyl Record Mockup */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
              
              {/* Outer Grooved Vinyl Disc */}
              <div
                className={`w-full h-full rounded-full bg-[#0D0A08] border-4 border-[#241C16] shadow-2xl relative flex items-center justify-center transition-transform ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '9s', animationTimingFunction: 'linear' }}
              >
                {/* Vinyl Grooves Texture */}
                <div className="absolute inset-4 rounded-full border border-white/5 opacity-70" />
                <div className="absolute inset-8 rounded-full border border-white/5 opacity-70" />
                <div className="absolute inset-12 rounded-full border border-white/5 opacity-70" />
                <div className="absolute inset-16 rounded-full border border-white/5 opacity-70" />

                {/* Central Record Label */}
                <div
                  className="w-20 h-20 rounded-full border-2 border-[#D4AF37] flex flex-col items-center justify-center shadow-md p-2 text-center"
                  style={{ backgroundColor: activeTrack.vinylColor }}
                >
                  <div className="text-[7.5px] font-mono text-[#E2C26E] uppercase font-bold tracking-tight">
                    THE GROOVE
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#18130F] border border-white/30 my-0.5" />
                  <div className="text-[6.5px] font-mono text-white/80 uppercase">
                    33⅓ RPM
                  </div>
                </div>
              </div>

              {/* Tonearm Needle Mockup */}
              <div
                className={`absolute top-0 right-3 w-16 h-28 pointer-events-none transition-transform duration-700 origin-top-right ${
                  isPlaying ? 'rotate-12 translate-x-2 translate-y-1' : '-rotate-12'
                }`}
              >
                <div className="w-1.5 h-20 bg-gradient-to-b from-[#8C827A] to-[#D4AF37] rounded-full mx-auto" />
                <div className="w-3 h-4 bg-[#1C1917] border border-[#D4AF37] rounded-[1px] mx-auto -mt-1" />
              </div>
            </div>

            {/* Simulated Live Audio Spectrum Rhythm Bars */}
            <div className="flex items-end justify-center gap-1.5 h-8 mt-6">
              {[18, 35, 60, 85, 45, 95, 70, 40, 80, 50, 30, 65, 90, 45, 20].map((height, i) => (
                <div
                  key={i}
                  className={`w-1 bg-gradient-to-t from-[#BC472A] to-[#E2C26E] rounded-full transition-all duration-300 ${
                    isPlaying ? 'opacity-90' : 'opacity-25'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(6, (height * (1 + (i % 3) * 0.2)) % 100)}%` : '15%',
                    transitionDelay: `${i * 35}ms`,
                  }}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Track Information & Literary Pairing Notes */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Running Kicker */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                PAIRING: {activeTrack.volumeTitle} · {activeTrack.author}
              </span>
              <span className="text-[10px] font-mono text-[#8C827A]">
                {activeTrack.tempoBpm}
              </span>
            </div>

            {/* Track Title */}
            <div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase leading-snug">
                {activeTrack.soundscapeName}
              </h3>
              <p className="text-xs sm:text-sm text-[#C5BBAA] leading-relaxed mt-2 font-normal">
                {activeTrack.curatorialNote}
              </p>
            </div>

            {/* Acoustic Elements Badges */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-mono text-[#8C827A] uppercase tracking-wider">
                SONIC MASTERING TEXTURES:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {activeTrack.acousticElements.map((el, i) => (
                  <span
                    key={i}
                    className="text-[10.5px] font-mono text-[#E2C26E] bg-white/5 border border-white/10 px-2.5 py-1 rounded-[2px]"
                  >
                    ✦ {el}
                  </span>
                ))}
              </div>
            </div>

            {/* Controls Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                {/* Main Play/Pause Button */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-[#BC472A] hover:bg-[#A3381F] text-white px-5 py-2.5 rounded-[2px] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" />
                      <span>PAUSE SOUNDSCAPE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>PLAY SOUNDSCAPE</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#A6998A]">
                  <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>320kbps Lossless FLAC</span>
                </div>
              </div>

              {/* Track Selection Tabs */}
              <div className="flex items-center gap-1.5">
                {TRACKS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTrackIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`w-7 h-7 rounded-[2px] text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeTrackIndex === idx
                        ? 'bg-[#E2C26E] text-[#18130F]'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    title={t.soundscapeName}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
