import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Noto_Kufi_Arabic, Playfair_Display, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ToastProvider } from '@/components/admin/ToastProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import dynamic from 'next/dynamic';
import MaintenanceGate from '@/components/layout/MaintenanceGate';
import DynamicHeadSEO from '@/components/seo/DynamicHeadSEO';
import WebsitePreloader from '@/components/layout/WebsitePreloader';

const LiveEditorDock = dynamic(
  () => import('@/components/live-editor/LiveEditorDock'),
  { ssr: false }
);

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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/brand/wd-group-logo-white.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
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
          <DynamicHeadSEO />
          <ToastProvider>
            <MaintenanceGate>
              <WebsitePreloader />
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
