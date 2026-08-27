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
};

export default function MaintenancePage() {
  return <MaintenanceView />;
}
