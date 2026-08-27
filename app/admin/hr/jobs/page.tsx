'use client';

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  X,
  Clock,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import BilingualInput from '@/components/admin/BilingualInput';
import AdminLoadingState from '@/components/admin/AdminLoadingState';
import { useToast } from '@/components/admin/ToastProvider';
import { useLanguage } from '@/context/LanguageContext';
import type { JobListing } from '@/lib/types/database';

export default function JobOpeningsAdminPage() {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit / Create Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Partial<JobListing> | null>(null);
  const [savingJob, setSavingJob] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/hr/jobs');
      if (res.ok) {
        const d = await res.json();
        setJobs(d.jobs || []);
      }
    } catch (e) {
      console.error('Error fetching jobs:', e);
      showToast(isAr ? 'فشل تحميل الوظائف' : 'Failed to load jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpenCreate = () => {
    setEditingJob({
      title: '',
      title_ar: '',
      role_overview: '',
      role_overview_ar: '',
      responsibilities: '',
      responsibilities_ar: '',
      requirements: '',
      requirements_ar: '',
      experience: '3+ Years',
      experience_ar: '+3 سنوات',
      sort_order: jobs.length + 1,
      published: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (job: JobListing) => {
    setEditingJob({ ...job });
    setModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob || (!editingJob.title?.trim() && !editingJob.title_ar?.trim())) {
      showToast(isAr ? 'المسمى الوظيفي مطلوب' : 'Job title is required', 'error');
      return;
    }

    try {
      setSavingJob(true);
      const isEdit = Boolean(editingJob.id);
      const url = isEdit ? `/api/admin/hr/jobs/${editingJob.id}` : '/api/admin/hr/jobs';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        ...editingJob,
        title: editingJob.title || editingJob.title_ar || '',
        title_ar: editingJob.title_ar || editingJob.title || '',
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to save job');
      }

      showToast(isAr ? (isEdit ? 'تم تحديث الوظيفة الشاغرة بنجاح' : 'تم نشر الوظيفة الشاغرة بنجاح') : (isEdit ? 'Job vacancy updated successfully' : 'Job vacancy posted successfully'), 'success');
      setModalOpen(false);
      setEditingJob(null);
      fetchJobs();
    } catch (e: any) {
      console.error('Error saving job:', e);
      showToast(e.message || (isAr ? 'فشل حفظ الوظيفة' : 'Failed to save job'), 'error');
    } finally {
      setSavingJob(false);
    }
  };

  const handleTogglePublished = async (job: JobListing) => {
    try {
      const updated = !job.published;
      const res = await fetch(`/api/admin/hr/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...job, published: updated }),
      });

      if (res.ok) {
        setJobs(jobs.map((j) => (j.id === job.id ? { ...j, published: updated } : j)));
        showToast(
          isAr 
            ? (updated ? 'تم نشر الوظيفة على الموقع' : 'تم تحويل الوظيفة إلى مسودة') 
            : (updated ? 'Job published to live portal' : 'Job unpublished to draft'),
          'success'
        );
      }
    } catch (e) {
      showToast(isAr ? 'فشل تحديث حالة الوظيفة' : 'Failed to update job status', 'error');
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/hr/jobs/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setJobs(jobs.filter((j) => j.id !== id));
        showToast(isAr ? 'تم حذف الوظيفة الشاغرة' : 'Job deleted successfully', 'success');
      } else {
        showToast(isAr ? 'فشل حذف الوظيفة' : 'Failed to delete job', 'error');
      }
    } catch (e) {
      showToast(isAr ? 'فشل حذف الوظيفة' : 'Failed to delete job', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{isAr ? 'إدارة الموارد البشرية والتوظيف' : 'HR & TALENT ACQUISITION'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isAr ? 'الوظائف الشاغرة وفرص العمل' : 'Job Openings & Vacancies'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr ? 'نشر وتعديل وترتيب الفرص الوظيفية في بوابة التوظيف العامة للمجموعة باللغتين العربية والإنجليزية.' : 'Publish, edit, and order bilingual career opportunities on the public careers portal.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchJobs}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title={isAr ? 'تحديث الوظائف' : 'Refresh jobs'}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'إضافة وظيفة شاغرة' : 'Post New Vacancy'}</span>
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {loading ? (
          <AdminLoadingState minHeight="min-h-[50vh]" message={isAr ? 'جارٍ تحميل الوظائف الشاغرة…' : 'Loading career vacancies…'} />
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center bg-[#0F1117]/90 border border-dashed border-white/10 rounded-3xl space-y-3">
            <Briefcase className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-white">{isAr ? 'لا توجد وظائف شاغرة حالياً' : 'No active job listings'}</h3>
            <p className="text-xs text-zinc-400">{isAr ? 'انقر على "إضافة وظيفة شاغرة" لنشر أول فرصة وظيفية.' : 'Click "Post New Vacancy" to add your first job opening.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {jobs.map((job) => {
              const displayTitle = isAr ? (job.title_ar || job.title) : (job.title || job.title_ar);
              const displayOverview = isAr ? (job.role_overview_ar || job.role_overview) : (job.role_overview || job.role_overview_ar);
              const displayExp = isAr ? (job.experience_ar || job.experience) : (job.experience || job.experience_ar);

              return (
                <div 
                  key={job.id}
                  className={`bg-[#0F1117]/90 border rounded-3xl p-6 space-y-4 transition-all ${
                    job.published 
                      ? 'border-white/10 hover:border-blue-500/40 shadow-lg' 
                      : 'border-white/5 opacity-70 bg-black/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap shrink-0 inline-flex items-center ${
                          job.published 
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                            : 'bg-zinc-500/20 text-zinc-400 border-zinc-500/40'
                        }`}>
                          {job.published ? (isAr ? 'منشور على الموقع' : 'LIVE ON SITE') : (isAr ? 'مسودة / مؤرشف' : 'DRAFT / ARCHIVED')}
                        </span>
                        {displayExp && (
                          <span className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0 inline-flex items-center">
                            {displayExp}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white pt-1">
                        {displayTitle}
                      </h3>
                      {isAr && job.title && job.title_ar && (
                        <p className="text-xs text-zinc-500 font-mono">
                          EN: {job.title}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleTogglePublished(job)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        title={job.published ? (isAr ? 'إلغاء النشر' : 'Unpublish job') : (isAr ? 'نشر الوظيفة' : 'Publish job')}
                      >
                        {job.published ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-zinc-500" />}
                      </button>

                      <button
                        onClick={() => handleOpenEdit(job)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-blue-600 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        title={isAr ? 'تعديل التفاصيل' : 'Edit job details'}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeletingId(job.id)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-rose-600 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        title={isAr ? 'حذف الوظيفة' : 'Delete job'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {displayOverview && (
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {displayOverview}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0F1117] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-bold text-white">
                  {editingJob.id 
                    ? (isAr ? 'تعديل الوظيفة الشاغرة' : 'Edit Job Vacancy') 
                    : (isAr ? 'إضافة فرصة وظيفية جديدة' : 'Post New Vacancy')}
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-5">
              
              {/* Bilingual Title */}
              <BilingualInput
                label={isAr ? 'المسمى الوظيفي *' : 'Job Title *'}
                valueEn={editingJob.title || ''}
                valueAr={editingJob.title_ar || ''}
                onChangeEn={(v) => setEditingJob({ ...editingJob, title: v })}
                onChangeAr={(v) => setEditingJob({ ...editingJob, title_ar: v })}
                placeholderEn="e.g. Senior Odoo ERP Implementor"
                placeholderAr="مثال: أخصائي أول تطبيق أنظمة أودو (ERP)"
              />

              {/* Experience & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BilingualInput
                  label={isAr ? 'سنوات الخبرة' : 'Experience Requirement'}
                  valueEn={editingJob.experience || ''}
                  valueAr={editingJob.experience_ar || ''}
                  onChangeEn={(v) => setEditingJob({ ...editingJob, experience: v })}
                  onChangeAr={(v) => setEditingJob({ ...editingJob, experience_ar: v })}
                  placeholderEn="e.g. 5+ Years"
                  placeholderAr="مثال: +5 سنوات"
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">
                    {isAr ? 'ترتيب العرض' : 'Display Sort Order'}
                  </label>
                  <input
                    type="number"
                    value={editingJob.sort_order ?? 1}
                    onChange={(e) => setEditingJob({ ...editingJob, sort_order: parseInt(e.target.value, 10) || 0 })}
                    className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Bilingual Role Overview */}
              <BilingualInput
                label={isAr ? 'نبذة عن الدور والمهام' : 'Role Overview'}
                isTextarea
                rows={3}
                valueEn={editingJob.role_overview || ''}
                valueAr={editingJob.role_overview_ar || ''}
                onChangeEn={(v) => setEditingJob({ ...editingJob, role_overview: v })}
                onChangeAr={(v) => setEditingJob({ ...editingJob, role_overview_ar: v })}
                placeholderEn="Summary of responsibilities and mission of this role…"
                placeholderAr="ملخص للمسؤوليات والهدف الأساسي من هذا الدور الوظيفي…"
              />

              {/* Bilingual Responsibilities */}
              <BilingualInput
                label={isAr ? 'المسؤوليات الرئيسية (سطر لكل مسؤولية)' : 'Key Responsibilities (One per line)'}
                isTextarea
                rows={4}
                valueEn={editingJob.responsibilities || ''}
                valueAr={editingJob.responsibilities_ar || ''}
                onChangeEn={(v) => setEditingJob({ ...editingJob, responsibilities: v })}
                onChangeAr={(v) => setEditingJob({ ...editingJob, responsibilities_ar: v })}
                placeholderEn="Lead architecture design&#10;Coordinate cross-sector ERP integration&#10;Mentor junior staff"
                placeholderAr="إدارة المخططات الهندسية&#10;التنسيق مع فرق التنفيذ&#10;متابعة معايير الجودة والسلامة"
              />

              {/* Bilingual Requirements */}
              <BilingualInput
                label={isAr ? 'المؤهلات والمهارات المطلوبة (سطر لكل متطلب)' : 'Qualifications & Skills (One per line)'}
                isTextarea
                rows={4}
                valueEn={editingJob.requirements || ''}
                valueAr={editingJob.requirements_ar || ''}
                onChangeEn={(v) => setEditingJob({ ...editingJob, requirements: v })}
                onChangeAr={(v) => setEditingJob({ ...editingJob, requirements_ar: v })}
                placeholderEn="Bachelor degree in Engineering / CS&#10;Hands-on PostgreSQL & Python experience"
                placeholderAr="بكالوريوس هندسة أو ما يعادله&#10;خبرة عملية موثقة في نفس المجال"
              />

              {/* Published Toggle */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/10">
                <input
                  type="checkbox"
                  id="job-published"
                  checked={editingJob.published ?? true}
                  onChange={(e) => setEditingJob({ ...editingJob, published: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 bg-[#08090C] border-white/20 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="job-published" className="text-xs font-bold text-zinc-200 cursor-pointer select-none">
                  {isAr ? 'نشر الوظيفة مباشرة على بوابة التوظيف' : 'Publish vacancy immediately on live careers portal'}
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={savingJob}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={savingJob}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-glow-blue disabled:opacity-50 cursor-pointer"
                >
                  {savingJob ? (isAr ? 'جارٍ الحفظ…' : 'Saving…') : (isAr ? 'حفظ الوظيفة' : 'Save Vacancy')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={Boolean(deletingId)}
        title={isAr ? 'حذف الوظيفة الشاغرة' : 'Delete Job Vacancy'}
        message={isAr ? 'هل أنت متأكد من رغبتك في حذف هذه الفرصة الوظيفية نهائياً؟ لا يمكن التراجع عن هذا الإجراء.' : 'Are you sure you want to permanently delete this job opening? This action cannot be undone.'}
        confirmLabel={isAr ? 'حذف الوظيفة' : 'Delete Vacancy'}
        onConfirm={() => deletingId && handleDeleteJob(deletingId)}
        onClose={() => setDeletingId(null)}
      />

    </div>
  );
}
