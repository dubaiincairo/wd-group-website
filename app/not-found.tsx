'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Home, 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  Building2, 
  Factory, 
  HardHat, 
  ShieldAlert, 
  Search 
} from 'lucide-react';

export default function NotFound() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen bg-[#08090C] text-white flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-32">
      
      {/* Ambient background glow & grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-3xl w-full mx-auto relative z-10 text-center space-y-8">
        
        {/* Error Code & Brand Monogram Bezel */}
        <div className="relative inline-block">
          <div className="text-8xl sm:text-9xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-800/40 select-none">
            404
          </div>
          
          <div className="absolute -top-3 -right-3 rtl:-right-auto rtl:-left-3 px-3 py-1 rounded-full bg-[#0F1117] border border-[#C9A86A]/40 text-[#C9A86A] text-[10px] font-mono font-bold tracking-widest uppercase shadow-glow-camel flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] animate-pulse"></span>
            <span>NOT FOUND</span>
          </div>
        </div>

        {/* Bilingual Headline & Explanation */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
            {isAr 
              ? 'عذراً، الرابط المطلوب غير موجود أو تم نقله ضمن منظومة مجموعة دبليو دي للأعمال. يمكنك العودة للصفحة الرئيسية أو استكشاف قطاعاتنا.' 
              : 'The requested resource or page does not exist or has been relocated within the WD Group platform. Please navigate back home or explore our core sectors.'}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>{isAr ? 'العودة للرئيسية' : 'Return to Homepage'}</span>
          </Link>

          <Link
            href="/#sectors"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-zinc-200 bg-[#0F1117]/90 border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Compass className="w-4 h-4 text-[#C9A86A]" />
            <span>{isAr ? 'استكشف القطاعات' : 'Explore Sectors'}</span>
          </Link>
        </div>

        {/* Quick Sector Navigation Pills */}
        <div className="pt-6 border-t border-white/10 max-w-xl mx-auto">
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-3 font-bold">
            {isAr ? 'روابط سريعة للقطاعات' : 'QUICK SECTOR DIRECTORY'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <Link
              href="/sectors/hospitality"
              className="p-3 rounded-xl bg-[#0F1117]/80 border border-sky-500/20 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all flex items-center justify-center gap-2 text-xs text-sky-300 font-semibold group"
            >
              <Building2 className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
              <span>{isAr ? 'الضيافة (SwissBlue)' : 'Hospitality'}</span>
            </Link>

            <Link
              href="/sectors/manufacturing"
              className="p-3 rounded-xl bg-[#0F1117]/80 border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-2 text-xs text-emerald-300 font-semibold group"
            >
              <Factory className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>{isAr ? 'التصنيع (GreenWood)' : 'Manufacturing'}</span>
            </Link>

            <Link
              href="/sectors/contracting"
              className="p-3 rounded-xl bg-[#0F1117]/80 border border-amber-500/20 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all flex items-center justify-center gap-2 text-xs text-amber-300 font-semibold group"
            >
              <HardHat className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{isAr ? 'المقاولات (WatanDesign)' : 'Contracting'}</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
