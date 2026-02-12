
import React from 'react';
import { Package, ChevronRight } from 'lucide-react';

const ProfileOrders = ({ orders }) => {
    return (
        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Historique des commandes</h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total: {orders.length}</span>
            </div>
            <div className="space-y-6">
                {orders.length > 0 ? (
                    orders.map((order, i) => (
                        <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                            <div className="flex items-center gap-6">
                                <div className="size-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Package className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{order.id}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                        {order.date} • {order.items?.length || 1} article(s)
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-10 mt-6 sm:mt-0">
                                <div className="text-right">
                                    <p className="text-lg font-black text-slate-900 dark:text-white">
                                        {order.total || (order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString() + ' DH')}
                                    </p>
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${order.status === 'Livré' ? 'text-emerald-600 bg-emerald-50' : 'text-blue-600 bg-blue-50'
                                        }`}>{order.status}</span>
                                </div>
                                <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-600 transition-all">
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center space-y-4">
                        <Package className="h-12 w-12 text-slate-200 mx-auto" />
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Ma-3ndek ta-chi commande f l-historique</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileOrders;
