'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import StatCard from '@/components/admin/StatCard';
import { FURNITURE_CATALOG, FurnitureItem } from '@/lib/furnitureData';
import type { EcommerceOrderRecord, EcommerceOrderStatus, InternalNote } from '@/lib/admin/types';
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  TrendingUp, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  ExternalLink, 
  Download, 
  Printer, 
  MessageSquare, 
  X, 
  Check, 
  ChevronRight, 
  Factory, 
  Wrench, 
  ShieldCheck, 
  Layers, 
  CreditCard,
  Sparkles,
  ArrowRight,
  FileSpreadsheet,
  RefreshCw,
  Plus
} from 'lucide-react';

// Initial realistic database mock of Saudi furniture orders
const INITIAL_ORDERS: EcommerceOrderRecord[] = [
  {
    id: 'ord-101',
    orderRef: 'WD-ORD-2026-8812',
    customerName: 'سلطان بن عبدالعزيز آل سعود',
    email: 'sultan.saud@al-saud.sa',
    phone: '+966 50 572 5070',
    city: 'Riyadh',
    district: 'حي النرجس',
    address: 'العنوان الوطني: RRRD2938',
    villaBuilding: 'فيلا 14 — المجمع السكني الملكي',
    deliveryNotes: 'يرجى التنسيق المسبق مع حارس الفيلا وتوفير بطانيات حماية للأرضيات الرخامية.',
    orderType: 'retail',
    deliveryDate: '2026-09-08',
    timeSlot: 'morning',
    whiteGloveAssembly: true,
    wallAnchoring: true,
    paymentMethod: 'apple_pay',
    paymentStatus: 'paid',
    subtotal: 46050,
    discountAmount: 4605,
    promoCode: 'WDVIP10',
    vatAmount: 6217,
    totalAmount: 47662,
    status: 'in_production',
    factory: 'GreenWood Factory 1 & 3 — Riyadh',
    leadTechnician: 'م. فهد الغامدي (فريق التركيبات 1)',
    items: [
      {
        productId: 'gw-diriyah-curved-sofa',
        sku: 'GW-LV-801',
        nameEn: 'The Al-Diriyah Modular Curved Sofa',
        nameAr: 'أريكة الدرعية المنحنية الفاخرة',
        finishId: 'cream-boucle',
        finishNameEn: 'Ivory Bouclé',
        finishNameAr: 'بوكليه عاجي',
        unitPrice: 18900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      },
      {
        productId: 'gw-najran-travertine-table',
        sku: 'GW-TB-405',
        nameEn: 'The Najran Travertine Coffee Table',
        nameAr: 'طاولة قهوة نجران من الترافرتين',
        finishId: 'beige-travertine',
        finishNameEn: 'Warm Beige Travertine',
        finishNameAr: 'ترافرتين بيج دافئ',
        unitPrice: 8750,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80',
      },
      {
        productId: 'gw-alula-lounge-armchair',
        sku: 'GW-CH-304',
        nameEn: 'The Al-Ula Sculptural Lounge Armchair',
        nameAr: 'كرسي الاسترخاء النحتي الفاخر العلا',
        finishId: 'cognac-leather',
        finishNameEn: 'Heritage Cognac Leather',
        finishNameAr: 'جلد كونياك كلاسيكي',
        unitPrice: 9200,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
      },
    ],
    internalNotes: [
      {
        id: 'n1',
        text: 'تم تأكيد خامات البوكليه العاجي الإيطالي واختيار لوح الترافرتين من محجر نجران.',
        author: 'م. أحمد الشيباني',
        authorEmail: 'ahmed@wdgroup.online',
        createdAt: '2026-08-29T10:00:00Z',
      },
    ],
    createdAt: '2026-08-28T14:30:00Z',
  },
  {
    id: 'ord-102',
    orderRef: 'WD-ORD-2026-8804',
    customerName: 'فندق سويس بلو للأجنحة الفندقية',
    email: 'procurement@swissbluehotels.com',
    phone: '+966 12 600 4400',
    city: 'Jeddah',
    district: 'حي الشاطئ — كورنيش جدة',
    address: 'شارع الأمير فيصل بن فهد',
    villaBuilding: 'مشروع توسعة الأجنحة الرئاسية — الدور 12',
    deliveryNotes: 'توريد فندقي معتمد. يتطلب تصريح دخول لشاحنات التفريغ من البوابة الشمالية.',
    orderType: 'b2b',
    companyName: 'SwissBlue Hospitality Co.',
    crNumber: '4030288192',
    vatNumber: '310293847500003',
    deliveryDate: '2026-09-12',
    timeSlot: 'afternoon',
    whiteGloveAssembly: true,
    wallAnchoring: true,
    paymentMethod: 'b2b_po',
    paymentStatus: 'authorized',
    subtotal: 122500,
    discountAmount: 18375, // 15% trade discount
    promoCode: 'TRADE-SWISSBLUE',
    vatAmount: 15618,
    totalAmount: 119743,
    status: 'confirmed',
    factory: 'GreenWood Factory 1 — Riyadh',
    leadTechnician: 'م. ياسر القحطاني',
    items: [
      {
        productId: 'gw-swissblue-suite-bed',
        sku: 'GW-BD-702',
        nameEn: 'SwissBlue Suite Bed & Fluted Joinery',
        nameAr: 'سرير الجناح الرئاسي سويس بلو والتجاليد',
        finishId: 'natural-walnut',
        finishNameEn: 'Natural American Walnut',
        finishNameAr: 'جوز أمريكي طبيعي',
        unitPrice: 24500,
        quantity: 5,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
      },
    ],
    internalNotes: [
      {
        id: 'n2',
        text: 'تم إصدار أمر الشراء البنكي المعتمد بشروط دفع 30 يوماً وتجهيز غرف النماذج.',
        author: 'إدارة المبيعات',
        authorEmail: 'sales@wdgroup.online',
        createdAt: '2026-08-30T09:00:00Z',
      },
    ],
    createdAt: '2026-08-27T11:15:00Z',
  },
  {
    id: 'ord-103',
    orderRef: 'WD-ORD-2026-8798',
    customerName: 'د. خالد التميمي',
    email: 'dr.khaled@tamimi-clinic.com',
    phone: '+966 55 443 2211',
    city: 'Khobar',
    district: 'حي الحزام الذهبي',
    address: 'شارع الملك فيصل',
    villaBuilding: 'فيلا د. خالد',
    deliveryNotes: 'يرجى التوصيل في الفترة المسائية حصراً.',
    orderType: 'retail',
    deliveryDate: '2026-09-06',
    timeSlot: 'evening',
    whiteGloveAssembly: true,
    wallAnchoring: false,
    paymentMethod: 'tabby',
    paymentStatus: 'paid',
    subtotal: 13800,
    discountAmount: 0,
    vatAmount: 2070,
    totalAmount: 15870,
    status: 'ready_for_dispatch',
    factory: 'GreenWood Factory 1 — Riyadh',
    leadTechnician: 'فريق لوجستيات الشرقية',
    items: [
      {
        productId: 'gw-rawdah-fluted-credenza',
        sku: 'GW-JN-550',
        nameEn: 'The Rawdah Fluted Walnut Credenza',
        nameAr: 'خزانة ووحدة كونسول الروضة المضلعة',
        finishId: 'walnut-brass',
        finishNameEn: 'Natural Walnut & Champagne Brass',
        finishNameAr: 'جوز طبيعي مع نحاس شامبين',
        unitPrice: 13800,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
      },
    ],
    internalNotes: [],
    createdAt: '2026-08-26T16:40:00Z',
  },
  {
    id: 'ord-104',
    orderRef: 'WD-ORD-2026-8785',
    customerName: 'شركة طويق للاستثمار والتطوير العقاري',
    email: 'projects@tuwaiq-holding.sa',
    phone: '+966 11 488 9900',
    city: 'Riyadh',
    district: 'حي النخيل — طريق الملك فهد',
    address: 'برج طويق للأعمال — الطابق 24',
    villaBuilding: 'قاعة مجلس الإدارة الرئيسي',
    deliveryNotes: 'تركيب مسائي بعد ساعات العمل الرسمية بالبرج.',
    orderType: 'b2b',
    companyName: 'Tuwaiq Holding Co.',
    crNumber: '1010892834',
    vatNumber: '310029384700003',
    deliveryDate: '2026-09-15',
    timeSlot: 'evening',
    whiteGloveAssembly: true,
    wallAnchoring: true,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    subtotal: 76000,
    discountAmount: 7600,
    promoCode: 'CORP10',
    vatAmount: 10260,
    totalAmount: 78660,
    status: 'in_production',
    factory: 'GreenWood Factory 1 & 2 — Riyadh Hub',
    leadTechnician: 'م. عبدالله الشهري',
    items: [
      {
        productId: 'gw-tuwaiq-boardroom-table',
        sku: 'GW-EX-990',
        nameEn: 'The Tuwaiq Executive Boardroom Table',
        nameAr: 'طاولة اجتماعات طويق التنفيذية',
        finishId: 'royal-walnut',
        finishNameEn: 'Royal American Walnut',
        finishNameAr: 'جوز أمريكي ملكي',
        unitPrice: 38000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
      },
    ],
    internalNotes: [
      {
        id: 'n3',
        text: 'تم استلام الإشعار البنكي بالحساب الرسمي بمصرف الراجحي وقص ألواح الجوز 4.2 م.',
        author: 'الإدارة المالية',
        authorEmail: 'finance@wdgroup.online',
        createdAt: '2026-08-25T13:20:00Z',
      },
    ],
    createdAt: '2026-08-24T12:00:00Z',
  },
  {
    id: 'ord-105',
    orderRef: 'WD-ORD-2026-8770',
    customerName: 'الأستاذة نورة الشمري',
    email: 'noura.shammari@gmail.com',
    phone: '+966 56 112 3344',
    city: 'Riyadh',
    district: 'حي الملقا',
    address: 'العنوان الوطني: RYDX9921',
    villaBuilding: 'فيلا 8',
    deliveryNotes: 'تركيب في الصالون الرئيسي الأرضي.',
    orderType: 'retail',
    deliveryDate: '2026-09-02',
    timeSlot: 'morning',
    whiteGloveAssembly: true,
    wallAnchoring: false,
    paymentMethod: 'mada_cards',
    paymentStatus: 'paid',
    subtotal: 22400,
    discountAmount: 1120,
    promoCode: 'GREENWOOD5',
    vatAmount: 3192,
    totalAmount: 24472,
    status: 'delivered',
    factory: 'GreenWood Factory 1 — Riyadh',
    leadTechnician: 'فريق تركيبات الملقا',
    items: [
      {
        productId: 'gw-riyadh-dining-suite',
        sku: 'GW-DN-610',
        nameEn: 'The Riyadh Luxury 8-Seater Dining Suite',
        nameAr: 'طاولة طعام الرياض الملكية لـ 8 أشخاص',
        finishId: 'natural-oiled-walnut',
        finishNameEn: 'Natural Oiled Walnut',
        finishNameAr: 'جوز طبيعي معالج بالزيوت',
        unitPrice: 22400,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80',
      },
    ],
    internalNotes: [
      {
        id: 'n4',
        text: 'تم التسليم والتركيب بنجاح وتوقيع نموذج الاستلام وضمان الـ 5 سنوات.',
        author: 'م. فهد الغامدي',
        authorEmail: 'fahad@wdgroup.online',
        createdAt: '2026-09-02T11:40:00Z',
      },
    ],
    createdAt: '2026-08-20T10:10:00Z',
  }
];

