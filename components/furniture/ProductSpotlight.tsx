'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { FurnitureItem, FURNITURE_CATALOG } from '@/lib/furnitureData';
import { 
  Sparkles, 
  ShieldCheck, 
  ShoppingBag, 
  Check, 
  ArrowRight, 
  Layers, 
  Star,
  Eye
} from 'lucide-react';

interface ProductSpotlightProps {
  onQuickView: (product: FurnitureItem) => void;
  onAddToCart: (product: FurnitureItem, selectedFinish: string, quantity: number) => void;
}

export default function ProductSpotlight({ onQuickView, onAddToCart }: ProductSpotlightProps) {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';

  // Flagship product: Al-Diriyah curved sofa
  const spotlightProduct = FURNITURE_CATALOG[0];

  const [selectedFinishId, setSelectedFinishId] = useState<string>(
    spotlightProduct.finishes[0]?.id || 'cream-boucle'
  );
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const spotlightDict = (dict.furniture as any)?.spotlight || {
    eyebrow: isAr ? 'تحفة المجموعة المعمارية' : 'SIGNATURE MASTERPIECE',
    title: isAr ? 'أريكة الدرعية المنحنية الفاخرة' : 'The Al-Diriyah Modular Curved Sofa',
    badge: isAr ? 'أيقونة التصميم السعودي المعاصر' : 'Architectural Icon',
    desc: isAr 
      ? 'تصميم عضوي نحتي منجد بقماش البوكليه الإيطالي الفاخر مع قاعدة مدمجة من خشب الجوز الأمريكي الطبيعي. صُنع يدويًا بمصنعنا في الرياض بهيكل داخلي صلب من خشب الزان المعالج حرارياً.'
      : 'Sculptural organic silhouette upholstered in textured Italian bouclé with hidden solid walnut plinth base. Handcrafted in our Riyadh industrial facility with kiln-dried solid beech frames.',
    price_label: isAr ? 'يبدأ السعر من' : 'Starting from',
    view_details: isAr ? 'المواصفات الهندسية' : 'View Technical Specs',
    add_to_cart: isAr ? 'طلب القطعة الأيقونية' : 'Acquire Signature Piece',
    custom_note: isAr 
      ? 'تتوفر بمقاسات مخصصة (من 2.4 متر إلى 4.2 متر) وأكثر من 30 نسيجاً أوروبياً فاخراً.'
      : 'Available in bespoke lengths (2.4m to 4.2m) and 30+ European fabrics.',
    feature1_title: isAr ? 'ضمان هيكلي 10 سنوات' : '10-Year Frame Guarantee',
    feature1_desc: isAr ? 'هيكل داخلي من خشب الزان المعالج حرارياً مصمم ليدوم لعقود.' : 'Kiln-dried solid beech structure engineered for decades of structural integrity.',
    feature2_title: isAr ? 'قماش بوكليه فندقي فائق' : 'Hospitality-Grade Bouclé',
    feature2_desc: isAr ? 'قماش إيطالي معالج ضد البقع ومقاوم للتآكل بأكثر من 80,000 دورة احتكاك.' : 'Commercial stain-resistant Italian bouclé with 80,000+ Martindale rub count.',
    feature3_title: isAr ? 'نظام موديول ذكي' : 'Modular Configuration',
    feature3_desc: isAr ? 'وصلات ألمانية مخفية تسمح بإعادة ترتيب وتوسيع الأريكة حسب مساحة المجلس.' : 'Invisible German interlocking mechanisms adaptable to any salon or penthouse layout.',
  };

  const handleAddToCart = () => {
    onAddToCart(spotlightProduct, selectedFinishId, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const currentFinish = spotlightProduct.finishes.find(f => f.id === selectedFinishId) || spotlightProduct.finishes[0];

  return (
    <section className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#121520] via-[#0F1118] to-[#0A0C11] border border-white/10 shadow-2xl overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A86A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Interactive Image Gallery (Takes 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-72 sm:h-[420px] lg:h-[480px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-[#08090C]">
            <Image
              src={spotlightProduct.images[selectedImageIdx] || spotlightProduct.images[0]}
              alt={isAr ? spotlightProduct.nameAr : spotlightProduct.nameEn}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center transition-all duration-500"
            />

            {/* Architectural Icon Badge */}
            <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#08090C]/85 border border-[#C9A86A]/40 text-[#C9A86A] text-xs font-mono font-bold backdrop-blur-md shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{spotlightDict.badge}</span>
              </span>
            </div>

            {/* Quick View Button Overlay */}
            <button
              onClick={() => onQuickView(spotlightProduct)}
              className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 px-3.5 py-2 rounded-xl bg-[#08090C]/80 hover:bg-[#08090C] border border-white/15 text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>{spotlightDict.view_details}</span>
            </button>
          </div>

          {/* Thumbnails Row */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {spotlightProduct.images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIdx(idx)}
                className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                  selectedImageIdx === idx ? 'border-[#C9A86A] scale-105 shadow-md' : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Narrative & Actions (Takes 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#C9A86A] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C9A86A]" />
            <span>{spotlightDict.eyebrow}</span>
          </div>

          {/* Title & Reviews */}
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {isAr ? spotlightProduct.nameAr : spotlightProduct.nameEn}
            </h3>
            
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-mono text-zinc-300 font-bold">
                {spotlightProduct.rating} ({spotlightProduct.reviewsCount} {isAr ? 'تقييماً فندقياً' : 'Verified Reviews'})
              </span>
            </div>
          </div>

          {/* Price Strip */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-mono block">
                {spotlightDict.price_label}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {spotlightProduct.price.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-[#C9A86A]">
                  {isAr ? 'ر.س' : 'SAR'}
                </span>
                {spotlightProduct.originalPrice && (
                  <span className="text-xs text-zinc-400 line-through font-mono">
                    {spotlightProduct.originalPrice.toLocaleString()} {isAr ? 'ر.س' : 'SAR'}
                  </span>
                )}
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
              {isAr ? 'شامل الضريبة والتركيب' : 'VAT & Staging Included'}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
            {spotlightDict.desc}
          </p>

          {/* 3 Value Highlights */}
          <div className="space-y-2 pt-1 border-t border-white/5">
            <div className="flex items-start gap-2.5 text-xs">
              <ShieldCheck className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">{spotlightDict.feature1_title}: </span>
                <span className="text-zinc-400">{spotlightDict.feature1_desc}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-xs">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">{spotlightDict.feature2_title}: </span>
                <span className="text-zinc-400">{spotlightDict.feature2_desc}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-xs">
              <Layers className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">{spotlightDict.feature3_title}: </span>
                <span className="text-zinc-400">{spotlightDict.feature3_desc}</span>
              </div>
            </div>
          </div>

          {/* Finish Selector */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-300 font-mono">
                {isAr ? 'خيارات القماش والتشطيب:' : 'Fabric & Finish:'}
              </span>
              <span className="text-[#C9A86A] font-medium">
                {isAr ? currentFinish.nameAr : currentFinish.nameEn}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {spotlightProduct.finishes.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFinishId(f.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    selectedFinishId === f.id
                      ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: f.colorCode }}
                  />
                  <span>{isAr ? f.nameAr : f.nameEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
            <button
              onClick={handleAddToCart}
              className={`w-full sm:flex-1 h-12 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl ${
                isAdded 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] hover:shadow-[0_0_30px_rgba(201,168,106,0.6)] hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{isAr ? 'تمت الإضافة للسلة' : 'Added to Cart!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{spotlightDict.add_to_cart}</span>
                </>
              )}
            </button>

            <button
              onClick={() => onQuickView(spotlightProduct)}
              className="w-full sm:w-auto h-12 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#C9A86A]" />
              <span>{spotlightDict.view_details}</span>
            </button>
          </div>

          {/* Bespoke Note */}
          <p className="text-[11px] text-zinc-400 italic">
            * {spotlightDict.custom_note}
          </p>

        </div>

      </div>

    </section>
  );
}
