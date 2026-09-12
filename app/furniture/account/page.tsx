'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import EcommerceNavbar from '@/components/furniture/EcommerceNavbar';
import Footer from '@/components/layout/Footer';
import OfficialTaxInvoiceModal, { InvoiceOrderData } from '@/components/furniture/OfficialTaxInvoiceModal';
import { getWhatsAppSupportUrl } from '@/lib/ecommerce/whatsapp';
import { 
  User, 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Building2, 
  FileText, 
  ExternalLink, 
  Search, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  MessageSquare, 
  Printer, 
  ChevronRight, 
  BadgeCheck, 
  Wrench, 
  Compass,
  CreditCard,
  Building,
  Save,
  Check
} from 'lucide-react';

interface OrderItem {
  productId: string;
  sku: string;
  nameEn: string;
  nameAr?: string;
  finishId?: string;
  finishNameEn?: string;
  finishNameAr?: string;
  unitPrice: number;
  quantity: number;
  image?: string;
}

interface AccountOrder {
  id?: string;
  orderRef: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  district?: string;
  address?: string;
  orderType?: 'retail' | 'b2b';
  companyName?: string;
  crNumber?: string;
  vatNumber?: string;
  status: 'pending' | 'confirmed' | 'production' | 'qa_polishing' | 'dispatched' | 'delivered' | 'cancelled';
  deliveryDate?: string;
  timeSlot?: string;
  whiteGloveAssembly?: boolean;
  wallAnchoring?: boolean;
  paymentMethod: string;
  paymentStatus: string;
  subtotal: number;
  discountAmount?: number;
  vatAmount: number;
  totalAmount: number;
  items: OrderItem[];
  leadTechnician?: string;
  trackingNumber?: string;
  createdAt: string;
}

