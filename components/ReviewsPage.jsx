import React, { useState, useMemo } from 'react';
import {
  Star, CheckCircle2, ChevronRight, ArrowLeft, Filter,
  Image as ImageIcon, ThumbsUp, X, StarHalf, ShieldCheck
} from 'lucide-react';

const ReviewsPage = ({ onBack, products }) => {
  const [activeFilter, setActiveFilter] = useState('Tous');

  // Aggregate all reviews from all products
  const allReviews = useMemo(() => {
    const list = [];
    products.forEach(p => {
      if (p.reviews_list) {
        p.reviews_list.forEach(rev => {
          list.push({
            ...rev,
            id: Math.random(), // Unique ID for display
            productName: p.title,
            initials: rev.user.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            dateLabel: rev.date // In a real app we'd format this
          });
        });
      }
    });
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [products]);

  const stats = useMemo(() => {
    const total = allReviews.length;
    const sum = allReviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = total > 0 ? (sum / total).toFixed(1) : 0;

    const breakdown = [5, 4, 3, 2, 1].map(s => {
      const count = allReviews.filter(r => r.rating === s).length;
      return { stars: s, count, percentage: total > 0 ? Math.round((count / total) * 100) : 0 };
    });

    return { average: avg, total: 1248 + allReviews.length - 4, breakdown };
  }, [allReviews]);

  const filteredReviews = useMemo(() => {
    let result = [...allReviews];
    if (activeFilter === 'Les plus récents') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (activeFilter === 'Avec photos') {
      result = result.filter(r => r.images && r.images.length > 0);
    } else if (activeFilter === 'Top Évaluation') {
      result = result.filter(r => r.rating === 5);
    }
    return result;
  }, [allReviews, activeFilter]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 ">
      {/* Header Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <button onClick={onBack} className="hover:text-blue-600 transition-colors flex items-center gap-2">
            <ArrowLeft className="h-3.5 w-3.5" /> ACCUEIL
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900 dark:text-white uppercase tracking-widest">Retours d'Expérience</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pb-32">
        {/* Rating Overview Card */}
        <section className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-16 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/5 mb-20 animate-fade-up">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 text-center lg:text-left space-y-4">
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                L'avis de <br /> <span className="text-blue-600">L'Elite.</span>
              </h1>
              <div className="flex flex-col items-center lg:items-start gap-2 pt-6">
                <div className="flex items-center gap-2">
                  <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">{stats.average}</span>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(Number(stats.average)) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Moyenne Globale</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {stats.breakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-6 group">
                  <span className="text-[10px] font-black text-slate-400 w-12 text-right uppercase tracking-widest">{item.stars} Stars</span>
                  <div className="flex-1 h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-1000 ease-out group-hover:bg-blue-400"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-slate-900 dark:text-white w-10">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full sm:w-auto no-scrollbar">
            {['Tous', 'Les plus récents', 'Avec photos', 'Top Évaluation'].map((btn) => (
              <button
                key={btn}
                onClick={() => setActiveFilter(btn)}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === btn
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-blue-200'
                  }`}
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">
            <Filter className="h-4 w-4" /> Trier par Pertinence
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {filteredReviews.length > 0 ? filteredReviews.map((rev, i) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="size-14 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center font-black tracking-tighter shadow-sm uppercase">
                    {rev.initials || 'CZ'}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{rev.user}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, idx) => <Star key={idx} className={`h-3 w-3 ${idx < rev.rating ? 'fill-current' : 'text-slate-100 dark:text-slate-800'}`} />)}
                      </div>
                      <span className="h-3 w-px bg-slate-100 dark:bg-slate-800"></span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{rev.dateLabel || 'Récemment'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-900/30 text-[9px] font-black uppercase tracking-widest">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Achat Vérifié
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">{rev.productName}</p>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-sm">
                    "{rev.comment}"
                  </p>
                </div>

                {rev.images && rev.images.length > 0 && (
                  <div className="flex gap-4">
                    {rev.images.map((img, idx) => (
                      <div key={idx} className="size-20 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 p-1 group relative">
                        <img src={img} className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" alt="Review" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">
                    <ThumbsUp className="h-3.5 w-3.5" /> Utile ({rev.likes || 0})
                  </button>
                  <button className="text-[10px] font-black text-slate-400 dark:text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest">Répondre</button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-32 text-center bg-white dark:bg-slate-900 rounded-[4rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
              <ImageIcon className="size-16 text-slate-100 dark:text-slate-800 mx-auto mb-6" />
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Aucun avis ne correspond à ce filtre.</p>
            </div>
          )}
        </div>

        {/* Load More */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Affichage de {filteredReviews.length} sur {stats.total} avis</p>
          <button className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-12 py-5 rounded-2xl border border-slate-100 dark:border-slate-800 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm">
            Charger plus de retours
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
