import React, { useState } from 'react';
import { Maximize2, Compass, Boxes, Loader2, Sparkles, Sun, Moon, Sunrise, Sunset, Eye, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useDemoDialog } from '../context/DemoDialogContext';
import ExperienceModal from './ExperienceModal';
import { UiverseButton, UiverseBadge } from './uiverse/UiverseComponents';

const EXPERIENCES = [
  {
    id: 'walkthrough',
    name: 'Virtual Walkthrough',
    type: '360° Interior Panorama',
    tag: 'AI Guided Spatial Tour',
    description: 'Walk through every room, inspect luxury marble and wooden finishes, and experience real-time sun angles from east to west.',
    src: process.env.REACT_APP_VIRTUAL_WALKTHROUGH_URL || 'https://www.coohom.com/pub/tool/panorama/aiwalking?obsPlanId=3FO3GVEJE5YC&locale=en_US&utm_source=smart720_share&utm_medium=linkcopy&utm_content=3FO3GVEJE5YC',
    icon: Compass,
  },
  {
    id: 'modular',
    name: 'Modular Tower Explorer',
    type: '3D Orbit & Unit Isolate',
    tag: 'Interactive Structural Model',
    description: 'Rotate, orbit, and dissect the building architecture in 3D. Toggle floor plates, inspect specific 2BHK/3BHK units, and examine superstructure columns.',
    src: process.env.REACT_APP_MODULAR_EXPLORER_URL || 'https://www.coohom.com/pub/modelo/viewer/preview/3FO3GVEJE5YC',
    icon: Boxes,
  },
];

const LIGHT_PRESETS = [
  { id: 'dawn', label: '06:45 AM Dawn', icon: Sunrise, glow: 'from-amber-600/15 via-orange-500/10 to-transparent' },
  { id: 'noon', label: '12:30 PM Noon', icon: Sun, glow: 'from-blue-400/10 via-white/5 to-transparent' },
  { id: 'dusk', label: '06:15 PM Twilight', icon: Sunset, glow: 'from-purple-900/25 via-amber-600/15 to-transparent' },
  { id: 'night', label: '10:00 PM Obsidian', icon: Moon, glow: 'from-slate-950/40 to-transparent' },
];

const Live3DConsole = () => {
  const [activeTab, setActiveTab] = useState(EXPERIENCES[0]);
  const [activeLighting, setActiveLighting] = useState(LIGHT_PRESETS[1]);
  const [loaded, setLoaded] = useState(false);
  const [modalExperience, setModalExperience] = useState(null);
  const { open: openDemoDialog } = useDemoDialog();

  const handleTabChange = (exp) => {
    if (exp.id === activeTab.id) return;
    setLoaded(false);
    setActiveTab(exp);
  };

  return (
    <section id="experience" className="relative py-32 bg-[#08080a] overflow-hidden">
      {/* Background Ambient Mesh Glow */}
      <div className="absolute inset-0 bg-arch-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <UiverseBadge
            highlight="INTERACTIVE CLOUD VIEWPORT"
            text="Real-Time 3D Digital Twin"
            className="mb-4"
          />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            <span className="block font-extralight text-gray-300">Step inside the architecture.</span>
            <span className="block font-medium text-gradient-emerald">
              Test drive the live digital twin.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            Zero plugins. Zero App Store downloads. Running via ultra-low-latency cloud streaming in your browser right now.
          </p>
        </div>

        {/* The 3D Console Cockpit */}
        <div className="rounded-3xl overflow-hidden border border-white/15 bg-[#0c0c0f] shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
          
          {/* Top Console Navigation Bar */}
          <div className="p-4 sm:px-6 bg-white/[0.02] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            
            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-2 bg-black/50 p-1.5 rounded-2xl border border-white/10">
              {EXPERIENCES.map((exp) => {
                const Icon = exp.icon;
                const isActive = activeTab.id === exp.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => handleTabChange(exp)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(34,229,90,0.3)] font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{exp.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Solar Simulation Quick Presets */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-[11px] font-mono text-gray-500 mr-1">SUN ANGLE:</span>
              {LIGHT_PRESETS.map((p) => {
                const Icon = p.icon;
                const isSelected = activeLighting.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveLighting(p)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all duration-200 ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-gray-400 hover:text-white bg-white/[0.02] border border-transparent'
                    }`}
                  >
                    <Icon className="w-3 h-3 text-emerald-400" />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Launch Fullscreen Trigger */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setModalExperience(activeTab)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-emerald-500 hover:text-black border border-white/10 hover:border-emerald-400 text-white text-xs font-mono uppercase tracking-wider transition-all duration-300"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Fullscreen</span>
              </button>
            </div>
          </div>

          {/* 3D Viewport Screen */}
          <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full bg-black overflow-hidden select-none">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#09090b] z-0">
                <div className="flex flex-col items-center gap-3 text-gray-400">
                  <Loader2 className="w-7 h-7 animate-spin text-emerald-400" />
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                    Initializing cloud 3D instance…
                  </span>
                </div>
              </div>
            )}

            <iframe
              key={activeTab.id}
              src={activeTab.src}
              title={activeTab.name}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className="absolute inset-0 w-full h-full border-0 z-[1]"
              allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope; magnetometer; camera; microphone"
              allowFullScreen
            />

            {/* Subtle Solar Overlay Filter */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${activeLighting.glow} pointer-events-none z-[2] transition-colors duration-700`}
            />

            {/* Floating Top-Left Telemetry Tag */}
            <div className="absolute top-4 left-4 z-10 luxury-glass rounded-xl px-3 py-1.5 text-[11px] font-mono text-emerald-300 border border-white/15 pointer-events-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE CLOUD STREAM · 60 FPS UHD</span>
            </div>

            {/* Floating Bottom-Left Hint Pill */}
            <div className="absolute bottom-4 left-4 z-10 luxury-glass rounded-lg px-3 py-1.5 text-xs text-gray-300 border border-white/15 pointer-events-none hidden sm:flex items-center gap-2">
              <span className="text-emerald-400">●</span>
              <span>Click & drag inside viewport to orbit or walk</span>
            </div>
          </div>

          {/* Bottom Cockpit Status Bar */}
          <div className="p-6 bg-white/[0.015] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-xs font-mono uppercase tracking-wider">
                  {activeTab.tag}
                </span>
                <span className="text-gray-600">·</span>
                <span className="text-gray-400 text-xs">{activeTab.type}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl">
                {activeTab.description}
              </p>
            </div>

            <UiverseButton
              variant="primary"
              size="md"
              onClick={() => openDemoDialog('3d_console')}
              icon={ArrowRight}
            >
              Deploy for Your Project
            </UiverseButton>
          </div>

        </div>

      </div>

      <ExperienceModal
        open={!!modalExperience}
        onOpenChange={(next) => !next && setModalExperience(null)}
        title={modalExperience?.name || ''}
        subtitle={modalExperience?.tag || ''}
        src={modalExperience?.src || ''}
      />
    </section>
  );
};

export default Live3DConsole;
