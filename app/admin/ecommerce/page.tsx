'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { 
  EcommerceOrderRecord, 
  EcommerceOrderStatus, 
  InternalNote 
} from '@/lib/admin/types';
import { FurnitureItem, FURNITURE_CATALOG } from '@/lib/furnitureData';

// 8 Core Subcomponents
import OverviewTab from '@/components/admin/ecommerce/OverviewTab';
import OrdersTab from '@/components/admin/ecommerce/OrdersTab';
import ProductsTab from '@/components/admin/ecommerce/ProductsTab';
import InventoryTab from '@/components/admin/ecommerce/InventoryTab';
import CustomersTab from '@/components/admin/ecommerce/CustomersTab';
import AnalyticsTab from '@/components/admin/ecommerce/AnalyticsTab';
import MarketingTab from '@/components/admin/ecommerce/MarketingTab';
import SettingsTab from '@/components/admin/ecommerce/SettingsTab';

import { 
  LayoutDashboard, 
  ShoppingCart, 
  Layers, 
  Warehouse, 
  Users, 
  TrendingUp, 
  Tag, 
  Settings, 
  ArrowLeft, 
  ExternalLink, 
  Sparkles,
  Download,
  Plus,
  X,
  MessageSquare,
  Printer,
  DollarSign
} from 'lucide-react';

