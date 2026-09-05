'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { WishlistProvider, useWishlist } from '@/context/WishlistContext';
import { FurnitureItem, FURNITURE_CATALOG } from '@/lib/furnitureData';

// Dedicated Standalone eCommerce Components
import EcommerceNavbar from '@/components/furniture/EcommerceNavbar';
import EcommerceHero from '@/components/furniture/EcommerceHero';
import CategoryTiles from '@/components/furniture/CategoryTiles';
import ProductSpotlight from '@/components/furniture/ProductSpotlight';
import TrustGuarantees from '@/components/furniture/TrustGuarantees';
import FurnitureCatalog from '@/components/furniture/FurnitureCatalog';
import ShopTheLook from '@/components/furniture/ShopTheLook';
import BespokeConsultationBanner from '@/components/furniture/BespokeConsultationBanner';
import EcommerceNewsletter from '@/components/furniture/EcommerceNewsletter';
import EcommerceFooter from '@/components/furniture/EcommerceFooter';

// Interactive Modals & Drawers
import ProductQuickViewModal from '@/components/furniture/ProductQuickViewModal';
import CartQuoteDrawer, { CartItem } from '@/components/furniture/CartQuoteDrawer';
import WishlistDrawer from '@/components/furniture/WishlistDrawer';
import BrandedSeparator from '@/components/ui/BrandedSeparator';

import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

function FurniturePageContent() {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';
  const { wishlistIds, setIsWishlistDrawerOpen } = useWishlist();

  // Navigation & Filter Synchronization
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Quick View State
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
    <div className="min-h-screen bg-[#08090C] text-white selection:bg-[#C9A86A]/30 selection:text-white flex flex-col justify-between">
      
      {/* 1. Dedicated Standalone eCommerce Header */}
      <EcommerceNavbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onSearch={(q) => setSearchQuery(q)}
      />

      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#C9A86A]/5 rounded-full blur-[160px]" />
        <div className="absolute top-2/3 right-1/4 w-[700px] h-[700px] bg-[#0B5C3D]/8 rounded-full blur-[180px]" />
      </div>

      {/* Main eCommerce Content Flow */}
      <main className="relative z-10 flex-grow space-y-16 sm:space-y-24 pb-20">
        
        {/* 2. World-Class Editorial Showroom Hero */}
        <EcommerceHero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          
          {/* 3. Shop By Space / Category Tiles */}
          <CategoryTiles
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />

          <BrandedSeparator />

          {/* 4. Signature Product Spotlight */}
          <ProductSpotlight
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onAddToCart={handleAddToCart}
          />

          <BrandedSeparator />

          {/* 5. The Value Pillars & Factory Advantage */}
          <TrustGuarantees />

          <BrandedSeparator />

          {/* 6. Interactive Filterable Product Catalog */}
          <section id="catalog" className="scroll-mt-28">
            <FurnitureCatalog
              controlledCategory={selectedCategory}
              onCategoryChange={(cat) => setSelectedCategory(cat)}
              controlledSearch={searchQuery}
              onQuickView={(prod) => setQuickViewProduct(prod)}
              onAddToCart={handleAddToCart}
            />
          </section>

          <BrandedSeparator />

          {/* 7. Interactive Shop The Look (Room Lookbook) */}
          <ShopTheLook
            onQuickView={(prod) => setQuickViewProduct(prod)}
            onAddToCart={handleAddToCart}
          />

          <BrandedSeparator />

          {/* 8. Bespoke B2B & Hospitality FF&E Consultation */}
          <BespokeConsultationBanner />

          <BrandedSeparator />

          {/* 9. Hospitality Endorsements & Client Provenance */}
          <section className="space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#C9A86A]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'شهادات كبار العملاء والمنشآت' : 'HOSPITALITY PROVENANCE'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {dict.furniture.testimonials.heading}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                {dict.furniture.testimonials.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 bg-[#0F1117]/70 hover:border-[#C9A86A]/40 transition-colors">
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
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white font-bold">{isAr ? 'فندق سويس بلو الفاخر' : 'SwissBlue Hotels & Suites'}</span>
                  <span className="text-[#C9A86A]">Jeddah & Riyadh</span>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 bg-[#0F1117]/70 hover:border-[#C9A86A]/40 transition-colors">
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
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white font-bold">{isAr ? 'مقر مجموعة استثمارية' : 'Corporate Investment HQ'}</span>
                  <span className="text-emerald-400">{isAr ? 'الرياض' : 'Riyadh'}</span>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 bg-[#0F1117]/70 hover:border-[#C9A86A]/40 transition-colors">
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
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white font-bold">{isAr ? 'فيلا سكنية خاصة' : 'Private Luxury Estate'}</span>
                  <span className="text-amber-400">{isAr ? 'نجران' : 'Najran'}</span>
                </div>
              </div>
            </div>
          </section>

          <BrandedSeparator />

          {/* 10. Material Swatch Box & VIP Atelier Newsletter */}
          <EcommerceNewsletter />

        </div>

      </main>

      {/* 11. Dedicated Standalone eCommerce Footer */}
      <EcommerceFooter />

      {/* Floating Action Controls (Wishlist & Cart Drawers) */}
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

      {/* Modals & Drawers */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <WishlistDrawer
        onAddToCart={handleAddToCart}
      />

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