export default function EcommerceAdminDashboard() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  const [orders, setOrders] = useState<EcommerceOrderRecord[]>(INITIAL_ORDERS);
  const [selectedTab, setSelectedTab] = useState<'orders' | 'factory' | 'catalog' | 'analytics'>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Selected Order for Slide-Over Drawer
  const [selectedOrder, setSelectedOrder] = useState<EcommerceOrderRecord | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Financial & Operational Metrics
  const metrics = useMemo(() => {
    const totalRev = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const activeCount = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;
    const b2bRev = orders.filter((o) => o.orderType === 'b2b').reduce((sum, o) => sum + o.totalAmount, 0);
    const b2bPercent = totalRev > 0 ? Math.round((b2bRev / totalRev) * 100) : 0;
    const aov = orders.length > 0 ? Math.round(totalRev / orders.length) : 0;

    return { totalRev, activeCount, b2bPercent, aov };
  }, [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = 
        order.orderRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phone.includes(searchQuery) ||
        order.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesPayment = paymentFilter === 'all' || order.paymentMethod === paymentFilter;
      const matchesType = typeFilter === 'all' || order.orderType === typeFilter;

      return matchesSearch && matchesStatus && matchesPayment && matchesType;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter, typeFilter]);

  const handleUpdateOrderStatus = (orderId: string, newStatus: EcommerceOrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(isAr ? 'تم تحديث حالة الطلب بنجاح' : 'Order status updated successfully', 'success');
  };

  const handleAddInternalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !newNoteText.trim()) return;

    const newNote: InternalNote = {
      id: `note-${Date.now()}`,
      text: newNoteText.trim(),
      author: 'Admin Team',
      authorEmail: 'admin@wdgroup.online',
      createdAt: new Date().toISOString(),
    };

    const updatedNotes = [...selectedOrder.internalNotes, newNote];
    setOrders((prev) =>
      prev.map((o) => (o.id === selectedOrder.id ? { ...o, internalNotes: updatedNotes } : o))
    );
    setSelectedOrder({ ...selectedOrder, internalNotes: updatedNotes });
    setNewNoteText('');
    showToast(isAr ? 'تمت إضافة الملاحظة الداخلية' : 'Internal note added', 'success');
  };

  const handleExportCSV = () => {
    const headers = ['Order Ref,Customer,Email,Phone,City,Order Type,Payment,Status,Total SAR,Date'];
    const rows = filteredOrders.map((o) =>
      `"${o.orderRef}","${o.customerName}","${o.email}","${o.phone}","${o.city}","${o.orderType}","${o.paymentMethod}","${o.status}",${o.totalAmount},"${o.createdAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `greenwood-orders-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(isAr ? 'تم تصدير ملف المبيعات بنجاح' : 'Sales report exported as CSV', 'success');
  };

  const getStatusBadge = (status: EcommerceOrderStatus) => {
    switch (status) {
      case 'confirmed':
        return {
          label: isAr ? 'مؤكد ومعتمد' : 'Confirmed',
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        };
      case 'in_production':
        return {
          label: isAr ? 'قيد التصنيع بالمصنع' : 'In Production',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse',
        };
      case 'ready_for_dispatch':
        return {
          label: isAr ? 'جاهز للشحن الفندقي' : 'Ready for Dispatch',
          bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
        };
      case 'out_for_delivery':
        return {
          label: isAr ? 'خارج للتوصيل والتركيب' : 'Out for Delivery',
          bg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
        };
      case 'delivered':
        return {
          label: isAr ? 'تم التسليم والتركيب' : 'Delivered & Assembled',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        };
      case 'cancelled':
        return {
          label: isAr ? 'ملغي' : 'Cancelled',
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        };
      default:
        return {
          label: isAr ? 'في انتظار الدفع' : 'Pending Payment',
          bg: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30',
        };
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* 1. Header & Quick Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] text-[11px] font-mono font-semibold">
              GreenWood Luxury Furniture Commerce
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isAr ? 'مركز مبيعات وعمليات المتجر الإلكتروني' : 'E-Commerce Sales & Operations Command Center'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr 
              ? 'متابعة وتدقيق الطلبات، خطوط الإنتاج بماكينات CNC، ومواعيد التركيب الفندقي المباشر لكافة مناطق المملكة.'
              : 'Live management of luxury furniture orders, CNC/Upholstery factory queue, and site logistics across KSA.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#C9A86A]" />
            <span>{isAr ? 'تصدير إكسل / CSV' : 'Export Sales CSV'}</span>
          </button>

          <Link
            href="/furniture"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-[#C9A86A]/15 hover:bg-[#C9A86A] text-[#C9A86A] hover:text-[#08090C] border border-[#C9A86A]/30 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{isAr ? 'معاينة المتجر المباشر' : 'Live Storefront'}</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={isAr ? 'إجمالي المبيعات' : 'Total Revenue'}
          value={`${metrics.totalRev.toLocaleString('en-US')} SAR`}
          subtitle={isAr ? '+28.4% مقارنة بالشهر السابق' : '+28.4% vs last month'}
          icon={TrendingUp}
          iconColor="text-[#C9A86A]"
          badge="Live Revenue"
          badgeColor="amber"
        />

        <StatCard
          title={isAr ? 'الطلبات النشطة' : 'Active Orders'}
          value={metrics.activeCount.toString()}
          subtitle={isAr ? 'قيد التصنيع والتركيب الميداني' : 'In production & dispatch'}
          icon={ShoppingCart}
          iconColor="text-emerald-400"
          badge="Live Sync"
          badgeColor="emerald"
        />

        <StatCard
          title={isAr ? 'حصة المشاريع (B2B)' : 'Hospitality & B2B Share'}
          value={`${metrics.b2bPercent}%`}
          subtitle={isAr ? 'عقود توريد فندقية وتجارية' : 'Commercial FF&E contracts'}
          icon={Building2}
          iconColor="text-blue-400"
          badge="FF&E Projects"
          badgeColor="sky"
        />

        <StatCard
          title={isAr ? 'متوسط قيمة الطلب (AOV)' : 'Average Order Value'}
          value={`${metrics.aov.toLocaleString('en-US')} SAR`}
          subtitle={isAr ? 'قطع فاخرة ومجموعات أجنحة' : 'High-ticket luxury suites'}
          icon={Sparkles}
          iconColor="text-amber-400"
          badge="Luxury Suites"
          badgeColor="amber"
        />
      </div>

      {/* 3. Section Switcher Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3 overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setSelectedTab('orders')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer shrink-0 ${
            selectedTab === 'orders'
              ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{isAr ? 'إدارة الطلبات والشحن' : 'Orders & Invoices'}</span>
          <span className="px-1.5 py-0.5 rounded-md bg-[#08090C]/20 text-[10px]">
            {filteredOrders.length}
          </span>
        </button>

        <button
          onClick={() => setSelectedTab('factory')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer shrink-0 ${
            selectedTab === 'factory'
              ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white'
          }`}
        >
          <Factory className="w-4 h-4" />
          <span>{isAr ? 'مسار خطوط الإنتاج بالمصانع' : 'Factory Production Pipeline'}</span>
        </button>

        <button
          onClick={() => setSelectedTab('catalog')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer shrink-0 ${
            selectedTab === 'catalog'
              ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{isAr ? 'كتالوج المنتجات والأسعار' : 'Furniture Catalog & Stock'}</span>
        </button>

        <button
          onClick={() => setSelectedTab('analytics')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer shrink-0 ${
            selectedTab === 'analytics'
              ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>{isAr ? 'بوابات الدفع والتحليلات' : 'Payment Gateways'}</span>
        </button>
      </div>

      {/* 4. TAB 1: ALL ORDERS & INVOICES */}
      {selectedTab === 'orders' && (
        <div className="space-y-6">
          {/* Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'بحث برقم الطلب، العميل، الهاتف...' : 'Search order, name, phone, city...'}
                className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#C9A86A]"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 rtl:left-auto rtl:right-3 top-3" />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
            >
              <option value="all">{isAr ? 'كافة الحالات (All Statuses)' : 'All Statuses'}</option>
              <option value="pending_payment">{isAr ? 'في انتظار الدفع' : 'Pending Payment'}</option>
              <option value="confirmed">{isAr ? 'مؤكد ومعتمد' : 'Confirmed'}</option>
              <option value="in_production">{isAr ? 'قيد التصنيع بالمصنع' : 'In Production'}</option>
              <option value="ready_for_dispatch">{isAr ? 'جاهز للشحن الفندقي' : 'Ready for Dispatch'}</option>
              <option value="delivered">{isAr ? 'تم التسليم والتركيب' : 'Delivered'}</option>
              <option value="cancelled">{isAr ? 'ملغي' : 'Cancelled'}</option>
            </select>

            {/* Payment Method Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
            >
              <option value="all">{isAr ? 'كافة وسائل الدفع' : 'All Payment Methods'}</option>
              <option value="mada_cards">Mada / Credit Cards</option>
              <option value="apple_pay">Apple Pay</option>
              <option value="tabby">Tabby (4 Installments)</option>
              <option value="tamara">Tamara (3/4 Installments)</option>
              <option value="bank_transfer">Corporate Bank Transfer</option>
              <option value="b2b_po">B2B Purchase Order (PO)</option>
              <option value="cod">Cash / POS on Delivery</option>
            </select>

            {/* Order Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
            >
              <option value="all">{isAr ? 'كافة أنواع المشترين' : 'All Customer Types'}</option>
              <option value="retail">{isAr ? 'سكني وفردي (Residential)' : 'Residential'}</option>
              <option value="b2b">{isAr ? 'مشاريع وفنادق (B2B / Hospitality)' : 'B2B / Hospitality'}</option>
            </select>
          </div>

          {/* Orders Table */}
          <div className="glass-card rounded-2xl border border-white/10 bg-[#0F1117]/90 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono uppercase text-[10px]">
                    <th className="py-3.5 px-4">{isAr ? 'رقم الطلب والتاريخ' : 'Order Ref & Date'}</th>
                    <th className="py-3.5 px-4">{isAr ? 'العميل والمدينة' : 'Client & City'}</th>
                    <th className="py-3.5 px-4">{isAr ? 'نوع الطلب' : 'Type'}</th>
                    <th className="py-3.5 px-4">{isAr ? 'القطع المشتراة' : 'Items'}</th>
                    <th className="py-3.5 px-4">{isAr ? 'موعد التسليم' : 'Delivery Target'}</th>
                    <th className="py-3.5 px-4">{isAr ? 'طريقة الدفع' : 'Payment'}</th>
                    <th className="py-3.5 px-4">{isAr ? 'الإجمالي (ر.س)' : 'Total (SAR)'}</th>
                    <th className="py-3.5 px-4">{isAr ? 'حالة الطلب' : 'Status'}</th>
                    <th className="py-3.5 px-4 text-center">{isAr ? 'إجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-zinc-500">
                        {isAr ? 'لم يتم العثور على أي طلبات مطابقة.' : 'No matching orders found.'}
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      const badge = getStatusBadge(order.status);
                      return (
                        <tr
                          key={order.id}
                          onClick={() => setSelectedOrder(order)}
                          className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                        >
                          <td className="py-3.5 px-4 font-mono">
                            <span className="text-[#C9A86A] font-bold block group-hover:underline">
                              {order.orderRef}
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              {new Date(order.createdAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-GB')}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="text-white font-semibold block truncate max-w-[160px]">
                              {order.customerName}
                            </span>
                            <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                              <MapPin className="w-3 h-3 text-[#C9A86A]" />
                              <span>{order.city}</span>
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              order.orderType === 'b2b'
                                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                                : 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                            }`}>
                              {order.orderType === 'b2b' ? 'B2B Project' : 'Residential'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              {order.items.slice(0, 2).map((item, idx) => (
                                <div key={idx} className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0">
                                  <Image
                                    src={item.image}
                                    alt={item.nameEn}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              ))}
                              {order.items.length > 2 && (
                                <span className="text-[10px] font-mono text-zinc-400">
                                  +{order.items.length - 2}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-300">
                            <span className="block text-emerald-400 font-semibold">{order.deliveryDate}</span>
                            <span className="text-[10px] text-zinc-500 uppercase">{order.timeSlot}</span>
                          </td>

                          <td className="py-3.5 px-4 font-mono">
                            <span className="text-[11px] text-zinc-300 uppercase block font-semibold">
                              {order.paymentMethod.replace('_', ' ')}
                            </span>
                            <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded ${
                              order.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'
                            }`}>
                              {order.paymentStatus}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-mono font-extrabold text-[#C9A86A]">
                            {order.totalAmount.toLocaleString('en-US')}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border inline-block ${badge.bg}`}>
                              {badge.label}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                              }}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-[#C9A86A] text-zinc-400 hover:text-[#08090C] transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 2: FACTORY PRODUCTION PIPELINE */}
      {selectedTab === 'factory' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#0F1117] border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Factory className="w-4 h-4 text-[#C9A86A]" />
                <span>{isAr ? 'مراقبة الطاقة الإنتاجية بمصانع جرين وود' : 'GreenWood Saudi Manufacturing Lines'}</span>
              </h3>
              <p className="text-xs text-zinc-400">
                {isAr ? 'تحديث مرحلي مباشر لأوامر التصنيع وتخصيص فرق التركيب الميداني.' : 'Active CNC milling, upholstery line, and crating stations.'}
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
              100% On-Schedule
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Factory 1: Wood & Joinery */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Factory 1 — Wood & CNC</h4>
                    <span className="text-[10px] text-zinc-400 font-mono">الرياض ونجران (النجارة والأخشاب)</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#C9A86A]">
                  2 Active CNCs
                </span>
              </div>

              <div className="space-y-2.5">
                {orders.filter(o => o.status === 'in_production').map(o => (
                  <div key={o.id} className="p-3 rounded-xl bg-[#141721] border border-white/5 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono font-bold text-[#C9A86A]">{o.orderRef}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">{o.deliveryDate}</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 truncate">{o.customerName}</p>
                    <span className="text-[10px] text-zinc-500 font-mono">{o.items.length} items in milling</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Factory 2: Architectural Metal & Screen */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Factory 2 — Metal & Brass</h4>
                    <span className="text-[10px] text-zinc-400 font-mono">مصنع الألومنيوم والنحاس المعماري</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-blue-400">
                  Laser Ready
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-[#141721] border border-white/5 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-[#C9A86A]">GW-DC-902 (Hegra Divider)</span>
                    <span className="text-[10px] text-purple-400 font-mono">PVD Plating</span>
                  </div>
                  <p className="text-[11px] text-zinc-300">Brushed Champagne Gold Panels</p>
                </div>
              </div>
            </div>

            {/* Factory 3: Luxury Upholstery Center */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Factory 3 — Upholstery</h4>
                    <span className="text-[10px] text-zinc-400 font-mono">مركز التنجيد والجلود الإيطالية</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-emerald-400">
                  Active Tufting
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-[#141721] border border-white/5 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-[#C9A86A]">Al-Diriyah Sofa Batch</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Stage 4/6</span>
                  </div>
                  <p className="text-[11px] text-zinc-300">Ivory Bouclé Multi-Density HR Foam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 3: FURNITURE CATALOG & STOCK */}
      {selectedTab === 'catalog' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FURNITURE_CATALOG.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-4 border border-white/10 bg-[#0F1117]/90 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                    <Image
                      src={item.images[0]}
                      alt={item.nameEn}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0B5C3D] text-[#34D399] text-[9px] font-bold">
                      {item.inStock ? 'In Stock' : 'Made to Order'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-[#C9A86A]">
                    <span>{item.sku}</span>
                    <span className="text-zinc-400">{item.categoryEn}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    {isAr ? item.nameAr : item.nameEn}
                  </h4>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-[#E3C58A]">
                    {item.price.toLocaleString('en-US')} SAR
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {item.leadTimeEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. TAB 4: PAYMENT GATEWAY BREAKDOWN */}
      {selectedTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#C9A86A]" />
              <span>Saudi Payment Gateways Volume Breakdown</span>
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
                <span>💳 Mada & Credit Cards</span>
                <span className="text-[#C9A86A] font-bold">38% (222,000 SAR)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
                <span>🍎 Apple Pay Direct</span>
                <span className="text-[#C9A86A] font-bold">25% (146,050 SAR)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
                <span>🏢 B2B PO Corporate Terms</span>
                <span className="text-blue-400 font-bold">21% (122,500 SAR)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
                <span>🟢 Tabby 4-Month Installments</span>
                <span className="text-emerald-400 font-bold">11% (64,250 SAR)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
                <span>🏦 Corporate Bank Wire (Al Rajhi / SNB)</span>
                <span className="text-purple-400 font-bold">5% (29,400 SAR)</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Regional Delivery Coverage (KSA)</span>
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
                <span>📍 Riyadh Province (Central)</span>
                <span className="text-emerald-400 font-bold">52% of orders</span>
              </div>
              <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
                <span>📍 Jeddah & Mecca (Western)</span>
                <span className="text-emerald-400 font-bold">26% of orders</span>
              </div>
              <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
                <span>📍 Khobar & Dammam (Eastern)</span>
                <span className="text-emerald-400 font-bold">14% of orders</span>
              </div>
              <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
                <span>📍 Najran, Abha & Tabuk (Southern/Northern)</span>
                <span className="text-emerald-400 font-bold">8% of orders</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. SLIDE-OVER ORDER DETAIL DRAWER */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <div className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
              <motion.div
                initial={{ x: isAr ? '-100%' : '100%' }}
                animate={{ x: 0 }}
                exit={{ x: isAr ? '-100%' : '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="w-screen max-w-2xl bg-[#0F1117] border-l rtl:border-l-0 rtl:border-r border-white/10 text-white shadow-2xl flex flex-col justify-between"
              >
                {/* Drawer Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-mono font-extrabold text-[#C9A86A]">
                        {selectedOrder.orderRef}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getStatusBadge(selectedOrder.status).bg}`}>
                        {getStatusBadge(selectedOrder.status).label}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-400">
                      {isAr ? 'تاريخ الطلب:' : 'Order Created:'} {new Date(selectedOrder.createdAt).toLocaleString(isAr ? 'ar-SA' : 'en-GB')}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
                  
                  {/* Status Transition Controller */}
                  <div className="p-4 rounded-2xl bg-[#141721] border border-white/10 space-y-3">
                    <label className="block text-xs font-bold text-white">
                      {isAr ? 'تغيير وتحديث حالة الطلب بالمصنع:' : 'Update Live Order Status:'}
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {(['confirmed', 'in_production', 'ready_for_dispatch', 'out_for_delivery', 'delivered'] as EcommerceOrderStatus[]).map((st) => (
                        <button
                          key={st}
                          onClick={() => handleUpdateOrderStatus(selectedOrder.id, st)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            selectedOrder.status === st
                              ? 'bg-[#C9A86A] text-[#08090C] font-bold shadow-md'
                              : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {getStatusBadge(st).label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Customer & Project Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#141721] border border-white/5">
                    <div className="space-y-1">
                      <span className="text-zinc-500 text-[10px] uppercase font-mono block">{isAr ? 'العميل' : 'Client'}</span>
                      <span className="text-white font-bold block">{selectedOrder.customerName}</span>
                      <span className="text-zinc-400 block">{selectedOrder.email}</span>
                      <span className="text-emerald-400 font-mono block">{selectedOrder.phone}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-zinc-500 text-[10px] uppercase font-mono block">{isAr ? 'الموقع والعنوان' : 'Location'}</span>
                      <span className="text-white font-bold block">{selectedOrder.city} — {selectedOrder.district}</span>
                      <span className="text-zinc-400 block">{selectedOrder.address}</span>
                      <span className="text-zinc-400 block">{selectedOrder.villaBuilding}</span>
                    </div>
                  </div>

                  {/* Scheduled Delivery & Time Slot */}
                  <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase font-mono block">{isAr ? 'موعد التركيب المجدول' : 'Scheduled Assembly'}</span>
                      <span className="text-emerald-400 font-mono font-bold text-sm block">
                        {selectedOrder.deliveryDate} ({selectedOrder.timeSlot.toUpperCase()})
                      </span>
                    </div>
                    <div className="text-right rtl:text-left text-zinc-400 font-mono text-[11px]">
                      <span>{selectedOrder.whiteGloveAssembly ? '✓ White-Glove Included' : ''}</span>
                      <span className="block">{selectedOrder.wallAnchoring ? '✓ Wall Anchoring Active' : ''}</span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase font-mono">
                      {isAr ? 'القطع والمنتجات المطلوبة' : 'Purchased Items'}
                    </h4>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#141721] border border-white/5 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                              <Image
                                src={item.image}
                                alt={item.nameEn}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div>
                              <span className="text-[10px] font-mono text-[#C9A86A] block">{item.sku}</span>
                              <h5 className="font-bold text-white text-xs">{isAr ? item.nameAr : item.nameEn}</h5>
                              <span className="text-[10px] text-zinc-400">{isAr ? item.finishNameAr : item.finishNameEn}</span>
                            </div>
                          </div>

                          <div className="text-right rtl:text-left font-mono">
                            <span className="text-white font-bold block">{item.unitPrice.toLocaleString('en-US')} SAR</span>
                            <span className="text-zinc-500 text-[10px]">× {item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Financial Summary */}
                  <div className="p-4 rounded-2xl bg-[#141721] border border-white/10 space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal</span>
                      <span>{selectedOrder.subtotal.toLocaleString('en-US')} SAR</span>
                    </div>
                    {selectedOrder.discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount ({selectedOrder.promoCode})</span>
                        <span>-{selectedOrder.discountAmount.toLocaleString('en-US')} SAR</span>
                      </div>
                    )}
                    <div className="flex justify-between text-zinc-400">
                      <span>15% Saudi VAT</span>
                      <span>{selectedOrder.vatAmount.toLocaleString('en-US')} SAR</span>
                    </div>
                    <div className="flex justify-between text-white font-extrabold text-sm pt-2 border-t border-white/10">
                      <span>Total Amount</span>
                      <span className="text-[#C9A86A]">{selectedOrder.totalAmount.toLocaleString('en-US')} SAR</span>
                    </div>
                  </div>

                  {/* Internal Operations Notes */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase font-mono">
                      {isAr ? 'سجل الملاحظات الإدارية والمصنعية' : 'Internal Operational Notes'}
                    </h4>
                    <div className="space-y-2">
                      {selectedOrder.internalNotes.map((note) => (
                        <div key={note.id} className="p-3 rounded-xl bg-[#141721] border border-white/5 text-xs space-y-1">
                          <p className="text-zinc-300">{note.text}</p>
                          <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                            <span>{note.author}</span>
                            <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAddInternalNote} className="flex gap-2">
                      <input
                        type="text"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        placeholder={isAr ? 'أضف ملاحظة داخلية جديدة...' : 'Add internal note...'}
                        className="flex-1 px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-xl bg-[#C9A86A] text-[#08090C] font-bold text-xs cursor-pointer"
                      >
                        {isAr ? 'إضافة' : 'Add'}
                      </button>
                    </form>
                  </div>

                </div>

                {/* Drawer Footer Actions */}
                <div className="p-6 border-t border-white/10 bg-[#141721] flex items-center justify-between gap-3">
                  <a
                    href={`https://wa.me/${selectedOrder.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `مرحباً ${selectedOrder.customerName}، نفيدكم بأن طلبكم رقم ${selectedOrder.orderRef} من أثاث جرين وود أصبح بحالة (${getStatusBadge(selectedOrder.status).label}) وتم جدولة التركيب بتاريخ ${selectedOrder.deliveryDate}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isAr ? 'مراسلة العميل عبر واتساب' : 'WhatsApp Client'}</span>
                  </a>

                  <button
                    onClick={() => window.print()}
                    className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-[#C9A86A]" />
                    <span>{isAr ? 'طباعة الفاتورة' : 'Print Invoice'}</span>
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
