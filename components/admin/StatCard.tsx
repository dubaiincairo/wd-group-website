'use client';

import React from 'react';
import { LucideIcon, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  badge?: string;
  badgeColor?: string;
  statusDot?: boolean | string;
  href?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-400',
  badge,
  badgeColor = 'sky',
  statusDot,
  href,
}: StatCardProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  // Determine dot color based on badge or badgeColor string
  const hasDot = Boolean(badge || statusDot);
  const colorStr = `${badgeColor} ${iconColor}`.toLowerCase();
  
  const getDotPingColor = () => {
    if (colorStr.includes('emerald') || colorStr.includes('green') || colorStr.includes('optimal') || colorStr.includes('healthy')) return 'bg-emerald-400';
    if (colorStr.includes('purple') || colorStr.includes('prod')) return 'bg-purple-400';
    if (colorStr.includes('amber') || colorStr.includes('yellow') || colorStr.includes('warn')) return 'bg-amber-400';
    if (colorStr.includes('rose') || colorStr.includes('red') || colorStr.includes('error')) return 'bg-rose-400';
    return 'bg-sky-400';
  };

  const getDotSolidColor = () => {
    if (colorStr.includes('emerald') || colorStr.includes('green') || colorStr.includes('optimal') || colorStr.includes('healthy')) return 'bg-emerald-500';
    if (colorStr.includes('purple') || colorStr.includes('prod')) return 'bg-purple-500';
    if (colorStr.includes('amber') || colorStr.includes('yellow') || colorStr.includes('warn')) return 'bg-amber-500';
    if (colorStr.includes('rose') || colorStr.includes('red') || colorStr.includes('error')) return 'bg-rose-500';
    return 'bg-sky-500';
  };

  const content = (
    <div className="relative h-full flex flex-col justify-between overflow-hidden bg-[#0F1117]/90 hover:bg-[#141721] border border-white/10 hover:border-white/20 rounded-3xl p-5 sm:p-6 transition-all duration-200 group shadow-lg min-h-[175px]">
      <div className="flex items-start justify-between gap-3 flex-1">
        <div className="space-y-1.5 min-w-0 flex-1 pr-2 rtl:pr-0 rtl:pl-2">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider leading-snug line-clamp-2 h-9 flex items-center">
            {title}
          </p>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-1">
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-zinc-500 font-medium truncate pt-0.5" title={subtitle}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Micro-Integrated Status Icon Box */}
        <div className="relative shrink-0" title={badge || undefined}>
          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${iconColor} group-hover:scale-105 transition-transform shrink-0`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          
          {/* Glowing Status Indicator Dot */}
          {hasDot && (
            <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 flex h-3.5 w-3.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getDotPingColor()}`}></span>
              <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-[#0F1117] ${getDotSolidColor()}`}></span>
            </span>
          )}
        </div>
      </div>

      {href && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-blue-400 font-semibold group-hover:text-blue-300">
          <span>{isAr ? 'عرض التفاصيل' : 'View details'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-270 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="h-full block">
        {content}
      </Link>
    );
  }

  return content;
}

