import React, { useState } from 'react';
import { HogwartsHouse, WandProduct, Volume } from '../types';
import { HOGWARTS_HOUSES } from '../data/houses';
import { CanonicalWandSVG } from './CanonicalWandSVG';
import { ShoppingBag, Check, Lock, ShieldCheck, Sparkles, Filter, X } from 'lucide-react';

interface HouseArsenalSectionProps {
  house: HogwartsHouse;
  userPoints: number;
  onAddWandToCart: (wandVolume: Volume, pointCost: number) => void;
}

export const CANONICAL_WANDS_CATALOG: WandProduct[] = [
  {
    id: 'wand_dumbledore',
    name: 'THE ELDER WAND',
    wielder: 'Albus Dumbledore',
    signature: 'Albus Dumbledore',
    edition: 'DEATHLY HALLOWS CANONICAL FOLIO',
    wood: 'Aged Elder Wood',
    core: 'Thestral Tail Hair Core',
    length: '15 Inches',
    flexibility: 'Unyielding & Supreme',
    drawerNumber: 'DRAWER NO. 01',
    specimenRarity: 'SUPREME SPECIMEN',
    categoryGroup: 'masters',
    pointCost: 150,
    moneyPriceUsd: 99.0,
    description: 'The supreme instrument of transfiguration. Carved with elderberry cluster spheres, runic bone inlay, and a hollow perforated pommel.',
    lore: 'The most powerful wand in wizarding history. Possesses an affinity for masters who do not fear mortality.',
    accentColor: '#A88A45',
    silhouetteType: 'dumbledore',
  },
  {
    id: 'wand_harry',
    name: 'HOLLY & PHOENIX WAND',
    wielder: 'Harry Potter',
    signature: 'Harry Potter',
    edition: 'CHOSEN ONE CANONICAL REPOSITORY',
    wood: 'Rare Woodland Holly',
    core: 'Fawkes Molted Phoenix Feather',
    length: '11 Inches',
    flexibility: 'Supple & Responsive',
    drawerNumber: 'DRAWER NO. 02',
    specimenRarity: 'RESERVED BROTHER SPECIMEN',
    categoryGroup: 'students',
    pointCost: 50,
    moneyPriceUsd: 49.0,
    description: 'A dark, rugged woodland tree-bark handle that flows naturally into a warm, reddish-brown smooth tapering shaft.',
    lore: 'Brother wand to Lord Voldemort\'s instrument, sharing a feather from Dumbledore\'s phoenix Fawkes.',
    accentColor: '#7A1018',
    silhouetteType: 'harry',
  },
  {
    id: 'wand_hermione',
    name: 'VINE & DRAGON WAND',
    wielder: 'Hermione Granger',
    signature: 'Hermione Granger',
    edition: 'SCHOLASTIC ATELIER EDITION',
    wood: 'Carved European Vine Wood',
    core: 'Dragon Heartstring Core',
    length: '10¾ Inches',
    flexibility: 'Pliant & Exacting',
    drawerNumber: 'DRAWER NO. 03',
    specimenRarity: 'EXECUTIVE PROVENANCE',
    categoryGroup: 'students',
    pointCost: 50,
    moneyPriceUsd: 49.0,
    description: 'Intricately hand-carved intertwining botanical ivy vines and raised leaves enveloping the grip and extending along the shaft.',
    lore: 'Vine wands seek owners whose depths are not readily apparent. Exceptional in charmwork and complex transfiguration.',
    accentColor: '#A88A45',
    silhouetteType: 'hermione',
  },
  {
    id: 'wand_ron',
    name: 'WILLOW & UNICORN WAND',
    wielder: 'Ron Weasley',
    signature: 'Ron Weasley',
    edition: 'HONORARY CONSERVATOR EDITION',
    wood: 'Solid River Willow',
    core: 'Unicorn Hair Core',
    length: '14 Inches',
    flexibility: 'Yielding & Loyal',
    drawerNumber: 'DRAWER NO. 04',
    specimenRarity: 'HERITAGE SPECIMEN',
    categoryGroup: 'students',
    pointCost: 40,
    moneyPriceUsd: 39.0,
    description: 'An ergonomic swollen organic bulb pommel with hand-planed faceted fluting running along the warm amber-orange shaft.',
    lore: 'Purchased by Ron Weasley with family galleons. Willow wands have an affinity for healers and steadfast companions.',
    accentColor: '#B08A27',
    silhouetteType: 'ron',
  },
  {
    id: 'wand_neville',
    name: 'CHERRY & UNICORN WAND',
    wielder: 'Neville Longbottom',
    signature: 'Neville Longbottom',
    edition: 'HERBOLOGY MASTER EDITION',
    wood: 'Orchard Cherry Wood',
    core: 'Unicorn Tail Hair Core',
    length: '13 Inches',
    flexibility: 'Resolute & Balanced',
    drawerNumber: 'DRAWER NO. 05',
    specimenRarity: 'VALIANT SPECIMEN',
    categoryGroup: 'students',
    pointCost: 40,
    moneyPriceUsd: 39.0,
    description: 'Featuring a distinctive twisted double-helix braided rope spiral grip on warm honey cherry with an annular collar.',
    lore: 'Crafted as Neville\'s second wand following the Department of Mysteries battle, signaling his flowering courage.',
    accentColor: '#A88A45',
    silhouetteType: 'neville',
  },
  {
    id: 'wand_ginny',
    name: 'TWISTED YEW WAND',
    wielder: 'Ginny Weasley',
    signature: 'Ginny Weasley',
    edition: 'DUELING GUILD EDITION',
    wood: 'Carved Charcoal Yew',
    core: 'Dragon Heartstring Core',
    length: '11 Inches',
    flexibility: 'Whippy & Sharp',
    drawerNumber: 'DRAWER NO. 06',
    specimenRarity: 'CLASS I REGISTRATION',
    categoryGroup: 'students',
    pointCost: 45,
    moneyPriceUsd: 45.0,
    description: 'A pitch-black ebony finish featuring a double-spiral barley-twist carved handle with an ultra-slender straight shaft.',
    lore: 'Renowned for casting explosive Bat-Bogey Hexes and fierce defensive charms during the Battle of Hogwarts.',
    accentColor: '#16120F',
    silhouetteType: 'ginny',
  },
  {
    id: 'wand_mcgonagall',
    name: 'FIR & AMBER WAND',
    wielder: 'Minerva McGonagall',
    signature: 'Minerva McGonagall',
    edition: 'HEADMISTRESS CANONICAL FOLIO',
    wood: 'Scottish Highlands Fir',
    core: 'Dragon Heartstring Core',
    length: '9½ Inches',
    flexibility: 'Rigid & Precise',
    drawerNumber: 'DRAWER NO. 07',
    specimenRarity: 'HEAD OF HOUSE SPECIMEN',
    categoryGroup: 'masters',
    pointCost: 80,
    moneyPriceUsd: 69.0,
    description: 'Turned architectural baluster spindle handle with carved urn beads, genuine rounded amber gemstone finial, and slender graphite shaft.',
    lore: 'Wielded by the Transfiguration master to animate the suits of armor with the "Piertotum Locomotor" defensive charm.',
    accentColor: '#7A1018',
    silhouetteType: 'mcgonagall',
  },
  {
    id: 'wand_luna',
    name: 'TULIPWOOD FLOWER WAND',
    wielder: 'Luna Lovegood',
    signature: 'Luna Lovegood',
    edition: 'RAVENCLAW CURIOSITY EDITION',
    wood: 'Fine Carved Tulipwood',
    core: 'Unicorn Hair Core',
    length: '11 Inches',
    flexibility: 'Delicate & Intuitive',
    drawerNumber: 'DRAWER NO. 08',
    specimenRarity: 'ATELIER SPECIAL COMMISSION',
    categoryGroup: 'students',
    pointCost: 45,
    moneyPriceUsd: 45.0,
    description: 'Gracefully hand-carved with a four-petal tulip blossom cup handle that opens like a gentle botanical flower bud.',
    lore: 'Hand-crafted by Ollivander while held captive at Malfoy Manor as a sincere tribute to Luna\'s compassionate spirit.',
    accentColor: '#172C52',
    silhouetteType: 'luna',
  },
  {
    id: 'wand_voldemort',
    name: 'BONE & YEW WAND',
    wielder: 'Lord Voldemort',
    signature: 'Lord Voldemort',
    edition: 'DARK LORD ARCHIVAL SPECIMEN',
    wood: 'Antique Yew Wood & Fossil Bone',
    core: 'Fawkes Molted Phoenix Feather',
    length: '13½ Inches',
    flexibility: 'Rigid & Predatory',
    drawerNumber: 'DRAWER NO. 09',
    specimenRarity: 'RESTRICTED REPOSITORY SPECIMEN',
    categoryGroup: 'dark-arts',
    pointCost: 120,
    moneyPriceUsd: 89.0,
    description: 'An iconic pale bone-claw handle with a curved hooked raptor beak pommel, transitioning through mottled grey grain to ivory.',
    lore: 'The dark instrument that terrorized wizarding Britain for two wizarding wars. Formed a rare Priori Incantatem with Harry\'s wand.',
    accentColor: '#124C38',
    silhouetteType: 'voldemort',
  },
  {
    id: 'wand_snape',
    name: 'EMBOSSED EBONY WAND',
    wielder: 'Severus Snape',
    signature: 'Severus Snape',
    edition: 'POTIONS MASTER ARCHIVE',
    wood: 'Dense African Blackwood & Ebony',
    core: 'Dragon Heartstring Core',
    length: '13 Inches',
    flexibility: 'Rigid & Controlled',
    drawerNumber: 'DRAWER NO. 10',
    specimenRarity: 'MASTER OCCLUMENS SPECIMEN',
    categoryGroup: 'masters',
    pointCost: 90,
    moneyPriceUsd: 75.0,
    description: 'A matte pitch-black cylindrical grip intricately engraved with dual geometric relief diamond bands and a flush ferrule.',
    lore: 'Wielded with surgical economy of motion. Suited for master duelists, dark arts defense, and high-precision potion brewing.',
    accentColor: '#16120F',
    silhouetteType: 'snape',
  },
  {
    id: 'wand_bellatrix',
    name: 'CROOKED WALNUT WAND',
    wielder: 'Bellatrix Lestrange',
    signature: 'Bellatrix Lestrange',
    edition: 'DEATH EATER COMMAND SPECIMEN',
    wood: 'Aged Weathered Walnut',
    core: 'Dragon Heartstring Core',
    length: '12¾ Inches',
    flexibility: 'Unyielding & Volatile',
    drawerNumber: 'DRAWER NO. 11',
    specimenRarity: 'RESTRICTED COMBAT SPECIMEN',
    categoryGroup: 'dark-arts',
    pointCost: 90,
    moneyPriceUsd: 75.0,
    description: 'A dramatic, sharply bent crook elbow shaft resembling a predatory bird\'s raptor talon, finished with charred dark walnut grain.',
    lore: 'Described by Ollivander as "unyielding". Captured at Malfoy Manor and wielded by Hermione during the Gringotts break-in.',
    accentColor: '#124C38',
    silhouetteType: 'bellatrix',
  },
];

