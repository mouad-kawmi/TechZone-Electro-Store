

import React, { useState, useMemo } from 'react';
import {
    Edit3, Trash2, ChevronRight, AlertCircle, ChevronLeft,
    TrendingUp, BarChart3, Search
} from 'lucide-react';

const AdminProductsTable = ({ products, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    // Filter products based on search query
    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return products;

        const query = searchQuery.toLowerCase();
        return products.filter(p =>
            (p.title || '').toLowerCase().includes(query) ||
            (p.category || '').toLowerCase().includes(query) ||
            (p.brand || '').toLowerCase().includes(query) ||
            String(p.id || '').includes(query)
        );
    }, [products, searchQuery]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = useMemo(() => {
        // Sort by ID descending (newest first)
        const sorted = [...filteredProducts].sort((a, b) => b.id - a.id);
        return sorted.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    }, [filteredProducts, currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900/40 rounded-[2rem] lg:rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden animate-fade-up selection:bg-blue-600/10 flex flex-col min-h-[500px]">
            {/* Search Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full sm:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest"
                    />
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20">
                        <span className="relative flex size-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full size-2 bg-blue-500"></span>
                        </span>
                        <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{filteredProducts.length} RÉSULTATS</span>
                    </div>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block flex-1 overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800">
                        <tr>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-display">Produit Details</th>
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
                                            <img src={p.image || null} className="relative size-14 object-contain bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 p-2 z-10 shadow-sm" alt={p.title} />
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
                                                <span className="px-2 py-0.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 rounded-lg text-[7.5px] font-black uppercase tracking-[0.2em] ">Low Stock</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-[8px] font-black text-slate-400/60 uppercase tracking-[0.3em]">{p.category || 'General'}</p>
                                            {p.brand && (
                                                <>
                                                    <span className="text-[8px] text-slate-300">•</span>
                                                    <p className="text-[8px] font-black text-blue-600/60 dark:text-blue-400/60 uppercase tracking-[0.2em]">{p.brand}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col items-center gap-2 min-w-[140px]">
                                        <div className="flex items-center justify-between w-full mb-0.5">
                                            <div className="flex items-center gap-2">
                                                <BarChart3 className="size-3 text-blue-500" />
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
                                    <div className="flex justify-end gap-2 lg:translate-x-2 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all duration-500">
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
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden flex-1 p-4 sm:p-6 space-y-4">
                {paginatedProducts.map(p => (
                    <div key={p.id} className="bg-slate-50/50 dark:bg-slate-900/60 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="size-16 shrink-0 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 p-2 flex items-center justify-center">
                                <img src={p.image || null} className="w-full h-full object-contain" alt={p.title} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight truncate font-display">{p.title}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <p className="text-xs font-black text-blue-600 dark:text-blue-400">{p.price.toLocaleString()} DH</p>
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{p.category}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-1">
                            <div className="space-y-1.5">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Stock Health</p>
                                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${p.stock <= 0 ? 'bg-rose-500' : p.stock < 10 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                                        style={{ width: `${Math.min(100, (p.stock / 50) * 100)}%` }}
                                    ></div>
                                </div>
                                <p className={`text-[8px] font-black uppercase ${p.stock <= 5 ? 'text-rose-500' : 'text-slate-500'}`}>
                                    {p.stock} Units left
                                </p>
                            </div>
                            <div className="flex justify-end items-center gap-2">
                                <button
                                    onClick={() => onEdit(p)}
                                    className="size-10 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all active:scale-90"
                                >
                                    <Edit3 className="size-3.5" />
                                </button>
                                <button
                                    onClick={() => onDelete(p.id)}
                                    className="size-10 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all active:scale-90"
                                >
                                    <Trash2 className="size-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Footer */}
            <div className="px-6 lg:px-8 py-6 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] order-2 sm:order-1">
                    Showing <span className="text-blue-600">{(currentPage * itemsPerPage) + 1}</span>-
                    <span className="text-blue-600">{Math.min((currentPage + 1) * itemsPerPage, products.length)}</span> of <span className="text-blue-600">{products.length}</span> Products
                </p>

                <div className="flex items-center gap-2 order-1 sm:order-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="size-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-all active:scale-90 shadow-sm"
                    >
                        <ChevronLeft className="size-4" />
                    </button>

                    <div className="flex items-center gap-1.5 px-4 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
                        <span className="text-[10px] font-black text-blue-600 font-display">{currentPage + 1}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mx-0.5">/</span>
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
