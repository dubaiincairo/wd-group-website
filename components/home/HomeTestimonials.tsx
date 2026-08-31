'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Star, Quote, Sparkles, Building2, Factory, HardHat } from 'lucide-react';

export default function HomeTestimonials() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const testimonials = [
    {
      sector: isAr ? 'قطاع الضيافة والفنادق' : 'Hospitality & Hotels',
      sectorIcon: Building2,
      sectorColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      client: isAr ? 'فندق سويس بلو للأجنحة الفندقية' : 'SwissBlue Hotels & Suites',
      role: isAr ? 'توسعة الأجنحة الرئاسية — كورنيش جدة' : 'Presidential Suites Expansion — Jeddah Corniche',
      location: isAr ? 'جدة والرياض' : 'Jeddah & Riyadh',
      quote: isAr
        ? 'حققت مجموعة دبليو دي للأعمال نقلة نوعية في معايير إدارة وتشغيل أجنحتنا الفندقية، بالإضافة لتوريد أثاث سويس بلو الرئاسي بدقة سويسرية مذهلة فاقت توقعات الضيوف.'
        : 'WD Group delivered a monumental leap in our hotel operations and revenue performance. The bespoke SwissBlue suites and architectural joinery achieved 5-star hotel perfection.',
    },
    {
      sector: isAr ? 'التصنيع والأثاث الفاخر' : 'Luxury Manufacturing & FF&E',
      sectorIcon: Factory,
      sectorColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      client: isAr ? 'شركة طويق للاستثمار والتطوير' : 'Tuwaiq Holding Investment Corp.',
      role: isAr ? 'المقر التنفيذي وقاعات مجلس الإدارة' : 'Executive Headquarters & Boardrooms',
      location: isAr ? 'الرياض — طريق الملك فهد' : 'Riyadh — King Fahd Road',
      quote: isAr
        ? 'مصانع جرين وود صنعت لنا تحفاً معمارية خالدة. طاولة اجتماعات طويق وأرائك الدرعية أضفت هيبة وفخامة استثنائية لمقرنا التنفيذي مع التزام تام بالجدول الزمني.'
        : 'GreenWood manufacturing engineered timeless masterpieces for our headquarters. The Tuwaiq boardroom table and Diriyah seating reflect masterclass Saudi industrial craftsmanship.',
    },
    {
      sector: isAr ? 'المقاولات والتشطيب الفاخر' : 'Fit-Out & Contracting',
      sectorIcon: HardHat,
      sectorColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      client: isAr ? 'مجمع النخيل السكني الملكي' : 'Al Nakheel Royal Residential Complex',
      role: isAr ? 'التشطيبات المعمارية والتركيب الفندقي' : 'Turn-Key Architectural Fit-Out',
      location: isAr ? 'الرياض — حي النرجس' : 'Riyadh — Al Narjis District',
      quote: isAr
        ? 'تصاميم الوطن نفذت أعمال التشطيبات والديكورات الداخلية بدقة مليمترية. التناغم بين قطاع التصنيع وفريق التركيب الميداني وفر علينا أسابيع من وقت التنفيذ.'
        : 'Watan Contracting executed our interior architectural fit-out with millimeter accuracy. The seamless synergy between their factory and site installation saved weeks of execution time.',
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#C9A86A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'شهادات شركاء النجاح' : 'CLIENT & PARTNER ENDORSEMENTS'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'ثقة كبرى الكيانات الاستثمارية والفندقية' : 'Trusted by Leading Hospitality & Corporate Entities'}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            {isAr
              ? 'نعتز بشراكتنا مع نخبة المطورين العقاريين، المجموعات الفندقية، والكيانات الاستثمارية في المملكة العربية السعودية.'
              : 'Endorsements from prominent real estate developers, hotel owners, and enterprise partners across Saudi Arabia.'}
          </p>
        </motion.div>

        {/* 3 Luxury Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => {
            const Icon = item.sectorIcon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5 bg-[#0F1117]/85 hover:border-[#C9A86A]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Bar: Stars + Sector Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border flex items-center gap-1 ${item.sectorColor}`}>
                      <Icon className="w-3 h-3" />
                      <span>{item.sector}</span>
                    </span>
                  </div>

                  {/* Quote Body */}
                  <div className="relative">
                    <Quote className="w-8 h-8 text-white/5 absolute -top-3 -left-2 rtl:-left-auto rtl:-right-2 pointer-events-none" />
                    <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed italic relative z-10">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Author & Entity Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-white font-bold block group-hover:text-[#C9A86A] transition-colors">
                      {item.client}
                    </span>
                    <span className="text-[11px] text-zinc-400 block">
                      {item.role}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2.5 py-1 rounded-lg shrink-0">
                    {item.location}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
