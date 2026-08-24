'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ArrowRight, 
  Compass, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import AnimatedCounter from '@/components/home/AnimatedCounter';

const SECTOR_DATA = {
  hospitality: {
    photo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85',
    titleEn: 'Hospitality',
    titleAr: 'الضيافة',
    subEn: 'SwissBlue Hospitality & Suites',
    subAr: 'سويس بلو للضيافة والشقق الفندقية',
    badgeEn: '6 Properties in KSA',
    badgeAr: '٦ منشآت فندقية بالمملكة',
    descEn: 'Full-service hotels & luxury serviced residences in Jeddah, Riyadh & Jazan.',
    descAr: 'فنادق متكاملة الخدمات وشقق فندقية مخدومة راقية في جدة والرياض وجازان.',
    color: 'border-sky-500/50 bg-sky-950/20 text-sky-400'
  },
  manufacturing: {
    photo: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1400&q=85',
    titleEn: 'Manufacturing & Furniture',
    titleAr: 'التصنيع والأثاث',
    subEn: 'GreenWood Woodcraft & FF&E',
    subAr: 'جرين وود للأخشاب والأثاث',
    badgeEn: '3 Specialized Factories',
    badgeAr: '٣ مصانع متخصصة بالرياض ونجران',
    descEn: 'Architectural joinery, custom furniture, aluminum & contract FF&E.',
    descAr: 'أعمال النجارة المعمارية، أثاث المشاريع، الألومنيوم، والتجهيز الشامل.',
    color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400'
  },
  contracting: {
    photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    titleEn: 'Contracting & Fit-Out',
    titleAr: 'المقاولات والتجهيز الداخلي',
    subEn: 'WD Projects & Turnkey Execution',
    subAr: 'مشاريع دبليو دي للتنفيذ الشامل',
    badgeEn: 'Turnkey Fit-Out',
    badgeAr: 'تنفيذ وتسليم متكامل',
    descEn: 'Turnkey execution from project blueprints to handover.',
    descAr: 'تنفيذ هندسي وتشطيب متكامل من المخطط المعماري حتى تسليم المفتاح.',
    color: 'border-amber-500/50 bg-amber-950/20 text-amber-400'
  }
};

export default function Version3Hero() {
  const { lang, dict } = useLanguage();
  const [selectedSector, setSelectedSector] = useState<'hospitality' | 'manufacturing' | 'contracting'>('hospitality');

  const current = SECTOR_DATA[selectedSector];

  return (
    <section className="relative min-h-[92vh] flex items-center py-20 overflow-hidden bg-[#08090C]">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[140px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content + Sector Tabs */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-surface border border-white/10 text-zinc-300 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-bold text-white">{dict.home.hero.eyebrow}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-xl">
              <span className="block">{dict.home.hero.title_line1 || 'Solid Vision.'}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 rtl:bg-gradient-to-l drop-shadow-sm py-0.5">
                {dict.home.hero.title_line2 || 'Diverse Sectors.'}
              </span>
              <span className="block text-white">{dict.home.hero.title_line3 || 'Promising Future.'}</span>
            </h1>

            <p className="text-base text-zinc-300 leading-relaxed font-normal">
              {dict.home.hero.body}
            </p>

            {/* 3 Sector Tabs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setSelectedSector('hospitality')}
                className={`w-full text-start p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  selectedSector === 'hospitality'
                    ? 'bg-[#1A476A]/40 border-sky-400/80 shadow-glow-blue'
                    : 'bg-brand-surface/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                    selectedSector === 'hospitality' ? 'bg-sky-500 text-white' : 'bg-sky-500/10 text-sky-400'
                  }`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{lang === 'ar' ? 'الضيافة' : 'Hospitality'}</div>
                    <div className="text-xs text-sky-400 font-medium">SwissBlue</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-sky-300 bg-sky-500/20 px-2.5 py-1 rounded-full">
                  6 {lang === 'ar' ? 'منشآت' : 'Properties'}
                </span>
              </button>

              <button
                onClick={() => setSelectedSector('manufacturing')}
                className={`w-full text-start p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  selectedSector === 'manufacturing'
                    ? 'bg-[#0B5C3D]/40 border-emerald-400/80 shadow-glow-emerald'
                    : 'bg-brand-surface/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                    selectedSector === 'manufacturing' ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    <Factory className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{lang === 'ar' ? 'التصنيع والأثاث' : 'Manufacturing & Furniture'}</div>
                    <div className="text-xs text-emerald-400 font-medium">GreenWood</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full">
                  3 {lang === 'ar' ? 'مصانع' : 'Factories'}
                </span>
              </button>

              <button
                onClick={() => setSelectedSector('contracting')}
                className={`w-full text-start p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  selectedSector === 'contracting'
                    ? 'bg-[#8A7340]/40 border-amber-400/80 shadow-glow-gold'
                    : 'bg-brand-surface/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                    selectedSector === 'contracting' ? 'bg-amber-500 text-white' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    <HardHat className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{lang === 'ar' ? 'المقاولات والتجهيز الداخلي' : 'Contracting & Fit-Out'}</div>
                    <div className="text-xs text-amber-400 font-medium">Projects</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-full">
                  {lang === 'ar' ? 'تنفيذ شامل' : 'Turnkey'}
                </span>
              </button>
            </div>

            <div className="pt-2 flex gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>{dict.home.hero.primaryCta}</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Grand Framed Visual Showcase */}
          <div className="lg:col-span-6">
            <div className="relative h-[480px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
              <Image
                src={current.photo}
                alt="Sector Visual"
                fill
                priority
                className="object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 space-y-2">
                <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${current.color}`}>
                  {lang === 'ar' ? current.badgeAr : current.badgeEn}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {lang === 'ar' ? current.subAr : current.subEn}
                </h3>
                <p className="text-xs text-zinc-300">
                  {lang === 'ar' ? current.descAr : current.descEn}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
