import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2, X, Info } from 'lucide-react';
import Header from './Header';
import CartDrawer from '../Checkout/CartDrawer';
import WishlistDrawer from '../Product/WishlistDrawer';
import QuickViewModal from '../Product/QuickViewModal';
import WhatsAppButton from './WhatsAppButton';
import {
    toggleCart, toggleWishlistDrawer, toggleWishlist, addToCart, removeFromCart,
    updateQuantity, setSelectedProductId, setView, setSearchQuery, toggleCompare, setToast
} from '../../store';

const GlobalUI = ({ quick, setQuick, handleAddToCart, searchQuery, handleGoHome, handleCategoryClick }) => {
    const dispatch = useDispatch();
    const ui = useSelector((state) => state.ui);
    const cart = useSelector((state) => state.cart);
    const wishlist = useSelector((state) => state.wishlist);
    const products = useSelector((state) => state.products);

    const { isCartOpen, isWishlistOpen, toast } = ui;
    const { items } = cart;
    const { items: wishes } = wishlist;
    const { all: prods } = products;

    return (
        <>
            <Header
                cartCount={items.length}
                wishlistCount={wishes.length}
                allProducts={prods}
                onSearch={(q) => dispatch(setSearchQuery(q))}
                onSearchSubmit={(q) => {
                    dispatch(setSearchQuery(q));
                    dispatch(setView('SEARCH'));
                    window.scrollTo(0, 0);
                }}
                onHomeClick={handleGoHome}
                onCartClick={() => dispatch(toggleCart())}
                onWishlistClick={() => dispatch(toggleWishlistDrawer())}
                onAboutClick={() => dispatch(setView('ABOUT'))}
                onContactClick={() => dispatch(setView('CONTACT'))}
                onPolicyClick={(v) => dispatch(setView(`POLICY_${v.toUpperCase()}`))}
                onViewProduct={(p) => { dispatch(setSelectedProductId(p.id)); dispatch(setView('DETAILS')); }}
                onQuickView={(p) => setQuick(p)}
                onAddToCompare={(p) => dispatch(toggleCompare(p))}
                onTrackOrder={() => dispatch(setView('TRACKING'))}
                onCategoryClick={handleCategoryClick}
                searchQuery={searchQuery}
            />

            <CartDrawer
                isOpen={isCartOpen}
                items={items}
                onClose={() => dispatch(toggleCart())}
                onCheckout={() => { dispatch(setView('CHECKOUT')); dispatch(toggleCart()); }}
                onRemove={(id) => dispatch(removeFromCart(id))}
                onUpdateQuantity={(id, delta) => dispatch(updateQuantity({ id, delta }))}
            />

            <WishlistDrawer
                isOpen={isWishlistOpen}
                items={wishes}
                onClose={() => dispatch(toggleWishlistDrawer())}
                onAddToCart={handleAddToCart}
                onRemove={(id) => dispatch(toggleWishlist({ id }))}
                onAddAllToCart={() => { wishes.forEach((item) => dispatch(addToCart(item))); dispatch(toggleWishlistDrawer()); }}
            />

            <QuickViewModal
                product={quick}
                onClose={() => setQuick(null)}
                onAddToCart={handleAddToCart}
                onViewDetails={(p) => { dispatch(setSelectedProductId(p.id)); dispatch(setView('DETAILS')); setQuick(null); }}
                onToggleWishlist={(p) => dispatch(toggleWishlist(p))}
                wishlistItems={wishes}
            />

            <WhatsAppButton />

            {toast && (
                <div className="fixed bottom-10 right-1/2 translate-x-1/2 md:right-10 md:translate-x-0 z-[300] w-[90%] max-w-[400px] animate-in slide-in-from-bottom-5 duration-500">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-white dark:border-slate-800 p-6 overflow-hidden relative group">
                        <div className="flex items-center gap-5 relative z-10">
                            <div className={`size-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg ${toast.type === 'success' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' :
                                toast.type === 'error' ? 'bg-gradient-to-br from-rose-500 to-rose-700' :
                                    'bg-gradient-to-br from-blue-500 to-indigo-700'
                                }`}>
                                {toast.type === 'success' ? <CheckCircle2 className="size-6" /> :
                                    toast.type === 'error' ? <X className="size-6" /> :
                                        <Info className="size-6" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${toast.type === 'success' ? 'text-emerald-600' :
                                    toast.type === 'error' ? 'text-rose-600' :
                                        'text-blue-600'
                                    }`}>
                                    {toast.type === 'success' ? 'Succès' : toast.type === 'error' ? 'Attention' : 'Information'}
                                </h4>
                                <p className="text-[13px] font-black text-slate-800 dark:text-white leading-tight">
                                    {toast.msg || toast.message}
                                </p>
                            </div>
                            <button onClick={() => dispatch(setToast(null))} className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
                                <X className="size-4" />
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-800">
                            <div className={`h-full animate-toast-progress ${toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'error' ? 'bg-rose-500' : 'bg-blue-600'}`}></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GlobalUI;
