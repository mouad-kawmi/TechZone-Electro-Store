
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import EmptyState from '../UI/EmptyState';

const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity,
  onCheckout
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 2000 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-[450px] w-full flex">
        <div className="w-full flex flex-col bg-white h-full animate-slide-in overflow-hidden shadow-2xl relative">

          {/* Header */}
          <div className="px-6 py-8 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="size-12 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm">
                <ShoppingBag className="size-6 text-[#b088ff]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Mon Panier</h2>
                <p className="text-xs font-medium text-gray-400">{items.length} Articles</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="size-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-all active:scale-90"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar bg-[#fcfcfc]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#b088ff]/10 blur-3xl rounded-full scale-150"></div>
                  <div className="relative size-28 bg-white rounded-full border border-gray-100 shadow-xl flex items-center justify-center">
                    <ShoppingBag className="size-12 text-[#b088ff]" strokeWidth={1} />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">Votre panier est vide</h3>
                  <p className="text-sm text-gray-500 max-w-[280px] leading-relaxed">
                    Explorez notre collection et trouvez votre prochaine paire !
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-gray-900 text-white px-10 py-4 rounded-xl font-bold text-sm hover:scale-105 transition-all active:scale-95 shadow-lg"
                >
                  Continuer mes achats
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedColor}-${item.selectedStorage}`}
                    className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex gap-4 animate-fade-up"
                  >
                    <div className="size-24 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={item.image || null}
                        alt={item.title}
                        className="size-20 object-contain hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                          <span className="inline-block px-2 py-0.5 bg-[#f5f0ff] text-[#b088ff] text-[10px] font-bold rounded-lg uppercase tracking-wider">
                            {item.selectedStorage || item.selectedColor || 'Tech'}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="p-1.5 text-rose-300 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 border border-gray-100 rounded-xl px-2 py-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:text-[#b088ff] transition-colors"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="text-xs font-bold text-gray-900 min-w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:text-[#b088ff] transition-colors"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          {item.price.toLocaleString()} DH
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary */}
          <div className="mt-auto p-6 bg-white border-t border-gray-100 space-y-6">
            <div className="bg-[#f7f8fa] p-6 rounded-[2.5rem] space-y-4">
              <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                <span>Sous-total</span>
                <span className="text-gray-900 font-bold">{subtotal.toLocaleString()}.00 DH</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                <span>Livraison</span>
                <span className="text-emerald-500 font-bold">{shipping === 0 ? 'Gratuite' : `${shipping} DH`}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-[#b088ff] font-display">
                  {total.toLocaleString()}.00 DH
                </span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              disabled={items.length === 0}
              className="w-full bg-[#b088ff] hover:bg-[#a075ff] disabled:opacity-50 text-white h-20 rounded-[2rem] flex items-center justify-center gap-4 shadow-xl shadow-[#b088ff]/20 transition-all active:scale-[0.98] group"
            >
              <div className="size-8 bg-white/20 rounded-xl flex items-center justify-center">
                <ShoppingBag className="size-4 text-white" />
              </div>
              <span className="font-bold uppercase tracking-widest text-sm">Procéder au Paiement</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
