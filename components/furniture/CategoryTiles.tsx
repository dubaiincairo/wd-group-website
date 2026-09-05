'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryTileItem {
  id: string;
  categoryKey: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  countEn: string;
  countAr: string;
  image: string;
}

const CATEGORY_TILES: CategoryTileItem[] = [
  {
    id: 'tile-living',
    categoryKey: 'living',
    nameEn: 'Living & Lounge Salons',
    nameAr: 'الصالونات وغرف المعيشة',
    descEn: 'Sculptural organic sofas, curved armchairs, and bouclé conversation seating.',
    descAr: 'أرائك منحنية انسيابية، كراسي لاونج وثير، وأطقم صالونات بقماش البوكليه الإيطالي.',
    countEn: '12 Signature Pieces',
    countAr: '12 تصميماً استثنائياً',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'tile-bedroom',
    categoryKey: 'bedroom',
    nameEn: 'Hospitality Suites & Bedroom',
    nameAr: 'الأجنحة وغرف النوم الفندقية',
    descEn: 'Floating upholstered bed frames, integrated bedside Qi consoles, and luxury dressers.',
    descAr: 'أسرّة فندقية عائمة، كونسولات جانبية بشواحن ذكية، وخزائن ملابس راقية.',
    countEn: '8 Signature Pieces',
    countAr: '8 تصميمات فندقية',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'tile-dining',
    categoryKey: 'dining',
    nameEn: 'Executive & Dining Tables',
    nameAr: 'طاولات الطعام والمكاتب التنفيذية',
    descEn: 'Solid American walnut tables, fluted pedestals, and ergonomic leather seating.',
    descAr: 'طاولات خشب الجوز الأمريكي الطبيعي، قواعد مضلعة، وكراسي جلدية فخمة.',
    countEn: '10 Signature Pieces',
    countAr: '10 قطع تنفيذية',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'tile-joinery',
    categoryKey: 'joinery',
    nameEn: 'Architectural Joinery & Wall Units',
    nameAr: 'التجاليد المعمارية والخزائن المدمجة',
    descEn: 'CNC acoustic wood paneling, motorized credenzas, and integrated ambient lighting.',
    descAr: 'تجاليد جدارية عازلة للصوت بـ CNC، خزائن ذكية، ومكتبات جدارية بإضاءة مدمجة.',
    countEn: 'Custom FF&E Engineering',
    countAr: 'هندسة FF&E متكاملة',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'tile-decor',
    categoryKey: 'decor',
    nameEn: 'Travertine Tables & Sculptural Accents',
    nameAr: 'طاولات الترافرتين والديكورات النحتية',
    descEn: 'Honed natural Najran travertine, brushed brass pedestals, and architectural lighting.',
    descAr: 'حجر ترافرتين نجران الطبيعي المشطوب يدوياً، لمسات النحاس، ووحدات الإضاءة.',
    countEn: '6 Natural Stone Accents',
    countAr: '6 تحف حجرية',
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'tile-boardroom',
    categoryKey: 'dining',
    nameEn: 'Executive Boardroom Collections',
    nameAr: 'قاعات الاجتماعات ومقرات الأعمال',
    descEn: 'Grand boardroom tables with concealed high-voltage German wire systems.',
    descAr: 'طاولات اجتماعات كبرى مزودة بأنظمة تمديد كابلات كهربائية وتقنية متطورة.',
    countEn: 'Contract & Turnkey',
    countAr: 'توريد وتنفيذ شامل',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85',
  },
];

interface CategoryTilesProps {
  onSelectCategory: (categoryKey: string) => void;
}

export default function CategoryTiles({ onSelectCategory }: CategoryTilesProps) {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';

  const showcaseDict = (dict.furniture as any)?.categories_showcase || {
    eyebrow: isAr ? 'حِرفية سعودية بمعايير عالمية' : 'CRAFTED FOR DISTINCTION',
    heading: isAr ? 'تصفح المجموعات بحسب المساحة' : 'Curated Spaces & Collections',
    subheading: isAr 
      ? 'استكشف قطع الأثاث الفاخرة والمصممة خصيصاً للمجالس والفلل الراقية، والأجنحة الفندقية، وقاعات الاجتماعات التنفيذية.'
      : 'Explore masterfully designed collections crafted for distinguished residences, executive suites, and luxury hospitality destinations.',
    view_collection: isAr ? 'استكشف المساحة' : 'Explore Space',
  };

  const handleTileClick = (catKey: string) => {
    onSelectCategory(catKey);
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/25 text-[#C9A86A] text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{showcaseDict.eyebrow}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {showcaseDict.heading}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          {showcaseDict.subheading}
        </p>
      </div>

      {/* Grid of 6 High-Impact Visual Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORY_TILES.map((tile, idx) => (
          <motion.div
            key={tile.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            onClick={() => handleTileClick(tile.categoryKey)}
            className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-white/10 hover:border-[#C9A86A]/50 transition-all duration-500 cursor-pointer shadow-xl"
          >
            {/* Background Image */}
            <Image
              src={tile.image}
              alt={isAr ? tile.nameAr : tile.nameEn}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/50 to-transparent" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

            {/* Top Pill: Count / Tag */}
            <div className="absolute top-5 left-5 rtl:left-auto rtl:right-5 z-10">
              <span className="px-3 py-1 rounded-full bg-[#08090C]/80 border border-white/15 text-[10px] font-mono font-bold text-[#C9A86A] backdrop-blur-md">
                {isAr ? tile.countAr : tile.countEn}
              </span>
            </div>

            {/* Bottom Content Info */}
            <div className="absolute inset-x-0 bottom-0 p-6 z-10 space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#C9A86A] transition-colors leading-tight">
                {isAr ? tile.nameAr : tile.nameEn}
              </h3>
              <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                {isAr ? tile.descAr : tile.descEn}
              </p>

              {/* Action Link */}
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#C9A86A] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                <span>{showcaseDict.view_collection}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
