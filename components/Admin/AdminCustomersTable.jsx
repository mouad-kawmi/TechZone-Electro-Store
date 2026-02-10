import React, { useState, useMemo } from 'react';
import { User, Mail, CreditCard, Shield, MoreVertical, Search, Filter, ShoppingBag, ExternalLink } from 'lucide-react';

const AdminCustomersTable = ({ orders = [] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Deriving customers from orders
    const customersList = useMemo(() => {
        const customersMap = new Map();

        orders.forEach(order => {
            const email = order.email || 'guest@tz.com';
            if (!customersMap.has(email)) {
                customersMap.set(email, {
                    id: email,
                    name: order.name || order.customerName || 'Anonyme',
                    email: email,
                    orders: 0,
                    spend: 0,
                    city: order.city || 'N/A',
                    lastOrder: order.date
                });
            }

            const c = customersMap.get(email);
            c.orders += 1;
            c.spend += (order.finalTotal || order.amount || 0);

            // Check if this order is more recent
            if (new Date(order.date) > new Date(c.lastOrder)) {
                c.lastOrder = order.date;
            }
        });

        return Array.from(customersMap.values()).map(c => ({
            ...c,
            status: (c.orders >= 3 || c.spend >= 10000) ? 'Elite' : 'Classic'
        }));
    }, [orders]);

    const filteredCustomers = useMemo(() => {
        return customersList.filter(c => {
            const matchesSearch =
                c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = filterStatus === 'all' || c.status.toLowerCase() === filterStatus.toLowerCase();

            return matchesSearch && matchesStatus;
        });
    }, [customersList, searchTerm, filterStatus]);

    return (
        <div className="space-y-8 animate-fade-up">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="relative group flex-1 max-w-md">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Rechercher un client..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:border-blue-600 outline-none transition-all dark:text-white"
                    />
                </div>

                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                    {['all', 'Elite', 'Classic'].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${filterStatus === s
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {s === 'all' ? 'Tous' : s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Container */}
            <div className="bg-white dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.02)]">

                {/* Desktop View */}
                <div className="hidden lg:block overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50 dark:border-slate-800">
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Identité Client</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Statut Tier</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-center">Commandes</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-right">LTV Capital</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-right">Dernière Activité</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                            {filteredCustomers.map((c) => (
                                <tr key={c.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all duration-500">
                                    <td className="px-10 py-7">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 transition-colors group-hover:text-white">
                                                <User className="size-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{c.name}</span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{c.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7">
                                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${c.status === 'Elite' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/10'}`}>
                                            <Shield className={`size-3 ${c.status === 'Elite' ? 'text-indigo-500' : 'text-slate-400'}`} />
                                            {c.status}
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-black text-slate-900 dark:text-white">{c.orders}</span>
                                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">Orders</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 text-right">
                                        <span className="text-sm font-black text-blue-600 dark:text-blue-400 tracking-tighter">{c.spend.toLocaleString()} DH</span>
                                    </td>
                                    <td className="px-10 py-7 text-right">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.lastOrder}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile / Tablet Card View */}
                <div className="lg:hidden divide-y divide-slate-100 dark:divide-slate-800/50">
                    {filteredCustomers.map((c) => (
                        <div key={c.id} className="p-6 space-y-5">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                        <User className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{c.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">{c.email}</p>
                                    </div>
                                </div>
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${c.status === 'Elite' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/10'}`}>
                                    <Shield className="size-3" />
                                    {c.status}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 bg-slate-50/50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total Spend</p>
                                    <p className="text-sm font-black text-blue-600 dark:text-blue-400 tracking-tighter">{c.spend.toLocaleString()} DH</p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Orders Count</p>
                                    <p className="text-sm font-black text-slate-900 dark:text-white">{c.orders} CMD</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ShoppingBag className="size-3 text-slate-300" />
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Dernière: {c.lastOrder}</span>
                                </div>
                                <button className="size-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400">
                                    <MoreVertical className="size-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCustomers.length === 0 && (
                    <div className="py-20 lg:py-32 text-center px-6">
                        <div className="size-16 lg:size-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 lg:mb-8 text-slate-300">
                            <User className="size-8 lg:size-10" />
                        </div>
                        <p className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Aucun client trouvé</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCustomersTable;
