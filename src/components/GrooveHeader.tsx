import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, ShieldAlert, Settings, Menu, X, ArrowRight, BookOpen, Compass, Disc3, Feather, Sparkles } from 'lucide-react';
import { Category, AuthUser, HogwartsHouse } from '../types';
import { HOGWARTS_HOUSES } from '../data/houses';
import { HouseCrest } from './HouseCrest';

interface GrooveHeaderProps {
  currentCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenArchive: () => void;
  currentUser: AuthUser | null;
  onOpenSettings: () => void;
  onOpenAdmin?: () => void;
  currentHouse?: HogwartsHouse;
  isNeutralWhite?: boolean;
  userPoints?: number;
}

export const GrooveHeader: React.FC<GrooveHeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenArchive,
  currentUser,
  onOpenSettings,
  onOpenAdmin,
  currentHouse = 'gryffindor',
  userPoints = 100,
}) => {
  const houseData = HOGWARTS_HOUSES[currentHouse];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories: Category[] = [
    'ALL VOLUMES',
    'FICTION',
    'THRILLER',
    'MENTAL HEALTH',
    'MONEY & MIND',
    'CLASSICS',
    'PHILOSOPHY',
  ];

  const isCurator = currentUser?.role === 'curator-admin' || currentUser?.role === 'admin';

  // Close mobile menu on Esc key or when resizing to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleCategoryClick = (cat: Category) => {
    onSelectCategory(cat);
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-[#E8E5DF] w-full max-w-full transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo: THE GROOVE */}
          <button
            onClick={() => {
              onSelectCategory('ALL VOLUMES');
              onSearchChange('');
              setIsMobileMenuOpen(false);
            }}
            className="text-left font-serif text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.14em] sm:tracking-[0.2em] text-[#16120F] hover:opacity-80 transition-opacity cursor-pointer select-none shrink-0"
          >
            THE GROOVE
          </button>

          {/* DESKTOP NAVIGATION CATEGORIES (Hidden on mobile / tablet < 1024px) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-mono tracking-wider uppercase">
            {categories.map((cat) => {
              const isActive = currentCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`transition-all py-1 cursor-pointer select-none ${
                    isActive
                      ? 'font-bold border-b-2'
                      : 'hover:opacity-100 opacity-60'
                  }`}
                  style={{
                    color: isActive ? houseData.theme.primary : '#6B6359',
                    borderColor: isActive ? houseData.theme.primary : 'transparent',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </nav>

          {/* RIGHT ACTION CLUSTER */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Desktop Header Search Input (Hidden on mobile) */}
            <div className="relative hidden md:block">
              <Search className="w-3.5 h-3.5 text-[#8C857B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search Gatsby, 1984..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-[#F8F7F4] text-[#16120F] placeholder-[#8C857B] text-xs font-mono pl-9 pr-4 py-2 rounded-full w-32 lg:w-44 focus:bg-white focus:outline-none border border-[#E8E5DF] focus:border-[#16120F] transition-all"
              />
            </div>

            {/* Desktop Admin Console Trigger (Hidden on mobile) */}
            {isCurator && onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden lg:flex bg-[#16120F] hover:bg-black text-white text-[10px] xs:text-xs font-mono uppercase tracking-wider px-2.5 xs:px-3 py-1.5 rounded-[2px] items-center gap-1.5 transition-colors cursor-pointer select-none shadow-xs font-semibold"
                title="Open Curatorial Admin Console"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-[#A88A45]" />
                <span>CURATOR ADMIN</span>
              </button>
            )}

            {/* Desktop House Affiliation & Points Badge (Hidden on mobile) */}
            <button
              type="button"
              onClick={onOpenSettings}
              className="hidden lg:flex px-2.5 py-1.5 rounded-[2px] border border-[#E8E5DF] bg-[#F8F7F4] hover:bg-white items-center gap-1.5 sm:gap-2 transition-all cursor-pointer select-none shadow-xs text-[10.5px] font-mono tracking-wider uppercase font-semibold"
              title="Membership Settings & House Points"
            >
              <HouseCrest house={currentHouse} size={15} />
              <span className="font-bold" style={{ color: houseData.theme.primary }}>
                {houseData.name}
              </span>
              <span className="text-[#8C857B]">·</span>
              <span className="text-[#16120F] font-mono font-bold">{userPoints} PTS</span>
            </button>

            {/* Desktop Archive Order Ledger Button (Hidden on mobile) */}
            <button
              onClick={onOpenArchive}
              className="hidden lg:block hover:bg-white/80 text-[10px] xs:text-xs font-mono uppercase tracking-wider px-2.5 xs:px-3 py-1.5 rounded-sm border transition-colors cursor-pointer select-none"
              style={{
                backgroundColor: houseData.theme.bgSubtle,
                borderColor: houseData.theme.border,
                color: houseData.theme.text,
              }}
            >
              ARCHIVE
            </button>

            {/* Bag Button with Count (Always visible on mobile & desktop) */}
            <button
              onClick={onOpenCart}
              className="text-[#FAF8F5] text-[10px] sm:text-xs font-mono uppercase tracking-wider pl-2.5 sm:pl-3.5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer select-none shadow-xs active:scale-95 min-h-[38px] sm:min-h-[40px]"
              style={{ backgroundColor: houseData.theme.primary }}
              aria-label="View Archival Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="font-semibold">BAG</span>
              <span
                className="w-4 h-4 text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: houseData.theme.secondary }}
              >
                {cartCount}
              </span>
            </button>

            {/* Desktop Settings Gear (Hidden on mobile) */}
            <button
              onClick={onOpenSettings}
              className="hidden lg:flex p-2 sm:p-2.5 hover:bg-white rounded-full border transition-all hover:rotate-45 duration-300 cursor-pointer select-none shadow-xs"
              style={{
                backgroundColor: houseData.theme.bgSubtle,
                borderColor: houseData.theme.border,
                color: houseData.theme.primary,
              }}
              title="Archival Settings & Hogwarts House Sorting"
              aria-label="Settings"
            >
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* 
              MOBILE MENU TOGGLE BUTTON WITH OPEN/CLOSE ANIMATION
              Replaces all cluttered nav buttons on mobile viewport
            */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-[3px] border border-[#E8E5DF] bg-[#F8F7F4] hover:bg-white text-[#16120F] flex items-center justify-center transition-all cursor-pointer select-none min-w-[40px] min-h-[40px] active:scale-95"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <div className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#16120F]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#16120F]" />
                )}
              </div>
            </button>

          </div>

        </div>
      </div>

      {/* 
        MOBILE NAVIGATION DRAWER OVERLAY
        Features smooth slide-down and fade animation
      */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] sm:top-[80px] bottom-0 z-40 flex flex-col justify-start animate-backdropFadeIn">
          
          {/* Backdrop Blur */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Sliding Content Container */}
          <div className="relative bg-white border-b border-[#E8E5DF] shadow-2xl max-h-[calc(100vh-60px)] overflow-y-auto px-4 py-5 space-y-5 animate-mobileDrawerSlide">
            
            {/* Mobile Search Bar */}
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#8C857B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search Gatsby, 1984, Tolkien..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#F8F7F4] text-[#16120F] placeholder-[#8C857B] text-xs font-mono pl-10 pr-4 py-3 rounded-[3px] border border-[#E8E5DF] focus:bg-white focus:border-[#16120F] focus:outline-none transition-all"
              />
            </div>

            {/* House Affiliation & Balance Card */}
            <div className="bg-[#FAF8F5] border border-[#E8E5DF] p-3.5 rounded-[3px] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <HouseCrest house={currentHouse} size={22} />
                <div>
                  <div className="font-serif font-bold text-sm text-[#16120F] uppercase tracking-wide">
                    {houseData.name} HOUSE
                  </div>
                  <div className="text-[10px] font-mono text-[#8C857B] uppercase tracking-wider">
                    BALANCE: <span className="font-bold text-[#16120F]">{userPoints} POINTS</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="px-3 py-1.5 rounded-[2px] bg-white border border-[#E8E5DF] hover:bg-[#F3EFEA] text-[10px] font-mono uppercase tracking-wider font-semibold text-[#16120F] transition-colors"
              >
                SETTINGS
              </button>
            </div>

            {/* Volume Categories Grid */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C857B] font-semibold">
                CATALOGUE CATEGORIES
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const isActive = currentCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryClick(cat)}
                      className={`min-h-[42px] px-3 py-2 rounded-[2px] text-[11px] font-mono tracking-wider uppercase text-left transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-[#16120F] text-white font-bold shadow-xs'
                          : 'bg-[#F8F7F4] hover:bg-[#EFECE6] text-[#524B43] border border-[#E8E5DF]'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Section Jump Links */}
            <div className="space-y-2 border-t border-[#E8E5DF] pt-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C857B] font-semibold">
                JUMP TO ARCHIVAL ROOMS
              </div>
              <div className="grid grid-cols-1 gap-1.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => scrollToSection('bookshelf-section')}
                  className="w-full min-h-[40px] px-3 py-2 bg-white hover:bg-[#FAF8F5] border border-[#E8E5DF] rounded-[2px] flex items-center justify-between text-[#16120F] uppercase"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#8C857B]" />
                    <span>01 / Bookseller&apos;s Shelf</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#8C857B]" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('curators-index-section')}
                  className="w-full min-h-[40px] px-3 py-2 bg-white hover:bg-[#FAF8F5] border border-[#E8E5DF] rounded-[2px] flex items-center justify-between text-[#16120F] uppercase"
                >
                  <span className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#8C857B]" />
                    <span>02 / Curator&apos;s Index</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#8C857B]" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('listening-salon-section')}
                  className="w-full min-h-[40px] px-3 py-2 bg-white hover:bg-[#FAF8F5] border border-[#E8E5DF] rounded-[2px] flex items-center justify-between text-[#16120F] uppercase"
                >
                  <span className="flex items-center gap-2">
                    <Disc3 className="w-3.5 h-3.5 text-[#8C857B]" />
                    <span>03 / Listening Salon (Vinyl)</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#8C857B]" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('ex-libris-studio-section')}
                  className="w-full min-h-[40px] px-3 py-2 bg-white hover:bg-[#FAF8F5] border border-[#E8E5DF] rounded-[2px] flex items-center justify-between text-[#16120F] uppercase"
                >
                  <span className="flex items-center gap-2">
                    <Feather className="w-3.5 h-3.5 text-[#8C857B]" />
                    <span>04 / Ex-Libris Bookplate Studio</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#8C857B]" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('house-wand-section')}
                  className="w-full min-h-[40px] px-3 py-2 bg-white hover:bg-[#FAF8F5] border border-[#E8E5DF] rounded-[2px] flex items-center justify-between text-[#16120F] uppercase"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>05 / House Wand Collection</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#8C857B]" />
                </button>
              </div>
            </div>

            {/* Curatorial Orders & Admin Actions */}
            <div className="border-t border-[#E8E5DF] pt-4 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenArchive();
                }}
                className="w-full min-h-[44px] px-4 py-2.5 bg-[#FAF8F5] hover:bg-white border border-[#E8E5DF] rounded-[2px] text-xs font-mono font-semibold uppercase tracking-wider text-[#16120F] flex items-center justify-center gap-2"
              >
                <span>OPEN ARCHIVE ORDER LEDGER</span>
              </button>

              {isCurator && onOpenAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full min-h-[44px] px-4 py-2.5 bg-[#16120F] hover:bg-black text-white rounded-[2px] text-xs font-mono font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
                  <span>CURATOR ADMIN CONSOLE</span>
                </button>
              )}
            </div>

            {/* Bottom Close Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-mono uppercase tracking-widest text-[#8C857B] hover:text-[#16120F] transition-colors"
            >
              CLOSE MENU
            </button>

          </div>
        </div>
      )}

    </header>
  );
};
