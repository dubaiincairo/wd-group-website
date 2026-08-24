'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import HeroSectionVideo from '@/components/home/HeroSectionVideo';
import SectorsHub from '@/components/home/SectorsHub';
import HoldingSynergy from '@/components/home/HoldingSynergy';
import VisionMissionValues from '@/components/home/VisionMissionValues';
import CEOQuote from '@/components/home/CEOQuote';
import ContactCTA from '@/components/home/ContactCTA';
import SectionDivider from '@/components/layout/SectionDivider';
import { Sparkles, ArrowLeft, ArrowRight, Eye } from 'lucide-react';

export default function StudioTrialPage() {
  const { lang } = useLanguage();

  return (
    <div className="relative min-h-screen bg-brand-dark">
      
      {/* Studio Trial Top Banner */}
      <div className="sticky top-20 z-40 bg-gradient-to-r from-blue-900/90 via-sky-900/90 to-indigo-900/90 backdrop-blur-xl border-b border-white/20 py-2.5 px-4 sm:px-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="font-extrabold tracking-wider uppercase text-sky-300 font-mono">
              {lang === 'ar' ? 'استوديو تجارب الواجهة الرئيسية (Studio Trial)' : 'HOMEPAGE STUDIO TRIAL'}
            </span>
            <span className="text-zinc-400 hidden sm:inline">•</span>
            <span className="text-zinc-300 hidden sm:inline">
              {lang === 'ar' 
                ? 'النسخة الجديدة مع خلفيات الفيديو السينمائية وسلسلة القيمة' 
                : 'New version featuring ambient video loops and value chain synergy'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-sky-300" />
              <span>{lang === 'ar' ? 'الواجهة الرئيسية الحالية' : 'Live Main Homepage'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Section 1: Video Hero & Section 2: Statistics Bar */}
      <HeroSectionVideo />

      {/* Blueprint Architectural Divider */}
      <SectionDivider label="STRATEGIC SECTORS" />

      {/* Section 3: Strategic Sectors (Hospitality, Manufacturing, Contracting) */}
      <SectorsHub />

      {/* Blueprint Architectural Divider */}
      <SectionDivider label="VALUE CHAIN SYNERGY" />

      {/* Section 3.5: Integrated Holding Synergy & Lifecycle Value Chain */}
      <HoldingSynergy />

      {/* Blueprint Architectural Divider */}
      <SectionDivider label="GOVERNANCE & VISION" />

      {/* Section 4: Vision, Mission & Values */}
      <VisionMissionValues />

      {/* Section 5: CEO Quote & Governance */}
      <CEOQuote />

      {/* Section 6: Main Contact & Partnership CTA */}
      <ContactCTA />
    </div>
  );
}
