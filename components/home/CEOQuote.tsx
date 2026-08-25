'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Quote, ShieldCheck } from 'lucide-react';

export default function CEOQuote() {
  const { dict } = useLanguage();

  return (
    <section className="py-24 sm:py-32 bg-brand-darker text-white relative overflow-hidden border-t border-brand-border">
      
      {/* Radiant Executive Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none animate-pulse-slow"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Quote Icon with Glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-2xl bg-brand-surface border border-white/10 text-blue-400 flex items-center justify-center mx-auto mb-10 shadow-glow-blue"
        >
          <Quote className="w-8 h-8" />
        </motion.div>

        {/* The Approved Quote */}
        <motion.blockquote 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-100 leading-relaxed max-w-3xl mx-auto mb-12 tracking-tight"
        >
          &ldquo;{dict.ceo.quote}&rdquo;
        </motion.blockquote>

        {/* CEO Identity & Governance Credentials */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex flex-col items-center"
        >
          <div className="w-14 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mb-4 shadow-glow-blue"></div>
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-bold text-white tracking-tight">
              {dict.ceo.name}
            </h4>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span>LEADERSHIP</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">
            {dict.ceo.title}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
