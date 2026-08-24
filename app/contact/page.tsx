'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import WireframeBlock from '@/components/wireframe/WireframeBlock';
import { ArrowRight, LayoutTemplate, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactWireframe() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Wireframe Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/40">
              PAGE // 04
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <span>{lang === 'ar' ? 'مخطط هيكل صفحة: اتصل بنا وبوابة المناقصات' : 'Wireframe: Contact Us & Tender Portal (/contact)'}</span>
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
          
          {/* 1. Contact Hero & HQ Info */}
          <WireframeBlock
            sectionNumber="SEC-01"
            title={lang === 'ar' ? 'ترويسة الاتصال والمقر الرئيسي (Holding HQ Hero)' : 'Holding Headquarters & Contact Channels Hero'}
            description="Official contact coordinates for WD Group for Business Holding (Jeddah, Saudi Arabia) and subsidiary departments."
            badge="HEADQUARTERS"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-800/30 border border-dashed border-zinc-700 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                  <MapPin className="w-4 h-4" />
                  <span>Jeddah HQ</span>
                </div>
                <div className="h-3 bg-zinc-700 rounded w-3/4"></div>
                <div className="h-2.5 bg-zinc-800 rounded w-full"></div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-800/30 border border-dashed border-zinc-700 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                  <Mail className="w-4 h-4" />
                  <span>Executive Email</span>
                </div>
                <div className="h-3 bg-zinc-700 rounded w-3/4"></div>
                <div className="h-2.5 bg-zinc-800 rounded w-full"></div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-800/30 border border-dashed border-zinc-700 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                  <Phone className="w-4 h-4" />
                  <span>Direct Hotline</span>
                </div>
                <div className="h-3 bg-zinc-700 rounded w-3/4"></div>
                <div className="h-2.5 bg-zinc-800 rounded w-full"></div>
              </div>
            </div>
          </WireframeBlock>

          {/* 2. Interactive RFP & Inquiry Form */}
          <WireframeBlock
            sectionNumber="SEC-02"
            title={lang === 'ar' ? 'نموذج التواصل وطلب العروض المتكامل (Integrated RFP & Inquiries)' : 'Integrated Multi-Sector RFP & Inquiry Form'}
            description="Smart inquiry form with sector selector (Hospitality, Manufacturing, Contracting, Careers) and file attachment capability."
            badge="INTERACTIVE FORM"
          >
            <div className="p-6 bg-zinc-800/40 rounded-xl space-y-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-3">
                <div className="h-8 bg-zinc-800 rounded-lg"></div>
                <div className="h-8 bg-zinc-800 rounded-lg"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-8 bg-zinc-800 rounded-lg"></div>
                <div className="h-8 bg-zinc-800 rounded-lg"></div>
              </div>
              <div className="h-20 bg-zinc-800 rounded-lg"></div>
              <div className="h-10 bg-zinc-800/60 rounded-lg border border-dashed border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-500">
                [Drag & Drop Tender Documents / Project Plans (PDF/ZIP)]
              </div>
              <div className="h-10 bg-blue-600/70 rounded-xl"></div>
            </div>
          </WireframeBlock>

          {/* 3. Interactive Location Map */}
          <WireframeBlock
            sectionNumber="SEC-03"
            title={lang === 'ar' ? 'خريطة الموقع التفاعلية والملاحة (Interactive HQ Map)' : 'Interactive Location Map & Branch Directions'}
            description="Embedded map container displaying WD Group Holding HQ location, parking access, and branch coordinates."
            badge="GEOLOCATION"
          >
            <div className="h-44 bg-zinc-800/30 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-500">
              [Interactive Google Maps / Headquarters Coordinates Container]
            </div>
          </WireframeBlock>

        </div>

      </div>
    </div>
  );
}
