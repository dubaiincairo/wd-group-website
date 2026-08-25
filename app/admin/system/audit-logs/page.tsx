'use client';

import React, { useState, useEffect } from 'react';
import { Lock, RefreshCw, Search, Shield, Clock } from 'lucide-react';
import { useToast } from '@/components/admin/ToastProvider';
import type { AuditLogEntry } from '@/lib/admin/types';

export default function AuditLogsAdminPage() {
  const { showToast } = useToast();
  const [logs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/audit-logs?limit=100');
      if (res.ok) {
        const d = await res.json();
        setAuditLogs(d.logs || []);
      }
    } catch (e) {
      console.error('Audit logs fetch error:', e);
      showToast('Failed to load audit logs', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((l) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      l.actor_email.toLowerCase().includes(q) ||
      l.action.toLowerCase().includes(q) ||
      l.resource_type.toLowerCase().includes(q) ||
      (l.ip_address && l.ip_address.includes(q))
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>IMMUTABLE AUDIT TRAIL</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Security & Activity Audit
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Complete chronological record of administrative logins, content mutations, and data operations.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
          title="Refresh logs"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative bg-[#0F1117]/90 border border-white/10 rounded-2xl p-4">
        <Search className="w-4 h-4 text-zinc-500 absolute left-7 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by actor email, action, resource, or IP address…"
          className="w-full bg-[#08090C] border border-white/15 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none"
        />
      </div>

      {/* Audit Logs Table */}
      <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 border-b border-white/10 text-zinc-400 font-mono">
            <tr>
              <th className="py-4 px-6 font-semibold">Timestamp</th>
              <th className="py-4 px-4 font-semibold">Actor</th>
              <th className="py-4 px-4 font-semibold">Action</th>
              <th className="py-4 px-4 font-semibold">Resource</th>
              <th className="py-4 px-4 font-semibold">IP Address</th>
              <th className="py-4 px-6 font-semibold">Metadata</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-500">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-500 mb-2" />
                  Loading audit stream…
                </td>
              </tr>
            ) : filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-500 font-sans">
                  No audit events matching criteria.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-6 text-zinc-400 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString('en-US')}
                  </td>

                  <td className="py-3.5 px-4 text-white font-semibold">
                    {log.actor_email}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-sky-300 font-bold bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
                      {log.action}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-zinc-300">
                    {log.resource_type} {log.resource_id ? `#${log.resource_id.substring(0, 8)}` : ''}
                  </td>

                  <td className="py-3.5 px-4 text-zinc-500">
                    {log.ip_address || '0.0.0.0'}
                  </td>

                  <td className="py-3.5 px-6 text-zinc-400 truncate max-w-xs font-sans text-[11px]">
                    {log.details ? JSON.stringify(log.details) : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
