'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import WireframeBlock from '@/components/wireframe/WireframeBlock';
import { ArrowRight, LayoutTemplate, Building2, ExternalLink } from 'lucide-react';

export default function HospitalityWireframe() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Wireframe Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-400 border border-sky-500/40">
              SECTOR // 01
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-sky-400" />
              <span>{lang === 'ar' ? 'مخطط هيكل قطاع: الضيافة والفنادق (سويس بلو)' : 'Wireframe: Hospitality Sector (SwissBlue)'}</span>
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
            <a 
              href="https://swissblue.sa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#1A476A] hover:bg-[#133550] text-white border border-sky-400/40 transition-colors"
            >
              <span>swissblue.sa</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Wireframe Structure Grid */}
        <div className="space-y-8">
          
          {/* 1. Sector Hero */}
          <WireframeBlock
            sectionNumber="SEC-01"
            title={lang === 'ar' ? 'ترويسة قطاع الضيافة (SwissBlue Hero)' : 'Hospitality Sector Hero & Portfolio Overview'}
            description="High-impact hero visual showcasing SwissBlue's luxury serviced apartments and boutique hotels."
            badge="PORTFOLIO HERO"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-3">
                <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-800/70 rounded w-full"></div>
                <div className="h-4 bg-zinc-800/50 rounded w-4/5"></div>
                <div className="flex gap-2 pt-2">
                  <div className="h-8 w-28 bg-sky-600/40 rounded-lg"></div>
                  <div className="h-8 w-32 bg-zinc-800 rounded-lg"></div>
                </div>
              </div>
              <div className="h-32 bg-zinc-800/40 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-500">
                [Luxury Suite Showcase Visual]
              </div>
            </div>
          </WireframeBlock>

          {/* 2. Properties Portfolio Grid (6 Properties) */}
          <WireframeBlock
            sectionNumber="SEC-02"
            title={lang === 'ar' ? 'محفظة الفنادق والوحدات (6 Properties Portfolio)' : 'Properties & Locations Showcase (6 Properties)'}
            description="Interactive cards for SwissBlue Hera (Jeddah), Al Zahraa (Jeddah), Al Samer (Jeddah), Jazan, and Tunisia properties."
            badge="PROPERTIES GRID"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Hera (Jeddah)', 'Al Zahraa (Jeddah)', 'Al Samer (Jeddah)', 'Jazan (Upcoming)', 'Tunisia Properties', 'New Development'].map((prop, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-800/30 border border-dashed border-zinc-700 space-y-2.5">
                  <div className="h-24 bg-zinc-800/60 rounded-lg flex items-center justify-center text-xs font-mono text-zinc-500">
                    [Photo: {prop}]
                  </div>
                  <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-3 bg-zinc-800 rounded w-full"></div>
                  <div className="h-3 bg-zinc-800/60 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </WireframeBlock>

          {/* 3. Hotel Management & Operator Services */}
          <WireframeBlock
            sectionNumber="SEC-03"
            title={lang === 'ar' ? 'خدمات إدارة وتشغيل الفنادق (Operator Services)' : 'Hospitality Asset Management & Operator Services'}
            description="Turnkey management solutions for property owners: revenue management, staffing, brand licensing, and quality control."
            badge="B2B SERVICES"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Full Asset Management', 'Revenue & Yield Optimization', 'Guest Experience Standards'].map((title, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-800/20 border border-dashed border-zinc-700 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20"></div>
                  <div className="h-3.5 bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-2.5 bg-zinc-800 rounded w-full"></div>
                  <div className="h-2.5 bg-zinc-800 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          </WireframeBlock>

          {/* 4. Hotel Development & Investment RFP */}
          <WireframeBlock
            sectionNumber="SEC-04"
            title={lang === 'ar' ? 'طلب شراكة وتطوير فندقي (Hotel Investment RFP)' : 'Hotel Development & Operator Partnership RFP'}
            description="Direct lead generation form for hotel owners and institutional investors seeking SwissBlue management."
            badge="LEAD PORTAL"
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
                <div className="h-9 bg-sky-600/60 rounded-lg w-full"></div>
              </div>
            </div>
          </WireframeBlock>

        </div>

      </div>
    </div>
  );
}
