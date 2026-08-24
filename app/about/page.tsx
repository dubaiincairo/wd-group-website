'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import WireframeBlock from '@/components/wireframe/WireframeBlock';
import { ArrowLeft, ArrowRight, LayoutTemplate, Compass, ShieldCheck, Users, Globe2, Building } from 'lucide-react';

export default function AboutWireframe() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Wireframe Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/40">
              PAGE // 02
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {lang === 'ar' ? 'مخطط هيكل صفحة: من نحن والحوكمة' : 'Wireframe: About Us & Governance (/about)'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/wireframes" 
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors"
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'ar' ? 'خريطة الموقع الكاملة' : 'Master Wireframe Map'}</span>
            </Link>
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              <span>{lang === 'ar' ? 'الرئيسية' : 'Homepage'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* Wireframe Structure Grid */}
        <div className="space-y-8">
          
          {/* 1. Page Header Hero Banner */}
          <WireframeBlock
            sectionNumber="SEC-01"
            title={lang === 'ar' ? 'ترويسة الصفحة والهوية المؤسسية (About Hero)' : 'Page Header & Holding Heritage (About Hero)'}
            description="Hero introduction to WD Group's founding legacy, investment philosophy, and national commitment."
            badge="HERO HEADER"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-3">
                <div className="h-6 bg-zinc-800 rounded w-2/3"></div>
                <div className="h-4 bg-zinc-800/70 rounded w-full"></div>
                <div className="h-4 bg-zinc-800/50 rounded w-4/5"></div>
              </div>
              <div className="h-28 bg-zinc-800/40 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-500">
                [Holding Headquarters Visual / Video]
              </div>
            </div>
          </WireframeBlock>

          {/* 2. Chairman's Statement & Executive Vision */}
          <WireframeBlock
            sectionNumber="SEC-02"
            title={lang === 'ar' ? 'كلمة رئيس مجلس الإدارة والحوكمة (Chairman & Governance)' : "Chairman's Statement & Governance Philosophy"}
            description="Official corporate message from Eng. Mohammed Al-Shaibani with verified governance signature seal."
            badge="LEADERSHIP"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="h-32 bg-zinc-800/40 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-500">
                [Chairman Portrait Placeholder]
              </div>
              <div className="md:col-span-3 space-y-3">
                <div className="h-5 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-3.5 bg-zinc-800/70 rounded w-full"></div>
                <div className="h-3.5 bg-zinc-800/50 rounded w-5/6"></div>
                <div className="h-3.5 bg-zinc-800/30 rounded w-2/3"></div>
              </div>
            </div>
          </WireframeBlock>

          {/* 3. Vision, Mission & Saudi Vision 2030 Alignment */}
          <WireframeBlock
            sectionNumber="SEC-03"
            title={lang === 'ar' ? 'الرؤية والرسالة ومواكبة رؤية ٢٠٣٠ (Vision & 2030 Alignment)' : 'Vision, Mission & Saudi Vision 2030 Alignment'}
            description="3 pillar modules mapping WD Group's strategic growth directly to Saudi national transformation goals."
            badge="STRATEGY"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-800/30 border border-dashed border-zinc-700 text-center space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 mx-auto"></div>
                <div className="h-3.5 bg-zinc-700 rounded w-1/2 mx-auto"></div>
                <div className="h-2.5 bg-zinc-800 rounded w-full"></div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-800/30 border border-dashed border-zinc-700 text-center space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 mx-auto"></div>
                <div className="h-3.5 bg-zinc-700 rounded w-1/2 mx-auto"></div>
                <div className="h-2.5 bg-zinc-800 rounded w-full"></div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-800/30 border border-dashed border-zinc-700 text-center space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 mx-auto"></div>
                <div className="h-3.5 bg-zinc-700 rounded w-1/2 mx-auto"></div>
                <div className="h-2.5 bg-zinc-800 rounded w-full"></div>
              </div>
            </div>
          </WireframeBlock>

          {/* 4. Executive Leadership & Organizational Structure */}
          <WireframeBlock
            sectionNumber="SEC-04"
            title={lang === 'ar' ? 'الهيكل التنظيمي والقيادة التنفيذية (Leadership Structure)' : 'Executive Leadership & Sector Directors'}
            description="Profiles of executive leadership overseeing Hospitality, Manufacturing, Contracting, and Finance."
            badge="ORGANIZATION"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 rounded-xl bg-zinc-800/20 border border-dashed border-zinc-700 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 mx-auto border border-zinc-700"></div>
                  <div className="h-3 bg-zinc-700 rounded w-3/4 mx-auto"></div>
                  <div className="h-2 bg-zinc-800 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          </WireframeBlock>

          {/* 5. Geographic Operational Footprint */}
          <WireframeBlock
            sectionNumber="SEC-05"
            title={lang === 'ar' ? 'الانتشار الجغرافي (KSA & International Footprint)' : 'Geographic Footprint (KSA & Tunisia Operations)'}
            description="Interactive map indicating holding assets across Jeddah, Riyadh, Jazan, and Tunisia."
            badge="FOOTPRINT"
          >
            <div className="h-36 bg-zinc-800/30 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-500">
              [Interactive Geographic Footprint Map / Regional Locations]
            </div>
          </WireframeBlock>

          {/* 6. Corporate Download & Partnership CTA */}
          <WireframeBlock
            sectionNumber="SEC-06"
            title={lang === 'ar' ? 'تحميل الملف التعريفي والتواصل (Corporate Profile & Contact)' : 'Corporate Profile Download (PDF) & Direct Inquiry'}
            description="Download official WD Group corporate profile and link directly to strategic partnership inquiry."
            badge="CONVERSION"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-zinc-800/40 rounded-xl">
              <div className="space-y-1">
                <div className="h-4 bg-zinc-700 rounded w-48"></div>
                <div className="h-3 bg-zinc-800 rounded w-64"></div>
              </div>
              <div className="flex gap-3">
                <div className="h-9 w-32 bg-blue-600/60 rounded-lg"></div>
                <div className="h-9 w-32 bg-zinc-700 rounded-lg"></div>
              </div>
            </div>
          </WireframeBlock>

        </div>

      </div>
    </div>
  );
}