export const HouseArsenalSection: React.FC<HouseArsenalSectionProps> = ({
  house,
  userPoints,
  onAddWandToCart,
}) => {
  const houseData = HOGWARTS_HOUSES[house];
  const [activeCategory, setActiveCategory] = useState<'all' | 'students' | 'masters' | 'dark-arts'>('all');
  const [inspectedWand, setInspectedWand] = useState<WandProduct | null>(null);
  const [recentlyAcquiredId, setRecentlyAcquiredId] = useState<string | null>(null);

  // Filtered wands list
  const filteredWands = CANONICAL_WANDS_CATALOG.filter((wand) => {
    if (activeCategory === 'all') return true;
    return wand.categoryGroup === activeCategory;
  });

  const handleAcquire = (wand: WandProduct) => {
    if (userPoints < wand.pointCost) return;

    const wandVolume: Volume = {
      id: wand.id,
      volNum: 99,
      volString: 'ARSENAL',
      title: `${wand.name} (${wand.wielder})`,
      author: `Ollivanders Archive · ${wand.wood}`,
      price: wand.moneyPriceUsd,
      category: 'CLASSICS',
      spineColor: '#16120F',
      accentColor: wand.accentColor || houseData.colors.primary,
      foilColor: houseData.colors.secondary,
      publishedYear: 2026,
      isbn: `WND-${wand.pointCost}-${Math.round(wand.moneyPriceUsd)}`,
      stockCount: 6,
      synopsis: `${wand.description} (${wand.length}, ${wand.core}). Wielded by ${wand.wielder}. Redeemed with ${wand.pointCost} House Points.`,
      bindingSpecs: {
        clothDescription: `Hand-turned ${wand.wood} in apothecary velvet drawer chest`,
        format: `Wand ${wand.length}`,
        paperStock: 'Ollivanders Archival Certificate of Authenticity',
      },
      itemType: 'wand',
      pointCost: wand.pointCost,
      currencyPrice: `$${wand.moneyPriceUsd.toFixed(2)}`,
      woodType: wand.wood,
      coreType: wand.core,
    };

    setRecentlyAcquiredId(wand.id);
    onAddWandToCart(wandVolume, wand.pointCost);
    setTimeout(() => setRecentlyAcquiredId(null), 2500);
  };

  return (
    <section className="py-20 sm:py-28 border-t border-[#E8E5DF] bg-white relative select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Pure Editorial Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-[#E8E5DF] gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] font-mono tracking-[0.24em] uppercase font-semibold text-[#16120F]">
              <span style={{ color: houseData.colors.primary }}>✦</span>
              <span>SECTION 09 / CANONICAL WANDS COLLECTION</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#16120F] tracking-tight uppercase mt-1">
              THE WANDS OF HARRY POTTER
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-[#6B6359] mt-1.5">
              11 canonical instruments from the Ollivanders Archive, hand-drawn to historical proportions.
            </p>
          </div>

          {/* User Account Points Balance Badge */}
          <div className="flex items-center gap-3 bg-[#F8F7F4] border border-[#E8E5DF] px-4 py-2.5 rounded-[2px]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B6359]">
              HOUSE BALANCE:
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold text-[#16120F] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: houseData.colors.primary }} />
              <span>{userPoints} HOUSE POINTS</span>
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-xs font-mono">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-[2px] transition-colors cursor-pointer border ${
              activeCategory === 'all'
                ? 'bg-[#16120F] text-white border-[#16120F] font-semibold'
                : 'bg-[#F8F7F4] text-[#6B6359] border-[#E8E5DF] hover:bg-white hover:text-[#16120F]'
            }`}
          >
            ALL 11 CANONICAL WANDS
          </button>
          <button
            onClick={() => setActiveCategory('students')}
            className={`px-3.5 py-1.5 rounded-[2px] transition-colors cursor-pointer border ${
              activeCategory === 'students'
                ? 'bg-[#16120F] text-white border-[#16120F] font-semibold'
                : 'bg-[#F8F7F4] text-[#6B6359] border-[#E8E5DF] hover:bg-white hover:text-[#16120F]'
            }`}
          >
            GOLDEN TRIO &amp; HOGWARTS STUDENTS
          </button>
          <button
            onClick={() => setActiveCategory('masters')}
            className={`px-3.5 py-1.5 rounded-[2px] transition-colors cursor-pointer border ${
              activeCategory === 'masters'
                ? 'bg-[#16120F] text-white border-[#16120F] font-semibold'
                : 'bg-[#F8F7F4] text-[#6B6359] border-[#E8E5DF] hover:bg-white hover:text-[#16120F]'
            }`}
          >
            MASTERS &amp; FACULTY
          </button>
          <button
            onClick={() => setActiveCategory('dark-arts')}
            className={`px-3.5 py-1.5 rounded-[2px] transition-colors cursor-pointer border ${
              activeCategory === 'dark-arts'
                ? 'bg-[#16120F] text-white border-[#16120F] font-semibold'
                : 'bg-[#F8F7F4] text-[#6B6359] border-[#E8E5DF] hover:bg-white hover:text-[#16120F]'
            }`}
          >
            THE DARK ARTS
          </button>
        </div>

        {/* 
          ANTIQUE APOTHECARY CABINET GRID (11 WANDS)
          Dark mahogany & blackened oak finish, brass label pulls, velvet drawer beds,
          and exact canonical silhouette vectors with character signature typography
        */}
        <div className="bg-[#14110F] border border-[#241D18] rounded-[3px] p-4 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
          
          {/* Cabinet Frieze Header */}
          <div className="flex items-center justify-between border-b border-[#241D18] pb-3 mb-6 px-1">
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.2em] uppercase text-[#A88A45]">
              <span>SPECIMEN CABINET · OLLIVANDERS HERITAGE SPECIFICATIONS</span>
              <span className="text-white/20">|</span>
              <span className="text-[#8C857B]">{filteredWands.length} WANDS ENCLOSED</span>
            </div>
            <div className="text-[9.5px] font-mono text-[#8C857B] hidden sm:block">
              CLICK CARD TO INSPECT CANONICAL FOLIO SPECIFICATIONS
            </div>
          </div>

          {/* Grid of All 11 Canonical Wands */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredWands.map((wand) => {
              const hasEnoughPoints = userPoints >= wand.pointCost;
              const pointsNeeded = wand.pointCost - userPoints;
              const isAcquired = recentlyAcquiredId === wand.id;

              return (
                <div
                  key={wand.id}
                  onClick={() => setInspectedWand(wand)}
                  className="group relative bg-[#1B1613] border border-[#2B231D] hover:border-[#4E3F33] rounded-[2px] p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-[0_4px_16px_rgba(0,0,0,0.25)] cursor-pointer"
                >
                  {/* Apothecary Drawer Brass Label Pull */}
                  <div>
                    <div className="flex items-center justify-between border-b border-[#2B231D] pb-3 mb-4">
                      {/* Brass Nameplate Notch */}
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#A88A45] font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-xs bg-[#A88A45]" />
                        <span>{wand.drawerNumber}</span>
                      </span>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-[#8C857B]">
                        {wand.length}
                      </span>
                    </div>

                    {/* Wand Silhouette in Recessed Velvet Drawer Bed */}
                    <div className="h-28 bg-[#100D0B] rounded-[2px] border border-[#241C16] px-3 py-2 flex flex-col justify-center items-center relative overflow-hidden shadow-inner mb-4 group-hover:border-[#3D2F24] transition-colors">
                      {/* Velvet Cushion Radial Glow */}
                      <div className="absolute inset-0 bg-radial from-white/4 to-transparent pointer-events-none" />

                      {/* Precise Canonical Vector Silhouette from uploaded poster */}
                      <CanonicalWandSVG
                        silhouetteType={wand.silhouetteType}
                        className="w-full h-auto drop-shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                      />

                      {/* Handwritten Signature Script Label underneath */}
                      <div className="absolute bottom-1.5 inset-x-2 flex items-center justify-between text-[8px] font-mono">
                        <span className="font-serif italic text-white/70 tracking-wide text-[10px]">
                          {wand.signature}
                        </span>
                        <span className="text-[#A88A45] uppercase tracking-wider text-[7.5px] opacity-80">
                          {wand.wood.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Wand Title & Details */}
                    <div className="space-y-1">
                      <div className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-[#8C857B] flex items-center justify-between">
                        <span>WIELDER: {wand.wielder?.toUpperCase()}</span>
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-white tracking-wide uppercase leading-tight">
                        {wand.name}
                      </h3>
                      <div className="text-[10px] font-mono text-[#A88A45] pt-0.5">
                        {wand.wood} · {wand.core}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-[#A8A196] leading-relaxed mt-2.5 font-normal line-clamp-2">
                      {wand.description}
                    </p>
                  </div>

                  {/* Pricing Breakdown & Acquisition Action */}
                  <div
                    className="pt-4 mt-5 border-t border-[#2B231D] space-y-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Clear POINT COST + MONETARY PRICE IN USD ($) */}
                    <div className="bg-[#120E0C] border border-[#241C16] p-2.5 rounded-[2px] flex items-center justify-between text-xs font-mono">
                      <span className="text-[#8C857B] uppercase text-[9.5px]">REQUIREMENT:</span>
                      <strong className="text-white font-bold text-xs sm:text-[12.5px]">
                        {wand.pointCost} PTS + ${wand.moneyPriceUsd.toFixed(2)}
                      </strong>
                    </div>

                    {/* Action Button: Validates points */}
                    {hasEnoughPoints ? (
                      <button
                        type="button"
                        onClick={() => handleAcquire(wand)}
                        className="w-full bg-[#FAF8F5] hover:bg-white text-[#16120F] py-2.5 rounded-[2px] font-mono text-[10.5px] uppercase tracking-wider font-bold transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-[0.99]"
                      >
                        {isAcquired ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#124C38]" />
                            <span>ADDED TO BAG!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>ACQUIRE (${wand.moneyPriceUsd.toFixed(2)})</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="space-y-1">
                        <button
                          type="button"
                          disabled
                          className="w-full bg-[#181310] text-[#6B6359] py-2.5 rounded-[2px] font-mono text-[10px] uppercase tracking-wider font-semibold border border-[#2B231D] cursor-not-allowed flex items-center justify-center gap-1.5"
                        >
                          <Lock className="w-3 h-3" />
                          <span>NOT ENOUGH HOUSE POINTS</span>
                        </button>
                        <p className="text-[8.5px] font-mono text-center text-[#8C857B]">
                          Requires {pointsNeeded} more points. (Calibrate or catch Snitch)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cabinet Bottom Footnote */}
          <div className="mt-8 pt-4 border-t border-[#241D18] flex flex-col sm:flex-row items-center justify-between text-[9.5px] font-mono text-[#8C857B] gap-2 px-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A88A45]" />
              <span>OFFICIAL OLLIVANDERS CERTIFICATE &amp; MORTISE BOX INCLUDED WITH EVERY ACQUISITION</span>
            </div>
            <div>
              PRICES IN USD ($) · ARCHIVAL DISPATCH GUARANTEE
            </div>
          </div>

        </div>

      </div>

      {/* 
        FOLIO INSPECTION MODAL
        Opens when a patron clicks a wand card to inspect full high-resolution silhouette & curatorial provenance
      */}
      {inspectedWand && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none animate-fadeIn">
          <div className="relative bg-[#16120F] border border-[#2E241C] text-[#FAF8F5] rounded-[3px] shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2E241C] pb-3">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-[#A88A45] uppercase">
                <span>{inspectedWand.drawerNumber}</span>
                <span className="text-white/20">|</span>
                <span>OLLIVANDERS CERTIFICATE OF PROVENANCE</span>
              </div>
              <button
                onClick={() => setInspectedWand(null)}
                className="text-white/60 hover:text-white p-1 cursor-pointer transition-colors"
                aria-label="Close inspection folio"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Wand Display Cradle */}
            <div className="h-36 bg-[#0E0B09] border border-[#261E16] rounded-[2px] p-6 flex flex-col justify-center items-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-radial from-white/5 to-transparent pointer-events-none" />
              <CanonicalWandSVG
                silhouetteType={inspectedWand.silhouetteType}
                className="w-full h-auto drop-shadow-lg"
              />
              <div className="absolute bottom-2 text-xs font-serif italic text-white/80">
                Wielded by {inspectedWand.wielder}
              </div>
            </div>

            {/* Spec Details */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-[#A88A45] uppercase tracking-widest">
                {inspectedWand.edition}
              </div>
              <h3 className="font-serif font-bold text-2xl text-white tracking-wide uppercase">
                {inspectedWand.name}
              </h3>
              <p className="text-xs text-[#C5BBAA] leading-relaxed pt-1">
                {inspectedWand.description}
              </p>
              <p className="text-[11px] font-mono text-[#8C857B] leading-relaxed pt-1 italic">
                {inspectedWand.lore}
              </p>
            </div>

            {/* Specification Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#110D0A] p-3.5 rounded-[2px] border border-[#241C16] text-[10.5px] font-mono">
              <div>
                <span className="text-[#8C857B] block text-[9px] uppercase">WOOD</span>
                <span className="text-white font-bold">{inspectedWand.wood}</span>
              </div>
              <div>
                <span className="text-[#8C857B] block text-[9px] uppercase">CORE</span>
                <span className="text-white font-bold">{inspectedWand.core}</span>
              </div>
              <div>
                <span className="text-[#8C857B] block text-[9px] uppercase">LENGTH</span>
                <span className="text-white font-bold">{inspectedWand.length}</span>
              </div>
              <div>
                <span className="text-[#8C857B] block text-[9px] uppercase">FLEXIBILITY</span>
                <span className="text-white font-bold">{inspectedWand.flexibility}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#2E241C]">
              <div className="font-mono text-sm">
                <span className="text-[#8C857B] text-xs">ACQUISITION: </span>
                <strong className="text-white font-bold">
                  {inspectedWand.pointCost} PTS + ${inspectedWand.moneyPriceUsd.toFixed(2)}
                </strong>
              </div>

              {userPoints >= inspectedWand.pointCost ? (
                <button
                  type="button"
                  onClick={() => {
                    handleAcquire(inspectedWand);
                    setInspectedWand(null);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#FAF8F5] hover:bg-white text-[#16120F] text-xs font-mono uppercase tracking-wider font-bold rounded-[2px] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>REDEEM &amp; ORDER (${inspectedWand.moneyPriceUsd.toFixed(2)})</span>
                </button>
              ) : (
                <div className="text-xs font-mono text-[#8C857B]">
                  Requires {inspectedWand.pointCost - userPoints} more points.
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
