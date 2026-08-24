'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import WireframeBlock from '@/components/wireframe/WireframeBlock';
import { ArrowRight, LayoutTemplate, HardHat } from 'lucide-react';

export default function ContractingWireframe() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Wireframe Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
              SECTOR // 03
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <HardHat className="w-5 h-5 text-amber-400" />
              <span>{lang === 'ar' ? 'مخطط هيكل قطاع: المقاولات والتشطيب (Projects)' : 'Wireframe: Contracting & Fit-Out (Projects)'}</span>
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
              href="#tender" 
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#8A7340] hover:bg-[#6e5c33] text-white border border-amber-400/40 transition-colors"
            >
              <span>{lang === 'ar' ? 'تقديم مناقصة' : 'Submit Fit-out RFP'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* Wireframe Structure Grid */}
        <div className="space-y-8">
          
          {/* 1. Contracting Hero */}
          <WireframeBlock
            sectionNumber="SEC-01"
            title={lang === 'ar' ? 'ترويسة قطاع المقاولات (Turnkey Contracting Hero)' : 'Contracting Sector Hero & Engineering Leadership'}
            description="Presentation of WD Group's engineering arm delivering integrated commercial and residential fit-out projects."
            badge="ENGINEERING HERO"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-3">
                <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-800/70 rounded w-full"></div>
                <div className="h-4 bg-zinc-800/50 rounded w-4/5"></div>
                <div className="flex gap-2 pt-2">
                  <div className="h-8 w-32 bg-amber-600/40 rounded-lg"></div>
                  <div className="h-8 w-36 bg-zinc-800 rounded-lg"></div>
                </div>
              </div>
              <div className="h-32 bg-zinc-800/40 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-500">
                [Turnkey Architectural Interior Site Visual]
              </div>
            </div>
          </WireframeBlock>

          {/* 2. End-to-End Project Execution Lifecycle */}
          <WireframeBlock
            sectionNumber="SEC-02"
            title={lang === 'ar' ? 'دورة تنفيذ المشروع الهندسية (Project Execution Lifecycle)' : 'End-to-End Project Lifecycle: From Blueprint to Handover'}
            description="Step-by-step workflow: 1. Design Coordination -> 2. In-House Factory Procurement -> 3. Site Execution -> 4. Quality Audit & Handover."
            badge="PROCESS WORKFLOW"
          >
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {['1. Blueprint & Planning', '2. In-House Manufacturing', '3. Site Fit-Out Execution', '4. Handover & Warranty'].map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-800/30 border border-dashed border-zinc-700 space-y-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">STAGE 0{idx + 1}</span>
                  <div className="h-3.5 bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-2.5 bg-zinc-800 rounded w-full"></div>
                </div>
              ))}
            </div>
          </WireframeBlock>

          {/* 3. Completed Projects & Case Studies */}
          <WireframeBlock
            sectionNumber="SEC-03"
            title={lang === 'ar' ? 'معرض المشروعات المنجزة ودراسات الحالة (Featured Projects)' : 'Completed Projects Showcase & Commercial Case Studies'}
            description="Filterable gallery of executed hospitality fit-outs, corporate headquarters, and high-end residential compounds."
            badge="PROJECT GALLERY"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Commercial Headquarters Fit-Out', 'Luxury Hotel Suites Execution', 'Residential Villa Compound'].map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-800/30 border border-dashed border-zinc-700 space-y-2.5">
                  <div className="h-28 bg-zinc-800/60 rounded-lg flex items-center justify-center text-xs font-mono text-zinc-500">
                    [Project Photo: {proj}]
                  </div>
                  <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-3 bg-zinc-800 rounded w-full"></div>
                </div>
              ))}
            </div>
          </WireframeBlock>

          {/* 4. Fit-Out Contracting Tender & RFP Portal */}
          <WireframeBlock
            sectionNumber="SEC-04"
            title={lang === 'ar' ? 'بوابة تقديم المناقصات ومستندات المشروع (Tender Submission Portal)' : 'Fit-Out Tender & Architectural RFP Document Submission Portal'}
            description="Secure file upload portal for architectural drawings (CAD/PDF), BOQs (Bill of Quantities), and tender specifications."
            badge="TENDER PORTAL"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-zinc-800/40 rounded-xl">
              <div className="space-y-2">
                <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                <div className="h-3 bg-zinc-800 rounded w-full"></div>
                <div className="h-3 bg-zinc-800 rounded w-5/6"></div>
              </div>
              <div className="space-y-2">
                <div className="h-8 bg-zinc-800 rounded-lg w-full"></div>
                <div className="h-12 bg-zinc-800/50 rounded-lg border border-dashed border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-500">
                  [Upload Tender BOQ & CAD Files (PDF/ZIP)]
                </div>
                <div className="h-9 bg-amber-600/60 rounded-lg w-full"></div>
              </div>
            </div>
          </WireframeBlock>

        </div>

      </div>
    </div>
  );
}
