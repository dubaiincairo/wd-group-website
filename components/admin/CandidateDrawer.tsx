'use client';

import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Download, 
  Linkedin, 
  ExternalLink,
  MessageSquare,
  Star,
  Send,
  UserCheck,
  ChevronDown
} from 'lucide-react';
import type { JobApplicationRecord, JobApplicationStatus } from '@/lib/admin/types';

interface CandidateDrawerProps {
  application: JobApplicationRecord | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: JobApplicationStatus) => Promise<void>;
  onUpdateRating: (id: string, rating: number) => Promise<void>;
  onAddNote: (id: string, noteText: string) => Promise<void>;
}

const STAGE_CONFIG: Record<JobApplicationStatus, { label: string; bg: string; text: string; border: string }> = {
  new: { label: 'New Application', bg: 'bg-sky-500/20', text: 'text-sky-300', border: 'border-sky-500/40' },
  reviewing: { label: 'Under Review', bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/40' },
  shortlisted: { label: 'Shortlisted', bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-500/40' },
  interview: { label: 'Interview Scheduled', bg: 'bg-indigo-500/20', text: 'text-indigo-300', border: 'border-indigo-500/40' },
  hired: { label: 'Hired', bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/40' },
  rejected: { label: 'Rejected', bg: 'bg-rose-500/20', text: 'text-rose-300', border: 'border-rose-500/40' },
};

export default function CandidateDrawer({
  application,
  onClose,
  onUpdateStatus,
  onUpdateRating,
  onAddNote,
}: CandidateDrawerProps) {
  const [newNote, setNewNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const [updatingStage, setUpdatingStage] = useState(false);

  if (!application) return null;

  const stageConfig = STAGE_CONFIG[application.status] || STAGE_CONFIG.new;

  const handleStageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as JobApplicationStatus;
    try {
      setUpdatingStage(true);
      await onUpdateStatus(application.id, val);
    } finally {
      setUpdatingStage(false);
    }
  };

  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      setSubmittingNote(true);
      await onAddNote(application.id, newNote.trim());
      setNewNote('');
    } finally {
      setSubmittingNote(false);
    }
  };

  const cleanPhone = application.mobile ? application.mobile.replace(/[^0-9+]/g, '') : '';
  const whatsappUrl = cleanPhone 
    ? `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(`Hello ${application.full_name}, regarding your application with WD Group for ${application.job_title || 'our talent pool'}…`)}`
    : null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-[#0F1117] border-l border-white/15 text-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-extrabold text-white">{application.full_name}</h2>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${stageConfig.bg} ${stageConfig.text} ${stageConfig.border}`}>
                  {stageConfig.label}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Applied on {new Date(application.created_at).toLocaleString('en-US')}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Target Job Role & Rating */}
            <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Target Position</span>
                <span className="text-base font-extrabold text-blue-400">
                  {application.job_title || 'General Talent Pool Submission'}
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-xl px-3 py-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => onUpdateRating(application.id, star)}
                    className="text-zinc-500 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        (application.rating || 0) >= star
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-zinc-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Contact & CV Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {application.resume_url ? (
                <a
                  href={application.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV / Resume</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-500 text-xs font-semibold">
                  <FileText className="w-4 h-4" />
                  <span>No CV Uploaded</span>
                </span>
              )}

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Candidate</span>
                </a>
              )}

              <a
                href={`mailto:${application.email}?subject=WD Group Career Opportunity: ${encodeURIComponent(application.job_title || 'Application Follow-Up')}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 text-xs font-bold transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </a>

              {application.linkedin_url && (
                <a
                  href={application.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/40 border border-[#0077b5]/40 text-[#38bdf8] text-xs font-bold transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
            </div>

            {/* ATS Stage Selector */}
            <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block">Recruitment Pipeline Stage</label>
                <p className="text-[11px] text-zinc-500">Move applicant through evaluation stages</p>
              </div>

              <div className="relative shrink-0">
                <select
                  value={application.status}
                  onChange={handleStageChange}
                  disabled={updatingStage}
                  className="appearance-none bg-[#08090C] border border-white/20 text-white text-xs font-bold rounded-xl pl-3.5 pr-9 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="new">New Application</option>
                  <option value="reviewing">Under Review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview">Interview Scheduled</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Candidate Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Email Address</span>
                <span className="text-sm font-semibold text-white break-all">{application.email}</span>
              </div>

              <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Mobile Number</span>
                <span className="text-sm font-semibold text-white">{application.mobile}</span>
              </div>

              <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">City & Location</span>
                <span className="text-sm font-semibold text-white">{application.city || 'Saudi Arabia'}</span>
              </div>

              <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Primary Sector</span>
                <span className="text-sm font-semibold text-sky-400 capitalize">{application.sector || 'General'}</span>
              </div>
            </div>

            {/* Cover Note */}
            {application.cover_note && (
              <div className="bg-[#141721] border border-white/10 rounded-2xl p-5 space-y-2">
                <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  // Candidate Cover Note & Summary
                </div>
                <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap font-normal">
                  {application.cover_note}
                </div>
              </div>
            )}

            {/* HR Evaluation Notes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-400" />
                  <span>HR Notes & Interview Feedback</span>
                </h3>
                <span className="text-xs font-mono text-zinc-500">
                  {application.internal_notes?.length || 0} notes
                </span>
              </div>

              {/* Note Submission Form */}
              <form onSubmit={handleNoteSubmit} className="space-y-2">
                <textarea
                  rows={2}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record interview impressions, salary requirements, or follow-up actions…"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submittingNote || !newNote.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submittingNote ? 'Adding…' : 'Add Note'}</span>
                  </button>
                </div>
              </form>

              {/* Notes Timeline */}
              <div className="space-y-2.5">
                {application.internal_notes && application.internal_notes.length > 0 ? (
                  application.internal_notes.map((note) => (
                    <div key={note.id} className="bg-[#141721] border border-white/5 rounded-xl p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-zinc-400">
                        <span className="font-bold text-blue-400">{note.author}</span>
                        <span className="font-mono">{new Date(note.createdAt).toLocaleString('en-US')}</span>
                      </div>
                      <p className="text-xs text-zinc-200 leading-relaxed">{note.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-zinc-500 italic">No notes recorded for this candidate yet.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
