import React, { useEffect } from 'react';
import Header from '../components/Header';
import PageHero from '../components/PageHero';
import IntelligenceSection from '../components/IntelligenceSection';
import MetricsSection from '../components/MetricsSection';
import ClosingCTA from '../components/ClosingCTA';
import Footer from '../components/Footer';

const IntelligencePage = () => {
  useEffect(() => {
    document.title = 'Sales Intelligence & Telemetry | Flik Explorer';
  }, []);

  return (
    <div className="bg-[#0a0a0b] min-h-screen text-gray-200">
      <Header />
      <main>
        <PageHero
          breadcrumb="Intelligence"
          badge="BUYER TELEMETRY & CLOSING INTELLIGENCE"
          title="Turn Attention Into Data. Data Into Closed Units."
          subtitle="See what buyers see in real time. Track which units are explored, how long buyers linger on specific balconies or finishes, and sync high-intent lead scores directly into your CRM."
        />
        <IntelligenceSection />
        <MetricsSection />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default IntelligencePage;
