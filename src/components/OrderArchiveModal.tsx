import React, { useEffect, useState } from 'react';
import { X, Clock } from 'lucide-react';
import { OrderRecord } from '../types';

interface OrderArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
}

export const OrderArchiveModal: React.FC<OrderArchiveModalProps> = ({
  isOpen,
  onClose,
  orders,
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Smooth Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity duration-250 ease-out ${
          isClosing ? 'opacity-0' : 'animate-backdrop-in'
        }`}
      />

      {/* Smooth Modal Dialog */}
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

        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#BC472A] uppercase font-semibold">
              HISTORICAL DISPATCH LOG
            </span>
            <h2 className="font-serif font-bold text-2xl text-[#1C1917] tracking-tight uppercase mt-0.5">
              ORDER ARCHIVE
            </h2>
          </div>

          {/* Orders List matching Screenshot 2 */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {orders.length === 0 ? (
              <div className="py-12 text-center text-[#786F63] text-xs font-mono">
                NO PREVIOUS ARCHIVAL ORDERS RECORDED.
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#EFECE5] border border-[#E2DBD0] rounded-xs p-4 space-y-3 font-mono text-xs shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-[#DDD5C7] pb-2">
                    <span className="font-bold text-[#1C1917] tracking-wider">
                      {order.id}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[#7A7165] text-[11px]">
                        <Clock className="w-3 h-3" />
                        <span>{order.date}</span>
                      </div>
                      <span className="bg-[#E2EDE5] text-[#1E5638] font-bold px-1.5 py-0.5 rounded-xs text-[10px] uppercase">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[#4A4237]">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-baseline">
                        <span className="truncate pr-2">
                          {item.quantity}x {item.title} <span className="text-[11px] text-[#7A7165]">(by {item.author})</span>
                        </span>
                        <span className="font-semibold text-[#1C1917] shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-[#DDD5C7] text-[#7A7165]">
                    <span>Dispatched to {order.recipientName}</span>
                    <span className="font-bold text-[#1C1917]">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Close Ledger Button matching Screenshot 2 */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleClose}
              className="bg-[#1C1917] hover:bg-black text-[#FAF8F5] px-6 py-2.5 rounded-xs font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer select-none"
            >
              CLOSE LEDGER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
