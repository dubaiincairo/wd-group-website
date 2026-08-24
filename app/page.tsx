import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import SectorsHub from '@/components/home/SectorsHub';
import HoldingSynergy from '@/components/home/HoldingSynergy';
import VisionMissionValues from '@/components/home/VisionMissionValues';
import CEOQuote from '@/components/home/CEOQuote';
import ContactCTA from '@/components/home/ContactCTA';
import SectionDivider from '@/components/layout/SectionDivider';

export default function Home() {
  return (
    <>
      {/* Section 1: Hero & Section 2: Statistics Bar */}
      <HeroSection />

      {/* Blueprint Architectural Divider */}
      <SectionDivider label="STRATEGIC SECTORS" />

      {/* Section 3: Strategic Sectors (Hospitality, Manufacturing, Contracting) */}
      <SectorsHub />

      {/* Blueprint Architectural Divider */}
      <SectionDivider label="VALUE CHAIN SYNERGY" />

      {/* Section 3.5: Integrated Holding Synergy & Lifecycle Value Chain */}
      <HoldingSynergy />

      {/* Blueprint Architectural Divider */}
      <SectionDivider label="GOVERNANCE & VISION" />

      {/* Section 4: Vision, Mission & Values */}
      <VisionMissionValues />

      {/* Section 5: CEO Quote & Governance */}
      <CEOQuote />

      {/* Section 6: Main Contact & Partnership CTA */}
      <ContactCTA />
    </>
  );
}
