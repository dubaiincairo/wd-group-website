'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Eye, 
  Target, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function VisionMissionValues() {
  const { lang, dict } = useLanguage();

  return (
    <section id="about" className="py-24 sm:py-32 bg-brand-dark text-white border-t border-brand-border relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface border border-brand-border text-blue-400 mb-4 shadow-2xs">
            <Compass className="w-3.5 h-3.5" />
            <span>{dict.vmv.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight">
            {dict.vmv.title}
          </h2>
        </div>

        {/* 3 Pillars Grid (Vision, Mission, Values) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* VISION CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 flex flex-col justify-between shadow-xs group hover:border-blue-500/40 hover:shadow-glow-blue"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4">
                {dict.vmv.vision_title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                {dict.vmv.vision_desc}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 text-xs font-bold text-blue-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'ar' ? 'مواكبة لرؤية المملكة ٢٠٣٠' : 'Aligned with Saudi Vision 2030'}</span>
            </div>
          </motion.div>

          {/* MISSION CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 flex flex-col justify-between shadow-xs group hover:border-emerald-500/40 hover:shadow-glow-emerald"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4">
                {dict.vmv.mission_title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                {dict.vmv.mission_desc}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 text-xs font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'ar' ? 'كوادر وطنية وتقنيات متقدمة' : 'Qualified Talent & Advanced Tech'}</span>
            </div>
          </motion.div>

          {/* VALUES CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 flex flex-col justify-between shadow-xs group hover:border-amber-500/40 hover:shadow-glow-gold"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4">
                {dict.vmv.values_title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                {dict.vmv.values_desc}
              </p>
            </div>
            <div className="mt-4 pt-6 border-t border-white/5 text-xs font-bold text-amber-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'ar' ? 'التزام بالجودة والشفافية' : 'Institutional Governance & Ethics'}</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
