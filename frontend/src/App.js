import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import DeveloperProofBar from "./components/DeveloperProofBar";
import Live3DConsole from "./components/Live3DConsole";
import ROISimulatorSection from "./components/ROISimulatorSection";
import SpatialCapabilitiesShowcase from "./components/SpatialCapabilitiesShowcase";
import TechnologyBento from "./components/TechnologyBento";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import ClosingCTA from "./components/ClosingCTA";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import ElevationHUD3D from "./components/ElevationHUD3D";
import Spatial3DEcosystem from "./components/Spatial3DEcosystem";
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
    <div className="bg-[#050507] min-h-screen relative text-white selection:bg-emerald-500 selection:text-black">
      <ElevationHUD3D />
      <Header />
      <main>
        <HeroSection />
        <DeveloperProofBar />
        <Live3DConsole />
        <Spatial3DEcosystem />
        <ROISimulatorSection />
        <SpatialCapabilitiesShowcase />
        <TechnologyBento />
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
