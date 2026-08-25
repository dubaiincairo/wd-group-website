'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Compass, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Lightbulb, 
  Scale, 
  Users,
  Globe,
  Layers,
  TrendingUp,
  CheckCircle2,
  Cpu,
  Handshake,
  Briefcase
} from 'lucide-react';

export default function VisionMissionValues() {
  const { lang, dict } = useLanguage();
  const [activeTab, setActiveTab] = useState<'values' | 'vision' | 'mission'>('values');

  const VALUE_ICONS = [Award, Lightbulb, Scale, Users];

  const VISION_CARDS = lang === 'ar' ? [
    {
      icon: Compass,
      title: 'المساهمة في الاقتصاد الوطني',
      desc: 'أن نكون مجموعة سعودية رائدة تُسهم في بناء اقتصاد وطني متنوع ومستدام يواكب مستهدفات رؤية المملكة 2030.',
    },
    {
      icon: Globe,
      title: 'الريادة الإقليمية والدولية',
      desc: 'توسيع الحضور الاستثماري والتجاري إقليميًا ودوليًا من خلال الجودة العالية والابتكار المستمر في كافة العمليات.',
    },
    {
      icon: Layers,
      title: 'التكامل والتنوع الاستثماري',
      desc: 'دمج وتكامل قطاعات الضيافة والتصنيع والمقاولات تحت مظلة تشغيلية موحدة تحقق أعلى مستويات التناغم والقيمة.',
    },
    {
      icon: TrendingUp,
      title: 'بناء أثر مؤسسي مستدام',
      desc: 'ترسيخ مبادئ الحوكمة والنمو المتوازن لبناء كيان اقتصادي راسخ يخدم الأجيال القادمة والشركاء والمجتمع.',
    },
  ] : [
    {
      icon: Compass,
      title: 'National Economic Impact',
      desc: 'To be a premier Saudi business group actively contributing to a diversified and sustainable national economy aligned with Vision 2030.',
    },
    {
      icon: Globe,
      title: 'Regional & Global Expansion',
      desc: 'Expanding our investment footprint regionally and internationally through uncompromising quality standards and continuous innovation.',
    },
    {
      icon: Layers,
      title: 'Synergistic Value Chain',
      desc: 'Uniting hospitality, precision manufacturing, and turnkey contracting into a coordinated operational ecosystem.',
    },
    {
      icon: TrendingUp,
      title: 'Enduring Enterprise Value',
      desc: 'Fostering institutional governance, robust scalability, and generational growth across the Kingdom of Saudi Arabia.',
    },
  ];

  const MISSION_CARDS = lang === 'ar' ? [
    {
      icon: CheckCircle2,
      title: 'أعلى معايير الجودة والتميز',
      desc: 'تقديم منتجات وخدمات استثنائية في قطاعات الضيافة والتصنيع والمقاولات تُطبّق أدق المعايير القياسية العالمية.',
    },
    {
      icon: Cpu,
      title: 'التقنيات الصناعية الحديثة',
      desc: 'توظيف أحدث المعدات وخطوط الإنتاج والحلول الرقمية لرفع الكفاءة التشغيلية وضمان الدقة في كافة مراحل التنفيذ.',
    },
    {
      icon: Users,
      title: 'تمكين الكفاءات الوطنية',
      desc: 'استقطاب وتأهيل الكوادر الوطنية المتخصصة وتوفير بيئة مهنية محفزة تدعم التطوير والإبداع المستمر.',
    },
    {
      icon: Handshake,
      title: 'صناعة القيمة للشراكات',
      desc: 'بناء علاقات استراتيجية متينة مع عملائنا وشركائنا قائمة على المصداقية والالتزام التام والنمو المشترك المستدام.',
    },
  ] : [
    {
      icon: CheckCircle2,
      title: 'High-Standard Deliverables',
      desc: 'Delivering exceptional products and services across hospitality, industrial manufacturing, and turnkey contracting.',
    },
    {
      icon: Cpu,
      title: 'Advanced Technology & Modern Methods',
      desc: 'Equipping specialized factories and project teams with state-of-the-art machinery and efficient digital workflows.',
    },
    {
      icon: Users,
      title: 'Qualified Talent & National Leadership',
      desc: 'Empowering specialized teams and nurturing high-caliber Saudi talent across executive, engineering, and operational roles.',
    },
    {
      icon: Handshake,
      title: 'Lasting Value for Partners',
      desc: 'Building trusted, long-term relationships with clients and stakeholders founded on transparency, reliability, and mutual success.',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-brand-dark text-white relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface border border-brand-border text-blue-400 shadow-glow-card">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.home.identity.label}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {dict.home.identity.label}
          </h2>
        </div>

        {/* Tab Navigation (Core Values First) */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-brand-surface border border-white/10 backdrop-blur-md">
            
            {/* 1. Core Values Tab Button (Default & First) */}
            <button
              type="button"
              onClick={() => setActiveTab('values')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'values'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{dict.home.identity.values_title}</span>
            </button>

            {/* 2. Vision Tab Button */}
            <button
              type="button"
              onClick={() => setActiveTab('vision')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'vision'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{dict.home.identity.vision_title}</span>
            </button>

            {/* 3. Mission Tab Button */}
            <button
              type="button"
              onClick={() => setActiveTab('mission')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'mission'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>{dict.home.identity.mission_title}</span>
            </button>

          </div>
        </div>

        {/* Tab Content Display - Smart, Balanced & Compact 2x2 Grids */}
        <div className="max-w-4xl mx-auto min-h-[320px]">
          
          {/* ══════════ TAB 1: CORE VALUES (Default) ══════════ */}
          {activeTab === 'values' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 animate-in fade-in duration-200">
              {dict.home.identity.values.map((val, idx) => {
                const Icon = VALUE_ICONS[idx % VALUE_ICONS.length];
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#0F1117]/90 border border-white/10 hover:border-blue-500/40 hover:bg-[#121622] transition-all flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0 mt-0.5 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                        {val.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ══════════ TAB 2: SMART COMPACT VISION ══════════ */}
          {activeTab === 'vision' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 animate-in fade-in duration-200">
              {VISION_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#0F1117]/90 border border-white/10 hover:border-blue-500/40 hover:bg-[#121622] transition-all flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0 mt-0.5 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ══════════ TAB 3: SMART COMPACT MISSION ══════════ */}
          {activeTab === 'mission' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 animate-in fade-in duration-200">
              {MISSION_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#0F1117]/90 border border-white/10 hover:border-blue-500/40 hover:bg-[#121622] transition-all flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0 mt-0.5 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
