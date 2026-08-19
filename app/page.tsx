import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import SectorsHub from '@/components/home/SectorsHub';
import AboutGovernance from '@/components/home/AboutGovernance';
import ProjectsShowcase from '@/components/home/ProjectsShowcase';
import ESGInnovation from '@/components/home/ESGInnovation';
import InquiryPortal from '@/components/home/InquiryPortal';

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectorsHub />
      <AboutGovernance />
      <ProjectsShowcase />
      <ESGInnovation />
      <InquiryPortal />
    </>
  );
}
