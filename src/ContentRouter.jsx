import React from 'react';
import HomeView from './views/HomeView';
import DetailsView from './views/DetailsView.jsx';
import CategoryView from './components/Product/CategoryPage.jsx';
import AdminView from './views/AdminView.jsx';
import ProfileView from './views/ProfileView';
import LoginView from './views/LoginView';
import CheckoutView from './views/CheckoutView.jsx';
import OrderSuccessView from './views/OrderSuccessView.jsx';
import SearchResultsView from './views/SearchResultsView.jsx';
import ReviewsPage from './components/Pages/ReviewsPage.jsx';
import ContactView from './views/ContactView.jsx';
import About from './components/Pages/About';
import TrackingView from './views/TrackingView.jsx';
import ComparisonView from './views/ComparisonView.jsx';
import PolicyView from './views/PolicyView.jsx';

const ContentRouter = (props) => {
    const {
        view, loading, auth, prods, wishes, comps, items, allO, selP,
        searchQuery, activeCategory, activeBrand, filts, last,
        handleAddToCart, handleGoHome, setQuick, setLast, dispatch,
        setActiveCategory, setActiveBrand, setView, setSelectedProductId,
        updateProducts, updateOrderStatus, deleteReview, clearCart, toggleWishlist, toggleCompare
    } = props;

    if (loading) return <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-950 transition-colors uppercase font-black tracking-widest text-[10px]">Chargement...</div>;

    switch (view) {
        case 'HOME':
            return <HomeView
                searchQuery={searchQuery}
                activeCategory={activeCategory}
                activeBrand={activeBrand}
                onCategoryChange={(c) => dispatch(setActiveCategory(c))}
                onBrandChange={(b) => dispatch(setActiveBrand(b))}
                filteredProducts={filts}
                allProducts={prods}
                onViewDetails={(p) => { dispatch(setSelectedProductId(p.id)); dispatch(setView('DETAILS')); }}
                onAddToCart={handleAddToCart}
                onToggleWishlist={(p) => dispatch(toggleWishlist(p))}
                onQuickView={(p) => setQuick(p)}
                onAddToCompare={(p) => dispatch(toggleCompare(p))}
                onReadMoreReviews={() => { dispatch(setView('REVIEWS')); window.scrollTo(0, 0); }}
                wishlistItems={wishes}
                compareItems={comps}
            />;
        case 'DETAILS':
            return selP ? (
                <DetailsView
                    selectedProduct={selP}
                    allProducts={prods}
                    onBack={handleGoHome}
                    onAddToCart={handleAddToCart}
                    onViewDetails={(p) => { dispatch(setSelectedProductId(p.id)); dispatch(setView('DETAILS')); }}
                    onQuickView={(p) => setQuick(p)}
                    onToggleWishlist={(p) => dispatch(toggleWishlist(p))}
                    onAddToCompare={(p) => dispatch(toggleCompare(p))}
                    wishlistItems={wishes}
                    compareItems={comps}
                />
            ) : <HomeView />;
        case 'CATEGORY':
            return <CategoryView
                category={activeCategory}
                products={prods}
                onViewDetails={(p) => { dispatch(setSelectedProductId(p.id)); dispatch(setView('DETAILS')); }}
                onAddToCart={handleAddToCart}
                onToggleWishlist={(p) => dispatch(toggleWishlist(p))}
                onQuickView={(p) => setQuick(p)}
                onAddToCompare={(p) => dispatch(toggleCompare(p))}
                wishlistItems={wishes}
                compareItems={comps}
                onBack={handleGoHome}
            />;
        case 'ADMIN':
            return auth.isLoggedIn && (auth.user?.role === 'admin' || auth.user?.email === 'admin') ? (
                <AdminView
                    onBack={handleGoHome}
                    allProducts={prods}
                    onProductsChange={(p) => dispatch(updateProducts(p))}
                    orders={allO}
                    onOrdersChange={(o) => dispatch(updateOrderStatus(o))}
                    onDeleteReview={(id) => dispatch(deleteReview(id))}
                />
            ) : <LoginView />;
        case 'PROFILE':
            return auth.isLoggedIn ? <ProfileView onBack={handleGoHome} /> : <LoginView />;
        case 'LOGIN':
            return <LoginView onBack={handleGoHome} />;
        case 'CHECKOUT':
            return <CheckoutView items={items} onOrderSuccess={(o) => { setLast(o); dispatch(setView('SUCCESS')); dispatch(clearCart()); }} onBack={handleGoHome} />;
        case 'SUCCESS':
            return <OrderSuccessView order={last} onReturnHome={handleGoHome} />;
        case 'SEARCH':
            return <SearchResultsView
                query={searchQuery}
                filteredProducts={filts}
                allProducts={prods}
                onViewDetails={(p) => { dispatch(setSelectedProductId(p.id)); dispatch(setView('DETAILS')); }}
                onAddToCart={handleAddToCart}
                onToggleWishlist={(p) => dispatch(toggleWishlist(p))}
                onQuickView={(p) => setQuick(p)}
                wishlistItems={wishes}
                onBack={handleGoHome}
            />;
        case 'REVIEWS': return <ReviewsPage onBack={handleGoHome} products={prods} />;
        case 'CONTACT': return <ContactView onBack={handleGoHome} />;
        case 'ABOUT': return <About onBack={handleGoHome} />;
        case 'TRACKING': return <TrackingView onBack={handleGoHome} orders={allO} />;
        case 'COMPARE': return <ComparisonView compareItems={comps} onBack={handleGoHome} onRemove={(id) => dispatch(toggleCompare({ id }))} onAddToCart={handleAddToCart} onViewDetails={(p) => { dispatch(setSelectedProductId(p.id)); dispatch(setView('DETAILS')); }} />;
        case 'POLICY_SHIPPING': return <PolicyView type="shipping" onBack={handleGoHome} />;
        case 'POLICY_RETURNS': return <PolicyView type="returns" onBack={handleGoHome} />;
        case 'POLICY_PRIVACY': return <PolicyView type="privacy" onBack={handleGoHome} />;
        case 'POLICY_TERMS': return <PolicyView type="terms" onBack={handleGoHome} />;
        default:
            return <HomeView />;
    }
};

export default ContentRouter;
