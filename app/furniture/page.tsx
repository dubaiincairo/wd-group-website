'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { FurnitureItem, FURNITURE_CATALOG } from '@/lib/furnitureData';
import FurnitureCatalog from '@/components/furniture/FurnitureCatalog';
import ProductQuickViewModal from '@/components/furniture/ProductQuickViewModal';
import CartQuoteDrawer, { CartItem } from '@/components/furniture/CartQuoteDrawer';
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
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export default function FurniturePage() {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';

  const [quickViewProduct, setQuickViewProduct] = useState<FurnitureItem | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
        (i) => !(i.product.id === productId && i.selectedFinishId === selectedFinishId)
      )
    );
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative selection:bg-[#C9A86A] selection:text-[#08090C]">
      
      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/5 blur-[160px] pointer-events-none" />
      <div className="absolute top-96 right-10 w-[450px] h-[450px] bg-[#C9A86A]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-emerald-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* 1. Showroom Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto space-y-6 pt-4 sm:pt-6"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#C9A86A]/15 border border-[#C9A86A]/40 text-[#C9A86A] shadow-[0_0_20px_rgba(201,168,106,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.furniture.hero.eyebrow}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {dict.furniture.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-2xl mx-auto">
            {dict.furniture.hero.subtitle}
          </p>

          {/* Slogan pill */}
          <div className="text-xs sm:text-sm font-mono text-[#E3C58A] bg-[#C9A86A]/10 inline-block px-5 py-2.5 rounded-2xl border border-[#C9A86A]/25 shadow-sm">
            &ldquo;{dict.furniture.hero.slogan}&rdquo;
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
              onClick={() => setCartDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-zinc-200 bg-[#141721] hover:bg-[#1A1E2C] border border-white/10 hover:border-[#C9A86A]/40 transition-all cursor-pointer"
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
                {isAr ? 'تركيب فندقي متخصص' : 'White-Glove Service'}
              </span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/5 bg-[#0F1117]/80 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {dict.furniture.hero.stats.custom}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {isAr ? 'حسب طلب المشروع' : 'Tailored to Spec'}
              </span>
            </div>
          </div>
        </motion.section>

        {/* Separator */}
        <BrandedSeparator variant="gold" />

        {/* 3. Main Interactive Furniture Catalog */}
        <section>
          <FurnitureCatalog
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* Separator */}
        <BrandedSeparator variant="emerald" />

        {/* 4. Bespoke B2B Project & Hotel FF&E Procurement Banner */}
        <section>
          <BespokeConsultationBanner />
        </section>

        {/* 5. Hospitality & Residential Client Testimonials */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono font-bold text-[#C9A86A] uppercase tracking-wider">
              {dict.furniture.testimonials.heading}
            </div>
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
                  ? 'تم تأثيث أجنحة سويس بلو بالكامل من مصانع جرين وود. دقة الأبعاد وجودة التجاليد الخشبية وتكامل الإضاءة المدمجة جعلت التجربة الفندقية استثنائية لضيوفنا.'
                  : 'Furnished SwissBlue hotel suites entirely through GreenWood factories. Precision woodwork, integrated LED joinery, and durable finishes delivered an unforgettable guest experience.'}&rdquo;
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-white font-bold">{isAr ? 'فنادق ومنتجعات سويس بلو' : 'SwissBlue Hotels & Resorts'}</span>
                <span className="text-[#C9A86A]">{isAr ? 'جدة والرياض' : 'Jeddah & Riyadh'}</span>
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

      {/* Floating Cart Button (Bottom Right/Left) */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCartDrawerOpen(true)}
        className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 p-4 rounded-2xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] shadow-[0_0_30px_rgba(201,168,106,0.6)] border border-[#E3C58A] flex items-center gap-3 cursor-pointer group"
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

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
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
