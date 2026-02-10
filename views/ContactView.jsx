
import React from 'react';
import Contact from '../components/Contact';


const ContactView = ({ onBack, onSendMessage }) => {
    return (
        <div className="page-content">
            <Contact onBack={onBack} onSendMessage={onSendMessage} />
        </div>
    );
};

export default ContactView;
