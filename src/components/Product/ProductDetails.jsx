import React, { useState, useMemo, useEffect } from 'react';
import { ListChecks, MessageSquare, Info } from 'lucide-react';
import Breadcrumbs from '../Layout/Breadcrumbs';

// Sous-composants
import ProductGallery from './Details/ProductGallery';
import ProductConfig from './Details/ProductConfig';
import ProductSpecs from './Details/ProductSpecs';
import ProductReviews from './Details/ProductReviews';
import ProductShippingInfo from './Details/ProductShippingInfo';
import RelatedProducts from './Details/RelatedProducts';

const ProductDetails = (props) => {
  const {
    product: pInitial, allProducts, onBack, onAddToCart, onViewDetails,
    onQuickView, onAddToCompare, onToggleWishlist,
    wishlistItems = [], compareItems = [], onAddReview
  } = props;

  const product = useMemo(() =>
    allProducts?.find(x => x.id === pInitial.id) || pInitial,
    [allProducts, pInitial]);

  const [tab, setTab] = useState('specs');

  useEffect(() => {
    const handler = () => setTab('reviews');
    window.addEventListener('open-reviews-tab', handler);
    return () => window.removeEventListener('open-reviews-tab', handler);
  }, []);

  const related = useMemo(() => {
    if (!allProducts || !product) return [];
    return allProducts
      .filter(x =>
        x.category?.toLowerCase() === product.category?.toLowerCase() &&
        x.id !== product.id
      )
      .slice(0, 4);
  }, [allProducts, product]);

  const imgs = useMemo(() => {
    const raw = product.images || [product.image, ...(product.variations?.images || [])];
    const unique = [...new Set(raw.filter(img => img))];
    return unique.length > 0 ? unique : [product.image];
  }, [product]);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500">
      <div className="page-content animate-fade-up">
        {/* Navigation */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
          <Breadcrumbs
            paths={[
              { label: product.category, view: 'CATEGORY', params: product.category },
              { label: product.title, view: 'DETAILS' }
            ]}
            onHomeClick={onBack}
            onNavigate={(view) => view === 'CATEGORY' && onBack()}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pb-12 sm:pb-24">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12 sm:mb-24">
            <ProductGallery imgs={imgs} title={product.title} />
            <ProductConfig
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              wishlistItems={wishlistItems}
            />
          </div>

          {/* Tabs Section */}
          <div className="mb-12 sm:mb-24" id="product-tabs">
            <div className="flex gap-6 sm:gap-12 border-b border-slate-100 dark:border-slate-800 mb-8 sm:mb-12 overflow-x-auto pb-1 scrollbar-hide">
              {[
                { id: 'specs', label: 'Fiche Technique', icon: ListChecks },
                { id: 'reviews', label: 'Avis Clients', icon: MessageSquare },
                { id: 'info', label: 'Livraison & Retours', icon: Info }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 sm:gap-3 pb-6 sm:pb-8 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all relative shrink-0 ${tab === t.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <t.icon className="size-3 sm:size-4" />
                  {t.label}
                  {tab === t.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />}
                </button>
              ))}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {tab === 'specs' && <ProductSpecs specs={product.specs} />}
              {tab === 'reviews' && <ProductReviews product={product} onAddReview={onAddReview} />}
              {tab === 'info' && <ProductShippingInfo />}
            </div>
          </div>

          {/* Similar Products */}
          <RelatedProducts
            products={related}
            onViewDetails={onViewDetails}
            onQuickView={onQuickView}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            onAddToCompare={onAddToCompare}
            wishlistItems={wishlistItems}
            compareItems={compareItems}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
