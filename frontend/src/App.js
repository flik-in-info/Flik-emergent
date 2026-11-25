import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ClientsSection from "./components/ClientsSection";
import PlatformStudio from "./components/PlatformStudio";
import ExperienceSection from "./components/ExperienceSection";
import TechnologySection from "./components/TechnologySection";
import DifferenceSection from "./components/DifferenceSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import FAQSection from "./components/FAQSection";
import PulseDashboard from "./components/telemetry/PulseDashboard";
import MobileStickyCTA from "./components/MobileStickyCTA";
import { DemoDialogProvider } from "./context/DemoDialogContext";
import useTelemetryListeners from "./hooks/useTelemetryListeners";

const ScrollToTopAndTelemetry = () => {
  const { pathname } = useLocation();
  useTelemetryListeners();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ScrollProgressBeam = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-transparent"
    >
      <div
        style={{ width: `${progress}%` }}
        className="h-full bg-gradient-to-r from-[#22E55A] via-emerald-300 to-teal-300 shadow-[0_0_12px_rgba(34,229,90,0.85)] transition-[width] duration-75"
      />
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="bg-[#030304] min-h-screen pb-20 lg:pb-0 relative selection:bg-[#22E55A]/25 selection:text-white">
      <ScrollProgressBeam />
      <Header />
      <main>
        <HeroSection />
        <PlatformStudio />
        <ExperienceSection />
        <TechnologySection />
        <DifferenceSection />
        <FAQSection />
        <ContactSection />
        <ClientsSection />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <BrowserRouter>
        <DemoDialogProvider>
          <ScrollToTopAndTelemetry />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pulse" element={<PulseDashboard />} />
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
