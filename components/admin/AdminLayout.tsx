'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { ToastProvider } from './ToastProvider';
import type { AdminRole } from '@/lib/admin/types';

interface SessionUserState {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<SessionUserState | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login' || pathname.startsWith('/admin/login/');

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function fetchSession() {
      try {
        const res = await fetch('/api/admin/auth/session');
        if (!res.ok) {
          router.push('/admin/login');
          return;
        }
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          router.push('/admin/login');
        }
      } catch (err) {
        console.error('Session fetch error:', err);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return (
      <ToastProvider>
        <div className="min-h-screen bg-[#040507] text-white selection:bg-blue-600 selection:text-white">
          {children}
        </div>
      </ToastProvider>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08090C] flex flex-col items-center justify-center space-y-4">
        <div className="relative h-12 w-44 animate-pulse">
          <Image 
            src="/brand/wd-group-logo-white.png" 
            alt="WD Group" 
            fill 
            className="object-contain"
            priority
          />
        </div>
        <p className="text-xs font-mono text-zinc-400">Loading secure admin environment…</p>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#08090C] text-white flex flex-col lg:flex-row font-sans selection:bg-blue-600 selection:text-white">
        
        {/* Sidebar */}
        <AdminSidebar
          userRole={user?.role}
          isMobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader
            user={user}
            onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
            {children}
          </main>
        </div>

      </div>
    </ToastProvider>
  );
}
