'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
  Globe, 
  Layers, 
  MessageSquare,
  Sparkles,
  ExternalLink,
  Lock
} from 'lucide-react';
import type { AdminRole } from '@/lib/admin/types';

interface AdminSidebarProps {
  userRole?: AdminRole;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  label: string;
  labelAr: string;
  href: string;
  icon: any;
  iconBg: string;
  allowedRoles?: AdminRole[];
}

interface NavGroup {
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
        label: 'Pages & Sections',
        labelAr: 'أقسام الصفحات',
        href: '/admin/content/pages',
        icon: FileText,
        iconBg: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/25 group-hover:bg-indigo-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
      {
        label: 'Corporate Metrics',
        labelAr: 'الإحصائيات الرئيسية',
        href: '/admin/content/metrics',
        icon: Activity,
        iconBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25 group-hover:bg-cyan-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
      {
        label: 'Leadership & Quotes',
        labelAr: 'القيادة والكلمة',
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
        label: 'SwissBlue Hospitality',
        labelAr: 'قطاع الضيافة',
        href: '/admin/sectors/hospitality',
        icon: Building2,
        iconBg: 'bg-sky-500/15 text-sky-400 border-sky-500/25 group-hover:bg-sky-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
      {
        label: 'GreenWood Manufacturing',
        labelAr: 'التصنيع والأثاث',
        href: '/admin/sectors/manufacturing',
        icon: Factory,
        iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25 group-hover:bg-emerald-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
      {
        label: 'Contracting & Fit-Out',
        labelAr: 'المقاولات والتشطيب',
        href: '/admin/sectors/contracting',
        icon: HardHat,
        iconBg: 'bg-amber-500/15 text-amber-400 border-amber-500/25 group-hover:bg-amber-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
    ],
  },
  {
    groupName: 'Operations & CRM',
    groupNameAr: 'العمليات والعملاء',
    accentDot: 'bg-emerald-400',
    items: [
      {
        label: 'Inquiries & RFPs',
        labelAr: 'الاستفسارات والمناقصات',
        href: '/admin/crm/inquiries',
        icon: MessageSquare,
        iconBg: 'bg-blue-500/15 text-blue-400 border-blue-500/25 group-hover:bg-blue-500/25',
        allowedRoles: ['owner', 'admin', 'crm'],
      },
      {
        label: 'Job Openings',
        labelAr: 'الشواغر الوظيفية',
        href: '/admin/hr/jobs',
        icon: Briefcase,
        iconBg: 'bg-teal-500/15 text-teal-400 border-teal-500/25 group-hover:bg-teal-500/25',
        allowedRoles: ['owner', 'admin', 'hr'],
      },
      {
        label: 'Talent Pool & ATS',
        labelAr: 'بنك الكفاءات والـ CVs',
        href: '/admin/hr/applications',
        icon: Users,
        iconBg: 'bg-rose-500/15 text-rose-400 border-rose-500/25 group-hover:bg-rose-500/25',
        allowedRoles: ['owner', 'admin', 'hr'],
      },
      {
        label: 'Media Library',
        labelAr: 'مكتبة الوسائط',
        href: '/admin/media',
        icon: ImageIcon,
        iconBg: 'bg-pink-500/15 text-pink-400 border-pink-500/25 group-hover:bg-pink-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
      {
        label: 'SEO & Social Graph',
        labelAr: 'محركات البحث وميتاداتا',
        href: '/admin/seo',
        icon: Search,
        iconBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25 group-hover:bg-cyan-500/25',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
    ],
  },
  {
    groupName: 'System & Security',
    groupNameAr: 'النظام والأمان',
    accentDot: 'bg-rose-400',
    items: [
      {
        label: 'Staff & Roles',
        labelAr: 'المستخدمون والصلاحيات',
        href: '/admin/system/users',
        icon: ShieldCheck,
        iconBg: 'bg-orange-500/15 text-orange-400 border-orange-500/25 group-hover:bg-orange-500/25',
        allowedRoles: ['owner', 'admin'],
      },
      {
        label: 'Audit Trail Logs',
        labelAr: 'سجل النشاط الإداري',
        href: '/admin/system/audit-logs',
        icon: Lock,
        iconBg: 'bg-rose-500/15 text-rose-400 border-rose-500/25 group-hover:bg-rose-500/25',
        allowedRoles: ['owner', 'admin', 'viewer'],
      },
      {
        label: 'Global Settings',
        labelAr: 'إعدادات المنصة',
        href: '/admin/system/settings',
        icon: Settings,
        iconBg: 'bg-slate-500/15 text-slate-300 border-slate-500/25 group-hover:bg-slate-500/25',
        allowedRoles: ['owner', 'admin'],
      },
      {
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
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

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
              {isAr ? 'لوحة التحكم' : 'Admin Console'}
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
              <div className="px-3 flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                <span className={`w-1.5 h-1.5 rounded-full ${group.accentDot}`} />
                <span>{isAr ? group.groupNameAr : group.groupName}</span>
              </div>

              {visibleItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all group relative ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600/25 via-blue-500/10 to-transparent border border-blue-500/40 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                        isActive 
                          ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.5)]' 
                          : item.iconBg
                      }`}>
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                      </div>
                      <span className="truncate">{isAr ? item.labelAr : item.label}</span>
                    </div>

                    {isActive && (
                      <div className="w-1.5 h-4 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer Quick Links */}
      <div className="p-3 border-t border-white/10 bg-black/40 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{isAr ? 'معاينة الموقع' : 'Public Website'}</span>
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
