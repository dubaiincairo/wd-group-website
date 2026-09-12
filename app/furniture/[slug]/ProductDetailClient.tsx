'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { WishlistProvider, useWishlist } from '@/context/WishlistContext';
import { FurnitureItem } from '@/lib/furnitureData';
import EcommerceNavbar from '@/components/furniture/EcommerceNavbar';
import CartQuoteDrawer, { CartItem } from '@/components/furniture/CartQuoteDrawer';
import WishlistDrawer from '@/components/furniture/WishlistDrawer';
import TrustGuarantees from '@/components/furniture/TrustGuarantees';
import EcommerceFooter from '@/components/furniture/EcommerceFooter';
import BnplInstallmentWidget from '@/components/furniture/BnplInstallmentWidget';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Truck,
  Wrench,
  Clock,
  Layers,
  ChevronRight,
  MessageSquare,
  FileText
} from 'lucide-react';

interface ProductDetailClientProps {
  product: FurnitureItem;
  relatedProducts: FurnitureItem[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  return (
    <WishlistProvider>
      <ProductDetailInner product={product} relatedProducts={relatedProducts} />
    </WishlistProvider>
  );
}

function ProductDetailInner({ product, relatedProducts }: ProductDetailClientProps) {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';
  const router = useRouter();
  const { isInWishlist, toggleWishlist, setIsWishlistDrawerOpen } = useWishlist();

  // State
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedFinishId, setSelectedFinishId] = useState<string>(product.finishes[0]?.id || 'standard');
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'dimensions' | 'materials' | 'hospitality'>('overview');

