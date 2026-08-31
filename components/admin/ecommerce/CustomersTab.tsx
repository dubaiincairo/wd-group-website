'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { 
  Users, 
  Search, 
  Filter, 
  Crown, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShoppingBag, 
  Calendar, 
  Sparkles, 
  X, 
  Tag,
  ExternalLink
} from 'lucide-react';

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  segment: 'vip' | 'b2b' | 'returning' | 'new';
  totalSpend: number;
  ordersCount: number;
  lastOrderDate: string;
  companyName?: string;
  tags: string[];
  notes: string;
}

const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust-01',
    name: 'سلطان بن عبدالعزيز آل سعود',
    email: 'sultan.saud@al-saud.sa',
    phone: '+966 50 572 5070',
    city: 'Riyadh',
    segment: 'vip',
    totalSpend: 184500,
    ordersCount: 3,
    lastOrderDate: '28/08/2026',
    tags: ['Royal Palace', 'Custom Bouclé', 'Priority White-Glove'],
    notes: 'يفضل التواصل الصباحي والتنسيق المسبق مع إدارة القصور الملكية بالرياض.',
  },
  {
    id: 'cust-02',
    name: 'مجموعة فنادق سويس بلو (إدارة المشتريات)',
    email: 'procurement@swissbluehotels.com',
    phone: '+966 12 600 4400',
    city: 'Jeddah',
    segment: 'b2b',
    totalSpend: 485000,
    ordersCount: 4,
    lastOrderDate: '27/08/2026',
    companyName: 'SwissBlue Hospitality Co.',
    tags: ['Hotel FF&E', 'Presidential Suites', 'Commercial PO'],
    notes: 'عقد توريد معتمد لـ 18 جناحاً فندقياً بجدة مع شروط دفع بنكية 30 يوماً.',
  },
  {
    id: 'cust-03',
    name: 'شركة طويق القابضة للاستثمار',
    email: 'projects@tuwaiq-holding.sa',
    phone: '+966 11 488 9900',
    city: 'Riyadh',
    segment: 'b2b',
    totalSpend: 240000,
    ordersCount: 2,
    lastOrderDate: '24/08/2026',
    companyName: 'Tuwaiq Holding Co.',
    tags: ['Corporate HQ', 'Boardroom Suites'],
    notes: 'تأثيث قاعات مجلس الإدارة بالبرج الرئيسي بطريق الملك فهد.',
  },
  {
    id: 'cust-04',
    name: 'د. خالد التميمي',
    email: 'dr.khaled@tamimi-clinic.com',
    phone: '+966 55 443 2211',
    city: 'Khobar',
    segment: 'returning',
    totalSpend: 42600,
    ordersCount: 2,
    lastOrderDate: '26/08/2026',
    tags: ['Villa Salon', 'Tabby Customer'],
    notes: 'قام بشراء طاولة الروضة وطاولة طعام بعد تجربة صالة العرض.',
  },
  {
    id: 'cust-05',
    name: 'الأستاذة نورة الشمري',
    email: 'noura.shammari@gmail.com',
    phone: '+966 56 112 3344',
    city: 'Riyadh',
    segment: 'new',
    totalSpend: 24472,
    ordersCount: 1,
    lastOrderDate: '20/08/2026',
    tags: ['Dining Suite', 'Residential'],
    notes: 'عميلة جديدة من الرياض — حي الملقا.',
  },
];

