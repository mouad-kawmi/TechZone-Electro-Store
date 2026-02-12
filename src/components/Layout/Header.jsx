import React, { useState, useEffect } from 'react';
import { Smartphone, Laptop, Tablet, Headphones, Search, Menu } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory, setView, setSearchQuery } from '../../store';

// Sous-composants
import TopBar from './Parts/TopBar';
import SearchSystem from './Parts/SearchSystem';
import HeaderActions from './Parts/HeaderActions';
import MobileMenu from './Parts/MobileMenu';

const Header = (props) => {
  const dispatch = useDispatch();
  const {
    cartCount, wishlistCount, onCartClick,
    onWishlistClick, onHomeClick, onContactClick, onCategoryClick,
    onSearch, onViewProduct, onTrackOrder, searchQuery,
    allProducts = [], onSearchSubmit
  } = props;

  const ui = useSelector((state) => state.ui);
  const auth = useSelector((state) => state.auth);
  const dark = ui.isDarkMode;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const items = [
    { name: 'Smartphones', label: 'Phones', icon: Smartphone },
    { name: 'Laptops', label: 'Laptops', icon: Laptop },
    { name: 'Tablets', label: 'Tablettes', icon: Tablet },
    { name: 'Audio', label: 'Audio', icon: Headphones }
  ];

  return (
    <div className="fixed top-0 z-[100] w-full">
      <TopBar onTrackOrder={onTrackOrder} onContactClick={onContactClick} />

      <header className={`transition-all duration-500 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 ${scrolled ? 'py-3 shadow-md' : 'py-4 md:py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between relative">

          <div className="flex items-center gap-12">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={onHomeClick}>
              <div className="size-10 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl flex items-center justify-center font-bold font-display text-sm tracking-tighter shadow-lg group-hover:bg-blue-600 transition-all">TZ</div>
              <h2 className="text-slate-950 dark:text-white text-xl font-bold uppercase tracking-tighter font-display hidden sm:block">TechZone</h2>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {items.map((it) => (
                <button
                  key={it.name}
                  onClick={() => {
                    dispatch(setActiveCategory(it.name));
                    dispatch(setView('CATEGORY'));
                    dispatch(setSearchQuery(''));
                    window.scrollTo(0, 0);
                  }}
                  className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[10px] font-bold hover:text-slate-950 dark:hover:text-white transition-colors uppercase tracking-widest"
                >
                  {it.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <SearchSystem
              searchQuery={searchQuery}
              onSearch={onSearch}
              onSearchSubmit={onSearchSubmit}
              allProducts={allProducts}
              onViewProduct={onViewProduct}
            />

            <HeaderActions
              searchOpen={searchOpen}
              setSearchOpen={setSearchOpen}
              dark={dark}
              wishlistCount={wishlistCount}
              onWishlistClick={onWishlistClick}
              auth={auth}
              onCartClick={onCartClick}
              cartCount={cartCount}
              setMenuOpen={setMenuOpen}
            />
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {searchOpen && (
          <div className="md:hidden px-6 pt-4 pb-2 animate-fade-down">
            <div className="relative">
              <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-xl px-4 py-2.5 border border-blue-500/20">
                <Search className="size-4 text-slate-400 mr-3" />
                <input
                  type="text" autoFocus
                  className="bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 p-0 text-[12px] font-medium w-full"
                  placeholder="Que cherchez-vous ?"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit?.(searchQuery)}
                />
              </div>
            </div>
          </div>
        )}
      </header>

      <MobileMenu
        menuOpen={menuOpen} setMenuOpen={setMenuOpen}
        items={items} onCategoryClick={onCategoryClick}
        onWishlistClick={onWishlistClick} wishlistCount={wishlistCount}
        onCartClick={onCartClick} cartCount={cartCount}
        onTrackOrder={onTrackOrder} onContactClick={onContactClick}
        auth={auth}
      />
    </div>
  );
};

export default Header;

