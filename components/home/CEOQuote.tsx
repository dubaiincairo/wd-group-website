'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Quote } from 'lucide-react';

export default function CEOQuote() {
  const { lang, dict } = useLanguage();

  return (
    <section className="py-20 sm:py-28 bg-gray-50 border-y border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Quote Icon (Untitled UI Testimonial Pattern) */}
        <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 text-brand-600 flex items-center justify-center mx-auto mb-8 shadow-xs">
          <Quote className="w-6 h-6" />
        </div>

        {/* Large Testimonial Quote */}
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed mb-10 tracking-tight">
          &ldquo;{dict.ceo.quote}&rdquo;
        </blockquote>

        {/* Author Avatar & Identity (Untitled UI Style) */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm mb-3 shadow-xs border border-gray-300">
            MS
          </div>
          <div className="text-base font-semibold text-gray-900 tracking-tight">
            {dict.ceo.name}
          </div>
          <div className="text-sm text-gray-600 mt-0.5 font-normal">
            {dict.ceo.title}
          </div>
        </div>

      </div>
    </section>
  );
}
