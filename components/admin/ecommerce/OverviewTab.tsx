'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
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
  Percent,
  DollarSign
} from 'lucide-react';

interface OverviewTabProps {
  orders: EcommerceOrderRecord[];
  currency: 'SAR' | 'USD';
  onSelectOrder: (order: EcommerceOrderRecord) => void;
  onNavigateTab: (tab: string) => void;
}

export default function OverviewTab({ orders, currency, onSelectOrder, onNavigateTab }: OverviewTabProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [timeRange, setTimeRange] = useState<'30d' | '6m' | 'ytd'>('6m');

  const formatPrice = (valSAR: number) => {
    if (currency === 'USD') {
      const valUSD = Math.round(valSAR / 3.75);
      return {
        amount: valUSD.toLocaleString('en-US'),
        unit: 'USD',
      };
    }
    return {
      amount: valSAR.toLocaleString('en-US'),
      unit: isAr ? 'ر.س' : 'SAR',
    };
  };

  const totalRevSAR = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeCount = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;
  const b2bRevSAR = orders.filter((o) => o.orderType === 'b2b').reduce((sum, o) => sum + o.totalAmount, 0);
  const b2bPercent = totalRevSAR > 0 ? Math.round((b2bRevSAR / totalRevSAR) * 100) : 0;
  const aovSAR = orders.length > 0 ? Math.round(totalRevSAR / orders.length) : 0;

  // Monthly sales trend data (Saudi market simulation in SAR)
  const salesTrend = [
    { month: isAr ? 'مارس' : 'Mar', revSAR: 320000, orders: 18, heightPercent: 55 },
    { month: isAr ? 'أبريل' : 'Apr', revSAR: 410000, orders: 24, heightPercent: 70 },
    { month: isAr ? 'مايو' : 'May', revSAR: 380000, orders: 22, heightPercent: 65 },
    { month: isAr ? 'يونيو' : 'Jun', revSAR: 490000, orders: 31, heightPercent: 84 },
    { month: isAr ? 'يوليو' : 'Jul', revSAR: 520000, orders: 35, heightPercent: 89 },
    { month: isAr ? 'أغسطس' : 'Aug', revSAR: 584200, orders: 42, heightPercent: 100, isCurrent: true },
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
            <h4 className="text-xs sm:text-sm font-bold text-white">
              {isAr ? 'تنبيه مخزون وشحن مصنعي عاجل' : 'Urgent Inventory & Production Queue Alerts'}
            </h4>
            <p className="text-xs text-zinc-400">
              {isAr 
                ? '3 قطع أثاث رئيسية وصلت للحد الأدنى (أقل من 3 وحدات) بمصنع الرياض 1، وهناك طلبان توريد فندقي جاهزان للشحن.' 
                : '3 flagship pieces reached minimum stock (< 3 units) in Riyadh Plant 1. 2 Hospitality orders ready for dispatch.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateTab('orders')}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-all"
          >
            {isAr ? 'عرض الطلبات' : 'View Orders'}
          </button>
          <button
            onClick={() => onNavigateTab('inventory')}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#08090C] text-xs font-bold font-mono transition-all"
          >
            {isAr ? 'معالجة المخزون' : 'Manage Stock'}
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Bar with Standard Currency Formatting */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Card 1: Total Revenue */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              {isAr ? 'إجمالي المبيعات' : 'Total Revenue'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/30 flex items-center justify-center text-[#C9A86A]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-2xl font-extrabold text-white font-mono tracking-tight">
                {formatPrice(totalRevSAR).amount}
              </span>
              <span className="text-xs font-mono font-bold text-[#C9A86A] bg-[#C9A86A]/10 px-1.5 py-0.5 rounded border border-[#C9A86A]/20">
                {formatPrice(totalRevSAR).unit}
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
              +28.4% {isAr ? 'نمو شهري' : 'MoM growth'}
            </span>
          </div>
        </div>

        {/* Card 2: Active Orders */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              {isAr ? 'الطلبات النشطة' : 'Active Orders'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-white font-mono">
                {activeCount}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {isAr ? 'طلباً حياً' : 'live'}
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono mt-1 block">
              {isAr ? 'قيد التصنيع والتركيب' : 'In production & assembly'}
            </span>
          </div>
        </div>

        {/* Card 3: AOV */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              {isAr ? 'متوسط قيمة الطلب' : 'Average Order (AOV)'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-2xl font-extrabold text-white font-mono tracking-tight">
                {formatPrice(aovSAR).amount}
              </span>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                {formatPrice(aovSAR).unit}
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono mt-1 block">
              {isAr ? 'عقود فاخرة وتوريد فندقي' : 'High-ticket luxury suites'}
            </span>
          </div>
        </div>

        {/* Card 4: Conversion Rate */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              {isAr ? 'معدل التحويل' : 'Conversion Rate'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-white font-mono">
                3.42%
              </span>
              <span className="text-xs font-mono text-sky-400">
                Top 5%
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
              +0.6% {isAr ? 'مقارنة بالمتوسط' : 'vs benchmark'}
            </span>
          </div>
        </div>

        {/* Card 5: Active Customers */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              {isAr ? 'العملاء النشطون' : 'Active Customers'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-white font-mono">
                128
              </span>
              <span className="text-xs font-mono text-purple-400">
                VIP / B2B
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono mt-1 block">
              {isAr ? '46% عقود فنادق متكررة' : '46% repeat luxury clients'}
            </span>
          </div>
        </div>

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
                {isAr ? 'تطور حجم الإيرادات الشهرية بعقود الأثاث السكني والفندقي' : `Gross revenue and volume progression in ${currency}`}
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

          {/* High-End Visual Bar Chart with Zero Dead Space */}
          <div className="pt-4 pb-2">
            <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 border-b border-white/10 px-2 pb-2">
              {salesTrend.map((item, idx) => {
                const formatted = formatPrice(item.revSAR);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full gap-2 group relative">
                    
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#141721] border border-white/20 px-3 py-1.5 rounded-xl shadow-2xl text-[10px] font-mono text-center z-30 whitespace-nowrap">
                      <span className="text-[#C9A86A] font-bold block">{formatted.amount} {formatted.unit}</span>
                      <span className="text-zinc-400">{item.orders} {isAr ? 'طلباً معتمداً' : 'orders'}</span>
                    </div>

                    {/* Visual Bar Box */}
                    <div className="w-full max-w-[48px] h-40 bg-white/5 rounded-t-xl overflow-hidden flex items-end relative border border-white/5">
                      <div
                        style={{ height: `${item.heightPercent}%` }}
                        className={`w-full rounded-t-xl transition-all duration-700 ${
                          item.isCurrent
                            ? 'bg-gradient-to-t from-[#C9A86A] via-[#DFBA73] to-[#E3C58A] shadow-[0_0_20px_rgba(201,168,106,0.5)]'
                            : 'bg-gradient-to-t from-blue-600/40 to-blue-500/80 group-hover:from-blue-600/60 group-hover:to-blue-400'
                        }`}
                      />
                    </div>

                    {/* Month Label */}
                    <span className={`text-[11px] font-mono ${item.isCurrent ? 'text-[#C9A86A] font-bold' : 'text-zinc-400'}`}>
                      {item.month}
                    </span>
                  </div>
                );
              })}
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

        {/* Right 1 Col: Factory Workcenters & Capacity Load */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Factory className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'جاهزية خطوط الإنتاج والمصانع' : 'Factory Workcenters Load'}</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {isAr ? 'معدل التشغيل اللحظي بماكينات CNC والتنجيد' : 'Real-time telemetry across GreenWood plants'}
            </p>
          </div>

          <div className="space-y-4">
            {/* Factory 1: Wood & Joinery */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-300">{isAr ? 'مصنع 1 (أخشاب وCNC)' : 'Plant 1: 5-Axis Wood & CNC'}</span>
                <span className="text-amber-400 font-bold">78% Load</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-[#C9A86A] rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            {/* Factory 2: Metals */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-300">{isAr ? 'مصنع 2 (نحاس ومعادن)' : 'Plant 2: Architectural Metals'}</span>
                <span className="text-emerald-400 font-bold">45% Load</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            {/* Factory 3: Upholstery */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-300">{isAr ? 'مصنع 3 (تنجيد وجلود)' : 'Plant 3: Leather & Upholstery'}</span>
                <span className="text-rose-400 font-bold">85% Load</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">{isAr ? 'حصة عقود المشاريع والفنادق:' : 'Hospitality B2B Share:'}</span>
            <span className="text-[#C9A86A] font-bold">{b2bPercent}% ({formatPrice(b2bRevSAR).amount} {formatPrice(b2bRevSAR).unit})</span>
          </div>
        </div>

      </div>

      {/* 4. Recent Incoming Orders Table & Top Performing Pieces */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders Feed */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C9A86A]" />
              <span>{isAr ? 'أحدث الطلبات الواردة' : 'Recent Inflow Orders'}</span>
            </h3>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-mono text-[#C9A86A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{isAr ? 'عرض الكل' : 'View all'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

          <div className="space-y-2.5">
            {orders.slice(0, 4).map((ord) => {
              const formattedTotal = formatPrice(ord.totalAmount);

              return (
                <div
                  key={ord.id}
                  onClick={() => onSelectOrder(ord)}
                  className="p-3.5 rounded-2xl bg-[#141721] hover:bg-[#181c29] border border-white/5 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-[#C9A86A] font-bold">
                      {ord.orderType === 'b2b' ? 'B2B' : 'RET'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white group-hover:text-[#C9A86A] transition-colors">
                          {ord.orderRef}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {new Date(ord.createdAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-GB')}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400 block truncate max-w-[200px]">
                        {ord.customerName} · {ord.city}
                      </span>
                    </div>
                  </div>

                  <div className="text-right rtl:text-left font-mono">
                    <span className="text-xs font-bold text-[#C9A86A] block">
                      {formattedTotal.amount} {formattedTotal.unit}
                    </span>
                    <span className="text-[10px] text-emerald-400 capitalize">
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performing Luxury Pieces */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'القطع الأكثر مبيعاً' : 'Top Selling Pieces'}</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {isAr ? 'الأعلى مساهمة في حجم الإيرادات الشهرية' : 'Highest revenue contributors'}
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                sku: 'GW-LV-801',
                nameEn: 'The Al-Diriyah Modular Sofa',
                nameAr: 'أريكة الدرعية المنحنية',
                revSAR: 189000,
                units: 10,
                img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80',
              },
              {
                sku: 'GW-BD-702',
                nameEn: 'SwissBlue Suite Bed & Joinery',
                nameAr: 'سرير الجناح الرئاسي سويس بلو',
                revSAR: 171500,
                units: 7,
                img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=300&q=80',
              },
              {
                sku: 'GW-EX-990',
                nameEn: 'The Tuwaiq Boardroom Table',
                nameAr: 'طاولة اجتماعات طويق التنفيذية',
                revSAR: 152000,
                units: 4,
                img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80',
              },
            ].map((piece, idx) => (
              <div key={idx} className="p-2.5 rounded-2xl bg-[#141721] border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <Image src={piece.img} alt={piece.nameEn} fill className="object-cover" unoptimized />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-[#C9A86A] block">{piece.sku}</span>
                    <h5 className="text-xs font-bold text-white truncate">
                      {isAr ? piece.nameAr : piece.nameEn}
                    </h5>
                    <span className="text-[10px] text-zinc-400 font-mono">{piece.units} {isAr ? 'وحدة مباعة' : 'units sold'}</span>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-[#C9A86A] shrink-0">
                  {formatPrice(piece.revSAR).amount} {formatPrice(piece.revSAR).unit}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('products')}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-bold transition-all text-center cursor-pointer"
          >
            {isAr ? 'إدارة كتالوج المنتجات' : 'Manage Product Catalog'}
          </button>
        </div>

      </div>

    </div>
  );
}
