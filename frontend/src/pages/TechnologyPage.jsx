import React, { useEffect } from 'react';
import Header from '../components/Header';
import PageHero from '../components/PageHero';
import TechnologySection from '../components/TechnologySection';
import ClosingCTA from '../components/ClosingCTA';
import Footer from '../components/Footer';

const TechnologyPage = () => {
  useEffect(() => {
    document.title = 'Enterprise Technology Ecosystem | Flik Explorer';
  }, []);

  return (
    <div className="bg-[#0a0a0b] min-h-screen text-gray-200">
      <Header />
      <main>
        <PageHero
          breadcrumb="Technology"
          badge="ARCHITECTURAL COMPUTING · 14 PROTOCOLS"
          title="Built on the Bleeding Edge of Real-Time 3D."
          subtitle="Direct Unreal Engine 5, NVIDIA RTX neural cloud streaming, Cesium 3D geospatial tiles, and hardware-accelerated WebXR delivering sub-50ms glass-to-glass latency across any device."
        />
        {/* TechnologySection internally includes the NVIDIA Inception credibility row, capabilities, architecture diagram, and the full TechStackShowcase */}
        <TechnologySection />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default TechnologyPage;
