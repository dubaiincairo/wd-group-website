'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Quote, Sparkles, ShieldCheck } from 'lucide-react';

export default function CEOQuote() {
  const { lang, dict } = useLanguage();

  const ceoPhoto = (dict.home.ceo as any).photo_url || (dict.home.media as any)?.ceo_photo;

  return (
    <section className="py-20 sm:py-24 bg-[#08090C] text-white relative overflow-hidden border-t border-white/5">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-[#C9A86A]/20 shadow-2xl relative overflow-hidden bg-[#0F1117]/90"
        >
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* CEO Avatar / Executive Crest */}
            <div className="shrink-0 relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#E3C58A] via-[#C9A86A] to-[#8A7340] p-1 shadow-glow-camel border border-[#C9A86A]/40 flex items-center justify-center overflow-hidden shrink-0">
                {ceoPhoto ? (
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image 
                      src={ceoPhoto} 
                      alt={dict.home.ceo.name} 
                      fill 
                      sizes="(max-width: 640px) 112px, 144px"
                      className="object-cover" 
                    />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full bg-[#08090C] flex flex-col items-center justify-center text-center p-3 border border-white/10">
                    <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E3C58A] to-[#C9A86A] font-mono tracking-tight">WD</span>
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5 font-bold">{lang === 'ar' ? 'القيادة' : 'LEADERSHIP'}</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 rtl:-right-auto rtl:-left-1.5 w-9 h-9 rounded-full bg-[#C9A86A] border-2 border-[#0F1117] flex items-center justify-center text-[#0E1A24] shadow-glow-camel font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Quote Body */}
            <div className="space-y-6 text-center md:text-left rtl:md:text-right flex-1">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#C9A86A] bg-[#C9A86A]/10 border border-[#C9A86A]/20">
                <Quote className="w-3.5 h-3.5" />
                <span>{dict.home.ceo.label}</span>
              </div>

              <blockquote className={`text-base sm:text-lg md:text-xl text-zinc-100 font-medium leading-relaxed sm:leading-8 ${lang === 'en' ? 'font-serif' : ''}`}>
                &ldquo;{dict.home.ceo.quote}&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-base sm:text-lg font-bold text-white">
                    {dict.home.ceo.name}
                  </div>
                  <div className="text-xs text-[#C9A86A] font-semibold mt-0.5">
                    {dict.home.ceo.title}
                  </div>
                </div>

                <div className="text-xs font-mono text-zinc-500">
                  {lang === 'ar' ? 'مجموعة دبليو دي للأعمال' : 'WD Group for Business'}
                </div>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
