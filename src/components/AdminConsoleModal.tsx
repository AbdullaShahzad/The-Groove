import React, { useState } from 'react';
import { Volume, OrderRecord, AuthUser, Category } from '../types';
import { X, ShieldAlert, PackageCheck, DollarSign, Database, Check, AlertTriangle, ArrowUpDown, Plus, Search, Eye, Filter } from 'lucide-react';

interface AdminConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser;
  volumes: Volume[];
  onUpdateVolumeStock: (volId: string, newStock: number) => void;
  onUpdateVolumePrice: (volId: string, newPrice: number) => void;
  onAddNewVolume?: (volume: Volume) => void;
  orders: OrderRecord[];
  onUpdateOrderStatus: (orderId: string, newStatus: 'CONFIRMED' | 'DISPATCHED' | 'DELIVERED') => void;
  initialTab?: 'inventory' | 'orders';
}

export const AdminConsoleModal: React.FC<AdminConsoleModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  volumes,
  onUpdateVolumeStock,
  onUpdateVolumePrice,
  onAddNewVolume,
  orders,
  onUpdateOrderStatus,
  initialTab = 'inventory',
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'add_book'>(initialTab);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');
  
  // Custom stock adjustment state
  const [stockAddId, setStockAddId] = useState<string | null>(null);
  const [customStockAmount, setCustomStockAmount] = useState<number>(10);

  // Purchase details inspection modal
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderRecord | null>(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'ALL' | 'CONFIRMED' | 'DISPATCHED' | 'DELIVERED'>('ALL');

  // Form for adding new volume to stacks
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newPrice, setNewPrice] = useState('28.00');
  const [newStock, setNewStock] = useState('15');
  const [newCategory, setNewCategory] = useState<Category>('CLASSICS');
  const [newSpineColor, setNewSpineColor] = useState('#2E4A3D');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [addSuccessMessage, setAddSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Calculate high-level metrics
  const totalStock = volumes.reduce((sum, v) => sum + v.stockCount, 0);
  const totalInventoryValue = volumes.reduce((sum, v) => sum + v.price * v.stockCount, 0);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const handleStartEditPrice = (vol: Volume) => {
    setEditingPriceId(vol.id);
    setTempPrice(vol.price.toFixed(2));
  };

  const handleSavePrice = (volId: string) => {
    const parsed = parseFloat(tempPrice);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdateVolumePrice(volId, parsed);
    }
    setEditingPriceId(null);
  };

  const handleApplyCustomStock = (volId: string, currentStock: number) => {
    if (customStockAmount > 0) {
      onUpdateVolumeStock(volId, currentStock + customStockAmount);
      setStockAddId(null);
    }
  };

  const handleCreateNewVolume = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim() || !onAddNewVolume) return;

    const parsedPrice = parseFloat(newPrice) || 28.0;
    const parsedStock = parseInt(newStock, 10) || 12;
    const nextVolNum = volumes.length + 1;
    const formattedVolString = `VOL. ${nextVolNum < 10 ? '0' : ''}${nextVolNum}`;

    const createdVolume: Volume = {
      id: `vol_${Date.now()}`,
      volNum: nextVolNum,
      volString: formattedVolString,
      title: newTitle.trim(),
      author: newAuthor.trim(),
      price: parsedPrice,
      category: newCategory,
      spineColor: newSpineColor,
      accentColor: '#D4AF37',
      foilColor: '#E2C26E',
      publishedYear: 2026,
      isbn: `978-1-984-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`,
      stockCount: parsedStock,
      synopsis: newSynopsis.trim() || `Preserved octavo edition with 24kt gold foil blind-embossing and deckle edge binding.`,
      bindingSpecs: {
        clothDescription: 'Imperial Japanese Bookcloth over 3mm Davey board',
        format: 'Octavo (6.25 × 9.5 in)',
        paperStock: '120gsm Swedish Munken Pure Cream',
      },
      physicalDimensions: {
        widthPx: 46,
        heightPx: 440,
        pageCount: 320,
      },
    };

    onAddNewVolume(createdVolume);
    setAddSuccessMessage(`Successfully registered ${formattedVolString}: "${newTitle}" into canonical stacks!`);
    
    // Reset form
    setNewTitle('');
    setNewAuthor('');
    setNewSynopsis('');
    setTimeout(() => {
      setAddSuccessMessage(null);
      setActiveTab('inventory');
    }, 1800);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderStatusFilter === 'ALL' || o.status === orderStatusFilter;
    const matchesSearch =
      !orderSearchQuery.trim() ||
      o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.recipientName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.recipientEmail.toLowerCase().includes(orderSearchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 select-none animate-fadeIn">
      
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Main Modal Dialog */}
      <div className="relative z-10 bg-[#FAF7F2] border border-[#DDD5C7] rounded-[4px] shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-[#1C1612] text-[#FAF8F5] px-6 py-4 flex items-center justify-between border-b border-[#382B22]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#BC472A] flex items-center justify-center text-white">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-white uppercase tracking-tight">
                  CURATORIAL ADMINISTRATION CONSOLE
                </h3>
                <span className="bg-[#BC472A] text-white text-[9px] font-mono px-2 py-0.5 rounded-[2px] font-bold uppercase">
                  MASTER PRIVILEGES
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#C5BBAA] mt-0.5">
                Archival Conservator: {currentUser.name} ({currentUser.email})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#DDD5C7] hover:text-white p-1 transition-colors cursor-pointer select-none"
            aria-label="Close admin console"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High-Level Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 bg-[#F3EFE7] border-b border-[#DDD5C7]">
          <div className="bg-white p-3 rounded-[2px] border border-[#DDD5C7]">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#7A7165]">
              <Database className="w-3 h-3 text-[#BC472A]" />
              <span>TOTAL INVENTORY</span>
            </div>
            <div className="text-xl font-bold font-mono text-[#1C1917] mt-0.5">
              {totalStock} <span className="text-xs font-normal text-[#7A7165]">vols</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-[2px] border border-[#DDD5C7]">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#7A7165]">
              <DollarSign className="w-3 h-3 text-[#2E4A3D]" />
              <span>STACKS VALUATION</span>
            </div>
            <div className="text-xl font-bold font-mono text-[#1C1917] mt-0.5">
              ${totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-white p-3 rounded-[2px] border border-[#DDD5C7]">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#7A7165]">
              <PackageCheck className="w-3 h-3 text-[#BC472A]" />
              <span>TOTAL ORDERS</span>
            </div>
            <div className="text-xl font-bold font-mono text-[#1C1917] mt-0.5">
              {orders.length} <span className="text-xs font-normal text-[#7A7165]">purchases</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-[2px] border border-[#DDD5C7]">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#7A7165]">
              <ArrowUpDown className="w-3 h-3 text-[#2E4A3D]" />
              <span>TOTAL REVENUE</span>
            </div>
            <div className="text-xl font-bold font-mono text-[#1C1917] mt-0.5">
              ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-between px-6 pt-3 border-b border-[#DDD5C7] text-xs font-mono uppercase tracking-wider bg-[#FAF7F2]">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`pb-3 transition-colors cursor-pointer font-bold ${
                activeTab === 'inventory'
                  ? 'text-[#BC472A] border-b-2 border-[#BC472A]'
                  : 'text-[#7A7165] hover:text-[#1C1917]'
              }`}
            >
              STACKS INVENTORY &amp; RESTOCK ({volumes.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 transition-colors cursor-pointer font-bold ${
                activeTab === 'orders'
                  ? 'text-[#BC472A] border-b-2 border-[#BC472A]'
                  : 'text-[#7A7165] hover:text-[#1C1917]'
              }`}
            >
              PURCHASE DETAILS &amp; LEDGER ({orders.length})
            </button>
          </div>

          {onAddNewVolume && (
            <button
              onClick={() => setActiveTab('add_book')}
              className={`mb-2 px-3 py-1.5 rounded-[2px] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'add_book'
                  ? 'bg-[#BC472A] text-white'
                  : 'bg-[#1C1917] hover:bg-black text-[#FAF8F5]'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ NEW CANONICAL VOLUME</span>
            </button>
          )}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {/* TAB 1: INVENTORY & STOCK CONTROLS */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#7A7165]">
                <span>Manage stock levels, units on hand, and edition pricing</span>
                <span>Click unit price to edit</span>
              </div>

              <div className="overflow-x-auto border border-[#DDD5C7] rounded-[2px] bg-white">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#DDD5C7] bg-[#F7F4EE] text-[#7A7165] text-[10px] uppercase">
                      <th className="py-2.5 px-3">VOL #</th>
                      <th className="py-2.5 px-3">TITLE &amp; AUTHOR</th>
                      <th className="py-2.5 px-3">CATEGORY</th>
                      <th className="py-2.5 px-3">UNIT PRICE</th>
                      <th className="py-2.5 px-3">STOCK LEVEL</th>
                      <th className="py-2.5 px-3 text-right">ADD STOCK ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE4D8]">
                    {volumes.map((vol) => {
                      const isLowStock = vol.stockCount <= 5;
                      const isEditingPrice = editingPriceId === vol.id;
                      const isCustomStockActive = stockAddId === vol.id;

                      return (
                        <tr key={vol.id} className="hover:bg-[#F9F7F2] transition-colors">
                          <td className="py-3 px-3 font-bold text-[#BC472A]">
                            {vol.volString}
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-serif font-bold text-sm text-[#1C1917]">
                              {vol.title}
                            </div>
                            <div className="font-serif italic text-xs text-[#7A7165]">
                              by {vol.author}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-[#4A4237]">
                            {vol.category}
                          </td>
                          <td className="py-3 px-3">
                            {isEditingPrice ? (
                              <div className="flex items-center gap-1">
                                <span className="text-gray-500">$</span>
                                <input
                                  type="number"
                                  step="0.5"
                                  value={tempPrice}
                                  onChange={(e) => setTempPrice(e.target.value)}
                                  className="w-16 bg-white border border-[#BC472A] px-1.5 py-0.5 rounded-[2px] font-bold text-xs"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleSavePrice(vol.id)}
                                  className="bg-[#2E4A3D] text-white p-1 rounded-[2px] hover:bg-[#1B2D24]"
                                >
                                  <Check className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleStartEditPrice(vol)}
                                className="font-bold text-[#1C1917] hover:text-[#BC472A] underline cursor-pointer"
                                title="Click to edit price"
                              >
                                ${vol.price.toFixed(2)}
                              </button>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-[2px] text-[10px] ${
                                isLowStock
                                  ? 'bg-[#FBE9E7] text-[#C62828]'
                                  : 'bg-[#E2EDE5] text-[#1E5638]'
                              }`}
                            >
                              {isLowStock && <AlertTriangle className="w-2.5 h-2.5" />}
                              {vol.stockCount} in stock
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            {isCustomStockActive ? (
                              <div className="inline-flex items-center gap-1">
                                <span className="text-[10px] text-[#7A7165]">+</span>
                                <input
                                  type="number"
                                  min="1"
                                  max="500"
                                  value={customStockAmount}
                                  onChange={(e) => setCustomStockAmount(parseInt(e.target.value, 10) || 1)}
                                  className="w-14 bg-white border border-[#BC472A] px-1 py-0.5 rounded-[2px] text-xs font-bold"
                                />
                                <button
                                  onClick={() => handleApplyCustomStock(vol.id, vol.stockCount)}
                                  className="bg-[#BC472A] hover:bg-[#A3381F] text-white px-2 py-0.5 rounded-[2px] text-[10px] font-bold"
                                >
                                  ADD
                                </button>
                                <button
                                  onClick={() => setStockAddId(null)}
                                  className="text-gray-400 hover:text-black p-0.5 text-xs"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1">
                                <button
                                  onClick={() => onUpdateVolumeStock(vol.id, Math.max(0, vol.stockCount - 1))}
                                  className="w-6 h-6 bg-[#EFECE5] hover:bg-[#E5E0D5] text-[#1C1917] font-bold rounded-[2px] flex items-center justify-center transition-colors cursor-pointer text-xs"
                                  title="Decrement 1 unit"
                                >
                                  -1
                                </button>
                                <button
                                  onClick={() => onUpdateVolumeStock(vol.id, vol.stockCount + 5)}
                                  className="px-2 py-1 bg-[#1C1917] hover:bg-black text-[#FAF8F5] text-[10px] font-semibold rounded-[2px] transition-colors cursor-pointer"
                                  title="Add 5 units batch"
                                >
                                  +5
                                </button>
                                <button
                                  onClick={() => onUpdateVolumeStock(vol.id, vol.stockCount + 20)}
                                  className="px-2 py-1 bg-[#2E4A3D] hover:bg-[#1E332A] text-white text-[10px] font-semibold rounded-[2px] transition-colors cursor-pointer"
                                  title="Add 20 units bulk"
                                >
                                  +20
                                </button>
                                <button
                                  onClick={() => {
                                    setStockAddId(vol.id);
                                    setCustomStockAmount(10);
                                  }}
                                  className="px-2 py-1 border border-[#DDD5C7] hover:bg-white text-[10px] font-semibold rounded-[2px] transition-colors cursor-pointer"
                                  title="Specify custom units"
                                >
                                  CUSTOM...
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: COMPLETE PURCHASE DETAILS & ORDER LEDGER */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              
              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-3.5 h-3.5 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search customer, email, order ID..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#DDD5C7] text-[#1C1917] text-xs font-mono pl-8 pr-3 py-1.5 rounded-[2px] focus:outline-none focus:border-[#BC472A]"
                  />
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono">
                  <Filter className="w-3.5 h-3.5 text-[#7A7165]" />
                  {(['ALL', 'CONFIRMED', 'DISPATCHED', 'DELIVERED'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-2 py-1 rounded-[2px] transition-colors cursor-pointer uppercase ${
                        orderStatusFilter === st
                          ? 'bg-[#1C1917] text-white font-bold'
                          : 'bg-white border border-[#DDD5C7] text-[#6B6359] hover:text-[#1C1917]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purchase Records List */}
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-white border border-[#DDD5C7] rounded-[2px] text-[#7A7165] font-mono text-xs">
                  NO PURCHASES MATCHING SEARCH CRITERIA
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-[#DDD5C7] rounded-[2px] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs hover:border-[#BC472A]/50 transition-colors"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-mono font-bold text-sm text-[#BC472A]">
                            {order.id}
                          </span>
                          <span className="text-[10px] font-mono text-[#7A7165]">
                            {order.date}
                          </span>
                          <span
                            className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-[2px] font-bold ${
                              order.status === 'DELIVERED'
                                ? 'bg-[#E2EDE5] text-[#1E5638]'
                                : order.status === 'DISPATCHED'
                                ? 'bg-[#E0F2FE] text-[#0369A1]'
                                : 'bg-[#FEF3C7] text-[#B45309]'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        {/* Customer & Shipping Info */}
                        <div className="text-xs font-mono text-[#4A4237]">
                          Purchaser: <strong>{order.recipientName}</strong> · Email: <strong>{order.recipientEmail}</strong>
                        </div>
                        <div className="text-[11px] font-mono text-[#7A7165]">
                          Delivery: {order.streetAddress}, {order.city} {order.postalCode}
                        </div>

                        {/* Line Items */}
                        <div className="text-xs font-serif italic text-[#6B6359] pt-0.5">
                          Editions: {order.items.map(i => `${i.volString} "${i.title}" (${i.quantity}x @ $${i.price.toFixed(2)})`).join(', ')}
                        </div>
                      </div>

                      {/* Financials & Status Controls */}
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-[#EAE4D8]">
                        <div className="text-right">
                          <div className="font-mono font-bold text-base text-[#1C1917]">
                            ${order.total.toFixed(2)}
                          </div>
                          <div className="text-[9px] font-mono text-[#7A7165] uppercase">
                            Archival Invoiced
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedOrderDetails(order)}
                            className="bg-[#EFECE5] hover:bg-[#E5E0D5] text-[#1C1917] px-2.5 py-1 rounded-[2px] text-[10px] font-mono font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            title="Inspect complete invoice details"
                          >
                            <Eye className="w-3 h-3 text-[#BC472A]" />
                            <span>DETAILS</span>
                          </button>

                          {/* Quick status cycle */}
                          <button
                            onClick={() => onUpdateOrderStatus(order.id, order.status === 'CONFIRMED' ? 'DISPATCHED' : 'DELIVERED')}
                            className="bg-[#1C1917] hover:bg-black text-[#FAF8F5] px-2.5 py-1 rounded-[2px] text-[10px] font-mono font-bold transition-colors cursor-pointer"
                          >
                            {order.status === 'CONFIRMED' ? 'DISPATCH' : order.status === 'DISPATCHED' ? 'DELIVER' : 'COMPLETED'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 3: REGISTER NEW CANONICAL VOLUME */}
          {activeTab === 'add_book' && onAddNewVolume && (
            <div className="max-w-2xl mx-auto bg-white border border-[#DDD5C7] rounded-[3px] p-6 space-y-4">
              <div className="border-b border-[#EAE4D8] pb-3">
                <h4 className="font-serif font-bold text-xl text-[#1C1917] uppercase tracking-tight">
                  REGISTER NEW CANONICAL VOLUME TO STACKS
                </h4>
                <p className="text-xs font-mono text-[#7A7165] mt-1">
                  Newly registered editions will immediately appear on the 3D rotating cylinder, linear shelf, and catalog.
                </p>
              </div>

              {addSuccessMessage && (
                <div className="bg-[#E2EDE5] border border-[#A5D6A7] text-[#1E5638] text-xs font-mono p-3 rounded-[2px] animate-fadeIn">
                  {addSuccessMessage}
                </div>
              )}

              <form onSubmit={handleCreateNewVolume} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6B6359] mb-1">
                      Edition Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Brave New World"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-[#EFECE5] px-3 py-2 rounded-[2px] border border-transparent focus:bg-white focus:border-[#BC472A] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6B6359] mb-1">
                      Author / Essayist
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aldous Huxley"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full bg-[#EFECE5] px-3 py-2 rounded-[2px] border border-transparent focus:bg-white focus:border-[#BC472A] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6B6359] mb-1">
                      Unit Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full bg-[#EFECE5] px-3 py-2 rounded-[2px] border border-transparent focus:bg-white focus:border-[#BC472A] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6B6359] mb-1">
                      Initial Stock Units
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      className="w-full bg-[#EFECE5] px-3 py-2 rounded-[2px] border border-transparent focus:bg-white focus:border-[#BC472A] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6B6359] mb-1">
                      Archival Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as Category)}
                      className="w-full bg-[#EFECE5] px-3 py-2 rounded-[2px] border border-transparent focus:bg-white focus:border-[#BC472A] focus:outline-none"
                    >
                      <option value="CLASSICS">CLASSICS</option>
                      <option value="FICTION">FICTION</option>
                      <option value="PHILOSOPHY">PHILOSOPHY</option>
                      <option value="THRILLER">THRILLER</option>
                      <option value="MENTAL HEALTH">MENTAL HEALTH</option>
                      <option value="MONEY & MIND">MONEY &amp; MIND</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#6B6359] mb-1">
                    Bookcloth Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newSpineColor}
                      onChange={(e) => setNewSpineColor(e.target.value)}
                      className="w-10 h-9 rounded-[2px] border border-[#DDD5C7] cursor-pointer"
                    />
                    <span className="text-[#7A7165]">{newSpineColor}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#6B6359] mb-1">
                    Curatorial Synopsis
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Short description of the work and its preservation significance..."
                    value={newSynopsis}
                    onChange={(e) => setNewSynopsis(e.target.value)}
                    className="w-full bg-[#EFECE5] px-3 py-2 rounded-[2px] border border-transparent focus:bg-white focus:border-[#BC472A] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('inventory')}
                    className="px-4 py-2 border border-[#DDD5C7] text-[#6B6359] hover:text-[#1C1917] rounded-[2px]"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="bg-[#BC472A] hover:bg-[#A3381F] text-white px-5 py-2 rounded-[2px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>REGISTER INTO CANON</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#EFECE5] px-6 py-3 border-t border-[#DDD5C7] flex items-center justify-between text-[11px] font-mono text-[#7A7165]">
          <span>THE GROOVE ARCHIVAL CONTROL DESK</span>
          <button
            onClick={onClose}
            className="bg-[#1C1917] hover:bg-black text-[#FAF8F5] px-4 py-1.5 rounded-[2px] font-bold transition-colors cursor-pointer"
          >
            EXIT CONSOLE
          </button>
        </div>

      </div>

      {/* DETAILED PURCHASE INSPECTION MODAL */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border border-[#DDD5C7] rounded-[4px] shadow-2xl max-w-lg w-full p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#DDD5C7] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#BC472A] font-bold">
                  CANONICAL PURCHASE LEDGER INVOICE
                </span>
                <h4 className="font-mono font-bold text-lg text-[#1C1917]">
                  {selectedOrderDetails.id}
                </h4>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="text-[#7A7165] hover:text-black p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-2 gap-2 bg-[#F3EFE7] p-3 rounded-[2px]">
                <div>
                  <div className="text-[9px] uppercase text-[#7A7165]">Date &amp; Time</div>
                  <div className="font-bold text-[#1C1917]">{selectedOrderDetails.date}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase text-[#7A7165]">Fulfillment Status</div>
                  <div className="font-bold text-[#BC472A]">{selectedOrderDetails.status}</div>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase text-[#7A7165] font-bold">Client / Recipient</div>
                <div className="font-semibold text-sm text-[#1C1917]">{selectedOrderDetails.recipientName}</div>
                <div className="text-[#6B6359]">{selectedOrderDetails.recipientEmail}</div>
              </div>

              <div>
                <div className="text-[10px] uppercase text-[#7A7165] font-bold">Shipping Destination</div>
                <div className="text-[#473F35]">
                  {selectedOrderDetails.streetAddress}<br />
                  {selectedOrderDetails.city}, {selectedOrderDetails.postalCode}
                </div>
              </div>

              <div className="pt-2 border-t border-[#DDD5C7]">
                <div className="text-[10px] uppercase text-[#7A7165] font-bold mb-2">Itemized Editions</div>
                <div className="space-y-2">
                  {selectedOrderDetails.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-[#BC472A]">{item.volString}</span>: {item.title}
                        <span className="text-[#7A7165] ml-1">({item.quantity} × ${item.price.toFixed(2)})</span>
                      </div>
                      <span className="font-bold font-mono">${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t-2 border-[#1C1917] flex justify-between items-center text-sm font-bold">
                <span>TOTAL INVOICED:</span>
                <span className="text-base text-[#BC472A]">${selectedOrderDetails.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="bg-[#1C1917] text-white px-4 py-1.5 rounded-[2px] text-xs font-mono font-bold cursor-pointer"
              >
                CLOSE INVOICE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
