'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Home, 
  Building2, 
  Factory, 
  HardHat, 
  Users, 
  MessageSquare, 
  ArrowRight,
  Compass,
  Workflow
} from 'lucide-react';

export default function WireframesHub() {
  const { lang } = useLanguage();

  const PAGES_MAP = [
    {
      id: '01',
      title: lang === 'ar' ? 'الصفحة الرئيسية' : 'Homepage (/)',
      route: '/',
      status: lang === 'ar' ? 'مكتملة ومباشرة' : 'Live & Enhanced',
      statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: Home,
      iconColor: 'text-blue-400',
      sectionsCount: 6,
      sections: lang === 'ar' 
        ? ['الترويسة السينمائية بالفيديو', 'شريط الإحصائيات (4 أرقام)', 'قطاعات المجموعة (3 بطاقات)', 'سلسلة القيمة وتكامل المنظومة', 'الرؤية والرسالة ومواكبة 2030', 'كلمة الرئيس التنفيذي وبوابة التواصل']
        : ['Cinematic Video Hero', '4-Metric Statistics Bar', 'Strategic Sectors Hub', 'Value Chain Synergy Flow', 'Vision, Mission & 2030', 'CEO Quote & Contact CTA'],
      desc: lang === 'ar' ? 'الواجهة القابضة المتكاملة للمجموعة.' : 'The sovereign holding showcase and ecosystem overview.',
    },
    {
      id: '02',
      title: lang === 'ar' ? 'من نحن والحوكمة' : 'About Us & Governance (/about)',
      route: '/about',
      status: lang === 'ar' ? 'مخطط الهيكل جاهز' : 'Wireframe Ready',
      statusColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      icon: Compass,
      iconColor: 'text-blue-400',
      sectionsCount: 6,
      sections: lang === 'ar'
        ? ['ترويسة الهوية المؤسسية', 'كلمة رئيس مجلس الإدارة', 'محاور الرؤية ومواكبة 2030', 'الهيكل التنظيمي والقيادة', 'الانتشار الجغرافي (المملكة وتونس)', 'تحميل الملف التعريفي والاتصال']
        : ['Holding Heritage Hero', "Chairman's Statement", 'Vision & 2030 Alignment', 'Leadership Structure', 'Geographic Footprint (KSA/Tunisia)', 'Corporate Profile Download'],
      desc: lang === 'ar' ? 'تاريخ المجموعة، القيادة، ومواكبة الرؤية الوطنية.' : 'Holding history, executive board, and strategic national vision.',
    },
    {
      id: '03',
      title: lang === 'ar' ? 'قطاع الضيافة (سويس بلو)' : 'Hospitality Sector (/sectors/hospitality)',
      route: '/sectors/hospitality',
      status: lang === 'ar' ? 'مخطط الهيكل جاهز' : 'Wireframe Ready',
      statusColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      icon: Building2,
      iconColor: 'text-sky-400',
      sectionsCount: 4,
      sections: lang === 'ar'
        ? ['ترويسة قطاع الضيافة', 'محفظة الفنادق (6 منشآت)', 'خدمات إدارة وتشغيل الفنادق', 'طلب استثمار وتطوير فندقي']
        : ['Hospitality Sector Hero', 'Properties Portfolio (6 Properties)', 'Asset Management Services', 'Hotel Investment & Operator RFP'],
      desc: lang === 'ar' ? 'علامة سويس بلو وإدارة الأصول الفندقية.' : 'SwissBlue luxury suites, properties portfolio, and operator model.',
    },
    {
      id: '04',
      title: lang === 'ar' ? 'قطاع التصنيع والأثاث (جرين وود)' : 'Manufacturing & Furniture (/sectors/manufacturing)',
      route: '/sectors/manufacturing',
      status: lang === 'ar' ? 'مخطط الهيكل جاهز' : 'Wireframe Ready',
      statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: Factory,
      iconColor: 'text-emerald-400',
      sectionsCount: 4,
      sections: lang === 'ar'
        ? ['ترويسة قطاع التصنيع', 'المصانع الثلاثة المتخصصة', 'القدرات ومكائن التحكم الرقمي الآلية', 'طلب توريد أثاث ومناقصات']
        : ['Manufacturing Sector Hero', '3 Specialized Factories Breakdown', 'CNC Automation & Specifications', 'B2B Procurement Tender RFP'],
      desc: lang === 'ar' ? '3 مصانع للأخشاب والألمنيوم وتوريد الأثاث الفندقي.' : '3 specialized factories for wood, metal, and hotel FF&E production.',
    },
    {
      id: '05',
      title: lang === 'ar' ? 'قطاع المقاولات والتجهيز الداخلي (تصاميم الوطن)' : 'Contracting & Fit-Out (/sectors/contracting)',
      route: '/sectors/contracting',
      status: lang === 'ar' ? 'مخطط الهيكل جاهز' : 'Wireframe Ready',
      statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      icon: HardHat,
      iconColor: 'text-amber-400',
      sectionsCount: 4,
      sections: lang === 'ar'
        ? ['ترويسة قطاع المقاولات', 'دورة تنفيذ المشروع الهندسية', 'معرض المشروعات المنجزة', 'بوابة تقديم المناقصات وجداول الكميات']
        : ['Contracting Sector Hero', 'Project Execution Lifecycle', 'Completed Projects Showcase', 'Tender & BOQ Document Upload'],
      desc: lang === 'ar' ? 'الهندسة والتنفيذ المتكامل من المخطط حتى التسليم.' : 'Turnkey interior execution from blueprint to handover.',
    },
    {
      id: '06',
      title: lang === 'ar' ? 'التوظيف وبناء الكفاءات' : 'Careers & Talent (/careers)',
      route: '/careers',
      status: lang === 'ar' ? 'مخطط الهيكل جاهز' : 'Wireframe Ready',
      statusColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      icon: Users,
      iconColor: 'text-blue-400',
      sectionsCount: 4,
      sections: lang === 'ar'
        ? ['ترويسة بيئة العمل وثقافة المجموعة', 'برامج التوطين وتطوير الكوادر', 'دليل الوظائف الشاغرة حسب القطاع', 'بوابة إرسال السيرة الذاتية المباشرة']
        : ['Life at WD Group Hero', 'Saudization & Talent Pathways', 'Open Positions by Sector', 'Direct CV Upload Portal'],
      desc: lang === 'ar' ? 'استقطاب الكفاءات وبرامج تمكين الكوادر الوطنية.' : 'Attracting top talent and national empowerment programs.',
    },
    {
      id: '07',
      title: lang === 'ar' ? 'اتصل بنا وبوابة المناقصات' : 'Contact Us & Tender Portal (/contact)',
      route: '/contact',
      status: lang === 'ar' ? 'مخطط الهيكل جاهز' : 'Wireframe Ready',
      statusColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      icon: MessageSquare,
      iconColor: 'text-blue-400',
      sectionsCount: 3,
      sections: lang === 'ar'
        ? ['ترويسة الاتصال والمقر الرئيسي (جدة)', 'نموذج طلب العروض المتكامل مع إرفاق الملفات', 'خريطة الموقع التفاعلية والملاحة']
        : ['HQ Coordinates Hero (Jeddah)', 'Multi-Sector RFP with File Upload', 'Interactive Location Map'],
      desc: lang === 'ar' ? 'قنوات التواصل المباشر وبوابة العروض الرسمية.' : 'Executive contact channels and tender submission portal.',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface border border-brand-border text-blue-400 mb-4 shadow-glow-card">
            <Workflow className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'خريطة هيكل الموقع والمخططات' : 'Master Website Content Map & Architecture'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {lang === 'ar' 
              ? 'مخطط الهيكل المعماري لجميع صفحات الموقع' 
              : 'Complete Website Wireframe & Page Architecture'}
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {lang === 'ar'
              ? 'استعرض الهيكل الكامل وتوزيع الأقسام والمحتوى لكل صفحة من صفحات الموقع القابض لمجموعة دبليو دي للأعمال.'
              : 'Explore the complete structural layout, section breakdown, and content flow across all WD Group website pages.'}
          </p>
        </div>

        {/* Content Map Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAGES_MAP.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.id}
                className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-blue-500/50 hover:shadow-glow-blue transition-all group relative overflow-hidden"
              >
                {/* Background Blueprint corner crosshairs */}
                <div className="absolute top-2 right-2 text-zinc-600 font-mono text-[9px]">+</div>
                <div className="absolute bottom-2 left-2 text-zinc-600 font-mono text-[9px]">+</div>

                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-brand-surface border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        <Icon className={`w-5 h-5 ${p.iconColor}`} />
                      </div>
                      <span className="font-mono text-xs font-bold text-zinc-400">
                        {lang === 'ar' ? `صفحة // ${p.id}` : `PAGE // ${p.id}`}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    {p.desc}
                  </p>

                  {/* Sections Breakdown */}
                  <div className="mb-6 p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center justify-between">
                      <span>{lang === 'ar' ? 'الأقسام المعتمدة' : 'Structured Sections'}</span>
                      <span className="font-mono text-zinc-400">{p.sectionsCount} {lang === 'ar' ? 'أقسام' : 'Sections'}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {p.sections.map((sec, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] text-zinc-300">
                          <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                          <span>{sec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Link */}
                <Link
                  href={p.route}
                  className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl font-bold text-xs bg-brand-surface hover:bg-blue-600 text-white border border-white/10 hover:border-blue-500 transition-all group/btn"
                >
                  <span>{lang === 'ar' ? 'فتح مخطط الصفحة' : 'Open Page Wireframe'}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover/btn:text-white group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180 transition-all" />
                </Link>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
