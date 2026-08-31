'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { FURNITURE_CATALOG, FurnitureItem } from '@/lib/furnitureData';
import type { EcommerceOrderRecord, EcommerceOrderStatus, InternalNote } from '@/lib/admin/types';

// Subcomponents
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
  Package, 
  Layers, 
  Warehouse, 
  Users, 
  TrendingUp, 
  Tag, 
  Settings, 
  ExternalLink, 
  FileSpreadsheet, 
  X, 
  Printer, 
  MessageSquare,
  Sparkles,
  Truck
} from 'lucide-react';

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
    discountAmount: 18375,
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

  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'products' | 'inventory' | 'customers' | 'analytics' | 'marketing' | 'settings'
  >('overview');

  const [orders, setOrders] = useState<EcommerceOrderRecord[]>(INITIAL_ORDERS);
  const [products, setProducts] = useState<FurnitureItem[]>(FURNITURE_CATALOG);

  // Selected Order for Slide-Over Drawer
  const [selectedOrder, setSelectedOrder] = useState<EcommerceOrderRecord | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Status Handlers
  const handleUpdateOrderStatus = (orderId: string, newStatus: EcommerceOrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(isAr ? 'تم تحديث حالة الطلب بنجاح' : 'Order status updated successfully', 'success');
  };

  const handleBulkUpdateStatus = (orderIds: string[], newStatus: EcommerceOrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (orderIds.includes(o.id) ? { ...o, status: newStatus } : o))
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
      author: 'Admin Operations',
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
    <div className="space-y-8 pb-20">
      
      {/* 1. Main Console Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-[#C9A86A]/15 border border-[#C9A86A]/30 text-[#C9A86A] text-[11px] font-mono font-bold">
              GreenWood Saudi Manufacturing & Retail Operations
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isAr ? 'منظومة إدارة التجارة الإلكترونية والمبيعات' : 'E-Commerce Sales & Operations Control Center'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr 
              ? 'إدارة شاملة لطلبات الأثاث، خطوط إنتاج المصانع، المخزون، العملاء، الحملات التسويقية والشحن الفندقي.'
              : 'Complete management suite for luxury furniture sales, CNC factory queue, multi-warehouse stock, CRM, and logistics.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/furniture"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-[#C9A86A]/15 hover:bg-[#C9A86A] text-[#C9A86A] hover:text-[#08090C] border border-[#C9A86A]/30 text-xs font-bold flex items-center gap-2 transition-all font-mono"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{isAr ? 'معاينة المتجر الحي' : 'Live Storefront'}</span>
          </Link>
        </div>
      </div>

      {/* 2. 8-Domain Navigation Bar */}
      <div className="flex gap-2 border-b border-white/10 pb-3 overflow-x-auto text-xs font-mono scrollbar-none">
        
        {/* 1. Overview */}
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer shrink-0 ${
            activeTab === 'overview'
              ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>{isAr ? 'نظرة عامة' : '1. Overview'}</span>
        </button>

        {/* 2. Orders */}
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer shrink-0 ${
            activeTab === 'orders'
              ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{isAr ? 'الطلبات والشحن' : '2. Orders'}</span>
          <span className="px-1.5 py-0.2 rounded-md bg-black/20 text-[10px]">
            {orders.length}
          </span>
        </button>

        {/* 3. Products */}
        <button
          onClick={() => setActiveTab('products')}
          className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer shrink-0 ${
            activeTab === 'products'
              ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{isAr ? 'المنتجات والكتالوج' : '3. Products (CRUD)'}</span>
          <span className="px-1.5 py-0.2 rounded-md bg-black/20 text-[10px]">
            {products.length}
          </span>
        </button>

        {/* 4. Inventory */}
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer shrink-0 ${
            activeTab === 'inventory'
              ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white'
          }`}
        >
          <Warehouse className="w-4 h-4" />
          <span>{isAr ? 'المستودعات والمصانع' : '4. Inventory & Plants'}</span>
        </button>

        {/* 5. Customers */}
        <button
          onClick={() => setActiveTab('customers')}
          className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer shrink-0 ${
            activeTab === 'customers'
              ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{isAr ? 'العملاء وCRM' : '5. Customers & CRM'}</span>
        </button>

        {/* 6. Analytics */}
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer shrink-0 ${
            activeTab === 'analytics'
              ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{isAr ? 'التحليلات والمقارنات' : '6. Analytics'}</span>
        </button>

        {/* 7. Marketing */}
        <button
          onClick={() => setActiveTab('marketing')}
          className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer shrink-0 ${
            activeTab === 'marketing'
              ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>{isAr ? 'أكواد الخصم والسلات' : '7. Marketing & Promos'}</span>
        </button>

        {/* 8. Settings */}
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer shrink-0 ${
            activeTab === 'settings'
              ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
              : 'bg-white/5 text-zinc-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>{isAr ? 'إعدادات الشحن والضرائب' : '8. Settings & VAT'}</span>
        </button>

      </div>

      {/* 3. ACTIVE TAB CONTENT RENDERING */}
      {activeTab === 'overview' && (
        <OverviewTab
          orders={orders}
          onSelectOrder={(order) => setSelectedOrder(order)}
          onNavigateTab={(tab: any) => setActiveTab(tab)}
        />
      )}

      {activeTab === 'orders' && (
        <OrdersTab
          orders={orders}
          onSelectOrder={(order) => setSelectedOrder(order)}
          onUpdateStatus={handleUpdateOrderStatus}
          onBulkUpdateStatus={handleBulkUpdateStatus}
        />
      )}

      {activeTab === 'products' && (
        <ProductsTab
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      )}

      {activeTab === 'inventory' && <InventoryTab />}

      {activeTab === 'customers' && <CustomersTab />}

      {activeTab === 'analytics' && <AnalyticsTab />}

      {activeTab === 'marketing' && <MarketingTab />}

      {activeTab === 'settings' && <SettingsTab />}

      {/* 4. SLIDE-OVER ORDER DETAIL DRAWER */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-hidden">
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
                        className="px-3.5 py-2 rounded-xl bg-[#C9A86A] text-[#08090C] font-bold text-xs cursor-pointer font-mono"
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
