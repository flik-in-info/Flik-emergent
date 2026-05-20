import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PlatformSection from "./components/PlatformSection";
import VisualizationSection from "./components/VisualizationSection";
import ExperienceSection from "./components/ExperienceSection";
import IntelligenceSection from "./components/IntelligenceSection";
import TechnologySection from "./components/TechnologySection";
import TeamsSection from "./components/TeamsSection";
import MetricsSection from "./components/MetricsSection";
import DifferenceSection from "./components/DifferenceSection";
import ContactSection from "./components/ContactSection";
import ClosingCTA from "./components/ClosingCTA";
import Footer from "./components/Footer";
import { DemoDialogProvider } from "./context/DemoDialogContext";

const LandingPage = () => {
  return (
    <div className="bg-[#0a0a0b] min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PlatformSection />
        <VisualizationSection />
        <ExperienceSection />
        <IntelligenceSection />
        <TechnologySection />
        <TeamsSection />
        <MetricsSection />
        <DifferenceSection />
        <ContactSection />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <BrowserRouter>
        <DemoDialogProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
          <Toaster theme="dark" position="bottom-right" richColors closeButton />
        </DemoDialogProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
