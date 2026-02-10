import React from 'react';
import AuthForm from '../components/AuthForm';

const LoginView = ({ onBack }) => {
    return (
        <div className="page-content">
            <AuthForm onBack={onBack} />
        </div>
    );
};

export default LoginView;
