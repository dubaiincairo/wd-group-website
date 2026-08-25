'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Compass, Target, ShieldCheck, Sparkles, Award, Lightbulb, Scale, Users } from 'lucide-react';

export default function VisionMissionValues() {
  const { lang, dict } = useLanguage();
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'values'>('vision');

  const VALUE_ICONS = [Award, Lightbulb, Scale, Users];

  return (
    <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface border border-brand-border text-blue-400 shadow-glow-card">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.home.identity.label}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {dict.home.identity.label}
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-brand-surface border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('vision')}
              className={`px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'vision'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{dict.home.identity.vision_title}</span>
            </button>

            <button
              onClick={() => setActiveTab('mission')}
              className={`px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'mission'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>{dict.home.identity.mission_title}</span>
            </button>

            <button
              onClick={() => setActiveTab('values')}
              className={`px-5 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'values'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{dict.home.identity.values_title}</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="max-w-4xl mx-auto">
          
          {/* Vision Tab */}
          <div className={`transition-opacity duration-300 ${activeTab === 'vision' ? 'block' : 'hidden'}`}>
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/30 shadow-2xl relative overflow-hidden bg-brand-surface/80">
              <div className="flex items-center gap-3 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider mb-6">
                <Compass className="w-4 h-4" />
                <span>{dict.home.identity.vision_title}</span>
              </div>
              <p className="text-lg sm:text-2xl text-zinc-100 leading-relaxed font-medium">
                &ldquo;{dict.home.identity.vision_desc}&rdquo;
              </p>
            </div>
          </div>

          {/* Mission Tab */}
          <div className={`transition-opacity duration-300 ${activeTab === 'mission' ? 'block' : 'hidden'}`}>
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/30 shadow-2xl relative overflow-hidden bg-brand-surface/80">
              <div className="flex items-center gap-3 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider mb-6">
                <Target className="w-4 h-4" />
                <span>{dict.home.identity.mission_title}</span>
              </div>
              <p className="text-lg sm:text-2xl text-zinc-100 leading-relaxed font-medium">
                &ldquo;{dict.home.identity.mission_desc}&rdquo;
              </p>
            </div>
          </div>

          {/* Values Tab (4 Values Grid) */}
          <div className={`transition-opacity duration-300 ${activeTab === 'values' ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dict.home.identity.values.map((val, idx) => {
                const Icon = VALUE_ICONS[idx % VALUE_ICONS.length];
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-brand-surface/90 border border-white/10 hover:border-blue-500/40 transition-all flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1.5">
                        {val.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
