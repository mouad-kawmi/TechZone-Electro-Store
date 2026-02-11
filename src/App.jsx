import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Footer from './components/Layout/Footer';
import GlobalUI from './components/Layout/GlobalUI';
import ContentRouter from './ContentRouter';
import useAppEffects from './hooks/useAppEffects';

// Redux
import {
    setToast, setActiveCategory, setActiveBrand, updateProducts, updateOrderStatus,
    setView, setSelectedProductId, addToCart, clearCart, toggleWishlist, toggleCompare,
    setSearchQuery, deleteReview
} from "./store";

const App = () => {
    const dispatch = useDispatch();
    const main = useRef(null);

    const ui = useSelector((state) => state.ui);
    const cart = useSelector((state) => state.cart);
    const products = useSelector((state) => state.products);
    const wishlist = useSelector((state) => state.wishlist);
    const compare = useSelector((state) => state.compare);
    const orders = useSelector((state) => state.orders);
    const auth = useSelector((state) => state.auth);

    const { view, activeCategory, activeBrand, searchQuery, toast, selectedProductId } = ui;
    const { items } = cart;
    const { all: prods } = products;
    const { items: wishes } = wishlist;
    const { items: comps } = compare;
    const { allOrders: allO } = orders;

    const [quick, setQuick] = useState(null);
    const [last, setLast] = useState(null);
    const [loading, setLoading] = useState(false);

    // Initialisation
    useAppEffects(dispatch, { ...ui, loading, main });

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, [view, activeCategory]);

    const selP = useMemo(() => {
        if (!selectedProductId) return null;
        return prods.find(p => p.id === Number(selectedProductId) || p.id === selectedProductId);
    }, [selectedProductId, prods]);

    const filts = useMemo(() => {
        let res = prods;
        if (activeCategory !== "All") res = res.filter(p => p.category === activeCategory);
        if (activeBrand !== "All") res = res.filter(p => p.brand === activeBrand);
        if (searchQuery.trim() !== "") {
            const q = searchQuery.toLowerCase();
            res = res.filter(p => p.title.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q)) || (p.brand && p.brand.toLowerCase().includes(q)));
        }
        return res;
    }, [activeCategory, activeBrand, searchQuery, prods]);

    const handleAddToCart = (p) => {
        dispatch(addToCart(p));
        dispatch(setToast({ msg: `${p.title} ajouté !`, type: 'success' }));
    };

    const handleGoHome = () => {
        dispatch(setView('HOME'));
        dispatch(setActiveCategory('All'));
        dispatch(setActiveBrand('All'));
        dispatch(setSearchQuery(''));
        dispatch(setSelectedProductId(null));
        window.scrollTo(0, 0);
    };

    const handleCategoryClick = (c) => {
        dispatch(setActiveCategory(c));
        dispatch(setView('CATEGORY'));
        dispatch(setSearchQuery(''));
        window.scrollTo(0, 0);
    };

    return (
        <div ref={main} className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
            <GlobalUI
                quick={quick} setQuick={setQuick}
                handleAddToCart={handleAddToCart}
                searchQuery={searchQuery}
                handleGoHome={handleGoHome}
                handleCategoryClick={handleCategoryClick}
            />

            <main className="flex-grow pt-24">
                <ContentRouter
                    view={view} loading={loading} auth={auth} prods={prods} wishes={wishes}
                    comps={comps} items={items} allO={allO} selP={selP} searchQuery={searchQuery}
                    activeCategory={activeCategory} activeBrand={activeBrand} filts={filts}
                    last={last} handleAddToCart={handleAddToCart} handleGoHome={handleGoHome}
                    setQuick={setQuick} setLast={setLast} dispatch={dispatch}
                    setActiveCategory={setActiveCategory} setActiveBrand={setActiveBrand}
                    setView={setView} setSelectedProductId={setSelectedProductId}
                    updateProducts={updateProducts} updateOrderStatus={updateOrderStatus}
                    deleteReview={deleteReview} clearCart={clearCart}
                    toggleWishlist={toggleWishlist} toggleCompare={toggleCompare}
                />
            </main>

            <Footer
                onAboutClick={() => dispatch(setView('ABOUT'))}
                onContactClick={() => dispatch(setView('CONTACT'))}
                onCategoryClick={handleCategoryClick}
                onPolicyClick={(view) => dispatch(setView(`POLICY_${view.toUpperCase()}`))}
                onAdminClick={() => dispatch(setView('ADMIN'))}
                onReviewsClick={() => { dispatch(setView('REVIEWS')); window.scrollTo(0, 0); }}
            />
        </div>
    );
};

export default App;
