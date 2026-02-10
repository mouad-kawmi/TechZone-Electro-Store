
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
    LayoutDashboard, Package, ShoppingCart, Zap, Mail, LogOut, Settings, BarChart3, ChevronRight,
    Users, Star, ListTodo
} from 'lucide-react';
import gsap from 'gsap';
import { logout } from '../../store';

const AdminSidebar = ({ activeTab, setActiveTab, onBack, isOpen, onClose }) => {
    const dispatch = useDispatch();
    const sidebarRef = useRef(null);
    const brandingRef = useRef(null);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Statistiques Globales' },
        { id: 'products', label: 'Produits', icon: Package, description: 'Gestion Inventaire' },
        { id: 'catalog', label: 'Catalogue', icon: ListTodo, description: 'Catégories & Marques' },
        { id: 'orders', label: 'Commandes', icon: ShoppingCart, description: 'Ventes & Factures' },
        { id: 'customers', label: 'Clients', icon: Users, description: 'Base Clientèle' },
        { id: 'marketing', label: 'Marketing', icon: Zap, description: 'Coupons & Offres' },
        { id: 'reviews', label: 'Avis Client', icon: Star, description: 'Modération' },
        { id: 'messages', label: 'Support', icon: Mail, description: 'Messagerie' },
    ];

    const handleLogout = () => {
        dispatch(logout());
        if (onBack) onBack();
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[290] lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                ref={sidebarRef}
                className={`
                    fixed inset-y-0 left-0 w-72 lg:w-80 max-w-[85vw] bg-white dark:bg-slate-950 h-screen flex flex-col p-6 lg:p-8 border-r border-slate-200 dark:border-white/5 z-[300] overflow-hidden transition-all duration-300 ease-in-out
                    lg:static lg:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="flex items-center justify-between mb-10 lg:mb-12">
                    <div className="flex items-center gap-4 relative group cursor-pointer" onClick={onBack}>
                        <div className="relative">
                            <div className="size-11 lg:size-12 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl flex items-center justify-center font-bold text-lg lg:text-xl shadow-xl transition-transform group-hover:scale-110 duration-500 font-display">TZ</div>
                        </div>
                        <div>
                            <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white uppercase tracking-tight font-display">
                                TechZone Manager
                            </h2>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="size-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">Admin Panel</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 relative overflow-y-auto custom-scrollbar pr-2">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                onClose?.();
                            }}
                            className={`group w-full flex items-center justify-between p-3.5 lg:p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${activeTab === item.id
                                ? 'bg-blue-600/5 dark:bg-white/5 text-blue-600 dark:text-white'
                                : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                                }`}
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`p-2 rounded-lg transition-all duration-300 ${activeTab === item.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 group-hover:border-blue-500/30'
                                    }`}>
                                    <item.icon className="size-4" />
                                </div>
                                <div className="text-left">
                                    <span className="block text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                                    <span className={`block text-[8px] font-medium mt-0.5 transition-colors ${activeTab === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-600'
                                        }`}>
                                        {item.description}
                                    </span>
                                </div>
                            </div>

                            <ChevronRight className={`size-3 transition-all duration-300 ${activeTab === item.id ? 'opacity-100 translate-x-0 text-blue-600 dark:text-blue-400' : 'opacity-0 -translate-x-2'
                                }`} />
                        </button>
                    ))}
                </nav>

                <div className="pt-6 border-t border-slate-200 dark:border-white/5 space-y-2">
                    <button
                        onClick={() => {
                            setActiveTab('settings');
                            onClose?.();
                        }}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group ${activeTab === 'settings'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                            : 'text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        <Settings className={`size-4 ${activeTab === 'settings' ? '' : 'group-hover:rotate-90'} transition-transform duration-500`} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Paramètres</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-rose-500 hover:text-white transition-all group border border-transparent hover:border-rose-200 dark:hover:border-rose-900"
                    >
                        <LogOut className="size-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Quitter</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;

