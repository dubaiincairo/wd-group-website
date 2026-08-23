'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Workflow, 
  Factory, 
  HardHat, 
  Building2, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function HoldingSynergy() {
  const { lang, dict } = useLanguage();

  return (
    <section className="py-20 bg-brand-dark relative overflow-hidden border-t border-brand-border">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface border border-brand-border text-blue-400 mb-3 shadow-2xs">
            <Workflow className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'سلسلة القيمة المتكاملة' : 'Integrated Value Chain'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            {lang === 'ar' 
              ? 'تكامل استراتيجي يُحكِم السيطرة على دورة التطوير' 
              : 'Strategic Synergy Across the Development Lifecycle'}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto">
            {lang === 'ar'
              ? 'نموذج عمل قابض فريد يربط التصنيع الصناعي بمقاولات الديكور والتشطيب، وصولاً إلى الإدارة الفندقية المتميزة.'
              : 'A self-sustaining holding ecosystem linking precision manufacturing, interior contracting, and premier hotel operations.'}
          </p>
        </div>

        {/* 3-Stage Synergy Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative max-w-5xl mx-auto">
          
          {/* Stage 1: Manufacturing */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 shadow-glow-emerald relative group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Factory className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                01 // {lang === 'ar' ? 'التصنيع' : 'MANUFACTURE'}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              {lang === 'ar' ? 'تصنيع الأثاث والديكور' : 'Furniture & Decor Manufacturing'}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {lang === 'ar' 
                ? '٣ مصانع متخصصة للأخشاب والألومنيوم تُنتج بأعلى المعايير الهندسية.' 
                : '3 dedicated factories supplying custom wood, metal, and architectural decor.'}
            </p>
          </div>

          {/* Stage 2: Contracting & Fit-out */}
          <div className="glass-card rounded-2xl p-6 border border-amber-500/30 shadow-glow-gold relative group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <HardHat className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                02 // {lang === 'ar' ? 'التنفيذ' : 'FIT-OUT'}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              {lang === 'ar' ? 'مقاولات وتنفيذ الديكور' : 'Interior Fit-out Contracting'}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {lang === 'ar' 
                ? 'إدارة مشروعات التشطيب والتأثيث المتكامل من المخطط حتى التسليم.' 
                : 'Turnkey execution managing full interior construction from blueprint to handover.'}
            </p>
          </div>

          {/* Stage 3: Hospitality Operations */}
          <div className="glass-card rounded-2xl p-6 border border-sky-500/30 shadow-glow-blue relative group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/30">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                03 // {lang === 'ar' ? 'التشغيل' : 'OPERATE'}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              {lang === 'ar' ? 'إدارة وتشغيل الفنادق' : 'Hospitality Asset Management'}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {lang === 'ar' 
                ? '٦ منشآت فندقية راقية بالمملكة وتونس تُحقق أعلى معدلات الإشغال.' 
                : 'Operating 6 luxury hospitality properties across KSA and Tunisia.'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
