
import React from 'react';
import ComparisonPage from '../components/Product/ComparisonPage';


const ComparisonView = ({
    compareItems,
    onBack,
    onRemove,
    onAddToCart,
    onViewDetails
}) => {
    return (
        <div className="page-content">
            <ComparisonPage
                products={compareItems}
                onBack={onBack}
                onRemove={onRemove}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
            />
        </div>
    );
};

export default ComparisonView;
