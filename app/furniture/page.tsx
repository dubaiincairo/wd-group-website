'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { WishlistProvider, useWishlist } from '@/context/WishlistContext';
import { FurnitureItem, FURNITURE_CATALOG } from '@/lib/furnitureData';
import FurnitureCatalog from '@/components/furniture/FurnitureCatalog';
import ProductQuickViewModal from '@/components/furniture/ProductQuickViewModal';
import CartQuoteDrawer, { CartItem } from '@/components/furniture/CartQuoteDrawer';
import WishlistDrawer from '@/components/furniture/WishlistDrawer';
import BespokeConsultationBanner from '@/components/furniture/BespokeConsultationBanner';
import BrandedSeparator from '@/components/ui/BrandedSeparator';
import { 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Factory, 
  Truck, 
  Award, 
  ArrowRight, 
  Star, 
  Building2,
  Heart,
  Activity,
  CheckCircle2
} from 'lucide-react';

function FurniturePageContent() {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';
  const { wishlistIds, setIsWishlistDrawerOpen } = useWishlist();

  const [quickViewProduct, setQuickViewProduct] = useState<FurnitureItem | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Sync cart with localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wd_furniture_cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('wd_furniture_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const handleAddToCart = (product: FurnitureItem, selectedFinish: string, quantity: number) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedFinishId === selectedFinish
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedFinishId: selectedFinish, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, selectedFinishId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedFinishId === selectedFinishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, selectedFinishId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedFinishId === selectedFinishId)
      )
    );
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#08090C] text-white pt-24 pb-20 selection:bg-[#C9A86A]/30">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#C9A86A]/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#0B5C3D]/8 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* 1. Showroom Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto space-y-6 pt-6 sm:pt-10"
        >
          {/* Eyebrow Tag + Live Tracker Link */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono font-medium backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{dict.furniture.hero.eyebrow}</span>
            </div>

            <Link
              href="/furniture/track"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono transition-all"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>{isAr ? 'تتبع طلب نشط بالمصنع' : 'Track Active Order'}</span>
            </Link>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-tight">
            {dict.furniture.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal">
            {dict.furniture.hero.subtitle}
          </p>

          {/* Slogan */}
          <div className="pt-1">
            <span className="text-xs sm:text-sm font-mono text-[#C9A86A] font-semibold tracking-wide uppercase px-4 py-1.5 rounded-lg bg-white/5 border border-white/10">
              {dict.furniture.hero.slogan}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_30px_rgba(201,168,106,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg"
            >
              <span>{dict.furniture.hero.cta_catalog}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>

            <button
              onClick={() => setIsWishlistDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-zinc-200 bg-[#141721] hover:bg-[#1A1E2C] border border-white/10 hover:border-rose-500/40 transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>{dict.furniture.wishlist.title}</span>
              {wishlistIds.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold font-mono">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-zinc-200 bg-[#141721] hover:bg-[#1A1E2C] border border-white/10 hover:border-[#C9A86A]/40 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#C9A86A]" />
              <span>{dict.furniture.cart.title}</span>
              {totalCartCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#C9A86A] text-[#08090C] text-[10px] font-extrabold font-mono">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </motion.section>

        {/* 2. Value Pillars Strip (4 Key Guarantees) */}
        <motion.section 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4"
        >
          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/5 bg-[#0F1117]/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {dict.furniture.hero.stats.factory_direct}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {isAr ? 'الرياض ونجران' : '3 KSA Factories'}
              </span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/5 bg-[#0F1117]/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/25 flex items-center justify-center text-[#C9A86A] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {dict.furniture.hero.stats.warranty}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {isAr ? 'ضمان شامل ومباشر' : 'Full Structural'}
              </span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/5 bg-[#0F1117]/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {dict.furniture.hero.stats.delivery}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {isAr ? 'توصيل وتركيب فندقي' : 'White-Glove Service'}
              </span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/5 bg-[#0F1117]/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {dict.furniture.hero.stats.custom}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {isAr ? 'تفصيل مقاسات وأقمشة' : 'Bespoke Sizing'}
              </span>
            </div>
          </div>
        </motion.section>

        <BrandedSeparator />

        {/* 3. Main Catalog Section */}
        <section id="catalog" className="scroll-mt-28">
          <FurnitureCatalog
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onAddToCart={handleAddToCart}
          />
        </section>

        <BrandedSeparator />

        {/* 4. Bespoke B2B Project Procurement Banner */}
        <BespokeConsultationBanner />

        {/* 5. Hospitality & Client Endorsements */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.furniture.testimonials.heading}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              {dict.furniture.testimonials.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 bg-[#0F1117]/70">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                &ldquo;{isAr 
                  ? 'تم تأثيث أجنحتنا الرئاسية بالكامل من سرير سويس بلو والكمودينات المدمجة ببراعة لا متناهية. دقة تشطيب الخشب والنحاس فاقت التوقعات.'
                  : 'Furnished our presidential suites with the SwissBlue signature bed and joinery. Craftsmanship and invisible Qi charging exceeded all 5-star hotel benchmarks.'}&rdquo;
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-white font-bold">{isAr ? 'فندق سويس بلو الفاخر' : 'SwissBlue Hotels & Suites'}</span>
                <span className="text-[#C9A86A]">Jeddah & Riyadh</span>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 bg-[#0F1117]/70">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                &ldquo;{isAr 
                  ? 'طاولة اجتماعات طويق المنفذة لمقرنا التنفيذي تحفة معمارية حقيقية. تنظيم الكابلات الذكي والشواحن المدمجة مع الخشب الطبيعي أضافت هيبة وفخامة لغرفة الاجتماعات.'
                  : 'The Tuwaiq boardroom table for our executive HQ is a masterwork. Seamless motorized connectivity and solid walnut craftsmanship elevated our boardroom presence.'}&rdquo;
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-white font-bold">{isAr ? 'مقر مجموعة استثمارية' : 'Corporate Investment HQ'}</span>
                <span className="text-emerald-400">{isAr ? 'الرياض' : 'Riyadh'}</span>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 bg-[#0F1117]/70">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                &ldquo;{isAr 
                  ? 'أريكة الدرعية المنحنية مع طاولة الترافرتين كانت إضافة مذهلة لمجلس فيلتنا. التوصيل والتركيب في نجران كان فائق الاحترافية وسريعاً.'
                  : 'The curved Al-Diriyah sofa and travertine table transformed our private villa salon. White-glove installation and attention to detail were world-class.'}&rdquo;
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-white font-bold">{isAr ? 'فيلا سكنية خاصة' : 'Private Luxury Estate'}</span>
                <span className="text-amber-400">{isAr ? 'نجران' : 'Najran'}</span>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Floating Action Controls (Bottom Right/Left) */}
      <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 flex flex-col gap-3 items-end rtl:items-start">
        {/* Wishlist Pill */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsWishlistDrawerOpen(true)}
          className="p-3.5 rounded-2xl bg-[#141721]/95 text-white backdrop-blur-xl shadow-xl border border-white/15 hover:border-rose-500/50 flex items-center gap-2 cursor-pointer group"
          aria-label={dict.furniture.wishlist.title}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${wishlistIds.length > 0 ? 'text-rose-400 fill-rose-400' : 'text-zinc-300'}`} />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-2.5 -right-2.5 rtl:-right-auto rtl:-left-2.5 bg-rose-500 text-white text-[9px] font-mono font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {wishlistIds.length}
              </span>
            )}
          </div>
          <span className="text-xs font-bold hidden sm:inline text-zinc-200">
            {dict.furniture.wishlist.title}
          </span>
        </motion.button>

        {/* Cart Pill */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCartDrawerOpen(true)}
          className="p-4 rounded-2xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] shadow-[0_0_30px_rgba(201,168,106,0.6)] border border-[#E3C58A] flex items-center gap-3 cursor-pointer group"
          aria-label={dict.furniture.cart.title}
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            {totalCartCount > 0 && (
              <span className="absolute -top-2 -right-2 rtl:-right-auto rtl:-left-2 bg-emerald-600 text-white text-[10px] font-mono font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-[#08090C]">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-xs font-extrabold hidden sm:inline">
            {dict.furniture.cart.title}
          </span>
        </motion.button>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Quote Drawer */}
      <CartQuoteDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

    </div>
  );
}

export default function FurniturePage() {
  return (
    <WishlistProvider>
      <FurniturePageContent />
    </WishlistProvider>
  );
}
