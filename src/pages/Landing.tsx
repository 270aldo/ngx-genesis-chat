
import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureCards } from '@/components/landing/FeatureCards';
import { DemoSection } from '@/components/landing/DemoSection';
import { ParticleBackground } from '@/components/landing/ParticleBackground';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingFooter } from '@/components/landing/LandingFooter';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      <LandingHeader />
      <main>
        <HeroSection />
        <FeatureCards />
        <DemoSection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Landing;
