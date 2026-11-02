import React, { useEffect } from 'react';
import Header from '../components/Header';
import PageHero from '../components/PageHero';
import VisualizationSection from '../components/VisualizationSection';
import ExperienceSection from '../components/ExperienceSection';
import ClosingCTA from '../components/ClosingCTA';
import Footer from '../components/Footer';

const ExperiencePage = () => {
  useEffect(() => {
    document.title = 'Interactive 3D Experience | Flik Explorer';
  }, []);

  return (
    <div className="bg-[#0a0a0b] min-h-screen text-gray-200">
      <Header />
      <main>
        <PageHero
          breadcrumb="Experience"
          badge="CINEMATIC INTERACTION · UNREAL ENGINE 5"
          title="Photorealism That Responds. Architecture That Adapts."
          subtitle="Explore architectural spaces rendered live with cinematic fidelity. Dynamically simulate lighting, change sun paths, walk through layouts, and inspect unit finishes with zero lag."
        />
        <VisualizationSection />
        <ExperienceSection />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default ExperiencePage;
