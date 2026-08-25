'use client';

import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Send, 
  MessageSquare, 
  ExternalLink,
  Tag,
  Clock,
  UserCheck,
  ChevronDown
} from 'lucide-react';
import type { CRMInquiry, CRMInquiryStatus } from '@/lib/admin/types';

interface LeadDetailDrawerProps {
  inquiry: CRMInquiry | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: CRMInquiryStatus) => Promise<void>;
  onAddNote: (id: string, noteText: string) => Promise<void>;
}

const STATUS_CONFIG: Record<CRMInquiryStatus, { label: string; bg: string; text: string; border: string }> = {
  new: { label: 'New Lead', bg: 'bg-sky-500/20', text: 'text-sky-300', border: 'border-sky-500/40' },
  contacted: { label: 'Contacted', bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/40' },
  in_review: { label: 'In Review / Proposal', bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-500/40' },
  won: { label: 'Won / Deal Closed', bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/40' },
  closed: { label: 'Archived / Closed', bg: 'bg-zinc-500/20', text: 'text-zinc-400', border: 'border-zinc-500/40' },
};

export default function LeadDetailDrawer({
  inquiry,
  onClose,
  onUpdateStatus,
  onAddNote,
}: LeadDetailDrawerProps) {
  const [newNote, setNewNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  if (!inquiry) return null;

  const statusConfig = STATUS_CONFIG[inquiry.status] || STATUS_CONFIG.new;

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as CRMInquiryStatus;
    try {
      setUpdatingStatus(true);
      await onUpdateStatus(inquiry.id, val);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      setSubmittingNote(true);
      await onAddNote(inquiry.id, newNote.trim());
      setNewNote('');
    } finally {
      setSubmittingNote(false);
    }
  };

  const cleanPhone = inquiry.phone ? inquiry.phone.replace(/[^0-9+]/g, '') : '';
  const whatsappUrl = cleanPhone 
    ? `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(`Hello ${inquiry.name}, regarding your inquiry with WD Group…`)}`
    : null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-[#0F1117] border-l border-white/15 text-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-extrabold text-white">{inquiry.name}</h2>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                  {statusConfig.label}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Submitted on {new Date(inquiry.created_at).toLocaleString('en-US')}
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
            
            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${inquiry.email}?subject=WD Group Follow-Up: ${encodeURIComponent(inquiry.subject || 'Your Inquiry')}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </a>

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {inquiry.phone && (
                <a
                  href={`tel:${inquiry.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 text-xs font-bold transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {inquiry.phone}</span>
                </a>
              )}
            </div>

            {/* Status Control */}
            <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block">Lead Pipeline Stage</label>
                <p className="text-[11px] text-zinc-500">Update the current state of this business inquiry</p>
              </div>

              <div className="relative shrink-0">
                <select
                  value={inquiry.status}
                  onChange={handleStatusChange}
                  disabled={updatingStatus}
                  className="appearance-none bg-[#08090C] border border-white/20 text-white text-xs font-bold rounded-xl pl-3.5 pr-9 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_review">In Review / Proposal</option>
                  <option value="won">Won / Deal Closed</option>
                  <option value="closed">Archived / Closed</option>
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Lead Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Email Address</span>
                <span className="text-sm font-semibold text-white break-all">{inquiry.email}</span>
              </div>

              <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Phone Number</span>
                <span className="text-sm font-semibold text-white">{inquiry.phone || 'Not provided'}</span>
              </div>

              <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Company / Organization</span>
                <span className="text-sm font-semibold text-white">{inquiry.company || 'Direct individual'}</span>
              </div>

              <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">Sector / Inquiry Type</span>
                <span className="text-sm font-semibold text-sky-400 capitalize">{inquiry.sector || 'General'}</span>
              </div>
            </div>

            {/* Subject & Message Content */}
            <div className="bg-[#141721] border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                // Inquiry Message & Brief
              </div>
              {inquiry.subject && (
                <h4 className="text-base font-bold text-white border-b border-white/10 pb-2">
                  {inquiry.subject}
                </h4>
              )}
              <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap font-normal">
                {inquiry.message}
              </div>
            </div>

            {/* Internal Staff Notes & Timeline */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-400" />
                  <span>Internal Staff Notes & Activity</span>
                </h3>
                <span className="text-xs font-mono text-zinc-500">
                  {inquiry.internal_notes?.length || 0} notes
                </span>
              </div>

              {/* Note Submission Form */}
              <form onSubmit={handleNoteSubmit} className="space-y-2">
                <textarea
                  rows={2}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add an internal note or communication update…"
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

              {/* Notes Timeline List */}
              <div className="space-y-2.5">
                {inquiry.internal_notes && inquiry.internal_notes.length > 0 ? (
                  inquiry.internal_notes.map((note) => (
                    <div key={note.id} className="bg-[#141721] border border-white/5 rounded-xl p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-zinc-400">
                        <span className="font-bold text-blue-400">{note.author}</span>
                        <span className="font-mono">{new Date(note.createdAt).toLocaleString('en-US')}</span>
                      </div>
                      <p className="text-xs text-zinc-200 leading-relaxed">{note.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-zinc-500 italic">No internal notes added yet.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
