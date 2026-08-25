'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RefreshCw, 
  UserCheck, 
  X,
  Lock,
  Mail,
  User
} from 'lucide-react';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import { useToast } from '@/components/admin/ToastProvider';
import type { AdminUser, AdminRole } from '@/lib/admin/types';

export default function StaffUsersAdminPage() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  // User modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<AdminUser> & { password?: string } | null>(null);
  const [savingUser, setSavingUser] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const d = await res.json();
        setUsers(d.users || []);
      }
    } catch (e) {
      console.error('Users fetch error:', e);
      showToast('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenCreate = () => {
    setEditingUser({
      email: '',
      full_name: '',
      role: 'editor',
      is_active: true,
      password: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setEditingUser({ ...user, password: '' });
    setModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser || !editingUser.email || !editingUser.full_name) {
      showToast('Email and Full Name are required', 'error');
      return;
    }

    if (!editingUser.id && (!editingUser.password || editingUser.password.length < 8)) {
      showToast('Password must be at least 8 characters long for new users', 'error');
      return;
    }

    try {
      setSavingUser(true);
      const isEdit = Boolean(editingUser.id);
      const url = isEdit ? `/api/admin/users/${editingUser.id}` : '/api/admin/users';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to save staff account');
      }

      showToast(isEdit ? 'Staff profile updated' : 'New staff member added', 'success');
      setModalOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (err: any) {
      showToast(err.message || 'Error saving user', 'error');
    } finally {
      setSavingUser(false);
    }
  };

  const handleToggleActive = async (user: AdminUser) => {
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !user.is_active }),
      });
      if (res.ok) {
        showToast(user.is_active ? 'User account deactivated' : 'User account activated', 'info');
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, is_active: !u.is_active } : u)));
      }
    } catch (e) {
      showToast('Failed to toggle status', 'error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ROLE-BASED ACCESS CONTROL</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Staff & Permissions
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage administrator accounts, roles (Owner, Admin, Editor, CRM, HR, Viewer), and access security.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchUsers}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Refresh staff"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/40 border-b border-white/10 text-zinc-400 font-mono">
            <tr>
              <th className="py-4 px-6 font-semibold">Staff Member</th>
              <th className="py-4 px-4 font-semibold">Email</th>
              <th className="py-4 px-4 font-semibold">Assigned Role</th>
              <th className="py-4 px-4 font-semibold">Status</th>
              <th className="py-4 px-4 font-semibold">Last Login</th>
              <th className="py-4 px-6 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-500 font-mono">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-500 mb-2" />
                  Loading accounts…
                </td>
              </tr>
            ) : users.map((user) => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                      {user.full_name.charAt(0)}
                    </div>
                    <span className="font-bold text-white">{user.full_name}</span>
                  </div>
                </td>

                <td className="py-4 px-4 font-mono text-zinc-300">
                  {user.email}
                </td>

                <td className="py-4 px-4">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border bg-blue-500/20 text-blue-300 border-blue-500/40 uppercase">
                    {user.role}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    user.is_active 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}>
                    {user.is_active ? 'ACTIVE' : 'DEACTIVATED'}
                  </span>
                </td>

                <td className="py-4 px-4 text-zinc-500 font-mono text-[11px]">
                  {user.last_login_at ? new Date(user.last_login_at).toLocaleString('en-US') : 'Never logged in'}
                </td>

                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleToggleActive(user)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] font-semibold"
                    >
                      {user.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleOpenEdit(user)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white text-zinc-400 transition-colors"
                      title="Edit user"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0F1117] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {editingUser.id ? 'Edit Staff Account' : 'New Staff Account'}
                </h3>
                <p className="text-xs text-zinc-400">Configure role authorities and credentials</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingUser.full_name || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, full_name: e.target.value })}
                  placeholder="e.g. Eng. Khalid Al-Otaibi"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">Email Address *</label>
                <input
                  type="email"
                  required
                  value={editingUser.email || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  placeholder="name@wdgroup.sa"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">
                  {editingUser.id ? 'Change Password (leave blank to keep current)' : 'Password * (min 8 chars)'}
                </label>
                <input
                  type="password"
                  value={editingUser.password || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">Role & Access Level</label>
                <select
                  value={editingUser.role || 'editor'}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as AdminRole })}
                  className="w-full bg-[#08090C] border border-white/15 text-white text-xs font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="owner">Owner (Full System Access)</option>
                  <option value="admin">Administrator (Operations & Staff)</option>
                  <option value="editor">Content Editor (CMS & Media)</option>
                  <option value="crm">CRM Specialist (Leads & Inquiries)</option>
                  <option value="hr">HR / Recruiter (Careers & ATS)</option>
                  <option value="viewer">Viewer / Auditor (Read Only)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={savingUser}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingUser}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-glow-blue disabled:opacity-50"
                >
                  {savingUser ? 'Saving…' : 'Save Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
