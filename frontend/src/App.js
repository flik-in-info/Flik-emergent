import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import CustomCursor from "./components/CustomCursor";
import HomePage from "./pages/HomePage";
import PlatformPage from "./pages/PlatformPage";
import ExperiencePage from "./pages/ExperiencePage";
import IntelligencePage from "./pages/IntelligencePage";
import TechnologyPage from "./pages/TechnologyPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import PulseDashboard from "./components/telemetry/PulseDashboard";
import { DemoDialogProvider } from "./context/DemoDialogContext";
import useTelemetryListeners from "./hooks/useTelemetryListeners";

const ScrollToTopAndTelemetry = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  useTelemetryListeners();

  React.useEffect(() => {
    // Seamless backward compatibility for legacy hash links
    if (hash === '#platform') {
      navigate('/platform', { replace: true });
    } else if (hash === '#experience' || hash === '#capabilities') {
      navigate('/experience', { replace: true });
    } else if (hash === '#intelligence') {
      navigate('/intelligence', { replace: true });
    } else if (hash === '#technology' || hash === '#industry-leaders') {
      navigate('/technology', { replace: true });
    } else if (hash === '#faq') {
      navigate('/faq', { replace: true });
    } else if (hash === '#contact') {
      navigate('/contact', { replace: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, navigate]);

  return null;
};

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <BrowserRouter>
        <DemoDialogProvider>
          <ScrollToTopAndTelemetry />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/intelligence" element={<IntelligencePage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
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
