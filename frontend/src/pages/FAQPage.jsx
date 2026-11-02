import React, { useEffect } from 'react';
import Header from '../components/Header';
import PageHero from '../components/PageHero';
import FAQSection from '../components/FAQSection';
import ClosingCTA from '../components/ClosingCTA';
import Footer from '../components/Footer';

const FAQPage = () => {
  useEffect(() => {
    document.title = 'Frequently Asked Questions | Flik Explorer';
  }, []);

  return (
    <div className="bg-[#0a0a0b] min-h-screen text-gray-200">
      <Header />
      <main>
        <PageHero
          breadcrumb="FAQ"
          badge="KNOWLEDGE BASE & ARCHITECTURAL SPECS"
          title="Frequently Asked Questions"
          subtitle="Everything developers, sales directors, and digital transformation leads need to know about deploying Flik Explorer across projects."
        />
        <FAQSection />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
