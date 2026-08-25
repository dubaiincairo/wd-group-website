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
      <div className="min-h-screen bg-[#08090C] text-white flex flex-col lg:flex-row font-sans selection:bg-blue-600 selection:text-white relative">
        
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
