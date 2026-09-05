'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Factory, 
  ShieldCheck, 
  Truck, 
  Award, 
  Sparkles, 
  CheckCircle2,
  Layers
} from 'lucide-react';

export default function TrustGuarantees() {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';

  const trustDict = (dict.furniture as any)?.trust || {
    eyebrow: isAr ? 'وعد جرين وود للأثاث' : 'THE GREENWOOD COMMITMENT',
    heading: isAr ? 'معايير عالمية. سلطة تصنيع وطنية.' : 'World-Class Standard. Factory Authority.',
    subheading: isAr
      ? 'جودة استثنائية، تصنيع وطني حقيقي، وخدمة فندقية متكاملة من خط الإنتاج إلى مساحتك الخاصة.'
      : 'Uncompromising quality, genuine manufacturing authority, and white-glove service from factory floor to your sanctuary.',
    pillar1_title: isAr ? 'أسعار مباشرة من المصنع' : 'Factory-Direct Precision',
    pillar1_subtitle: isAr ? '3 مجمعات صناعية في المملكة' : '3 Saudi Industrial Facilities',
    pillar1_desc: isAr
      ? 'بدون وسطاء أو هوامش تجزئة إضافية. تُصنع جميع القطع مباشرة في خطوط إنتاجنا المتطورة بالرياض ونجران.'
      : 'Zero intermediary retail markups. Every piece is engineered and finished directly in our specialized Riyadh and Najran factories.',
    pillar2_title: isAr ? 'ضمان هيكلي لمدة 10 سنوات' : '10-Year Structural Guarantee',
    pillar2_subtitle: isAr ? 'خشب زان معالج وجوز أمريكي صلب' : 'European Beech & Solid Walnut',
    pillar2_desc: isAr
      ? 'تجميع حِرفي فائق بنظام التعشيق المزدوج وأخشاب طبيعية معالجة حرارياً لضمان المتانة مدى الحياة.'
      : 'Uncompromising joinery standards, double-dowelled joints, and kiln-dried natural hardwoods built to last generations.',
    pillar3_title: isAr ? 'توصيل وتركيب فندقي فاخر' : 'White-Glove Delivery & Staging',
    pillar3_subtitle: isAr ? 'أسطول نقل وفنيون معتمدون بالمملكة' : 'In-House Logistics Across KSA',
    pillar3_desc: isAr
      ? 'فرق فنية متخصصة تتولى التوصيل، والتركيب الدقيق، وموازنة القطع، والتنظيف الشامل داخل موقعك.'
      : 'Trained interior technicians deliver, assemble, level, and clean every piece with meticulous white-glove precision.',
    pillar4_title: isAr ? 'تفصيل وتخصيص بمقاساتك' : 'Bespoke Customization',
    pillar4_subtitle: isAr ? 'أكثر من 40 نسيجاً وجلداً مستورداً' : '40+ Imported Leathers & Fabrics',
    pillar4_desc: isAr
      ? 'تعديل القياسات، درجات صبغ الخشب، لمسات النحاس المعماري، واختيار الرخام الطبيعي وفق ذوقك ومخططك.'
      : 'Tailored dimensions, custom wood stains, brushed brass accents, and custom natural stones to match your design palette.',
  };

  const PILLARS = [
    {
      id: 'factory-direct',
      icon: Factory,
      iconColor: 'text-emerald-400',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
      title: trustDict.pillar1_title,
      subtitle: trustDict.pillar1_subtitle,
      desc: trustDict.pillar1_desc,
      stat: isAr ? '3 مصانع' : '3 Factories',
    },
    {
      id: 'structural-warranty',
      icon: ShieldCheck,
      iconColor: 'text-[#C9A86A]',
      badgeColor: 'bg-[#C9A86A]/10 text-[#C9A86A] border-[#C9A86A]/25',
      title: trustDict.pillar2_title,
      subtitle: trustDict.pillar2_subtitle,
      desc: trustDict.pillar2_desc,
      stat: isAr ? '10 سنوات' : '10 Years',
    },
    {
      id: 'white-glove',
      icon: Truck,
      iconColor: 'text-blue-400',
      badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/25',
      title: trustDict.pillar3_title,
      subtitle: trustDict.pillar3_subtitle,
      desc: trustDict.pillar3_desc,
      stat: isAr ? 'تغطية شاملة' : 'Kingdom-Wide',
    },
    {
      id: 'bespoke-sizing',
      icon: Award,
      iconColor: 'text-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
      title: trustDict.pillar4_title,
      subtitle: trustDict.pillar4_subtitle,
      desc: trustDict.pillar4_desc,
      stat: isAr ? 'تفصيل 100%' : '100% Bespoke',
    },
  ];

  return (
    <section id="trust" className="space-y-10 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/25 text-[#C9A86A] text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{trustDict.eyebrow}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {trustDict.heading}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          {trustDict.subheading}
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 bg-[#0E1119]/85 hover:border-[#C9A86A]/40 transition-all duration-300 space-y-4 flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                {/* Top Row: Icon & Stat Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className={`w-6 h-6 ${pillar.iconColor}`} />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${pillar.badgeColor}`}>
                    {pillar.stat}
                  </span>
                </div>

                {/* Titles */}
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white group-hover:text-[#C9A86A] transition-colors leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              {/* Bottom Checklist indicator */}
              <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{isAr ? 'معتمد ومضمون' : 'Verified Standard'}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
