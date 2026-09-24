import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Noto_Kufi_Arabic, Playfair_Display, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ToastProvider } from '@/components/admin/ToastProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import dynamicComponent from 'next/dynamic';
import MaintenanceGate from '@/components/layout/MaintenanceGate';
import DynamicHeadSEO from '@/components/seo/DynamicHeadSEO';
import WebsitePreloader from '@/components/layout/WebsitePreloader';
import { getSiteContent } from '@/lib/admin/db';
import { headers, cookies } from 'next/headers';

const LiveEditorDock = dynamicComponent(
  () => import('@/components/live-editor/LiveEditorDock'),
  { ssr: false }
);

const ChatKitLauncher = dynamicComponent(
  () => import('@/components/chat/ChatKitLauncher'),
  { ssr: false }
);

const WhatsAppServiceWidget = dynamicComponent(
  () => import('@/components/whatsapp/WhatsAppServiceWidget'),
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wdgroup.online';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'WD Group | Holding Company — Hospitality, Manufacturing, Contracting',
  description: 'WD Group is a premier Saudi holding company powering strategic investments across Hospitality (SwissBlue Hotels), Industrial Manufacturing, and General Contracting.',
  keywords: ['WD Group', 'Holding Company', 'Hospitality', 'Manufacturing', 'Contracting', 'SwissBlue', 'Saudi Arabia', 'Vision 2030'],
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'WD Group | Holding Company',
    description: 'Premier holding company operating across Hospitality, Precision Manufacturing, and General Contracting.',
    siteName: 'WD Group Holding',
    url: siteUrl,
    locale: 'en_US',
    type: 'website',
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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialContent = await getSiteContent();
  const headerList = headers();
  const localeHeader = headerList.get('x-locale');
  const internalPath = headerList.get('x-internal-path') || '';
  const cleanPath = internalPath === '/' ? '' : internalPath;
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('wd_lang')?.value;
  const currentLang: 'ar' | 'en' = (localeHeader === 'en' || (!localeHeader && localeCookie === 'en')) ? 'en' : 'ar';
  const currentDir = currentLang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={currentLang} dir={currentDir} className={`${inter.variable} ${notoKufi.variable} ${playfair.variable} ${ibmMono.variable}`}>
      <head>
        <link rel="alternate" hrefLang="ar" href={`${siteUrl}/ar${cleanPath}`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${cleanPath}`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/ar${cleanPath}`} />
        <link rel="canonical" href={`${siteUrl}/${currentLang}${cleanPath}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var p = window.location.pathname;
                  var detectedLang = '${currentLang}';
                  if (p.startsWith('/en')) detectedLang = 'en';
                  else if (p.startsWith('/ar')) detectedLang = 'ar';
                  document.documentElement.lang = detectedLang;
                  document.documentElement.dir = detectedLang === 'ar' ? 'rtl' : 'ltr';
                  localStorage.setItem('wd_lang', detectedLang);
                  var cached = localStorage.getItem('wd_content_cache');
                  if (cached) {
                    window.__WD_INITIAL_CONTENT__ = JSON.parse(cached);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
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
        {/* OpenAI ChatKit Official CDN Script */}
        <Script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="lazyOnload"
        />
      </head>
      <body className="bg-[#08090C] text-[#F8FAFC] min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
        <LanguageProvider initialContent={initialContent} initialLocale={currentLang}>
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
              <ChatKitLauncher />
              <WhatsAppServiceWidget />
            </MaintenanceGate>
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
