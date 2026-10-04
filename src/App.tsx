import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Volume, Category, CartItem, OrderRecord, AuthUser, UserRole, HogwartsHouse } from './types';
import { VOLUMES, INITIAL_ARCHIVE_ORDERS } from './data/volumes';
import { HOGWARTS_HOUSES } from './data/houses';
import { GrooveHeader } from './components/GrooveHeader';
import { SpineShelf } from './components/SpineShelf';
import { BookshelfSection } from './components/BookshelfSection';
import { FeaturedEditionSection } from './components/FeaturedEditionSection';
import { ReadingRoomSection } from './components/ReadingRoomSection';
import { EditorialFooter } from './components/EditorialFooter';
import { BookDetailView } from './components/BookDetailView';
import { ArchivalBagDrawer } from './components/ArchivalBagDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderArchiveModal } from './components/OrderArchiveModal';
import { BookReaderPreviewModal } from './components/BookReaderPreviewModal';
import { AuthScreen } from './components/AuthScreen';
import { AdminConsoleModal } from './components/AdminConsoleModal';
import { SettingsModal } from './components/SettingsModal';
import { GoldenBookLoader } from './components/GoldenBookLoader';
import { AtelierCraftSection } from './components/AtelierCraftSection';
import { ListeningSalonSection } from './components/ListeningSalonSection';
import { ExLibrisStudioSection } from './components/ExLibrisStudioSection';
import { HogwartsBookmarkSection } from './components/HogwartsBookmarkSection';
import { GoldenSnitch } from './components/GoldenSnitch';
import { CuratorsIndexSection } from './components/CuratorsIndexSection';
import { HouseWandCollectionSection } from './components/HouseWandCollectionSection';

