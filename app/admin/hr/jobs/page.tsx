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
  EyeOff
} from 'lucide-react';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import { useToast } from '@/components/admin/ToastProvider';
import type { JobListing } from '@/lib/types/database';

export default function JobOpeningsAdminPage() {
  const { showToast } = useToast();
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
      showToast('Failed to load jobs', 'error');
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
      role_overview: '',
      responsibilities: '',
      requirements: '',
      experience: '3+ Years',
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
    if (!editingJob || !editingJob.title?.trim()) {
      showToast('Job title is required', 'error');
      return;
    }

    try {
      setSavingJob(true);
      const isEdit = Boolean(editingJob.id);
      const url = isEdit ? `/api/admin/hr/jobs/${editingJob.id}` : '/api/admin/hr/jobs';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingJob),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to save job');
      }

      showToast(isEdit ? 'Job vacancy updated' : 'Job vacancy posted successfully', 'success');
      setModalOpen(false);
      setEditingJob(null);
      fetchJobs();
    } catch (err: any) {
      showToast(err.message || 'Error saving job', 'error');
    } finally {
      setSavingJob(false);
    }
  };

  const handleTogglePublished = async (job: JobListing) => {
    try {
      const res = await fetch(`/api/admin/hr/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !job.published }),
      });
      if (res.ok) {
        showToast(job.published ? 'Job unlisted from website' : 'Job published live', 'info');
        setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, published: !j.published } : j)));
      }
    } catch (e) {
      showToast('Failed to toggle publication', 'error');
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/hr/jobs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Job opening deleted', 'info');
        setJobs((prev) => prev.filter((j) => j.id !== id));
      }
    } catch (e) {
      showToast('Failed to delete job', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>TALENT RECRUITMENT</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Job Openings & Vacancies
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Publish, edit, and order corporate career opportunities on the public careers portal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchJobs}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Refresh jobs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Vacancy</span>
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-zinc-500 font-mono">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-500 mb-2" />
            Loading job postings…
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center bg-[#0F1117]/90 border border-dashed border-white/10 rounded-3xl space-y-3">
            <Briefcase className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No active job listings</h3>
            <p className="text-xs text-zinc-400">Click &ldquo;Post New Vacancy&rdquo; to add your first job opening.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {jobs.map((job) => (
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
                        {job.published ? 'LIVE ON SITE' : 'DRAFT / ARCHIVED'}
                      </span>
                      {job.experience && (
                        <span className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0 inline-flex items-center">
                          {job.experience}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white pt-1">
                      {job.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleTogglePublished(job)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                      title={job.published ? 'Unpublish job' : 'Publish job'}
                    >
                      {job.published ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => handleOpenEdit(job)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-blue-600 text-zinc-400 hover:text-white transition-colors"
                      title="Edit job details"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeletingId(job.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-rose-600 text-zinc-400 hover:text-white transition-colors"
                      title="Delete job"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {job.role_overview && (
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                    {job.role_overview}
                  </p>
                )}

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Order: #{job.sort_order || 0}</span>
                  <span>Posted: {new Date(job.created_at || '').toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0F1117] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {editingJob.id ? 'Edit Job Opening' : 'Post New Career Vacancy'}
                </h3>
                <p className="text-xs text-zinc-400">Position specs will display on /careers</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">Job Title *</label>
                <input
                  type="text"
                  required
                  value={editingJob.title || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  placeholder="e.g. Senior Odoo ERP Implementor"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Experience Requirement</label>
                  <input
                    type="text"
                    value={editingJob.experience || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, experience: e.target.value })}
                    placeholder="e.g. 5+ Years"
                    className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Display Sort Order</label>
                  <input
                    type="number"
                    value={editingJob.sort_order ?? 1}
                    onChange={(e) => setEditingJob({ ...editingJob, sort_order: parseInt(e.target.value, 10) || 0 })}
                    className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">Role Overview</label>
                <textarea
                  rows={3}
                  value={editingJob.role_overview || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, role_overview: e.target.value })}
                  placeholder="Summary of responsibilities and mission of this role…"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">Key Responsibilities (One per line)</label>
                <textarea
                  rows={3}
                  value={editingJob.responsibilities || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, responsibilities: e.target.value })}
                  placeholder="Lead architecture design&#10;Coordinate cross-sector ERP integration&#10;Mentor junior staff"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">Qualifications & Skills</label>
                <textarea
                  rows={3}
                  value={editingJob.requirements || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, requirements: e.target.value })}
                  placeholder="Bachelor degree in Engineering / CS&#10;Hands-on PostgreSQL & Python experience"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/10">
                <input
                  type="checkbox"
                  id="job-published"
                  checked={editingJob.published ?? true}
                  onChange={(e) => setEditingJob({ ...editingJob, published: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 bg-[#08090C] border-white/20 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="job-published" className="text-xs font-bold text-zinc-200 cursor-pointer">
                  Publish vacancy immediately on live careers portal
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={savingJob}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingJob}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-glow-blue disabled:opacity-50"
                >
                  {savingJob ? 'Saving…' : 'Save Vacancy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={Boolean(deletingId)}
        title="Delete Job Vacancy"
        message="Are you sure you want to permanently delete this job opening? This action cannot be undone."
        confirmLabel="Delete Vacancy"
        onConfirm={() => deletingId && handleDeleteJob(deletingId)}
        onClose={() => setDeletingId(null)}
      />

    </div>
  );
}
