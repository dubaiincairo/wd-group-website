'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  Download
} from 'lucide-react';

export default function AboutPage() {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';

  const heroImage = (dict.about as any)?.hero_image || '';
  const storyImage = (dict.about as any)?.story_image || '';
  const profilePdf = (dict.about as any)?.corporate_profile_pdf || '';

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* 1. About Hero */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl p-8 sm:p-14 overflow-hidden border border-white/10 bg-brand-surface/80 shadow-2xl"
        >
          {/* Background Hero Banner Image (if configured in Admin) */}
          {heroImage && (
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <Image
                src={heroImage}
                alt="WD Group"
                fill
                className="object-cover opacity-20 filter brightness-75 scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/85 to-brand-dark/60" />
            </div>
          )}

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
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

              {profilePdf ? (
                <a
                  href={profilePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/15 hover:border-blue-500/50 shadow-lg transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-blue-400" />
                  <span>{dict.about.hero.secondaryCta}</span>
                </a>
              ) : (
                <button
                  disabled
                  title={isAr ? 'الملف التعريفي قيد الاعتماد الرسمي' : 'Official profile PDF pending client approval'}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-zinc-400 bg-white/5 border border-white/10 cursor-not-allowed opacity-75"
                >
                  <FileText className="w-4 h-4" />
                  <span>{dict.about.hero.secondaryCta}</span>
                </button>
              )}
            </div>
          </div>
        </motion.section>

        {/* 2. Our Story & Heritage (with Story Image) */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden bg-brand-surface/80"
        >
          <div className={`grid grid-cols-1 ${storyImage ? 'lg:grid-cols-12' : ''} gap-8 items-center`}>
            <div className={`${storyImage ? 'lg:col-span-7' : 'max-w-3xl'} space-y-4`}>
              <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                {isAr ? 'مسيرة المجموعة' : 'GROUP HERITAGE'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {dict.about.story.heading}
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {dict.about.story.body}
              </p>
            </div>

            {storyImage && (
              <div className="lg:col-span-5 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                <Image
                  src={storyImage}
                  alt={dict.about.story.heading || 'WD Group Heritage'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              </div>
            )}
          </div>
        </motion.section>

        {/* 3. Vision 2030 Alignment (3 Pillars) */}
        <motion.section 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              {isAr ? 'مواكبة الرؤية الوطنية' : 'NATIONAL ALIGNMENT'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.about.vision2030.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.about.vision2030.pillars.map((pillar, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-3xl p-7 border border-white/10 hover:border-blue-500/50 hover:shadow-glow-blue transition-all space-y-4 bg-brand-surface/80 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                    {isAr ? `الركيزة 0${idx + 1}` : `PILLAR 0${idx + 1}`}
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
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 4. Geographic Footprint (Saudi Arabia) */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 bg-brand-surface/80"
        >
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              {isAr ? 'الانتشار الوطني' : 'NATIONAL REACH'}
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
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-blue-500/40 hover:bg-black/60 transition-all space-y-2 group"
              >
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{loc.city}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {loc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 5. Corporate Profile Download CTA */}
        <motion.section 
          id="profile" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-white/15 text-center space-y-6 bg-brand-surface/90"
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.about.profileCta.heading}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {dict.about.profileCta.body}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {profilePdf ? (
              <a
                href={profilePdf}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{dict.about.profileCta.primaryCta}</span>
              </a>
            ) : (
              <button
                disabled
                title={isAr ? 'الملف التعريفي قيد الاعتماد الرسمي' : 'Official profile PDF pending client approval'}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-zinc-400 bg-white/5 border border-white/10 cursor-not-allowed opacity-75"
              >
                <FileText className="w-4 h-4" />
                <span>{dict.about.profileCta.primaryCta}</span>
              </button>
            )}

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <span>{dict.about.profileCta.secondaryCta}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