export default function App() {
  // Authentication State persisted in localStorage
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('the_groove_auth');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAdminConsoleOpen, setIsAdminConsoleOpen] = useState(false);
  const [adminConsoleTab, setAdminConsoleTab] = useState<'inventory' | 'orders'>('inventory');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Golden Book Loading Animation State
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('PRESERVING CANONICAL FOLIO');
  const [loadingSubMessage, setLoadingSubMessage] = useState('BINDING DECKLE EDGES & FOILING 24KT LEAF');

  // Volumes state with dynamic pricing/stock updates from admin
  const [volumesList, setVolumesList] = useState<Volume[]>(() => {
    try {
      const saved = localStorage.getItem('the_groove_volumes');
      return saved ? JSON.parse(saved) : VOLUMES;
    } catch {
      return VOLUMES;
    }
  });

  // Sync volumes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('the_groove_volumes', JSON.stringify(volumesList));
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  }, [volumesList]);

  const [selectedVolume, setSelectedVolume] = useState<Volume | null>(null);
  const [previewVolume, setPreviewVolume] = useState<Volume | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category>('ALL VOLUMES');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('the_groove_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders Archive state persisted in localStorage
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('the_groove_orders');
      return saved ? JSON.parse(saved) : INITIAL_ARCHIVE_ORDERS;
    } catch {
      return INITIAL_ARCHIVE_ORDERS;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  // Hogwarts House selection state
  const [currentHouse, setCurrentHouse] = useState<HogwartsHouse>(() => {
    try {
      const saved = localStorage.getItem('hogwarts_house');
      return (saved as HogwartsHouse) || 'gryffindor';
    } catch {
      return 'gryffindor';
    }
  });

  const activeHouse = HOGWARTS_HOUSES[currentHouse];

  // Persistent House Points System
  const [userPoints, setUserPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('the_groove_house_points');
      return saved ? parseInt(saved, 10) : 150;
    } catch {
      return 150;
    }
  });

  const handleAwardPoints = (points: number, reason: string) => {
    setUserPoints((prev) => {
      const updated = prev + points;
      try {
        localStorage.setItem('the_groove_house_points', updated.toString());
      } catch {}
      return updated;
    });
  };

  // House Switching: Subtle transition, updates state immediately without giant reloads
  const handleSelectHouse = (house: HogwartsHouse) => {
    setCurrentHouse(house);
    try {
      localStorage.setItem('hogwarts_house', house);
      if (currentUser) {
        const updatedUser = { ...currentUser, house };
        setCurrentUser(updatedUser);
        localStorage.setItem('the_groove_auth', JSON.stringify(updatedUser));
      }
    } catch {}
  };

  const handleAddBookmarkToCart = (item: {
    title: string;
    house: HogwartsHouse;
    recipientName: string;
    price: number;
  }) => {
    const houseData = HOGWARTS_HOUSES[item.house];
    const bookmarkVol: Volume = {
      id: `bmk_${item.house}_${Date.now().toString(36)}`,
      volNum: 99,
      volString: 'ITEM',
      title: item.title,
      author: `Hogwarts ${houseData.name} Scriptorium`,
      price: item.price,
      category: 'CLASSICS',
      spineColor: houseData.colors.primary,
      accentColor: houseData.colors.secondary,
      foilColor: houseData.colors.goldOrSilver,
      publishedYear: 2026,
      isbn: '978-0-7475-3269-9',
      stockCount: 50,
      synopsis: `Custom handcrafted 24kt gold embossed bookmark for ${item.recipientName}, bearing the official crest and virtues of ${houseData.name} House.`,
      bindingSpecs: {
        clothDescription: 'Hand-sewn leatherette with silk tassel',
        format: 'Bookmark 240x60mm',
        paperStock: '120gsm Swedish Munken Deckle Cardstock',
      },
    };
    handleAddToCart(bookmarkVol, 1);
    setIsCartOpen(true);
  };

  const handleAddWandToCart = (wandVolume: Volume, pointCost: number) => {
    // Deduct points persistently
    setUserPoints((prev) => {
      const updated = Math.max(0, prev - pointCost);
      try {
        localStorage.setItem('the_groove_house_points', updated.toString());
      } catch {}
      return updated;
    });

    handleAddToCart(wandVolume, 1);
    setIsCartOpen(true);
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('the_groove_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  }, [cart]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('the_groove_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  }, [orders]);

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Authentication Handlers
  const handleLogin = (user: AuthUser) => {
    setLoadingMessage(`ENTERING THE GROOVE ARCHIVE`);
    setLoadingSubMessage(`AUTHENTICATED AS ${user.role.toUpperCase()} · ${user.name.toUpperCase()}`);
    setIsLoading(true);

    setTimeout(() => {
      setCurrentUser(user);
      if (user.house) {
        setCurrentHouse(user.house);
      }
      try {
        localStorage.setItem('the_groove_auth', JSON.stringify(user));
      } catch (e) {
        console.warn('Failed to save auth session:', e);
      }
      setIsLoading(false);
    }, 450);
  };

  const handleLogout = () => {
    setLoadingMessage('SIGNING OUT OF ARCHIVAL DESK');
    setLoadingSubMessage('CLEARING 256-BIT ENCRYPTED SESSION KEYS');
    setIsLoading(true);

    setTimeout(() => {
      setCurrentUser(null);
      setIsAdminConsoleOpen(false);
      setIsSettingsOpen(false);
      try {
        localStorage.removeItem('the_groove_auth');
      } catch (e) {
        console.warn('Failed to clear auth session:', e);
      }
      setIsLoading(false);
    }, 400);
  };

  // Role switching: updates permissions and title
  const handleSwitchRole = (newRole: UserRole) => {
    if (!currentUser) return;
    const title = 
      newRole === 'curator-admin' || newRole === 'admin' 
        ? 'Curatorial Director' 
        : newRole === 'trailer' 
        ? 'Preview Guest' 
        : 'Archival Patron';

    const updated: AuthUser = {
      ...currentUser,
      role: newRole,
      title,
    };
    setCurrentUser(updated);
    try {
      localStorage.setItem('the_groove_auth', JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  };

  // Admin Operations with real permission enforcement
  const handleOpenAdminConsole = (initialTab: 'inventory' | 'orders' = 'inventory') => {
    if (currentUser?.role !== 'curator-admin' && currentUser?.role !== 'admin') {
      alert('ACCESS DENIED: CURATOR ADMIN clearance required. Switch your Experience Mode in Settings.');
      return;
    }
    setAdminConsoleTab(initialTab);
    setIsAdminConsoleOpen(true);
  };

  const handleUpdateVolumeStock = (volId: string, newStock: number) => {
    setVolumesList((prev) =>
      prev.map((v) => (v.id === volId ? { ...v, stockCount: newStock } : v))
    );
  };

  const handleUpdateVolumePrice = (volId: string, newPrice: number) => {
    setVolumesList((prev) =>
      prev.map((v) => (v.id === volId ? { ...v, price: newPrice } : v))
    );
  };

  const handleAddNewVolume = (newVol: Volume) => {
    setVolumesList((prev) => [newVol, ...prev]);
  };

  const handleUpdateOrderStatus = (
    orderId: string,
    newStatus: 'CONFIRMED' | 'DISPATCHED' | 'DELIVERED'
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Cart operations
  const handleAddToCart = (volume: Volume, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.volume.id === volume.id);
      if (existing) {
        return prev.map((item) =>
          item.volume.id === volume.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { volume, quantity }];
    });
  };

  const handleUpdateQuantity = (volumeId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.volume.id === volumeId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (volumeId: string) => {
    setCart((prev) => prev.filter((item) => item.volume.id !== volumeId));
  };

  const handleOrderCompleted = (newOrder: OrderRecord) => {
    setLoadingMessage('INSCRIBING ORDER INTO ARCHIVAL LEDGER');
    setLoadingSubMessage(`GENERATING FOLIO INVOICE #${newOrder.id}`);
    setIsLoading(true);

    setTimeout(() => {
      setOrders((prev) => [newOrder, ...prev]);
      setCart([]);
      setIsLoading(false);
    }, 550);
  };

  // When user is not authenticated, show onboarding/auth gate
  if (!currentUser) {
    return (
      <>
        {isLoading && (
          <GoldenBookLoader
            message={loadingMessage}
            subMessage={loadingSubMessage}
          />
        )}
        <AuthScreen onLogin={handleLogin} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans w-full max-w-full overflow-x-hidden relative bg-white text-[#16120F]">
      
      {/* Screen-Wide Flying Golden Snitch (Click to catch for +5 House Points) */}
      <GoldenSnitch onCatch={(pts) => handleAwardPoints(pts, 'Golden Snitch Captured')} />

      {/* Golden Book Outline Loading Animation */}
      {isLoading && (
        <GoldenBookLoader
          message={loadingMessage}
          subMessage={loadingSubMessage}
        />
      )}

      {/* Clean Editorial Global Header */}
      <GrooveHeader
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          if (selectedVolume) setSelectedVolume(null);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenArchive={() => setIsArchiveOpen(true)}
        currentUser={currentUser}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAdmin={() => handleOpenAdminConsole('inventory')}
        currentHouse={currentHouse}
        userPoints={userPoints}
      />

      {/* Main Content Area: Pure White Foundation */}
      <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden bg-white">
        {selectedVolume ? (
          /* Book Detail View (Full Folio Inspection) */
          <div className="transition-all duration-300 ease-out">
            <BookDetailView
              volume={selectedVolume}
              allVolumes={volumesList}
              onBack={() => setSelectedVolume(null)}
              onSelectVolume={setSelectedVolume}
              onAddToCart={handleAddToCart}
            />
          </div>
        ) : (
          /* Main Editorial Bookstore Flow */
          <>
            {/* HERO SECTION: Pure White Editorial Space that Breathes Naturally */}
            <section className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col justify-between relative overflow-visible bg-white">
              
              {/* Top Canon Metadata Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono tracking-wider text-[#6B6359] pb-3 gap-2 select-none border-b border-[#E8E5DF]">
                <div className="flex items-center gap-2">
                  <span
                    className="font-semibold uppercase text-xs sm:text-[13px] tracking-[0.16em] flex items-center gap-1.5"
                    style={{ color: activeHouse.theme.primary }}
                  >
                    <span>✦</span>
                    <span>THE GROOVE ARCHIVAL EDITIONS · {currentCategory}</span>
                  </span>
                  <p className="text-[10px] sm:text-[11px] text-[#8C857B] tracking-[0.14em] uppercase mt-0.5 hidden md:inline">
                    · {activeHouse.name.toUpperCase()} MEMBERSHIP
                  </p>
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#8C857B] tracking-[0.14em] uppercase">
                  SWEDISH RAG WOVE STOCK · 24KT GOLD BLIND EMBOSSING
                </div>
              </div>

              {/* Hero Split Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center py-8 sm:py-12 my-auto">
                
                {/* Left Column: Editorial Headline & Search */}
                <div className="lg:col-span-5 space-y-5 sm:space-y-6 lg:pl-2">
                  
                  {/* Headline: BOOKS FOR all */}
                  <div className="space-y-0 select-none">
                    <div className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] text-[#16120F] uppercase">
                      BOOKS
                    </div>
                    <div className="flex items-baseline flex-wrap">
                      <span className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] text-[#16120F] uppercase">
                        FOR
                      </span>
                      <span
                        className="font-serif italic font-normal text-4xl xs:text-5xl sm:text-6xl md:text-7xl xl:text-8xl ml-2.5 sm:ml-3 leading-[0.9] lowercase transition-colors"
                        style={{ color: activeHouse.theme.primary }}
                      >
                        all
                      </span>
                    </div>
                  </div>

                  {/* Subtitle / Kicker */}
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#6B6359] font-semibold">
                    BOUND BY HAND · ACID-FREE CANONICAL EDITIONS
                  </div>

                  {/* Narrative description */}
                  <p className="text-xs sm:text-[13px] text-[#524B43] leading-relaxed max-w-full sm:max-w-[380px] font-normal">
                    Definitive clothbound volumes, gold foil blind-stamping, and deckle-edge Swedish wove stock. Hover any spine to inspect binding specifications.
                  </p>

                  {/* Search Input Bar with circle arrow button */}
                  <div className="pt-1 w-full max-w-full sm:max-w-sm">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="Search Gatsby, 1984, Tolkien..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#F8F7F4] text-[#16120F] placeholder-[#8C857B] text-xs font-mono pl-4 pr-12 py-3 rounded-full border border-[#E8E5DF] focus:bg-white focus:border-[#16120F] focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        className="absolute right-1.5 w-8 h-8 rounded-full bg-[#16120F] hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs select-none"
                        aria-label="Submit Search"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Upright Books Shelf Sitting Naturally on the Page */}
                <div className="lg:col-span-7 flex flex-col justify-end relative">
                  <div className="w-full relative select-none">
                    <SpineShelf
                      allVolumes={volumesList}
                      selectedVolume={selectedVolume}
                      onSelectVolume={setSelectedVolume}
                      currentCategory={currentCategory}
                      searchQuery={searchQuery}
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 01: Physical Archival Stacks (Bookseller's Shelf) */}
            <BookshelfSection
              volumes={volumesList}
              onSelectVolume={setSelectedVolume}
              onOpenPreview={setPreviewVolume}
            />

            {/* SECTION 02: Featured Clothbound Edition Spotlight */}
            <FeaturedEditionSection
              volumes={volumesList}
              onSelectVolume={setSelectedVolume}
              onAddToCart={handleAddToCart}
              onOpenPreview={setPreviewVolume}
            />

            {/* SECTION 03: Canonical Literary Pairings */}
            <ReadingRoomSection
              volumes={volumesList}
              onSelectVolume={setSelectedVolume}
              onAddToCart={handleAddToCart}
            />

            {/* SECTION 04: Conservator's Atelier & 300-Year Preservation Anatomy */}
            <AtelierCraftSection />

            {/* SECTION 06: THE CURATOR'S INDEX (Intelligent Discovery) */}
            <CuratorsIndexSection
              volumes={volumesList}
              onSelectVolume={setSelectedVolume}
              onAddToCart={handleAddToCart}
              onOpenPreview={setPreviewVolume}
            />

            {/* SECTION 07: Curatorial Listening & Reading Salon (Analog Soundscapes) */}
            <ListeningSalonSection />

            {/* SECTION 08: Custom Ex-Libris Bookplate Atelier (Fixed 2-Column Structure) */}
            <ExLibrisStudioSection />

            {/* SECTION 09: House Bookmark & Matriculation Scroll (Strict Safe Area) */}
            <HogwartsBookmarkSection
              currentHouse={currentHouse}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onAddBookmarkToCart={handleAddBookmarkToCart}
            />

            {/* SECTION 10: THE HOUSE WAND COLLECTION (Museum Artifact Showcase) */}
            <HouseWandCollectionSection
              house={currentHouse}
              userPoints={userPoints}
              onAddWandToCart={handleAddWandToCart}
            />

            {/* Editorial Physical Bookstore Footer */}
            <EditorialFooter />
          </>
        )}
      </main>

      {/* Slide-over Archival Bag Drawer */}
      <ArchivalBagDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal with USD Pricing and Order Completion */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Historical Order Archive Modal */}
      <OrderArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        orders={orders}
      />

      {/* 3D Physical Opening Book Preview Modal */}
      <BookReaderPreviewModal
        volume={previewVolume}
        isOpen={!!previewVolume}
        onClose={() => setPreviewVolume(null)}
        onAddToCart={handleAddToCart}
        onInspectFullVolume={setSelectedVolume}
      />

      {/* Settings Modal (Experience Mode: PATRON/TRAILER/CURATOR ADMIN, House Switcher) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAdminConsole={handleOpenAdminConsole}
        onSwitchRole={handleSwitchRole}
        totalVolumesCount={volumesList.length}
        totalOrdersCount={orders.length}
        currentHouse={currentHouse}
        onSelectHouse={handleSelectHouse}
        userPoints={userPoints}
      />

      {/* Curator Admin Console Modal (Protected with clearance checks) */}
      {(currentUser.role === 'curator-admin' || currentUser.role === 'admin') && (
        <AdminConsoleModal
          isOpen={isAdminConsoleOpen}
          onClose={() => setIsAdminConsoleOpen(false)}
          currentUser={currentUser}
          volumes={volumesList}
          onUpdateVolumeStock={handleUpdateVolumeStock}
          onUpdateVolumePrice={handleUpdateVolumePrice}
          onAddNewVolume={handleAddNewVolume}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          initialTab={adminConsoleTab}
        />
      )}

    </div>
  );
}
