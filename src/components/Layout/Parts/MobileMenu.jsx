import React from 'react';
import { X, Heart, ShoppingBag, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout, setView } from '../../../store';

const MobileMenu = ({ menuOpen, setMenuOpen, items, onCategoryClick, onWishlistClick, wishlistCount, onCartClick, cartCount, onTrackOrder, onContactClick, auth }) => {
    const dispatch = useDispatch();

    return (
        <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-500 ${menuOpen ? 'visible' : 'invisible'}`}>
            <div
                className={`absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setMenuOpen(false)}
            />
            <div className={`absolute top-0 right-0 h-full w-[85%] max-w-xs bg-white dark:bg-slate-950 shadow-2xl transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-6 border-b border-slate-50 dark:border-white/5">
                    <h2 className="text-xl font-bold font-display uppercase tracking-tighter">Menu</h2>
                    <button onClick={() => setMenuOpen(false)} className="size-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center">
                        <X className="size-5" />
                    </button>
                </div>

                <div className="p-6 space-y-2">
                    {items.map((it) => (
                        <button
                            key={it.name}
                            onClick={() => { onCategoryClick?.(it.name); setMenuOpen(false); }}
                            className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-left"
                        >
                            <span className="text-[12px] font-bold uppercase tracking-widest">{it.label}</span>
                            <it.icon className="size-4 text-slate-400" />
                        </button>
                    ))}

                    <div className="pt-6 mt-6 border-t border-slate-50 dark:border-white/5 space-y-4">
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button
                                onClick={() => { onWishlistClick(); setMenuOpen(false); }}
                                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-white/5 gap-2"
                            >
                                <div className="relative">
                                    <Heart className={`size-5 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                                    {wishlistCount > 0 && <span className="absolute -top-1 -right-1 size-2 bg-rose-500 rounded-full"></span>}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Favoris</span>
                            </button>
                            <button
                                onClick={() => { onCartClick(); setMenuOpen(false); }}
                                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 gap-2"
                            >
                                <div className="relative">
                                    <ShoppingBag className="size-5" />
                                    {cartCount > 0 && <span className="absolute -top-1 -right-1 size-4 bg-blue-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white dark:border-slate-950">{cartCount}</span>}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Panier</span>
                            </button>
                        </div>

                        <button onClick={() => { onTrackOrder(); setMenuOpen(false); }} className="w-full text-left p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Suivre ma commande</button>
                        <button onClick={() => { onContactClick(); setMenuOpen(false); }} className="w-full text-left p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Aide & Support</button>

                        {auth.isLoggedIn ? (
                            <button onClick={() => dispatch(logout())} className="w-full flex items-center gap-3 p-4 text-rose-500 text-[10px] font-bold uppercase tracking-widest">
                                <LogOut className="size-4" />
                                Déconnexion
                            </button>
                        ) : (
                            <button onClick={() => { dispatch(setView('LOGIN')); setMenuOpen(false); }} className="w-full p-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-[10px] font-bold uppercase tracking-widest">Connexion / Inscription</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
