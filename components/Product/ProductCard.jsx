
import React from 'react';
import { Eye, Star, ShoppingCart, Heart, BarChart2 } from 'lucide-react';

/**
 * Carte produit - Composant principal pour afficher un produit
 * Refactorisé le 10/02/2026 pour améliorer la lisibilité
 * @param {Object} product - Les données du produit
 * @param {Function} onViewDetails - Callback pour voir les détails
 * @param {Function} onQuickView - Aperçu rapide du produit
 * @param {Function} onAddToCart - Ajouter au panier
 * @param {Function} onToggleWishlist - Toggle favoris
 * @param {Function} onAddToCompare - Ajouter à la comparaison
 * @param {Boolean} isFavorite - Est-ce que le produit est dans les favoris
 * @param {Boolean} isComparing - Est-ce que le produit est en comparaison
 */
function ProductCard(props) {
  const {
    product,
    onViewDetails,
    onQuickView,
    onAddToCart,
    onToggleWishlist,
    onAddToCompare,
    isFavorite = false,
    isComparing = false
  } = props;

  // Calcul du pourcentage de réduction
  // NOTE: On arrondit pour avoir un nombre entier plus lisible
  const calculateDiscount = () => {
    if (!product.oldPrice || product.oldPrice <= product.price) {
      return null;
    }
    const discount = ((product.oldPrice - product.price) / product.oldPrice) * 100;
    return Math.round(discount);
  };

  const discountPercentage = calculateDiscount();

  // Handler pour l'ajout au panier avec vérification du stock
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.isOutOfStock) {
      // TODO: Afficher un toast "Produit en rupture de stock"
      return;
    }
    onAddToCart(product);
  };

  // Handler pour le toggle wishlist
  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  // Classes CSS pour le conteneur principal
  // On ajoute grayscale si le produit est en rupture
  let cardClasses = 'group bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 dark:border-white/5 flex flex-col relative animate-fade-up';
  if (product.isOutOfStock) {
    cardClasses += ' opacity-75 grayscale-[0.3]';
  }

  return (
    <div className={cardClasses}>

      {/* Zone Image avec badges et actions */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800/50 aspect-square flex items-center justify-center p-6 transition-colors duration-500">

        {/* Badges de réduction et "Nouveau" */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 text-center">
          {discountPercentage && !product.isOutOfStock && (
            <div className="bg-rose-500 text-white px-2.5 py-1 rounded-lg text-[8px] font-bold uppercase tracking-wider">
              -{discountPercentage}%
            </div>
          )}
          {product.isNew && (
            <div className="bg-blue-600 text-white px-2.5 py-1 rounded-lg text-[8px] font-bold uppercase tracking-wider">
              NEW
            </div>
          )}
        </div>

        {/* Image du produit - Cliquable pour voir les détails */}
        <img
          src={product.image || null}
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 cursor-pointer"
          onClick={() => onViewDetails(product)}
        />

        {/* Actions au hover - Apparaissent avec animation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          {/* Bouton Aperçu Rapide */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="size-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
            title="Aperçu rapide"
          >
            <Eye className="size-4" />
          </button>

          {/* Bouton Favoris - Change de couleur si déjà favori */}
          <button
            onClick={handleToggleWishlist}
            className={`size-10 rounded-xl flex items-center justify-center shadow-lg transition-colors ${isFavorite
              ? 'bg-rose-500 text-white'
              : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-rose-500 hover:text-white'
              }`}
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart className={`size-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Informations du produit */}
      <div className="mt-5 space-y-3 flex-grow flex flex-col">
        {/* Catégorie, Marque et Note */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {product.category}
            </span>
            {/* Affichage de la marque si disponible */}
            {product.brand && (
              <>
                <span className="text-[10px] text-slate-300">•</span>
                <span className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest">
                  {product.brand}
                </span>
              </>
            )}
          </div>

          {/* Note avec étoile */}
          <div className="flex items-center gap-1">
            <Star className="size-3 text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
              {product.rating || '5.0'}
            </span>
          </div>
        </div>

        {/* Titre du produit - Cliquable */}
        <h3
          className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-tight leading-tight truncate cursor-pointer font-display transition-colors hover:text-blue-600 dark:hover:text-blue-500"
          onClick={() => onViewDetails(product)}
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Prix et bouton d'ajout au panier */}
        <div className="flex items-end justify-between pt-2">
          <div className="flex flex-col">
            {/* Ancien prix barré si réduction */}
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-[10px] line-through text-slate-400 font-medium mb-0.5">
                {product.oldPrice.toLocaleString()} DH
              </span>
            )}
            {/* Prix actuel */}
            <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
              {product.price.toLocaleString()} <span className="text-[10px] font-bold uppercase text-slate-400 ml-0.5">DH</span>
            </span>
          </div>

          {/* Bouton Ajouter au panier */}
          <button
            disabled={product.isOutOfStock}
            onClick={handleAddToCart}
            className="size-11 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-xl flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            title={product.isOutOfStock ? 'Rupture de stock' : 'Ajouter au panier'}
          >
            <ShoppingCart className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
