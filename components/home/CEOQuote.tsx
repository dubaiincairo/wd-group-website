'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Quote, Sparkles } from 'lucide-react';

export default function CEOQuote() {
  const { lang, dict } = useLanguage();

  return (
    <section className="py-20 sm:py-24 bg-brand-dark text-white relative overflow-hidden">
      
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-accent/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Quote Icon */}
        <div className="w-14 h-14 rounded-2xl bg-brand-surface border border-brand-slate text-brand-accent flex items-center justify-center mx-auto mb-8 shadow-md">
          <Quote className="w-7 h-7" />
        </div>

        {/* The Approved Quote */}
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-100 leading-relaxed max-w-3xl mx-auto mb-10 tracking-tight">
          &ldquo;{dict.ceo.quote}&rdquo;
        </blockquote>

        {/* CEO Identity */}
        <div className="inline-flex flex-col items-center">
          <div className="w-12 h-1 rounded-full bg-brand-accent mb-4"></div>
          <h4 className="text-lg font-bold text-white tracking-tight">
            {dict.ceo.name}
          </h4>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">
            {dict.ceo.title}
          </p>
        </div>

      </div>
    </section>
  );
}
