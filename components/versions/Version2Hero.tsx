'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ArrowRight, 
  Compass, 
  Layers, 
  CheckCircle2, 
  ArrowUpRight,
  Boxes,
  Hammer,
  BedDouble
} from 'lucide-react';
import AnimatedCounter from '@/components/home/AnimatedCounter';

const SYNERGY_STEPS = [
  {
    step: '01',
    key: 'manufacturing',
    icon: Factory,
    titleEn: '1. Manufacture',
    titleAr: '١. التصنيع والإنتاج',
    subEn: 'GreenWood Furniture & Woodcraft',
    subAr: 'مصانع جرين وود للأخشاب والأثاث',
    color: 'emerald',
    borderColor: 'border-emerald-500/50',
    bgColor: 'bg-emerald-950/30',
    activeGlow: 'shadow-[0_0_25px_rgba(52,211,153,0.3)]',
    tagTextEn: '3 Factories',
    tagTextAr: '٣ مصانع متخصصة',
    descEn: 'High-precision CNC production, architectural joinery, hotel FF&E & custom woodwork in Riyadh & Najran.',
    descAr: 'تصنيع عالي الدقة، نجارة معمارية، وتوريد أثاث فندقي بمواصفات عالمية من مصانعنا بالرياض ونجران.'
  },
  {
    step: '02',
    key: 'contracting',
    icon: HardHat,
    titleEn: '2. Build & Fit-Out',
    titleAr: '٢. التنفيذ والتشطيب',
    subEn: 'WD Projects & Contracting',
    subAr: 'مشاريع دبليو دي للمقاولات والتجهيز',
    color: 'amber',
    borderColor: 'border-amber-500/50',
    bgColor: 'bg-amber-950/30',
    activeGlow: 'shadow-[0_0_25px_rgba(251,191,36,0.3)]',
    tagTextEn: 'Turnkey Execution',
    tagTextAr: 'تنفيذ تسليم مفتاح',
    descEn: 'Turnkey architectural fit-out, project engineering & site installation from blueprints to handover.',
    descAr: 'إدارة هندسية متكاملة، تشطيبات داخلية راقية، وتركيب ميداني شامل من المخطط حتى التسليم.'
  },
  {
    step: '03',
    key: 'hospitality',
    icon: Building2,
    titleEn: '3. Operate & Elevate',
    titleAr: '٣. التشغيل وإدارة الضيافة',
    subEn: 'SwissBlue Hospitality & Suites',
    subAr: 'سويس بلو لإدارة الفنادق والشقق',
    color: 'sky',
    borderColor: 'border-sky-500/50',
    bgColor: 'bg-sky-950/30',
    activeGlow: 'shadow-[0_0_25px_rgba(56,189,248,0.3)]',
    tagTextEn: '6 Properties',
    tagTextAr: '٦ منشآت فندقية',
    descEn: 'Premium hotel asset management, exceptional guest stays & long-term sustainable asset value.',
    descAr: 'إدارة فندقية احترافية، تجارب ضيافة متميزة، وتعظيم مستدام لعوائد الأصول الفندقية.'
  }
];

export default function Version2Hero() {
  const { lang, dict } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative min-h-[92vh] flex items-center py-20 overflow-hidden bg-[#08090C]">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[160px]"></div>
        <div className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[150px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-surface border border-white/10 text-zinc-300 mb-6 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold text-white">{dict.home.hero.eyebrow}</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400 font-normal">
              {lang === 'ar' ? 'سلسلة القيمة المتكاملة' : 'Integrated Value Chain'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 max-w-4xl mx-auto drop-shadow-xl">
            <span className="block">{dict.home.hero.title_line1 || 'Solid Vision.'}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 rtl:bg-gradient-to-l drop-shadow-sm py-0.5">
              {dict.home.hero.title_line2 || 'Diverse Sectors.'}
            </span>
            <span className="block text-white">{dict.home.hero.title_line3 || 'Promising Future.'}</span>
          </h1>

          <p className="text-base text-zinc-300 leading-relaxed font-normal">
            {dict.home.hero.body}
          </p>
        </div>

        {/* 3 Interactive Value Chain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {SYNERGY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden backdrop-blur-xl ${
                  isActive 
                    ? `${step.bgColor} ${step.borderColor} ${step.activeGlow} ring-1 ring-white/20 scale-[1.02]` 
                    : 'bg-brand-surface/70 border-white/10 hover:border-white/25 hover:bg-brand-surface'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isActive ? 'bg-white text-black' : 'bg-white/10 text-white'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    {lang === 'ar' ? step.tagTextAr : step.tagTextEn}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {lang === 'ar' ? step.titleAr : step.titleEn}
                </h3>
                <div className="text-xs font-medium text-blue-400 mb-3">
                  {lang === 'ar' ? step.subAr : step.subEn}
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {lang === 'ar' ? step.descAr : step.descEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="flex justify-center gap-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>{dict.home.hero.primaryCta}</span>
          </Link>
          <a
            href="#sectors"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs text-zinc-200 bg-brand-surface hover:bg-zinc-800 border border-white/15 transition-all"
          >
            <span>{dict.home.hero.secondaryCta}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 text-zinc-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
