'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useWishlist } from '@/context/WishlistContext';
import { 
  ShoppingBag, 
  Heart, 
  Activity, 
  Globe, 
  Menu, 
  X, 
  Search, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface EcommerceNavbarProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onSelectCategory?: (cat: string) => void;
  onSearch?: (query: string) => void;
}

export default function EcommerceNavbar({
  cartCount = 0,
  onOpenCart,
  onSelectCategory,
  onSearch,
}: EcommerceNavbarProps) {
  const pathname = usePathname();
  const { lang, toggleLanguage, dict } = useLanguage();
  const isAr = lang === 'ar';
  const { wishlistIds, setIsWishlistDrawerOpen } = useWishlist();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchInput);
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavCategoryClick = (catId: string) => {
    setMobileMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ecomDict = (dict.furniture as any)?.ecom_nav || {
    announcement: isAr 
      ? 'توصيل وتركيب فندقي مجاني للطلبات فوق 10,000 ر.س في جميع أنحاء المملكة • تصنيع مباشر من المصنع'
      : 'Free White-Glove Staging & Delivery Across KSA on Orders Over 10,000 SAR • Direct Factory Authority',
    back_to_holding: isAr ? 'مجموعة دبليو دي القابضة' : 'WD Group Holding',
    store_brand: isAr ? 'جرين وود للأثاث' : 'GreenWood Living',
    store_sub: isAr ? 'أتيليه الأثاث الفاخر والتجهيزات' : 'Luxury Furniture Atelier & FF&E',
    collections: isAr ? 'المجموعات' : 'Collections',
    living: isAr ? 'الصالونات' : 'Living',
    bedroom: isAr ? 'أجنحة النوم' : 'Bedroom',
    dining: isAr ? 'طاولات الطعام' : 'Dining',
    joinery: isAr ? 'التجاليد المعمارية' : 'Joinery',
    b2b: isAr ? 'مشروعات الفنادق B2B' : 'B2B & Hospitality',
    lookbook: isAr ? 'كتالوج المساحات' : 'Room Inspiration',
    track_order: isAr ? 'تتبع طلبك' : 'Track Order',
    search_label: isAr ? 'ابحث في قطع الأثاث...' : 'Search furniture pieces...',
    cart: isAr ? 'السلة' : 'Cart',
    wishlist: isAr ? 'المفضلة' : 'Wishlist',
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      
      {/* 1. High-Conversion Announcement Top Ribbon */}
      <div className="bg-gradient-to-r from-[#0C0E14] via-[#161B26] to-[#0C0E14] border-b border-white/10 text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Link back to WD Group Holding */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hover:text-[#C9A86A] transition-colors shrink-0 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] group-hover:scale-125 transition-transform" />
            <span>{ecomDict.back_to_holding}</span>
            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Announcement Ticker Message */}
          <div className="hidden md:flex items-center gap-2 text-[11px] text-zinc-300 font-medium truncate">
            <Sparkles className="w-3 h-3 text-[#C9A86A] shrink-0" />
            <span className="truncate">{ecomDict.announcement}</span>
          </div>

          {/* Right Utility: Track Order & Language Switcher */}
          <div className="flex items-center gap-4 text-[11px] font-mono shrink-0">
            <Link 
              href="/furniture/track" 
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Activity className="w-3 h-3 animate-pulse" />
              <span>{ecomDict.track_order}</span>
            </Link>

            <span className="text-white/20">|</span>

            <button 
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title={isAr ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-3 h-3 text-[#C9A86A]" />
              <span>{dict.nav.lang_toggle}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Main Dedicated E-Commerce Navigation */}
      <div 
        className={`transition-all duration-300 ${
          scrolled 
            ? 'bg-[#08090C]/95 backdrop-blur-2xl py-3 border-b border-white/10 shadow-2xl' 
            : 'bg-[#08090C]/80 backdrop-blur-md py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Store Brand Identity */}
            <Link href="/furniture" className="flex items-center gap-3 group shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/30 flex items-center justify-center text-[#C9A86A] group-hover:bg-[#C9A86A]/20 transition-all shadow-[0_0_20px_rgba(201,168,106,0.15)]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-[#C9A86A] transition-colors">
                    {ecomDict.store_brand}
                  </span>
                  <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#C9A86A]/15 text-[#C9A86A] border border-[#C9A86A]/30 hidden sm:inline-block">
                    FF&E
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 block -mt-0.5 font-medium">
                  {ecomDict.store_sub}
                </span>
              </div>
            </Link>

            {/* Desktop Department Links */}
            <nav className="hidden xl:flex items-center gap-1 px-4 py-1 rounded-full bg-[#12151F]/80 border border-white/10 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => handleNavCategoryClick('all')}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {ecomDict.collections}
              </button>
              <button
                type="button"
                onClick={() => handleNavCategoryClick('living')}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {ecomDict.living}
              </button>
              <button
                type="button"
                onClick={() => handleNavCategoryClick('bedroom')}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {ecomDict.bedroom}
              </button>
              <button
                type="button"
                onClick={() => handleNavCategoryClick('dining')}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {ecomDict.dining}
              </button>
              <button
                type="button"
                onClick={() => handleNavCategoryClick('joinery')}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {ecomDict.joinery}
              </button>
              <a
                href="#lookbook"
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
              >
                {ecomDict.lookbook}
              </a>
              <a
                href="#bespoke-b2b"
                className="px-3 py-1.5 rounded-full text-xs font-bold text-[#C9A86A] hover:bg-[#C9A86A]/10 transition-all"
              >
                {ecomDict.b2b}
              </a>
            </nav>

            {/* Right Action Icons: Search, Wishlist, Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Quick Search Input / Toggle */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder={ecomDict.search_label}
                      autoFocus
                      className="w-40 sm:w-56 h-9 px-3 text-xs bg-[#141824] border border-[#C9A86A]/40 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#C9A86A]"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="p-2 text-zinc-400 hover:text-white rounded-lg cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="p-2.5 rounded-xl bg-[#12151F] hover:bg-[#1A1F2E] border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                    title={ecomDict.search_label}
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Wishlist Pill */}
              <button
                type="button"
                onClick={() => setIsWishlistDrawerOpen(true)}
                className="p-2.5 sm:px-3 sm:py-2 rounded-xl bg-[#12151F] hover:bg-[#1A1F2E] border border-white/10 hover:border-rose-500/30 text-zinc-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer relative"
                title={ecomDict.wishlist}
              >
                <Heart className={`w-4 h-4 ${wishlistIds.length > 0 ? 'text-rose-400 fill-rose-400' : 'text-zinc-400'}`} />
                <span className="text-xs font-bold hidden md:inline">{ecomDict.wishlist}</span>
                {wishlistIds.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold font-mono flex items-center justify-center">
                    {wishlistIds.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag / Cart Pill */}
              <button
                type="button"
                onClick={onOpenCart}
                className="h-10 px-3.5 sm:px-4 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] font-extrabold text-xs flex items-center gap-2.5 shadow-[0_0_20px_rgba(201,168,106,0.35)] hover:shadow-[0_0_28px_rgba(201,168,106,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#08090C]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 rtl:-right-auto rtl:-left-2 bg-emerald-600 text-white text-[9px] font-mono font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">{ecomDict.cart}</span>
                {cartCount > 0 && (
                  <span className="text-[11px] font-mono font-black bg-[#08090C]/15 px-1.5 py-0.5 rounded">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2.5 rounded-xl bg-[#12151F] border border-white/10 text-zinc-300 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Slide-Out Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0C0E14] border-t border-white/10 px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
              <button
                type="button"
                onClick={() => handleNavCategoryClick('all')}
                className="p-2.5 rounded-lg bg-white/5 text-left rtl:text-right text-xs font-semibold text-zinc-200 hover:bg-[#C9A86A]/15 hover:text-[#C9A86A]"
              >
                {ecomDict.collections}
              </button>
              <button
                type="button"
                onClick={() => handleNavCategoryClick('living')}
                className="p-2.5 rounded-lg bg-white/5 text-left rtl:text-right text-xs font-semibold text-zinc-200 hover:bg-[#C9A86A]/15 hover:text-[#C9A86A]"
              >
                {ecomDict.living}
              </button>
              <button
                type="button"
                onClick={() => handleNavCategoryClick('bedroom')}
                className="p-2.5 rounded-lg bg-white/5 text-left rtl:text-right text-xs font-semibold text-zinc-200 hover:bg-[#C9A86A]/15 hover:text-[#C9A86A]"
              >
                {ecomDict.bedroom}
              </button>
              <button
                type="button"
                onClick={() => handleNavCategoryClick('dining')}
                className="p-2.5 rounded-lg bg-white/5 text-left rtl:text-right text-xs font-semibold text-zinc-200 hover:bg-[#C9A86A]/15 hover:text-[#C9A86A]"
              >
                {ecomDict.dining}
              </button>
              <button
                type="button"
                onClick={() => handleNavCategoryClick('joinery')}
                className="p-2.5 rounded-lg bg-white/5 text-left rtl:text-right text-xs font-semibold text-zinc-200 hover:bg-[#C9A86A]/15 hover:text-[#C9A86A]"
              >
                {ecomDict.joinery}
              </button>
              <a
                href="#lookbook"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-white/5 text-left rtl:text-right text-xs font-semibold text-zinc-200 hover:bg-[#C9A86A]/15 hover:text-[#C9A86A]"
              >
                {ecomDict.lookbook}
              </a>
            </div>

            <div className="flex items-center justify-between pt-1">
              <a
                href="#bespoke-b2b"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-[#C9A86A] flex items-center gap-1"
              >
                <span>{ecomDict.b2b}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </a>

              <Link
                href="/furniture/track"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono text-emerald-400 flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>{ecomDict.track_order}</span>
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
