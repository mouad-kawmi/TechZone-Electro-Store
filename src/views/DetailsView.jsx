
import React from 'react';
import ProductDetails from '../components/Product/ProductDetails';


const DetailsView = ({
    selectedProduct,
    allProducts,
    onBack,
    onAddToCart,
    onViewDetails,
    onQuickView,
    onAddToCompare,
    onToggleWishlist,
    wishlistItems,
    compareItems,
    onAddReview
}) => {
    if (!selectedProduct) return null;

    return (
        <ProductDetails
            product={selectedProduct}
            allProducts={allProducts}
            onBack={onBack}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
            onQuickView={onQuickView}
            onAddToCompare={onAddToCompare}
            onToggleWishlist={onToggleWishlist}
            wishlistItems={wishlistItems}
            compareItems={compareItems}
            onAddReview={onAddReview}
        />
    );
};

export default DetailsView;
