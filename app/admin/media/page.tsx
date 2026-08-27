'use client';

import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Video, 
  FileText, 
  UploadCloud, 
  Trash2, 
  Copy, 
  ExternalLink, 
  Check, 
  RefreshCw, 
  Search, 
  Plus, 
  ChevronDown,
  Play,
  Eye,
  X,
  Sparkles,
  Info
} from 'lucide-react';
import MediaUploader from '@/components/admin/MediaUploader';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import AdminLoadingState from '@/components/admin/AdminLoadingState';
import { useToast } from '@/components/admin/ToastProvider';
import { useLanguage } from '@/context/LanguageContext';
import type { MediaMetaRecord } from '@/lib/admin/types';

export default function MediaLibraryAdminPage() {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [media, setMedia] = useState<MediaMetaRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [bucketFilter, setBucketFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [previewMedia, setPreviewMedia] = useState<MediaMetaRecord | null>(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const url = bucketFilter === 'all' ? '/api/admin/media' : `/api/admin/media?bucket=${bucketFilter}`;
      const res = await fetch(url);
      if (res.ok) {
        const d = await res.json();
        setMedia(d.media || []);
      }
    } catch (e) {
      console.error('Media fetch error:', e);
      showToast(isAr ? 'فشل تحميل ملفات الوسائط' : 'Failed to load media files', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [bucketFilter]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewMedia(null);
        setUploadModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast(isAr ? 'تم نسخ رابط الوسائط إلى الحافظة' : 'Asset URL copied to clipboard', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast(isAr ? 'تم حذف سجل الوسائط بنجاح' : 'Media record deleted', 'info');
        setMedia((prev) => prev.filter((m) => m.id !== id));
        if (previewMedia?.id === id) setPreviewMedia(null);
      }
    } catch (e) {
      showToast(isAr ? 'فشل حذف ملف الوسائط' : 'Failed to delete media', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredMedia = media.filter((m) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      m.file_name.toLowerCase().includes(q) ||
      (m.alt_text_en && m.alt_text_en.toLowerCase().includes(q)) ||
      (m.alt_text_ar && m.alt_text_ar.includes(q)) ||
      (m.tags && m.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{isAr ? 'مستودع التخزين السحابي' : 'CLOUD STORAGE REPOSITORY'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'مكتبة الوسائط والفيديوهات' : 'Media & Video Library'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr ? 'معاينة حية وتفاعلية للفيديوهات والصور والملفات المخزنة سحابياً.' : 'Interactive live video and image previews for all corporate cloud assets.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchMedia}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title={isAr ? 'تحديث الملفات' : 'Refresh assets'}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'رفع ملف جديد' : 'Upload New Asset'}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0F1117]/90 border border-white/10 rounded-2xl p-4">
        <div className="sm:col-span-2 relative">
          <Search className={`w-4 h-4 text-zinc-500 absolute ${isAr ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAr ? 'البحث باسم الملف أو الوصف التوضيحي…' : 'Search by file name, tag, or alt-text description…'}
            className={`w-full bg-[#08090C] border border-white/15 focus:border-blue-500 rounded-xl ${isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none`}
          />
        </div>

        <div className="relative">
          <select
            value={bucketFilter}
            onChange={(e) => setBucketFilter(e.target.value)}
            className={`w-full appearance-none bg-[#08090C] border border-white/15 text-white text-xs font-semibold rounded-xl ${isAr ? 'pr-3.5 pl-9' : 'pl-3.5 pr-9'} py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer`}
          >
            <option value="all">{isAr ? 'جميع وحدات التخزين' : 'All Storage Buckets'}</option>
            <option value="videos">{isAr ? 'الفيديوهات السينمائية (videos)' : 'Cinematic Videos (videos)'}</option>
            <option value="photos">{isAr ? 'الصور واللقطات (photos)' : 'Photos & Images (photos)'}</option>
            <option value="assets">{isAr ? 'المستندات والملفات (assets)' : 'PDFs & Documents (assets)'}</option>
          </select>
          <ChevronDown className={`w-4 h-4 text-zinc-400 pointer-events-none absolute ${isAr ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2`} />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <AdminLoadingState minHeight="min-h-[50vh]" message={isAr ? 'جارٍ تحميل وسائط التخزين السحابي والفيديوهات…' : 'Loading cloud media & video library…'} />
      ) : filteredMedia.length === 0 ? (
        <div className="p-12 text-center bg-[#0F1117]/90 border border-dashed border-white/10 rounded-3xl space-y-3">
          <UploadCloud className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-white">{isAr ? 'لا توجد وسائط مطابقة' : 'No assets found'}</h3>
          <p className="text-xs text-zinc-400">{isAr ? 'انقر على "رفع ملف جديد" لإضافة صور أو فيديوهات إلى التخزين السحابي.' : 'Click "Upload New Asset" to add photography or video to Supabase.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item) => {
            const isVideo = item.bucket_id === 'videos' || item.mime_type?.startsWith('video/') || item.file_url.endsWith('.mp4') || item.file_url.endsWith('.webm');
            const isDoc = item.bucket_id === 'assets' || item.mime_type?.includes('pdf') || item.file_url.endsWith('.pdf');

            return (
              <div 
                key={item.id}
                className="bg-[#0F1117]/90 border border-white/10 rounded-2xl overflow-hidden group shadow-lg flex flex-col justify-between hover:border-blue-500/50 hover:shadow-[0_0_24px_rgba(59,130,246,0.15)] transition-all duration-300"
              >
                {/* Visual Preview Container */}
                <div 
                  onClick={() => setPreviewMedia(item)}
                  className="relative aspect-video bg-black overflow-hidden flex items-center justify-center cursor-pointer select-none"
                >
                  {isVideo ? (
                    <>
                      {/* Dynamic Live Video Preview */}
                      <video
                        src={item.file_url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Hover Overlay Play Cue */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                          <Play className="w-4 h-4 fill-white translate-x-0.5" />
                        </div>
                      </div>

                      {/* Live Video Indicator Badge */}
                      <div className={`absolute bottom-2 ${isAr ? 'right-2' : 'left-2'} px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 flex items-center gap-1.5 text-[9px] font-mono text-sky-300 font-bold`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                        <span>{isAr ? 'فيديو حي' : 'LIVE VIDEO'}</span>
                      </div>
                    </>
                  ) : isDoc ? (
                    <div className="flex flex-col items-center gap-2 text-zinc-400 p-4 text-center">
                      <FileText className="w-10 h-10 text-blue-400" />
                      <span className="text-[10px] font-mono font-bold">{isAr ? 'مستند PDF' : 'PDF DOCUMENT'}</span>
                    </div>
                  ) : (
                    <>
                      <img
                        src={item.file_url}
                        alt={item.alt_text_en || item.file_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                        <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-200">
                          <Eye className="w-4 h-4" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Bucket Tag Badge */}
                  <span className={`absolute top-2 ${isAr ? 'left-2' : 'right-2'} text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 ${
                    isVideo ? 'text-sky-300 border-sky-500/30' : isDoc ? 'text-amber-300 border-amber-500/30' : 'text-emerald-300 border-emerald-500/30'
                  } uppercase`}>
                    {item.bucket_id}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white truncate" title={item.file_name}>
                      {item.file_name}
                    </p>

                    {item.alt_text_en && (
                      <p className="text-[11px] text-zinc-400 line-clamp-1">
                        EN: {item.alt_text_en}
                      </p>
                    )}

                    {item.alt_text_ar && (
                      <p className="text-[11px] text-zinc-400 line-clamp-1 font-arabic" dir="rtl">
                        AR: {item.alt_text_ar}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-1.5">
                    <button
                      onClick={() => handleCopyUrl(item.id, item.file_url)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-[11px] font-semibold transition-colors cursor-pointer"
                      title={isAr ? 'نسخ الرابط المباشر' : 'Copy CDN Link'}
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === item.id ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الرابط' : 'Copy URL')}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPreviewMedia(item)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        title={isAr ? 'معاينة كاملة' : 'Full Preview'}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                        title={isAr ? 'فتح في نافذة جديدة' : 'Open in new tab'}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => setDeletingId(item.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-500/20 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title={isAr ? 'حذف الملف' : 'Delete asset'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Full-Screen Interactive Media Inspection Modal */}
      {previewMedia && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setPreviewMedia(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#0F1117] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#08090C]">
              <div className="flex items-center gap-2.5 min-w-0 pr-4">
                <span className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
                  {previewMedia.bucket_id === 'videos' ? <Video className="w-4 h-4" /> : previewMedia.bucket_id === 'assets' ? <FileText className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate" title={previewMedia.file_name}>
                    {previewMedia.file_name}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    {previewMedia.bucket_id.toUpperCase()} · {(previewMedia.file_size ? (previewMedia.file_size / (1024 * 1024)).toFixed(2) : '—')} MB
                  </p>
                </div>
              </div>

              <button
                onClick={() => setPreviewMedia(null)}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Stage Media Viewer */}
            <div className="flex-1 bg-black/90 flex items-center justify-center p-4 overflow-hidden min-h-[300px] max-h-[55vh]">
              {previewMedia.bucket_id === 'videos' || previewMedia.mime_type?.startsWith('video/') || previewMedia.file_url.endsWith('.mp4') || previewMedia.file_url.endsWith('.webm') ? (
                <video
                  src={previewMedia.file_url}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[50vh] w-auto max-w-full rounded-xl shadow-2xl border border-white/10"
                />
              ) : previewMedia.bucket_id === 'assets' || previewMedia.file_url.endsWith('.pdf') ? (
                <div className="flex flex-col items-center gap-4 text-center p-8">
                  <FileText className="w-16 h-16 text-blue-400" />
                  <p className="text-sm font-semibold text-white">{previewMedia.file_name}</p>
                  <a
                    href={previewMedia.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-glow-blue"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{isAr ? 'فتح وتحميل المستند' : 'Open / Download Document'}</span>
                  </a>
                </div>
              ) : (
                <img
                  src={previewMedia.file_url}
                  alt={previewMedia.alt_text_en || previewMedia.file_name}
                  className="max-h-[50vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              )}
            </div>

            {/* Modal Footer & CDN Link Bar */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-[#08090C] space-y-3">
              {(previewMedia.alt_text_en || previewMedia.alt_text_ar) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {previewMedia.alt_text_en && (
                    <div className="bg-white/5 p-2 rounded-lg text-zinc-300">
                      <span className="font-bold text-zinc-400 font-mono text-[10px] block">EN DESCRIPTION:</span>
                      {previewMedia.alt_text_en}
                    </div>
                  )}
                  {previewMedia.alt_text_ar && (
                    <div className="bg-white/5 p-2 rounded-lg text-zinc-300 font-arabic" dir="rtl">
                      <span className="font-bold text-zinc-400 font-mono text-[10px] block">الوصف بالعربية:</span>
                      {previewMedia.alt_text_ar}
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex-1 min-w-0 bg-black/60 border border-white/10 px-3 py-2 rounded-xl text-xs font-mono text-zinc-300 truncate select-all">
                  {previewMedia.file_url}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopyUrl(previewMedia.id, previewMedia.file_url)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-glow-blue cursor-pointer"
                  >
                    {copiedId === previewMedia.id ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedId === previewMedia.id ? (isAr ? 'تم النسخ' : 'Copied!') : (isAr ? 'نسخ رابط CDN' : 'Copy CDN URL')}</span>
                  </button>

                  <a
                    href={previewMedia.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                    title={isAr ? 'فتح في علامة تبويب جديدة' : 'Open in new tab'}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <MediaUploader
            bucketId={bucketFilter === 'all' ? 'photos' : bucketFilter}
            onUploaded={() => {
              setUploadModalOpen(false);
              fetchMedia();
            }}
            onClose={() => setUploadModalOpen(false)}
          />
        </div>
      )}

      <ConfirmationModal
        isOpen={Boolean(deletingId)}
        title={isAr ? 'حذف سجل الوسائط' : 'Delete Media Record'}
        message={isAr ? 'هل أنت متأكد من رغبتك في حذف هذا الملف من سجل الوسائط؟' : 'Are you sure you want to delete this media metadata entry?'}
        confirmLabel={isAr ? 'حذف' : 'Delete'}
        onConfirm={() => deletingId && handleDelete(deletingId)}
        onClose={() => setDeletingId(null)}
      />

    </div>
  );
}
