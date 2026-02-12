import React, { useState } from 'react';
import { Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../store';

const ProductReviews = ({ product, onAddReview }) => {
    const dispatch = useDispatch();
    const [uName, setUName] = useState('');
    const [uRate, setURate] = useState(0);
    const [hRate, setHRate] = useState(0);
    const [uCom, setUCom] = useState('');
    const [done, setDone] = useState(false);

    return (
        <div className="space-y-8 sm:space-y-12 max-w-4xl">
            <div className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-6 sm:mb-8 dark:text-white font-display">Donner votre avis</h3>
                {done ? (
                    <div className="py-10 text-center space-y-4">
                        <div className="size-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                            <CheckCircle2 className="size-8" />
                        </div>
                        <p className="text-xl font-black uppercase tracking-tighter dark:text-white">Merci pour votre avis !</p>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Votre commentaire a été publié avec succès.</p>
                        <button onClick={() => setDone(false)} className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline mt-4">Écrire un autre avis</button>
                    </div>
                ) : (
                    <div className="space-y-6 sm:space-y-8">
                        <div className="space-y-3 sm:space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Votre Nom</span>
                            <input
                                type="text" value={uName} onChange={(e) => setUName(e.target.value)} placeholder="Votre nom complet"
                                className="w-full p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Note globale</span>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button key={s} onMouseEnter={() => setHRate(s)} onMouseLeave={() => setHRate(0)} onClick={() => setURate(s)} className="transition-transform hover:scale-125 duration-200">
                                        <Star className={`size-6 sm:size-8 ${(hRate || uRate) >= s ? 'text-amber-500 fill-current' : 'text-slate-200 dark:text-slate-700'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Votre commentaire</span>
                            <textarea
                                value={uCom} onChange={(e) => setUCom(e.target.value)} placeholder="Chno ban lik f had l-produit?"
                                className="w-full min-h-[120px] p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 dark:text-white text-sm"
                            />
                        </div>
                        <button
                            disabled={!uRate || !uCom.trim() || !uName.trim()}
                            onClick={() => {
                                if (onAddReview) onAddReview(product.id, { user: uName, rating: uRate, comment: uCom, date: new Date().toLocaleDateString('fr-FR') });
                                dispatch(addNotification({ type: 'review', title: 'Nouvel Avis', message: `${uName} a donné ${uRate}/5 étoiles à ${product.title}`, link: '/admin/reviews' }));
                                setDone(true); setURate(0); setUCom(''); setUName('');
                            }}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 text-white font-black px-8 sm:px-10 py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3"
                        >
                            Publier l'avis <ArrowRight className="size-4" />
                        </button>
                    </div>
                )}
            </div>

            <div className="space-y-6 pt-8 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white font-display mb-4 sm:mb-8">Avis des utilisateurs</h3>
                {product.reviews_list?.length > 0 ? product.reviews_list.map((rev, i) => (
                    <div key={i} className="p-6 sm:p-10 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, idx) => <Star key={idx} className={`size-3 ${idx < rev.rating ? 'text-yellow-400 fill-current' : 'text-slate-200'}`} />)}
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{rev.date}</span>
                        </div>
                        <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2 font-display">{rev.user}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">"{rev.comment}"</p>
                    </div>
                )) : (
                    <div className="p-12 sm:p-20 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2.5rem]">
                        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Mabous avis 7taaba wa7ed. Koun nta l-awal!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductReviews;
