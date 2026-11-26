import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CinemaScrollMovie from "./components/CinemaScrollMovie";
import DifferenceSection from "./components/DifferenceSection";
import ExperienceSection from "./components/ExperienceSection";
import TechnologySection from "./components/TechnologySection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import ClientsSection from "./components/ClientsSection";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
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
        className="h-full bg-[#22E55A] transition-[width] duration-75"
      />
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="bg-white text-black min-h-screen pb-20 lg:pb-0 relative overflow-x-clip selection:bg-[#22E55A] selection:text-black">
      <ScrollProgressBeam />
      <Header />
      <main>
        <HeroSection />
        <CinemaScrollMovie />
        <DifferenceSection />
        <ExperienceSection />
        <TechnologySection />
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
          <Toaster theme="light" position="bottom-right" richColors closeButton />
        </DemoDialogProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
