'use client';

import React from 'react';

interface WireframeBlockProps {
  sectionNumber: string;
  title: string;
  description: string;
  height?: string;
  children?: React.ReactNode;
  badge?: string;
}

export default function WireframeBlock({
  sectionNumber,
  title,
  description,
  height = 'min-h-[220px]',
  children,
  badge,
}: WireframeBlockProps) {
  return (
    <div className={`relative w-full rounded-2xl border-2 border-dashed border-zinc-700/80 bg-zinc-900/40 p-6 sm:p-8 ${height} flex flex-col justify-between overflow-hidden transition-all hover:border-blue-500/60 group`}>
      
      {/* Blueprint Corner Crosshairs */}
      <div className="absolute top-2 left-2 text-zinc-600 font-mono text-[10px] select-none">+</div>
      <div className="absolute top-2 right-2 text-zinc-600 font-mono text-[10px] select-none">+</div>
      <div className="absolute bottom-2 left-2 text-zinc-600 font-mono text-[10px] select-none">+</div>
      <div className="absolute bottom-2 right-2 text-zinc-600 font-mono text-[10px] select-none">+</div>

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/40">
            {sectionNumber}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-zinc-100 tracking-tight">
            {title}
          </h3>
        </div>
        {badge && (
          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
            {badge}
          </span>
        )}
      </div>

      {/* Wireframe Placeholder Content */}
      <div className="flex-1 my-2 relative z-10">
        {children ? (
          children
        ) : (
          <div className="space-y-3 py-4">
            <div className="h-3.5 bg-zinc-800 rounded-md w-3/4 animate-pulse"></div>
            <div className="h-3 bg-zinc-800/60 rounded-md w-full"></div>
            <div className="h-3 bg-zinc-800/40 rounded-md w-5/6"></div>
          </div>
        )}
      </div>

      {/* Footer Meta Description */}
      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-mono relative z-10">
        <span>// {description}</span>
        <span className="text-zinc-600">WIREFRAME STAGE</span>
      </div>

    </div>
  );
}
