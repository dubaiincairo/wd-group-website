'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MaintenanceView from './MaintenanceView';
import type { SiteSettings } from '@/lib/admin/types';

interface MaintenanceGateProps {
  children: React.ReactNode;
}

export default function MaintenanceGate({ children }: MaintenanceGateProps) {
  const pathname = usePathname();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Admin routes and login are always exempt from maintenance mode
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/api/admin');

  useEffect(() => {
    if (isAdminRoute) {
      setLoading(false);
      return;
    }

    async function checkMaintenanceStatus() {
      try {
        const res = await fetch('/api/settings/public');
        if (res.ok) {
          const d = await res.json();
          setSettings(d.settings || null);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    }

    checkMaintenanceStatus();
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return <>{children}</>;
  }

  // If maintenance mode is enabled in global settings, render the maintenance view
  if (settings && settings.maintenance_mode_enabled) {
    return <MaintenanceView settings={settings} />;
  }

  return <>{children}</>;
}
