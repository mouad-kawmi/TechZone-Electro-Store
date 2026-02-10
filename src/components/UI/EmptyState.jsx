import React, { useEffect, useRef } from 'react';
import { ShoppingBag, Heart, Search, Ghost, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const EmptyState = ({
    type = 'default',
    title,
    message,
    onAction,
    actionLabel
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".empty-icon", {
                scale: 0.5,
                opacity: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.5)"
            });
            gsap.from(".empty-text", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const configs = {
        cart: {
            icon: ShoppingBag,
            title: 'Votre Panier est Vide',
            message: 'Il n\'y a encore rien ici. Parcourez nos produits pour trouver votre bonheur !',
            action: 'Commencer le Shopping'
        },
        wishlist: {
            icon: Heart,
            title: 'Favoris Vides',
            message: 'Vous n\'avez pas encore ajouté de produits à vos favoris.',
            action: 'Explorer les Produits'
        },
        search: {
            icon: Search,
            title: 'Aucun Résultat',
            message: 'Nous n\'avons rien trouvé pour votre recherche. Essayez d\'autres mots-clés !',
            action: 'Rechercher à Nouveau'
        },
        default: {
            icon: Ghost,
            title: 'Rien à Afficher',
            message: 'Aucune donnée n\'a été trouvée dans cette section.',
            action: 'Retour à l\'Accueil'
        }
    };

    const Config = configs[type] || configs.default;

    return (
        <div ref={containerRef} className="h-full flex flex-col items-center justify-center text-center py-12 px-6">
            <div className="relative mb-10 group">
                <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full scale-150 animate-pulse"></div>
                <div className="empty-icon relative size-32 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-2xl shadow-blue-600/5 group-hover:scale-110 transition-transform duration-700">
                    <Config.icon className="size-14 text-slate-200 dark:text-slate-800" strokeWidth={0.5} />
                </div>
            </div>

            <div className="empty-text space-y-3">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter font-display italic">
                    {title || Config.title}
                </h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
                    {message || Config.message}
                </p>
            </div>

            {onAction && (
                <button
                    onClick={onAction}
                    className="empty-text mt-12 flex items-center gap-3 bg-slate-900 dark:bg-blue-600 text-white px-10 h-16 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-95 shadow-2xl shadow-blue-600/20"
                >
                    {actionLabel || Config.action}
                    <ArrowRight className="size-4" />
                </button>
            )}
        </div>
    );
};

export default EmptyState;
