
import React from 'react';
import Checkout from '../components/Checkout/Checkout';


const CheckoutView = ({
    items,
    onBack,
    onUpdateQuantity,
    onRemove,
    onOrderSuccess
}) => {
    return (
        <div className="page-content">
            <Checkout
                items={items}
                onBack={onBack}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
                onConfirm={onOrderSuccess}
            />
        </div>
    );
};

export default CheckoutView;
