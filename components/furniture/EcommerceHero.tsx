'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Factory, 
  ShieldCheck, 
  Truck, 
  Award, 
  ChevronLeft, 
  ChevronRight,
  LayoutGrid,
  Sliders,
  Maximize,
  Palette,
  Columns3,
  Compass,
  Film,
  Eye
} from 'lucide-react';

import { HERO_SLIDES } from './hero/heroTypes';
import HeroOption1Split from './hero/HeroOption1Split';
import HeroOption2Editorial from './hero/HeroOption2Editorial';
import HeroOption3Panoramic from './hero/HeroOption3Panoramic';
import HeroOption4Asymmetric from './hero/HeroOption4Asymmetric';
import HeroOption5Portals from './hero/HeroOption5Portals';
import HeroOption6Blueprint from './hero/HeroOption6Blueprint';
import HeroOption7Cinematic from './hero/HeroOption7Cinematic';

export type HeroVariant = 
  | 'option-1' 
  | 'option-2' 
  | 'option-3' 
  | 'option-4'
  | 'option-5'
  | 'option-6'
  | 'option-7';

interface VariantTabConfig {
  id: HeroVariant;
  num: string;
  nameAr: string;
  nameEn: string;
  icon: React.ComponentType<{ className?: string }>;
}

const HERO_VARIANTS: VariantTabConfig[] = [
  {
    id: 'option-1',
    num: '1',
    nameAr: '1. تقسيم متوازن (Showcase)',
    nameEn: '1. Split Showcase',
    icon: LayoutGrid,
  },
  {
    id: 'option-2',
    num: '2',
    nameAr: '2. نصفين 50/50 (Hotspots)',
    nameEn: '2. 50/50 Hotspots',
    icon: Sliders,
  },
  {
    id: 'option-3',
    num: '3',
    nameAr: '3. بانوراما واسعة (Console)',
    nameEn: '3. Panoramic Console',
    icon: Maximize,
  },
  {
    id: 'option-4',
    num: '4',
    nameAr: '4. كولاج المواد (Swatches)',
    nameEn: '4. Material Collage',
    icon: Palette,
  },
  {
    id: 'option-5',
    num: '5',
    nameAr: '5. بوابات متمددة (Portals)',
    nameEn: '5. Expanding Portals',
    icon: Columns3,
  },
  {
    id: 'option-6',
    num: '6',
    nameAr: '6. مخطط هندسي (CAD Blueprint)',
    nameEn: '6. CAD Blueprint',
    icon: Compass,
  },
  {
    id: 'option-7',
    num: '7',
    nameAr: '7. سينمائي VIP (Concierge Reel)',
    nameEn: '7. VIP Atelier Reel',
    icon: Film,
  },
];

export default function EcommerceHero() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroVariant, setHeroVariant] = useState<HeroVariant>('option-1');

  // Initialize from URL param (?hero=1..7) or localStorage
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const heroParam = params.get('hero');
      if (heroParam === '1') setHeroVariant('option-1');
      else if (heroParam === '2') setHeroVariant('option-2');
      else if (heroParam === '3') setHeroVariant('option-3');
      else if (heroParam === '4') setHeroVariant('option-4');
      else if (heroParam === '5') setHeroVariant('option-5');
      else if (heroParam === '6') setHeroVariant('option-6');
      else if (heroParam === '7') setHeroVariant('option-7');
      else {
        const saved = localStorage.getItem('wd_hero_variant') as HeroVariant;
        if (saved && HERO_VARIANTS.some(v => v.id === saved)) {
          setHeroVariant(saved);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSelectVariant = (variant: HeroVariant) => {
    setHeroVariant(variant);
    try {
      localStorage.setItem('wd_hero_variant', variant);
      // Update URL query string quietly without full reload
      const url = new URL(window.location.href);
      const targetConfig = HERO_VARIANTS.find(v => v.id === variant);
      if (targetConfig) {
        url.searchParams.set('hero', targetConfig.num);
        window.history.replaceState({}, '', url.toString());
      }
    } catch (e) {
      console.error(e);
    }
  };

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
    <section className="relative min-h-[90vh] sm:min-h-[95vh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 overflow-hidden">
      
      {/* 1. Interactive Live Hero Structure Switcher Bar (7 Options) */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-3">
        <div className="p-2.5 rounded-2xl bg-[#0F121C]/95 backdrop-blur-2xl border border-[#C9A86A]/35 shadow-2xl space-y-2">
          
          {/* Top Label & Mode Indicator */}
          <div className="flex items-center justify-between px-2 pb-1 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C9A86A] animate-pulse" />
              <span className="text-xs font-black text-white flex items-center gap-1.5 font-mono">
                <Eye className="w-4 h-4 text-[#C9A86A]" />
                {isAr ? 'معاينة هياكل الواجهة (7 خيارات معمارية فاخرة):' : 'Explore Hero Layouts (7 Architectural Master Options):'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#C9A86A] px-2.5 py-0.5 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30">
                {isAr ? 'اختر لمعاينة التصميم فوراً' : 'Click to preview live'}
              </span>
            </div>
          </div>

          {/* 7 Variant Buttons Pill Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 pt-1">
            {HERO_VARIANTS.map((tab) => {
              const Icon = tab.icon;
              const isActive = heroVariant === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectVariant(tab.id)}
                  className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer border truncate ${
                    isActive
                      ? 'bg-[#C9A86A] text-[#08090C] border-[#E3C58A] shadow-[0_0_20px_rgba(201,168,106,0.6)] scale-[1.02]'
                      : 'bg-white/5 text-zinc-300 hover:text-white border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                  title={isAr ? tab.nameAr : tab.nameEn}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{isAr ? tab.nameAr : tab.nameEn}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 2. Active Hero Structure Variant */}
      {heroVariant === 'option-1' && (
        <HeroOption1Split
          slide={slide}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          isAr={isAr}
        />
      )}

      {heroVariant === 'option-2' && (
        <HeroOption2Editorial
          slide={slide}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          isAr={isAr}
        />
      )}

      {heroVariant === 'option-3' && (
        <HeroOption3Panoramic
          slide={slide}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          isAr={isAr}
        />
      )}

      {heroVariant === 'option-4' && (
        <HeroOption4Asymmetric
          slide={slide}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          isAr={isAr}
        />
      )}

      {heroVariant === 'option-5' && (
        <HeroOption5Portals
          slide={slide}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          isAr={isAr}
        />
      )}

      {heroVariant === 'option-6' && (
        <HeroOption6Blueprint
          slide={slide}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          isAr={isAr}
        />
      )}

      {heroVariant === 'option-7' && (
        <HeroOption7Cinematic
          slide={slide}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          isAr={isAr}
        />
      )}

      {/* 3. Slide Controls Strip (Visible when in Option 1 or 4) */}
      {(heroVariant === 'option-1' || heroVariant === 'option-4') && (
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-3">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
            {/* Slide Dots */}
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

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. The 4 Bottom Quick Guarantees Strip */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          
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
