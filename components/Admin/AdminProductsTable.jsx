
import React, { useState, useMemo } from 'react';
import {
    Edit3, Trash2, ChevronRight, AlertCircle, ChevronLeft,
    TrendingUp, BarChart
} from 'lucide-react';

const AdminProductsTable = ({ products, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginatedProducts = useMemo(() => {
        return products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    }, [products, currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            // Scroll Admin Panel content area to top
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900/40 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden animate-fade-up selection:bg-blue-600/10 flex flex-col min-h-[600px]">
            <div className="flex-1 overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800">
                        <tr>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-display">Produit Détails</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-display">Statut / Cat</th>
                            <th className="px-8 py-6 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-display">Performance Elite</th>
                            <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-display">Actions Elite</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                        {paginatedProducts.map(p => (
                            <tr key={p.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-all duration-500 group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative size-14 shrink-0 group-hover:scale-110 transition-transform duration-700">
                                            <div className="absolute inset-0 bg-blue-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <img src={p.image} className="relative size-14 object-contain bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 p-2 z-10 shadow-sm" alt={p.title} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter font-display">{p.title}</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-[10px] font-black text-blue-600 dark:text-blue-400">{p.price.toLocaleString()} DH</p>
                                                {p.oldPrice && p.oldPrice > p.price && (
                                                    <p className="text-[9px] text-slate-300 dark:text-slate-600 line-through font-bold">-{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-1.5">
                                            {p.isNew && <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-lg text-[7.5px] font-black uppercase tracking-[0.2em]">Elite New</span>}
                                            {p.stock <= 0 ? (
                                                <span className="px-2 py-0.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-lg text-[7.5px] font-black uppercase tracking-[0.2em] flex items-center gap-1">
                                                    <AlertCircle className="size-2.5" /> Out of Stock
                                                </span>
                                            ) : p.stock <= 5 && (
                                                <span className="px-2 py-0.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 rounded-lg text-[7.5px] font-black uppercase tracking-[0.2em]">Low Stock</span>
                                            )}
                                        </div>
                                        <p className="text-[8px] font-black text-slate-400/60 uppercase tracking-[0.3em]">{p.category || 'General'}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col items-center gap-2 min-w-[140px]">
                                        <div className="flex items-center justify-between w-full mb-0.5">
                                            <div className="flex items-center gap-2">
                                                <BarChart className="size-3 text-blue-500" />
                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Stock Health</span>
                                            </div>
                                            <span className={`text-[9px] font-black font-display ${p.stock <= 0 ? 'text-rose-500' : p.stock < 10 ? 'text-orange-500' : 'text-slate-900 dark:text-white'}`}>{p.stock} units</span>
                                        </div>
                                        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                                            <div
                                                className={`h-full transition-all duration-1000 ease-out ${p.stock <= 0 ? 'bg-rose-500' : p.stock < 10 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                                                style={{ width: `${Math.min(100, (p.stock / 50) * 100)}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <TrendingUp className="size-2.5 text-blue-500 animate-pulse" />
                                            <span className="text-[7.5px] font-black text-blue-500 uppercase tracking-widest">{p.stock > 10 ? 'High Momentum' : 'Stable Flow'}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                        <button
                                            onClick={() => onEdit(p)}
                                            className="size-9 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600/50 transition-all active:scale-90 hover:shadow-xl hover:shadow-blue-600/10"
                                        >
                                            <Edit3 className="size-3.5" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(p.id)}
                                            className="size-9 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-500/50 transition-all active:scale-90 hover:shadow-xl hover:shadow-rose-500/10"
                                        >
                                            <Trash2 className="size-3.5" />
                                        </button>
                                        <div className="size-9 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 active:scale-90 cursor-pointer">
                                            <ChevronRight className="size-4" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    Showing <span className="text-blue-600">{(currentPage * itemsPerPage) + 1}</span>-
                    <span className="text-blue-600">{Math.min((currentPage + 1) * itemsPerPage, products.length)}</span> of <span className="text-blue-600">{products.length}</span> Products
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="size-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-all active:scale-90 shadow-sm"
                    >
                        <ChevronLeft className="size-4" />
                    </button>

                    <div className="flex items-center gap-1.5 px-4 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight font-display">Page</span>
                        <span className="text-[10px] font-black text-blue-600 font-display">{currentPage + 1}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mx-0.5 select-none">/</span>
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 font-display">{totalPages}</span>
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        className="size-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-all active:scale-90 shadow-sm"
                    >
                        <ChevronRight className="size-4" />
                    </button>
                </div>
            </div>

            {products.length === 0 && (
                <div className="p-12 text-center space-y-4">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em]">Makhzen khawi</p>
                </div>
            )}
        </div>
    );
};

export default AdminProductsTable;