// Initial Mock Database Seed
const INITIAL_ORDERS: EcommerceOrderRecord[] = [
  {
    id: 'ord-101',
    orderRef: 'WD-ORD-2026-8812',
    customerName: 'سلطان بن عبدالعزيز آل سعود',
    email: 'sultan.saud@al-saud.com',
    phone: '+966 50 572 5070',
    city: 'Riyadh',
    district: 'حي النرجس',
    address: 'العنوان الوطني: RDSA4491',
    villaBuilding: 'قصر رقم 4',
    deliveryNotes: 'الرجاء التنسيق المسبق مع مسؤول المراسم قبل الدخول.',
    orderType: 'b2b',
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
    status: 'delivered',
    factory: 'GreenWood Factory 1 & 3 — Riyadh',
    leadTechnician: 'م. فهد الغامدي',
    items: [
      {
        productId: 'gw-diriyah-curved-sofa',
        sku: 'GW-LV-801',
        nameEn: 'The Al-Diriyah Modular Curved Sofa',
        nameAr: 'أريكة الدرعية المنحنية الفاخرة',
        finishId: 'cream-boucle',
        finishNameEn: 'Ivory Bouclé',
        finishNameAr: 'بوكليه عاجي إيطالي',
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
        nameAr: 'كرسي الاسترخاء النحتي العلا',
        finishId: 'cognac-leather',
        finishNameEn: 'Heritage Cognac Leather',
        finishNameAr: 'جلد كونياك كلاسيكي',
        unitPrice: 9200,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      },
    ],
    internalNotes: [
      {
        id: 'n1',
        text: 'تم استلام الدفعة بالكامل عبر Apple Pay. القطع جاهزة وتم عمل اختبار الجودة الشامل بالمصنع 1.',
        author: 'م. فهد الغامدي',
        authorEmail: 'fahad@wdgroup.online',
        createdAt: '2026-08-28T14:30:00Z',
      },
    ],
    createdAt: '2026-08-28T10:15:00Z',
  },
  {
    id: 'ord-102',
    orderRef: 'WD-ORD-2026-8805',
    customerName: 'فندق سويس بلو (إدارة المشاريع)',
    email: 'projects@swissbluehotels.com',
    phone: '+966 12 600 4400',
    city: 'Jeddah',
    district: 'الكورنيش الشمالي',
    address: 'برج سويس بلو الفندقي — شارع الكورنيش',
    villaBuilding: 'الجناح الرئاسي 1801',
    deliveryNotes: 'استلام موقع المشروع مع استشاري الفندق والتوقيع على محضر الفحص FF&E.',
    orderType: 'b2b',
    deliveryDate: '2026-09-12',
    timeSlot: 'morning',
    whiteGloveAssembly: true,
    wallAnchoring: true,
    paymentMethod: 'b2b_po',
    paymentStatus: 'paid',
    subtotal: 122500,
    discountAmount: 12250,
    promoCode: 'TRADE-SWISSBLUE',
    vatAmount: 16537,
    totalAmount: 126787,
    status: 'in_production',
    factory: 'GreenWood Factory 1 & 3 — Riyadh',
    leadTechnician: 'م. ياسر القحطاني',
    items: [
      {
        productId: 'gw-swissblue-bed',
        sku: 'GW-BD-702',
        nameEn: 'The SwissBlue Master Suite Bed & Headboard',
        nameAr: 'سرير الجناح الرئاسي سويس بلو والتجاليد',
        finishId: 'smoked-oak',
        finishNameEn: 'Smoked Grey Oak',
        finishNameAr: 'سنديان رمادي مدخن',
        unitPrice: 24500,
        quantity: 5,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
      },
    ],
    internalNotes: [
      {
        id: 'n2',
        text: 'أمر شراء معتمد B2B PO-8840. تم جدولة النقل بالشاحنة المبردة المخصصة للمشاريع الفندقية.',
        author: 'إدارة العمليات الفندقية',
        authorEmail: 'ops@wdgroup.online',
        createdAt: '2026-08-27T09:00:00Z',
      },
    ],
    createdAt: '2026-08-26T16:45:00Z',
  },
  {
    id: 'ord-103',
    orderRef: 'WD-ORD-2026-8798',
    customerName: 'م. خالد بن منصور التميمي',
    email: 'khaled.mansour@tamimi.sa',
    phone: '+966 55 443 2211',
    city: 'Riyadh',
    district: 'حي حطين',
    address: 'العنوان الوطني: RYD9012',
    villaBuilding: 'فيلا 14',
    deliveryNotes: 'تركيب في الصالون المفتوح الدور الأول.',
    orderType: 'retail',
    deliveryDate: '2026-09-05',
    timeSlot: 'afternoon',
    whiteGloveAssembly: true,
    wallAnchoring: false,
    paymentMethod: 'tabby',
    paymentStatus: 'paid',
    subtotal: 18900,
    discountAmount: 0,
    vatAmount: 2835,
    totalAmount: 21735,
    status: 'ready_for_dispatch',
    factory: 'GreenWood Factory 3 — Riyadh',
    leadTechnician: 'فريق التركيبات 2',
    items: [
      {
        productId: 'gw-diriyah-curved-sofa',
        sku: 'GW-LV-801',
        nameEn: 'The Al-Diriyah Modular Curved Sofa',
        nameAr: 'أريكة الدرعية المنحنية الفاخرة',
        finishId: 'camel-velvet',
        finishNameEn: 'Desert Camel Velvet',
        finishNameAr: 'مخمل صحراوي جملي',
        unitPrice: 18900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      },
    ],
    internalNotes: [],
    createdAt: '2026-08-25T18:30:00Z',
  },
  {
    id: 'ord-104',
    orderRef: 'WD-ORD-2026-8782',
    customerName: 'شركة طويق للاستثمار والتطوير',
    email: 'finance@tuwaiqholding.sa',
    phone: '+966 11 445 6789',
    city: 'Riyadh',
    district: 'طريق الملك فهد',
    address: 'برج طويق التنفيذي — الدور 28',
    villaBuilding: 'قاعة مجلس الإدارة الرئيسية',
    deliveryNotes: 'التوريد برافعة خارجية مخصصة بسبب طول الطاولة (4.2م).',
    orderType: 'b2b',
    deliveryDate: '2026-09-15',
    timeSlot: 'evening',
    whiteGloveAssembly: true,
    wallAnchoring: false,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    subtotal: 76000,
    discountAmount: 7600,
    promoCode: 'CORP10',
    vatAmount: 10260,
    totalAmount: 78660,
    status: 'in_production',
    factory: 'GreenWood Factory 1 & 2 — Riyadh',
    leadTechnician: 'م. فهد الغامدي',
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
        text: 'تم استلام التحويل البنكي وتأكيد مواصفات الشواحن الذكية ومنافذ HDMI 4K.',
        author: 'الإدارة المالية',
        authorEmail: 'finance@wdgroup.online',
        createdAt: '2026-08-25T13:20:00Z',
      },
    ],
    createdAt: '2026-08-24T12:00:00Z',
  }
];