  // Sync cart with localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wd_furniture_cart');
      if (saved) setCartItems(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem('wd_furniture_cart', JSON.stringify(items));
      window.dispatchEvent(new Event('wd_cart_updated'));
    } catch (e) {}
  };

  const handleAddToCart = () => {
    const existingIdx = cartItems.findIndex(
      (i) => i.product.id === product.id && i.selectedFinishId === selectedFinishId
    );

    let updated: CartItem[];
    if (existingIdx > -1) {
      updated = [...cartItems];
      updated[existingIdx].quantity += quantity;
    } else {
      updated = [...cartItems, { product, selectedFinishId, quantity }];
    }

    saveCart(updated);
    setCartDrawerOpen(true);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/furniture/checkout');
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const selectedFinish = product.finishes.find((f) => f.id === selectedFinishId) || product.finishes[0];
  const unitPrice = product.price;
  const totalPrice = unitPrice * quantity;
  const vatAmount = totalPrice * 0.15;

  return (
    <div className="min-h-screen bg-[#08090C] text-white selection:bg-[#C9A86A] selection:text-[#08090C]">
      {/* 1. Header */}
      <EcommerceNavbar
        onOpenCart={() => setCartDrawerOpen(true)}
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto pt-32 pb-20 px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Link href="/" className="hover:text-[#C9A86A] transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-zinc-600" />
          <Link href="/furniture" className="hover:text-[#C9A86A] transition-colors">{isAr ? 'أثاث جرين وود' : 'GreenWood Furniture'}</Link>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-zinc-600" />
          <span className="text-zinc-500">{isAr ? product.categoryAr : product.categoryEn}</span>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-zinc-600" />
          <span className="text-[#C9A86A] font-bold truncate max-w-[200px]">{isAr ? product.nameAr : product.nameEn}</span>
        </nav>

        {/* 2. Top Product Showcase (Gallery + Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Media Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-black/60 border border-white/10 group shadow-2xl">
              <Image
                src={product.images[activeImageIdx] || product.images[0]}
                alt={isAr ? product.nameAr : product.nameEn}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex flex-col gap-2 z-10">
                <span className="px-3 py-1 rounded-full bg-[#0B5C3D]/90 text-[#34D399] border border-[#34D399]/40 text-xs font-bold backdrop-blur-md">
                  {isAr ? 'صنع في السعودية' : 'Made in Saudi Arabia'}
                </span>
                {product.badgeEn && (
                  <span className="px-3 py-1 rounded-full bg-[#C9A86A] text-[#08090C] font-extrabold text-xs shadow-lg">
                    {isAr ? product.badgeAr : product.badgeEn}
                  </span>
                )}
              </div>

              {/* Wishlist Heart */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 rtl:right-auto rtl:left-4 p-3 rounded-full backdrop-blur-md border transition-all z-20 ${
                  isInWishlist(product.id)
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 scale-105'
                    : 'bg-black/60 text-zinc-300 hover:text-rose-400 border-white/15'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md">
                {activeImageIdx + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-24 h-20 rounded-2xl overflow-hidden shrink-0 border transition-all ${
                    activeImageIdx === idx 
                      ? 'border-[#C9A86A] ring-2 ring-[#C9A86A]/40 scale-105' 
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.nameEn} view ${idx + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header / SKU / Title */}
            <div className="space-y-2 pb-4 border-b border-white/10">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#C9A86A] font-bold">{product.sku}</span>
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewsCount} {isAr ? 'تقييم فندقي' : 'reviews'})</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {isAr ? product.nameAr : product.nameEn}
              </h1>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {isAr ? product.shortDescAr : product.shortDescEn}
              </p>
            </div>

            {/* Price Block */}
            <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-[#C9A86A] font-mono">
                  {unitPrice.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-500 line-through font-mono">
                    {product.originalPrice.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-emerald-400 block">
                {isAr ? '✓ شامل ضريبة القيمة المضافة 15% والتوصيل الفندقي المباشر' : '✓ Includes 15% Saudi VAT & White-Glove Installation'}
              </span>
            </div>

            {/* Saudi BNPL 4-Installments Widget (Tamara / Tabby) */}
            <BnplInstallmentWidget price={unitPrice} />

            {/* Finishes Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-zinc-300 block">
                {isAr ? 'اختر خامة وتشطيب التنجيد:' : 'Select Finish & Upholstery:'}{' '}
                <span className="text-[#C9A86A]">{isAr ? selectedFinish?.nameAr : selectedFinish?.nameEn}</span>
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {product.finishes.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFinishId(f.id)}
                    className={`p-2.5 rounded-xl border text-left rtl:text-right flex items-center gap-2.5 transition-all ${
                      selectedFinishId === f.id
                        ? 'bg-[#C9A86A]/15 border-[#C9A86A] text-white shadow-[0_0_15px_rgba(201,168,106,0.25)]'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0" 
                      style={{ backgroundColor: f.colorCode }}
                    />
                    <span className="text-[11px] font-bold truncate">
                      {isAr ? f.nameAr : f.nameEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-zinc-400">{isAr ? 'الكمية المطلوبة:' : 'Quantity:'}</span>
              <div className="flex items-center border border-white/15 rounded-xl bg-black/40 overflow-hidden font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-white font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                {isAr ? `الإجمالي: ${totalPrice.toLocaleString('en-US')} ر.س` : `Subtotal: ${totalPrice.toLocaleString('en-US')} SAR`}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-4 px-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C9A86A]" />
                  <span>{isAr ? 'إضافة إلى حقيبة المشتريات' : 'Add to Bag'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="py-4 px-5 rounded-2xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_25px_rgba(201,168,106,0.4)] text-[#08090C] font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>{isAr ? 'الشراء الفوري المباشر' : 'Buy Now · Direct Checkout'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>

              {/* B2B Hospitality RFQ Button */}
              <Link
                href={`/contact?sector=hospitality&product=${encodeURIComponent(product.sku)}`}
                className="w-full py-3 px-4 rounded-xl bg-blue-950/30 hover:bg-blue-900/40 border border-blue-500/30 text-blue-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>{isAr ? 'طلب عرض سعر للمشاريع الفندقية والكميات (B2B)' : 'Request Hospitality Project RFQ (B2B)'}</span>
              </Link>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-[11px] text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span>{isAr ? 'توصيل وتركيب فندقي معتمد' : 'White-Glove Assembly'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isAr ? 'ضمان هيكلي 10 سنوات' : '10-Year Structural Guarantee'}</span>
              </div>
            </div>

            {/* Share Strip */}
            <div className="flex items-center justify-between pt-2 text-xs text-zinc-400">
              <span className="font-mono">{isAr ? 'مشاركة القطعة:' : 'Share Piece:'}</span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    isAr 
                      ? `ألقِ نظرة على أثاث جرين وود الفاخر: ${product.nameAr}\nhttps://wdgroup.online/furniture/${product.id}`
                      : `Explore GreenWood Bespoke Furniture: ${product.nameEn}\nhttps://wdgroup.online/furniture/${product.id}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 hover:bg-emerald-600 hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="p-2 rounded-xl bg-white/5 hover:bg-[#C9A86A] hover:text-[#08090C] transition-colors flex items-center gap-1.5"
                  aria-label="Copy Link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Deep-Dive Tabs (Overview, Dimensions, Joinery, Hospitality FF&E) */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 bg-[#0F1117]/95 space-y-8">
          {/* Tab Controls */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 overflow-x-auto text-xs font-mono">
            {[
              { id: 'overview', labelAr: 'نظرة عامة على التصميم', labelEn: 'Design Overview' },
              { id: 'dimensions', labelAr: 'الأبعاد والمخططات الهندسية', labelEn: 'Dimensions & CAD' },
              { id: 'materials', labelAr: 'المواد والنجارة الدقيقة', labelEn: 'Joinery & Materials' },
              { id: 'hospitality', labelAr: 'معايير الجودة الفندقية FF&E', labelEn: 'Hospitality FF&E Standards' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#C9A86A] text-[#08090C] font-extrabold shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isAr ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {activeTab === 'overview' && (
              <div className="space-y-4 max-w-3xl">
                <p>{isAr ? product.fullDescAr : product.fullDescEn}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {(isAr ? product.featuresAr : product.featuresEn).map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'dimensions' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center font-mono">
                <div className="p-6 rounded-2xl bg-[#141721] border border-white/5 space-y-1">
                  <span className="text-zinc-500 text-xs block">{isAr ? 'العرض (Width)' : 'Width'}</span>
                  <span className="text-2xl font-extrabold text-[#C9A86A]">{product.dimensions.width} {product.dimensions.unit}</span>
                </div>
                <div className="p-6 rounded-2xl bg-[#141721] border border-white/5 space-y-1">
                  <span className="text-zinc-500 text-xs block">{isAr ? 'العمق (Depth)' : 'Depth'}</span>
                  <span className="text-2xl font-extrabold text-[#C9A86A]">{product.dimensions.depth} {product.dimensions.unit}</span>
                </div>
                <div className="p-6 rounded-2xl bg-[#141721] border border-white/5 space-y-1">
                  <span className="text-zinc-500 text-xs block">{isAr ? 'الارتفاع (Height)' : 'Height'}</span>
                  <span className="text-2xl font-extrabold text-[#C9A86A]">{product.dimensions.height} {product.dimensions.unit}</span>
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-4 max-w-2xl">
                <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-2">
                  <span className="font-bold text-white block">{isAr ? 'مكونات الخامات المصنعية:' : 'Material Composition:'}</span>
                  <p className="text-zinc-400">{isAr ? product.materialsAr : product.materialsEn}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-2">
                  <span className="font-bold text-white block">{isAr ? 'موقع التصنيع وفترة التجهيز:' : 'Manufacturing Location & Lead Time:'}</span>
                  <p className="text-zinc-400">
                    {isAr ? product.factoryLocationAr : product.factoryLocationEn} — {isAr ? product.leadTimeAr : product.leadTimeEn}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'hospitality' && (
              <div className="space-y-4 max-w-3xl">
                <p>
                  {isAr
                    ? 'كافة منتجات أثاث جرين وود مصممة ومختبرة للمشاريع الفندقية الراقية FF&E ذات الاستخدام الكثيف وفق معايير EN 16139 ومقاومة الحريق والأقمشة المعالجة ضد البقع والسوائل.'
                    : 'All GreenWood bespoke furniture is engineered and tested to stringent European and Saudi hospitality standards (EN 16139 Commercial Strength), utilizing PFC-free stain-resistant fabric treatments and commercial-grade kiln-dried timber frames.'}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['EN 16139 Level 2', 'CAL 117 Fire Retardant', 'PFC-Free Stain Barrier', 'FSC Certified Timber', 'Saudi Made — GreenWood'].map((badge, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
                      ✓ {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Complete the Look / Related Pieces */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-white">
              {isAr ? 'قطع متناسقة تكتمل بها الفخامة' : 'Complete the Suite · Curated Pieces'}
            </h3>
            <Link href="/furniture" className="text-xs font-mono text-[#C9A86A] hover:underline flex items-center gap-1">
              <span>{isAr ? 'استعراض الكتالوج كاملاً' : 'View Full Catalog'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/furniture/${rel.id}`}
                className="luxury-card rounded-3xl p-4 border border-white/10 bg-[#0F1117]/80 hover:border-[#C9A86A]/50 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40">
                    <Image
                      src={rel.images[0]}
                      alt={isAr ? rel.nameAr : rel.nameEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#C9A86A]">{rel.sku}</span>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#C9A86A] transition-colors truncate">
                      {isAr ? rel.nameAr : rel.nameEn}
                    </h4>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-3 font-mono text-xs">
                  <span className="text-[#C9A86A] font-bold">{rel.price.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}</span>
                  <span className="text-[10px] text-zinc-400 group-hover:text-white flex items-center gap-1">
                    {isAr ? 'التفاصيل' : 'Explore'} <ChevronRight className="w-3 h-3 rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 5. Guarantees */}
        <TrustGuarantees />

      </main>

      {/* Drawers */}
      <CartQuoteDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={(pid, fid, delta) => {
          const updated = cartItems
            .map((item) => {
              if (item.product.id === pid && item.selectedFinishId === fid) {
                const nq = item.quantity + delta;
                return nq > 0 ? { ...item, quantity: nq } : null;
              }
              return item;
            })
            .filter(Boolean) as CartItem[];
          saveCart(updated);
        }}
        onRemoveItem={(pid, fid) => {
          saveCart(cartItems.filter((i) => !(i.product.id === pid && i.selectedFinishId === fid)));
        }}
        onClearCart={() => saveCart([])}
      />

      <WishlistDrawer />

      {/* Footer */}
      <EcommerceFooter />
    </div>
  );
}
