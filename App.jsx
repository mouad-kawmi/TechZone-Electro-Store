
import React, { useMemo, useEffect, useState, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import QuickViewModal from './components/QuickViewModal';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import { SkeletonCard, SkeletonDetails } from './components/Skeleton';
import { CheckCircle2, X } from 'lucide-react';


// Views
import HomeView from './views/HomeView.jsx';
import DetailsView from './views/DetailsView.jsx';
import CheckoutView from './views/CheckoutView.jsx';
import ComparisonView from './views/ComparisonView.jsx';
import ContactView from './views/ContactView.jsx';
import OrderSuccessView from './views/OrderSuccessView.jsx';
import LoginView from './views/LoginView.jsx';
import ProfileView from './views/ProfileView.jsx';
import AdminView from './views/AdminView.jsx';
import CategoryView from './components/CategoryPage.jsx';
import TrackingView from './views/TrackingView.jsx';
import SearchResultsView from './views/SearchResultsView.jsx';
import PolicyView from './views/PolicyView.jsx';
import FAQView from './views/FAQView.jsx';

// Actions
import {
    setDarkMode, setView, setActiveCategory, setSearchQuery,
    setToast, toggleCart, toggleWishlistDrawer,
    addToCart, removeFromCart, updateQuantity, clearCart,
    updateProducts, toggleWishlist, toggleCompare, addOrder, updateOrderStatus,
    deductStock, addMessage, addReview, deleteReview
} from "./store";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    const dispatch = useDispatch();
    const mainRef = useRef(null);

    const ui = useSelector((state) => state.ui);
    const cart = useSelector((state) => state.cart);
    const products = useSelector((state) => state.products);
    const wishlist = useSelector((state) => state.wishlist);
    const compare = useSelector((state) => state.compare);
    const ordersState = useSelector((state) => state.orders);
    const messages = useSelector((state) => state.messages); // Get messages state

    const { isDarkMode, view, activeCategory, searchQuery, toast, isCartOpen, isWishlistOpen } = ui;
    const cartItems = cart.items;
    const allProducts = products.all;
    const wishlistItems = wishlist.items;
    const compareItems = compare.items;
    const allOrders = ordersState.allOrders;

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [lastOrder, setLastOrder] = useState(null);
    const { isLoggedIn, user: currentUser } = useSelector((state) => state.auth);
    const [isLoadingView, setIsLoadingView] = useState(false);

    useEffect(() => {
        const win = window;
        if (win.Lenis) {
            const lenis = new win.Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
            });

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);

            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);
            return () => { lenis.destroy(); };
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDarkMode]);

    useEffect(() => {
        const magnets = document.querySelectorAll('.magnetic');
        magnets.forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { left, top, width, height } = el.getBoundingClientRect();
                const x = clientX - (left + width / 2);
                const y = clientY - (top + height / 2);
                gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
            });
        });
    }, [view, isLoadingView, searchQuery]);

    useEffect(() => {
        setIsLoadingView(true);
        const timer = setTimeout(() => setIsLoadingView(false), 600);
        return () => clearTimeout(timer);
    }, [view, activeCategory]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                dispatch(setToast(null));
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [toast, dispatch]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!isLoadingView) {
                const pageContent = document.querySelector(".page-content");
                if (pageContent) {
                    gsap.fromTo(".page-content", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" });
                }
            }
        }, mainRef);
        return () => ctx.revert();
    }, [view, activeCategory, searchQuery, isLoadingView]);

    const filteredProducts = useMemo(() => {
        let result = activeCategory === "All" ? allProducts : allProducts.filter((p) => p.category === activeCategory);
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            result = result.filter((p) => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
        }
        return result;
    }, [activeCategory, searchQuery, allProducts]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        dispatch(setToast({ msg: `${product.title} ajouté au panier !`, type: 'success' }));
    };

    const handleGoHome = () => {
        dispatch(setView('HOME'));
        setSelectedProduct(null);
    };

    const handleCategoryClick = (cat) => {
        dispatch(setActiveCategory(cat));
        if (cat === "All") {
            dispatch(setView('HOME'));
        } else {
            dispatch(setView('CATEGORY'));
        }
        window.scrollTo(0, 0);
    };

    const renderContent = () => {
        if (isLoadingView) {
            if (view === 'DETAILS') return <SkeletonDetails />;
            return (
                <section className="max-w-[1440px] mx-auto px-6 py-24">
                    <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonCard key={i} />)}
                    </div>
                </section>
            );
        }

        const commonProps = { onBack: handleGoHome, allProducts, handleAddToCart };

        switch (view) {
            case 'HOME': return <HomeView searchQuery={searchQuery} activeCategory={activeCategory} onCategoryChange={handleCategoryClick} filteredProducts={filteredProducts} allProducts={allProducts} onViewDetails={(p) => { setSelectedProduct(p); dispatch(setView('DETAILS')); }} onQuickView={setQuickViewProduct} onAddToCart={handleAddToCart} onToggleWishlist={(p) => dispatch(toggleWishlist(p))} onAddToCompare={(p) => dispatch(toggleCompare(p))} wishlistItems={wishlistItems} compareItems={compareItems} />;
            case 'DETAILS': return <DetailsView selectedProduct={selectedProduct} allProducts={allProducts} onBack={handleGoHome} onAddToCart={handleAddToCart} onViewDetails={(p) => setSelectedProduct(p)} onQuickView={setQuickViewProduct} onAddToCompare={(p) => dispatch(toggleCompare(p))} onToggleWishlist={(p) => dispatch(toggleWishlist(p))} wishlistItems={wishlistItems} compareItems={compareItems} onAddReview={(productId, review) => dispatch(addReview({ productId, review }))} />;
            case 'CONTACT': return <ContactView onBack={handleGoHome} onSendMessage={(msg) => dispatch(addMessage(msg))} />;
            case 'CHECKOUT': return <CheckoutView cartItems={cartItems} onBack={handleGoHome} onUpdateQuantity={(id, delta) => dispatch(updateQuantity({ id, delta }))} onRemove={(id) => dispatch(removeFromCart(id))} onConfirm={(orderData) => {
                const newOrder = {
                    ...orderData,
                    id: `TZ-${Math.floor(Math.random() * 1000000)}`,
                    date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
                    status: 'En Attente',
                    userId: currentUser?.id
                };
                dispatch(addOrder(newOrder));
                dispatch(clearCart());
                setLastOrder(newOrder);
                dispatch(setView('ORDER_SUCCESS'));
            }} />;
            case 'ORDER_SUCCESS': return <OrderSuccessView onContinue={handleGoHome} orderData={lastOrder} onTrack={() => dispatch(setView('TRACKING'))} />;
            case 'LOGIN': return <LoginView onBack={() => {
                const isAdmin = currentUser?.role === 'admin' || currentUser?.email === 'admin';
                dispatch(setView(isAdmin ? 'ADMIN' : 'HOME'));
            }} onGoRegister={() => dispatch(setView('HOME'))} onLogin={() => { }} />;
            case 'PROFILE': return <ProfileView onBack={() => dispatch(setView('HOME'))} onAdminClick={(currentUser?.role === 'admin' || currentUser?.email === 'admin') ? () => dispatch(setView('ADMIN')) : null} isAdmin={(currentUser?.role === 'admin' || currentUser?.email === 'admin')} />;
            case 'ADMIN': return <AdminView
                onBack={handleGoHome}
                allProducts={allProducts}
                onProductsChange={(prods) => dispatch(updateProducts(prods))}
                orders={allOrders}
                messages={messages?.items || []}
                onDeleteReview={(productId, reviewId) => dispatch(deleteReview({ productId, reviewId }))}
                onOrdersChange={(order, status) => {
                    dispatch(updateOrderStatus({ id: order.id, status }));
                    if (status === 'Livré') {
                        if (order.items && order.items.length > 0) {
                            dispatch(deductStock(order.items));
                        }
                    }
                }}
            />;
            case 'TRACKING': return <TrackingView onBack={handleGoHome} orders={allOrders} />;
            case 'COMPARE': return <ComparisonView compareItems={compareItems} onBack={handleGoHome} onRemove={(id) => dispatch(toggleCompare({ id }))} onAddToCart={handleAddToCart} onViewDetails={(p) => { setSelectedProduct(p); dispatch(setView('DETAILS')); }} />;
            case 'CATEGORY': return <CategoryView category={activeCategory} products={allProducts.filter(p => p.category === activeCategory)} onViewDetails={(p) => { setSelectedProduct(p); dispatch(setView('DETAILS')); }} onQuickView={setQuickViewProduct} onAddToCart={handleAddToCart} onBack={handleGoHome} onToggleWishlist={(p) => dispatch(toggleWishlist(p))} onAddToCompare={(p) => dispatch(toggleCompare(p))} wishlistItems={wishlistItems} compareItems={compareItems} />;
            case 'SEARCH': return <SearchResultsView query={searchQuery} products={allProducts} onBack={handleGoHome} onViewDetails={(p) => { setSelectedProduct(p); dispatch(setView('DETAILS')); }} onQuickView={setQuickViewProduct} onAddToCart={handleAddToCart} onToggleWishlist={(p) => dispatch(toggleWishlist(p))} onAddToCompare={(p) => dispatch(toggleCompare(p))} wishlistItems={wishlistItems} compareItems={compareItems} />;
            case 'POLICY_SHIPPING': return <PolicyView type="shipping" onBack={handleGoHome} />;
            case 'POLICY_RETURNS': return <PolicyView type="returns" onBack={handleGoHome} />;
            case 'POLICY_PRIVACY': return <PolicyView type="privacy" onBack={handleGoHome} />;
            case 'POLICY_TERMS': return <PolicyView type="terms" onBack={handleGoHome} />;
            case 'POLICY_FAQ': return <FAQView onBack={handleGoHome} />;
            default: return <div className="py-20 text-center uppercase font-black text-slate-400">Page non disponible</div>;
        }
    };

    return (
        <div ref={mainRef} className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
            <Header
                cartCount={cartItems.length}
                wishlistCount={wishlistItems.length}
                allProducts={allProducts}
                onSearch={(q) => dispatch(setSearchQuery(q))}
                onSearchSubmit={(q) => {
                    dispatch(setSearchQuery(q));
                    dispatch(setView('SEARCH'));
                    window.scrollTo(0, 0);
                }}
                onHomeClick={handleGoHome}
                onCategoryClick={handleCategoryClick}
                onCartClick={() => dispatch(toggleCart())}
                onWishlistClick={() => dispatch(toggleWishlistDrawer())}
                onAboutClick={() => dispatch(setView('ABOUT'))}
                onContactClick={() => dispatch(setView('CONTACT'))}
                onPolicyClick={(view) => dispatch(setView(`POLICY_${view.toUpperCase()}`))}
                onViewProduct={(p) => { setSelectedProduct(p); dispatch(setView('DETAILS')); }}
                onQuickView={setQuickViewProduct}
                onAddToCompare={(p) => dispatch(toggleCompare(p))}
                onTrackOrder={() => dispatch(setView('TRACKING'))}
                searchQuery={searchQuery}
            />

            <CartDrawer
                isOpen={isCartOpen}
                items={cartItems}
                onClose={() => dispatch(toggleCart())}
                onCheckout={() => { dispatch(setView('CHECKOUT')); dispatch(toggleCart()); }}
                onRemove={(id) => dispatch(removeFromCart(id))}
                onUpdateQuantity={(id, delta) => dispatch(updateQuantity({ id, delta }))}
            />

            <WishlistDrawer
                isOpen={isWishlistOpen}
                items={wishlistItems}
                onClose={() => dispatch(toggleWishlistDrawer())}
                onAddToCart={handleAddToCart}
                onRemove={(id) => dispatch(toggleWishlist({ id }))}
                onAddAllToCart={() => { wishlistItems.forEach((item) => dispatch(addToCart(item))); dispatch(toggleWishlistDrawer()); }}
            />

            <QuickViewModal
                product={quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
                onAddToCart={handleAddToCart}
                onViewDetails={(p) => { setSelectedProduct(p); dispatch(setView('DETAILS')); setQuickViewProduct(null); }}
            />

            <WhatsAppButton />

            {toast && (
                <div className="fixed bottom-10 right-10 z-[300] w-[360px] animate-fade-up">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-6 relative">
                        <div className="flex items-center gap-5">
                            <div className="size-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                <CheckCircle2 className="size-5" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Notification</h4>
                                <p className="text-[11px] font-black text-slate-600 dark:text-slate-400 italic">{toast.msg || toast.message}</p>
                            </div>
                        </div>
                        <button onClick={() => dispatch(setToast(null))} className="absolute top-4 right-4 text-slate-400">
                            <X className="size-5" />
                        </button>
                        <div className="absolute bottom-0 left-0 h-1 bg-blue-600 animate-toast-progress"></div>
                    </div>
                </div>
            )}

            <main className="flex-grow pt-24">{renderContent()}</main>

            <Footer
                onAboutClick={() => dispatch(setView('ABOUT'))}
                onContactClick={() => dispatch(setView('CONTACT'))}
                onCategoryClick={handleCategoryClick}
                onPolicyClick={(view) => dispatch(setView(`POLICY_${view.toUpperCase()}`))}
                onAdminClick={() => dispatch(setView('ADMIN'))}
            />
        </div>
    );
};

export default App;
