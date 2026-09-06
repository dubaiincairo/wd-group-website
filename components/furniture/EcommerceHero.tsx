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
  Eye
} from 'lucide-react';

import { HERO_SLIDES } from './hero/heroTypes';
import HeroOption1Split from './hero/HeroOption1Split';
import HeroOption2Editorial from './hero/HeroOption2Editorial';
import HeroOption3Panoramic from './hero/HeroOption3Panoramic';
import HeroOption4Asymmetric from './hero/HeroOption4Asymmetric';

export type HeroVariant = 'option-1' | 'option-2' | 'option-3' | 'option-4';

export default function EcommerceHero() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroVariant, setHeroVariant] = useState<HeroVariant>('option-1');
  const [showSwitcher, setShowSwitcher] = useState(true);

  // Initialize from URL param (?hero=1..4) or localStorage
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const heroParam = params.get('hero');
      if (heroParam === '1' || heroParam === 'split') setHeroVariant('option-1');
      else if (heroParam === '2' || heroParam === 'editorial') setHeroVariant('option-2');
      else if (heroParam === '3' || heroParam === 'panoramic') setHeroVariant('option-3');
      else if (heroParam === '4' || heroParam === 'asymmetric') setHeroVariant('option-4');
      else {
        const saved = localStorage.getItem('wd_hero_variant') as HeroVariant;
        if (saved && ['option-1', 'option-2', 'option-3', 'option-4'].includes(saved)) {
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
      const num = variant === 'option-1' ? '1' : variant === 'option-2' ? '2' : variant === 'option-3' ? '3' : '4';
      url.searchParams.set('hero', num);
      window.history.replaceState({}, '', url.toString());
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
      
      {/* 1. Interactive Hero Structure Switcher Bar (For Choosing Between the 4 Options) */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-3">
        <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-[#0F121C]/90 backdrop-blur-xl border border-[#C9A86A]/30 shadow-2xl">
          
          <div className="flex items-center gap-2 px-2">
            <span className="w-2 h-2 rounded-full bg-[#C9A86A] animate-pulse" />
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#C9A86A]" />
              {isAr ? 'اختر هيكل الواجهة (4 خيارات معمارية):' : 'Select Hero Layout (4 Architectural Options):'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            
            {/* Option 1 */}
            <button
              onClick={() => handleSelectVariant('option-1')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                heroVariant === 'option-1'
                  ? 'bg-[#C9A86A] text-[#08090C] border-[#E3C58A] shadow-[0_0_15px_rgba(201,168,106,0.5)]'
                  : 'bg-white/5 text-zinc-300 hover:text-white border-white/10 hover:bg-white/10'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{isAr ? '1. تقسيم متوازن (Showcase)' : '1. Split Showcase'}</span>
            </button>

            {/* Option 2 */}
            <button
              onClick={() => handleSelectVariant('option-2')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                heroVariant === 'option-2'
                  ? 'bg-[#C9A86A] text-[#08090C] border-[#E3C58A] shadow-[0_0_15px_rgba(201,168,106,0.5)]'
                  : 'bg-white/5 text-zinc-300 hover:text-white border-white/10 hover:bg-white/10'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isAr ? '2. نصفين مع نقاط تفاعلية (50/50 Hotspots)' : '2. 50/50 Hotspots'}</span>
            </button>

            {/* Option 3 */}
            <button
              onClick={() => handleSelectVariant('option-3')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                heroVariant === 'option-3'
                  ? 'bg-[#C9A86A] text-[#08090C] border-[#E3C58A] shadow-[0_0_15px_rgba(201,168,106,0.5)]'
                  : 'bg-white/5 text-zinc-300 hover:text-white border-white/10 hover:bg-white/10'
              }`}
            >
              <Maximize className="w-3.5 h-3.5" />
              <span>{isAr ? '3. بانوراما واسعة (Console)' : '3. Panoramic Console'}</span>
            </button>

            {/* Option 4 */}
            <button
              onClick={() => handleSelectVariant('option-4')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                heroVariant === 'option-4'
                  ? 'bg-[#C9A86A] text-[#08090C] border-[#E3C58A] shadow-[0_0_15px_rgba(201,168,106,0.5)]'
                  : 'bg-white/5 text-zinc-300 hover:text-white border-white/10 hover:bg-white/10'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>{isAr ? '4. كولاج المواد (Swatches)' : '4. Material Collage'}</span>
            </button>

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

      {/* 3. Global Slide Controls Strip (Visible when in Option 1, 3, or 4) */}
      {heroVariant !== 'option-2' && heroVariant !== 'option-3' && (
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
