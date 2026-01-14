import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PlatformSection from "./components/PlatformSection";
import VisualizationSection from "./components/VisualizationSection";
import IntelligenceSection from "./components/IntelligenceSection";
import TechnologySection from "./components/TechnologySection";
import TeamsSection from "./components/TeamsSection";
import MetricsSection from "./components/MetricsSection";
import DifferenceSection from "./components/DifferenceSection";
import ClosingCTA from "./components/ClosingCTA";
import Footer from "./components/Footer";

const LandingPage = () => {
  return (
    <div className="bg-[#0a0a0b] min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PlatformSection />
        <VisualizationSection />
        <IntelligenceSection />
        <TechnologySection />
        <TeamsSection />
        <MetricsSection />
        <DifferenceSection />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;