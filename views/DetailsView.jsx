
import React from 'react';
import ProductDetails from '../components/ProductDetails';


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
        <div className="page-content">
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
        </div>
    );
};

export default DetailsView;
