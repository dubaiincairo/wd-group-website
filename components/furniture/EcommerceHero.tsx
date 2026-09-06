'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Factory, 
  ShieldCheck, 
  Truck, 
  Award,
  Maximize
} from 'lucide-react';

import { HERO_SLIDES } from './hero/heroTypes';
import HeroOption3Panoramic from './hero/HeroOption3Panoramic';

export default function EcommerceHero() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative min-h-[90vh] sm:min-h-[95vh] flex flex-col justify-between pt-24 sm:pt-28 pb-8 overflow-hidden">
      
      {/* Approved Master Hero: Option 3 - Panoramic Wide Horizon with Floating Glassmorphic Console Island */}
      <HeroOption3Panoramic
        slide={slide}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        isAr={isAr}
      />

      {/* The 4 Bottom Quick Guarantees Strip */}
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
