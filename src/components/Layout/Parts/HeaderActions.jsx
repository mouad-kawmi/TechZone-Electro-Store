import React from 'react';
import { Search, Sun, Moon, Heart, User, ShoppingBag } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setDarkMode, setView } from '../../../store';

const HeaderActions = ({
    searchOpen, setSearchOpen, onSearchOpen, dark, wishlistCount,
    onWishlistClick, auth, onCartClick, cartCount, setMenuOpen
}) => {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center gap-1 md:gap-2">
            <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden size-9 md:size-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-colors"
            >
                <Search className="size-4 md:size-5" />
            </button>

            <button
                onClick={() => dispatch(setDarkMode(!dark))}
                className="flex size-9 md:size-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-colors"
            >
                {dark ? <Sun className="size-4 md:size-5" /> : <Moon className="size-4 md:size-5" />}
            </button>

            <button
                onClick={onWishlistClick}
                className="flex size-9 md:size-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-all relative group"
            >
                <Heart className={`size-4 md:size-5 group-hover:scale-110 transition-transform ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500 border-none' : ''}`} />
                {wishlistCount > 0 && <span className="absolute top-2 right-2 size-2 bg-rose-500 rounded-full border border-white dark:border-slate-950 animate-bounce"></span>}
            </button>

            <button
                onClick={() => {
                    if (auth.isLoggedIn) {
                        const isAdmin = auth.user?.role === 'admin' || auth.user?.email === 'admin';
                        dispatch(setView(isAdmin ? 'ADMIN' : 'PROFILE'));
                    } else {
                        dispatch(setView('LOGIN'));
                    }
                }}
                className={`flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-colors ${auth.isLoggedIn ? 'h-9 md:h-10 px-2 md:px-3 gap-1 md:gap-2 w-auto' : 'size-9 md:size-10'}`}
            >
                <User className="size-4 md:size-5" />
                {auth.isLoggedIn && auth.user?.username && (
                    <span className="text-[11px] font-bold text-slate-900 dark:text-white truncate max-w-[100px] hidden md:block">
                        {auth.user.username}
                    </span>
                )}
            </button>

            <button
                onClick={onCartClick}
                className="relative size-9 md:size-10 flex items-center justify-center bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl hover:bg-blue-600 transition-all shadow-lg group"
            >
                <ShoppingBag className="size-4 md:size-5 group-hover:-translate-y-0.5 transition-transform" />
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 size-4 bg-blue-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950 animate-bounce">{cartCount}</span>
                )}
            </button>

            {setMenuOpen && (
                <button
                    onClick={() => setMenuOpen(true)}
                    className="lg:hidden size-9 md:size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white transition-colors ml-1"
                >
                    <svg className="size-4 md:size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                </button>
            )}
        </div>
    );
};

export default HeaderActions;
