import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

// Sub-components
import ProfileSidebar from './Profile/ProfileSidebar';
import ProfileOverview from './Profile/ProfileOverview';
import ProfileOrders from './Profile/ProfileOrders';
import ProfileAddresses from './Profile/ProfileAddresses';

const Profile = ({ onBack, onAdminClick, isAdmin }) => {
    const dispatch = useDispatch();
    const { user: authUser } = useSelector((state) => state.auth);
    const { allOrders } = useSelector((state) => state.orders);
    const [activeTab, setActiveTab] = useState('overview');

    // Filter orders for the current user (if logged in)
    const userOrders = allOrders.filter(o => o.userId === authUser?.id);

    const user = {
        name: authUser?.username || "Client Elite",
        email: authUser?.email || "email@techzone.ma",
        memberSince: authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : "Depuis Janvier 2024",
        orders: userOrders,
        addresses: authUser?.addresses || [
            { id: 1, type: "Domicile", address: "Appt 4, Immeuble B, Rue des Fleurs, Maarif, Casablanca", phone: "06 00 00 00 00", primary: true }
        ]
    };

    const handleLogout = () => {
        dispatch(logout());
        onBack(); // Go home after logout
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <ProfileOverview user={user} onAdminClick={onAdminClick} setActiveTab={setActiveTab} isAdmin={isAdmin} />;
            case 'orders': return <ProfileOrders orders={user.orders} />;
            case 'addresses': return <ProfileAddresses addresses={user.addresses} />;
            default: return (
                <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 text-center py-20">
                    <p className="text-slate-400 font-black uppercase tracking-widest">En cours de développement...</p>
                </div>
            );
        }
    };

    return (
        <div className="bg-[#fafafa] dark:bg-slate-950/20 min-h-screen py-12 px-6 animate-fade-up ">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-10">
                    <ProfileSidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
                    <div className="lg:col-span-8">{renderContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
