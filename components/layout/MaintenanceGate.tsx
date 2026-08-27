'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MaintenanceView from './MaintenanceView';
import AdminLoadingState from '@/components/admin/AdminLoadingState';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteSettings } from '@/lib/admin/types';

interface MaintenanceGateProps {
  children: React.ReactNode;
}

export default function MaintenanceGate({ children }: MaintenanceGateProps) {
  const pathname = usePathname();
  const { dynamicContent } = useLanguage();
  
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isAdminBypassed, setIsAdminBypassed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Admin routes, login, API endpoints, and static assets are always exempt
  const isAdminRoute = 
    pathname?.startsWith('/admin') || 
    pathname?.startsWith('/api/') || 
    pathname?.startsWith('/site-access');

  useEffect(() => {
    if (isAdminRoute) {
      setLoading(false);
      return;
    }

    // Check if visitor has an active admin bypass session (logged-in admin or preview token)
    if (typeof window !== 'undefined') {
      const cookies = document.cookie || '';
      const hasAdminCookie = 
        cookies.includes('wd_admin_session') || 
        cookies.includes('wd_session') || 
        cookies.includes('wd_admin_bypass');
      
      const searchParams = new URLSearchParams(window.location.search);
      const hasPreviewQuery = searchParams.get('preview') === 'admin' || searchParams.get('bypass') === 'true';

      if (hasAdminCookie || hasPreviewQuery) {
        setIsAdminBypassed(true);
      }
    }

    async function checkMaintenanceStatus() {
      try {
        const res = await fetch('/api/settings/public', { cache: 'no-store' });
        if (res.ok) {
          const d = await res.json();
          setSettings(d.settings || null);
        }
      } catch {
        // Fallback to dynamicContent
        if (dynamicContent?.settings) {
          setSettings(dynamicContent.settings as SiteSettings);
        }
      } finally {
        setLoading(false);
      }
    }

    checkMaintenanceStatus();
  }, [isAdminRoute, dynamicContent]);

  // 1. Admin routes are never blocked
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // 2. Determine active maintenance state from API settings or Context
  const activeSettings = settings || (dynamicContent?.settings as SiteSettings | undefined);
  const isMaintenanceActive = activeSettings?.maintenance_mode_enabled ?? true;

  // 3. If maintenance mode is active and user is NOT an authorized admin bypass
  if (isMaintenanceActive && !isAdminBypassed) {
    return <MaintenanceView settings={activeSettings} />;
  }

  // 4. If loading while maintenance is potentially active, show luxury holding loader (never leak full website)
  if (loading && !isAdminBypassed) {
    return (
      <div className="min-h-screen bg-[#08090C] text-white flex items-center justify-center">
        <AdminLoadingState minHeight="min-h-screen" />
      </div>
    );
  }

  // 5. Normal public browsing OR Admin Preview
  return (
    <>
      {isMaintenanceActive && isAdminBypassed && (
        <div className="bg-amber-500/90 text-black px-4 py-1.5 text-xs font-mono font-bold text-center fixed top-0 inset-x-0 z-[99999] shadow-lg flex items-center justify-center gap-2">
          <span>⚠️ MAINTENANCE MODE IS ACTIVE ON LIVE SITE — YOU ARE VIEWING ADMIN PREVIEW</span>
        </div>
      )}
      <div className={isMaintenanceActive && isAdminBypassed ? 'pt-8' : ''}>
        {children}
      </div>
    </>
  );
}
