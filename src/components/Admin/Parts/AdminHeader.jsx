import React from 'react';
import { Menu, Plus } from 'lucide-react';
import AdminNotifications from './AdminNotifications';

const AdminHeader = ({
    activeTab, setIsSidebarOpen, notifications, isNotificationsOpen,
    setIsNotificationsOpen, setActiveTab, unreadCount, openEditor
}) => {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden size-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl flex items-center justify-center shadow-sm"
                    >
                        <Menu className="size-5" />
                    </button>

                    <div>
                        <div className="flex items-center gap-2 mb-1.5 font-bold uppercase tracking-widest text-[8px] text-slate-400">
                            <span className="size-1.5 bg-blue-500 rounded-full"></span>
                            Système Connecté
                        </div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-950 dark:text-white uppercase tracking-tight font-display">
                            {activeTab}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 w-full md:w-auto">
                <AdminNotifications
                    notifications={notifications}
                    isOpen={isNotificationsOpen}
                    setIsOpen={setIsNotificationsOpen}
                    setActiveTab={setActiveTab}
                    unreadCount={unreadCount}
                />

                <button
                    onClick={() => openEditor()}
                    className="bg-slate-950 dark:bg-blue-600 text-white px-4 sm:px-6 h-10 sm:h-12 rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-2 sm:gap-3 shadow-xl hover:bg-blue-600 transition-all active:scale-95 shrink-0"
                >
                    <Plus className="size-4" />
                    <span className="hidden xs:inline">Nouveau Produit</span>
                    <span className="xs:hidden">Produit</span>
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
