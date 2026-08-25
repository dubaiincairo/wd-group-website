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
  Filter,
  Plus,
  ChevronDown
} from 'lucide-react';
import MediaUploader from '@/components/admin/MediaUploader';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import { useToast } from '@/components/admin/ToastProvider';
import type { MediaMetaRecord } from '@/lib/admin/types';

export default function MediaLibraryAdminPage() {
  const { showToast } = useToast();
  const [media, setMedia] = useState<MediaMetaRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [bucketFilter, setBucketFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
      showToast('Failed to load media files', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [bucketFilter]);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Asset URL copied to clipboard', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Media record deleted', 'info');
        setMedia((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (e) {
      showToast('Failed to delete media', 'error');
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
            <span>CLOUD STORAGE REPOSITORY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Media Library & Assets
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Browse, upload, and tag high-resolution photography, videos, and PDF documents stored on Supabase.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchMedia}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Refresh assets"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Asset</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0F1117]/90 border border-white/10 rounded-2xl p-4">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by file name, tag, or alt-text description…"
            className="w-full bg-[#08090C] border border-white/15 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none"
          />
        </div>

        <div className="relative">
          <select
            value={bucketFilter}
            onChange={(e) => setBucketFilter(e.target.value)}
            className="w-full appearance-none bg-[#08090C] border border-white/15 text-white text-xs font-semibold rounded-xl pl-3.5 pr-9 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">All Storage Buckets</option>
            <option value="photos">Photos & Images (photos)</option>
            <option value="videos">Cinematic Videos (videos)</option>
            <option value="assets">PDFs & Documents (assets)</option>
          </select>
          <ChevronDown className="w-4 h-4 text-zinc-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="p-12 text-center text-zinc-500 font-mono">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-500 mb-2" />
          Loading media library…
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-12 text-center bg-[#0F1117]/90 border border-dashed border-white/10 rounded-3xl space-y-3">
          <UploadCloud className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No assets found</h3>
          <p className="text-xs text-zinc-400">Click &ldquo;Upload New Asset&rdquo; to add photography or video to Supabase.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item) => {
            const isVideo = item.bucket_id === 'videos' || item.mime_type?.startsWith('video/');
            const isDoc = item.bucket_id === 'assets' || item.mime_type?.includes('pdf');

            return (
              <div 
                key={item.id}
                className="bg-[#0F1117]/90 border border-white/10 rounded-2xl overflow-hidden group shadow-lg flex flex-col justify-between hover:border-blue-500/40 transition-all"
              >
                {/* Visual Preview */}
                <div className="relative aspect-video bg-black/50 overflow-hidden flex items-center justify-center">
                  {isVideo ? (
                    <div className="flex flex-col items-center gap-1.5 text-zinc-400">
                      <Video className="w-8 h-8 text-sky-400" />
                      <span className="text-[10px] font-mono">VIDEO ASSET</span>
                    </div>
                  ) : isDoc ? (
                    <div className="flex flex-col items-center gap-1.5 text-zinc-400">
                      <FileText className="w-8 h-8 text-blue-400" />
                      <span className="text-[10px] font-mono">PDF DOCUMENT</span>
                    </div>
                  ) : (
                    <img
                      src={item.file_url}
                      alt={item.alt_text_en || item.file_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  )}

                  <span className="absolute top-2 left-2 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/70 border border-white/15 text-zinc-300 uppercase">
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
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] font-semibold transition-colors"
                      title="Copy CDN Link"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                        title="Open asset"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => setDeletingId(item.id)}
                        className="p-1 rounded-lg hover:bg-rose-500/20 text-zinc-500 hover:text-rose-400 transition-colors"
                        title="Delete asset"
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

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <MediaUploader
            bucketId="photos"
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
        title="Delete Media Record"
        message="Are you sure you want to delete this media metadata entry? (Files in storage must be deleted from storage if no longer used)."
        confirmLabel="Delete"
        onConfirm={() => deletingId && handleDelete(deletingId)}
        onClose={() => setDeletingId(null)}
      />

    </div>
  );
}
