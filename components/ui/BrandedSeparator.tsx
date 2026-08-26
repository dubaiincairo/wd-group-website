'use client';

import React from 'react';

interface BrandedSeparatorProps {
  variant?: 'gold' | 'blue' | 'emerald' | 'amber';
  className?: string;
}

export default function BrandedSeparator({ variant = 'gold', className = '' }: BrandedSeparatorProps) {
  const lineGlow = {
    gold: 'via-[#C9A86A]/40',
    blue: 'via-blue-500/40',
    emerald: 'via-emerald-500/40',
    amber: 'via-amber-500/40',
  }[variant];

  const centerDot = {
    gold: 'bg-[#C9A86A] border-[#E3C58A] shadow-[0_0_14px_rgba(201,168,106,0.85)]',
    blue: 'bg-blue-500 border-blue-300 shadow-[0_0_14px_rgba(59,130,246,0.85)]',
    emerald: 'bg-emerald-500 border-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.85)]',
    amber: 'bg-amber-500 border-amber-300 shadow-[0_0_14px_rgba(245,158,11,0.85)]',
  }[variant];

  return (
    <div className={`relative w-full flex items-center justify-center my-0 pointer-events-none select-none ${className}`}>
      {/* Gradient Hairline */}
      <div className={`h-[1px] w-full bg-gradient-to-r from-transparent ${lineGlow} to-transparent`} />
      
      {/* Center Luxury Emblem Constellation */}
      <div className="absolute flex items-center gap-1.5 bg-[#08090C] px-3.5 py-0.5">
        <div className="w-1 h-1 rotate-45 bg-[#C9A86A]/40" />
        <div className={`w-2 h-2 rotate-45 ${centerDot} border`} />
        <div className="w-1 h-1 rotate-45 bg-[#C9A86A]/40" />
      </div>
    </div>
  );
}
