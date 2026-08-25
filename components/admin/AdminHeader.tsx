'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Menu, 
  Search, 
  Globe, 
  LogOut, 
  User, 
  Shield, 
  ChevronDown, 
  Bell,
  Activity,
  CheckCircle2
} from 'lucide-react';
import type { AdminRole } from '@/lib/admin/types';
import { useToast } from './ToastProvider';

interface AdminHeaderProps {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: AdminRole;
  } | null;
  onOpenMobileSidebar: () => void;
}

export default function AdminHeader({ user, onOpenMobileSidebar }: AdminHeaderProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const res = await fetch('/api/admin/auth/logout', { method: 'POST' });
      if (res.ok) {
        showToast('Logged out successfully', 'info');
        router.push('/admin/login');
      }
    } catch (e) {
      console.error('Logout error:', e);
      router.push('/admin/login');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#08090C]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
          <span className="font-mono text-blue-400">WD GROUP</span>
          <span>/</span>
          <span className="font-semibold text-white">Operations Platform</span>
        </div>
      </div>

      {/* Right: Quick Actions & User Profile */}
      <div className="flex items-center gap-3">
        
        {/* System Health Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>System Healthy</span>
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all"
            aria-expanded={userMenuOpen}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-white block leading-tight">
                {user?.fullName || 'Administrator'}
              </span>
              <span className="text-[10px] font-mono text-sky-400 uppercase block">
                {user?.role || 'Admin'}
              </span>
            </div>
            <ChevronDown className={`hidden sm:block w-3.5 h-3.5 text-zinc-400 transition-transform ${userMenuOpen ? 'rotate-180 text-white' : ''}`} />
          </button>

          {/* User Dropdown */}
          {userMenuOpen && (
            <div 
              className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-64 bg-[#0F1117] border border-white/15 rounded-2xl p-2 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50 text-white"
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <div className="p-3 border-b border-white/10 space-y-0.5">
                <p className="text-xs font-bold text-white">{user?.fullName}</p>
                <p className="text-[11px] text-zinc-400 truncate">{user?.email}</p>
              </div>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>{loggingOut ? 'Signing out…' : 'Sign Out'}</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}
