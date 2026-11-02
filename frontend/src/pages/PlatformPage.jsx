import React, { useEffect } from 'react';
import Header from '../components/Header';
import PageHero from '../components/PageHero';
import PlatformSection from '../components/PlatformSection';
import TeamsSection from '../components/TeamsSection';
import DifferenceSection from '../components/DifferenceSection';
import ClosingCTA from '../components/ClosingCTA';
import Footer from '../components/Footer';

const PlatformPage = () => {
  useEffect(() => {
    document.title = 'Platform Architecture | Flik Explorer';
  }, []);

  return (
    <div className="bg-[#0a0a0b] min-h-screen text-gray-200">
      <Header />
      <main>
        <PageHero
          breadcrumb="Platform"
          badge="ENTERPRISE SALES PLATFORM"
          title="Beyond Visualization. A Live Decision Environment."
          subtitle="Flik Explore is not a rendering service. It is a real-time cloud platform where architecture, sales intelligence, and executive closing tools converge to accelerate project sell-through."
        />
        <PlatformSection />
        <TeamsSection />
        <DifferenceSection />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default PlatformPage;
