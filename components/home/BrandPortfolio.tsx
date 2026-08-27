'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Sparkles, 
  ArrowUpRight, 
  Factory, 
  HardHat, 
  Hotel,
  Shield
} from 'lucide-react';

export default function BrandPortfolio() {
  const { lang, dict } = useLanguage();

  const BRANDS = [
    {
      id: 'swissblue',
      name: 'SwissBlue',
      nameAr: 'سويس بلو',
      badge: lang === 'ar' ? '6 منشآت فندقية' : '6 Properties',
      category: lang === 'ar' ? 'قطاع الضيافة' : 'Hospitality Brand',
      fullName: lang === 'ar' ? 'فنادق ومنتجعات سويس بلو' : 'SwissBlue Hotels & Resorts',
      desc: lang === 'ar' ? 'منظومة الضيافة الفندقية الرائدة بمواقع استراتيجية في المملكة' : 'Premier hospitality brand operating 6 distinguished properties across Saudi Arabia.',
      link: '/sectors/hospitality',
      color: 'from-sky-500/20 via-sky-600/10 to-transparent',
      borderColor: 'hover:border-sky-400/50',
      badgeBg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
      icon: Building2,
      accentColor: 'text-sky-400',
    },
    {
      id: 'vinas',
      name: 'Vinas',
      nameAr: 'فيناس',
      badge: lang === 'ar' ? 'جدة' : 'Jeddah',
      category: lang === 'ar' ? 'أجنحة فندقية' : 'Hotel & Suites',
      fullName: lang === 'ar' ? 'فندق وأجنحة فيناس' : 'Vinas Hotel & Suites',
      desc: lang === 'ar' ? 'إقامة فندقية عصرية وأجنحة مجهزة بأعلى معايير الراحة في مدينة جدة' : 'Contemporary serviced residences and boutique suites in prime Jeddah.',
      link: '/sectors/hospitality',
      color: 'from-blue-500/20 via-blue-600/10 to-transparent',
      borderColor: 'hover:border-blue-400/50',
      badgeBg: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
      icon: Hotel,
      accentColor: 'text-blue-400',
    },
    {
      id: 'tulip',
      name: 'Tulip',
      nameAr: 'توليب',
      badge: lang === 'ar' ? 'نجران' : 'Najran',
      category: lang === 'ar' ? 'أجنحة فندقية فاخرة' : 'Luxury Hotel Suites',
      fullName: lang === 'ar' ? 'أجنحة توليب الفندقية' : 'Tulip Suites',
      desc: lang === 'ar' ? 'أجنحة ووحدات ضيافة بوتيكية فاخرة لرجال الأعمال والعائلات في نجران' : 'Boutique hospitality suites delivering comfort for business & leisure in Najran.',
      link: '/sectors/hospitality',
      color: 'from-purple-500/20 via-purple-600/10 to-transparent',
      borderColor: 'hover:border-purple-400/50',
      badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      icon: Sparkles,
      accentColor: 'text-purple-400',
    },
    {
      id: 'watandesign',
      name: 'WatanDesign',
      nameAr: 'تصاميم الوطن',
      badge: lang === 'ar' ? 'تنفيذ شامل' : 'Turnkey Execution',
      category: lang === 'ar' ? 'المقاولات والتجهيز الداخلي' : 'Contracting & Fit-Out',
      fullName: lang === 'ar' ? 'شركة تصاميم الوطن المحدودة' : 'Watan Designs Ltd.',
      desc: lang === 'ar' ? 'المقاولات المتكاملة، الهندسة المعمارية، والتجهيز الداخلي الفندقي والتجاري' : 'Turnkey contracting, architectural fit-out, and joinery engineering.',
      link: '/sectors/contracting',
      color: 'from-amber-500/20 via-amber-600/10 to-transparent',
      borderColor: 'hover:border-amber-400/50',
      badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      icon: HardHat,
      accentColor: 'text-amber-400',
    },
    {
      id: 'greenwood',
      name: 'GreenWood',
      nameAr: 'جرين وود',
      badge: lang === 'ar' ? '3 مصانع متخصصة' : '3 Factories',
      category: lang === 'ar' ? 'التصنيع والأثاث' : 'Manufacturing',
      fullName: lang === 'ar' ? 'مصانع جرين وود للأثاث والتصنيع' : 'GreenWood Manufacturing & Furniture',
      desc: lang === 'ar' ? 'إنتاج صناعي متخصص في الأخشاب، الألمنيوم، المفروشات، والأثاث الفندقي' : 'Specialized industrial production in wood, metal, décor, and hospitality furniture.',
      link: '/sectors/manufacturing',
      color: 'from-emerald-500/20 via-emerald-600/10 to-transparent',
      borderColor: 'hover:border-emerald-400/50',
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      icon: Factory,
      accentColor: 'text-emerald-400',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#080B10] text-white border-y border-white/10 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#C9A86A]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#0F1117]/90 border border-[#C9A86A]/30 text-[#C9A86A] shadow-glow-camel">
            <Shield className="w-3.5 h-3.5" />
            <span className="font-mono">{lang === 'ar' ? 'العلامات والمنشآت التجارية' : 'OUR PORTFOLIO BRANDS'}</span>
          </div>

          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight text-white ${lang === 'en' ? 'font-serif' : ''}`}>
            {lang === 'ar' ? 'العلامات التجارية المملوكة للمجموعة' : 'Brands We Own & Operate'}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {lang === 'ar' 
              ? 'تضم مجموعة دبليو دي للأعمال محفظة استراتيجية من العلامات التجارية المتخصصة في الضيافة، المقاولات، والتصنيع' 
              : 'WD Group owns and manages a strategic portfolio of market-leading brands across hospitality, contracting, and specialized manufacturing.'}
          </p>
        </div>

        {/* Brand Grid — 5 Luxury Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {BRANDS.map((brand) => {
            const Icon = brand.icon;
            return (
              <Link
                key={brand.id}
                href={brand.link}
                className={`group relative rounded-2xl bg-[#0F1117]/90 border border-white/10 ${brand.borderColor} p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden`}
              >
                {/* Ambient Top Glow */}
                <div className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-b ${brand.color} opacity-30 group-hover:opacity-100 transition-opacity`} />

                <div className="relative z-10 space-y-4">
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${brand.accentColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${brand.badgeBg}`}>
                      {brand.badge}
                    </span>
                  </div>

                  {/* Brand Typography Title */}
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-[#C9A86A] transition-colors flex items-center gap-1.5">
                      <span>{lang === 'ar' ? brand.nameAr : brand.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 rtl:translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C9A86A]" />
                    </h3>
                    <div className="text-[11px] font-semibold text-zinc-300">
                      {brand.fullName}
                    </div>
                  </div>

                  {/* Narrative Body */}
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {brand.desc}
                  </p>
                </div>

                {/* Bottom Bar: Action link */}
                <div className="relative z-10 pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 group-hover:text-white transition-colors">
                  <span className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300">{brand.category}</span>
                  <span className="text-[11px] font-bold text-[#C9A86A]">{lang === 'ar' ? 'عرض القطاع ←' : 'Explore →'}</span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
