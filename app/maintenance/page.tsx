import React from 'react';
import type { Metadata } from 'next';
import MaintenanceView from '@/components/layout/MaintenanceView';

export const metadata: Metadata = {
  title: 'Under Scheduled Maintenance | WD Group for Business',
  description: 'WD Group for Business official digital portal maintenance and upgrade.',
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function MaintenancePage() {
  return <MaintenanceView />;
}
