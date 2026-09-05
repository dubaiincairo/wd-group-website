'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { FurnitureItem, FURNITURE_CATALOG } from '@/lib/furnitureData';
import { 
  Sparkles, 
  ShoppingBag, 
  Eye, 
  X, 
  ArrowRight,
  Plus
} from 'lucide-react';

interface HotspotItem {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  product: FurnitureItem;
}

const ROOM_HOTSPOTS: HotspotItem[] = [
  {
    id: 'spot-sofa',
    x: 48,
    y: 62,
    product: FURNITURE_CATALOG[0], // Al-Diriyah curved sofa
  },
  {
    id: 'spot-table',
    x: 68,
    y: 78,
    product: FURNITURE_CATALOG[1] || FURNITURE_CATALOG[0], // Travertine table
  },
  {
    id: 'spot-joinery',
    x: 24,
    y: 35,
    product: FURNITURE_CATALOG[3] || FURNITURE_CATALOG[0], // Architectural Joinery
  },
];

interface ShopTheLookProps {
  onQuickView: (product: FurnitureItem) => void;
  onAddToCart: (product: FurnitureItem, selectedFinish: string, quantity: number) => void;
}

export default function ShopTheLook({ onQuickView, onAddToCart }: ShopTheLookProps) {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';
  const [activeHotspot, setActiveHotspot] = useState<HotspotItem | null>(null);

  const lookDict = (dict.furniture as any)?.lookbook || {
    eyebrow: isAr ? 'استلهام تفاعلي للمساحات' : 'INTERACTIVE INSPIRATION',
    heading: isAr ? 'تسوق الإطلالة: جناح الصالون الدبلوماسي' : 'Shop The Look: The Presidential Salon',
    subheading: isAr
      ? 'مرر المؤشر فوق القطع في هذه المساحة الفاخرة للاطلاع على المواصفات الحِرفية والأسعار وإضافتها مباشرة لطلبك.'
      : 'Hover over items in this styled luxury residence to inspect craftsmanship, dimensions, and instantly add pieces to your space.',
    room_title: isAr ? 'مجلس الحي الدبلوماسي الفاخر' : 'The Diplomatic Quarter Living Suite',
    room_desc: isAr
      ? 'يضم أريكة الدرعية المنحنية، طاولتي نجران من حجر الترافرتين الطبيعي، وتجاليد الجوز المعمارية المفرغة بـ CNC.'
      : 'Featuring the Al-Diriyah curved sofa, Najran travertine dual tables, and hand-milled fluted walnut architectural paneling.',
  };

  const handleAddToCart = (product: FurnitureItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultFinish = product.finishes[0]?.id || 'default';
    onAddToCart(product, defaultFinish, 1);
  };

  return (
    <section id="lookbook" className="space-y-8 scroll-mt-24">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/25 text-[#C9A86A] text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lookDict.eyebrow}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {lookDict.heading}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          {lookDict.subheading}
        </p>
      </div>

      {/* Main Interactive Staged Room Frame */}
      <div className="relative h-[440px] sm:h-[580px] lg:h-[650px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#08090C]">
        
        {/* Background Curated Room Image */}
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85"
          alt={lookDict.room_title}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/90 via-[#08090C]/20 to-[#08090C]/40" />

        {/* Top Info Banner */}
        <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6 z-10 max-w-md p-4 rounded-2xl bg-[#08090C]/85 border border-white/10 backdrop-blur-xl hidden sm:block">
          <span className="text-[10px] font-mono text-[#C9A86A] uppercase font-bold block">
            {lookDict.room_title}
          </span>
          <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
            {lookDict.room_desc}
          </p>
        </div>

        {/* Interactive Hotspot Pins */}
        {ROOM_HOTSPOTS.map((spot) => (
          <div
            key={spot.id}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            {/* Pulsing Pin Button */}
            <button
              onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
              className="relative w-8 h-8 rounded-full bg-[#C9A86A] text-[#08090C] font-black flex items-center justify-center shadow-[0_0_20px_rgba(201,168,106,0.8)] hover:scale-115 transition-transform cursor-pointer group"
              aria-label={`Inspect ${spot.product.nameEn}`}
            >
              <span className="absolute inset-0 rounded-full bg-[#C9A86A] animate-ping opacity-40" />
              <Plus className={`w-4 h-4 transition-transform duration-200 ${activeHotspot?.id === spot.id ? 'rotate-45' : ''}`} />
            </button>

            {/* Hotspot Floating Product Card */}
            <AnimatePresence>
              {activeHotspot?.id === spot.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 rtl:left-auto rtl:right-1/2 rtl:translate-x-1/2 w-64 sm:w-72 p-3.5 rounded-2xl bg-[#0E1119]/95 border border-[#C9A86A]/40 shadow-2xl backdrop-blur-2xl z-30 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-[10px] font-mono text-[#C9A86A] uppercase font-bold">
                      {isAr ? spot.product.categoryAr : spot.product.categoryEn}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(null);
                      }}
                      className="text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#08090C]">
                      <Image
                        src={spot.product.images[0]}
                        alt={isAr ? spot.product.nameAr : spot.product.nameEn}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {isAr ? spot.product.nameAr : spot.product.nameEn}
                      </h4>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-sm font-black text-white font-mono">
                          {spot.product.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-[#C9A86A]">
                          {isAr ? 'ر.س' : 'SAR'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onQuickView(spot.product)}
                      className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3 text-[#C9A86A]" />
                      <span>{isAr ? 'المواصفات' : 'Details'}</span>
                    </button>

                    <button
                      onClick={(e) => handleAddToCart(spot.product, e)}
                      className="py-2 px-3 rounded-lg bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] text-[11px] font-extrabold flex items-center justify-center gap-1 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>{isAr ? 'أضف للسلة' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        ))}

        {/* Bottom CTA to catalog */}
        <div className="absolute bottom-6 inset-x-6 z-10 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-300 hidden sm:inline-block">
            {isAr ? 'اضغط على النقاط الذهبية لمعاينة القطع في الغرفة' : 'Click golden pins to inspect pieces in the room'}
          </span>
          <a
            href="#catalog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold backdrop-blur-md transition-all ml-auto rtl:ml-0 rtl:mr-auto"
          >
            <span>{isAr ? 'عرض كافة منتجات الغرفة في الكتالوج' : 'View All Room Pieces in Catalog'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 text-[#C9A86A]" />
          </a>
        </div>

      </div>

    </section>
  );
}
