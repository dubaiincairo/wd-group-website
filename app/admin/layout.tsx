import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

export const metadata = {
  title: 'WD Group Admin Console',
  description: 'Enterprise administration and operations console for WD Group',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
