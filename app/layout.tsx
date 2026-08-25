import type { Metadata } from 'next';
import { Inter, Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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
    <html lang="en" dir="ltr" className={`${inter.variable} ${notoKufi.variable}`}>
      <body className="bg-[#08090C] text-[#F8FAFC] min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
