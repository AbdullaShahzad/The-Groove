import React, { useState, useEffect } from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface ArchivalBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (volumeId: string, delta: number) => void;
  onRemoveItem: (volumeId: string) => void;
  onProceedToCheckout: () => void;
}

export const ArchivalBagDrawer: React.FC<ArchivalBagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 280);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  const totalVolumes = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.volume.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Smooth Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300 ease-out ${
          isClosing ? 'opacity-0' : 'animate-backdrop-in'
        }`}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Smooth Drawer Slide with Keyframes */}
        <div
          className={`w-screen max-w-md bg-[#FAF7F2] border-l border-[#E2DBD0] shadow-2xl flex flex-col justify-between transition-transform duration-280 ease-in-out ${
            isClosing ? 'translate-x-full' : 'animate-drawer-in'
          }`}
        >
          {/* Header */}
          <div className="px-6 py-6 border-b border-[#E7E1D5] flex items-start justify-between">
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1917] tracking-tight uppercase">
                YOUR ARCHIVAL BAG
              </h2>
              <p className="text-[11px] font-mono tracking-wider uppercase text-[#786F63] mt-1">
                {totalVolumes} {totalVolumes === 1 ? 'VOLUME' : 'VOLUMES'} SELECTED
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-[#786F63] hover:text-[#1C1917] p-1.5 transition-colors cursor-pointer select-none"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <p className="font-serif text-lg text-[#575047]">Your archival bag is empty.</p>
                <p className="text-xs text-[#8C827A] max-w-xs mx-auto">
                  Click on any spine on the canon shelf to inspect editions and add them to your order.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.volume.id}
                  className="bg-white border border-[#E7E1D5] rounded-xs p-3.5 flex items-center gap-3.5 shadow-xs transition-all hover:border-[#D5CDC0]"
                >
                  {/* Miniature Spine representation */}
                  <div
                    className="w-7 h-20 rounded-xs flex flex-col justify-between items-center py-1.5 text-[8px] font-mono uppercase text-[#F3E2A9] font-bold shadow-xs shrink-0"
                    style={{ backgroundColor: item.volume.spineColor }}
                  >
                    <span>✦</span>
                    <span
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                      }}
                      className="tracking-widest"
                    >
                      {item.volume.volString}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#1C1917] truncate uppercase">
                      {item.volume.title}
                    </h3>
                    <p className="font-serif italic text-xs text-[#6B6359] truncate">
                      {item.volume.author}
                    </p>
                    <p className="font-mono text-xs text-[#1C1917] font-medium mt-1">
                      ${item.volume.price.toFixed(2)} each
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#DDD5C7] rounded-xs bg-[#FAF7F2]">
                        <button
                          onClick={() => onUpdateQuantity(item.volume.id, -1)}
                          className="px-2 py-0.5 text-xs text-[#575047] hover:text-black cursor-pointer select-none"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono font-semibold text-[#1C1917] select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.volume.id, 1)}
                          className="px-2 py-0.5 text-xs text-[#575047] hover:text-black cursor-pointer select-none"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.volume.id)}
                        className="text-[#9E8E81] hover:text-[#B91C1C] p-1 transition-colors cursor-pointer ml-auto"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sticky Summary & Checkout Footer */}
          {items.length > 0 && (
            <div className="px-6 py-5 border-t border-[#E7E1D5] bg-[#F5F1E8] space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#6B6359]">
                  <span>SUBTOTAL</span>
                  <span className="text-[#1C1917] font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#28573D]">
                  <span>ARCHIVAL SHIPPING</span>
                  <span className="font-semibold uppercase">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-[#1C1917] pt-2 border-t border-[#E2DBD0]">
                  <span>TOTAL DUE</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full bg-[#1C1917] hover:bg-black text-[#FAF8F5] py-3.5 rounded-xs font-medium text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer select-none"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
