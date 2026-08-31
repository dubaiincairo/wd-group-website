'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import StatCard from '@/components/admin/StatCard';
import { EcommerceOrderRecord } from '@/lib/admin/types';
import { 
  TrendingUp, 
  ShoppingCart, 
  Building2, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  Factory, 
  Truck, 
  Clock, 
  Layers,
  Users,
  Percent
} from 'lucide-react';

interface OverviewTabProps {
  orders: EcommerceOrderRecord[];
  onSelectOrder: (order: EcommerceOrderRecord) => void;
  onNavigateTab: (tab: string) => void;
}

export default function OverviewTab({ orders, onSelectOrder, onNavigateTab }: OverviewTabProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [timeRange, setTimeRange] = useState<'30d' | '6m' | 'ytd'>('6m');

  const totalRev = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeCount = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;
  const b2bRev = orders.filter((o) => o.orderType === 'b2b').reduce((sum, o) => sum + o.totalAmount, 0);
  const b2bPercent = totalRev > 0 ? Math.round((b2bRev / totalRev) * 100) : 0;
  const aov = orders.length > 0 ? Math.round(totalRev / orders.length) : 0;

  // Monthly sales trend data (Saudi market simulation in SAR)
  const salesTrend = [
    { month: isAr ? 'مارس' : 'Mar', rev: 320000, orders: 18, height: '45%' },
    { month: isAr ? 'أبريل' : 'Apr', rev: 410000, orders: 24, height: '60%' },
    { month: isAr ? 'مايو' : 'May', rev: 380000, orders: 22, height: '55%' },
    { month: isAr ? 'يونيو' : 'Jun', rev: 490000, orders: 31, height: '75%' },
    { month: isAr ? 'يوليو' : 'Jul', rev: 520000, orders: 35, height: '82%' },
    { month: isAr ? 'أغسطس' : 'Aug', rev: 584200, orders: 42, height: '100%', isCurrent: true },
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Urgent Low Stock & Factory Queue Alert Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#0F1117] to-amber-500/5 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>{isAr ? 'تنبيهات المخزون والتصنيع الفندقي' : 'Operational & Low Stock Alerts'}</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-[#08090C] text-[10px] font-mono font-extrabold">
                2 Items
              </span>
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isAr 
                ? 'قطعتان من أريكة الدرعية وصلت لحد إعادة الطلب في مصنع 1، و 3 أوامر توريد فندقية جاهزة لجدولة التركيب في جدة.'
                : 'Al-Diriyah Sofa is below safety threshold in Factory 1; 3 commercial FF&E orders ready for site dispatch.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateTab('inventory')}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#08090C] text-xs font-bold font-mono transition-all"
          >
            {isAr ? 'معالجة المخزون' : 'Manage Stock'}
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title={isAr ? 'إجمالي المبيعات' : 'Total Revenue'}
          value={`${totalRev.toLocaleString('en-US')} SAR`}
          subtitle={isAr ? '+28.4% نمو شهري' : '+28.4% MoM growth'}
          icon={TrendingUp}
          iconColor="text-[#C9A86A]"
          badge="SAR"
          badgeColor="amber"
        />

        <StatCard
          title={isAr ? 'الطلبات النشطة' : 'Active Orders'}
          value={activeCount.toString()}
          subtitle={isAr ? 'قيد التصنيع والتسليم' : 'In production & dispatch'}
          icon={ShoppingCart}
          iconColor="text-emerald-400"
          badge="Live"
          badgeColor="emerald"
        />

        <StatCard
          title={isAr ? 'متوسط قيمة الطلب' : 'Average Order (AOV)'}
          value={`${aov.toLocaleString('en-US')} SAR`}
          subtitle={isAr ? 'تأثيث فاخر وعقود أجنحة' : 'High-ticket luxury pieces'}
          icon={Sparkles}
          iconColor="text-amber-400"
          badge="AOV"
          badgeColor="amber"
        />

        <StatCard
          title={isAr ? 'معدل التحويل' : 'Conversion Rate'}
          value="3.42%"
          subtitle={isAr ? '+0.6% عن الشهر الماضي' : '+0.6% vs benchmark'}
          icon={Percent}
          iconColor="text-sky-400"
          badge="Top 5%"
          badgeColor="sky"
        />

        <StatCard
          title={isAr ? 'العملاء النشطون' : 'Active Customers'}
          value="128"
          subtitle={isAr ? '46% عملاء متكررون وفنادق' : '46% VIP & B2B repeat'}
          icon={Users}
          iconColor="text-purple-400"
          badge="VIP"
          badgeColor="purple"
        />
      </div>

      {/* 3. Sales Trend Visual Chart & Factory Production Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Sales Growth Bar Chart */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C9A86A]" />
                <span>{isAr ? 'مؤشر نمو المبيعات الشهرية (2026)' : 'Monthly Sales & Revenue Velocity'}</span>
              </h3>
              <p className="text-xs text-zinc-400">
                {isAr ? 'تطور حجم الإيرادات الشهرية بعقود الأثاث السكني والفندقي' : 'Gross revenue and volume progression in SAR'}
              </p>
            </div>

            <div className="flex items-center gap-1 bg-[#141721] p-1 rounded-xl border border-white/10 text-xs font-mono">
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  timeRange === '30d' ? 'bg-[#C9A86A] text-[#08090C] font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                30D
              </button>
              <button
                onClick={() => setTimeRange('6m')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  timeRange === '6m' ? 'bg-[#C9A86A] text-[#08090C] font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                6M
              </button>
              <button
                onClick={() => setTimeRange('ytd')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  timeRange === 'ytd' ? 'bg-[#C9A86A] text-[#08090C] font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                YTD
              </button>
            </div>
          </div>

          {/* Bar Chart Visualizer */}
          <div className="pt-6 pb-2">
            <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 border-b border-white/10 px-2">
              {salesTrend.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#141721] border border-white/15 px-2.5 py-1 rounded-lg shadow-xl text-[10px] font-mono text-center z-20 whitespace-nowrap">
                    <span className="text-[#C9A86A] font-bold block">{item.rev.toLocaleString('en-US')} SAR</span>
                    <span className="text-zinc-400">{item.orders} orders</span>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full max-w-[48px] bg-white/5 rounded-t-xl overflow-hidden flex items-end h-full">
                    <div
                      style={{ height: item.height }}
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        item.isCurrent
                          ? 'bg-gradient-to-t from-[#C9A86A] via-[#DFBA73] to-[#E3C58A] shadow-[0_0_20px_rgba(201,168,106,0.4)]'
                          : 'bg-gradient-to-t from-blue-600/40 to-blue-500/80 group-hover:from-blue-600/60 group-hover:to-blue-400'
                      }`}
                    />
                  </div>

                  {/* Month Label */}
                  <span className={`text-[11px] font-mono ${item.isCurrent ? 'text-[#C9A86A] font-bold' : 'text-zinc-400'}`}>
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400 pt-2 border-t border-white/5">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C9A86A]" />
                <span>{isAr ? 'الشهر الحالي (أغسطس)' : 'Current Month (Aug)'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>{isAr ? 'الأشهر السابقة' : 'Historical'}</span>
              </span>
            </div>
            <span className="text-emerald-400 font-bold">
              {isAr ? 'متوسط معدل النمو الشهري: +21.8%' : 'Average MoM Run-Rate: +21.8%'}
            </span>
          </div>
        </div>

        {/* Right Col: Factory Queue & Production Capacity */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Factory className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'الطاقة الإنتاجية بالمصانع' : 'Saudi Factory Workcenters'}</span>
            </h3>
            <p className="text-xs text-zinc-400">
              {isAr ? 'حالة ماكينات CNC وخطوط التنجيد بالرياض ونجران' : 'Capacity load across 3 specialized plants'}
            </p>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {/* Plant 1 */}
            <div className="p-3.5 rounded-2xl bg-[#141721] border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">Factory 1 — Wood & Joinery</span>
                <span className="text-[#C9A86A] font-bold">78% Load</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-[#C9A86A] h-full rounded-full" style={{ width: '78%' }} />
              </div>
              <span className="text-[10px] text-zinc-400 block">5-Axis CNC Milling active on Al-Diriyah & Tuwaiq</span>
            </div>

            {/* Plant 2 */}
            <div className="p-3.5 rounded-2xl bg-[#141721] border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">Factory 2 — Metal & Brass</span>
                <span className="text-blue-400 font-bold">45% Load</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '45%' }} />
              </div>
              <span className="text-[10px] text-zinc-400 block">Laser Cutting & PVD Champagne Gold line</span>
            </div>

            {/* Plant 3 */}
            <div className="p-3.5 rounded-2xl bg-[#141721] border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">Factory 3 — Upholstery Hub</span>
                <span className="text-emerald-400 font-bold">85% Load</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
              </div>
              <span className="text-[10px] text-zinc-400 block">Italian Leather & Bouclé hand-stitching active</span>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('factory')}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-zinc-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{isAr ? 'عرض جدول الإنتاج الكامل' : 'Open Production Pipeline'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 4. Recent Live Orders Feed & Top Selling Pieces */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders List */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#C9A86A]" />
              <span>{isAr ? 'أحدث طلبات الأثاث الفاخر الواردة' : 'Recent Luxury Furniture Orders'}</span>
            </h3>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-mono text-[#C9A86A] hover:underline cursor-pointer"
            >
              {isAr ? 'عرض كافة الطلبات' : 'View all orders'} →
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {orders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                onClick={() => onSelectOrder(order)}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-white/[0.02] -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#C9A86A] group-hover:underline">
                      {order.orderRef}
                    </span>
                    <span className={`px-2 py-0.2 rounded text-[9px] font-mono uppercase ${
                      order.orderType === 'b2b' ? 'bg-amber-500/15 text-amber-300' : 'bg-blue-500/15 text-blue-300'
                    }`}>
                      {order.orderType}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-white truncate max-w-xs">{order.customerName}</h4>
                  <span className="text-[10px] text-zinc-500 font-mono">{order.city} · {order.items.length} items</span>
                </div>

                <div className="text-right rtl:text-left space-y-0.5">
                  <span className="text-xs font-mono font-extrabold text-white block">
                    {order.totalAmount.toLocaleString('en-US')} SAR
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono uppercase">{order.status.replace('_', ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products Share */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'القطع الأكثر مبيعاً وإيراداً' : 'Top Performing Signature Pieces'}</span>
          </h3>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-[#141721] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Al-Diriyah Curved Sofa</span>
                <span className="text-[10px] text-zinc-400 font-mono">18,900 SAR · 28 sold</span>
              </div>
              <span className="text-xs font-mono font-extrabold text-[#C9A86A]">529,200 SAR</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#141721] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">SwissBlue Signature Suite Bed</span>
                <span className="text-[10px] text-zinc-400 font-mono">24,500 SAR · 19 suites</span>
              </div>
              <span className="text-xs font-mono font-extrabold text-[#C9A86A]">465,500 SAR</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#141721] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Tuwaiq Executive Boardroom</span>
                <span className="text-[10px] text-zinc-400 font-mono">38,000 SAR · 14 corporate</span>
              </div>
              <span className="text-xs font-mono font-extrabold text-[#C9A86A]">532,000 SAR</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
