import React, { useState, useEffect } from 'react';
import {
  Layers,
  SunMedium,
  BarChart3,
  Building2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MonitorPlay,
} from 'lucide-react';
import {
  platformSection,
  visualizationSection,
  intelligenceSection,
  teamsSection,
  images,
} from '../data/mock';
import { Button } from './ui/button';
import SpotlightCard from './ui/SpotlightCard';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';

const TABS = [
  {
    id: 'platform',
    num: '01',
    label: 'The Platform',
    eyebrow: '01 · Core Platform',
    icon: Layers,
  },
  {
    id: 'visualization',
    num: '02',
    label: '3D Visualization',
    eyebrow: '01B · Visual Craft',
    icon: SunMedium,
  },
  {
    id: 'intelligence',
    num: '03',
    label: 'Sales Intelligence',
    eyebrow: '01C · Buyer Signals',
    icon: BarChart3,
  },
  {
    id: 'teams',
    num: '04',
    label: 'For Teams',
    eyebrow: '01D · Built For Every Team',
    icon: Building2,
  },
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
      headline: ['Beyond visualization.', 'A decision-making environment.'],
      body:
        platformSection?.body ||
        'Unified real-time architecture rendered in Unreal Engine 5 and delivered effortlessly across showroom walls, tablets, and web browsers.',
      image: images.devices,
      imageAlt: 'Flik Explorer cross-device real-time 3D platform',
      tag: 'Unreal Engine 5 · Browser & Experience Lounge',
      badgeRight: 'MULTI-DEVICE SYNC',
      items: (platformSection?.features || []).map((f) => ({
        title: f.title,
        description: f.description,
      })),
    },
    visualization: {
      headline: ['Photorealism that responds.', 'Architecture that adapts.'],
      body:
        visualizationSection?.body ||
        'Physically accurate materials, volumetric daylight, and true height skyline sightlines from every floor plate.',
      image: images.environment,
      imageAlt: 'Flik photorealistic 3D architectural visualization',
      tag: 'Path-Traced Materials & Geospatially Accurate Views',
      badgeRight: 'LUMEN GI · REAL-TIME',
      items: (visualizationSection?.features || []).map((f) => ({
        title: f.title,
        description: f.description,
      })),
    },
    intelligence: {
      headline: ['Every click is insight.', 'Every view is a signal.'],
      body:
        intelligenceSection?.body ||
        'Every walkthrough session surfaces high-intent unit preferences, dwell patterns, and qualified buyer signals straight into your CRM.',
      image: images.intelligence,
      imageAlt: 'Flik real-time sales intelligence and buyer intent telemetry',
      tag: 'Automated CRM Intent Telemetry',
      badgeRight: 'LIVE INTENT HEATMAPS',
      items: [
        ...(intelligenceSection?.leftFeatures || []),
        ...(intelligenceSection?.rightFeatures || []),
      ].map((f) => ({
        title: f.title,
        description: f.description,
      })),
    },
    teams: {
      headline: ['Designed for the teams', 'moving inventory.'],
      body:
        'Purpose-built workflows uniting real estate developers, flagship sales galleries, and design studios around a single live source of truth.',
      image: images.showroom,
      imageAlt: 'Flik luxury real estate sales gallery experience',
      tag: 'Turnkey Showroom & Cloud Rollout',
      badgeRight: 'B2B ENTERPRISE OS',
      items: (teamsSection?.teams || []).map((t) => ({
        title: t.role || t.title,
        description: t.description || t.outcome || t.benefit,
      })),
    },
  };

  const current = tabContent[activeTab] || tabContent.platform;
  const activeMeta = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <section
      id="platform"
      className="scroll-mt-24 relative py-9 lg:py-11 bg-[#030304] border-t border-white/[0.06] overflow-hidden"
    >
      <span id="capabilities" className="absolute -top-24" aria-hidden="true" />
      <span id="intelligence" className="absolute -top-24" aria-hidden="true" />
      <span id="teams" className="absolute -top-24" aria-hidden="true" />

      {/* Top Atmospheric Glow */}
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[960px] h-[340px] bg-gradient-to-b from-[#22E55A]/[0.07] via-emerald-500/[0.02] to-transparent blur-[130px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Sleek Architecture Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-7">
          <div>
            <div className="inline-flex items-center gap-2 text-[#22E55A] text-[11px] font-mono uppercase tracking-[0.22em] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeMeta.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.65rem] font-light text-white tracking-[-0.025em] leading-[1.18]">
              <span className="block">{current.headline[0]}</span>
              <span className="block mt-1 font-editorial italic font-normal text-gradient-emerald tracking-normal pr-2">
                {current.headline[1]}
              </span>
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Flik Platform Pillars"
            className="grid grid-cols-2 sm:inline-flex p-1.5 rounded-2xl bg-[#09090c]/95 backdrop-blur-2xl border border-white/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_16px_40px_rgba(0,0,0,0.6)] gap-1"
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
                  className={`flex items-center justify-center sm:justify-start gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#22E55A] text-black font-semibold shadow-[0_0_25px_rgba(34,229,90,0.3)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] hidden sm:inline ${
                      isSelected ? 'text-black/70' : 'text-gray-500'
                    }`}
                  >
                    {tab.num}
                  </span>
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Luxury Split Showcase */}
        <div className="grid lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Studio Specification Card */}
          <SpotlightCard className="lg:col-span-5 rounded-3xl bg-[#09090c] border border-white/[0.08] glass-bezel p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex flex-col justify-between h-full gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-4 pb-4 border-b border-white/[0.06]">
                  {current.body}
                </p>

                <div
                  className={`grid gap-2.5 ${
                    current.items.length > 4 ? 'sm:grid-cols-2 lg:grid-cols-1' : 'grid-cols-1'
                  }`}
                >
                  {current.items.slice(0, 6).map((item, idx) => (
                    <div
                      key={item.title || idx}
                      className="group/item p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.045] border border-white/[0.05] hover:border-[#22E55A]/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22E55A] shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-xs sm:text-[13px] font-medium text-white group-hover/item:text-emerald-300 transition-colors">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-[11px] text-gray-400 leading-snug mt-0.5 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3.5 border-t border-white/[0.07] flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">
                  White-Labeled Per Project
                </span>
                <Button
                  onClick={() => {
                    telemetry.ctaClick(`Book Demo - ${activeTab}`, 'platform_studio');
                    openDemoDialog(`platform_${activeTab}`);
                  }}
                  size="sm"
                  className="bg-white hover:bg-[#22E55A] text-black font-semibold text-xs px-4 py-2 h-9 rounded-full shadow-lg cursor-pointer transition-all duration-300"
                >
                  Request Demo
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>
          </SpotlightCard>

          {/* Right Uncropped Architectural Viewport Bezel */}
          <SpotlightCard className="lg:col-span-7 rounded-3xl border border-white/[0.1] bg-[#070709] glass-bezel flex flex-col justify-between">
            <div className="flex flex-col justify-between h-full">
              {/* Architectural Viewport Chrome Header */}
              <div className="px-4 sm:px-5 py-3 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.015]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/15" />
                    <span className="w-2 h-2 rounded-full bg-white/15" />
                    <span className="w-2 h-2 rounded-full bg-[#22E55A]" />
                  </div>
                  <span className="ml-2 text-[10px] font-mono text-gray-500 tracking-wider">
                    flik://studio/{activeTab}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#22E55A]/10 border border-[#22E55A]/25 text-[#22E55A] text-[10px] font-mono tracking-widest">
                  <MonitorPlay className="w-3 h-3" />
                  <span>{current.badgeRight}</span>
                </div>
              </div>

              {/* Clean Uncropped 2K Render Frame */}
              <div className="relative flex-1 p-3 sm:p-4 flex items-center justify-center bg-[#040406] overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,229,90,0.06),transparent_65%)] pointer-events-none"
                />
                <div className="relative w-full aspect-[16/9] max-h-[395px] flex items-center justify-center">
                  <img
                    key={activeTab}
                    src={current.image}
                    alt={current.imageAlt}
                    className="max-w-full max-h-full w-auto h-auto rounded-xl object-contain animate-fade-in shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                  />
                </div>
              </div>

              {/* Bottom Caption Bar */}
              <div className="px-4 sm:px-5 py-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 bg-[#08080b]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22E55A]" />
                  <span className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#22E55A]">
                    {activeMeta.label}
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-light">{current.tag}</span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default PlatformStudio;
