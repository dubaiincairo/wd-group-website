'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ArrowRight, 
  Compass,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';

export default function HeroSection() {
  const { lang, dict } = useLanguage();

  return (
    <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white">
      
      {/* Background Subtle Gradient Grid (Untitled UI Style) */}
      <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content (Untitled UI Centered Hero Header) */}
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Announcement Pill Badge (Untitled UI Signature Pattern) */}
          <div className="inline-flex items-center gap-2 p-1 pl-1.5 pr-3 rounded-full bg-brand-50 border border-brand-200 text-brand-700 hover:bg-brand-100 transition-all cursor-pointer mb-8 shadow-xs">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-brand-700 shadow-xs border border-brand-200">
              {dict.hero.badge}
            </span>
            <span className="text-xs font-semibold">
              {lang === 'ar' ? 'استكشف قطاعاتنا الاستراتيجية الثلاثة' : 'Explore our 3 strategic sectors'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </div>

          {/* Display Heading (Untitled UI Display 2xl) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-gray-900 leading-[1.1] mb-6">
            <span className="block">{dict.hero.title_line1}</span>
            <span className="block text-brand-600">
              {dict.hero.title_line2}
            </span>
            <span className="block text-gray-900">{dict.hero.title_line3}</span>
          </h1>

          {/* Subtitle / Description (Untitled UI Gray 600 Lead Text) */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {dict.hero.description}
          </p>

          {/* Dual Action CTA Buttons (Untitled UI Pattern: Primary + Secondary Gray) */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
            <Link 
              href="#about" 
              className="u-btn-primary !px-6 !py-3 !text-base"
            >
              <Compass className="w-4 h-4" />
              <span>{dict.hero.cta_primary}</span>
            </Link>

            <Link 
              href="#sectors" 
              className="u-btn-secondary !px-6 !py-3 !text-base"
            >
              <span>{dict.hero.cta_secondary}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

        </div>

        {/* Section 2: Untitled UI 4-Column Metric Grid Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-sm divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0">
            
            {/* Metric 1: Hospitality */}
            <div className="flex flex-col items-center text-center sm:px-6 pt-4 sm:pt-0">
              <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-brand-600 mb-2">
                {dict.stats.stat1_num}
              </div>
              <div className="text-sm font-medium text-gray-600 leading-snug">
                {dict.stats.stat1_text}
              </div>
            </div>

            {/* Metric 2: Factories */}
            <div className="flex flex-col items-center text-center sm:px-6 pt-6 sm:pt-0">
              <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-emerald-700 mb-2">
                {dict.stats.stat2_num}
              </div>
              <div className="text-sm font-medium text-gray-600 leading-snug">
                {dict.stats.stat2_text}
              </div>
            </div>

            {/* Metric 3: Employees */}
            <div className="flex flex-col items-center text-center sm:px-6 pt-6 sm:pt-0">
              <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-amber-700 mb-2">
                {dict.stats.stat3_num}
              </div>
              <div className="text-sm font-medium text-gray-600 leading-snug">
                {dict.stats.stat3_text}
              </div>
            </div>

            {/* Metric 4: Occupancy */}
            <div className="flex flex-col items-center text-center sm:px-6 pt-6 sm:pt-0">
              <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 mb-2">
                {dict.stats.stat4_num}
              </div>
              <div className="text-sm font-medium text-gray-600 leading-snug">
                {dict.stats.stat4_text}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
