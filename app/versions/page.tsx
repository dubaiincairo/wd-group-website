'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Sparkles, 
  Eye, 
  Check, 
  Layers, 
  Video, 
  Image as ImageIcon, 
  Sliders, 
  Compass, 
  ArrowRight,
  ExternalLink,
  Zap,
  Globe
} from 'lucide-react';

import Version1Hero from '@/components/versions/Version1Hero';
import Version2Hero from '@/components/versions/Version2Hero';
import Version3Hero from '@/components/versions/Version3Hero';
import HeroSectionClassic from '@/components/home/HeroSection';
import HeroSectionVideo from '@/components/home/HeroSectionVideo';
import SectorsHub from '@/components/home/SectorsHub';
import HoldingSynergy from '@/components/home/HoldingSynergy';
import VisionMissionValues from '@/components/home/VisionMissionValues';
import CEOQuote from '@/components/home/CEOQuote';
import ContactCTA from '@/components/home/ContactCTA';

const VERSIONS = [
  {
    id: 'v1',
    num: '01',
    titleEn: 'Executive Dark Minimalist (Aurora Glow)',
    titleAr: 'النموذج الأول: الأسود التنفيذي الفاخر (شفق ملون ناعم)',
    tagEn: 'Original Untitled UI Baseline',
    tagAr: 'النسخة الأصلية الأكثر هدوءاً',
    descEn: 'Clean, typography-first executive dark theme with subtle sapphire, emerald, and gold ambient aurora glows and minimal stats glass card.',
    descAr: 'تصميم تنفيذي هادئ يركز على العناوين والطباعة الفاخرة مع خلفية ناعمة وشريط إحصائيات زجاجي.',
    badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
    icon: Sparkles,
    route: '/versions/1-executive-dark',
  },
  {
    id: 'v2',
    num: '02',
    titleEn: 'Interactive Value Synergy Symphony',
    titleAr: 'النموذج الثاني: سينرجي سلسلة القيمة التفاعلية',
    tagEn: '3-Node Connected Holding Model',
    tagAr: '٣ بطاقات متصلة لسلسلة القيمة',
    descEn: 'Focuses on the 3-step value chain (Manufacture -> Build -> Operate) directly in the hero with interactive states for each subsidiary.',
    descAr: 'يركز على سلسلة القيمة المتكاملة (التصنيع -> التجهيز -> التشغيل الفندقي) مباشرة في الترويسة مع بطاقات تفاعلية.',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    icon: Layers,
    route: '/versions/2-value-synergy',
  },
  {
    id: 'v3',
    num: '03',
    titleEn: 'Split Visual Showcase (Left Tabs + Right Grand Photo Frame)',
    titleAr: 'النموذج الثالث: المعرض المقسم التفاعلي (قائمة + إطار فوتوغرافي)',
    tagEn: 'Editorial Sector Photography',
    tagAr: 'صور معمارية وفندقية فاخرة',
    descEn: 'Modern split layout: left side has typography and interactive sector switches with hotel counts; right side has a framed high-res photo showcase.',
    descAr: 'تخطيط مقسم حديث: القائمة اليسرى للتنقل بين القطاعات، والجانب الأيمن يعرض إطارًا فوتوغرافيًا واسعًا للمنشآت.',
    badgeColor: 'border-sky-500/40 text-sky-300 bg-sky-500/10',
    icon: Sliders,
    route: '/versions/3-split-showcase',
  },
  {
    id: 'v4',
    num: '04',
    titleEn: 'Full Cinematic Photo Stage (Auto-Cycle Photography)',
    titleAr: 'النموذج الرابع: المسرح الفوتوغرافي السينمائي الشامل',
    tagEn: 'Full-Bleed Photo Backgrounds',
    tagAr: 'خلفيات فوتوغرافية متغيرة',
    descEn: 'Full-bleed high-definition photography backdrop that crossfades smoothly across SwissBlue, GreenWood, and Projects with centered dock.',
    descAr: 'شاشة كاملة بخلفيات فوتوغرافية عالية الدقة تتغير تلقائيًا وتفاعليًا مع دوك التحكم الأوسط للقطاعات الثلاثة.',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    icon: ImageIcon,
    route: '/versions/4-cinematic-photo',
  },
  {
    id: 'v5',
    num: '05',
    titleEn: 'Ambient Video Backdrops & Blueprint Guides',
    titleAr: 'النموذج الخامس: خلفيات الفيديو السينمائية والأدلة الهندسية',
    tagEn: 'Self-Hosted MP4 Video Loops',
    tagAr: 'فيديوهات سينمائية حية + أدلة معمارية',
    descEn: 'Ultra-luxurious Category 1 art direction with continuous 720p self-hosted video loops, blueprint crosshairs, and full holding synergy.',
    descAr: 'أعلى درجات الفخامة البصرية: مقاطع فيديو حية للقطاعات الثلاثة تعمل بسلاسة مع أدلة معمارية وشريط إحصائيات متطور.',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
    icon: Video,
    route: '/versions/5-ambient-video',
  },
];

