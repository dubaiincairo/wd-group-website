'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import LeadDetailDrawer from '@/components/admin/LeadDetailDrawer';
import { useToast } from '@/components/admin/ToastProvider';
import { useLanguage } from '@/context/LanguageContext';
import type { CRMInquiry, CRMInquiryStatus } from '@/lib/admin/types';

export default function CRMInquiriesPage() {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [inquiries, setInquiries] = useState<CRMInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const [selectedInquiry, setSelectedInquiry] = useState<CRMInquiry | null>(null);

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: pageSize.toString(),
        offset: (page * pageSize).toString(),
      });
      if (sectorFilter !== 'all') params.set('sector', sectorFilter);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchTerm.trim()) params.set('search', searchTerm.trim());

      const res = await fetch(`/api/admin/crm/inquiries?${params.toString()}`);
      if (res.ok) {
        const d = await res.json();
        setInquiries(d.inquiries || []);
        setTotalCount(d.total || 0);
      }
    } catch (e) {
      console.error('Inquiries fetch error:', e);
      showToast(isAr ? 'فشل تحميل طلبات التواصل والاستفسارات' : 'Failed to load inquiries', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, sectorFilter, statusFilter, searchTerm, showToast, isAr]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleUpdateStatus = async (id: string, newStatus: CRMInquiryStatus) => {
    try {
      const res = await fetch(`/api/admin/crm/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showToast(isAr ? 'تم تحديث حالة الطلب بنجاح' : 'Lead status updated successfully', 'success');
        setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq)));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (e) {
      showToast(isAr ? 'فشل تحديث حالة الطلب' : 'Failed to update status', 'error');
    }
  };

  const handleAddNote = async (id: string, noteText: string) => {
    try {
      const existing = selectedInquiry?.internal_notes || [];
      const updatedNotes = [
        {
          id: `note_${Date.now()}`,
          text: noteText,
          author: 'Admin',
          authorEmail: 'ceo@wdgroup.online',
          createdAt: new Date().toISOString(),
        },
        ...existing,
      ];

      const res = await fetch(`/api/admin/crm/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internal_notes: updatedNotes }),
      });

      if (res.ok) {
        showToast(isAr ? 'تم حفظ الملاحظة الداخلية' : 'Internal note saved', 'success');
        setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, internal_notes: updatedNotes } : inq)));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => prev ? { ...prev, internal_notes: updatedNotes } : null);
        }
      }
    } catch (e) {
      showToast(isAr ? 'فشل إضافة الملاحظة' : 'Failed to add note', 'error');
    }
  };

  const handleExportCsv = () => {
    const params = new URLSearchParams();
    if (sectorFilter !== 'all') params.set('sector', sectorFilter);
    if (statusFilter !== 'all') params.set('status', statusFilter);
    window.open(`/api/admin/crm/export?${params.toString()}`, '_blank');
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isAr ? 'إدارة العملاء وطلبات الشراكة' : 'LEADS & CRM OPERATIONS'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'الاستفسارات والطلبات التجارية' : 'Inquiries & Sector RFPs'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr ? 'متابعة وإسناد وإدارة العروض التجارية واستفسارات العملاء والشركاء.' : 'Track, assign, and manage commercial proposals and customer submissions.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchInquiries}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title={isAr ? 'تحديث القائمة' : 'Refresh list'}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'تصدير كملف CSV' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* Search & Filters Control Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 bg-[#0F1117]/90 border border-white/10 rounded-2xl p-4">
        
        {/* Search */}
        <div className="sm:col-span-2 relative">
          <Search className={`w-4 h-4 text-zinc-500 absolute ${isAr ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
            placeholder={isAr ? 'البحث بالاسم، البريد، الشركة أو الكلمات الدلالية…' : 'Search by name, email, company, or keywords…'}
            className={`w-full bg-[#08090C] border border-white/15 focus:border-blue-500 rounded-xl ${isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none`}
          />
        </div>

        {/* Sector Filter */}
        <div className="relative">
          <select
            value={sectorFilter}
            onChange={(e) => {
              setSectorFilter(e.target.value);
              setPage(0);
            }}
            className={`w-full appearance-none bg-[#08090C] border border-white/15 text-white text-xs font-semibold rounded-xl ${isAr ? 'pr-3.5 pl-9' : 'pl-3.5 pr-9'} py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer`}
          >
            <option value="all">{isAr ? 'جميع القطاعات والتصنيفات' : 'All Sectors & Types'}</option>
            <option value="general">{isAr ? 'استفسار عام' : 'General Inquiry'}</option>
            <option value="hospitality">{isAr ? 'ضيافة سويس بلو' : 'SwissBlue Hospitality'}</option>
            <option value="manufacturing">{isAr ? 'تصنيع جرين وود' : 'GreenWood Manufacturing'}</option>
            <option value="contracting">{isAr ? 'المقاولات والتجهيز الداخلي' : 'Contracting & Fit-Out'}</option>
            <option value="partnership">{isAr ? 'شراكة استراتيجية' : 'Strategic Partnership'}</option>
            <option value="tender">{isAr ? 'مناقصة / كراسة شروط' : 'Tender / RFP'}</option>
          </select>
          <ChevronDown className={`w-4 h-4 text-zinc-400 pointer-events-none absolute ${isAr ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2`} />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
            className={`w-full appearance-none bg-[#08090C] border border-white/15 text-white text-xs font-semibold rounded-xl ${isAr ? 'pr-3.5 pl-9' : 'pl-3.5 pr-9'} py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer`}
          >
            <option value="all">{isAr ? 'جميع مراحل المعالجة' : 'All Pipeline Stages'}</option>
            <option value="new">{isAr ? 'طلبات جديدة' : 'New Leads'}</option>
            <option value="contacted">{isAr ? 'تم التواصل' : 'Contacted'}</option>
            <option value="in_review">{isAr ? 'قيد المراجعة / إعداد العرض' : 'In Review / Proposal'}</option>
            <option value="won">{isAr ? 'صفقة مؤكدة' : 'Won / Closed Deal'}</option>
            <option value="closed">{isAr ? 'مؤرشف' : 'Archived'}</option>
          </select>
          <ChevronDown className={`w-4 h-4 text-zinc-400 pointer-events-none absolute ${isAr ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2`} />
        </div>

      </div>

      {/* Inquiries Table */}
      <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-black/40 border-b border-white/10 text-zinc-400 font-mono">
              <tr>
                <th className="py-4 px-6 font-semibold">{isAr ? 'جهة الاتصال / الشركة' : 'Contact / Company'}</th>
                <th className="py-4 px-4 font-semibold">{isAr ? 'القطاع والموضوع' : 'Sector & Subject'}</th>
                <th className="py-4 px-4 font-semibold">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="py-4 px-4 font-semibold">{isAr ? 'الملاحظات' : 'Notes'}</th>
                <th className="py-4 px-4 font-semibold">{isAr ? 'التاريخ' : 'Date'}</th>
                <th className="py-4 px-6 text-end font-semibold">{isAr ? 'الإجراء' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500 font-mono">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-500 mb-2" />
                    <span>{isAr ? 'جارٍ تحميل البيانات…' : 'Loading submissions…'}</span>
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    {isAr ? 'لا توجد استفسارات تطابق معايير البحث الحالية.' : 'No inquiries matching the current criteria.'}
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className="hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                        {inq.name}
                      </div>
                      <div className="text-[11px] text-zinc-400" dir="ltr">{inq.email}</div>
                      {inq.company && (
                        <div className="text-[10px] text-blue-400 font-medium">{inq.company}</div>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <div className="capitalize text-zinc-200 font-semibold">{inq.sector || (isAr ? 'عام' : 'General')}</div>
                      <div className="text-[11px] text-zinc-400 truncate max-w-[200px]">
                        {inq.subject || inq.message}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap shrink-0 inline-flex items-center ${
                        inq.status === 'new'
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                          : inq.status === 'contacted'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : inq.status === 'in_review'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : inq.status === 'won'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-zinc-500/20 text-zinc-400 border-zinc-500/40'
                      }`}>
                        {isAr ? (
                          inq.status === 'new' ? 'جديد' :
                          inq.status === 'contacted' ? 'تم التواصل' :
                          inq.status === 'in_review' ? 'قيد المراجعة' :
                          inq.status === 'won' ? 'مؤكد' : 'مؤرشف'
                        ) : (inq.status || 'new').toUpperCase()}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-zinc-400 font-mono text-[11px]">
                      {inq.internal_notes?.length || 0}
                    </td>

                    <td className="py-4 px-4 text-zinc-500 font-mono text-[11px]" dir="ltr">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-6 text-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInquiry(inq);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 group-hover:bg-blue-600 group-hover:text-white text-zinc-300 text-xs font-bold transition-all cursor-pointer"
                      >
                        {isAr ? 'معاينة' : 'Inspect'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 bg-black/30">
            <div>
              {isAr 
                ? `عرض ${page * pageSize + 1}–${Math.min((page + 1) * pageSize, totalCount)} من إجمالي ${totalCount} طلبات`
                : `Showing ${page * pageSize + 1}–${Math.min((page + 1) * pageSize, totalCount)} of ${totalCount} leads`}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              </button>
              <span className="font-mono">{isAr ? `صفحة ${page + 1} من ${totalPages}` : `Page ${page + 1} of ${totalPages}`}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}
      </div>

      <LeadDetailDrawer
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onUpdateStatus={handleUpdateStatus}
        onAddNote={handleAddNote}
      />

    </div>
  );
}
