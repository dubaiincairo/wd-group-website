'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import WireframeBlock from '@/components/wireframe/WireframeBlock';
import { ArrowRight, LayoutTemplate, Factory } from 'lucide-react';

export default function ManufacturingWireframe() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Wireframe Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              SECTOR // 02
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Factory className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'ar' ? 'مخطط هيكل قطاع: التصنيع والأثاث (جرين وود)' : 'Wireframe: Manufacturing & Furniture (GreenWood)'}</span>
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
              href="#quote" 
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#0B5C3D] hover:bg-[#08452e] text-white border border-emerald-400/40 transition-colors"
            >
              <span>{lang === 'ar' ? 'طلب تسعير مصانع' : 'Factory B2B Quote'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* Wireframe Structure Grid */}
        <div className="space-y-8">
          
          {/* 1. Manufacturing Hero */}
          <WireframeBlock
            sectionNumber="SEC-01"
            title={lang === 'ar' ? 'ترويسة قطاع التصنيع (GreenWood Industrial Hero)' : 'Manufacturing Sector Hero & Industrial Capacity'}
            description="Hero presentation highlighting GreenWood's 3 specialized factories producing high-precision wood, aluminum, and contract furniture."
            badge="INDUSTRIAL HERO"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-3">
                <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-800/70 rounded w-full"></div>
                <div className="h-4 bg-zinc-800/50 rounded w-4/5"></div>
                <div className="flex gap-2 pt-2">
                  <div className="h-8 w-32 bg-emerald-600/40 rounded-lg"></div>
                  <div className="h-8 w-36 bg-zinc-800 rounded-lg"></div>
                </div>
              </div>
              <div className="h-32 bg-zinc-800/40 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-500">
                [High-Tech Woodcraft Workshop Visual]
              </div>
            </div>
          </WireframeBlock>

          {/* 2. 3 Dedicated Factories Breakdown */}
          <WireframeBlock
            sectionNumber="SEC-02"
            title={lang === 'ar' ? 'المصانع الثلاثة المتخصصة (3 Specialized Factories)' : 'The 3 Specialized Factories & Core Production Lines'}
            description="Deep dive into Factory 1 (Custom Woodworking & Joinery), Factory 2 (Architectural Aluminum & Metal), Factory 3 (High-Volume Contract Furniture)."
            badge="FACTORIES BREAKDOWN"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Woodcraft & Bespoke Joinery', 'Architectural Aluminum & Metal', 'Hotel FF&E & Volume Furniture'].map((fact, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-800/30 border border-dashed border-zinc-700 space-y-2.5">
                  <div className="h-28 bg-zinc-800/60 rounded-lg flex items-center justify-center text-xs font-mono text-zinc-500">
                    [Factory {idx + 1} Visual]
                  </div>
                  <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-3 bg-zinc-800 rounded w-full"></div>
                  <div className="h-3 bg-zinc-800/60 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </WireframeBlock>

          {/* 3. Production Capabilities & Machinery Standards */}
          <WireframeBlock
            sectionNumber="SEC-03"
            title={lang === 'ar' ? 'القدرات الإنتاجية والمكائن المتقدمة (CNC & Automation)' : 'Advanced Automation, CNC Machinery & Capacity Metrics'}
            description="Detailed specifications: daily output capacity, precision tolerances, automated painting lines, and quality control checkpoints."
            badge="SPECIFICATIONS"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['CNC Precision Milling', 'Automated Spray Booths', 'Dry Kiln Timber Processing', 'Quality ISO Standards'].map((title, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-800/20 border border-dashed border-zinc-700 space-y-2">
                  <div className="h-3 bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-2.5 bg-zinc-800 rounded w-full"></div>
                </div>
              ))}
            </div>
          </WireframeBlock>

          {/* 4. B2B Supply RFP & Material Catalog Download */}
          <WireframeBlock
            sectionNumber="SEC-04"
            title={lang === 'ar' ? 'طلب توريد أثاث ومناقصات تصنيع (B2B Procurement RFP)' : 'B2B Furniture Supply & Custom Manufacturing Tender RFP'}
            description="Procurement form for hotel operators, developers, and commercial fit-out contractors requesting production quotas."
            badge="B2B CONVERSION"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-zinc-800/40 rounded-xl">
              <div className="space-y-2">
                <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                <div className="h-3 bg-zinc-800 rounded w-full"></div>
                <div className="h-3 bg-zinc-800 rounded w-5/6"></div>
              </div>
              <div className="space-y-2">
                <div className="h-8 bg-zinc-800 rounded-lg w-full"></div>
                <div className="h-8 bg-zinc-800 rounded-lg w-full"></div>
                <div className="h-9 bg-emerald-600/60 rounded-lg w-full"></div>
              </div>
            </div>
          </WireframeBlock>

        </div>

      </div>
    </div>
  );
}
