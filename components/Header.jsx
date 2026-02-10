
import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Heart, User, LogOut, ShoppingBag, Smartphone,
  Laptop, Tablet, Headphones, PackageSearch, Moon, Sun,
  TrendingUp, Eye, Mail, Menu, X
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, setView, toggleWishlistDrawer, logout, setDarkMode } from '../store';

const Header = ({
  cartCount, wishlistCount, onCartClick,
  onWishlistClick, onHomeClick, onContactClick, onCategoryClick,
  onSearch, onViewProduct, onQuickView, onTrackOrder, searchQuery,
  allProducts = []
}) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.ui);
  const { isLoggedIn, user: currentUser } = useSelector((state) => state.auth);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showLiveResults, setShowLiveResults] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowLiveResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const liveResults = searchQuery.length >= 2
    ? allProducts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const navItems = [
    { name: 'Smartphones', displayName: 'Phones', icon: Smartphone },
    { name: 'Laptops', displayName: 'Laptops', icon: Laptop },
    { name: 'Tablets', displayName: 'Tablets', icon: Tablet },
    { name: 'Audio', displayName: 'Audio', icon: Headphones }
  ];

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      onSearchSubmit?.(searchQuery);
      setShowLiveResults(false);
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <div className="fixed top-0 z-[100] w-full">
      {/* Premium Top Bar */}
      <div className="w-full bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-white/5 hidden md:block transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <span className="size-1 bg-blue-500 rounded-full animate-pulse"></span>
              Livraison Gratuite dès 2000 DH
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onTrackOrder} className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase hover:text-blue-600 transition-colors tracking-widest flex items-center gap-2">
              <PackageSearch className="size-3.5" /> Suivre Commande
            </button>
            <button onClick={onContactClick} className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase hover:text-blue-600 transition-colors tracking-widest">Aide</button>
          </div>
        </div>
      </div>

      <header className={`transition-all duration-500 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 ${isScrolled ? 'py-3 shadow-md shadow-slate-200/5' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">

          <div className="flex items-center gap-12">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={onHomeClick}>
              <div className="size-10 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-blue-600 dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all duration-500 font-bold font-display text-sm tracking-tighter">TZ</div>
              <h2 className="text-slate-950 dark:text-white text-xl font-bold uppercase tracking-tighter font-display hidden sm:block">TechZone</h2>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onCategoryClick ? onCategoryClick(item.name) : onSearch(item.name)}
                  className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[10px] font-bold hover:text-slate-950 dark:hover:text-white transition-colors uppercase tracking-widest"
                >
                  {item.displayName}
                </button>
              ))}
              <button onClick={onContactClick} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[10px] font-bold hover:text-slate-950 dark:hover:text-white transition-colors uppercase tracking-widest">
                Support
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar - Desktop */}
            <div className="relative hidden md:block" ref={searchRef}>
              <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-xl px-4 py-2 border border-transparent focus-within:border-blue-500/30 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all duration-300 w-64 lg:w-80">
                <Search className="size-4 text-slate-400 mr-3" />
                <input
                  type="text"
                  className="bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 p-0 text-[11px] font-medium w-full"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onFocus={() => setShowLiveResults(true)}
                  onChange={(e) => onSearch(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                />
              </div>

              {/* Suggestions results */}
              {showLiveResults && liveResults.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/5 p-2 z-[110] animate-fade-in">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-50 dark:border-white/5 mb-1">
                    <TrendingUp className="size-3 text-blue-500" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Populaire</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {liveResults.map(p => (
                      <div
                        key={p.id}
                        className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all cursor-pointer group"
                        onClick={() => { onViewProduct?.(p); setShowLiveResults(false); }}
                      >
                        <div className="size-10 bg-slate-50 dark:bg-white rounded-lg p-1">
                          <img src={p.image} className="w-full h-full object-contain" alt={p.title} />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-[10px] font-bold text-slate-900 dark:text-white truncate">{p.title}</p>
                          <p className="text-[9px] font-bold text-blue-600">{p.price.toLocaleString()} DH</p>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => { onSearchSubmit?.(searchQuery); setShowLiveResults(false); }}
                      className="w-full text-center py-3 text-[9px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-xl transition-all"
                    >
                      Voir tous les résultats
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="md:hidden size-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-colors"
                aria-label="Search"
              >
                <Search className="size-5" />
              </button>

              <button
                onClick={() => dispatch(setDarkMode(!isDarkMode))}
                className="flex size-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-colors"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>

              <button
                onClick={onWishlistClick}
                className="hidden sm:flex size-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-all relative group"
              >
                <Heart className={`size-5 group-hover:scale-110 group-active:scale-90 transition-transform ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500 border-none' : ''}`} />
                {wishlistCount > 0 && <span className="absolute top-2 right-2 size-2 bg-rose-500 rounded-full border border-white dark:border-slate-950 animate-bounce"></span>}
              </button>

              <button
                onClick={() => {
                  if (isLoggedIn) {
                    const isAdmin = currentUser?.role === 'admin' || currentUser?.email === 'admin';
                    dispatch(setView(isAdmin ? 'ADMIN' : 'PROFILE'));
                  } else {
                    dispatch(setView('LOGIN'));
                  }
                }}
                className="size-10 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-colors"
              >
                <User className="size-5" />
              </button>

              <button
                onClick={onCartClick}
                className="relative size-10 flex items-center justify-center bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-lg group"
              >
                <ShoppingBag className="size-5 group-hover:-translate-y-0.5 group-active:translate-y-0 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 size-4 bg-blue-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950 animate-bounce">{cartCount}</span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white transition-colors ml-1"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-6 pt-4 pb-2 animate-fade-down">
            <div className="relative">
              <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-xl px-4 py-2.5 border border-blue-500/20">
                <Search className="size-4 text-slate-400 mr-3" />
                <input
                  type="text"
                  autoFocus
                  className="bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 p-0 text-[12px] font-medium w-full"
                  placeholder="Que cherchez-vous ?"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => onSearch('')} className="ml-2 text-slate-400 hover:text-slate-600 transition-colors text-[10px] font-bold uppercase tracking-tight">Vider</button>
                )}
              </div>

              {/* Suggestions results for mobile */}
              {searchQuery.length >= 2 && liveResults.length > 0 && (
                <div className="absolute top-14 left-0 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/5 p-2 z-[110]">
                  <div className="max-h-[350px] overflow-y-auto">
                    {liveResults.map(p => (
                      <div
                        key={p.id}
                        className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                        onClick={() => { onViewProduct?.(p); setIsMobileSearchOpen(false); }}
                      >
                        <div className="size-12 bg-slate-50 dark:bg-white rounded-lg p-1.5 flex-shrink-0">
                          <img src={p.image} className="w-full h-full object-contain" alt={p.title} />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate">{p.title}</p>
                          <p className="text-[10px] font-bold text-blue-600">{p.price.toLocaleString()} DH</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>


      {/* Mobile Menu - Premium Drawer */}
      <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-xs bg-white dark:bg-slate-950 shadow-2xl transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-6 border-b border-slate-50 dark:border-white/5">
            <h2 className="text-xl font-bold font-display uppercase tracking-tighter">Menu</h2>
            <button onClick={() => setIsMobileMenuOpen(false)} className="size-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center">
              <X className="size-5" />
            </button>
          </div>

          <div className="p-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => { onCategoryClick?.(item.name); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-left"
              >
                <span className="text-[12px] font-bold uppercase tracking-widest">{item.displayName}</span>
                <item.icon className="size-4 text-slate-400" />
              </button>
            ))}

            <div className="pt-6 mt-6 border-t border-slate-50 dark:border-white/5 space-y-4">
              <button onClick={() => { onTrackOrder(); setIsMobileMenuOpen(false); }} className="w-full text-left p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Suivre ma commande</button>
              <button onClick={() => { onContactClick(); setIsMobileMenuOpen(false); }} className="w-full text-left p-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Aide & Support</button>

              {isLoggedIn ? (
                <button onClick={() => dispatch(logout())} className="w-full flex items-center gap-3 p-4 text-rose-500 text-[10px] font-bold uppercase tracking-widest">
                  <LogOut className="size-4" />
                  Déconnexion
                </button>
              ) : (
                <button onClick={() => { dispatch(setView('LOGIN')); setIsMobileMenuOpen(false); }} className="w-full p-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-[10px] font-bold uppercase tracking-widest">Connexion / Inscription</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

