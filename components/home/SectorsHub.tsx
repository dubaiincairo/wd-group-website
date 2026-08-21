'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ExternalLink, 
  Check, 
  ArrowRight,
  Layers
} from 'lucide-react';

export default function SectorsHub() {
  const { lang, dict } = useLanguage();

  return (
    <section id="sectors" className="py-20 sm:py-28 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Untitled UI Section Header Pattern) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 border border-brand-200 text-brand-700 mb-4 shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>{dict.sectors.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
            {dict.sectors.title}
          </h2>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            {dict.sectors.subtitle}
          </p>
        </div>

        {/* 3 Core Sector Cards (Untitled UI Feature Card Pattern) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECTOR 1: HOSPITALITY (SwissBlue) */}
          <div 
            id="hospitality" 
            className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
          >
            <div>
              {/* Header: Icon & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1A476A] border border-blue-200 flex items-center justify-center shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#1A476A] border border-blue-200">
                  {dict.sectors.hosp.badge}
                </span>
              </div>

              {/* Subtitle / Brand */}
              <div className="text-xs font-semibold text-[#1A476A] tracking-wider uppercase mb-1">
                {dict.sectors.hosp.subtitle}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                {dict.sectors.hosp.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {dict.sectors.hosp.desc}
              </p>

              {/* Capabilities Bullets with Checkmarks */}
              <div className="mb-8 pt-6 border-t border-gray-100">
                <ul className="space-y-3">
                  {dict.sectors.hosp.details.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-[#1A476A] flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Link Button (Untitled UI Primary Style) */}
            <a 
              href="https://swissblue.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="u-btn-secondary !w-full !justify-between !py-3 group-hover:bg-[#1A476A] group-hover:text-white group-hover:border-[#1A476A] transition-all"
            >
              <span>{dict.sectors.hosp.link_text}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* SECTOR 2: MANUFACTURING & FURNITURE (GreenWood) */}
          <div 
            id="manufacturing" 
            className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
          >
            <div>
              {/* Header: Icon & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0B5C3D] border border-emerald-200 flex items-center justify-center shadow-xs">
                  <Factory className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#0B5C3D] border border-emerald-200">
                  {dict.sectors.mfg.badge}
                </span>
              </div>

              {/* Subtitle / Brand */}
              <div className="text-xs font-semibold text-[#0B5C3D] tracking-wider uppercase mb-1">
                {dict.sectors.mfg.subtitle}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                {dict.sectors.mfg.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {dict.sectors.mfg.desc}
              </p>

              {/* Capabilities Bullets with Checkmarks */}
              <div className="mb-8 pt-6 border-t border-gray-100">
                <ul className="space-y-3">
                  {dict.sectors.mfg.details.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#0B5C3D] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Link Button */}
            <Link 
              href="#contact"
              className="u-btn-secondary !w-full !justify-between !py-3 group-hover:bg-[#0B5C3D] group-hover:text-white group-hover:border-[#0B5C3D] transition-all"
            >
              <span>{dict.sectors.mfg.link_text}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* SECTOR 3: CONTRACTING (Engineering Excellence) */}
          <div 
            id="contracting" 
            className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
          >
            <div>
              {/* Header: Icon & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#8A7340] border border-amber-200 flex items-center justify-center shadow-xs">
                  <HardHat className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-[#8A7340] border border-amber-200">
                  {dict.sectors.contr.badge}
                </span>
              </div>

              {/* Subtitle / Brand */}
              <div className="text-xs font-semibold text-[#8A7340] tracking-wider uppercase mb-1">
                {dict.sectors.contr.subtitle}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                {dict.sectors.contr.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {dict.sectors.contr.desc}
              </p>

              {/* Capabilities Bullets with Checkmarks */}
              <div className="mb-8 pt-6 border-t border-gray-100">
                <ul className="space-y-3">
                  {dict.sectors.contr.details.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-amber-50 text-[#8A7340] flex items-center justify-center shrink-0 mt-0.5 border border-amber-200">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Link Button */}
            <Link 
              href="#contact"
              className="u-btn-secondary !w-full !justify-between !py-3 group-hover:bg-[#8A7340] group-hover:text-white group-hover:border-[#8A7340] transition-all"
            >
              <span>{dict.sectors.contr.link_text}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
