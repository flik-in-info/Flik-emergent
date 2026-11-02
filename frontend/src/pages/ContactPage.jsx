import React, { useEffect } from 'react';
import Header from '../components/Header';
import PageHero from '../components/PageHero';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const ContactPage = () => {
  useEffect(() => {
    document.title = 'Contact & Executive Demo | Flik Explorer';
  }, []);

  return (
    <div className="bg-[#0a0a0b] min-h-screen text-gray-200">
      <Header />
      <main>
        <PageHero
          breadcrumb="Contact"
          badge="EXECUTIVE BRIEFING · PRIVATE DEMO"
          title="Deploy Flik on Your Next Landmark Development."
          subtitle="Experience live real-time 3D streaming tailored to your project. Schedule a consultation or connect directly with our founding team."
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