export default function CustomersTab() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  const [customers, setCustomers] = useState<CustomerProfile[]>(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [activeProfile, setActiveProfile] = useState<CustomerProfile | null>(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeg = selectedSegment === 'all' || c.segment === selectedSegment;
      return matchesSearch && matchesSeg;
    });
  }, [customers, searchQuery, selectedSegment]);

  const getSegmentBadge = (seg: CustomerProfile['segment']) => {
    switch (seg) {
      case 'vip':
        return {
          label: isAr ? 'عميل ملكي / VIP' : 'VIP Royal / Elite',
          bg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          icon: Crown,
        };
      case 'b2b':
        return {
          label: isAr ? 'فندقي وتجاري B2B' : 'Hospitality B2B',
          bg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
          icon: Building2,
        };
      case 'returning':
        return {
          label: isAr ? 'عميل متكرر' : 'Returning Client',
          bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          icon: Sparkles,
        };
      default:
        return {
          label: isAr ? 'عميل جديد' : 'New Buyer',
          bg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
          icon: Users,
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Segment Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-[#C9A86A]" />
            <span>{isAr ? 'دليل وسجلات عملاء الأثاث الفاخر (CRM)' : 'Luxury Furniture Customer Directory & CRM'}</span>
          </h3>
          <p className="text-xs text-zinc-400">
            {isAr ? 'تصنيف شرائح العملاء، القيمة التراكمية، وسجل التواصل المباشر.' : 'Customer segments, lifetime valuation, and direct WhatsApp CRM.'}
          </p>
        </div>
      </div>

      {/* 2. Search & Segment Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'بحث باسم العميل، الهاتف، الإيميل، المدينة...' : 'Search by name, phone, email, city...'}
            className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#C9A86A]"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 rtl:left-auto rtl:right-3 top-3" />
        </div>

        <select
          value={selectedSegment}
          onChange={(e) => setSelectedSegment(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
        >
          <option value="all">{isAr ? 'كافة شرائح العملاء' : 'All Customer Segments'}</option>
          <option value="vip">{isAr ? 'عملاء النخبة والقصور (VIP)' : 'VIP Royal / Elite'}</option>
          <option value="b2b">{isAr ? 'المشاريع والفنادق (B2B)' : 'Hospitality & Commercial B2B'}</option>
          <option value="returning">{isAr ? 'عملاء متكررون' : 'Returning Residential'}</option>
          <option value="new">{isAr ? 'عملاء جدد' : 'New Buyers'}</option>
        </select>
      </div>

      {/* 3. Customers Table */}
      <div className="glass-card rounded-2xl border border-white/10 bg-[#0F1117]/90 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono uppercase text-[10px]">
                <th className="py-3.5 px-4">{isAr ? 'اسم العميل / المنشأة' : 'Client / Company'}</th>
                <th className="py-3.5 px-4">{isAr ? 'الشريحة' : 'Segment'}</th>
                <th className="py-3.5 px-4">{isAr ? 'معلومات الاتصال' : 'Contact Details'}</th>
                <th className="py-3.5 px-4">{isAr ? 'المدينة' : 'City'}</th>
                <th className="py-3.5 px-4">{isAr ? 'عدد الطلبات' : 'Orders'}</th>
                <th className="py-3.5 px-4">{isAr ? 'إجمالي الإنفاق (ر.س)' : 'Lifetime Spend (SAR)'}</th>
                <th className="py-3.5 px-4">{isAr ? 'آخر طلب' : 'Last Order'}</th>
                <th className="py-3.5 px-4 text-center">{isAr ? 'الملف' : 'Profile'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map((cust) => {
                const badge = getSegmentBadge(cust.segment);
                const Icon = badge.icon;

                return (
                  <tr
                    key={cust.id}
                    onClick={() => setActiveProfile(cust)}
                    className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <span className="text-white font-bold block group-hover:text-[#C9A86A] transition-colors">
                        {cust.name}
                      </span>
                      {cust.companyName && (
                        <span className="text-[10px] text-zinc-400 block font-mono">{cust.companyName}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border inline-flex items-center gap-1.5 ${badge.bg}`}>
                        <Icon className="w-3 h-3" />
                        <span>{badge.label}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <span className="text-emerald-400 block">{cust.phone}</span>
                      <span className="text-zinc-500 text-[10px] block">{cust.email}</span>
                    </td>

                    <td className="py-3.5 px-4 text-zinc-300 font-mono flex items-center gap-1 mt-3">
                      <MapPin className="w-3 h-3 text-[#C9A86A]" />
                      <span>{cust.city}</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      {cust.ordersCount}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-extrabold text-[#C9A86A]">
                      {cust.totalSpend.toLocaleString('en-US')} SAR
                    </td>

                    <td className="py-3.5 px-4 font-mono text-zinc-400 text-[11px]">
                      {cust.lastOrderDate}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProfile(cust);
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#C9A86A] text-zinc-400 hover:text-[#08090C] transition-colors"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. CUSTOMER PROFILE SLIDE-OVER DRAWER */}
      {activeProfile && (
        <div className="fixed inset-0 top-[65px] z-40 overflow-hidden">
          <div
            onClick={() => setActiveProfile(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] cursor-pointer"
          />

          <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10 pointer-events-none">
            <div className="w-screen max-w-lg h-full bg-[#0F1117] border-l rtl:border-l-0 rtl:border-r border-white/10 text-white shadow-2xl flex flex-col justify-between p-6 space-y-6 pointer-events-auto">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">{activeProfile.name}</h3>
                  <span className="text-xs text-[#C9A86A] font-mono">{activeProfile.companyName || 'Residential Client'}</span>
                </div>
                <button onClick={() => setActiveProfile(null)} className="p-2 text-zinc-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto space-y-5 text-xs">
                
                {/* Financial Summary */}
                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#141721] font-mono">
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase block">
                      {isAr ? 'إجمالي الإنفاق التراكمي' : 'Lifetime Spend'}
                    </span>
                    <span className="text-lg font-bold text-[#E3C58A]">{activeProfile.totalSpend.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase block">
                      {isAr ? 'إجمالي الطلبات' : 'Total Orders'}
                    </span>
                    <span className="text-lg font-bold text-white">
                      {activeProfile.ordersCount} {isAr ? 'طلبات مكتملة' : 'Completed'}
                    </span>
                  </div>
                </div>

                {/* Contact & Location */}
                <div className="p-4 rounded-2xl bg-[#141721] space-y-2">
                  <div className="flex items-center gap-2 text-zinc-300 font-mono">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>{activeProfile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300 font-mono">
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span>{activeProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300 font-mono">
                    <MapPin className="w-4 h-4 text-[#C9A86A]" />
                    <span>{activeProfile.city}, {isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <span className="text-zinc-400 font-mono uppercase text-[10px] block">
                    {isAr ? 'الوسوم والتصنيفات' : 'Client Tags'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProfile.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-1">
                  <span className="text-zinc-500 text-[10px] font-mono uppercase block">
                    {isAr ? 'ملاحظات مسؤول علاقات العملاء' : 'CRM Operator Notes'}
                  </span>
                  <p className="text-zinc-300 leading-relaxed" dir={isAr ? 'rtl' : 'ltr'}>{activeProfile.notes}</p>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/${activeProfile.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `مرحباً ${activeProfile.name}، يسعدنا في مجموعة دبليو دي للأثاث الفاخر خدمتكم.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isAr ? 'مراسلة العميل عبر واتساب' : 'Direct WhatsApp Chat'}</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
