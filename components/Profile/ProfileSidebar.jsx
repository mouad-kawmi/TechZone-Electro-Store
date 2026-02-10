
import React from 'react';
import {
    User, ShieldCheck, Clock, Package, MapPin, CreditCard, Settings, LogOut, ChevronRight
} from 'lucide-react';

const ProfileSidebar = ({ user, activeTab, setActiveTab, onLogout }) => {
    const navItems = [
        { id: 'overview', label: "Dashboard", icon: Clock },
        { id: 'orders', label: "Commandes", icon: Package },
        { id: 'addresses', label: "Adresses", icon: MapPin },
        { id: 'payments', label: "Paiements", icon: CreditCard },
        { id: 'settings', label: "Paramètres", icon: Settings }
    ];

    return (
        <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                    <ShieldCheck className="h-5 w-5 text-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="size-24 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-3xl font-black relative">
                    AB
                    <span className="absolute bottom-1 right-1 size-5 bg-emerald-500 border-4 border-white rounded-full"></span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{user.name}</h2>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">{user.email}</p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-xl font-black text-slate-900">12</p>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Favoris</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-xl font-black text-slate-900">{user.orders.length}</p>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Orders</p>
                    </div>
                </div>
            </div>

            <nav className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 overflow-hidden">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${activeTab === item.id
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'text-slate-500 hover:bg-slate-50'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`size-10 rounded-xl flex items-center justify-center transition-colors ${activeTab === item.id ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-400 group-hover:text-blue-600'
                                }`}>
                                <item.icon className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${activeTab === item.id ? 'rotate-90' : 'text-slate-200'}`} />
                    </button>
                ))}
                <div className="h-px bg-slate-50 my-4"></div>
                <button onClick={onLogout} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-rose-50 text-rose-500 transition-all group">
                    <div className="size-10 bg-rose-50 rounded-xl flex items-center justify-center">
                        <LogOut className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">Déconnexion</span>
                </button>
            </nav>
        </aside>
    );
};

export default ProfileSidebar;
