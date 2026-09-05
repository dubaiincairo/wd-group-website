'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ArrowRight, 
  Sparkles, 
  Factory, 
  ShieldCheck, 
  Truck, 
  Award, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface HeroSlide {
  id: string;
  image: string;
  tagEn: string;
  tagAr: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  ctaCatalogEn: string;
  ctaCatalogAr: string;
  ctaQuoteEn: string;
  ctaQuoteAr: string;
  pieceNameEn: string;
  pieceNameAr: string;
  materialsEn: string;
  materialsAr: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'living-collection',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85',
    tagEn: 'Signature 2025 Living Collection',
    tagAr: 'مجموعة الصالونات المعمارية 2025',
    titleEn: 'Timeless Craftsmanship. Architectural Distinction.',
    titleAr: 'حِرفية أصيلة. فخامة صُممت لتدوم.',
    subtitleEn: 'Sculptural organic seating, solid American walnut joinery, and Italian textured bouclés handcrafted in our specialized Saudi industrial facilities.',
    subtitleAr: 'مقاعد نحتية انسيابية، نجارة من خشب الجوز الأمريكي الطبيعي، وأقمشة بوكليه إيطالية فاخرة تُصنع بأيدي وطنية في مصانعنا بالرياض ونجران.',
    ctaCatalogEn: 'Explore Collection',
    ctaCatalogAr: 'استكشف المجموعة',
    ctaQuoteEn: 'Request Custom Order',
    ctaQuoteAr: 'طلب تفصيل مخصص',
    pieceNameEn: 'Architectural Sculptural Lounge Suite',
    pieceNameAr: 'طقم صالون نحتي معماري انسيابي',
    materialsEn: 'Solid American Walnut • Italian Textured Bouclé',
    materialsAr: 'خشب جوز أمريكي مصمت • قماش بوكليه إيطالي فاخر',
  },
  {
    id: 'presidential-suites',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=85',
    tagEn: 'Hospitality & Luxury Suites',
    tagAr: 'أجنحة الضيافة والفنادق الفاخرة',
    titleEn: 'Presidential Suites Engineered for 5-Star Serenity.',
    titleAr: 'أجنحة رئاسية صُممت لأرقى معايير الضيافة العالمية.',
    subtitleEn: 'Turnkey hotel bedroom suites featuring floating upholstered headboards, acoustic fluted paneling, and invisible inductive charging.',
    subtitleAr: 'حلول تأثيث وتجهيز فندقي شاملة تشمل أسرّة فندقية عائمة، تجاليد جدارية عازلة للصوت، وشواحن لاسلكية ذكية مدمجة.',
    ctaCatalogEn: 'View Suite Collection',
    ctaCatalogAr: 'استعرض أجنحة النوم',
    ctaQuoteEn: 'Hotel Procurement RFP',
    ctaQuoteAr: 'كراسة توريدات الفنادق',
    pieceNameEn: 'Turnkey Presidential Master Suite',
    pieceNameAr: 'جناح سويت رئاسي فندقي متكامل',
    materialsEn: 'Fluted Acoustic Oak • Floating Upholstery',
    materialsAr: 'تجاليد بلوط مجزّعة عازلة • رأس سرير عائم مبطن',
  },
  {
    id: 'executive-boardrooms',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85',
    tagEn: 'Executive Boardroom & Joinery',
    tagAr: 'المكاتب وقاعات الاجتماعات التنفيذية',
    titleEn: 'Monumental Walnut & Travertine Boardroom Centers.',
    titleAr: 'طاولات اجتماعات ومكاتب تنفيذية من الجوز والترافرتين الطبيعي.',
    subtitleEn: 'Commanding executive tables engineered with solid American walnut live edges, Saudi travertine pedestals, and motorized German wire architecture.',
    subtitleAr: 'طاولات اجتماعات فخمة من خشب الجوز الأمريكي المصمت وقواعد الترافرتين الطبيعي مع ممرات كابلات آلية ألمانية الصنع.',
    ctaCatalogEn: 'Discover Boardrooms',
    ctaCatalogAr: 'استكشف طاولات الاجتماعات',
    ctaQuoteEn: 'Corporate RFP',
    ctaQuoteAr: 'طلب تسعير الشركات',
    pieceNameEn: 'Monumental Live-Edge Boardroom Table',
    pieceNameAr: 'طاولة اجتماعات مونومنتال الحافة الحية',
    materialsEn: 'Solid Walnut Live-Edge • Natural Travertine',
    materialsAr: 'خشب جوز طبيعي لايف إيدج • قواعد ترافرتين طبيعي',
  }
];

