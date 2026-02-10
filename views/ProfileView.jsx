
import React from 'react';
import Profile from '../components/Profile';


const ProfileView = ({ onBack, onAdminClick, isAdmin }) => {
    return (
        <div className="page-content">
            <Profile
                onBack={onBack}
                onAdminClick={onAdminClick}
                isAdmin={isAdmin}
            />
        </div>
    );
};

export default ProfileView;