export default function VersionsStudioPage() {
  const { lang, toggleLanguage } = useLanguage();
  const [activeVersion, setActiveVersion] = useState<string>('v4');

  return (
    <div className="min-h-screen bg-[#08090C] text-white">
      
      {/* Studio Header Bar */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/15 px-4 sm:px-8 py-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-glow-blue">
              WD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 font-mono">
                  HOMEPAGE VERSIONS STUDIO
                </span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
                  5 VERSIONS
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                {lang === 'ar' 
                  ? 'استعرض جميع إصدارات الصفحة الرئيسية السابقة واختر منها ما يناسبك' 
                  : 'Compare all previous homepage versions and select your preferred design'}
              </p>
            </div>
          </div>

          {/* Quick Switch Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {VERSIONS.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveVersion(v.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeVersion === v.id
                    ? 'bg-blue-600 text-white shadow-glow-blue border border-blue-400'
                    : 'bg-brand-surface text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                <span>{v.num}</span>
                <span className="hidden md:inline">{lang === 'ar' ? v.tagAr : v.tagEn}</span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-300 hover:text-white bg-white/5 border border-white/10 flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 border border-white/15"
            >
              {lang === 'ar' ? 'الواجهة الحالية' : 'Live Homepage'}
            </Link>
          </div>

        </div>
      </div>

      {/* Version Selector Carousel Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {VERSIONS.map((v) => {
            const isSelected = activeVersion === v.id;
            const Icon = v.icon;
            return (
              <div
                key={v.id}
                onClick={() => setActiveVersion(v.id)}
                className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-blue-950/40 border-blue-400 shadow-glow-blue ring-1 ring-blue-400/50 scale-[1.02]' 
                    : 'bg-brand-surface/70 border-white/10 hover:border-white/20 hover:bg-brand-surface'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-extrabold text-blue-400">
                      VERSION {v.num}
                    </span>
                    <Icon className="w-4 h-4 text-zinc-400" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1.5 leading-snug">
                    {lang === 'ar' ? v.titleAr : v.titleEn}
                  </h4>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {lang === 'ar' ? v.descAr : v.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${v.badgeColor}`}>
                    {lang === 'ar' ? v.tagAr : v.tagEn}
                  </span>
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'معروض' : 'Active'}</span>
                      </span>
                    ) : (
                      <span>{lang === 'ar' ? 'معاينة' : 'Preview'}</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Active Hero Preview Canvas */}
      <div className="border-y border-white/15 relative">
        <div className="absolute top-4 right-4 z-30 px-3 py-1 rounded-full bg-black/80 border border-white/20 text-xs font-mono font-bold text-sky-400 backdrop-blur-md">
          PREVIEW: {VERSIONS.find(v => v.id === activeVersion)?.num} — {VERSIONS.find(v => v.id === activeVersion)?.titleEn}
        </div>

        {activeVersion === 'v1' && <Version1Hero />}
        {activeVersion === 'v2' && <Version2Hero />}
        {activeVersion === 'v3' && <Version3Hero />}
        {activeVersion === 'v4' && <HeroSectionClassic />}
        {activeVersion === 'v5' && <HeroSectionVideo />}
      </div>

      {/* Homepage Remaining Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            COMMON HOLDING SECTIONS (INCLUDED IN ALL VERSIONS)
          </span>
        </div>
      </div>

      <SectorsHub />
      <HoldingSynergy />
      <VisionMissionValues />
      <CEOQuote />
      <ContactCTA />

    </div>
  );
}
