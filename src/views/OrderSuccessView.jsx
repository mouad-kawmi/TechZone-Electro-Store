
import React from 'react';
import OrderSuccess from '../components/Checkout/OrderSuccess';


const OrderSuccessView = ({ onContinue, orderData, onTrack }) => {
    return (
        <div className="page-content">
            <OrderSuccess onContinue={onContinue} orderData={orderData} onTrack={onTrack} />
        </div>
    );
};

export default OrderSuccessView;
