'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  Factory, 
  HardHat, 
  Users, 
  Briefcase, 
  Image as ImageIcon, 
  Search, 
  ShieldCheck, 
  Settings, 
  Activity, 
  ChevronRight, 
  ChevronDown,
  Globe, 
  Layers, 
  MessageSquare,
  Sparkles,
  ExternalLink,
  Lock,
  ShoppingCart,
  Package,
  Truck,
  TrendingUp,
  Mail,
  KeyRound,
  Cpu,
  Eye,
  Sliders,
  CreditCard,
  Building
} from 'lucide-react';
import type { AdminRole } from '@/lib/admin/types';

interface AdminSidebarProps {
  userRole?: AdminRole;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export interface SubNavItem {
  label: string;
  labelAr: string;
  href: string;
  badge?: string;
  badgeAr?: string;
  badgeColor?: string;
  allowedRoles?: AdminRole[];
}

export interface NavItem {
  id: string;
  label: string;
  labelAr: string;
  href: string;
  icon: any;
  iconBg: string;
  allowedRoles?: AdminRole[];
  badge?: string;
  badgeAr?: string;
  badgeColor?: string;
  children?: SubNavItem[];
}

export interface NavGroup {
  groupName: string;
  groupNameAr: string;
  accentDot: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupName: 'Overview',
    groupNameAr: 'نظرة عامة',
    accentDot: 'bg-blue-400',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        labelAr: 'لوحة القيادة',
        href: '/admin',
        icon: LayoutDashboard,
        iconBg: 'bg-blue-500/15 text-blue-400 border-blue-500/25 group-hover:bg-blue-500/25',
      },
    ],
  },
  {
    groupName: 'Content & Pages',
    groupNameAr: 'المحتوى والصفحات',
    accentDot: 'bg-indigo-400',
    items: [
      {
        id: 'pages',
        label: 'Pages & Sections',
        labelAr: 'أقسام ومحتوى الصفحات',
        href: '/admin/content/pages',
        icon: FileText,
        iconBg: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/25 group-hover:bg-indigo-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
        children: [
          {
            label: 'Homepage Modules',
            labelAr: 'الصفحة الرئيسية',
            href: '/admin/content/pages?tab=home',
          },
          {
            label: 'About & Legacy',
            labelAr: 'عن المجموعة والرؤية',
            href: '/admin/content/pages?tab=about',
          },
          {
            label: 'Hospitality Sector',
            labelAr: 'محتوى قطاع الضيافة',
            href: '/admin/content/pages?tab=hospitality',
          },
          {
            label: 'Manufacturing Sector',
            labelAr: 'محتوى قطاع التصنيع',
            href: '/admin/content/pages?tab=manufacturing',
          },
          {
            label: 'Contracting Sector',
            labelAr: 'محتوى قطاع المقاولات',
            href: '/admin/content/pages?tab=contracting',
          },
        ],
      },
      {
        id: 'metrics',
        label: 'Corporate Metrics',
        labelAr: 'الإحصائيات الرئيسية',
        href: '/admin/content/metrics',
        icon: Activity,
        iconBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25 group-hover:bg-cyan-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
      {
        id: 'leadership',
        label: 'Leadership & Vision',
        labelAr: 'القيادة والرؤية التنفيذية',
        href: '/admin/content/leadership',
        icon: Sparkles,
        iconBg: 'bg-purple-500/15 text-purple-400 border-purple-500/25 group-hover:bg-purple-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
    ],
  },
  {
    groupName: 'Strategic Sectors',
    groupNameAr: 'قطاعات الأعمال',
    accentDot: 'bg-amber-400',
    items: [
      {
        id: 'hospitality',
        label: 'SwissBlue Hospitality',
        labelAr: 'قطاع الضيافة والفنادق',
        href: '/admin/sectors/hospitality',
        icon: Building2,
        iconBg: 'bg-sky-500/15 text-sky-400 border-sky-500/25 group-hover:bg-sky-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
      {
        id: 'manufacturing',
        label: 'GreenWood Manufacturing',
        labelAr: 'التصنيع والأثاث المعماري',
        href: '/admin/sectors/manufacturing',
        icon: Factory,
        iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25 group-hover:bg-emerald-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
      {
        id: 'contracting',
        label: 'Contracting & Fit-Out',
        labelAr: 'المقاولات والتشطيب الفاخر',
        href: '/admin/sectors/contracting',
        icon: HardHat,
        iconBg: 'bg-amber-500/15 text-amber-400 border-amber-500/25 group-hover:bg-amber-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
    ],
  },
  {
    groupName: 'E-Commerce & Sales',
    groupNameAr: 'المتجر والمبيعات',
    accentDot: 'bg-[#C9A86A]',
    items: [
      {
        id: 'ecommerce-hub',
        label: 'Sales & Operations Hub',
        labelAr: 'مركز المبيعات والعمليات',
        href: '/admin/ecommerce',
        icon: ShoppingCart,
        iconBg: 'bg-[#C9A86A]/15 text-[#C9A86A] border-[#C9A86A]/25 group-hover:bg-[#C9A86A]/25',
        allowedRoles: ['owner', 'admin', 'crm', 'editor'],
        children: [
          {
            label: 'Live Sales Overview',
            labelAr: 'نظرة عامة على المبيعات',
            href: '/admin/ecommerce?tab=overview',
          },
          {
            label: 'Order Processing & Tracking',
            labelAr: 'إدارة الطلبات والشحن',
            href: '/admin/ecommerce?tab=orders',
          },
          {
            label: 'Furniture Products & Catalog',
            labelAr: 'كتالوج المنتجات والأثاث',
            href: '/admin/ecommerce?tab=products',
          },
          {
            label: 'AI Product Studio',
            labelAr: 'استوديو الذكاء الاصطناعي',
            href: '/admin/ecommerce?tab=studio',
            badge: 'AI PRO',
            badgeAr: 'ذكاء اصطناعي',
            badgeColor: 'bg-[#C9A86A]/20 text-[#C9A86A] border-[#C9A86A]/40',
          },
          {
            label: 'Factory Queue & Inventory',
            labelAr: 'المخزون وطابور التصنيع',
            href: '/admin/ecommerce?tab=inventory',
          },
          {
            label: 'VIP Clients & Accounts',
            labelAr: 'العملاء وحسابات B2B',
            href: '/admin/ecommerce?tab=customers',
          },
          {
            label: 'Revenue Analytics',
            labelAr: 'التحليلات المالية والإيرادات',
            href: '/admin/ecommerce?tab=analytics',
          },
          {
            label: 'Coupons & GCC Promos',
            labelAr: 'كوبونات الخصم والعروض',
            href: '/admin/ecommerce?tab=marketing',
          },
          {
            label: 'Store & Payment Gateways',
            labelAr: 'إعدادات المتجر وبوابة الدفع',
            href: '/admin/ecommerce?tab=settings',
          },
        ],
      },
    ],
  },
  {
    groupName: 'Operations & CRM',
    groupNameAr: 'العمليات والعملاء',
    accentDot: 'bg-emerald-400',
    items: [
      {
        id: 'inquiries',
        label: 'Inquiries & RFPs',
        labelAr: 'الاستفسارات والمناقصات',
        href: '/admin/crm/inquiries',
        icon: MessageSquare,
        iconBg: 'bg-blue-500/15 text-blue-400 border-blue-500/25 group-hover:bg-blue-500/25',
        allowedRoles: ['owner', 'admin', 'crm'],
        children: [
          {
            label: 'All Received Inquiries',
            labelAr: 'جميع الاستفسارات الواردة',
            href: '/admin/crm/inquiries',
          },
          {
            label: 'New Uncontacted Leads',
            labelAr: 'طلبات جديدة غير متواصل معها',
            href: '/admin/crm/inquiries?status=new',
          },
          {
            label: 'SwissBlue Hospitality RFPs',
            labelAr: 'استفسارات قطاع الضيافة',
            href: '/admin/crm/inquiries?sector=hospitality',
          },
          {
            label: 'GreenWood Manufacturing RFPs',
            labelAr: 'استفسارات ومناقصات التصنيع',
            href: '/admin/crm/inquiries?sector=manufacturing',
          },
          {
            label: 'Turnkey Contracting Quotes',
            labelAr: 'استفسارات المقاولات والتشطيب',
            href: '/admin/crm/inquiries?sector=contracting',
          },
        ],
      },
      {
        id: 'jobs',
        label: 'Job Openings',
        labelAr: 'الشواغر الوظيفية',
        href: '/admin/hr/jobs',
        icon: Briefcase,
        iconBg: 'bg-teal-500/15 text-teal-400 border-teal-500/25 group-hover:bg-teal-500/25',
        allowedRoles: ['owner', 'admin', 'hr'],
        children: [
          {
            label: 'Active Listings',
            labelAr: 'الوظائف المتاحة حالياً',
            href: '/admin/hr/jobs',
          },
          {
            label: 'Post New Vacancy',
            labelAr: 'إضافة شاغر وظيفي جديد',
            href: '/admin/hr/jobs?action=new',
            badge: 'NEW',
            badgeAr: 'جديد',
            badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
          },
        ],
      },
      {
        id: 'applications',
        label: 'Talent Pool & ATS',
        labelAr: 'بنك الكفاءات والـ CVs',
        href: '/admin/hr/applications',
        icon: Users,
        iconBg: 'bg-rose-500/15 text-rose-400 border-rose-500/25 group-hover:bg-rose-500/25',
        allowedRoles: ['owner', 'admin', 'hr'],
        children: [
          {
            label: 'Received Applications',
            labelAr: 'جميع طلبات التوظيف الواردة',
            href: '/admin/hr/applications',
          },
          {
            label: 'Awaiting HR Review',
            labelAr: 'طلبات جديدة بانتظار المراجعة',
            href: '/admin/hr/applications?status=new',
          },
          {
            label: 'Shortlisted Candidates',
            labelAr: 'المرشحون المؤهلون للمقابلة',
            href: '/admin/hr/applications?status=shortlisted',
          },
        ],
      },
      {
        id: 'media',
        label: 'Media Library',
        labelAr: 'مكتبة الوسائط الرقمية',
        href: '/admin/media',
        icon: ImageIcon,
        iconBg: 'bg-pink-500/15 text-pink-400 border-pink-500/25 group-hover:bg-pink-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
        children: [
          {
            label: 'All Cloud Storage Assets',
            labelAr: 'جميع الوسائط والملفات',
            href: '/admin/media',
          },
          {
            label: 'Photos & High-Res Renders',
            labelAr: 'الصور والرندرات المعمارية',
            href: '/admin/media?bucket=photos',
          },
          {
            label: 'Factory Video Reels',
            labelAr: 'فيديوهات المصانع والتوثيق',
            href: '/admin/media?bucket=videos',
          },
          {
            label: 'CAD & PDF Documents',
            labelAr: 'ملفات PDF والمخططات الهندسية',
            href: '/admin/media?bucket=assets',
          },
        ],
      },
      {
        id: 'seo',
        label: 'SEO & Social Graph',
        labelAr: 'محركات البحث وميتاداتا',
        href: '/admin/seo',
        icon: Search,
        iconBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25 group-hover:bg-cyan-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
        children: [
          {
            label: 'Google Search & Verification',
            labelAr: 'التحقق ومحركات البحث Google',
            href: '/admin/seo?tab=google',
          },
          {
            label: 'GA4 & Tag Manager',
            labelAr: 'إحصائيات جوجل GA4 و GTM',
            href: '/admin/seo?tab=analytics',
          },
          {
            label: 'Meta Titles & Keywords',
            labelAr: 'عناوين الميتا والكلمات الدلالية',
            href: '/admin/seo?tab=meta',
          },
          {
            label: 'Social & Open Graph',
            labelAr: 'المشاركة والسوشيال ميديا',
            href: '/admin/seo?tab=social',
          },
          {
            label: 'Schema.org JSON-LD',
            labelAr: 'البيانات المنظمة Schema.org',
            href: '/admin/seo?tab=schema',
          },
          {
            label: 'Robots & Indexing',
            labelAr: 'الأرشفة وملف Robots.txt',
            href: '/admin/seo?tab=robots',
          },
        ],
      },
    ],
  },
  {
    groupName: 'System & Security',
    groupNameAr: 'النظام والأمان',
    accentDot: 'bg-rose-400',
    items: [
      {
        id: 'users',
        label: 'Staff & Roles',
        labelAr: 'المستخدمون والصلاحيات',
        href: '/admin/system/users',
        icon: ShieldCheck,
        iconBg: 'bg-orange-500/15 text-orange-400 border-orange-500/25 group-hover:bg-orange-500/25',
        allowedRoles: ['owner', 'admin'],
      },
      {
        id: 'audit-logs',
        label: 'Audit Trail Logs',
        labelAr: 'سجل النشاط الإداري',
        href: '/admin/system/audit-logs',
        icon: Lock,
        iconBg: 'bg-rose-500/15 text-rose-400 border-rose-500/25 group-hover:bg-rose-500/25',
        allowedRoles: ['owner', 'admin', 'viewer'],
      },
      {
        id: 'settings',
        label: 'Global Settings',
        labelAr: 'إعدادات المنصة والمفاتيح',
        href: '/admin/system/settings',
        icon: Settings,
        iconBg: 'bg-slate-500/15 text-slate-300 border-slate-500/25 group-hover:bg-slate-500/25',
        allowedRoles: ['owner', 'admin'],
        children: [
          {
            label: 'Company Profile & Info',
            labelAr: 'بيانات الشركة والملف التعريفي',
            href: '/admin/system/settings#general',
          },
          {
            label: 'Official Communications',
            labelAr: 'قنوات التواصل والمقر الإداري',
            href: '/admin/system/settings#contact',
          },
          {
            label: 'Favicon & Brand Assets',
            labelAr: 'أيقونة وهوية العلامة التجارية',
            href: '/admin/system/settings#branding',
          },
          {
            label: 'Public Maintenance Mode',
            labelAr: 'وضع الصيانة والتحكم العام',
            href: '/admin/system/settings#maintenance',
          },
          {
            label: 'Bank Accounts & Wire OTP',
            labelAr: 'حسابات التحويل البنكي ورمز OTP',
            href: '/admin/system/settings#banking',
          },
          {
            label: 'Integrations Secrets Hub',
            labelAr: 'مفاتيح الربط والـ APIs',
            href: '/admin/system/settings#secrets',
            badge: 'SECRETS',
            badgeAr: 'مفاتيح سرية',
            badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          },
          {
            label: 'Odoo ERP Integration',
            labelAr: 'الربط السحابي مع Odoo ERP',
            href: '/admin/system/settings#odoo',
          },
        ],
      },
      {
        id: 'emails',
        label: 'Email Templates',
        labelAr: 'قوالب البريد الإلكتروني',
        href: '/admin/system/emails',
        icon: Mail,
        iconBg: 'bg-[#C9A86A]/15 text-[#C9A86A] border-[#C9A86A]/25 group-hover:bg-[#C9A86A]/25',
        allowedRoles: ['owner', 'admin', 'editor'],
        children: [
          {
            label: 'Client Inquiry & RFP Receipts',
            labelAr: 'إشعارات الاستفسارات وتأكيد الاستلام',
            href: '/admin/system/emails?category=inquiry',
          },
          {
            label: 'Talent Acquisition & HR',
            labelAr: 'إشعارات التوظيف وبنك المواهب',
            href: '/admin/system/emails?category=career',
          },
          {
            label: 'Security & Access Control',
            labelAr: 'رسائل الأمان وإعادة تعيين كلمة المرور',
            href: '/admin/system/emails?category=security',
          },
          {
            label: 'Order Stage Notifications',
            labelAr: 'إشعارات مراحل الطلب والشحن',
            href: '/admin/system/emails?category=order',
          },
        ],
      },
      {
        id: 'health',
        label: 'System Health',
        labelAr: 'حالة الخوادم وقاعدة البيانات',
        href: '/admin/system/health',
        icon: Activity,
        iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25 group-hover:bg-emerald-500/25',
      },
    ],
  },
];

export default function AdminSidebar({
  userRole = 'admin',
  isMobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  // Full active URL string to check exact subcategory matches
  const currentFullPath = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;

  // Track client window.location.hash for smooth anchor highlighting
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentHash(window.location.hash);
      const handleHashChange = () => setCurrentHash(window.location.hash);
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  // Track accordion open state per item id
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // Auto-expand menus based on current URL
  useEffect(() => {
    const nextOpen: Record<string, boolean> = { ...openItems };
    NAV_GROUPS.forEach((group) => {
      group.items.forEach((item) => {
        const itemMatches = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
        if (itemMatches) {
          nextOpen[item.id] = true;
        }
      });
    });
    setOpenItems(nextOpen);
  }, [pathname, searchParams]);

  const toggleItem = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#08090C]/95 border-r rtl:border-r-0 rtl:border-l border-white/10 backdrop-blur-2xl">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Link 
          href="/admin" 
          onClick={onCloseMobile}
          className="flex items-center gap-3 group"
        >
          <div className="relative h-9 w-28 transition-transform group-hover:scale-105">
            <Image 
              src="/brand/wd-group-logo-white.png" 
              alt="WD Group" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          <div className="border-l rtl:border-l-0 rtl:border-r border-white/15 pl-3 rtl:pl-0 rtl:pr-3">
            <span className="text-[10px] font-mono text-blue-400 block tracking-widest uppercase">
              {isAr ? 'مجموعة دبليو دي للأعمال' : 'WD GROUP'}
            </span>
            <span className="text-[11px] font-bold text-white block -mt-0.5 whitespace-nowrap">
              {isAr ? 'لوحة التحكم والمشرف' : 'Admin Console'}
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
        {NAV_GROUPS.map((group) => {
          // Filter items by role
          const visibleItems = group.items.filter((item) => {
            if (!item.allowedRoles) return true;
            if (userRole === 'owner') return true;
            return item.allowedRoles.includes(userRole);
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={group.groupName} className="space-y-1.5">
              
              {/* Group Header */}
              <div className="px-3 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                <span className={`w-1.5 h-1.5 rounded-full ${group.accentDot}`} />
                <span>{isAr ? group.groupNameAr : group.groupName}</span>
              </div>

              {/* Items List */}
              {visibleItems.map((item) => {
                const Icon = item.icon;
                const isParentActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = !!openItems[item.id];

                return (
                  <div key={item.id} className="space-y-1">
                    
                    {/* Parent Tab Link & Toggle */}
                    <div
                      className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all group relative border ${
                        isParentActive
                          ? 'bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent border-blue-500/40 text-white shadow-sm'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5 border-transparent'
                      }`}
                    >
                      {/* Direct Navigation to Parent */}
                      <Link
                        href={item.href}
                        onClick={onCloseMobile}
                        className="flex items-center gap-2.5 min-w-0 flex-1 pr-1 rtl:pr-0 rtl:pl-1 cursor-pointer"
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                          isParentActive 
                            ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.5)]' 
                            : item.iconBg
                        }`}>
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                        </div>
                        <span className="truncate text-xs font-medium">{isAr ? item.labelAr : item.label}</span>
                      </Link>

                      {/* Right-Side Badges & Subcategory Expand/Collapse Arrow */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.badge && (
                          <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold border ${item.badgeColor || 'bg-blue-500/20 text-blue-300 border-blue-500/30'}`}>
                            {isAr ? (item.badgeAr || item.badge) : item.badge}
                          </span>
                        )}

                        {hasChildren && (
                          <button
                            onClick={(e) => toggleItem(item.id, e)}
                            className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            aria-label="Toggle Subcategories"
                          >
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isOpen ? 'rotate-180 text-blue-400' : 'text-zinc-500'
                              }`}
                            />
                          </button>
                        )}

                        {isParentActive && !hasChildren && (
                          <div className="w-1.5 h-3.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                        )}
                      </div>
                    </div>

                    {/* Subcategories Accordion List */}
                    <AnimatePresence initial={false}>
                      {hasChildren && isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mr-3.5 rtl:mr-0 rtl:ml-3.5 pr-2 rtl:pr-0 rtl:pl-2 border-r rtl:border-r-0 rtl:border-l border-white/10 space-y-0.5 pt-1 pb-1.5">
                            {item.children!.map((subItem) => {
                              // Check active state for subcategory
                              const isSubActive = (() => {
                                const hasSearch = !!searchParams?.toString();
                                const hasHash = !!currentHash;

                                if (subItem.href.includes('#')) {
                                  const [subPath, subHash] = subItem.href.split('#');
                                  if (pathname !== subPath) return false;
                                  if (hasHash) return currentHash === `#${subHash}`;
                                  // Default section when visiting settings without hash
                                  if (subPath === '/admin/system/settings' && subHash === 'general') return true;
                                  return false;
                                }

                                if (subItem.href.includes('?')) {
                                  const [subPath, subQuery] = subItem.href.split('?');
                                  if (pathname !== subPath) return false;
                                  if (hasSearch) return searchParams!.toString().includes(subQuery);

                                  // Default active tabs when visiting without query parameters
                                  if (subItem.href === '/admin/seo?tab=google') return true;
                                  if (subItem.href === '/admin/ecommerce?tab=overview') return true;
                                  if (subItem.href === '/admin/content/pages?tab=home') return true;
                                  if (subItem.href === '/admin/system/emails?category=inquiry') return true;
                                  return false;
                                }

                                return pathname === subItem.href && !hasSearch && !hasHash;
                              })();

                              return (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => {
                                    if (subItem.href.includes('#')) {
                                      const [, hash] = subItem.href.split('#');
                                      setCurrentHash(`#${hash}`);
                                    }
                                    onCloseMobile();
                                  }}
                                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] transition-all group/sub ${
                                    isSubActive
                                      ? 'text-[#C9A86A] bg-[#C9A86A]/10 font-bold border border-[#C9A86A]/25'
                                      : 'text-zinc-400 hover:text-white hover:bg-white/5 font-normal'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0 truncate">
                                    <span className={`w-1 h-1 rounded-full shrink-0 transition-all ${
                                      isSubActive 
                                        ? 'bg-[#C9A86A] shadow-[0_0_6px_rgba(201,168,106,0.8)] scale-125' 
                                        : 'bg-zinc-600 group-hover/sub:bg-zinc-400'
                                    }`} />
                                    <span className="truncate">{isAr ? subItem.labelAr : subItem.label}</span>
                                  </div>

                                  {subItem.badge && (
                                    <span className={`px-1.5 py-0.2 rounded text-[8px] font-mono font-bold border shrink-0 ${
                                      subItem.badgeColor || 'bg-[#C9A86A]/20 text-[#C9A86A] border-[#C9A86A]/30'
                                    }`}>
                                      {isAr ? (subItem.badgeAr || subItem.badge) : subItem.badge}
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer Quick Links */}
      <div className="p-3 border-t border-white/10 bg-black/40 space-y-1">
        <Link
          href="/furniture"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#C9A86A] hover:bg-[#C9A86A]/10 transition-colors border border-[#C9A86A]/20"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{isAr ? 'معاينة متجر الأثاث' : 'Furniture Showroom'}</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{isAr ? 'معاينة الموقع العام' : 'Public Website'}</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