export default function EcommerceHero() {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-[95vh] flex flex-col justify-between pt-28 sm:pt-32 pb-10 overflow-hidden">
      
      {/* Background Hero Slider Imagery with Optimized Next/Image */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt={isAr ? slide.titleAr : slide.titleEn}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.72] contrast-[1.05]"
          />
          {/* Directional atmospheric overlay: deep solid contrast behind the text side, smoothly opening across the viewport */}
          <div 
            className={`absolute inset-0 ${
              isAr
                ? 'bg-gradient-to-l from-[#08090C] via-[#08090C]/90 to-[#08090C]/45'
                : 'bg-gradient-to-r from-[#08090C] via-[#08090C]/90 to-[#08090C]/45'
            }`} 
          />
          {/* Vertical atmospheric blends connecting navbar & bottom ribbons */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-[#08090C]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090C]/95 via-transparent to-[#08090C]" />
          {/* Subtle golden ambient warmth behind the visual column */}
          <div 
            className={`absolute top-1/3 w-[500px] h-[500px] bg-[#C9A86A]/10 rounded-full blur-[140px] pointer-events-none ${
              isAr ? 'left-10' : 'right-10'
            }`} 
          />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Container: Balanced 2-Column Composition */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text & CTAs Column (Right Side in Arabic RTL / Left in LTR) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow Tag */}
            <motion.div 
              key={`tag-${slide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A86A]/15 border border-[#C9A86A]/35 text-[#C9A86A] text-xs font-mono font-bold backdrop-blur-xl shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
              <span>{isAr ? slide.tagAr : slide.tagEn}</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              key={`title-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.18] sm:leading-[1.14]"
            >
              {isAr ? slide.titleAr : slide.titleEn}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              key={`sub-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-zinc-300 leading-relaxed font-normal max-w-2xl"
            >
              {isAr ? slide.subtitleAr : slide.subtitleEn}
            </motion.p>

            {/* High-Converting Action CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <a
                href="#catalog"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-xs sm:text-sm font-black text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_35px_rgba(201,168,106,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl border border-[#E3C58A]"
              >
                <span>{isAr ? slide.ctaCatalogAr : slide.ctaCatalogEn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <a
                href="#bespoke-b2b"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-xs sm:text-sm font-bold text-zinc-200 bg-[#141721]/90 hover:bg-[#1C2130] border border-white/15 hover:border-[#C9A86A]/50 backdrop-blur-xl transition-all cursor-pointer shadow-lg"
              >
                <Layers className="w-4 h-4 text-[#C9A86A]" />
                <span>{isAr ? slide.ctaQuoteAr : slide.ctaQuoteEn}</span>
              </a>
            </motion.div>

            {/* Trust Micro-Hallmarks */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3 text-xs text-zinc-300">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{isAr ? 'مصانع وطنية بالرياض ونجران' : 'Direct Saudi Facilities'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
                <span>{isAr ? 'أخشاب زان وجوز مصمت 100%' : '100% Solid Kiln-Dried Woods'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{isAr ? 'تفصيل مقاسات هندسية حسب الطلب' : 'Bespoke Sizing & Finishes'}</span>
              </div>
            </div>

          </div>

          {/* Harmonized Signature Showcase Card (Opposite Column) */}
          <div className="lg:col-span-5">
            <motion.div 
              key={`card-${slide.id}`}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="relative rounded-3xl p-4 sm:p-5 bg-gradient-to-b from-[#141721]/80 via-[#0F121A]/85 to-[#08090C]/95 border border-[#C9A86A]/25 backdrop-blur-2xl shadow-[0_25px_65px_rgba(0,0,0,0.75)] overflow-hidden"
            >
              {/* Subtle top gold accent line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C9A86A]/60 to-transparent" />

              {/* Showcase Header Ribbon */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#C9A86A] animate-pulse" />
                  <span>{isAr ? 'القطعة المميزة المعروضة' : 'Featured Signature Piece'}</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  {`0${currentSlide + 1} / 0${HERO_SLIDES.length}`}
                </span>
              </div>

              {/* Framed Feature Image with Glass Sheen */}
              <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/10 group shadow-inner">
                <Image
                  src={slide.image}
                  alt={isAr ? slide.titleAr : slide.titleEn}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/90 via-transparent to-black/20" />
                
                {/* Floating piece title overlay */}
                <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-[#08090C]/75 backdrop-blur-md border border-white/10">
                  <span className="text-[10px] text-[#C9A86A] font-bold uppercase tracking-wider block">
                    {isAr ? slide.tagAr : slide.tagEn}
                  </span>
                  <p className="text-xs sm:text-sm font-black text-white truncate">
                    {isAr ? (slide.pieceNameAr || slide.titleAr) : (slide.pieceNameEn || slide.titleEn)}
                  </p>
                </div>
              </div>

              {/* Material & Engineering Hallmarks */}
              <div className="mt-3.5 pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-400 font-medium">
                    {isAr ? 'المواد والمواصفات:' : 'Materials & Specs:'}
                  </span>
                  <span className="text-zinc-200 font-bold text-right rtl:text-right ltr:text-left">
                    {isAr ? slide.materialsAr : slide.materialsEn}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-400 font-medium">
                    {isAr ? 'خيارات التخصيص:' : 'Customization:'}
                  </span>
                  <span className="text-emerald-400 font-mono font-semibold">
                    {isAr ? 'تفصيل مقاسات حسب المخطط 100%' : '100% Bespoke Engineering'}
                  </span>
                </div>
              </div>

              {/* Interactive Slide Selector Thumbnails */}
              <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2">
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`relative rounded-xl p-1.5 text-left rtl:text-right transition-all cursor-pointer border ${
                      currentSlide === idx
                        ? 'bg-[#C9A86A]/15 border-[#C9A86A] shadow-[0_0_15px_rgba(201,168,106,0.3)]'
                        : 'bg-white/5 border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="relative h-10 rounded-lg overflow-hidden mb-1">
                      <Image
                        src={s.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-white block truncate">
                      {isAr ? s.tagAr.split(' ')[0] + ' ' + (s.tagAr.split(' ')[1] || '') : s.tagEn.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Slide Navigation & Factory Credentials Ribbon */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        
        {/* Slide Controls Strip */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
          
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx 
                    ? 'w-8 bg-[#C9A86A]' 
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev/Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

        </div>

        {/* 4 Bottom Quick Guarantees Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6">
          
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F121C]/80 border border-white/5 backdrop-blur-md">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
              <Factory className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {isAr ? 'تصنيع مباشر من المصنع' : 'Direct Factory Sourcing'}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {isAr ? '3 مصانع وطنية (الرياض ونجران)' : '3 Industrial Plants (KSA)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F121C]/80 border border-white/5 backdrop-blur-md">
            <div className="w-9 h-9 rounded-lg bg-[#C9A86A]/10 border border-[#C9A86A]/25 flex items-center justify-center text-[#C9A86A] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {isAr ? 'ضمان هيكلي 10 سنوات' : '10-Year Structural Guarantee'}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {isAr ? 'خشب زان وجوز مصمت' : 'Solid Kiln-Dried Hardwoods'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F121C]/80 border border-white/5 backdrop-blur-md">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {isAr ? 'توصيل وتركيب فندقي فائق' : 'White-Glove Installation'}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {isAr ? 'فنيون معتمدون بجميع المدن' : 'In-House Logistics Across KSA'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F121C]/80 border border-white/5 backdrop-blur-md">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {isAr ? 'تفصيل مقاسات وأقمشة 100%' : 'Bespoke Customization'}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {isAr ? '40+ نسيج وجلد إيطالي' : '40+ Fabrics, Leathers & Stones'}
              </span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
