import React, { useState, useEffect } from 'react';
import { X, Lock, CheckCircle2 } from 'lucide-react';
import { CartItem, OrderRecord } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: (order: OrderRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [fullName, setFullName] = useState('Shahzad');
  const [email, setEmail] = useState('eleanor@archival.org');
  const [streetAddress, setStreetAddress] = useState('452 Lexington Avenue, Apt 8B');
  const [city, setCity] = useState('New York');
  const [postalCode, setPostalCode] = useState('10017');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      setConfirmedOrder(null);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 220);
  };

  const totalVolumes = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.volume.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !streetAddress.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `GRV-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: OrderRecord = {
        id: orderId,
        date: new Date().toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        }),
        status: 'CONFIRMED',
        recipientName: fullName,
        recipientEmail: email,
        streetAddress,
        city,
        postalCode,
        items: items.map(item => ({
          volString: item.volume.volString,
          title: item.volume.title,
          author: item.volume.author,
          price: item.volume.price,
          quantity: item.quantity,
        })),
        total: subtotal,
      };

      onOrderCompleted(newOrder);
      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Smooth Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity duration-250 ease-out ${
          isClosing ? 'opacity-0' : 'animate-backdrop-in'
        }`}
      />

      {/* Smooth Modal Scale & Float */}
      <div
        className={`relative bg-[#FAF7F2] border border-[#E2DBD0] rounded-xs shadow-2xl max-w-lg w-full p-6 sm:p-8 z-10 text-[#1C1917] transition-all duration-250 ease-out ${
          isClosing ? 'opacity-0 scale-95 translate-y-3' : 'animate-modal-in'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 text-[#7A7165] hover:text-[#1C1917] transition-colors p-1 select-none cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedOrder ? (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#E5EFE8] text-[#1E5638] mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#BC472A] font-semibold">
                DISPATCH COMMENCED
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#1C1917] uppercase">
                ORDER RECORD PRESERVED
              </h3>
              <p className="text-xs font-mono text-[#6B6359]">
                ORDER IDENTIFIER: <span className="font-bold text-[#1C1917]">{confirmedOrder.id}</span>
              </p>
            </div>
            <p className="text-xs text-[#575047] max-w-xs mx-auto">
              Your archival edition(s) are being carefully inspected, wrapped in acid-free tissue, and prepared for dispatch to {confirmedOrder.recipientName}.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 bg-[#1C1917] hover:bg-black text-[#FAF8F5] px-6 py-2.5 rounded-xs text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer select-none"
            >
              RETURN TO CANON
            </button>
          </div>
        ) : (
          /* Standard Checkout Form matching Screenshot 4 */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#BC472A] uppercase font-semibold">
                CURATORIAL ACQUISITION
              </span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1917] tracking-tight uppercase mt-0.5">
                CHECKOUT &amp; ARCHIVAL DISPATCH
              </h2>
            </div>

            {/* 1. Contact Recipient */}
            <div className="space-y-2.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A7165] font-semibold">
                1. CONTACT RECIPIENT
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-mono uppercase tracking-wider text-[#7A7165] mb-1">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#EFECE5] text-[#1C1917] text-xs font-mono px-3 py-2 border border-transparent rounded-xs focus:bg-white focus:border-[#2E4A3D] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono uppercase tracking-wider text-[#7A7165] mb-1">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#EFECE5] text-[#1C1917] text-xs font-mono px-3 py-2 border border-transparent rounded-xs focus:bg-white focus:border-[#2E4A3D] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 2. Archival Delivery Address */}
            <div className="space-y-2.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A7165] font-semibold">
                2. ARCHIVAL DELIVERY ADDRESS
              </div>
              <div className="space-y-2">
                <div>
                  <label className="block text-[9px] font-mono uppercase tracking-wider text-[#7A7165] mb-1">
                    STREET ADDRESS
                  </label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full bg-[#EFECE5] text-[#1C1917] text-xs font-mono px-3 py-2 border border-transparent rounded-xs focus:bg-white focus:border-[#2E4A3D] focus:outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-wider text-[#7A7165] mb-1">
                      CITY
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#EFECE5] text-[#1C1917] text-xs font-mono px-3 py-2 border border-transparent rounded-xs focus:bg-white focus:border-[#2E4A3D] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-wider text-[#7A7165] mb-1">
                      POSTAL CODE
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-[#EFECE5] text-[#1C1917] text-xs font-mono px-3 py-2 border border-transparent rounded-xs focus:bg-white focus:border-[#2E4A3D] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Box matching Screenshot 4 */}
            <div className="bg-[#EFECE5] border border-[#E2DBD0] rounded-xs p-3.5 space-y-2 text-xs font-mono">
              <div className="flex justify-between font-semibold text-[#1C1917] border-b border-[#DDD5C7] pb-1.5">
                <span>VOLUMES ({totalVolumes})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="space-y-1 text-[#5A5247] pt-0.5">
                {items.map(item => (
                  <div key={item.volume.id} className="flex justify-between">
                    <span>{item.quantity}x {item.volume.title}</span>
                    <span>${(item.volume.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-[#1E5638] font-semibold pt-1">
                  <span>SPECIALIZED ARCHIVAL CRATING</span>
                  <span>FREE</span>
                </div>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1C1917] pt-2 border-t border-[#DDD5C7]">
                <span>AUTHORITATIVE TOTAL</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Encrypted transmission note with green lock icon */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#5A5247] bg-[#E7E2D6] px-3 py-2 rounded-xs">
              <Lock className="w-3.5 h-3.5 text-[#1E5638] shrink-0" />
              <span>Encrypted transmission · Authoritative pricing &amp; inventory check enforced.</span>
            </div>

            {/* Confirm Archival Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1C1917] hover:bg-black text-[#FAF8F5] py-3.5 rounded-xs font-semibold text-xs font-mono uppercase tracking-widest transition-all shadow-md cursor-pointer disabled:opacity-50 select-none"
            >
              {isSubmitting ? 'PROCESSING LEDGER...' : 'CONFIRM ARCHIVAL ORDER'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
