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
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    bedroom: isAr ? 'النوم' : 'Bedrooms',
    dining: isAr ? 'الطعام' : 'Dining',
    joinery: isAr ? 'التجاليد' : 'Joinery',
    b2b: isAr ? 'المشاريع' : 'Projects',
    lookbook: isAr ? 'المساحات' : 'Spaces',
    track_order: isAr ? 'تتبع' : 'Track',
    search_label: isAr ? 'ابحث في قطع الأثاث...' : 'Search furniture pieces...',
    cart: isAr ? 'السلة' : 'Cart',
    wishlist: isAr ? 'المفضلة' : 'Wishlist',
  };

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  interface NavDropdownItem {
    label: string;
    desc: string;
    actionType: 'category' | 'anchor';
    value: string;
    badge?: string;
  }

  interface NavSection {
    id: string;
    label: string;
    actionType: 'category' | 'anchor';
    value: string;
    items: NavDropdownItem[];
  }

  const navSections: NavSection[] = [
    {
      id: 'collections',
      label: ecomDict.collections,
      actionType: 'category',
      value: 'all',
      items: [
        {
          label: isAr ? 'جميع القطع والتصاميم' : 'All Curated Pieces',
          desc: isAr ? 'استعراض الكتالوج الكامل بمصنعنا' : 'Explore full factory collection',
          actionType: 'category',
          value: 'all',
        },
        {
          label: isAr ? 'أيقونات التصميم المعماري' : 'Signature Masterpieces',
          desc: isAr ? 'القطع الحصرية الأكثر تميزاً' : 'Iconic limited atelier designs',
          actionType: 'anchor',
          value: '#spotlight',
          badge: isAr ? 'مميز' : 'Signature',
        },
        {
          label: isAr ? 'معايير التصنيع الفندقي' : 'Hospitality Standards',
          desc: isAr ? 'أخشاب الجوز والأحجار الطبيعية' : 'American walnut & natural stone',
          actionType: 'anchor',
          value: '#craft',
        },
      ],
    },
    {
      id: 'living',
      label: ecomDict.living,
      actionType: 'category',
      value: 'living',
      items: [
        {
          label: isAr ? 'الصالونات والأرائك المنحنية' : 'Curved & Modular Sofas',
          desc: isAr ? 'أريكة الدرعية وجلسات البوكليه' : 'Al-Diriyah & luxury bouclé lounges',
          actionType: 'category',
          value: 'living',
        },
        {
          label: isAr ? 'كراسي مفردة نحتية' : 'Sculptural Armchairs',
          desc: isAr ? 'كرسي العلا بجلود إيطالية طبيعية' : 'Al-Ula Italian leather seating',
          actionType: 'category',
          value: 'living',
        },
        {
          label: isAr ? 'طاولات وسط وضيافة' : 'Coffee & Accent Tables',
          desc: isAr ? 'رخام الترافرتين وخشب الجوز' : 'Najran travertine & walnut tables',
          actionType: 'category',
          value: 'living',
        },
      ],
    },
    {
      id: 'bedroom',
      label: ecomDict.bedroom,
      actionType: 'category',
      value: 'bedroom',
      items: [
        {
          label: isAr ? 'أسرّة ماستر فندقية' : 'Master Hotel Beds',
          desc: isAr ? 'سرير الحمراء والهياكل الصلبة' : 'Solid beechwood bespoke bedframes',
          actionType: 'category',
          value: 'bedroom',
        },
        {
          label: isAr ? 'كمودينات وتخزين جانبي' : 'Nightstands & Side Tables',
          desc: isAr ? 'تفاصيل خشبية مخددة وأسطح رخامية' : 'Fluted joinery & stone surfaces',
          actionType: 'category',
          value: 'bedroom',
        },
        {
          label: isAr ? 'مقاعد أجنحة وبوفيه' : 'Suite Benches & Seating',
          desc: isAr ? 'تنجيد يدوي متقن بميموري فوم' : 'Hand-tufted memory foam suites',
          actionType: 'category',
          value: 'bedroom',
        },
      ],
    },
    {
      id: 'dining',
      label: ecomDict.dining,
      actionType: 'category',
      value: 'dining',
      items: [
        {
          label: isAr ? 'طاولات طعام ملكية' : 'Grand Dining Tables',
          desc: isAr ? 'طاولة نجد وقواعد الحجر الطبيعي' : 'Solid walnut & natural stone tops',
          actionType: 'category',
          value: 'dining',
        },
        {
          label: isAr ? 'كراسي طعام حرفية' : 'Artisan Dining Chairs',
          desc: isAr ? 'راحة مريحة للولائم والاجتماعات' : 'Ergonomic hospitality comfort',
          actionType: 'category',
          value: 'dining',
        },
        {
          label: isAr ? 'مكاتب تنفيذية للمنزل' : 'Executive Home Desks',
          desc: isAr ? 'تصاميم معمارية بمسارات كابلات ذكية' : 'Architectural study work desks',
          actionType: 'category',
          value: 'dining',
        },
      ],
    },
    {
      id: 'joinery',
      label: ecomDict.joinery,
      actionType: 'category',
      value: 'joinery',
      items: [
        {
          label: isAr ? 'تجاليد حوائط مخددة CNC' : '5-Axis Fluted Wall Panels',
          desc: isAr ? 'تكسيات جدارية عازلة وعصرية' : 'Acoustic architectural cladding',
          actionType: 'category',
          value: 'joinery',
        },
        {
          label: isAr ? 'خزائن ملابس مدمجة' : 'Bespoke Built-in Closets',
          desc: isAr ? 'إضاءة LED مخفية وأدراج ذكية' : 'Integrated LED & glass millwork',
          actionType: 'category',
          value: 'joinery',
        },
        {
          label: isAr ? 'قواطع وفواصل معمارية' : 'Architectural Partitions',
          desc: isAr ? 'فواصل خشبية ومعدنية مخصصة' : 'Custom decorative room dividers',
          actionType: 'category',
          value: 'joinery',
        },
      ],
    },
    {
      id: 'lookbook',
      label: ecomDict.lookbook,
      actionType: 'anchor',
      value: '#lookbook',
      items: [
        {
          label: isAr ? 'صالات كبار الشخصيات' : 'VIP Living Spaces',
          desc: isAr ? 'إلهام تأثيث الفلل والقصور' : 'Penthouse & villa inspiration',
          actionType: 'anchor',
          value: '#lookbook',
        },
        {
          label: isAr ? 'أجنحة فندقية ملكية' : 'Royal Hospitality Suites',
          desc: isAr ? 'مشاريع سويس بلو وفنادق 5 نجوم' : 'SwissBlue & luxury hotel suites',
          actionType: 'anchor',
          value: '#lookbook',
        },
        {
          label: isAr ? 'مجالس ضيافة سعودية' : 'Heritage Modern Majlis',
          desc: isAr ? 'أصالة نجدية بروح عصرية متقدمة' : 'Contemporary Saudi hospitality',
          actionType: 'anchor',
          value: '#lookbook',
        },
      ],
    },
    {
      id: 'b2b',
      label: ecomDict.b2b,
      actionType: 'anchor',
      value: '#bespoke-b2b',
      items: [
        {
          label: isAr ? 'توريد وتأثيث فندقي FF&E' : 'Hospitality FF&E Fitout',
          desc: isAr ? 'تصنيع معتمد وتوريد شامل للمشاريع' : 'Turnkey hotel procurement',
          actionType: 'anchor',
          value: '#bespoke-b2b',
          badge: 'B2B',
        },
        {
          label: isAr ? 'تأثيث مقرات الشركات' : 'Corporate & HQ Fitout',
          desc: isAr ? 'قاعات اجتماعات ومكاتب تنفيذية' : 'Executive offices & boardrooms',
          actionType: 'anchor',
          value: '#bespoke-b2b',
        },
        {
          label: isAr ? 'طلب دراسة وتسعير B2B' : 'Request Commercial Quote',
          desc: isAr ? 'استشارات مباشرة مع مهندسي المصنع' : 'Direct factory contract pricing',
          actionType: 'anchor',
          value: '#bespoke-b2b',
        },
      ],
    },
  ];

  const handleSectionClick = (sec: NavSection) => {
    setActiveDropdown(null);
    if (sec.actionType === 'category') {
      handleNavCategoryClick(sec.value);
    } else if (sec.actionType === 'anchor') {
      const el = document.querySelector(sec.value);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubItemClick = (sub: NavDropdownItem) => {
    setActiveDropdown(null);
    if (sub.actionType === 'category') {
      handleNavCategoryClick(sub.value);
    } else if (sub.actionType === 'anchor') {
      const el = document.querySelector(sub.value);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
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

            {/* Desktop 1-Word Department Links with Luxury Dropdown Flyout */}
            <nav className="hidden xl:flex items-center gap-1 px-3 py-1 rounded-full bg-[#12151F]/90 border border-white/10 backdrop-blur-xl relative">
              {navSections.map((sec) => {
                const isOpen = activeDropdown === sec.id;
                const isB2B = sec.id === 'b2b';
                return (
                  <div
                    key={sec.id}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(sec.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() => handleSectionClick(sec)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 group ${
                        isB2B
                          ? 'text-[#C9A86A] font-bold hover:bg-[#C9A86A]/15'
                          : isOpen
                          ? 'text-white bg-white/10 shadow-sm'
                          : 'text-zinc-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{sec.label}</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#C9A86A]' : 'text-zinc-500 group-hover:text-zinc-300'
                        }`}
                      />
                    </button>

                    {/* Luxury Frosted Dropdown Menu */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.96 }}
                          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 rtl:left-auto rtl:right-1/2 rtl:translate-x-1/2 w-72 p-2 rounded-2xl bg-[#0A0C13]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-[#C9A86A]/25 z-50 before:absolute before:-top-3 before:inset-x-0 before:h-3"
                        >
                          <div className="space-y-1">
                            {sec.items.map((sub, sIdx) => (
                              <button
                                key={sIdx}
                                type="button"
                                onClick={() => handleSubItemClick(sub)}
                                className="w-full p-2.5 rounded-xl hover:bg-white/5 transition-all text-left rtl:text-right group/item cursor-pointer flex items-start justify-between gap-2"
                              >
                                <div>
                                  <div className="text-xs font-bold text-zinc-200 group-hover/item:text-[#C9A86A] transition-colors flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]/40 group-hover/item:bg-[#C9A86A] transition-colors" />
                                    <span>{sub.label}</span>
                                  </div>
                                  <p className="text-[10px] text-zinc-400 mt-0.5 leading-tight">
                                    {sub.desc}
                                  </p>
                                </div>
                                {sub.badge && (
                                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#C9A86A]/20 text-[#C9A86A] border border-[#C9A86A]/30 shrink-0">
                                    {sub.badge}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
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
          <div className="xl:hidden bg-[#0C0E14]/98 backdrop-blur-2xl border-t border-white/10 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200 max-h-[82vh] overflow-y-auto">
            <div className="space-y-2">
              {navSections.map((sec) => (
                <div key={sec.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <button
                    type="button"
                    onClick={() => {
                      handleSectionClick(sec);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left rtl:text-right flex items-center justify-between text-xs font-bold text-white hover:text-[#C9A86A] transition-colors py-1"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
                      <span>{sec.label}</span>
                    </span>
                    <ArrowRight className="w-3 h-3 text-zinc-500 rtl:rotate-180" />
                  </button>
                  <div className="mt-1 pt-1 border-t border-white/5 space-y-1">
                    {sec.items.map((sub, sIdx) => (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => {
                          handleSubItemClick(sub);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left rtl:text-right py-1 px-2 rounded-lg text-[11px] text-zinc-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between"
                      >
                        <span>{sub.label}</span>
                        {sub.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#C9A86A]/20 text-[#C9A86A]">
                            {sub.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
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