function AccountPortalContent() {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';
  const searchParams = useSearchParams();

  // Tabs: 'active' | 'history' | 'address' | 'b2b'
  const [activeTab, setActiveTab] = useState<'active' | 'history' | 'address' | 'b2b'>('active');

  // Customer State
  const [customerPhone, setCustomerPhone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<AccountOrder[]>([]);
  const [searched, setSearched] = useState(false);

  // Selected Order for ZATCA Modal
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<InvoiceOrderData | null>(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  // National Address Form
  const [savedAddressFeedback, setSavedAddressFeedback] = useState(false);
  const [nationalAddress, setNationalAddress] = useState({
    shortCode: '',
    buildingNo: '',
    street: '',
    district: '',
    city: 'Riyadh',
    postalCode: '',
    additionalNo: '',
  });

  // B2B Company Profile
  const [savedB2bFeedback, setSavedB2bFeedback] = useState(false);
  const [b2bProfile, setB2bProfile] = useState({
    companyName: '',
    crNumber: '',
    vatNumber: '',
    contactPerson: '',
    preferredPayment: 'po_corporate',
  });

  // Initialize from URL query param or localStorage
  useEffect(() => {
    // 1. Check URL param (e.g. /furniture/account?phone=... or ?ref=...)
    const paramPhone = searchParams.get('phone');
    const paramRef = searchParams.get('ref');

    // 2. Load cached profile
    try {
      const storedPhone = localStorage.getItem('wd_customer_phone') || '';
      const storedProfile = localStorage.getItem('wd_customer_profile');
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
        if (parsed.phone) setCustomerPhone(parsed.phone);
      } else if (storedPhone) {
        setCustomerPhone(storedPhone);
      }

      // Load National Address
      const storedAddress = localStorage.getItem('wd_national_address');
      if (storedAddress) {
        setNationalAddress(JSON.parse(storedAddress));
      }

      // Load B2B Profile
      const storedB2b = localStorage.getItem('wd_b2b_profile');
      if (storedB2b) {
        setB2bProfile(JSON.parse(storedB2b));
      }

      // If URL param provided, initiate lookup immediately
      if (paramRef) {
        setSearchQuery(paramRef);
        fetchOrders(paramRef);
      } else if (paramPhone) {
        setCustomerPhone(paramPhone);
        fetchOrders(paramPhone);
      } else if (storedPhone) {
        fetchOrders(storedPhone);
      }
    } catch (e) {
      console.warn('LocalStorage error in AccountPortal:', e);
    }
  }, [searchParams]);

  // Fetch orders from API
  const fetchOrders = async (queryToSearch?: string) => {
    const q = (queryToSearch !== undefined ? queryToSearch : searchQuery || customerPhone).trim();
    if (!q) return;

    setIsLoading(true);
    setSearched(true);

    try {
      // 1. Try single order by ref first if starts with WD-
      if (q.toUpperCase().startsWith('WD-') || q.toUpperCase().startsWith('QTN-')) {
        const singleRes = await fetch(`/api/ecommerce/orders/${encodeURIComponent(q.toUpperCase())}`, {
          cache: 'no-store',
        });
        if (singleRes.ok) {
          const singleData = await singleRes.json();
          if (singleData.success && singleData.order) {
            setOrders([singleData.order]);
            setIsLoading(false);
            return;
          }
        }
      }

      // 2. Query list orders endpoint by search term (phone, email, or orderRef)
      const res = await fetch(`/api/ecommerce/orders?search=${encodeURIComponent(q)}&limit=30`, {
        cache: 'no-store',
      });
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
        if (q.startsWith('05') || q.startsWith('+966') || q.startsWith('966')) {
          setCustomerPhone(q);
          try {
            localStorage.setItem('wd_customer_phone', q);
          } catch (e) {}
        }
      } else {
        // Fallback: check localStorage recent orders
        fetchRecentStoredOrders(q);
      }
    } catch (err) {
      console.warn('Error querying orders API:', err);
      fetchRecentStoredOrders(q);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecentStoredOrders = async (q: string) => {
    try {
      const recentRefs: string[] = JSON.parse(localStorage.getItem('wd_customer_recent_orders') || '[]');
      const matchedOrders: AccountOrder[] = [];

      for (const ref of recentRefs) {
        try {
          const r = await fetch(`/api/ecommerce/orders/${encodeURIComponent(ref)}`);
          const d = await r.json();
          if (d.success && d.order) {
            if (
              !q ||
              ref.toLowerCase().includes(q.toLowerCase()) ||
              d.order.phone?.includes(q) ||
              d.order.customerName?.toLowerCase().includes(q.toLowerCase())
            ) {
              matchedOrders.push(d.order);
            }
          }
        } catch {}
      }

      setOrders(matchedOrders);
    } catch (e) {
      setOrders([]);
    }
  };

  const handleSaveNationalAddress = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('wd_national_address', JSON.stringify(nationalAddress));
      setSavedAddressFeedback(true);
      setTimeout(() => setSavedAddressFeedback(false), 3000);
    } catch (e) {}
  };

  const handleSaveB2bProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('wd_b2b_profile', JSON.stringify(b2bProfile));
      setSavedB2bFeedback(true);
      setTimeout(() => setSavedB2bFeedback(false), 3000);
    } catch (e) {}
  };

  const openInvoiceForOrder = (order: AccountOrder) => {
    const formattedData: InvoiceOrderData = {
      orderRef: order.orderRef,
      customerName: order.customerName,
      email: order.email,
      phone: order.phone,
      city: order.city,
      district: order.district,
      address: order.address,
      companyName: order.companyName,
      crNumber: order.crNumber,
      vatNumber: order.vatNumber,
      orderDate: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : undefined,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      subtotal: order.subtotal,
      discountAmount: order.discountAmount || 0,
      vatAmount: order.vatAmount,
      totalAmount: order.totalAmount,
      items: (order.items || []).map((it) => ({
        sku: it.sku,
        nameEn: it.nameEn,
        nameAr: it.nameAr,
        finishName: isAr ? (it.finishNameAr || it.finishNameEn) : it.finishNameEn,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
      })),
    };

    setSelectedInvoiceOrder(formattedData);
    setInvoiceModalOpen(true);
  };

  // Filter Active vs Completed orders
  const activeOrders = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled');
  const pastOrders = orders.filter((o) => o.status === 'delivered' || o.status === 'cancelled');

  // Stages Map
  const stages = [
    { key: 'confirmed', num: 1, labelAr: 'تم استلام وتأكيد الطلب', labelEn: 'Order Confirmed' },
    { key: 'production', num: 2, labelAr: 'قص وتصنيع الأخشاب والحديد', labelEn: 'Wood & Steel Joinery' },
    { key: 'qa_polishing', num: 3, labelAr: 'التنجيد، الدهان وضبط الجودة', labelEn: 'Upholstery & QA Inspection' },
    { key: 'dispatched', num: 4, labelAr: 'خرج للتوصيل والتركيب الموقعي', labelEn: 'White-Glove Dispatch' },
    { key: 'delivered', num: 5, labelAr: 'تم التسليم والتركيب بنجاح', labelEn: 'Site Handover & Completed' },
  ];

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'confirmed': return 1;
      case 'production': return 2;
      case 'qa_polishing': return 3;
      case 'dispatched': return 4;
      case 'delivered': return 5;
      case 'cancelled': return 0;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-white flex flex-col selection:bg-[#C9A86A] selection:text-[#08090C]">
      {/* Navigation */}
      <EcommerceNavbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Top Header Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#12151F] via-[#181D2B] to-[#12151F] border border-white/10 p-6 sm:p-8 mb-8 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A86A]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 text-left rtl:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/15 border border-[#C9A86A]/30 text-[#E3C58A] text-xs font-bold font-mono">
                <BadgeCheck className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span>{isAr ? 'بوابة كبار العملاء والمشاريع المعتمدة' : 'VIP Client & Projects Portal'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isAr ? 'حسابي ومتابعة الطلبات المباشرة' : 'My Account & Live Orders Engine'}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                {isAr
                  ? 'متابعة حية لمراحل تصنيع قطع الأثاث الفندقي والمكتبي، الفواتير الضريبية المعتمدة (ZATCA)، والعناوين الوطنية المسجلة.'
                  : 'Real-time tracking of bespoke luxury furniture joinery, official ZATCA Phase-2 tax invoices, and verified National Delivery addresses.'}
              </p>
            </div>

            {/* Quick Stats / Concierge Button */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={getWhatsAppSupportUrl(orders[0]?.orderRef, isAr ? 'ar' : 'en')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'المساعد التنفيذي (واتساب)' : 'Executive Concierge'}</span>
              </a>

              <Link
                href="/furniture"
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <span>{isAr ? 'تصفح الكتالوج' : 'Explore Catalog'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Quick Lookup Bar */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchOrders();
              }}
              className="flex flex-col sm:flex-row gap-2 max-w-xl"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isAr
                      ? 'ابحث برقم الطلب (WD-ORD...) أو رقم الجوال (+966...)'
                      : 'Search by Order Ref (WD-ORD...) or Phone (+966...)'
                  }
                  className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C9A86A] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] font-extrabold text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(201,168,106,0.35)] transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>{isAr ? 'استرجاع الطلبات' : 'Retrieve Orders'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'active'
                ? 'bg-[#C9A86A] text-[#08090C] shadow-lg shadow-[#C9A86A]/20'
                : 'bg-[#12151F] text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isAr ? 'الطلبات الجارية والتصنيع' : 'Active Orders & Factory Stages'}</span>
            {activeOrders.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${activeTab === 'active' ? 'bg-[#08090C] text-[#C9A86A]' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {activeOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'history'
                ? 'bg-[#C9A86A] text-[#08090C] shadow-lg shadow-[#C9A86A]/20'
                : 'bg-[#12151F] text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{isAr ? 'أرشيف الطلبات المسلّمة' : 'Order Archive & Delivered'}</span>
            {pastOrders.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${activeTab === 'history' ? 'bg-[#08090C] text-[#C9A86A]' : 'bg-white/10 text-zinc-300'}`}>
                {pastOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('address')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'address'
                ? 'bg-[#C9A86A] text-[#08090C] shadow-lg shadow-[#C9A86A]/20'
                : 'bg-[#12151F] text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{isAr ? 'العنوان الوطني الموحد (SPL)' : 'Saudi National Address'}</span>
          </button>

          <button
            onClick={() => setActiveTab('b2b')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'b2b'
                ? 'bg-[#C9A86A] text-[#08090C] shadow-lg shadow-[#C9A86A]/20'
                : 'bg-[#12151F] text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'بيانات المنشأة والضريبة (B2B)' : 'Corporate & Tax Details'}</span>
          </button>
        </div>

        {/* Tab 1: Active Orders */}
        {activeTab === 'active' && (
          <div className="space-y-6">
            {activeOrders.length === 0 ? (
              <div className="rounded-3xl bg-[#0E1118] border border-white/10 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 text-[#C9A86A] flex items-center justify-center mx-auto">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {searched
                    ? (isAr ? 'لا توجد طلبات جارية مسجلة بهذا الرقم' : 'No active orders found for this search')
                    : (isAr ? 'لا توجد طلبات جارية حالياً' : 'No active orders in progress')}
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? 'يمكنك البحث أعلاه برقم الجوال المسجل أو رقم الطلب المرجعي، أو استعراض قطع الأثاث الفندقي والمكتبي.'
                    : 'Search above using your registered phone number or order reference, or explore our bespoke collections.'}
                </p>
                <div className="pt-2">
                  <Link
                    href="/furniture"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A86A] text-[#08090C] font-extrabold text-xs hover:bg-[#DFBA73] transition-colors"
                  >
                    <span>{isAr ? 'الذهاب لمتجر الأثاث' : 'Browse Furniture Store'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ) : (
              activeOrders.map((order) => {
                const currentStageIdx = getStageIndex(order.status);
                return (
                  <div
                    key={order.orderRef}
                    className="rounded-3xl bg-[#0E1118] border border-white/10 overflow-hidden shadow-xl"
                  >
                    {/* Order Top Bar */}
                    <div className="p-6 bg-gradient-to-r from-[#141824] via-[#1A1F30] to-[#141824] border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1 text-left rtl:text-right">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-base font-extrabold text-[#C9A86A]">
                            {order.orderRef}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-zinc-300 uppercase">
                            {order.orderType === 'b2b' ? 'B2B Commercial' : 'Retail Luxury'}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {order.paymentStatus === 'paid'
                              ? (isAr ? 'مدفوع بنجاح' : 'Paid & Verified')
                              : (isAr ? 'قيد المعالجة' : 'Processing')}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">
                          {isAr ? 'العميل:' : 'Client:'} <strong className="text-white">{order.customerName}</strong> · {order.city}
                          {order.deliveryDate ? ` · ${isAr ? 'تاريخ التسليم المستهدف:' : 'ETA:'} ${order.deliveryDate}` : ''}
                        </p>
                      </div>

                      {/* Top Order Actions */}
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openInvoiceForOrder(order)}
                          className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-[#C9A86A]/20 border border-[#C9A86A]/40 text-[#E3C58A] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#C9A86A]" />
                          <span>{isAr ? 'الفاتورة الضريبية (ZATCA)' : 'ZATCA Tax Invoice'}</span>
                        </button>

                        <Link
                          href={`/furniture/track?ref=${encodeURIComponent(order.orderRef)}`}
                          className="px-3.5 py-2 rounded-xl bg-[#C9A86A] text-[#08090C] hover:bg-[#DFBA73] text-xs font-extrabold flex items-center gap-1.5 transition-all"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>{isAr ? 'تتبع لحظي' : 'Live Tracking'}</span>
                        </Link>
                      </div>
                    </div>

                    {/* Visual 5-Stage Stepper */}
                    <div className="p-6 sm:p-8 bg-[#0B0D13] border-b border-white/5">
                      <h4 className="text-xs font-mono font-bold uppercase text-zinc-400 mb-6 text-left rtl:text-right">
                        {isAr ? 'مراحل التصنيع والتسليم الموقعي' : 'Manufacturing & Site Handover Lifecycle'}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                        {stages.map((stage) => {
                          const isDone = currentStageIdx >= stage.num;
                          const isCurrent = currentStageIdx === stage.num;
                          return (
                            <div
                              key={stage.key}
                              className={`p-3.5 rounded-2xl border transition-all text-left rtl:text-right relative ${
                                isCurrent
                                  ? 'bg-[#C9A86A]/15 border-[#C9A86A] text-white shadow-lg shadow-[#C9A86A]/10'
                                  : isDone
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-300'
                                  : 'bg-white/5 border-white/5 text-zinc-500'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-xs font-extrabold text-zinc-400">
                                  0{stage.num}
                                </span>
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <div className="w-2 h-2 rounded-full bg-zinc-600" />
                                )}
                              </div>
                              <p className={`text-xs font-bold leading-tight ${isCurrent ? 'text-[#E3C58A]' : 'text-zinc-200'}`}>
                                {isAr ? stage.labelAr : stage.labelEn}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {order.leadTechnician && (
                        <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
                          <Wrench className="w-3.5 h-3.5 text-[#C9A86A]" />
                          <span>{isAr ? 'كبير مهندسي التشطيب والتسليم:' : 'Lead QC Engineer:'} <strong className="text-white">{order.leadTechnician}</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Ordered Items Preview */}
                    <div className="p-6 space-y-3">
                      <h5 className="text-xs font-mono font-bold uppercase text-zinc-400 mb-3 text-left rtl:text-right">
                        {isAr ? 'القطع المشمولة في هذا الطلب' : 'Ordered Pieces'}
                      </h5>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(order.items || []).map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-white/10">
                                  <Image
                                    src={item.image}
                                    alt={item.nameEn}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <p className="font-bold text-white">
                                  {isAr ? (item.nameAr || item.nameEn) : item.nameEn}
                                </p>
                                <p className="text-[11px] text-zinc-400 font-mono">
                                  {item.sku} {item.finishNameEn ? `· ${item.finishNameEn}` : ''}
                                </p>
                              </div>
                            </div>

                            <div className="text-right rtl:text-left shrink-0">
                              <span className="font-mono text-zinc-300 font-bold block">
                                {item.quantity} × {item.unitPrice.toLocaleString('en-US')} SAR
                              </span>
                              <span className="font-mono text-[#C9A86A] text-xs font-extrabold">
                                {(item.quantity * item.unitPrice).toLocaleString('en-US')} SAR
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer Totals */}
                      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="text-zinc-400">
                          {isAr ? 'الدفع عن طريق:' : 'Payment:'} <strong className="text-zinc-200">{order.paymentMethod}</strong>
                        </div>
                        <div className="text-right rtl:text-left flex items-baseline gap-2">
                          <span className="text-zinc-400">{isAr ? 'الإجمالي النهائي (شامل 15% ضريبة):' : 'Final Total (incl. VAT):'}</span>
                          <span className="font-mono text-lg font-black text-[#C9A86A]">
                            {order.totalAmount.toLocaleString('en-US')} SAR
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Past Orders Archive */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {pastOrders.length === 0 ? (
              <div className="rounded-3xl bg-[#0E1118] border border-white/10 p-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-zinc-600 mx-auto" />
                <h3 className="text-base font-bold text-white">
                  {isAr ? 'لا توجد طلبات مؤرشفة سابقة' : 'No past orders in archive'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {isAr ? 'ستظهر هنا كافة الطلبات التي تم تسليمها وتركيبها بنجاح.' : 'Delivered and fulfilled orders will appear here for long-term records.'}
                </p>
              </div>
            ) : (
              pastOrders.map((order) => (
                <div
                  key={order.orderRef}
                  className="rounded-2xl bg-[#0E1118] border border-white/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1 text-left rtl:text-right">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white text-sm">{order.orderRef}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold text-[10px]">
                        {isAr ? 'مكتمل ومسلّم' : 'Completed'}
                      </span>
                    </div>
                    <p className="text-zinc-400">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : '2026'} · {order.items?.length || 1} {isAr ? 'قطع' : 'pieces'} · {order.city}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="font-mono text-sm font-extrabold text-[#C9A86A]">
                      {order.totalAmount.toLocaleString('en-US')} SAR
                    </span>
                    <button
                      type="button"
                      onClick={() => openInvoiceForOrder(order)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#C9A86A]/20 border border-white/15 text-[#E3C58A] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{isAr ? 'فاتورة' : 'Invoice'}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Saudi National Address (العنوان الوطني) */}
        {activeTab === 'address' && (
          <div className="rounded-3xl bg-[#0E1118] border border-white/10 p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div className="space-y-1 text-left rtl:text-right">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#C9A86A]/20 text-[#C9A86A] flex items-center justify-center font-bold">
                    SPL
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {isAr ? 'العنوان الوطني السعودي الموحد' : 'Saudi National Address (SPL)'}
                  </h3>
                </div>
                <p className="text-xs text-zinc-400">
                  {isAr
                    ? 'يضمن تسجيل العنوان الوطني الموحد دقة تسليم أطقم الأثاث الفندقي دون الحاجة لمكالمات توجيهية متكررة.'
                    : 'Verified Saudi National Address ensures seamless white-glove delivery straight to your villa or corporate tower.'}
                </p>
              </div>

              <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            </div>

            {savedAddressFeedback && (
              <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{isAr ? 'تم حفظ العنوان الوطني بنجاح وسيتم اعتماده في جميع طلباتك القادمة.' : 'National Address saved successfully!'}</span>
              </div>
            )}

            <form onSubmit={handleSaveNationalAddress} className="space-y-4 text-xs">
              {/* Short Address Code */}
              <div>
                <label className="block text-zinc-300 font-semibold mb-1 text-left rtl:text-right">
                  {isAr ? 'الرمز المختصر للعنوان الوطني (مثال: RRRD2934)' : 'Short Address Code (e.g. RRRD2934)'}
                </label>
                <input
                  type="text"
                  value={nationalAddress.shortCode}
                  onChange={(e) => setNationalAddress({ ...nationalAddress, shortCode: e.target.value.toUpperCase() })}
                  placeholder="RRRD2934"
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white font-mono focus:outline-none focus:border-[#C9A86A]"
                />
              </div>

              {/* Building & Street */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1 text-left rtl:text-right">
                    {isAr ? 'رقم المبنى' : 'Building Number'}
                  </label>
                  <input
                    type="text"
                    value={nationalAddress.buildingNo}
                    onChange={(e) => setNationalAddress({ ...nationalAddress, buildingNo: e.target.value })}
                    placeholder="7342"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1 text-left rtl:text-right">
                    {isAr ? 'اسم الشارع' : 'Street Name'}
                  </label>
                  <input
                    type="text"
                    value={nationalAddress.street}
                    onChange={(e) => setNationalAddress({ ...nationalAddress, street: e.target.value })}
                    placeholder={isAr ? 'طريق الملك فهد' : 'King Fahd Road'}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>
              </div>

              {/* District & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1 text-left rtl:text-right">
                    {isAr ? 'الحي' : 'District'}
                  </label>
                  <input
                    type="text"
                    value={nationalAddress.district}
                    onChange={(e) => setNationalAddress({ ...nationalAddress, district: e.target.value })}
                    placeholder={isAr ? 'حي النرجس' : 'Al Narjis'}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1 text-left rtl:text-right">
                    {isAr ? 'المدينة' : 'City'}
                  </label>
                  <select
                    value={nationalAddress.city}
                    onChange={(e) => setNationalAddress({ ...nationalAddress, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#141724] border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#C9A86A]"
                  >
                    <option value="Riyadh">{isAr ? 'الرياض' : 'Riyadh'}</option>
                    <option value="Jeddah">{isAr ? 'جدة' : 'Jeddah'}</option>
                    <option value="Najran">{isAr ? 'نجران' : 'Najran'}</option>
                    <option value="Khobar/Dammam">{isAr ? 'الخبر والدمام' : 'Al Khobar / Dammam'}</option>
                    <option value="Mecca/Medina">{isAr ? 'مكة المكرمة والمدينة المنورة' : 'Mecca & Medina'}</option>
                    <option value="Jazan/Asir">{isAr ? 'جازان وعسير' : 'Jazan & Asir'}</option>
                  </select>
                </div>
              </div>

              {/* Postal Code & Additional No */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1 text-left rtl:text-right">
                    {isAr ? 'الرمز البريدي' : 'Postal Code'}
                  </label>
                  <input
                    type="text"
                    value={nationalAddress.postalCode}
                    onChange={(e) => setNationalAddress({ ...nationalAddress, postalCode: e.target.value })}
                    placeholder="12345"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white font-mono focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1 text-left rtl:text-right">
                    {isAr ? 'الرقم الإضافي' : 'Additional Number'}
                  </label>
                  <input
                    type="text"
                    value={nationalAddress.additionalNo}
                    onChange={(e) => setNationalAddress({ ...nationalAddress, additionalNo: e.target.value })}
                    placeholder="2345"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white font-mono focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] font-extrabold text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(201,168,106,0.35)] transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isAr ? 'حفظ العنوان الوطني المعتمد' : 'Save Verified National Address'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 4: Corporate & Tax Details (B2B) */}
        {activeTab === 'b2b' && (
          <div className="rounded-3xl bg-[#0E1118] border border-white/10 p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div className="space-y-1 text-left rtl:text-right">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#C9A86A]" />
                  <h3 className="text-lg font-bold text-white">
                    {isAr ? 'بيانات المنشأة والفوترة الضريبية (B2B)' : 'Corporate Billing & Tax Registry (B2B)'}
                  </h3>
                </div>
                <p className="text-xs text-zinc-400">
                  {isAr
                    ? 'تسجيل السجل التجاري والرقم الضريبي لتضمينه تلقائياً في فواتير هيئة الزكاة والضريبة والجمارك (ZATCA Phase-2).'
                    : 'Store corporate CR and VAT numbers for automated inclusion in ZATCA Phase-2 tax invoices.'}
                </p>
              </div>

              <BadgeCheck className="w-8 h-8 text-[#C9A86A] shrink-0" />
            </div>

            {savedB2bFeedback && (
              <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{isAr ? 'تم حفظ بيانات المنشأة الضريبية بنجاح.' : 'Corporate tax profile saved successfully!'}</span>
              </div>
            )}

            <form onSubmit={handleSaveB2bProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1 text-left rtl:text-right">
                  {isAr ? 'اسم المنشأة / الشركة' : 'Company / Project Name'}
                </label>
                <input
                  type="text"
                  value={b2bProfile.companyName}
                  onChange={(e) => setB2bProfile({ ...b2bProfile, companyName: e.target.value })}
                  placeholder={isAr ? 'شركة التطوير الفندقي القابضة' : 'Hospitality Development Co.'}
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#C9A86A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1 text-left rtl:text-right">
                    {isAr ? 'رقم السجل التجاري (CR)' : 'Commercial Registration (CR)'}
                  </label>
                  <input
                    type="text"
                    value={b2bProfile.crNumber}
                    onChange={(e) => setB2bProfile({ ...b2bProfile, crNumber: e.target.value })}
                    placeholder="1010XXXXXX"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white font-mono focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1 text-left rtl:text-right">
                    {isAr ? 'الرقم الضريبي للمنشأة (15 رقماً)' : 'VAT Registration No. (15 digits)'}
                  </label>
                  <input
                    type="text"
                    value={b2bProfile.vatNumber}
                    onChange={(e) => setB2bProfile({ ...b2bProfile, vatNumber: e.target.value })}
                    placeholder="3XXXXXXXXXXXX03"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white font-mono focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1 text-left rtl:text-right">
                  {isAr ? 'اسم مسؤول المشتريات / المشاريع' : 'Procurement Officer Name'}
                </label>
                <input
                  type="text"
                  value={b2bProfile.contactPerson}
                  onChange={(e) => setB2bProfile({ ...b2bProfile, contactPerson: e.target.value })}
                  placeholder={isAr ? 'المهندس / مدير المشتريات' : 'Procurement Manager'}
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#C9A86A]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] font-extrabold text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(201,168,106,0.35)] transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isAr ? 'حفظ الملف الضريبي للمنشأة' : 'Save Corporate Tax Profile'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* Official ZATCA Tax Invoice Modal */}
      {selectedInvoiceOrder && (
        <OfficialTaxInvoiceModal
          isOpen={invoiceModalOpen}
          onClose={() => setInvoiceModalOpen(false)}
          order={selectedInvoiceOrder}
          isQuotation={selectedInvoiceOrder.orderRef.startsWith('QTN-')}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#08090C] flex items-center justify-center text-[#C9A86A] font-mono text-sm">
        Loading Account Portal...
      </div>
    }>
      <AccountPortalContent />
    </Suspense>
  );
}
