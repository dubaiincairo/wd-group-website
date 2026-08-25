'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
  badge?: string;
  badgeColor?: string;
  allowedRoles?: AdminRole[];
}

interface NavGroup {
  groupName: string;
  groupNameAr: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupName: 'Overview',
    groupNameAr: 'نظرة عامة',
    items: [
      {
        label: 'Dashboard',
        labelAr: 'لوحة القيادة',
        href: '/admin',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    groupName: 'Content & Pages',
    groupNameAr: 'المحتوى والصفحات',
    items: [
      {
        label: 'Pages & Sections',
        labelAr: 'أقسام الصفحات',
        href: '/admin/content/pages',
        icon: FileText,
        allowedRoles: ['owner', 'admin', 'editor'],
      },
      {
        label: 'Corporate Metrics',
        labelAr: 'الإحصائيات الرئيسية',
        href: '/admin/content/metrics',
        icon: Activity,
        allowedRoles: ['owner', 'admin', 'editor'],
      },
      {
        label: 'Leadership & Quotes',
        labelAr: 'القيادة والكلمة',
        href: '/admin/content/leadership',
        icon: Sparkles,
        allowedRoles: ['owner', 'admin', 'editor'],
      },
    ],
  },
  {
    groupName: 'Strategic Sectors',
    groupNameAr: 'قطاعات الأعمال',
    items: [
      {
        label: 'SwissBlue Hospitality',
        labelAr: 'قطاع الضيافة',
        href: '/admin/sectors/hospitality',
        icon: Building2,
        badge: '6 Properties',
        badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
      {
        label: 'GreenWood Manufacturing',
        labelAr: 'التصنيع والأثاث',
        href: '/admin/sectors/manufacturing',
        icon: Factory,
        badge: '3 Factories',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
      {
        label: 'Contracting & Fit-Out',
        labelAr: 'المقاولات والتشطيب',
        href: '/admin/sectors/contracting',
        icon: HardHat,
        badge: 'Turnkey',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        allowedRoles: ['owner', 'admin', 'editor'],
      },
    ],
  },
  {
    groupName: 'Operations & CRM',
    groupNameAr: 'العمليات والعملاء',
    items: [
      {
        label: 'Inquiries & RFPs',
        labelAr: 'الاستفسارات والمناقصات',
        href: '/admin/crm/inquiries',
        icon: MessageSquare,
        allowedRoles: ['owner', 'admin', 'crm'],
      },
      {
        label: 'Job Openings',
        labelAr: 'الشواغر الوظيفية',
        href: '/admin/hr/jobs',
        icon: Briefcase,
        allowedRoles: ['owner', 'admin', 'hr'],
      },
      {
        label: 'Talent Pool & ATS',
        labelAr: 'بنك الكفاءات والـ CVs',
        href: '/admin/hr/applications',
        icon: Users,
        allowedRoles: ['owner', 'admin', 'hr'],
      },
      {
        label: 'Media Library',
        labelAr: 'مكتبة الوسائط',
        href: '/admin/media',
        icon: ImageIcon,
        allowedRoles: ['owner', 'admin', 'editor'],
      },
      {
        label: 'SEO & Social Graph',
        labelAr: 'محركات البحث وميتاداتا',
        href: '/admin/seo',
        icon: Search,
        allowedRoles: ['owner', 'admin', 'editor'],
      },
    ],
  },
  {
    groupName: 'System & Security',
    groupNameAr: 'النظام والأمان',
    items: [
      {
        label: 'Staff & Roles',
        labelAr: 'المستخدمون والصلاحيات',
        href: '/admin/system/users',
        icon: ShieldCheck,
        allowedRoles: ['owner', 'admin'],
      },
      {
        label: 'Audit Trail Logs',
        labelAr: 'سجل النشاط الإداري',
        href: '/admin/system/audit-logs',
        icon: Lock,
        allowedRoles: ['owner', 'admin', 'viewer'],
      },
      {
        label: 'Global Settings',
        labelAr: 'إعدادات المنصة',
        href: '/admin/system/settings',
        icon: Settings,
        allowedRoles: ['owner', 'admin'],
      },
      {
        label: 'System Health',
        labelAr: 'حالة الخوادم وقاعدة البيانات',
        href: '/admin/system/health',
        icon: Activity,
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

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#08090C] border-r rtl:border-r-0 rtl:border-l border-white/10 select-none">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3.5 group">
          <div className="relative h-9 w-28 shrink-0 transition-transform group-hover:scale-105">
            <Image 
              src="/brand/wd-group-logo-white.png" 
              alt="WD Group" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          <div className="border-l border-white/10 pl-2.5 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-2.5">
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-blue-400 block">
              WD GROUP
            </span>
            <span className="text-[11px] font-bold text-white block -mt-0.5 whitespace-nowrap">
              Admin Console
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
            <div key={group.groupName} className="space-y-1">
              <div className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                {group.groupName}
              </div>

              {visibleItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-blue-600/15 border border-blue-500/40 text-blue-400 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-blue-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 inline-flex items-center ${item.badgeColor || 'bg-white/10 text-zinc-300 border-white/10'}`}>
                        {item.badge}
                      </span>
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
            <span>Public Website</span>
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
