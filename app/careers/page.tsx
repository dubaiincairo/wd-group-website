'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import WireframeBlock from '@/components/wireframe/WireframeBlock';
import { ArrowRight, LayoutTemplate, Users, Briefcase } from 'lucide-react';

export default function CareersWireframe() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Wireframe Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/40">
              PAGE // 03
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>{lang === 'ar' ? 'مخطط هيكل صفحة: التوظيف وبناء الكفاءات' : 'Wireframe: Careers & Talent (/careers)'}</span>
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
          
          {/* 1. Careers Hero */}
          <WireframeBlock
            sectionNumber="SEC-01"
            title={lang === 'ar' ? 'ترويسة التوظيف وثقافة المجموعة (Careers Culture Hero)' : 'Life at WD Group: Corporate Culture & Talent Hero'}
            description="Hero presentation highlighting WD Group's 80+ multidisciplinary team, innovation culture, and growth pathways."
            badge="CULTURE HERO"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-3">
                <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-800/70 rounded w-full"></div>
                <div className="h-4 bg-zinc-800/50 rounded w-4/5"></div>
              </div>
              <div className="h-28 bg-zinc-800/40 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-500">
                [Team Collaboration / Workspace Visual]
              </div>
            </div>
          </WireframeBlock>

          {/* 2. National Talent & Saudization Commitment */}
          <WireframeBlock
            sectionNumber="SEC-02"
            title={lang === 'ar' ? 'تمكين الكوادر الوطنية والتوطين (Saudization Pathways)' : 'National Talent Development & Saudization Commitment'}
            description="Our structured programs for training, mentoring, and advancing Saudi professionals across technical and executive leadership."
            badge="TALENT PILLARS"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Saudi Graduate Program', 'Technical Engineering Training', 'Executive Leadership Track'].map((track, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-800/20 border border-dashed border-zinc-700 space-y-2">
                  <div className="h-3.5 bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-2.5 bg-zinc-800 rounded w-full"></div>
                  <div className="h-2.5 bg-zinc-800/60 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          </WireframeBlock>

          {/* 3. Open Positions Directory by Sector */}
          <WireframeBlock
            sectionNumber="SEC-03"
            title={lang === 'ar' ? 'دليل الوظائف الشاغرة حسب القطاع (Open Positions)' : 'Open Positions Directory (Filterable by Sector & Location)'}
            description="Live job listings across SwissBlue (Hospitality), GreenWood (Factories), Contracting (Engineering), and Holding HQ (Finance & HR)."
            badge="JOB BOARD"
          >
            <div className="space-y-3">
              <div className="flex gap-2 pb-2">
                <div className="h-7 w-20 bg-blue-600/40 rounded-md"></div>
                <div className="h-7 w-24 bg-zinc-800 rounded-md"></div>
                <div className="h-7 w-24 bg-zinc-800 rounded-md"></div>
                <div className="h-7 w-24 bg-zinc-800 rounded-md"></div>
              </div>
              {[
                { title: 'Hotel Operations Manager', sector: 'SwissBlue Hospitality', loc: 'Jeddah' },
                { title: 'Production & Woodcraft Engineer', sector: 'GreenWood Factories', loc: 'Jeddah' },
                { title: 'Senior Fit-Out Project Manager', sector: 'Contracting Arm', loc: 'Riyadh' },
              ].map((job, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-800/40 border border-zinc-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-zinc-200">{job.title}</div>
                    <div className="text-xs text-zinc-500 font-mono">{job.sector} • {job.loc}</div>
                  </div>
                  <div className="h-8 w-24 bg-zinc-700/80 rounded-lg"></div>
                </div>
              ))}
            </div>
          </WireframeBlock>

          {/* 4. Direct CV Submission Portal */}
          <WireframeBlock
            sectionNumber="SEC-04"
            title={lang === 'ar' ? 'بوابة إرسال السيرة الذاتية (Direct Application Portal)' : 'Direct Application & Talent Pool CV Upload'}
            description="General application form allowing applicants to submit resumes directly for current and upcoming holding expansions."
            badge="APPLICATION FORM"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-zinc-800/40 rounded-xl">
              <div className="space-y-2">
                <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                <div className="h-3 bg-zinc-800 rounded w-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-8 bg-zinc-800 rounded-lg w-full"></div>
                <div className="h-10 bg-zinc-800/50 rounded-lg border border-dashed border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-500">
                  [Upload Resume / CV (PDF)]
                </div>
                <div className="h-9 bg-blue-600/60 rounded-lg w-full"></div>
              </div>
            </div>
          </WireframeBlock>

        </div>

      </div>
    </div>
  );
}
