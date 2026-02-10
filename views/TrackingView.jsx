
import React from 'react';
import OrderTracking from '../components/OrderTracking';


const TrackingView = ({ onBack, orders }) => {
    return (
        <div className="page-content">
            <OrderTracking onBack={onBack} orders={orders} />
        </div>
    );
};

export default TrackingView;
