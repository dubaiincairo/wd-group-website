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
  const [isTestDomain, setIsTestDomain] = useState(false);
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

    // Check if visitor has an active admin bypass session, or is on a test/staging/preview domain
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname.toLowerCase();
      const isStaging = 
        hostname.startsWith('test.') ||
        hostname.startsWith('staging.') ||
        hostname.startsWith('dev.') ||
        hostname.startsWith('preview.') ||
        hostname.includes('test.wdgroup') ||
        hostname.endsWith('.vercel.app') ||
        hostname === 'localhost' ||
        hostname === '127.0.0.1';

      if (isStaging) {
        setIsTestDomain(true);
        setIsAdminBypassed(true);
      }

      const cookies = document.cookie || '';
      const hasAdminCookie = 
        cookies.includes('wdgroup_admin_session') || 
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

  // 3. If maintenance mode is active and user is NOT on test domain / authorized admin bypass
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

  // 5. Normal public browsing OR Staging/Admin Preview
  return (
    <>
      {isMaintenanceActive && isAdminBypassed && !isTestDomain && (
        <div className="bg-amber-500 text-black px-4 py-1.5 text-[11px] font-mono font-bold text-center relative z-40 shadow-sm flex items-center justify-center gap-2">
          <span>⚠️ MAINTENANCE MODE IS ACTIVE ON LIVE SITE — YOU ARE VIEWING ADMIN PREVIEW</span>
        </div>
      )}
      <div>
        {children}
      </div>
    </>
  );
}
