'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  MapPin, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2,
  Briefcase
} from 'lucide-react';

export default function ProjectsShowcase() {
  const { lang, dict } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'hospitality' | 'manufacturing' | 'contracting'>('all');

  const filteredItems = filter === 'all' 
    ? dict.projects.items 
    : dict.projects.items.filter(item => item.sector === filter);

  return (
    <section id="projects" className="py-20 sm:py-28 bg-brand-pearl text-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-white border border-brand-border text-brand-accent mb-4 shadow-2xs">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{dict.projects.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark leading-tight">
              {dict.projects.title}
            </h2>
            
            <p className="text-base sm:text-lg text-brand-muted mt-3 max-w-2xl">
              {dict.projects.subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-brand-border shadow-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'all' 
                  ? 'bg-brand-dark text-white shadow-sm' 
                  : 'text-zinc-600 hover:text-brand-dark hover:bg-brand-pearl'
              }`}
            >
              {dict.projects.filter_all}
            </button>

            <button
              onClick={() => setFilter('hospitality')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filter === 'hospitality' 
                  ? 'bg-sector-hospitality text-white shadow-sm' 
                  : 'text-zinc-600 hover:text-sector-hospitality-dark hover:bg-sector-hospitality-light'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{dict.projects.filter_hosp}</span>
            </button>

            <button
              onClick={() => setFilter('manufacturing')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filter === 'manufacturing' 
                  ? 'bg-sector-manufacturing text-white shadow-sm' 
                  : 'text-zinc-600 hover:text-sector-manufacturing-dark hover:bg-sector-manufacturing-light'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              <span>{dict.projects.filter_mfg}</span>
            </button>

            <button
              onClick={() => setFilter('contracting')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filter === 'contracting' 
                  ? 'bg-sector-contracting text-white shadow-sm' 
                  : 'text-zinc-600 hover:text-sector-contracting-dark hover:bg-sector-contracting-light'
              }`}
            >
              <HardHat className="w-3.5 h-3.5" />
              <span>{dict.projects.filter_contr}</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isHosp = item.sector === 'hospitality';
            const isMfg = item.sector === 'manufacturing';
            const isContr = item.sector === 'contracting';

            const badgeBg = isHosp ? 'bg-sector-hospitality-light text-sector-hospitality border-sector-hospitality-border'
              : isMfg ? 'bg-sector-manufacturing-light text-sector-manufacturing border-sector-manufacturing-border'
              : 'bg-sector-contracting-light text-sector-contracting border-sector-contracting-border';

            return (
              <div 
                key={item.id} 
                className="card-hover rounded-3xl bg-white border border-brand-border p-6 flex flex-col justify-between shadow-ambient group"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${badgeBg}`}>
                      {isHosp && <Building2 className="w-3 h-3" />}
                      {isMfg && <Factory className="w-3 h-3" />}
                      {isContr && <HardHat className="w-3 h-3" />}
                      <span>{item.category}</span>
                    </span>

                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-brand-dark mb-2 tracking-tight group-hover:text-brand-accent transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-brand-muted leading-relaxed mb-6 line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div>
                  {/* Highlight Bar */}
                  <div className="p-3 rounded-xl bg-brand-pearl border border-brand-border/60 mb-4 text-xs font-bold text-brand-dark flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>{item.highlight}</span>
                  </div>

                  {/* Footer Meta */}
                  <div className="flex items-center justify-between text-xs text-zinc-500 pt-3 border-t border-brand-border">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{item.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
