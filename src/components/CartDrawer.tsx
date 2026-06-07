import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { productImages } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
}

export function CartDrawer({ isOpen, onClose, items, onRemoveItem }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end text-black font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black/40 pointer-events-auto"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden p-8 md:p-12"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-16 shrink-0">
              <h2 className="text-3xl font-serif italic text-black">
                Bag
              </h2>
              <button
                onClick={onClose}
                className="text-3xl font-light hover:rotate-90 transition-transform text-black pb-1 leading-none"
              >
                &times;
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
              {items.length === 0 ? (
                <div className="text-sm text-zinc-400 italic">
                  Your bag is currently empty.
                </div>
              ) : (
                items.map((item, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-6 pb-6 border-b border-zinc-50 group" 
                    key={`${item.color.id}-${index}`}
                  >
                    <div className="w-24 h-24 bg-zinc-50 flex items-center justify-center border border-zinc-100 flex-shrink-0 relative overflow-hidden">
                      <img
                        src={productImages[item.color.imageId]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                      <div className="text-lg font-serif italic mb-1 text-black">
                        {item.product.name}
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 mb-2">
                        {item.color.name} Edition • Qty: {item.quantity}
                      </div>
                      <div className="flex justify-between items-center text-sm text-black">
                        <span>${item.product.price * item.quantity}.00</span>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors underline underline-offset-2 md:opacity-0 md:group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-zinc-100 pt-10 mt-6 bg-white shrink-0">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">Estimated Total</span>
                  <span className="text-2xl font-light text-black">${subtotal}.00</span>
                </div>
                <button className="w-full bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold py-5 hover:bg-zinc-800 transition-colors rounded-none">
                  Secure Checkout
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
