import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import SectorsHub from '@/components/home/SectorsHub';
import BrandPortfolio from '@/components/home/BrandPortfolio';
import HoldingSynergy from '@/components/home/HoldingSynergy';
import VisionMissionValues from '@/components/home/VisionMissionValues';
import CEOQuote from '@/components/home/CEOQuote';
import ContactCTA from '@/components/home/ContactCTA';
import SectionDivider from '@/components/layout/SectionDivider';

export default function Home() {
  return (
    <>
      {/* Section 1: Hero & Statistics Bar */}
      <HeroSection />

      <SectionDivider label="STRATEGIC SECTORS" />

      {/* Section 2: Strategic Sectors (Hospitality, Manufacturing, Contracting) */}
      <SectorsHub />

      <SectionDivider label="PORTFOLIO BRANDS" />

      {/* Section 3: Portfolio Brands Owned (SwissBlue, Vinas, Tulip, WatanDesign, GreenWood) */}
      <BrandPortfolio />

      <SectionDivider label="HOLDING SYNERGY" />

      {/* Section 4: Integrated Holding Synergy & Lifecycle Value Chain */}
      <HoldingSynergy />

      <SectionDivider label="VISION & VALUES" />

      {/* Section 5: Vision, Mission & Values */}
      <VisionMissionValues />

      <SectionDivider label="EXECUTIVE GOVERNANCE" />

      {/* Section 6: CEO Quote & Governance */}
      <CEOQuote />

      <SectionDivider label="PARTNERSHIP & INQUIRIES" />

      {/* Section 7: Main Contact & Partnership CTA */}
      <ContactCTA />
    </>
  );
}
