import React from 'react';
import { Volume } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ReadingRoomSectionProps {
  volumes: Volume[];
  onSelectVolume: (vol: Volume) => void;
  onAddToCart: (vol: Volume, qty: number) => void;
}

export const ReadingRoomSection: React.FC<ReadingRoomSectionProps> = ({
  volumes,
  onSelectVolume,
  onAddToCart,
}) => {
  const pairings = [
    {
      title: 'POWER & INTERIORITY',
      subtitle: 'External surveillance meets the internal subconscious',
      book1: volumes.find(v => v.id === 'vol-02') || volumes[1], // 1984
      book2: volumes.find(v => v.id === 'vol-10') || volumes[9], // The Mountain Is You
      curatorialNote: 'Pairing George Orwell’s timeless warning against authoritarian orthodoxy with Brianna Wiest’s modern study in conquering self-sabotage.'
    },
    {
      title: 'THE ILLUSION OF AFFLUENCE',
      subtitle: 'Roaring Twenties ambition meets behavioral financial psychology',
      book1: volumes.find(v => v.id === 'vol-01') || volumes[0], // The Great Gatsby
      book2: volumes.find(v => v.id === 'vol-11') || volumes[10], // Psychology of Money
      curatorialNote: 'Fitzgerald’s tragic study of status and longing viewed through Morgan Housel’s insight that wealth is what you don’t spend.'
    },
    {
      title: 'SHADOWS OF OBSESSION',
      subtitle: 'Victorian decadence meets contemporary psychological noir',
      book1: volumes.find(v => v.id === 'vol-03') || volumes[2], // Dorian Gray
      book2: volumes.find(v => v.id === 'vol-09') || volumes[8], // The Boyfriend
      curatorialNote: 'Oscar Wilde’s Faustian pact on beauty alongside Freida McFadden’s high-velocity examination of trust and lethal secrets.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-[#E7E2D6] bg-[#F6F4EE] relative select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 pb-4 border-b border-[#DDD5C7]">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#BC472A] uppercase font-semibold">
            03 / CURATORIAL DIALOGUES
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#1C1917] tracking-tight uppercase mt-1">
            CANONICAL LITERARY PAIRINGS
          </h2>
          <p className="text-xs sm:text-[13px] text-[#6B6359] max-w-xl font-normal mt-1">
            Carefully juxtaposed editions from our stacks designed to be read in conversation across centuries and genres.
          </p>
        </div>

        {/* 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pairings.map((pair, idx) => (
            <div
              key={idx}
              className="bg-[#FAF8F5] border border-[#DDD5C7] rounded-[2px] p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#BC472A] uppercase font-semibold">
                    DIALOGUE {idx + 1}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#1C1917] uppercase tracking-tight mt-0.5">
                    {pair.title}
                  </h3>
                  <p className="text-xs font-serif italic text-[#7A7165]">
                    {pair.subtitle}
                  </p>
                </div>

                {/* Two Spines resting side-by-side */}
                <div className="flex items-end justify-center gap-3 py-6 bg-[#EFECE5] rounded-[2px] border border-[#E2DBD0] px-4">
                  {/* Book 1 */}
                  <div
                    onClick={() => onSelectVolume(pair.book1)}
                    className="w-10 h-44 rounded-t-[2px] flex flex-col justify-between items-center py-2 cursor-pointer shadow-md transition-transform hover:-translate-y-2"
                    style={{ backgroundColor: pair.book1.spineColor }}
                  >
                    <span className="text-[8px] text-[#E2C26E] font-serif">✦</span>
                    <span
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      className="text-[9px] font-serif uppercase tracking-wider text-white truncate max-h-28"
                    >
                      {pair.book1.title}
                    </span>
                    <span className="text-[8px] font-mono text-[#D4AF37]">{pair.book1.volString}</span>
                  </div>

                  {/* Intersect icon */}
                  <div className="text-xs font-serif italic text-[#8C827A] pb-12">
                    &amp;
                  </div>

                  {/* Book 2 */}
                  <div
                    onClick={() => onSelectVolume(pair.book2)}
                    className="w-10 h-44 rounded-t-[2px] flex flex-col justify-between items-center py-2 cursor-pointer shadow-md transition-transform hover:-translate-y-2"
                    style={{ backgroundColor: pair.book2.spineColor }}
                  >
                    <span className="text-[8px] text-[#E2C26E] font-serif">✦</span>
                    <span
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      className="text-[9px] font-serif uppercase tracking-wider text-white truncate max-h-28"
                    >
                      {pair.book2.title}
                    </span>
                    <span className="text-[8px] font-mono text-[#D4AF37]">{pair.book2.volString}</span>
                  </div>
                </div>

                <p className="text-xs text-[#524A40] leading-relaxed">
                  {pair.curatorialNote}
                </p>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-[#EAE4D8] flex items-center justify-between">
                <span className="font-mono text-xs text-[#1C1917] font-semibold">
                  PAIR TOTAL: ${(pair.book1.price + pair.book2.price).toFixed(2)}
                </span>
                <button
                  onClick={() => {
                    onAddToCart(pair.book1, 1);
                    onAddToCart(pair.book2, 1);
                  }}
                  className="bg-[#1C1917] hover:bg-black text-[#FAF8F5] px-3.5 py-1.5 rounded-[2px] text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer select-none"
                >
                  <Sparkles className="w-3 h-3 text-[#E2C26E]" />
                  <span>ACQUIRE PAIR</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
