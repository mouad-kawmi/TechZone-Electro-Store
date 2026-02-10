import React, { useState, useMemo } from 'react';
import {
  Star, ShoppingCart, Truck, ShieldCheck,
  ChevronRight, ArrowLeft,
  Plus, CheckCircle2, ArrowRight, MessageSquare,
  Sparkles, ListChecks, Info, Clock, Monitor, Cpu,
  Undo2
} from 'lucide-react';
import ProductCard from './ProductCard';
import Breadcrumbs from '../Layout/Breadcrumbs';

const ProductDetails = ({
  product: initialProduct, allProducts, onBack, onAddToCart, onViewDetails,
  onQuickView, onAddToCompare, onToggleWishlist, wishlistItems = [], compareItems = [],
  onAddReview
}) => {
  // Use the latest version of the product from allProducts to ensure updates (like reviews) are reflected immediately
  const product = useMemo(() => {
    return allProducts?.find(p => p.id === initialProduct.id) || initialProduct;
  }, [allProducts, initialProduct]);

  const [selectedThumb, setSelectedThumb] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.variations?.colors?.[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.variations?.storage?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [userName, setUserName] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  // Helper to ensure we have a valid related products list
  const relatedProducts = useMemo(() => {
    if (!allProducts || !product) return [];
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, allProducts]);

  // Use product.images if available, otherwise fallback to existing logic
  const thumbnails = product.images || [product.image, ...(product.variations?.images || [product.image, product.image, product.image])];

  const handleAddToCart = () => {
    onAddToCart({ ...product, selectedColor, selectedStorage, quantity });
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen animate-fade-up transition-colors duration-500">
      {/* Navigation - Using Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <Breadcrumbs
          paths={[
            { label: product.category, view: 'CATEGORY', params: product.category },
            { label: product.title, view: 'DETAILS' }
          ]}
          onHomeClick={onBack}
          onNavigate={(view, cat) => {
            if (view === 'CATEGORY') {
              // Note: Cat click logic needs to be handled via App or a redirect prop
              onBack();
            }
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pb-12 sm:pb-24">
        {/* Main Grid: 1 Col on Mobile/Tablet, 12 Cols on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12 sm:mb-24">

          {/* Left Side: Gallery */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              {/* Main Image Container - Responsive Border Radius & Padding */}
              <div className="aspect-[4/3] w-full rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-6 sm:p-12 relative group">
                <img
                  src={thumbnails[selectedThumb] || null}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              {/* Thumbnails Grid - Responsive Gap & Padding */}
              <div className="grid grid-cols-4 gap-3 sm:gap-6">
                {thumbnails.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedThumb(idx)}
                    className={`aspect-square rounded-xl sm:rounded-[2rem] overflow-hidden border-2 transition-all p-2 sm:p-3 bg-white dark:bg-slate-900 ${selectedThumb === idx ? 'border-blue-600 shadow-lg' : 'border-slate-100 dark:border-slate-800'
                      }`}
                  >
                    <img src={img || null} className="w-full h-full object-contain" alt="Thumb" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Configuration & Purchase */}
          <div className="lg:col-span-5">
            <div className="space-y-6 sm:space-y-10 bg-white dark:bg-slate-900 p-6 sm:p-10 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] sm:rounded-[4rem] shadow-sm sticky top-8">
              <div className="space-y-4 sm:space-y-8">
                <div className="flex items-center justify-between">
                  <span className="bg-blue-600 text-white px-3 sm:px-5 py-2 rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em]">{product.brand}</span>
                  <div className={`flex items-center gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest ${product.stock > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {product.stock > 0 ? `En Stock` : 'Épuisé'}
                  </div>
                </div>
                {/* Title - Responsive Text Size */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-tight font-display">{product.title}</h1>
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-4">
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-600 dark:text-blue-500 tracking-tighter">{product.price.toLocaleString()} <span className="text-lg sm:text-xl">DH</span></p>
                  {product.oldPrice && <p className="text-lg sm:text-2xl font-black text-slate-300 line-through">{product.oldPrice.toLocaleString()} DH</p>}
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Variation: Colors */}
              {product.variations?.colors && (
                <div className="space-y-3 sm:space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Couleur : {selectedColor}</span>
                  <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                    <div className="flex gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                      {product.variations.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`group relative size-12 rounded-2xl border-2 transition-all flex items-center justify-center shrink-0 ${selectedColor === color ? 'border-blue-600 scale-110' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                            }`}
                          title={color}
                        >
                          <div
                            className="size-8 rounded-xl border border-white/20 shadow-inner"
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                          {selectedColor === color && (
                            <div className="absolute -top-1 -right-1 size-4 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                              <CheckCircle2 className="size-2 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Variation: Storage */}
              {product.variations?.storage && (
                <div className="space-y-3 sm:space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Capacité</span>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex flex-wrap gap-3">
                      {product.variations.storage.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedStorage(size)}
                          className={`group relative px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedStorage === size
                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 scale-105'
                            : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Purchase Actions */}
              <div className="space-y-6 pt-4 border-t border-slate-50 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                  <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-2xl p-2 border border-slate-100 dark:border-slate-700">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="size-10 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors"><Plus className="size-4 rotate-45" /></button>
                    <span className="w-12 text-center text-xs font-black dark:text-white">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="size-10 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors"><Plus className="size-4" /></button>
                  </div>
                  <div className="flex-1">
                    <button
                      disabled={product.stock <= 0}
                      onClick={handleAddToCart}
                      className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 text-white font-black py-4 sm:py-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl transition-all uppercase tracking-[0.25em] text-[10px] flex items-center justify-center gap-4 group"
                    >
                      <ShoppingCart className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
                      Ajouter au Panier
                    </button>
                  </div>
                </div>

                {/* Trust Badges Minimal - Stack on Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-900/20">
                    <Truck className="size-5 text-blue-600 flex-shrink-0" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 dark:text-blue-200">Livraison 24/48H</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100/50 dark:border-emerald-900/20">
                    <ShieldCheck className="size-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 dark:text-emerald-200">Garantie 12 Mois</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Tabs - Scrollable on Mobile */}
        <div className="mb-12 sm:mb-24">
          <div className="flex gap-6 sm:gap-12 border-b border-slate-100 dark:border-slate-800 mb-8 sm:mb-12 overflow-x-auto pb-1 scrollbar-hide">
            {[
              { id: 'specs', label: 'Fiche Technique', icon: ListChecks },
              { id: 'reviews', label: 'Avis Clients', icon: MessageSquare },
              { id: 'info', label: 'Livraison & Retours', icon: Info }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 sm:gap-3 pb-6 sm:pb-8 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all relative shrink-0 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <tab.icon className="size-3 sm:size-4" />
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />}
              </button>
            ))}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeTab === 'specs' && (
              <div className="space-y-8 sm:space-y-12">
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter dark:text-white font-display">Performance Elite</h3>
                    <p className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {Object.keys(product.specs || {}).length} Spécifications trouvées
                    </p>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-2xl">
                    Ce produit est conçu pour répondre aux exigences les plus élevées des professionnels de la tech au Maroc.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {Object.entries(product.specs || {})
                      .slice(0, showAllSpecs ? undefined : 6)
                      .map(([key, val]) => (
                        <div key={key} className="flex justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-600/30 transition-colors group">
                          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">{key}</span>
                          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white text-right ml-4">{val}</span>
                        </div>
                      ))}
                  </div>

                  {Object.keys(product.specs || {}).length > 6 && (
                    <div className="flex justify-center pt-4 sm:pt-8">
                      <button
                        onClick={() => setShowAllSpecs(!showAllSpecs)}
                        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm flex items-center gap-3"
                      >
                        {showAllSpecs ? "Voir moins" : "Voir toutes les spécifications"}
                        <Plus className={`size-4 transition-transform duration-500 ${showAllSpecs ? 'rotate-45' : ''}`} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8 sm:space-y-12 max-w-4xl">
                {/* Review Submission Form */}
                <div className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-6 sm:mb-8 dark:text-white font-display">Donner votre avis</h3>

                  {isSubmitted ? (
                    <div className="py-10 text-center space-y-4">
                      <div className="size-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                        <CheckCircle2 className="size-8" />
                      </div>
                      <p className="text-xl font-black uppercase tracking-tighter dark:text-white">Merci pour votre avis !</p>
                      <p className="text-slate-500 dark:text-slate-400 font-medium">Votre commentaire a été publié avec succès.</p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline mt-4"
                      >
                        Écrire un autre avis
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6 sm:space-y-8">
                      <div className="space-y-3 sm:space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Votre Nom</span>
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Votre nom complet"
                          className="w-full p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none text-slate-900 dark:text-white font-medium placeholder:text-slate-400 text-sm"
                        />
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Note globale</span>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => setUserRating(star)}
                              className="focus:outline-none transition-transform hover:scale-125 duration-200"
                            >
                              <Star
                                className={`size-6 sm:size-8 ${(hoverRating || userRating) >= star
                                  ? 'text-amber-500 fill-current'
                                  : 'text-slate-200 dark:text-slate-700'
                                  } transition-colors pointer-events-none`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Votre commentaire</span>
                        <textarea
                          value={userComment}
                          onChange={(e) => setUserComment(e.target.value)}
                          placeholder="Chno ban lik f had l-produit? (Performance, qualité, design...)"
                          className="w-full min-h-[120px] sm:min-h-[150px] p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none text-slate-900 dark:text-white font-medium placeholder:text-slate-400 text-sm"
                        />
                      </div>

                      <button
                        disabled={!userRating || !userComment.trim() || !userName.trim()}
                        onClick={() => {
                          if (onAddReview) {
                            onAddReview(product.id, {
                              user: userName,
                              rating: userRating,
                              comment: userComment,
                              date: new Date().toLocaleDateString('fr-FR')
                            });
                          }
                          setIsSubmitted(true);
                          setUserRating(0);
                          setUserComment('');
                          setUserName('');
                        }}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-black px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
                      >
                        Publier l'avis
                        <ArrowRight className="size-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6 pt-8 sm:pt-12 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white font-display mb-4 sm:mb-8">Avis des utilisateurs</h3>
                  {product.reviews_list?.length > 0 ? (
                    product.reviews_list.map((rev, i) => (
                      <div key={i} className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4 sm:mb-6">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, idx) => (
                              <Star key={idx} className={`size-3 ${idx < rev.rating ? 'text-yellow-400 fill-current' : 'text-slate-200'}`} />
                            ))}
                          </div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{rev.date}</span>
                        </div>
                        <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2 sm:mb-4 font-display">{rev.user}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">"{rev.comment}"</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 sm:p-20 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2.5rem] sm:rounded-[4rem]">
                      <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">Mabous avis 7taaba wa7ed. Koun nta l-awal!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
                {[
                  { title: "Livraison", icon: Truck, text: "Ghi f 24h/48h f kola mdina f lmghrib." },
                  { title: "Paiement", icon: ShieldCheck, text: "Khless f l-bab dyal dar (Cash on Delivery) aw b la carte." },
                  { title: "Retour", icon: Clock, text: "3andek 7 ayyam bach tbedel rayek ila ma3ajbakch." }
                ].map((item, i) => (
                  <div key={i} className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <item.icon className="size-8 sm:size-10 text-blue-600 mb-4 sm:mb-6" />
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tighter mb-2 sm:mb-4 dark:text-white">{item.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        <div className="space-y-8 sm:space-y-16">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
              Produit <span className="text-blue-600">Similaires</span>
            </h2>
            <button className="hidden sm:flex items-center gap-3 text-blue-600 font-black text-[10px] uppercase tracking-widest group">
              Voir tout <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
            {relatedProducts.map((p) => (
              <div key={p.id} className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <ProductCard
                  product={p}
                  onViewDetails={onViewDetails}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCompare={onAddToCompare}
                  isFavorite={wishlistItems.some((wi) => wi.id === p.id)}
                  isComparing={compareItems.some((ci) => ci.id === p.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Mobile Actions Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[90] p-4 animate-in slide-in-from-bottom-full duration-500">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-100 dark:border-white/10 rounded-[2.5rem] p-4 shadow-2xl flex items-center justify-between gap-4">
          <div className="px-4">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
            <p className="text-lg font-black text-blue-600 tracking-tighter">{(product.price * quantity).toLocaleString()} DH</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="flex-grow bg-slate-900 dark:bg-blue-600 text-white h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
          >
            <ShoppingCart className="size-4" /> Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
