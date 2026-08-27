import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Noto_Kufi_Arabic, Playfair_Display, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ToastProvider } from '@/components/admin/ToastProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LiveEditorDock from '@/components/live-editor/LiveEditorDock';

import MaintenanceGate from '@/components/layout/MaintenanceGate';
import DynamicHeadSEO from '@/components/seo/DynamicHeadSEO';
import WebsitePreloader from '@/components/layout/WebsitePreloader';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-kufi',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const ibmMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'WD Group | Holding Company — Hospitality, Manufacturing, Contracting',
  description: 'WD Group is a premier Saudi holding company powering strategic investments across Hospitality (SwissBlue Hotels), Industrial Manufacturing, and General Contracting.',
  keywords: ['WD Group', 'Holding Company', 'Hospitality', 'Manufacturing', 'Contracting', 'SwissBlue', 'Saudi Arabia', 'Vision 2030'],
  openGraph: {
    title: 'WD Group | Holding Company',
    description: 'Premier holding company operating across Hospitality, Precision Manufacturing, and General Contracting.',
    siteName: 'WD Group Holding',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${notoKufi.variable} ${playfair.variable} ${ibmMono.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FVBW70B8H5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FVBW70B8H5');
          `}
        </Script>
      </head>
      <body className="bg-[#08090C] text-[#F8FAFC] min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
        <LanguageProvider>
          <WebsitePreloader />
          <DynamicHeadSEO />
          <ToastProvider>
            <MaintenanceGate>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <LiveEditorDock />
            </MaintenanceGate>
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
