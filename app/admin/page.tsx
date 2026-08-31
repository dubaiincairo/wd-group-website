'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Briefcase, 
  Users, 
  Activity, 
  ArrowRight, 
  Building2, 
  Factory, 
  HardHat, 
  Clock, 
  Plus, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  FileText,
  ShoppingCart
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import LeadDetailDrawer from '@/components/admin/LeadDetailDrawer';
import CandidateDrawer from '@/components/admin/CandidateDrawer';
import { useToast } from '@/components/admin/ToastProvider';
import { useLanguage } from '@/context/LanguageContext';
import type { CRMInquiry, JobApplicationRecord, AuditLogEntry, CRMInquiryStatus, JobApplicationStatus } from '@/lib/admin/types';

export default function AdminDashboardPage() {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<CRMInquiry[]>([]);
  const [applications, setApplications] = useState<JobApplicationRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [jobCount, setJobCount] = useState(0);

  // Active drawer states
  const [selectedInquiry, setSelectedInquiry] = useState<CRMInquiry | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<JobApplicationRecord | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [inqRes, appRes, jobsRes, auditRes] = await Promise.all([
        fetch('/api/admin/crm/inquiries?limit=6'),
        fetch('/api/admin/hr/applications?limit=6'),
        fetch('/api/admin/hr/jobs'),
        fetch('/api/admin/audit-logs?limit=8'),
      ]);

      if (inqRes.ok) {
        const d = await inqRes.json();
        setInquiries(d.inquiries || []);
      }
      if (appRes.ok) {
        const d = await appRes.json();
        setApplications(d.applications || []);
      }
      if (jobsRes.ok) {
        const d = await jobsRes.json();
        setJobCount(d.jobs?.length || 0);
      }
      if (auditRes.ok) {
        const d = await auditRes.json();
        setAuditLogs(d.logs || []);
      }
    } catch (err) {
      console.error('Dashboard data load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleUpdateInquiryStatus = async (id: string, newStatus: CRMInquiryStatus) => {
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
      showToast(isAr ? 'فشل تحديث الحالة' : 'Failed to update status', 'error');
    }
  };

  const handleAddInquiryNote = async (id: string, noteText: string) => {
    try {
      const existing = selectedInquiry?.internal_notes || [];
      const updatedNotes = [
        {
          id: `note_${Date.now()}`,
          text: noteText,
          author: 'Operations Admin',
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
        showToast(isAr ? 'تمت إضافة الملاحظة بنجاح' : 'Note added successfully', 'success');
        setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, internal_notes: updatedNotes } : inq)));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => prev ? { ...prev, internal_notes: updatedNotes } : null);
        }
      }
    } catch (e) {
      showToast(isAr ? 'فشل إضافة الملاحظة' : 'Failed to add note', 'error');
    }
  };

  const handleUpdateCandidateStatus = async (id: string, newStatus: JobApplicationStatus) => {
    try {
      const res = await fetch(`/api/admin/hr/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showToast(isAr ? 'تم تحديث مرحلة المرشح' : 'Candidate stage updated', 'success');
        setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)));
        if (selectedCandidate?.id === id) {
          setSelectedCandidate((prev) => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (e) {
      showToast(isAr ? 'فشل التحديث' : 'Failed to update stage', 'error');
    }
  };

  const handleUpdateCandidateRating = async (id: string, rating: number) => {
    try {
      const res = await fetch(`/api/admin/hr/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating }),
      });
      if (res.ok) {
        showToast(isAr ? `تم تحديد التقييم بـ ${rating} نجوم` : `Rating set to ${rating} stars`, 'success');
        setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, rating } : app)));
        if (selectedCandidate?.id === id) {
          setSelectedCandidate((prev) => prev ? { ...prev, rating } : null);
        }
      }
    } catch (e) {
      showToast(isAr ? 'فشل التقييم' : 'Failed to update rating', 'error');
    }
  };

  const handleAddCandidateNote = async (id: string, noteText: string) => {
    try {
      const existing = selectedCandidate?.internal_notes || [];
      const updatedNotes = [
        {
          id: `note_${Date.now()}`,
          text: noteText,
          author: 'HR Recruiter',
          authorEmail: 'ceo@wdgroup.online',
          createdAt: new Date().toISOString(),
        },
        ...existing,
      ];

      const res = await fetch(`/api/admin/hr/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internal_notes: updatedNotes }),
      });

      if (res.ok) {
        showToast(isAr ? 'تم حفظ ملاحظة الموارد البشرية' : 'HR note saved', 'success');
        setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, internal_notes: updatedNotes } : app)));
        if (selectedCandidate?.id === id) {
          setSelectedCandidate((prev) => prev ? { ...prev, internal_notes: updatedNotes } : null);
        }
      }
    } catch (e) {
      showToast(isAr ? 'فشل إضافة الملاحظة' : 'Failed to add note', 'error');
    }
  };

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;
  const newApplicationsCount = applications.filter((a) => a.status === 'new').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Page Header & Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAr ? 'مركز العمليات التنفيذي' : 'EXECUTIVE COMMAND CENTER'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'لوحة القيادة والمؤشرات' : 'Dashboard Overview'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr ? 'إدارة فورية لعمليات الضيافة والتصنيع والمقاولات في مجموعة دبليو دي للأعمال' : 'Real-time management for WD Group hospitality, manufacturing, and contracting operations.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/crm/inquiries"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-glow-blue"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isAr ? 'إدارة الطلبات' : 'Manage Leads'}</span>
          </Link>
          <Link
            href="/admin/content/pages"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>{isAr ? 'محتوى الموقع' : 'Edit Website Content'}</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
        <StatCard
          title={isAr ? 'إجمالي الطلبات والاستفسارات' : 'Total Inquiries & RFPs'}
          value={inquiries.length}
          subtitle={isAr ? `${newInquiriesCount} طلب جديد غير متصل` : `${newInquiriesCount} new uncontacted`}
          icon={MessageSquare}
          iconColor="text-blue-400"
          href="/admin/crm/inquiries"
        />

        <StatCard
          title={isAr ? 'مرشحو بنك المواهب' : 'Talent Pool Candidates'}
          value={applications.length}
          subtitle={isAr ? `${newApplicationsCount} بانتظار المراجعة` : `${newApplicationsCount} awaiting review`}
          icon={Users}
          iconColor="text-purple-400"
          href="/admin/hr/applications"
        />

        <StatCard
          title={isAr ? 'الوظائف المتاحة حالياً' : 'Active Job Vacancies'}
          value={jobCount}
          subtitle={isAr ? 'منشورة على بوابة التوظيف' : 'Published on careers portal'}
          icon={Briefcase}
          iconColor="text-emerald-400"
          href="/admin/hr/jobs"
        />

        <StatCard
          title={isAr ? 'حالة البنية التحتية' : 'Infrastructure Status'}
          value={isAr ? 'متصل ونشط' : 'Healthy'}
          subtitle={isAr ? 'قاعدة البيانات والتخزين تعمل' : 'Supabase DB & Storage Active'}
          icon={Activity}
          iconColor="text-sky-400"
          href="/admin/system/health"
        />
      </div>

      {/* 3. Main Operational Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Inquiries & Talent Tables */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section: Recent Inquiries */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  <span>{isAr ? 'أحدث الطلبات والاستفسارات' : 'Recent Inquiries & Sector RFPs'}</span>
                </h2>
                <p className="text-xs text-zinc-400">
                  {isAr ? 'الطلبات الواردة من سويس بلو وجرين وود وتصاميم الوطن' : 'Incoming inquiries from SwissBlue, GreenWood, and Watan Contracting forms'}
                </p>
              </div>

              <Link
                href="/admin/crm/inquiries"
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>{isAr ? 'عرض الكل' : 'View all'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-16 rounded-2xl bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : inquiries.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl space-y-2">
                <MessageSquare className="w-8 h-8 text-zinc-600 mx-auto" />
                <p className="text-xs text-zinc-400">{isAr ? 'لا توجد طلبات جديدة حالياً.' : 'No customer inquiries submitted yet.'}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead className="border-b border-white/10 text-zinc-400 font-mono">
                    <tr>
                      <th className="pb-3 font-semibold">{isAr ? 'جهة الاتصال / الشركة' : 'Contact / Company'}</th>
                      <th className="pb-3 font-semibold">{isAr ? 'القطاع' : 'Sector'}</th>
                      <th className="pb-3 font-semibold">{isAr ? 'الحالة' : 'Status'}</th>
                      <th className="pb-3 font-semibold">{isAr ? 'التاريخ' : 'Submitted'}</th>
                      <th className="pb-3 text-right rtl:text-left font-semibold">{isAr ? 'الإجراء' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {inquiries.slice(0, 5).map((inq) => (
                      <tr 
                        key={inq.id}
                        className="hover:bg-white/5 transition-colors group cursor-pointer"
                        onClick={() => setSelectedInquiry(inq)}
                      >
                        <td className="py-3.5 pr-3 rtl:pr-0 rtl:pl-3">
                          <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                            {inq.name}
                          </div>
                          <div className="text-[11px] text-zinc-400 truncate max-w-[180px]" dir="ltr">
                            {inq.company || inq.email}
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="capitalize text-zinc-300 font-medium">
                            {inq.sector || (isAr ? 'عام' : 'General')}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap shrink-0 inline-flex items-center ${
                            inq.status === 'new'
                              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                              : inq.status === 'contacted'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : inq.status === 'won'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-zinc-500/20 text-zinc-400 border-zinc-500/40'
                          }`}>
                            {inq.status.toUpperCase()}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-zinc-500 font-mono text-[11px]" dir="ltr">
                          {new Date(inq.created_at).toLocaleDateString()}
                        </td>

                        <td className="py-3.5 pl-3 rtl:pl-0 rtl:pr-3 text-right rtl:text-left">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInquiry(inq);
                            }}
                            className="px-3 py-1 rounded-lg bg-white/5 group-hover:bg-blue-600 group-hover:text-white text-zinc-300 text-[11px] font-bold transition-all cursor-pointer"
                          >
                            {isAr ? 'معاينة' : 'Inspect'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section: Recent Talent Pool Applications */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span>{isAr ? 'أحدث طلبات بنك المواهب' : 'Recent Talent Pool Applications'}</span>
                </h2>
                <p className="text-xs text-zinc-400">
                  {isAr ? 'السير الذاتية للمرشحين المقدمة عبر بوابة التوظيف' : 'Candidate CVs submitted through the /careers portal'}
                </p>
              </div>

              <Link
                href="/admin/hr/applications"
                className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <span>{isAr ? 'عرض الكل' : 'View all'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-16 rounded-2xl bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : applications.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl space-y-2">
                <Users className="w-8 h-8 text-zinc-600 mx-auto" />
                <p className="text-xs text-zinc-400">{isAr ? 'لا يوجد متقدمين حتى الآن.' : 'No job applicants submitted yet.'}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead className="border-b border-white/10 text-zinc-400 font-mono">
                    <tr>
                      <th className="pb-3 font-semibold">{isAr ? 'اسم المرشح' : 'Candidate Name'}</th>
                      <th className="pb-3 font-semibold">{isAr ? 'المسمى / القطاع' : 'Role / Sector'}</th>
                      <th className="pb-3 font-semibold">{isAr ? 'الحالة' : 'Status'}</th>
                      <th className="pb-3 font-semibold">{isAr ? 'الموقع' : 'Location'}</th>
                      <th className="pb-3 text-right rtl:text-left font-semibold">{isAr ? 'الإجراء' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {applications.slice(0, 5).map((app) => (
                      <tr 
                        key={app.id}
                        className="hover:bg-white/5 transition-colors group cursor-pointer"
                        onClick={() => setSelectedCandidate(app)}
                      >
                        <td className="py-3.5 pr-3 rtl:pr-0 rtl:pl-3">
                          <div className="font-bold text-white group-hover:text-purple-400 transition-colors">
                            {app.full_name}
                          </div>
                          <div className="text-[11px] text-zinc-400 truncate max-w-[180px]" dir="ltr">
                            {app.email}
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="font-semibold text-zinc-200 truncate max-w-[160px]">
                            {app.job_title || (isAr ? 'موهبة عامة' : 'General Talent')}
                          </div>
                          <div className="text-[10px] text-zinc-500 capitalize">
                            {app.sector || (isAr ? 'جميع القطاعات' : 'All sectors')}
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap shrink-0 inline-flex items-center ${
                            app.status === 'new'
                              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                              : app.status === 'shortlisted'
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                              : app.status === 'hired'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-zinc-500/20 text-zinc-400 border-zinc-500/40'
                          }`}>
                            {app.status.toUpperCase()}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-zinc-400 text-[11px]">
                          {app.city || (isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia')}
                        </td>

                        <td className="py-3.5 pl-3 rtl:pl-0 rtl:pr-3 text-right rtl:text-left">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCandidate(app);
                            }}
                            className="px-3 py-1 rounded-lg bg-white/5 group-hover:bg-purple-600 group-hover:text-white text-zinc-300 text-[11px] font-bold transition-all cursor-pointer"
                          >
                            {isAr ? 'فحص السيرة' : 'Review CV'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* Right 1 Col: Quick Hubs & Audit Trail */}
        <div className="space-y-8">
          
          {/* Quick CMS Navigation Hub */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono text-blue-400">
              {isAr ? 'إدارة القطاعات الاستراتيجية' : 'SECTOR MANAGERS'}
            </h3>

            <div className="space-y-2.5">
              <Link
                href="/admin/sectors/hospitality"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 hover:bg-[#1A476A]/40 border border-white/5 hover:border-sky-500/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-sky-300">
                      {isAr ? 'قطاع الضيافة (سويس بلو)' : 'SwissBlue Hospitality'}
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      {isAr ? '6 فنادق ووحدات سكنية مخدومة' : '6 Hotels & Serviced Residences'}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white rtl:rotate-180 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/admin/sectors/manufacturing"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 hover:bg-[#0B5C3D]/40 border border-white/5 hover:border-emerald-500/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Factory className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-300">
                      {isAr ? 'قطاع التصنيع والأثاث (جرين وود)' : 'GreenWood Manufacturing'}
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      {isAr ? '3 مصانع متخصصة وخطوط إنتاج' : '3 Factories & CNC Machinery'}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white rtl:rotate-180 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/admin/sectors/contracting"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 hover:bg-[#8A7340]/40 border border-white/5 hover:border-amber-500/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <HardHat className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300">
                      {isAr ? 'المقاولات والتجهيز الداخلي (تصاميم الوطن)' : 'Contracting & Fit-Out'}
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      {isAr ? 'تنفيذ شامل وتجهيز فندقي وتجاري' : 'Turnkey Fit-Out & Joinery'}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white rtl:rotate-180 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Activity & Audit Trail */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>{isAr ? 'سجل العمليات الأخير' : 'Recent Admin Activity'}</span>
              </h3>
              <Link href="/admin/system/audit-logs" className="text-[11px] text-blue-400 font-bold hover:underline">
                {isAr ? 'السجل الكامل' : 'Full logs'}
              </Link>
            </div>

            <div className="space-y-3">
              {auditLogs.length === 0 ? (
                <p className="text-xs text-zinc-500 italic">{isAr ? 'لم يتم تسجيل نشاط بعد.' : 'No activity recorded yet.'}</p>
              ) : (
                auditLogs.slice(0, 6).map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500">
                      <span className="font-bold text-blue-400" dir="ltr">{log.actor_email}</span>
                      <span className="font-mono" dir="ltr">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="font-semibold text-zinc-200">
                      <span className="font-mono text-sky-300" dir="ltr">{log.action}</span> {isAr ? 'على' : 'on'} <span className="text-zinc-400" dir="ltr">{log.resource_type}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Drawers */}
      <LeadDetailDrawer
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onUpdateStatus={handleUpdateInquiryStatus}
        onAddNote={handleAddInquiryNote}
      />

      <CandidateDrawer
        application={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onUpdateStatus={handleUpdateCandidateStatus}
        onUpdateRating={handleUpdateCandidateRating}
        onAddNote={handleAddCandidateNote}
      />

    </div>
  );
}
