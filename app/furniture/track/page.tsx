'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { FURNITURE_CATALOG } from '@/lib/furnitureData';
import { 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Factory, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Wrench,
  PackageCheck,
  UserCheck,
  Zap
} from 'lucide-react';

function OrderTrackerContent() {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';
  const searchParams = useSearchParams();

  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any>(null);

  // Demo active order data with cleaned leadTechnician (removed White-Glove Lead from name)
  const sampleOrder = {
    orderRef: 'WD-ORD-2026-8812',
    customerName: isAr ? 'سلطان بن عبدالعزيز آل سعود' : 'Sultan Al-Saud',
    phone: '+966 50 572 5070',
    city: isAr ? 'الرياض — حي النرجس' : 'Riyadh — Al Narjis District',
    orderDate: '28/08/2026',
    estimatedDelivery: isAr ? '08 سبتمبر 2026 (الفترة الصباحية)' : 'September 08, 2026 (Morning Slot)',
    factory: isAr ? 'مصنع جرين وود 1 و 3 — الرياض' : 'GreenWood Factory 1 & 3 — Riyadh',
    leadTechnician: isAr ? 'م. فهد الغامدي' : 'Eng. Fahad Al-Ghamdi',
    currentStageIdx: 3, // Stage 4 in progress (0-indexed 3)
    items: [
      {
        product: FURNITURE_CATALOG[0], // Al-Diriyah curved sofa
        finishName: isAr ? 'بوكليه عاجي إيطالي' : 'Ivory Bouclé',
        quantity: 1,
      },
      {
        product: FURNITURE_CATALOG[2], // Najran travertine table
        finishName: isAr ? 'ترافرتين بيج دافئ' : 'Warm Beige Travertine',
        quantity: 1,
      },
      {
        product: FURNITURE_CATALOG[4], // Al-Ula armchair
        finishName: isAr ? 'جلد كونياك كلاسيكي' : 'Heritage Cognac Leather',
        quantity: 2,
      },
    ]
  };

  useEffect(() => {
    const refFromUrl = searchParams.get('ref');
    if (refFromUrl) {
      setQuery(refFromUrl);
      setActiveOrder({
        ...sampleOrder,
        orderRef: refFromUrl,
      });
      setSearched(true);
    } else {
      // Load sample order by default for immediate preview
      setActiveOrder(sampleOrder);
      setSearched(true);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setActiveOrder({
      ...sampleOrder,
      orderRef: query.trim().toUpperCase(),
    });
    setSearched(true);
  };

  const stages = [
    {
      num: 1,
      title: dict.furniture.tracking.stages.stage1,
      desc: dict.furniture.tracking.stages.stage1_desc,
      icon: CheckCircle2,
      location: isAr ? 'المكتب الهندسي — الرياض' : 'Engineering Dept — Riyadh',
      timestamp: isAr ? '28 أغسطس · 10:30 ص' : 'Aug 28 · 10:30 AM',
    },
    {
      num: 2,
      title: dict.furniture.tracking.stages.stage2,
      desc: dict.furniture.tracking.stages.stage2_desc,
      icon: Layers,
      location: isAr ? 'مستودع الأخشاب والأحجار — نجران' : 'Timber & Stone Yard — Najran',
      timestamp: isAr ? '29 أغسطس · 02:15 م' : 'Aug 29 · 02:15 PM',
    },
    {
      num: 3,
      title: dict.furniture.tracking.stages.stage3,
      desc: dict.furniture.tracking.stages.stage3_desc,
      icon: Factory,
      location: isAr ? 'ورشة ماكينات 5-CNC — مصنع 1' : '5-Axis CNC Milling — Factory 1',
      timestamp: isAr ? '30 أغسطس · 04:00 م' : 'Aug 30 · 04:00 PM',
    },
    {
      num: 4,
      title: dict.furniture.tracking.stages.stage4,
      desc: dict.furniture.tracking.stages.stage4_desc,
      icon: Wrench,
      location: isAr ? 'مركز التنجيد والدهان — مصنع 3' : 'Upholstery & PU Coating — Factory 3',
      timestamp: isAr ? 'جارٍ التنفيذ حالياً' : 'Currently Active',
    },
    {
      num: 5,
      title: dict.furniture.tracking.stages.stage5,
      desc: dict.furniture.tracking.stages.stage5_desc,
      icon: PackageCheck,
      location: isAr ? 'مركز ضبط الجودة والتغليف' : 'Quality Assurance & Crating Hub',
      timestamp: isAr ? 'مجدول: 05 سبتمبر' : 'Scheduled: Sep 05',
    },
    {
      num: 6,
      title: dict.furniture.tracking.stages.stage6,
      desc: dict.furniture.tracking.stages.stage6_desc,
      icon: Truck,
      location: isAr ? 'الأسطول اللوجستي المباشر' : 'Dedicated White-Glove Fleet',
      timestamp: isAr ? 'مجدول: 08 سبتمبر' : 'Scheduled: Sep 08',
    },
  ];

  return (
    <div className="min-h-screen bg-[#08090C] text-white pt-24 pb-20 selection:bg-[#C9A86A]/30">
      
      {/* Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-[#C9A86A]/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#0B5C3D]/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/furniture"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#C9A86A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{isAr ? 'العودة إلى معرض الأثاث' : 'Back to Furniture Showroom'}</span>
          </Link>

          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isAr ? 'مزامنة حية مع مصانع جرين وود' : 'Live Factory Sync Active'}</span>
          </span>
        </div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono font-medium">
            <Factory className="w-3.5 h-3.5" />
            <span>GreenWood Manufacturing Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {dict.furniture.tracking.page_title}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            {dict.furniture.tracking.page_subtitle}
          </p>
        </motion.div>

        {/* Search Bar with Optimized Padding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={dict.furniture.tracking.search_placeholder}
              className="w-full pl-12 pr-36 rtl:pl-36 rtl:pr-12 py-4 rounded-2xl bg-[#0F1117] border border-white/15 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-[#C9A86A] shadow-2xl transition-all font-mono"
            />
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 rtl:left-auto rtl:right-4 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-2 rtl:right-auto rtl:left-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBA73] text-[#08090C] font-extrabold text-xs hover:shadow-lg transition-all cursor-pointer font-mono shrink-0"
            >
              {dict.furniture.tracking.track_btn}
            </button>
          </form>

          {/* Quick Demo Button */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setQuery('WD-ORD-2026-8812');
                setActiveOrder(sampleOrder);
                setSearched(true);
              }}
              className="text-[11px] text-zinc-400 hover:text-[#C9A86A] underline underline-offset-4 transition-colors font-mono cursor-pointer"
            >
              {dict.furniture.tracking.sample_order_btn}
            </button>
          </div>
        </motion.div>

        {/* ACTIVE ORDER TRACKING RESULTS */}
        {searched && activeOrder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            
            {/* 1. Order Status Banner */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#C9A86A]/30 bg-[#0F1117]/90 shadow-2xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-mono font-extrabold text-[#C9A86A]">
                      {activeOrder.orderRef}
                    </h2>
                    <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      <span>{dict.furniture.tracking.status_in_progress} (65%)</span>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    {dict.furniture.tracking.customer_name}: <span className="text-white font-semibold">{activeOrder.customerName}</span> · {activeOrder.phone}
                  </p>
                </div>

                <div className="text-left sm:text-right rtl:sm:text-left space-y-1 font-mono text-xs">
                  <span className="text-zinc-500 block text-[10px] uppercase">{dict.furniture.tracking.lead_time_target}</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activeOrder.estimatedDelivery}</span>
                  </span>
                </div>
              </div>

              {/* Order Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[#141721] border border-white/5 space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase block">{dict.furniture.tracking.destination}</span>
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>{activeOrder.city}</span>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#141721] border border-white/5 space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase block">{isAr ? 'المصنع المسؤول' : 'Fabrication Facility'}</span>
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>{activeOrder.factory}</span>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#141721] border border-white/5 space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase block">{isAr ? 'مهندس فريق التركيب المعتمد' : 'White-Glove Installation Lead'}</span>
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{activeOrder.leadTechnician}</span>
                  </span>
                </div>
              </div>

              {/* Items in this Fabrication Batch */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-zinc-400 uppercase font-mono">
                  {isAr ? 'القطع قيد التصنيع والتجهيز في هذا الطلب' : 'Pieces in Current Manufacturing Batch'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-2xl bg-[#141721] border border-white/5 flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black/40">
                        <Image
                          src={item.product.images[0]}
                          alt={isAr ? item.product.nameAr : item.product.nameEn}
                          fill
                          sizes="56px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <span className="text-[10px] font-mono text-[#C9A86A] block truncate">{item.product.sku}</span>
                        <h4 className="text-xs font-bold text-white truncate">
                          {isAr ? item.product.nameAr : item.product.nameEn}
                        </h4>
                        <span className="text-[10px] text-zinc-400 block">{item.finishName} · ×{item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Enhanced Visual 6-Stage Manufacturing Pipeline */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#0F1117]/80 space-y-8 shadow-2xl">
              
              {/* Timeline Header & Progress Bar */}
              <div className="space-y-4 pb-4 border-b border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#C9A86A]" />
                      <span>{isAr ? 'مراحل التصنيع والتسليم الميداني' : 'Manufacturing & Site Delivery Timeline'}</span>
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {isAr ? 'تحديثات مباشرة من أنظمة التحكم بماكينات CNC بمصانع جرين وود' : 'Live telemetry from GreenWood CNC workcenters and logistics fleet'}
                    </p>
                  </div>

                  <div className="text-left sm:text-right rtl:sm:text-left font-mono">
                    <span className="text-xs font-bold text-[#C9A86A] block">
                      {isAr ? 'المرحلة 4 من 6 قيد التنفيذ' : 'Stage 4 of 6 In Progress'}
                    </span>
                    <span className="text-[11px] text-emerald-400">65% Overall Completion</span>
                  </div>
                </div>

                {/* Glowing Progress Bar */}
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-[#DFBA73] to-[#C9A86A] shadow-[0_0_20px_rgba(201,168,106,0.6)] transition-all duration-1000"
                    style={{ width: '65%' }}
                  />
                </div>
              </div>

              {/* Vertical Step Timeline */}
              <div className="relative pl-7 rtl:pl-0 rtl:pr-7 border-l-2 rtl:border-l-0 rtl:border-r-2 border-white/10 space-y-6 my-4">
                {stages.map((stg, idx) => {
                  const isDone = idx < activeOrder.currentStageIdx;
                  const isCurrent = idx === activeOrder.currentStageIdx;
                  const isPending = idx > activeOrder.currentStageIdx;
                  const Icon = stg.icon;

                  return (
                    <motion.div 
                      key={stg.num} 
                      initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="relative group"
                    >
                      {/* Timeline Node Icon */}
                      <div className={`absolute -left-[38px] rtl:-left-auto rtl:-right-[38px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all shadow-md ${
                        isDone
                          ? 'bg-emerald-500 text-[#08090C] border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : isCurrent
                          ? 'bg-gradient-to-r from-[#C9A86A] to-[#DFBA73] text-[#08090C] border-[#DFBA73] animate-pulse shadow-[0_0_25px_rgba(201,168,106,0.7)]'
                          : 'bg-[#141721] text-zinc-600 border-white/10'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Content Card */}
                      <div className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#141721] border-[#C9A86A]/50 shadow-[0_0_30px_rgba(201,168,106,0.15)] ring-1 ring-[#C9A86A]/30'
                          : isDone
                          ? 'bg-[#141721]/60 border-emerald-500/20'
                          : 'bg-white/5 border-white/5 opacity-55'
                      }`}>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-md ${
                              isDone
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : isCurrent
                                ? 'bg-[#C9A86A] text-[#08090C] font-bold shadow'
                                : 'bg-white/10 text-zinc-400'
                            }`}>
                              {isAr ? `المرحلة ${stg.num}` : `Stage ${stg.num}`}
                            </span>
                            <h4 className="text-sm font-bold text-white">{stg.title}</h4>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] font-mono">
                            <span className="text-zinc-400">{stg.location}</span>
                            <span>·</span>
                            <span className={isCurrent ? 'text-[#C9A86A] font-bold' : 'text-zinc-400'}>
                              {stg.timestamp}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {stg.desc}
                        </p>

                        {/* Current Status Pill */}
                        <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-zinc-500">
                            {isAr ? 'حالة التفتيش:' : 'Verification Status:'}
                          </span>
                          <span className={`font-bold flex items-center gap-1 ${
                            isDone 
                              ? 'text-emerald-400' 
                              : isCurrent 
                              ? 'text-amber-400' 
                              : 'text-zinc-500'
                          }`}>
                            {isDone && '✓ Verified & Cleared'}
                            {isCurrent && '⚡ Active on CNC / Hand-Craft Line'}
                            {isPending && '⏳ Scheduled in Queue'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 3. Support & Live Operations Contact */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#0F1117] to-amber-950/30 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left rtl:sm:text-right">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'خدمة عملاء التركيبات والمشاريع' : 'GreenWood Installation Support'}</span>
                </h4>
                <p className="text-xs text-zinc-400 max-w-md">
                  {dict.furniture.tracking.support_note}
                </p>
              </div>

              <a
                href={`https://wa.me/966505725070?text=${encodeURIComponent(
                  `مرحباً جرين وود، أستفسر عن موعد تركيب طلبي رقم: ${activeOrder.orderRef}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all shrink-0 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{dict.furniture.tracking.contact_btn}</span>
              </a>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}

export default function OrderTrackerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08090C] text-white pt-32 text-center">Loading live tracking telemetry...</div>}>
      <OrderTrackerContent />
    </Suspense>
  );
}
