'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Star,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import CandidateDrawer from '@/components/admin/CandidateDrawer';
import { useToast } from '@/components/admin/ToastProvider';
import type { JobApplicationRecord, JobApplicationStatus } from '@/lib/admin/types';

export default function TalentPoolATSPage() {
  const { showToast } = useToast();
  const [applications, setApplications] = useState<JobApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const [selectedCandidate, setSelectedCandidate] = useState<JobApplicationRecord | null>(null);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: pageSize.toString(),
        offset: (page * pageSize).toString(),
      });
      if (sectorFilter !== 'all') params.set('sector', sectorFilter);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchTerm.trim()) params.set('search', searchTerm.trim());

      const res = await fetch(`/api/admin/hr/applications?${params.toString()}`);
      if (res.ok) {
        const d = await res.json();
        setApplications(d.applications || []);
        setTotalCount(d.total || 0);
      }
    } catch (e) {
      console.error('Applications fetch error:', e);
      showToast('Failed to load applications', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, sectorFilter, statusFilter, searchTerm, showToast]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleUpdateStatus = async (id: string, newStatus: JobApplicationStatus) => {
    try {
      const res = await fetch(`/api/admin/hr/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showToast('Candidate stage updated', 'success');
        setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)));
        if (selectedCandidate?.id === id) {
          setSelectedCandidate((prev) => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (e) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleUpdateRating = async (id: string, rating: number) => {
    try {
      const res = await fetch(`/api/admin/hr/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating }),
      });
      if (res.ok) {
        showToast(`Rating set to ${rating} stars`, 'success');
        setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, rating } : app)));
        if (selectedCandidate?.id === id) {
          setSelectedCandidate((prev) => prev ? { ...prev, rating } : null);
        }
      }
    } catch (e) {
      showToast('Failed to update rating', 'error');
    }
  };

  const handleAddNote = async (id: string, noteText: string) => {
    try {
      const existing = selectedCandidate?.internal_notes || [];
      const updatedNotes = [
        {
          id: `note_${Date.now()}`,
          text: noteText,
          author: 'HR Recruiter',
          authorEmail: 'hr@wdgroup.sa',
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
        showToast('HR note saved', 'success');
        setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, internal_notes: updatedNotes } : app)));
        if (selectedCandidate?.id === id) {
          setSelectedCandidate((prev) => prev ? { ...prev, internal_notes: updatedNotes } : null);
        }
      }
    } catch (e) {
      showToast('Failed to add note', 'error');
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>TALENT POOL & ATS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Candidate Applications
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Review applicant resumes, ratings, interview feedback, and recruitment pipeline stages.
          </p>
        </div>

        <button
          onClick={fetchApplications}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
          title="Refresh list"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 bg-[#0F1117]/90 border border-white/10 rounded-2xl p-4">
        
        {/* Search */}
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
            placeholder="Search candidate name, email, phone, or city…"
            className="w-full bg-[#08090C] border border-white/15 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none"
          />
        </div>

        {/* Sector Filter */}
        <select
          value={sectorFilter}
          onChange={(e) => {
            setSectorFilter(e.target.value);
            setPage(0);
          }}
          className="bg-[#08090C] border border-white/15 text-white text-xs font-semibold rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="all">All Sectors</option>
          <option value="hospitality">Hospitality</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="contracting">Contracting</option>
          <option value="corporate">Corporate Services</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(0);
          }}
          className="bg-[#08090C] border border-white/15 text-white text-xs font-semibold rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="all">All ATS Stages</option>
          <option value="new">New Applications</option>
          <option value="reviewing">Under Review</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interview">Interview Scheduled</option>
          <option value="hired">Hired</option>
          <option value="rejected">Rejected</option>
        </select>

      </div>

      {/* Applications Table */}
      <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/40 border-b border-white/10 text-zinc-400 font-mono">
              <tr>
                <th className="py-4 px-6 font-semibold">Candidate</th>
                <th className="py-4 px-4 font-semibold">Target Position / Sector</th>
                <th className="py-4 px-4 font-semibold">Rating</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-4 font-semibold">CV Resume</th>
                <th className="py-4 px-6 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500 font-mono">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-500 mb-2" />
                    Loading candidates…
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    No candidates matching the current filters.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setSelectedCandidate(app)}
                    className="hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-white group-hover:text-purple-400 transition-colors">
                        {app.full_name}
                      </div>
                      <div className="text-[11px] text-zinc-400">{app.email}</div>
                      <div className="text-[10px] text-zinc-500">{app.mobile} · {app.city || 'KSA'}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-semibold text-zinc-200">{app.job_title || 'General Talent'}</div>
                      <div className="text-[10px] text-zinc-400 capitalize">{app.sector || 'All Sectors'}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              (app.rating || 0) >= star ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
                            }`}
                          />
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                        app.status === 'new'
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                          : app.status === 'shortlisted'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : app.status === 'hired'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-zinc-500/20 text-zinc-400 border-zinc-500/40'
                      }`}>
                        {(app.status || 'new').toUpperCase()}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      {app.resume_url ? (
                        <a
                          href={app.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 underline font-medium text-[11px]"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View CV</span>
                        </a>
                      ) : (
                        <span className="text-[11px] text-zinc-600">None</span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCandidate(app);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 group-hover:bg-purple-600 group-hover:text-white text-zinc-300 text-xs font-bold transition-all"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 bg-black/30">
            <div>
              Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, totalCount)} of {totalCount} candidates
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              </button>
              <span className="font-mono">Page {page + 1} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}
      </div>

      <CandidateDrawer
        application={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onUpdateStatus={handleUpdateStatus}
        onUpdateRating={handleUpdateRating}
        onAddNote={handleAddNote}
      />

    </div>
  );
}
