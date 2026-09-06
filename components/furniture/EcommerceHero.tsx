'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { HERO_SLIDES } from './hero/heroTypes';
import HeroOption3Panoramic from './hero/HeroOption3Panoramic';

export default function EcommerceHero() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-center pt-20 sm:pt-24 pb-4 overflow-hidden">
      
      {/* Approved Master Hero: Option 3 - Panoramic Wide Horizon with Floating Glassmorphic Console Island */}
      <HeroOption3Panoramic
        slide={slide}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        isAr={isAr}
      />

    </section>
  );
}
