import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import DeveloperProofBar from "./components/DeveloperProofBar";
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
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import FAQSection from "./components/FAQSection";
import { DemoDialogProvider } from "./context/DemoDialogContext";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LandingPage = () => {
  return (
    <div className="bg-[#0a0a0b] min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <DeveloperProofBar />
        <PlatformSection />
        <VisualizationSection />
        <ExperienceSection />
        <IntelligenceSection />
        <TechnologySection />
        <TeamsSection />
        <MetricsSection />
        <DifferenceSection />
        <FAQSection />
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
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster theme="dark" position="bottom-right" richColors closeButton />
        </DemoDialogProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
