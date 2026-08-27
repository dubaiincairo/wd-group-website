'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
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
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

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
    return <div className="min-h-screen bg-[#08090C]" />;
  }

  return (
    <ToastProvider>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang} className="min-h-screen bg-[#08090C] text-white flex flex-col lg:flex-row font-sans selection:bg-blue-600 selection:text-white relative">
        
        {/* Lightweight High-Performance Luxury Dark Backdrop */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-radial from-[#C9A86A]/5 via-blue-600/5 to-transparent blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-radial from-blue-500/5 via-[#C9A86A]/5 to-transparent blur-[100px]" />
          <div className="absolute inset-0 bg-dot-matrix opacity-15" />
        </div>

        {/* Sidebar */}
        <AdminSidebar
          userRole={user?.role}
          isMobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative z-10">
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
