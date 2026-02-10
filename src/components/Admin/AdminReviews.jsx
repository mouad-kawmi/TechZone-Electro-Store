import React, { useMemo, useState } from 'react';
import { Star, CheckCircle, Trash2, Filter, Search, User, Calendar, Quote, ShoppingBag } from 'lucide-react';

const AdminReviews = ({ products = [], onDeleteReview }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ratingFilter, setRatingFilter] = useState('all');

    const allReviews = useMemo(() => {
        return products.flatMap(product =>
            (product.reviews_list || []).map(review => ({
                ...review,
                productId: product.id,
                productTitle: product.title,
                productImage: product.image
            }))
        ).sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [products]);

    const filteredReviews = useMemo(() => {
        return allReviews.filter(r => {
            const matchesSearch =
                (r.user || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (r.comment || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (r.productTitle || '').toLowerCase().includes(searchTerm.toLowerCase());

            const matchesRating = ratingFilter === 'all' || r.rating === Number(ratingFilter);

            return matchesSearch && matchesRating;
        });
    }, [allReviews, searchTerm, ratingFilter]);

    const stats = useMemo(() => {
        if (allReviews.length === 0) return { avg: 0, total: 0 };
        const sum = allReviews.reduce((acc, r) => acc + (r.rating || 0), 0);
        return {
            avg: (sum / allReviews.length).toFixed(1),
            total: allReviews.length
        };
    }, [allReviews]);

    return (
        <div className="space-y-8 animate-fade-up">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6">
                    <div className="size-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                        <Star className="size-7 fill-amber-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score Moyen</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{stats.avg} / 5</h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6">
                    <div className="size-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Quote className="size-7" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Avis</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{stats.total}</h3>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="relative group flex-1 max-w-md">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Rechercher par client, produit ou contenu..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:border-blue-600 outline-none transition-all dark:text-white"
                    />
                </div>

                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                    {['all', 5, 4, 3, 2, 1].map(rate => (
                        <button
                            key={rate}
                            onClick={() => setRatingFilter(rate)}
                            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-1 ${ratingFilter === rate
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {rate === 'all' ? 'Tous' : (
                                <>
                                    {rate} <Star className="size-2 fill-current" />
                                </>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-6">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((r, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-6 lg:p-8 shadow-sm hover:shadow-md transition-all group relative">

                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Left Section: User & Meta */}
                                <div className="flex lg:flex-col items-center lg:items-center gap-4 lg:w-40 shrink-0">
                                    <div className="size-20 lg:size-24 rounded-[2rem] bg-slate-50 dark:bg-slate-800 p-1 border-2 border-slate-100 dark:border-slate-800 overflow-hidden shrink-0">
                                        {r.productImage ? (
                                            <img src={r.productImage} alt="" className="w-full h-full object-contain" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <User className="size-10" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-start lg:items-center text-left lg:text-center space-y-1 overflow-hidden w-full">
                                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase truncate w-full">{r.user || "Anonyme"}</h4>
                                        <div className="flex items-center lg:justify-center">
                                            {[...Array(5)].map((_, idx) => (
                                                <Star key={idx} className={`size-3 ${idx < r.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-200 dark:text-slate-700'}`} />
                                            ))}
                                        </div>
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full w-fit">
                                            {r.date}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Section: Content */}
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3 text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">
                                                <ShoppingBag className="size-3" />
                                                <span>Produit concerné</span>
                                            </div>
                                            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1">{r.productTitle}</h3>
                                        </div>

                                        <button
                                            onClick={() => onDeleteReview && onDeleteReview(r.productId, r.id)}
                                            className="size-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm shrink-0 lg:opacity-0 lg:group-hover:opacity-100 lg:-translate-y-2 lg:group-hover:translate-y-0"
                                            title="Supprimer l'avis"
                                        >
                                            <Trash2 className="size-5" />
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <Quote className="absolute -left-2 -top-2 size-8 text-blue-500/10 -z-10" />
                                        <p className="text-[13px] font-bold text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-blue-500/20 pl-6 py-1">
                                            {r.comment}
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Avis Vérifié</span>
                                        </div>
                                        <span className="text-[8px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">ID: {r.id.toString().slice(0, 8)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white dark:bg-slate-900 p-20 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="size-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300">
                            <Search className="size-10" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Aucun avis trouvé</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Essayez d'ajuster vos filtres ou votre recherche</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminReviews;
