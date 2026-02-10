import React, { useState, useMemo } from 'react';
import {
  Star, CheckCircle2, ChevronRight, ArrowLeft, Filter,
  Image as ImageIcon, ThumbsUp, X, StarHalf, ShieldCheck
} from 'lucide-react';

const ReviewsPage = ({ onBack, products }) => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [activeRating, setActiveRating] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Aggregate all reviews from all products
  const allReviews = useMemo(() => {
    const list = [];
    products.forEach(p => {
      if (p.reviews_list) {
        p.reviews_list.forEach(rev => {
          list.push({
            ...rev,
            id: Math.random(),
            productName: p.title,
            initials: rev.user.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            date: rev.date || new Date().toISOString()
          });
        });
      }
    });

    // Sort by date initially
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [products]);

  const stats = useMemo(() => {
    const totalActual = allReviews.length;
    const TOTAL_VIRTUAL = 1240 + totalActual; // Match Testimonials.jsx baseline
    const sumActual = allReviews.reduce((acc, r) => acc + r.rating, 0);

    // Weighted average to feel realistic
    const avg = totalActual > 0 ? (sumActual / totalActual).toFixed(1) : "4.9";

    const breakdown = [5, 4, 3, 2, 1].map(s => {
      const count = allReviews.filter(r => r.rating === s).length;
      return {
        stars: s,
        count: Math.round((count / totalActual) * TOTAL_VIRTUAL) || 0,
        percentage: totalActual > 0 ? Math.round((count / totalActual) * 100) : (s === 5 ? 90 : 2)
      };
    });

    return { average: avg, total: TOTAL_VIRTUAL, breakdown };
  }, [allReviews]);

  const filteredReviews = useMemo(() => {
    let result = [...allReviews];

    // Rating Filter
    if (activeRating) {
      result = result.filter(r => r.rating === activeRating);
    }

    // Secondary Filters
    if (activeFilter === 'newest') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (activeFilter === 'oldest') {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (activeFilter === 'Avec photos') {
      result = result.filter(r => r.images && r.images.length > 0);
    } else if (activeFilter === 'Top Évaluation') {
      result = result.filter(r => r.rating === 5);
    }

    return result;
  }, [allReviews, activeFilter, activeRating]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
  const currentReviews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredReviews.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredReviews, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 font-sans">
      {/* Upper Navigation - Mobile Optimized */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 md:py-8">
        <nav className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <button onClick={onBack} className="hover:text-blue-600 transition-all flex items-center gap-1.5 active:scale-95">
            <ArrowLeft className="h-3 w-3 md:h-3.5 md:w-3.5" /> <span className="hidden sm:inline">RETOUR</span>
          </button>
          <ChevronRight className="h-3 w-3 opacity-30" />
          <span className="text-slate-900 dark:text-white uppercase tracking-widest truncate">Avis Clients</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pb-24 md:pb-32">
        {/* Rating Overview Card - Premium Responsive */}
        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 lg:p-16 border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-900/5 mb-12 md:mb-20 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-10 md:gap-16 items-center">
            {/* Left side: Large Average */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 dark:bg-blue-600/10 rounded-2xl mb-4">
                <ShieldCheck className="size-4 text-blue-600" />
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Feedback Certifié</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.9] font-display">
                L'Avis des <br /> <span className="text-blue-600">Pros.</span>
              </h1>

              <div className="flex flex-col items-center lg:items-start gap-3 pt-4">
                <div className="flex items-center gap-4">
                  <span className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{stats.average}</span>
                  <div className="flex flex-col items-start">
                    <div className="flex text-yellow-400 gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`size-4 md:size-5 ${s <= Math.floor(Number(stats.average)) ? 'fill-current' : 'text-slate-200 dark:text-slate-800'}`} />
                      ))}
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Sur {stats.total} Retours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Detailed Breakdown */}
            <div className="lg:col-span-7 space-y-3 md:space-y-4">
              {stats.breakdown.map((item) => (
                <button
                  key={item.stars}
                  onClick={() => {
                    setActiveRating(activeRating === item.stars ? null : item.stars);
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center gap-4 md:gap-6 group/row transition-all p-1.5 rounded-xl ${activeRating === item.stars ? 'bg-blue-50 dark:bg-blue-600/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'}`}
                >
                  <span className={`text-[9px] md:text-[10px] font-black w-14 text-right uppercase tracking-widest transition-colors ${activeRating === item.stars ? 'text-blue-600' : 'text-slate-400'}`}>
                    {item.stars} Étoiles
                  </span>
                  <div className="flex-1 h-2 md:h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ease-out group-hover/row:scale-[1.02] origin-left ${activeRating === item.stars ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className={`text-[9px] md:text-[10px] font-bold w-10 text-left ${activeRating === item.stars ? 'text-blue-600' : 'text-slate-400'}`}>
                    {item.percentage}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Controls Bar - Responsive Layout */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 mb-12 animate-fade-up">
          <div className="flex flex-col md:flex-row items-center gap-6 w-full xl:w-auto">
            {/* Chronological Sorting */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar scroll-smooth">
              {[
                { label: 'Tous', id: 'Tous' },
                { label: 'Les plus récents', id: 'newest' },
                { label: 'Les plus anciens', id: 'oldest' },
                { label: 'Avec photos', id: 'Avec photos' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => { setActiveFilter(btn.id); setCurrentPage(1); }}
                  className={`px-5 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 ${activeFilter === btn.id
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-white/5 hover:border-blue-600/30'
                    }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

            {/* Rating Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar scroll-smooth">
              {[5, 4, 3, 2, 1].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setActiveRating(activeRating === s ? null : s);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase transition-all whitespace-nowrap active:scale-95 ${activeRating === s
                    ? 'bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/20'
                    : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-white/5 hover:border-yellow-400/30'
                    }`}
                >
                  {s} <Star className={`size-3 ${activeRating === s ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-4 rounded-2xl border border-slate-100 dark:border-white/5 text-[9px] font-black text-slate-400 uppercase tracking-widest shrink-0">
            <Filter className="size-3.5 text-blue-600" /> Mode d'Affichage Premium
          </div>
        </div>

        {/* Reviews Listing - Grid 1 or 2 Cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {currentReviews.length > 0 ? currentReviews.map((rev, i) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden relative group"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="size-12 md:size-14 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl flex items-center justify-center font-black tracking-tighter shadow-lg uppercase text-sm">
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{rev.user}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-yellow-400 gap-0.5">
                        {[...Array(5)].map((_, idx) => <Star key={idx} className={`size-3 ${idx < rev.rating ? 'fill-current' : 'text-slate-100 dark:text-slate-800'}`} />)}
                      </div>
                      <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest pl-2 border-l border-slate-100 dark:border-slate-800">{rev.dateLabel || '15 Jan 2024'}</span>
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-900/30 text-[8px] font-black uppercase tracking-widest">
                  <CheckCircle2 className="size-3" /> Vérifié
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[9px] md:text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] opacity-80">{rev.productName}</p>
                  <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed text-sm md:text-base italic">
                    "{rev.comment}"
                  </p>
                </div>

                {rev.images && rev.images.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {rev.images.map((img, idx) => (
                      <div key={idx} className="size-16 md:size-20 rounded-xl md:rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 p-1 group/img relative cursor-zoom-in">
                        <img src={img} className="w-full h-full object-cover rounded-lg md:rounded-xl transition-transform duration-700 group-hover/img:scale-125" alt="Review" />
                        <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="size-5 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest active:bg-blue-50 py-1 rounded-lg">
                    <ThumbsUp className="size-3.5" /> Utile ({rev.likes || 12})
                  </button>
                  <button className="text-[8px] md:text-[10px] font-black text-slate-400 dark:text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Signaler</button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-24 md:py-32 text-center bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[4rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
              <div className="size-20 bg-slate-50 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Filter className="size-10" />
              </div>
              <p className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Aucun avis de ce type pour le moment.</p>
            </div>
          )}
        </div>

        {/* Technical Pagination - Mobile Friendly */}
        {totalPages > 1 && (
          <div className="mt-16 md:mt-24 flex flex-col items-center gap-8">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="size-10 md:size-12 rounded-xl md:rounded-2xl border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-400 hover:bg-white dark:hover:bg-slate-900 transition-all disabled:opacity-20 active:scale-95"
              >
                <ArrowLeft size={16} />
              </button>

              <div className="flex items-center gap-1.5 md:gap-2">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  // Only show 3-5 pages on mobile to avoid overflow
                  if (totalPages > 5 && Math.abs(page - currentPage) > 1 && page !== 1 && page !== totalPages) {
                    if (page === currentPage - 2 || page === currentPage + 2) return <span key={page} className="text-slate-300">...</span>;
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`size-10 md:size-12 rounded-xl md:rounded-2xl flex items-center justify-center text-[10px] md:text-xs font-black transition-all ${currentPage === page
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-110'
                        : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-white/5'
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="size-10 md:size-12 rounded-xl md:rounded-2xl border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-400 hover:bg-white dark:hover:bg-slate-900 transition-all disabled:opacity-20 active:scale-95"
              >
                <ChevronRight size={16} className="translate-x-0.5" />
              </button>
            </div>

            <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-[0.5em] opacity-40">
              Page {currentPage} sur {totalPages} — TechZone Cloud Review
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
