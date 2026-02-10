
import React from 'react';
import Checkout from '../components/Checkout/Checkout';


const CheckoutView = ({
    cartItems,
    onBack,
    onUpdateQuantity,
    onRemove,
    onConfirm
}) => {
    return (
        <div className="page-content">
            <Checkout
                items={cartItems}
                onBack={onBack}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
                onConfirm={onConfirm}
            />
        </div>
    );
};

export default CheckoutView;
