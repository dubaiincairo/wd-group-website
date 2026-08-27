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
    const logoSrc = isAr ? '/brand/wd-group-logo-ar-white.png' : '/brand/wd-group-logo-white.png';
    const logoAlt = isAr ? 'مجموعة دبليو دي للأعمال' : 'WD Group';

    return (
      <div 
        dir={isAr ? 'rtl' : 'ltr'} 
        lang={lang} 
        className="min-h-screen bg-[#08090C] text-white flex flex-col items-center justify-center relative overflow-hidden select-none px-4 text-center"
      >
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-radial from-[#C9A86A]/15 via-blue-600/10 to-transparent blur-[120px] pointer-events-none" />
        
        {/* Real Brand Logo */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className={`relative h-14 sm:h-16 ${isAr ? 'w-56 sm:w-64' : 'w-48 sm:w-56'} animate-pulse`}>
            <Image 
              src={logoSrc} 
              alt={logoAlt} 
              fill 
              className="object-contain drop-shadow-[0_0_20px_rgba(201,168,106,0.35)]"
              priority
            />
          </div>
        </div>

        {/* Corporate Status */}
        <div className="space-y-1">
          <p className="text-xs font-mono text-zinc-300 font-semibold tracking-wider">
            {isAr ? 'جارٍ تحميل لوحة التحكم وإدارة المنظومة…' : 'INITIALIZING SECURE ADMIN CONSOLE…'}
          </p>
          <p className="text-[11px] font-mono text-[#C9A86A]/80">
            {isAr ? 'مجموعة دبليو دي للأعمال' : 'WD GROUP HOLDING'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang} className="min-h-screen bg-[#08090C] text-white flex flex-col lg:flex-row font-sans selection:bg-blue-600 selection:text-white relative">
        
        {/* Background Video Backdrop with Hero Section Overlay Style */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="https://cdn.sanity.io/images/uoj8zwj3/production/00b20cc6cb3d8c613964965da5556e8396305950-2400x1792.jpg"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          >
            <source src="/videos/hospitality.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090C]/90 via-[#08090C]/80 to-[#08090C]/95 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-dot-matrix opacity-25" />
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
