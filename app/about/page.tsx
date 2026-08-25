'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  Compass, 
  ShieldCheck, 
  Users, 
  MapPin, 
  ArrowRight, 
  FileText, 
  Award,
  Sparkles,
  Quote
} from 'lucide-react';

export default function AboutPage() {
  const { lang, dict } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* 1. About Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface border border-brand-border text-blue-400 shadow-glow-card">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.about.hero.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {dict.about.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {dict.about.hero.body}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              href="/#sectors"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all"
            >
              <span>{dict.about.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>

            <button
              disabled
              title={lang === 'ar' ? 'الملف التعريفي قيد الاعتماد الرسمي' : 'Official profile PDF pending client approval'}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-zinc-400 bg-white/5 border border-white/10 cursor-not-allowed opacity-75"
            >
              <FileText className="w-4 h-4" />
              <span>{dict.about.hero.secondaryCta}</span>
            </button>
          </div>
        </section>

        {/* 2. Our Story */}
        <section className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden bg-brand-surface/80">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              // {lang === 'ar' ? 'مسيرة المجموعة' : 'GROUP HERITAGE'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.about.story.heading}
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {dict.about.story.body}
            </p>
          </div>
        </section>

        {/* 3. CEO Statement & Governance */}
        <section className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/30 relative overflow-hidden bg-brand-surface/90">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20">
              <Quote className="w-3.5 h-3.5" />
              <span>{dict.about.governance.label}</span>
            </div>

            <blockquote className="text-lg sm:text-xl text-zinc-100 font-medium leading-relaxed">
              &ldquo;{dict.about.governance.statement}&rdquo;
            </blockquote>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/10 pt-4">
              {dict.about.governance.support}
            </p>

            <div className="pt-2">
              <div className="text-base font-bold text-white">
                {dict.about.leadership.name}
              </div>
              <div className="text-xs text-blue-400 font-semibold">
                {dict.about.leadership.role}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Vision 2030 Alignment (3 Pillars) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              // {lang === 'ar' ? 'مواكبة الرؤية الوطنية' : 'NATIONAL ALIGNMENT'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.about.vision2030.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.about.vision2030.pillars.map((pillar, idx) => (
              <div key={idx} className="glass-card rounded-3xl p-7 border border-white/10 hover:border-blue-500/50 hover:shadow-glow-blue transition-all space-y-4 bg-brand-surface/80 group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                    PILLAR // 0{idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    {idx === 0 ? <Award className="w-4 h-4" /> : idx === 1 ? <Users className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Geographic Footprint (Saudi Arabia) */}
        <section className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 bg-brand-surface/80">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              // {lang === 'ar' ? 'الانتشار الوطني' : 'NATIONAL REACH'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.about.footprint.heading}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {dict.about.footprint.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dict.about.footprint.locations.map((loc, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-blue-500/40 hover:bg-black/60 transition-all space-y-2 group">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{loc.city}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {loc.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Corporate Profile Download CTA */}
        <section id="profile" className="glass-card rounded-3xl p-8 sm:p-12 border border-white/15 text-center space-y-6 bg-brand-surface/90">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.about.profileCta.heading}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {dict.about.profileCta.body}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              disabled
              title={lang === 'ar' ? 'الملف التعريفي قيد الاعتماد الرسمي' : 'Official profile PDF pending client approval'}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-zinc-400 bg-white/5 border border-white/10 cursor-not-allowed opacity-75"
            >
              <FileText className="w-4 h-4" />
              <span>{dict.about.profileCta.primaryCta}</span>
            </button>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all"
            >
              <span>{dict.about.profileCta.secondaryCta}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
