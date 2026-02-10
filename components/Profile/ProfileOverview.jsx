
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutDashboard, ChevronRight, Package, Heart, Star } from 'lucide-react';
import { toggleWishlistDrawer } from '../../store';

const ProfileOverview = ({ user, onAdminClick, setActiveTab }) => {
    const dispatch = useDispatch();
    const { items: wishlistItems } = useSelector((state) => state.wishlist);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {onAdminClick && (
                <button
                    onClick={onAdminClick}
                    className="relative w-full bg-slate-900 dark:bg-blue-600/10 dark:backdrop-blur-3xl p-10 rounded-[3rem] flex items-center justify-between group overflow-hidden border border-white/5 dark:border-blue-500/20 transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(37,99,235,0.2)]"
                >
                    {/* Scanning Line Effect */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-[2000ms] pointer-events-none"></div>

                    {/* Background Glow */}
                    <div className="absolute -inset-10 bg-blue-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    <div className="flex items-center gap-10 relative z-10">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-blue-600 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition duration-700"></div>
                            <div className="size-20 bg-white/10 dark:bg-slate-900 rounded-[1.8rem] border border-white/10 flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                                <LayoutDashboard className="h-10 w-10 text-blue-400" />
                            </div>
                        </div>
                        <div className="text-left space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="size-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] leading-none">Access: Authorized</span>
                            </div>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none font-display">Elite Console</h3>
                            <p className="text-[10px] font-black text-slate-400 group-hover:text-blue-200/60 uppercase tracking-[0.2em] transition-colors">Infrastructure & Management System</p>
                        </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-end gap-3 relative z-10">
                        <div className="h-16 w-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all duration-500">
                            <ChevronRight className="h-8 w-8 text-white group-hover:translate-x-1 transition-transform" />
                        </div>
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Connect to Node</span>
                    </div>
                </button>
            )}

            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Dernières Commandes</h3>
                    {user.orders.length > 0 && (
                        <button onClick={() => setActiveTab('orders')} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Voir Tout</button>
                    )}
                </div>

                <div className="space-y-4">
                    {user.orders.length > 0 ? (
                        user.orders.slice(0, 3).map((order, i) => (
                            <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-3xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group">
                                <div className="flex items-center gap-6">
                                    <div className="size-14 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-colors">
                                        <Package className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{order.id}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{order.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 mt-4 sm:mt-0">
                                    <div className="text-right">
                                        <p className="text-sm font-black text-blue-600 dark:text-blue-400">{order.total || (order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString() + ' DH')}</p>
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border ${order.status === 'Livré' ? 'text-emerald-500 bg-emerald-50 border-emerald-100' : 'text-blue-500 bg-blue-50 border-blue-100'
                                            }`}>{order.status}</span>
                                    </div>
                                    <button onClick={() => setActiveTab('orders')} className="size-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center space-y-4">
                            <div className="size-20 bg-slate-50 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto text-slate-200">
                                <Package className="h-10 w-10" />
                            </div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Aucune commande pour le moment</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="size-12 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-2xl flex items-center justify-center">
                            <Heart className="h-6 w-6" />
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-tighter dark:text-white">Ma Wishlist</h4>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Vous avez {wishlistItems.length} article{wishlistItems.length !== 1 ? 's' : ''} sauvegardé{wishlistItems.length !== 1 ? 's' : ''}.
                    </p>
                    <button
                        onClick={() => dispatch(toggleWishlistDrawer())}
                        className="text-blue-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        Voir tout <ChevronRight className="h-3 w-3" />
                    </button>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="size-12 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-2xl flex items-center justify-center">
                            <Star className="h-6 w-6" />
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-tighter dark:text-white">Points TechZone</h4>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{user.points || 0} points cumulés.</p>
                    <button
                        onClick={() => setActiveTab('points')}
                        className="text-amber-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        Gérer <ChevronRight className="h-3 w-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileOverview;
