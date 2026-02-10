import React, { useMemo } from 'react';
import { Star, CheckCircle, Trash2, Filter, Search } from 'lucide-react';

const AdminReviews = ({ products = [], onDeleteReview }) => {

    const reviews = useMemo(() => {
        return products.flatMap(product =>
            (product.reviews_list || []).map(review => ({
                ...review,
                productId: product.id,
                productTitle: product.title,
                productImage: product.image
            }))
        ).sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [products]);

    const averageRating = useMemo(() => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
        return (sum / reviews.length).toFixed(1);
    }, [reviews]);

    return (
        <div className="space-y-6 animate-fade-up">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Global Sentiment</p>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-black text-slate-900 dark:text-white">{averageRating}</span>
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star
                                        key={i}
                                        className={`size-3 ${i <= Math.round(averageRating) ? 'text-amber-500 fill-amber-500' : 'text-slate-300 dark:text-slate-700'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-slate-100 dark:bg-slate-800" />
                    <div className="hidden sm:block space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total Reviews</p>
                        <span className="text-xl font-black text-slate-900 dark:text-white">{reviews.length}</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                        <Filter className="size-3 text-slate-400" />
                        <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">All Sentiments</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {reviews.length > 0 ? (
                    reviews.map((r, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between group transition-all hover:border-blue-500/30">
                            <div className="flex gap-8 items-start flex-1">
                                <div className="size-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 uppercase font-black text-sm shrink-0 overflow-hidden">
                                    {r.productImage ? <img src={r.productImage} alt="" className="w-full h-full object-cover" /> : r.user[0]}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{r.user || "Anonymous"}</span>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`size-2.5 ${i < r.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}`} />
                                            ))}
                                        </div>
                                        <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest underline decoration-blue-500/30 underline-offset-4">{r.productTitle}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed italic max-w-2xl">
                                        "{r.comment}"
                                    </p>
                                    <p className="text-[7px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{r.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => onDeleteReview && onDeleteReview(r.productId, r.id)}
                                    className="size-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                                    title="Delete Review"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                        Aucun avis trouvé.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminReviews;
