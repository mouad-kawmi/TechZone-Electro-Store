
import React from 'react';
import { X, Trash2, Heart, ShoppingCart, ArrowRight, ShoppingBag } from 'lucide-react';
import EmptyState from '../UI/EmptyState';

const WishlistDrawer = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onAddToCart,
  onAddAllToCart
}) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] overflow-hidden ">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-[420px] w-full flex">
        <div className="w-full flex flex-col bg-white dark:bg-slate-950 shadow-2xl h-full animate-slide-in rounded-l-[3rem] overflow-hidden border-l border-white/20 dark:border-slate-800">

          {/* Header */}
          <div className="px-8 pt-10 pb-6 flex items-start justify-between border-b border-slate-50 dark:border-slate-800">
            <div className="flex gap-4">
              <div className="bg-rose-50 dark:bg-rose-950/20 p-3.5 rounded-2xl">
                <Heart className="h-6 w-6 text-rose-500 fill-current" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight font-display">Mes Favoris</h2>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1.5">
                  {items.length} {items.length <= 1 ? 'PRODUIT SAUVEGARDÉ' : 'PRODUITS SAUVEGARDÉS'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all active:scale-90"
            >
              <X className="h-7 w-7" strokeWidth={2.5} />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
            {items.length === 0 ? (
              <EmptyState
                type="wishlist"
                onAction={onClose}
              />
            ) : (
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-5 p-4 rounded-3xl border border-transparent hover:border-slate-100 dark:hover:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all group"
                  >
                    <div className="h-20 w-20 shrink-0 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 p-1.5 shadow-sm">
                      <img
                        src={item.image || null}
                        alt={item.title}
                        className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter line-clamp-1 font-display">
                        {item.title}
                      </h3>
                      <p className="text-base font-black text-blue-600 dark:text-blue-400 font-display">
                        {item.price.toLocaleString()} DH
                      </p>
                      <span className="inline-block text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                        En Stock
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => onAddToCart(item)}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90"
                        title="Ajouter au panier"
                      >
                        <ShoppingCart className="h-4 w-4" strokeWidth={2.5} />
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="h-10 w-10 flex items-center justify-center rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-rose-950/20 transition-all active:scale-90"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-8 bg-white dark:bg-slate-950 border-t border-slate-50 dark:border-slate-800 space-y-4">
              <button
                onClick={onAddAllToCart}
                className="w-full bg-blue-600 hover:bg-slate-900 dark:hover:bg-blue-500 text-white font-black py-5 rounded-[2rem] flex items-center justify-center gap-4 shadow-xl shadow-blue-600/20 transition-all duration-500 active:scale-[0.98] uppercase tracking-[0.15em] text-sm"
              >
                <ShoppingBag className="h-5 w-5" />
                Tout ajouter au panier
              </button>
              <p className="text-center text-slate-400 text-[9px] uppercase tracking-[0.3em] font-black">
                Livraison gratuite dès 2000 DH
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
