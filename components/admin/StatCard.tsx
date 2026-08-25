'use client';

import React from 'react';
import { LucideIcon, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  badge?: string;
  badgeColor?: string;
  href?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-400',
  badge,
  badgeColor = 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  href,
}: StatCardProps) {
  const content = (
    <div className="relative overflow-hidden bg-[#0F1117]/90 hover:bg-[#141721] border border-white/10 hover:border-white/20 rounded-3xl p-6 transition-all duration-200 group shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 min-w-0 flex-1 pr-2">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider leading-snug">
            {title}
          </p>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-zinc-500 font-medium line-clamp-1">{subtitle}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${iconColor} group-hover:scale-105 transition-transform shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
          {badge && (
            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap shrink-0 inline-flex items-center ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
      </div>

      {href && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-blue-400 font-semibold group-hover:text-blue-300">
          <span>View details</span>
          <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
