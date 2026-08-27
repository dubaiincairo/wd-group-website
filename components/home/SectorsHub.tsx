'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Building2, Factory, HardHat, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SectorsHub() {
  const { lang, dict } = useLanguage();
  const mediaConfig = (dict.home as any)?.media || {};
  const photoHospitality = mediaConfig.sector_photo_hospitality || '';
  const photoManufacturing = mediaConfig.sector_photo_manufacturing || '';
  const photoContracting = mediaConfig.sector_photo_contracting || '';

  return (
    <section id="sectors" className="py-20 sm:py-24 bg-brand-dark text-white relative overflow-hidden bg-blueprint-grid border-t border-white/5">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#0F1117]/90 border border-[#C9A86A]/30 text-[#C9A86A] shadow-glow-camel">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-mono">{dict.home.sectors.label}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight ${lang === 'en' ? 'font-serif' : ''}`}>
            {dict.home.sectors.heading}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl mx-auto font-normal">
            {dict.home.sectors.intro}
          </p>
        </motion.div>

        {/* 3 Sectors Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
          
          {/* 1. Hospitality (SwissBlue) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl p-7 flex flex-col justify-between border border-sky-500/20 hover:border-sky-400/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.2)] transition-all group relative overflow-hidden"
          >
            <div>
              {/* Card Photo Header */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-sky-500/40 transition-colors bg-gradient-to-br from-[#0c1a2e] via-[#091220] to-[#060a12] flex items-center justify-center">
                {photoHospitality ? (
                  <>
                    <Image
                      src={photoHospitality}
                      alt="SwissBlue Hospitality"
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-black/20 pointer-events-none" />
                  </>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] [background-opacity:0.15]">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-glow-sky group-hover:scale-110 transition-transform">
                      <Building2 className="w-7 h-7" />
                    </div>
                  </div>
                )}
                <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#1A476A]/90 text-sky-200 backdrop-blur-md border border-sky-400/30 shadow-lg">
                  {dict.home.sectors.hospitality.proof}
                </span>
              </div>

              {/* Title & Slogan */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {dict.home.sectors.hospitality.title}
                  </h3>
                  <p className="text-xs text-sky-400 font-semibold">
                    {dict.home.sectors.hospitality.eyebrow}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                {dict.home.sectors.hospitality.desc}
              </p>

              {/* Verified Properties List */}
              <div className="space-y-1.5 mb-6 text-xs text-zinc-400 border-t border-white/5 pt-4">
                {[
                  lang === 'ar' ? 'فندق سويس بلو جدة' : 'SwissBlue Hotel Jeddah',
                  lang === 'ar' ? 'سويس بلو ريزدنس جدة شرق' : 'SwissBlue Residence Jeddah East',
                  lang === 'ar' ? 'سويس بلو ريزدنس جدة غرب' : 'SwissBlue Residence Jeddah West',
                  lang === 'ar' ? 'شقق سويس بلو بلازا – جازان' : 'SwissBlue Plaza Jazan',
                ].map((prop, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="text-[11px] text-zinc-300">{prop}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/sectors/hospitality"
              className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl font-bold text-xs bg-[#1A476A]/40 hover:bg-[#1A476A] text-sky-200 border border-sky-400/30 hover:border-sky-400 transition-all group/btn"
            >
              <span>{dict.home.sectors.hospitality.cta}</span>
              <ArrowRight className="w-4 h-4 text-sky-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180 transition-all" />
            </Link>

          </motion.div>

          {/* 2. Manufacturing & Furniture (GreenWood) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl p-7 flex flex-col justify-between border border-emerald-500/20 hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(52,211,153,0.2)] transition-all group relative overflow-hidden"
          >
            <div>
              {/* Card Photo Header */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-emerald-500/40 transition-colors bg-gradient-to-br from-[#081a14] via-[#05120e] to-[#030a08] flex items-center justify-center">
                {photoManufacturing ? (
                  <>
                    <Image
                      src={photoManufacturing}
                      alt="GreenWood Manufacturing"
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-black/20 pointer-events-none" />
                  </>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px] [background-opacity:0.15]">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-glow-emerald group-hover:scale-110 transition-transform">
                      <Factory className="w-7 h-7" />
                    </div>
                  </div>
                )}
                <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#0B5C3D]/90 text-emerald-200 backdrop-blur-md border border-emerald-400/30 shadow-lg">
                  {dict.home.sectors.manufacturing.proof}
                </span>
              </div>

              {/* Title & Slogan */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Factory className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {dict.home.sectors.manufacturing.title}
                  </h3>
                  <p className="text-xs text-emerald-400 font-semibold">
                    {dict.home.sectors.manufacturing.eyebrow}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                {dict.home.sectors.manufacturing.desc}
              </p>

              {/* Capabilities List */}
              <div className="space-y-1.5 mb-6 text-xs text-zinc-400 border-t border-white/5 pt-4">
                {[
                  lang === 'ar' ? 'أعمال النجارة والأثاث المخصص' : 'Custom Woodworking & Joinery',
                  lang === 'ar' ? 'حلول الألومنيوم والمعادن المعمارية' : 'Architectural Aluminum & Metal',
                  lang === 'ar' ? 'أثاث المشروعات والمفروشات والتنجيد' : 'Contract Furniture & Upholstery',
                  lang === 'ar' ? 'إدارة الإنتاج وتخطيط الموارد (ERP)' : 'Odoo ERP Production Control',
                ].map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-[11px] text-zinc-300">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/sectors/manufacturing"
              className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl font-bold text-xs bg-[#0B5C3D]/40 hover:bg-[#0B5C3D] text-emerald-200 border border-emerald-400/30 hover:border-emerald-400 transition-all group/btn"
            >
              <span>{dict.home.sectors.manufacturing.cta}</span>
              <ArrowRight className="w-4 h-4 text-emerald-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180 transition-all" />
            </Link>

          </motion.div>

          {/* 3. Contracting & Fit-Out (Projects) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl p-7 flex flex-col justify-between border border-amber-500/20 hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(251,191,36,0.2)] transition-all group relative overflow-hidden"
          >
            <div>
              {/* Card Photo Header */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-amber-500/40 transition-colors bg-gradient-to-br from-[#1c1408] via-[#140e05] to-[#0a0702] flex items-center justify-center">
                {photoContracting ? (
                  <>
                    <Image
                      src={photoContracting}
                      alt="WD Contracting & Projects"
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-black/20 pointer-events-none" />
                  </>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px] [background-opacity:0.15]">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-glow-gold group-hover:scale-110 transition-transform">
                      <HardHat className="w-7 h-7" />
                    </div>
                  </div>
                )}
                <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#8A7340]/90 text-amber-200 backdrop-blur-md border border-amber-400/30 shadow-lg">
                  {dict.home.sectors.contracting.proof}
                </span>
              </div>

              {/* Title & Slogan */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {dict.home.sectors.contracting.title}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold">
                    {dict.home.sectors.contracting.eyebrow}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                {dict.home.sectors.contracting.desc}
              </p>

              {/* Capabilities List */}
              <div className="space-y-1.5 mb-6 text-xs text-zinc-400 border-t border-white/5 pt-4">
                {[
                  lang === 'ar' ? 'التشطيبات المعمارية الفاخرة' : 'Turnkey Architectural Fit-Out',
                  lang === 'ar' ? 'الأعمال الكهروميكانيكية المتكاملة' : 'MEP Infrastructure Engineering',
                  lang === 'ar' ? 'تجهيز الفنادق والمنشآت التجارية' : 'Commercial & Hotel Fit-Out',
                  lang === 'ar' ? 'إشراف هندسي وضمان الجودة' : 'QA/QC Engineering Supervision',
                ].map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-[11px] text-zinc-300">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/sectors/contracting"
              className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl font-bold text-xs bg-[#8A7340]/40 hover:bg-[#8A7340] text-amber-200 border border-amber-400/30 hover:border-amber-400 transition-all group/btn"
            >
              <span>{dict.home.sectors.contracting.cta}</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180 transition-all" />
            </Link>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
