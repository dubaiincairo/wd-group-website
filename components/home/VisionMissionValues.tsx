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
  Layers,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Handshake,
  Building2
} from 'lucide-react';

export default function VisionMissionValues() {
  const { lang, dict } = useLanguage();
  const [activeTab, setActiveTab] = useState<'values' | 'vision' | 'mission'>('values');

  const VALUE_ICONS = [Award, Lightbulb, Scale, Users];

  const VISION_PILLARS = lang === 'ar' ? [
    {
      icon: Layers,
      title: 'التنوع الاستراتيجي المتكامل',
      desc: 'دمج وتكامل قطاعات الضيافة والتصنيع والمقاولات تحت مظلة استثمارية وتشغيلية موحدة تحقق أعلى مستويات التناغم.',
    },
    {
      icon: Sparkles,
      title: 'مواكبة رؤية السعودية 2030',
      desc: 'المساهمة الفاعلة في توطين الصناعات المعمارية، وتطوير البنية السياحية، وتنويع روافد الاقتصاد الوطني.',
    },
    {
      icon: TrendingUp,
      title: 'بناء قيمة مؤسسية مستدامة',
      desc: 'ترسيخ مبادئ الحوكمة المؤسسية والنمو المتوازن، لبناء كيان اقتصادي راسخ يخدم الأجيال القادمة والمجتمع.',
    },
  ] : [
    {
      icon: Layers,
      title: 'Integrated Strategic Diversification',
      desc: 'Uniting hospitality, precision manufacturing, and turnkey contracting into a synchronized corporate ecosystem.',
    },
    {
      icon: Sparkles,
      title: 'Saudi Vision 2030 Alignment',
      desc: 'Actively driving national industrial localization, sustainable hospitality growth, and domestic economic diversification.',
    },
    {
      icon: TrendingUp,
      title: 'Enduring Enterprise Value',
      desc: 'Fostering institutional governance, robust scalability, and generational growth across the Kingdom of Saudi Arabia.',
    },
  ];

  const MISSION_PILLARS = lang === 'ar' ? [
    {
      icon: CheckCircle2,
      title: 'الجودة والمعايير القياسية',
      desc: 'تطبيق أعلى معايير الجودة العالمية في تشغيل الفنادق وخطوط الإنتاج المتخصصة والتنفيذ الهندسي المتقن.',
    },
    {
      icon: Cpu,
      title: 'التقنيات الحديثة والكفاءات',
      desc: 'تجهيز المصانع بأحدث التقنيات والمعدات المتطورة، وتمكين الكوادر الوطنية المتخصصة لصناعة الفارق.',
    },
    {
      icon: Handshake,
      title: 'صناعة القيمة للشراكات',
      desc: 'تقديم حلول متكاملة وموثوقة لشركائنا في القطاعين الخاص والحكومي بأعلى درجات الالتزام والشفافية.',
    },
  ] : [
    {
      icon: CheckCircle2,
      title: 'Execution Rigor & Quality Standards',
      desc: 'Enforcing uncompromising international benchmarks across hotel operations, joinery manufacturing, and fit-out delivery.',
    },
    {
      icon: Cpu,
      title: 'Modern Industrial Engineering',
      desc: 'Empowering specialized production hubs with advanced machinery while nurturing high-caliber Saudi talent.',
    },
    {
      icon: Handshake,
      title: 'Trusted Client Partnerships',
      desc: 'Delivering dependable, transparent, and high-value solutions to institutional, commercial, and private stakeholders.',
    },
  ];

  return (
    <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface border border-brand-border text-blue-400 shadow-glow-card">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.home.identity.label}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {dict.home.identity.label}
          </h2>
        </div>

        {/* Tab Navigation (Core Values First) */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-brand-surface border border-white/10 backdrop-blur-md">
            
            {/* 1. Core Values Tab Button (Default & First) */}
            <button
              type="button"
              onClick={() => setActiveTab('values')}
              className={`px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
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
              className={`px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
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
              className={`px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
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

        {/* Tab Content Display */}
        <div className="max-w-5xl mx-auto">
          
          {/* ══════════ TAB 1: CORE VALUES (Default) ══════════ */}
          {activeTab === 'values' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-in fade-in zoom-in-95 duration-300">
              {dict.home.identity.values.map((val, idx) => {
                const Icon = VALUE_ICONS[idx % VALUE_ICONS.length];
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-3xl bg-brand-surface/90 border border-white/10 hover:border-blue-500/40 hover:shadow-glow-blue transition-all flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {val.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ══════════ TAB 2: ENHANCED VISION ══════════ */}
          {activeTab === 'vision' && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Primary Vision Statement Card */}
              <div className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/30 shadow-2xl relative overflow-hidden bg-brand-surface/80">
                <div className="flex items-center gap-2.5 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider mb-5">
                  <Compass className="w-4 h-4" />
                  <span>{dict.home.identity.vision_title}</span>
                </div>
                <blockquote className="text-xl sm:text-2xl md:text-3xl text-white leading-relaxed font-semibold">
                  &ldquo;{dict.home.identity.vision_desc}&rdquo;
                </blockquote>
              </div>

              {/* 3 Strategic Horizons Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {VISION_PILLARS.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-6 rounded-2xl bg-[#0F1117]/90 border border-white/10 hover:border-blue-500/40 hover:bg-[#121622] transition-all space-y-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ══════════ TAB 3: ENHANCED MISSION ══════════ */}
          {activeTab === 'mission' && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Primary Mission Statement Card */}
              <div className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/30 shadow-2xl relative overflow-hidden bg-brand-surface/80">
                <div className="flex items-center gap-2.5 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider mb-5">
                  <Target className="w-4 h-4" />
                  <span>{dict.home.identity.mission_title}</span>
                </div>
                <blockquote className="text-xl sm:text-2xl md:text-3xl text-white leading-relaxed font-semibold">
                  &ldquo;{dict.home.identity.mission_desc}&rdquo;
                </blockquote>
              </div>

              {/* 3 Operational Commitments Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {MISSION_PILLARS.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-6 rounded-2xl bg-[#0F1117]/90 border border-white/10 hover:border-blue-500/40 hover:bg-[#121622] transition-all space-y-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
