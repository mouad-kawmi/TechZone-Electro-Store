
import React from 'react';
import OrderSuccess from '../components/OrderSuccess';


const OrderSuccessView = ({ onContinue, orderData, onTrack }) => {
    return (
        <div className="page-content">
            <OrderSuccess onContinue={onContinue} orderData={orderData} onTrack={onTrack} />
        </div>
    );
};

export default OrderSuccessView;