function EcommerceAdminContent() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();
  const searchParams = useSearchParams();

  const [currency, setCurrency] = useState<'SAR' | 'USD'>('SAR');

  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'products' | 'inventory' | 'customers' | 'analytics' | 'marketing' | 'settings'
  >('overview');

  const [orders, setOrders] = useState<EcommerceOrderRecord[]>(INITIAL_ORDERS);
  const [products, setProducts] = useState<FurnitureItem[]>(FURNITURE_CATALOG);

  // Selected Order for Slide-Over Drawer
  const [selectedOrder, setSelectedOrder] = useState<EcommerceOrderRecord | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Tab Rail Scroll Teaser Animation Ref
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedScrollRef = useRef(false);

  // Listen to searchParams and URL Hash to switch tabs instantly when clicked from sidebar or links
  useEffect(() => {
    const syncTabFromUrl = () => {
      const tabParam = searchParams?.get('tab');
      const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
      const target = (tabParam || hash || '').toLowerCase();

      if (target) {
        if (target === 'orders' || target === 'order') {
          setActiveTab('orders');
        } else if (target === 'factory' || target === 'inventory' || target === 'plants') {
          setActiveTab('inventory');
        } else if (target === 'products' || target === 'catalog') {
          setActiveTab('products');
        } else if (target === 'customers' || target === 'crm') {
          setActiveTab('customers');
        } else if (target === 'analytics' || target === 'reports' || target === 'intelligence') {
          setActiveTab('analytics');
        } else if (target === 'marketing' || target === 'promos') {
          setActiveTab('marketing');
        } else if (target === 'settings' || target === 'vat') {
          setActiveTab('settings');
        } else if (target === 'overview') {
          setActiveTab('overview');
        }
      }
    };

    syncTabFromUrl();
    window.addEventListener('hashchange', syncTabFromUrl);
    window.addEventListener('popstate', syncTabFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncTabFromUrl);
      window.removeEventListener('popstate', syncTabFromUrl);
    };
  }, [searchParams]);

  // Auto teaser scroll: Starts strictly at default 1-2-3 posture, glides to reveal hidden tabs in both English LTR and Arabic RTL, then returns back to 1-2-3
  useEffect(() => {
    if (!tabsContainerRef.current) return;
    
    // Explicitly lock starting position at default (1. Overview, 2. Orders, 3. Products)
    tabsContainerRef.current.scrollLeft = 0;

    // Delayed start (1.7s) so user has fully settled and clearly sees the animation initiate
    const timer = setTimeout(() => {
      if (tabsContainerRef.current && !hasAnimatedScrollRef.current) {
        const el = tabsContainerRef.current;
        const maxScroll = el.scrollWidth - el.clientWidth;
        
        if (maxScroll > 15) {
          const peekDistance = Math.min(340, maxScroll);
          
          // In RTL mode, horizontal scrolling towards hidden items is negative in Chromium/WebKit
          const isRtl = isAr || document.documentElement.dir === 'rtl';
          const targetScroll = isRtl ? -peekDistance : peekDistance;
          
          // Step A: Smoothly glide from default posture to reveal hidden tabs
          el.scrollBy({ left: targetScroll, behavior: 'smooth' });

          // Step B: Pause for 1 second so user registers remaining tabs, then glide smoothly back to default posture (1-2-3)
          const returnTimer = setTimeout(() => {
            if (el && !hasAnimatedScrollRef.current) {
              el.scrollTo({ left: 0, behavior: 'smooth' });
            }
          }, 1000);

          return () => clearTimeout(returnTimer);
        }
      }
    }, 1700);

    return () => clearTimeout(timer);
  }, [isAr]);

  const formatPrice = (valSAR: number) => {
    if (currency === 'USD') {
      const valUSD = Math.round(valSAR / 3.75);
      return `${valUSD.toLocaleString('en-US')} USD`;
    }
    return `${valSAR.toLocaleString('en-US')} ${isAr ? 'ر.س' : 'SAR'}`;
  };

  // Status Handlers with Automated Client Notifications (Feature 7)
  const handleUpdateOrderStatus = async (orderId: string, newStatus: EcommerceOrderStatus) => {
    const targetOrder = orders.find((o) => o.id === orderId);

    // Call Stage Notification API (Brevo Email + WhatsApp)
    if (targetOrder) {
      fetch('/api/orders/notify-stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderRef: targetOrder.orderRef,
          customerName: targetOrder.customerName,
          customerEmail: targetOrder.email,
          customerPhone: targetOrder.phone,
          newStatus,
          city: targetOrder.city,
          leadTechnician: targetOrder.leadTechnician,
          scheduledDeliveryDate: targetOrder.deliveryDate,
        }),
      }).catch((err) => console.warn('Telemetry dispatch notice:', err));

      const stageNote: InternalNote = {
        id: `note-${Date.now()}`,
        text: isAr 
          ? `تم إشعار العميل آلياً عبر البريد الإلكتروني والواتساب بتحديث مسار الطلب إلى: (${newStatus})` 
          : `Automated telemetry dispatched: Client notified via Email & WhatsApp (${newStatus})`,
        author: isAr ? 'منظومة الإشعارات الآلية' : 'Automated Telemetry',
        authorEmail: 'notifications@wdgroup.online',
        createdAt: new Date().toISOString(),
      };

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus, internalNotes: [stageNote, ...o.internalNotes] } : o))
      );

      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus, internalNotes: [stageNote, ...prev.internalNotes] } : null));
      }

      showToast(
        isAr 
          ? 'تم تحديث المرحلة وإرسال إشعار للعميل عبر البريد والواتساب' 
          : 'Stage updated & customer notified via Email & WhatsApp', 
        'success'
      );
    } else {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    }
  };

  const handleBulkUpdateStatus = (orderIds: string[], newStatus: EcommerceOrderStatus) => {
    orderIds.forEach((id) => {
      const order = orders.find((o) => o.id === id);
      if (order) {
        fetch('/api/orders/notify-stage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderRef: order.orderRef,
            customerName: order.customerName,
            customerEmail: order.email,
            customerPhone: order.phone,
            newStatus,
            city: order.city,
            leadTechnician: order.leadTechnician,
            scheduledDeliveryDate: order.deliveryDate,
          }),
        }).catch(() => {});
      }
    });

    setOrders((prev) =>
      prev.map((o) => (orderIds.includes(o.id) ? { ...o, status: newStatus } : o))
    );

    showToast(
      isAr 
        ? `تم تحديث ${orderIds.length} طلبات وإرسال إشعارات جماعية للعملاء` 
        : `Updated ${orderIds.length} orders & sent batch notifications`, 
      'success'
    );
  };

  // Product Handlers
  const handleAddProduct = (newProduct: FurnitureItem) => {
    setProducts([newProduct, ...products]);
  };

  const handleUpdateProduct = (updatedProduct: FurnitureItem) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Internal Notes Handler
  const handleAddInternalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !newNoteText.trim()) return;

    const newNote: InternalNote = {
      id: `note-${Date.now()}`,
      text: newNoteText.trim(),
      author: isAr ? 'م. إدارة العمليات' : 'Admin Operations',
      authorEmail: 'admin@wdgroup.online',
      createdAt: new Date().toISOString(),
    };

    const updatedNotes = [...selectedOrder.internalNotes, newNote];
    setOrders((prev) =>
      prev.map((o) => (o.id === selectedOrder.id ? { ...o, internalNotes: updatedNotes } : o))
    );
    setSelectedOrder({ ...selectedOrder, internalNotes: updatedNotes });
    setNewNoteText('');
    showToast(isAr ? 'تمت إضافة الملاحظة الداخلية' : 'Internal note saved', 'success');
  };

  const getStatusBadge = (status: EcommerceOrderStatus) => {
    switch (status) {
      case 'confirmed':
        return {
          label: isAr ? 'مؤكد ومعتمد' : 'Confirmed',
          bg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
        };
      case 'in_production':
        return {
          label: isAr ? 'قيد التصنيع بالمصنع' : 'In Production',
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        };
      case 'ready_for_dispatch':
        return {
          label: isAr ? 'جاهز للشحن الفندقي' : 'Ready Dispatch',
          bg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
        };
      case 'out_for_delivery':
        return {
          label: isAr ? 'خارج للتوصيل والتركيب' : 'Out for Delivery',
          bg: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
        };
      case 'delivered':
        return {
          label: isAr ? 'تم التسليم والتركيب' : 'Delivered & Assembled',
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        };
      case 'cancelled':
        return {
          label: isAr ? 'ملغي' : 'Cancelled',
          bg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
        };
      default:
        return {
          label: isAr ? 'في انتظار الدفع' : 'Pending Payment',
          bg: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',
        };
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Header & Navigation */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
            <Link href="/admin" className="hover:text-[#C9A86A] transition-colors">
              {isAr ? 'لوحة التحكم العامة' : 'Main Admin'}
            </Link>
            <span>/</span>
            <span className="text-[#C9A86A]">{isAr ? 'منصة إدارة المبيعات والتجارة' : 'E-Commerce Operations'}</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <ShoppingCart className="w-6 h-6 text-[#C9A86A]" />
            <span>{isAr ? 'منظومة مبيعات وعمليات الأثاث والتوريد' : 'E-Commerce Sales & Operations Center'}</span>
          </h1>
        </div>

        {/* Currency Converter Toggle & Public Store Link */}
        <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
          
          {/* Global Currency Switcher */}
          <div className="flex items-center gap-1 bg-[#141721] p-1 rounded-xl border border-white/10 text-xs font-mono">
            <button
              onClick={() => setCurrency('SAR')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                currency === 'SAR' ? 'bg-[#C9A86A] text-[#08090C] shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🇸🇦</span>
              <span>{isAr ? 'ر.س' : 'SAR'}</span>
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                currency === 'USD' ? 'bg-[#C9A86A] text-[#08090C] shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🇺🇸</span>
              <span>USD</span>
            </button>
          </div>

          <Link
            href="/furniture"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-mono font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap"
          >
            <span>{isAr ? 'المعرض العام' : 'Public Storefront'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Top Navigation Segmented Tab Rail with Fluid Sliding Gold Pill & Teaser Scroll Animation */}
      <div 
        ref={tabsContainerRef}
        onPointerDown={() => { hasAnimatedScrollRef.current = true; }}
        onTouchStart={() => { hasAnimatedScrollRef.current = true; }}
        onWheel={() => { hasAnimatedScrollRef.current = true; }}
        className="glass-card bg-[#0F1117]/80 p-1.5 rounded-2xl border border-white/10 overflow-x-auto scroll-smooth" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex items-center gap-1.5 min-w-max">
          {[
            { id: 'overview', icon: LayoutDashboard, labelEn: '1. Overview', labelAr: '1. الرئيسية والمؤشرات' },
            { id: 'orders', icon: ShoppingCart, labelEn: '2. Orders', labelAr: '2. إدارة الطلبات', badge: orders.length, badgeColor: 'bg-emerald-500/20 text-emerald-300' },
            { id: 'products', icon: Layers, labelEn: '3. Products', labelAr: '3. المنتجات والكتالوج', badge: products.length, badgeColor: 'bg-white/10 text-zinc-300' },
            { id: 'inventory', icon: Warehouse, labelEn: '4. Inventory & Plants', labelAr: '4. المستودعات والمصانع' },
            { id: 'customers', icon: Users, labelEn: '5. Customers & CRM', labelAr: '5. العملاء وCRM' },
            { id: 'analytics', icon: TrendingUp, labelEn: '6. Reports & Intelligence', labelAr: '6. التقارير والذكاء المالي' },
            { id: 'marketing', icon: Tag, labelEn: '7. Marketing & Promos', labelAr: '7. أكواد الخصم والسلات' },
            { id: 'settings', icon: Settings, labelEn: '8. Settings & VAT', labelAr: '8. إعدادات الشحن والضرائب' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0 z-10 ${
                  isActive
                    ? 'text-[#08090C]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeEcommerceTab"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] rounded-xl shadow-lg -z-10"
                  />
                )}

                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#08090C]' : 'text-[#C9A86A]'}`} />
                <span>{isAr ? tab.labelAr : tab.labelEn}</span>

                {tab.badge !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold font-mono ${
                    isActive ? 'bg-black/20 text-[#08090C]' : tab.badgeColor
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Active Tab Content Rendering */}
      <div className="pt-2">
        {activeTab === 'overview' && (
          <OverviewTab
            orders={orders}
            currency={currency}
            onSelectOrder={setSelectedOrder}
            onNavigateTab={(t) => setActiveTab(t as any)}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersTab
            orders={orders}
            currency={currency}
            onSelectOrder={setSelectedOrder}
            onUpdateStatus={handleUpdateOrderStatus}
            onBulkUpdateStatus={handleBulkUpdateStatus}
          />
        )}

        {activeTab === 'products' && (
          <ProductsTab
            products={products}
            currency={currency}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {activeTab === 'inventory' && (
          <InventoryTab />
        )}

        {activeTab === 'customers' && (
          <CustomersTab />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab />
        )}

        {activeTab === 'marketing' && (
          <MarketingTab />
        )}

        {activeTab === 'settings' && (
          <SettingsTab />
        )}
      </div>

      {/* 4. Slide-Over Order Detail Drawer (Positioned under AdminHeader at top-[65px] z-40) */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 top-[65px] z-40 overflow-hidden">
            {/* Soft translucent backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] cursor-pointer"
            />

            <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10 pointer-events-none">
              <motion.div
                initial={{ x: isAr ? -500 : 500 }}
                animate={{ x: 0 }}
                exit={{ x: isAr ? -500 : 500 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-xl h-full bg-[#0F1117] border-l rtl:border-l-0 rtl:border-r border-white/10 text-white shadow-2xl flex flex-col justify-between pointer-events-auto"
              >
                
                {/* Drawer Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#141721]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#C9A86A] font-bold">{selectedOrder.orderRef}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getStatusBadge(selectedOrder.status).bg}`}>
                        {getStatusBadge(selectedOrder.status).label}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{selectedOrder.customerName}</h3>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
                  
                  {/* Status Switcher Bar */}
                  <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-2">
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block">
                      {isAr ? 'تحديث حالة دورة حياة الطلب' : 'Update Fulfillment Pipeline'}
                    </label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-xs font-mono focus:border-[#C9A86A]"
                    >
                      <option value="pending_payment">{isAr ? 'في انتظار الدفع' : 'Pending Payment'}</option>
                      <option value="confirmed">{isAr ? 'مؤكد ومعتمد' : 'Confirmed'}</option>
                      <option value="in_production">{isAr ? 'قيد التصنيع بالمصنع' : 'In Production'}</option>
                      <option value="ready_for_dispatch">{isAr ? 'جاهز للشحن الفندقي' : 'Ready for Dispatch'}</option>
                      <option value="out_for_delivery">{isAr ? 'خارج للتوصيل والتركيب' : 'Out for Delivery'}</option>
                      <option value="delivered">{isAr ? 'تم التسليم والتركيب' : 'Delivered & Assembled'}</option>
                      <option value="cancelled">{isAr ? 'ملغي' : 'Cancelled'}</option>
                    </select>
                  </div>

                  {/* Customer & Location Data */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#141721] border border-white/5 font-mono">
                    <div>
                      <span className="text-zinc-500 text-[10px] block uppercase">{isAr ? 'معلومات الاتصال' : 'Contact'}</span>
                      <span className="text-white font-bold block">{selectedOrder.phone}</span>
                      <span className="text-zinc-400 text-[11px] block">{selectedOrder.email}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] block uppercase">{isAr ? 'موقع التركيب' : 'Delivery Target'}</span>
                      <span className="text-white font-bold block">{selectedOrder.city} — {selectedOrder.district}</span>
                      <span className="text-zinc-400 text-[11px] block">{selectedOrder.address}</span>
                    </div>
                  </div>

                  {/* Factory & Assembly Dispatch */}
                  <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-2 font-mono">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400">{isAr ? 'المصنع المسؤول:' : 'Assigned Plant:'}</span>
                      <span className="text-white font-bold">{selectedOrder.factory}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400">{isAr ? 'مشرف التركيبات:' : 'Assembly Lead:'}</span>
                      <span className="text-emerald-400 font-bold">{selectedOrder.leadTechnician}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400">{isAr ? 'موعد التسليم المعتمد:' : 'Scheduled Date:'}</span>
                      <span className="text-[#C9A86A] font-bold">{selectedOrder.deliveryDate} ({selectedOrder.timeSlot})</span>
                    </div>
                  </div>

                  {/* Purchased Items List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase font-mono">
                      {isAr ? 'القطع والمنتجات المشمولة' : 'Order Line Items'}
                    </h4>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-2xl bg-[#141721] border border-white/5 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
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
                            <span className="text-white font-bold block">{formatPrice(item.unitPrice)}</span>
                            <span className="text-zinc-500 text-[10px]">× {item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Financial Summary */}
                  <div className="p-4 rounded-2xl bg-[#141721] border border-white/10 space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                      <span>{formatPrice(selectedOrder.subtotal)}</span>
                    </div>
                    {selectedOrder.discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>{isAr ? `الخصم (${selectedOrder.promoCode})` : `Discount (${selectedOrder.promoCode})`}</span>
                        <span>-{formatPrice(selectedOrder.discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-zinc-400">
                      <span>{isAr ? 'ضريبة القيمة المضافة 15%' : '15% Saudi VAT'}</span>
                      <span>{formatPrice(selectedOrder.vatAmount)}</span>
                    </div>
                    <div className="flex justify-between text-white font-extrabold text-sm pt-2 border-t border-white/10">
                      <span>{isAr ? 'المبلغ الإجمالي' : 'Total Amount'}</span>
                      <span className="text-[#C9A86A]">{formatPrice(selectedOrder.totalAmount)}</span>
                    </div>
                  </div>

                  {/* Internal Operations Notes */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase font-mono">
                      {isAr ? 'سجل الملاحظات الإدارية والمصنعية' : 'Internal Operational Notes'}
                    </h4>
                    <div className="space-y-2">
                      {selectedOrder.internalNotes.map((note) => (
                        <div key={note.id} className="p-3 rounded-xl bg-[#141721] border border-white/5 text-xs space-y-1.5">
                          <p className="text-zinc-200 leading-relaxed text-right rtl:text-right" dir="rtl">
                            {note.text}
                          </p>
                          <div className="flex justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-white/5">
                            <span>{note.author}</span>
                            <span>{new Date(note.createdAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-GB')}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAddInternalNote} className="flex gap-2">
                      <input
                        type="text"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        dir={isAr ? 'rtl' : 'ltr'}
                        placeholder={isAr ? 'أضف ملاحظة تشغيلية داخلية جديدة' : 'Add internal operational note'}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-[#C9A86A] text-[#08090C] font-bold text-xs cursor-pointer font-mono shrink-0"
                      >
                        {isAr ? 'إضافة' : 'Add Note'}
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
                    className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer font-mono"
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

export default function EcommerceAdminDashboard() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center text-zinc-400 font-mono">
        Loading Command Center...
      </div>
    }>
      <EcommerceAdminContent />
    </Suspense>
  );
}
