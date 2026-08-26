import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import SectorsHub from '@/components/home/SectorsHub';
import BrandPortfolio from '@/components/home/BrandPortfolio';
import HoldingSynergy from '@/components/home/HoldingSynergy';
import VisionMissionValues from '@/components/home/VisionMissionValues';
import CEOQuote from '@/components/home/CEOQuote';
import ContactCTA from '@/components/home/ContactCTA';

export default function Home() {
  return (
    <>
      {/* Section 1: Hero & Section 2: Statistics Bar */}
      <HeroSection />

      {/* Section 3: Strategic Sectors (Hospitality, Manufacturing, Contracting) */}
      <SectorsHub />

      {/* Section 3.2: Portfolio Brands Owned (SwissBlue, Vinas, Tulip, WatanDesign, GreenWood) */}
      <BrandPortfolio />

      {/* Section 3.5: Integrated Holding Synergy & Lifecycle Value Chain */}
      <HoldingSynergy />

      {/* Section 4: Vision, Mission & Values */}
      <VisionMissionValues />

      {/* Section 5: CEO Quote & Governance */}
      <CEOQuote />

      {/* Section 6: Main Contact & Partnership CTA */}
      <ContactCTA />
    </>
  );
}
