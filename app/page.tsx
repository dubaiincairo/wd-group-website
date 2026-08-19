import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import SectorsHub from '@/components/home/SectorsHub';
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

      {/* Section 4: Vision, Mission & Values */}
      <VisionMissionValues />

      {/* Section 5: CEO Quote */}
      <CEOQuote />

      {/* Section 6: Main Contact & Partnership CTA */}
      <ContactCTA />
    </>
  );
}
