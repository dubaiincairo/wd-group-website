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
import { useLanguage } from '@/context/LanguageContext';
import type { CRMInquiry, CRMInquiryStatus } from '@/lib/admin/types';

interface LeadDetailDrawerProps {
  inquiry: CRMInquiry | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: CRMInquiryStatus) => Promise<void>;
  onAddNote: (id: string, noteText: string) => Promise<void>;
}

const STATUS_CONFIG: Record<CRMInquiryStatus, { labelEn: string; labelAr: string; bg: string; text: string; border: string }> = {
  new: { labelEn: 'New Lead', labelAr: 'طلب جديد', bg: 'bg-sky-500/20', text: 'text-sky-300', border: 'border-sky-500/40' },
  contacted: { labelEn: 'Contacted', labelAr: 'تم التواصل', bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/40' },
  in_review: { labelEn: 'In Review / Proposal', labelAr: 'قيد المراجعة / العرض', bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-500/40' },
  won: { labelEn: 'Won / Deal Closed', labelAr: 'صفقة مؤكدة بنجاح', bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/40' },
  closed: { labelEn: 'Archived / Closed', labelAr: 'مؤرشف / مغلق', bg: 'bg-zinc-500/20', text: 'text-zinc-400', border: 'border-zinc-500/40' },
};

export default function LeadDetailDrawer({
  inquiry,
  onClose,
  onUpdateStatus,
  onAddNote,
}: LeadDetailDrawerProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

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
    ? `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
        isAr 
          ? `مرحباً ${inquiry.name}، بخصوص استفساركم المرسل لمجموعة دبليو دي للأعمال…` 
          : `Hello ${inquiry.name}, regarding your inquiry with WD Group…`
      )}`
    : null;

  return (
    <div className="fixed inset-0 top-[65px] z-40 overflow-hidden animate-in fade-in duration-200">
      {/* Soft translucent backdrop below header */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] cursor-pointer"
      />
      <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10 pointer-events-none">
        <div className="w-screen max-w-2xl h-full bg-[#0F1117] border-l rtl:border-l-0 rtl:border-r border-white/15 text-white shadow-2xl flex flex-col pointer-events-auto animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-extrabold text-white">{inquiry.name}</h2>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                  {isAr ? statusConfig.labelAr : statusConfig.labelEn}
                </span>
              </div>
              <p className="text-xs text-zinc-400" dir="ltr">
                {isAr ? `تاريخ الإرسال: ${new Date(inquiry.created_at).toLocaleString('ar-SA')}` : `Submitted on ${new Date(inquiry.created_at).toLocaleString('en-US')}`}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${inquiry.email}?subject=${encodeURIComponent(isAr ? `مجموعة دبليو دي للأعمال - متابعة استفسار: ${inquiry.subject || ''}` : `WD Group Follow-Up: ${inquiry.subject || 'Your Inquiry'}`)}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>{isAr ? 'إرسال بريد إلكتروني' : 'Send Email'}</span>
              </a>

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isAr ? 'محادثة واتساب' : 'WhatsApp Chat'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {inquiry.phone && (
                <a
                  href={`tel:${inquiry.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 text-xs font-bold transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isAr ? `اتصال: ${inquiry.phone}` : `Call ${inquiry.phone}`}</span>
                </a>
              )}
            </div>

            {/* Status Control */}
            <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block">
                  {isAr ? 'مرحلة معالجة الطلب' : 'Lead Pipeline Stage'}
                </label>
                <p className="text-[11px] text-zinc-500">
                  {isAr ? 'تحديث الحالة الراهنة لهذا الطلب التجاري' : 'Update the current state of this business inquiry'}
                </p>
              </div>

              <div className="relative shrink-0">
                <select
                  value={inquiry.status}
                  onChange={handleStatusChange}
                  disabled={updatingStatus}
                  className={`appearance-none bg-[#08090C] border border-white/20 text-white text-xs font-bold rounded-xl ${isAr ? 'pr-3.5 pl-9' : 'pl-3.5 pr-9'} py-2 focus:outline-none focus:border-blue-500 cursor-pointer`}
                >
                  <option value="new">{isAr ? 'طلب جديد' : 'New Lead'}</option>
                  <option value="contacted">{isAr ? 'تم التواصل' : 'Contacted'}</option>
                  <option value="in_review">{isAr ? 'قيد المراجعة / العرض' : 'In Review / Proposal'}</option>
                  <option value="won">{isAr ? 'صفقة مؤكدة بنجاح' : 'Won / Deal Closed'}</option>
                  <option value="closed">{isAr ? 'مؤرشف / مغلق' : 'Archived / Closed'}</option>
                </select>
                <ChevronDown className={`w-4 h-4 text-zinc-400 pointer-events-none absolute ${isAr ? 'left-2.5' : 'right-2.5'} top-1/2 -translate-y-1/2`} />
              </div>
            </div>

            {/* Lead Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                </span>
                <span className="text-sm font-semibold text-white break-all">{inquiry.email}</span>
              </div>

              <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  {isAr ? 'رقم الهاتف' : 'Phone Number'}
                </span>
                <span className="text-sm font-semibold text-white">{inquiry.phone || (isAr ? 'غير مدرج' : 'Not provided')}</span>
              </div>

              <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  {isAr ? 'الشركة / المنظمة' : 'Company / Organization'}
                </span>
                <span className="text-sm font-semibold text-white">{inquiry.company || (isAr ? 'طلب فردي مباشر' : 'Direct individual')}</span>
              </div>

              <div className="bg-[#141721] border border-white/10 rounded-2xl p-4 space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  {isAr ? 'القطاع / نوع الاستفسار' : 'Sector / Inquiry Type'}
                </span>
                <span className="text-sm font-semibold text-sky-400 capitalize">
                  {inquiry.sector === 'hospitality' ? (isAr ? 'الضيافة والفنادق' : 'Hospitality')
                    : inquiry.sector === 'manufacturing' ? (isAr ? 'التصنيع والأخشاب' : 'Manufacturing')
                    : inquiry.sector === 'contracting' ? (isAr ? 'المقاولات والتشطيب' : 'Contracting')
                    : (isAr ? 'استفسار عام' : inquiry.sector || 'General')}
                </span>
              </div>
            </div>

            {/* Subject & Message Content */}
            <div className="bg-[#141721] border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                {isAr ? '// نص وموجز الاستفسار' : '// Inquiry Message & Brief'}
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
                  <span>{isAr ? 'ملاحظات وسجل نشاط فريق العمل' : 'Internal Staff Notes & Activity'}</span>
                </h3>
                <span className="text-xs font-mono text-zinc-500">
                  {inquiry.internal_notes?.length || 0} {isAr ? 'ملاحظة' : 'notes'}
                </span>
              </div>

              {/* Note Submission Form */}
              <form onSubmit={handleNoteSubmit} className="space-y-2">
                <textarea
                  rows={2}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder={isAr ? 'أضف ملاحظة داخلية أو تحديث متابعة للطلب…' : 'Add an internal note or communication update…'}
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submittingNote || !newNote.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submittingNote ? (isAr ? 'جارٍ الإضافة…' : 'Adding…') : (isAr ? 'إضافة ملاحظة' : 'Add Note')}</span>
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
                        <span className="font-mono">{new Date(note.createdAt).toLocaleString(isAr ? 'ar-SA' : 'en-US')}</span>
                      </div>
                      <p className="text-xs text-zinc-200 leading-relaxed">{note.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-zinc-500 italic">
                    {isAr ? 'لا توجد ملاحظات داخلية مسجلة لهذا الطلب حتى الآن.' : 'No internal notes added yet.'}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
