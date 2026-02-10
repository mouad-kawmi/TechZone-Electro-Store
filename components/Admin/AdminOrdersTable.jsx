import React, { useState, useMemo } from 'react';
import { Eye, Truck, CheckCircle2, AlertCircle, Search, Filter, X, MapPin, CreditCard, ChevronRight, Package, ShoppingBag, Clock } from 'lucide-react';

const AdminOrdersTable = ({ orders = [], onStatusChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch =
                order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.email?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [orders, searchTerm, statusFilter]);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Livré':
                return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'Expédié':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'En Cours':
                return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'En Attente':
                return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    const statuses = [
        { id: 'all', label: 'Toutes' },
        { id: 'En Attente', label: 'En Attente' },
        { id: 'En Cours', label: 'En Cours' },
        { id: 'Expédié', label: 'Expédié' },
        { id: 'Livré', label: 'Livré' }
    ];

    return (
        <div className="space-y-8">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="relative group flex-1 max-w-md">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Rechercher par ID, Nom ou Email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:border-blue-600 outline-none transition-all dark:text-white"
                    />
                </div>

                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto no-scrollbar">
                    {statuses.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setStatusFilter(s.id)}
                            className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${statusFilter === s.id
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xl shadow-black/5'
                                : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.02)]">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50 dark:border-slate-800">
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Commande</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Client</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Statut</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-right">Montant</th>
                                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all duration-500">
                                    <td className="px-10 py-7">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                                <ShoppingBag className="size-5" />
                                            </div>
                                            <div>
                                                <span className="text-xs font-mono font-black text-slate-900 dark:text-white uppercase tracking-tighter">#{order.id?.toString().slice(-8)}</span>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{order.date}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{order.name || order.customerName || 'Anonyme'}</span>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{order.email || 'no-email@tz.com'}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7">
                                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                                            <div className="size-1.5 rounded-full bg-current animate-pulse"></div>
                                            {order.status || 'En Attente'}
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 text-right">
                                        <span className="text-sm font-black text-blue-600 dark:text-blue-400 tracking-tighter">{(order.finalTotal || order.amount || 0).toLocaleString()} DH</span>
                                    </td>
                                    <td className="px-10 py-7 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="size-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-500/30 transition-all shadow-sm"
                                            >
                                                <Eye className="size-4" />
                                            </button>
                                            <div className="h-6 w-px bg-slate-100 dark:bg-slate-700 mx-1"></div>
                                            {order.status === 'En Attente' && (
                                                <button
                                                    onClick={() => onStatusChange(order, 'En Cours')}
                                                    className="px-4 py-2 bg-amber-500/10 text-amber-500 rounded-xl text-[9px] font-black uppercase tracking-widest border border-amber-500/20 hover:bg-amber-500 hover:text-white transition-all"
                                                >
                                                    Process
                                                </button>
                                            )}
                                            {order.status === 'En Cours' && (
                                                <button
                                                    onClick={() => onStatusChange(order, 'Expédié')}
                                                    className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-xl text-[9px] font-black uppercase tracking-widest border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all"
                                                >
                                                    Expédier
                                                </button>
                                            )}
                                            {order.status === 'Expédié' && (
                                                <button
                                                    onClick={() => onStatusChange(order, 'Livré')}
                                                    className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all"
                                                >
                                                    Livrer
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredOrders.length === 0 && (
                    <div className="p-32 text-center">
                        <div className="size-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
                            <ShoppingBag className="size-10" />
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Aucune commande trouvée</p>
                    </div>
                )}
            </div>

            {/* Detailed Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-xl animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 max-h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase font-display flex items-center gap-4">
                                    Détails l-Commande
                                    <span className="text-blue-600 font-mono">#{selectedOrder.id?.toString().slice(-8)}</span>
                                </h2>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(selectedOrder.status)}`}>
                                        {selectedOrder.status}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Clock className="size-3" /> {selectedOrder.date}
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="size-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-rose-500 hover:text-white transition-all">
                                <X className="size-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-10 space-y-12 no-scrollbar">
                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Details Card */}
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                                            <MapPin className="size-3 text-orange-500" /> Adresse de Livraison
                                        </h3>
                                        <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                            <p className="text-sm font-black text-slate-900 dark:text-white uppercase font-display mb-1">{selectedOrder.name || selectedOrder.customerName}</p>
                                            <p className="text-xs font-bold text-slate-500 leading-relaxed">{selectedOrder.address}, {selectedOrder.city}</p>
                                            <p className="text-xs font-bold text-slate-500 mt-2">{selectedOrder.phone}</p>
                                            <p className="text-xs font-bold text-blue-600 mt-1">{selectedOrder.email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                                            <CreditCard className="size-3 text-blue-500" /> Mode de Paiement
                                        </h3>
                                        <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                            <p className="text-sm font-black text-slate-900 dark:text-white uppercase font-display">
                                                {selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' :
                                                    selectedOrder.paymentMethod === 'card' ? 'Carte Bancaire' : 'PayPal'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Items List */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                                        <ShoppingBag className="size-3 text-emerald-500" /> Articles Selectionnés
                                    </h3>
                                    <div className="space-y-4">
                                        {selectedOrder.items?.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl group hover:border-blue-500/30 transition-all">
                                                <div className="size-16 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 p-2">
                                                    <img src={item.image} alt="" className="size-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1">{item.name}</h4>
                                                    <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{item.quantity} x {item.price.toLocaleString()} DH</p>
                                                </div>
                                            </div>
                                        ))}
                                        {!selectedOrder.items && (
                                            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Liste d'articles non disponible pour cette commande</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-10 bg-slate-50 dark:bg-slate-950 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Total Final</p>
                                <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter font-display">
                                    {(selectedOrder.finalTotal || selectedOrder.amount || 0).toLocaleString()} <span className="text-lg">DH</span>
                                </h4>
                            </div>
                            <button
                                onClick={() => {
                                    window.print();
                                }}
                                className="px-10 h-14 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-black/10"
                            >
                                Imprimer l'Facture
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersTable;
