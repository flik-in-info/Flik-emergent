import React, { useState, useEffect } from 'react';
import {
  Layers,
  SunMedium,
  BarChart3,
  Building2,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import {
  platformSection,
  visualizationSection,
  intelligenceSection,
  teamsSection,
  images
} from '../data/mock';
import { Button } from './ui/button';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';

const TABS = [
  {
    id: 'platform',
    label: 'The Platform',
    eyebrow: platformSection?.label || '01 · Core Platform',
    icon: Layers
  },
  {
    id: 'visualization',
    label: '3D Visualization',
    eyebrow: visualizationSection?.label || '02 · Visual Craft',
    icon: SunMedium
  },
  {
    id: 'intelligence',
    label: 'Sales Intelligence',
    eyebrow: intelligenceSection?.label || '03 · Buyer Signals',
    icon: BarChart3
  },
  {
    id: 'teams',
    label: 'For Teams',
    eyebrow: teamsSection?.label || '04 · Built For Every Team',
    icon: Building2
  }
];

const PlatformStudio = () => {
  const { open: openDemoDialog } = useDemoDialog();
  const [activeTab, setActiveTab] = useState('platform');

  useEffect(() => {
    const syncFromHash = () => {
      const h = window.location.hash;
      if (h === '#intelligence') setActiveTab('intelligence');
      else if (h === '#capabilities') setActiveTab('visualization');
      else if (h === '#teams') setActiveTab('teams');
      else if (h === '#platform') setActiveTab('platform');
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const handleSelectTab = (id) => {
    setActiveTab(id);
    telemetry.ctaClick(`pillar_${id}`, 'platform_studio');
  };

  const tabContent = {
    platform: {
      headline: platformSection?.headline || ['One Digital Twin.', 'Every Screen. Zero Friction.'],
      body:
        platformSection?.body ||
        'Unified real-time architecture rendered in Unreal Engine 5 and delivered effortlessly across showroom walls, tablets, and web browsers.',
      image: images.devices,
      imageAlt: 'Flik Explorer cross-device real-time 3D platform',
      tag: 'Unreal Engine 5 · Browser & Experience Lounge',
      items: (platformSection?.features || []).map((f) => ({
        title: f.title,
        description: f.description
      }))
    },
    visualization: {
      headline: visualizationSection?.headline || ['Photorealistic Fidelity.', 'True Sunlight & Views.'],
      body:
        visualizationSection?.body ||
        'Physically accurate materials, volumetric daylight, and true height skyline sightlines from every floor plate.',
      image: images.environment,
      imageAlt: 'Flik photorealistic 3D architectural visualization',
      tag: 'Path-Traced Materials & Geospatially Accurate Views',
      items: (visualizationSection?.features || []).map((f) => ({
        title: f.title,
        description: f.description
      }))
    },
    intelligence: {
      headline: intelligenceSection?.headline || ['Know Your Buyers', 'Before They Buy.'],
      body:
        intelligenceSection?.body ||
        'Every walkthrough session surfaces high-intent unit preferences, dwell patterns, and qualified buyer signals straight into your CRM.',
      image: images.intelligence,
      imageAlt: 'Flik real-time sales intelligence and buyer intent telemetry',
      tag: 'Automated CRM Intent Telemetry',
      items: [
        ...(intelligenceSection?.leftFeatures || []),
        ...(intelligenceSection?.rightFeatures || [])
      ].map((f) => ({
        title: f.title,
        description: f.description
      }))
    },
    teams: {
      headline: teamsSection?.headline || ['Designed for the teams', 'moving inventory.'],
      body:
        'Purpose-built workflows uniting real estate developers, flagship sales galleries, and design studios around a single live source of truth.',
      image: images.showroom,
      imageAlt: 'Flik luxury real estate sales gallery experience',
      tag: 'Turnkey Showroom & Cloud Rollout',
      items: (teamsSection?.teams || []).map((t) => ({
        title: t.role || t.title,
        description: t.description || t.outcome || t.benefit
      }))
    }
  };

  const current = tabContent[activeTab] || tabContent.platform;
  const activeMeta = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <section
      id="platform"
      className="scroll-mt-20 relative py-10 lg:py-12 bg-[#050507] border-t border-white/[0.06] overflow-hidden"
    >
      <span id="capabilities" className="absolute -top-24" aria-hidden="true" />
      <span id="intelligence" className="absolute -top-24" aria-hidden="true" />
      <span id="teams" className="absolute -top-24" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-gradient-to-b from-emerald-500/[0.08] via-teal-500/[0.03] to-transparent blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Sleek Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-medium uppercase tracking-[0.2em] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeMeta.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight leading-[1.12]">
              {current.headline.map((line, i) => (
                <span
                  key={line}
                  className={
                    i === 1
                      ? 'block bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent'
                      : 'block'
                  }
                >
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Flik Platform Pillars"
            className="grid grid-cols-2 sm:inline-flex p-1.5 rounded-2xl bg-[#0d0d11]/95 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_35px_rgba(0,0,0,0.45)] gap-1.5 sm:gap-1"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`flex items-center justify-center sm:justify-start gap-2 min-h-[44px] px-3 sm:px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/25'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Luxury Split Showcase (Visual First on Mobile for Immediate Tab Feedback) */}
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          <div className="order-2 lg:order-1 lg:col-span-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0e0e13] to-[#0a0a0d] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-4">
                {current.body}
              </p>

              <div className="space-y-2">
                {current.items.slice(0, 6).map((item, idx) => (
                  <div
                    key={item.title || idx}
                    className="group p-3 sm:p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.045] border border-white/[0.05] hover:border-emerald-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-xs sm:text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-gray-400 leading-snug mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-gray-500">Live tailored project walkthrough</span>
              <Button
                onClick={() => {
                  telemetry.ctaClick(`Book Demo - ${activeTab}`, 'platform_studio');
                  openDemoDialog(`platform_${activeTab}`);
                }}
                size="sm"
                className="w-full sm:w-auto min-h-[44px] sm:min-h-0 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 cursor-pointer transition-all"
              >
                Request Demo
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>

          {/* Right Uncropped Architectural Viewport */}
          <div className="order-1 lg:order-2 lg:col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#070709] p-2 sm:p-2.5 flex flex-col justify-between shadow-[0_25px_70px_-20px_rgba(0,0,0,0.85),0_0_50px_-25px_rgba(16,185,129,0.18)]">
            <div className="relative w-full aspect-[16/9] max-h-[380px] flex items-center justify-center">
              <img
                key={activeTab}
                src={current.image}
                alt={current.imageAlt}
                className="max-w-full max-h-full w-auto h-auto rounded-2xl object-contain animate-fade-in shadow-2xl"
              />
            </div>

            <div className="pt-2 px-2 pb-0.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-medium uppercase tracking-widest text-emerald-400">
                  {activeMeta.label}
                </span>
              </div>
              <span className="text-xs text-gray-400 font-light">{current.tag}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformStudio;
