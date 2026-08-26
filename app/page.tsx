import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import SectorsHub from '@/components/home/SectorsHub';
import BrandPortfolio from '@/components/home/BrandPortfolio';
import HoldingSynergy from '@/components/home/HoldingSynergy';
import VisionMissionValues from '@/components/home/VisionMissionValues';
import CEOQuote from '@/components/home/CEOQuote';
import ContactCTA from '@/components/home/ContactCTA';
import BrandedSeparator from '@/components/ui/BrandedSeparator';

export default function Home() {
  return (
    <>
      {/* Section 1: Hero & Statistics Bar */}
      <HeroSection />

      <BrandedSeparator variant="gold" />

      {/* Section 2: Strategic Sectors (Hospitality, Manufacturing, Contracting) */}
      <SectorsHub />

      <BrandedSeparator variant="gold" />

      {/* Section 3: Portfolio Brands Owned (SwissBlue, Vinas, Tulip, WatanDesign, GreenWood) */}
      <BrandPortfolio />

      <BrandedSeparator variant="gold" />

      {/* Section 4: Integrated Holding Synergy & Lifecycle Value Chain */}
      <HoldingSynergy />

      <BrandedSeparator variant="gold" />

      {/* Section 5: Vision, Mission & Values */}
      <VisionMissionValues />

      <BrandedSeparator variant="gold" />

      {/* Section 6: CEO Quote & Governance */}
      <CEOQuote />

      <BrandedSeparator variant="gold" />

      {/* Section 7: Main Contact & Partnership CTA */}
      <ContactCTA />
    </>
  );
}
