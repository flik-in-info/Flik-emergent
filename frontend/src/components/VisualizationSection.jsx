import React, { useState } from 'react';
import { Monitor, Sun, Moon, Sunrise, Sunset, Eye, Layers, Compass, Sparkles } from 'lucide-react';
import { visualizationSection, images } from '../data/mock';

const LIGHTING_PRESETS = [
  {
    id: 'dawn',
    label: 'Dawn / Golden Hour',
    time: '06:45 AM',
    elevation: '14° East',
    temp: '3200K Warm Gold',
    icon: Sunrise,
    gradientOverlay: 'from-amber-600/30 via-orange-500/15 to-rose-950/40 mix-blend-color-dodge',
    ambientGlow: 'bg-amber-500/20',
    description: 'Soft horizontal morning sunlight illuminating eastern facades and ocean sightlines.',
  },
  {
    id: 'noon',
    label: 'High Noon',
    time: '12:30 PM',
    elevation: '78° South',
    temp: '5600K Solar White',
    icon: Sun,
    gradientOverlay: 'from-blue-400/15 via-white/10 to-transparent mix-blend-overlay',
    ambientGlow: 'bg-emerald-500/15',
    description: 'Direct architectural sunlight demonstrating true facade materiality and zero shadow distortion.',
  },
  {
    id: 'dusk',
    label: 'Dusk / Twilight',
    time: '06:15 PM',
    elevation: '8° West',
    temp: '2800K Rich Amber',
    icon: Sunset,
    gradientOverlay: 'from-purple-900/40 via-amber-700/25 to-blue-950/60 mix-blend-color-burn',
    ambientGlow: 'bg-orange-500/20',
    description: 'Dramatic sunset skies with internal luxury chandeliers and cove lighting activating live.',
  },
  {
    id: 'night',
    label: 'Obsidian Night',
    time: '10:00 PM',
    elevation: '-34° Horizon',
    temp: '4200K Lunar & Facade LED',
    icon: Moon,
    gradientOverlay: 'from-slate-950/70 via-indigo-950/50 to-emerald-950/40',
    ambientGlow: 'bg-indigo-500/15',
    description: 'Architectural facade wash, balcony perimeter downlights, and luminous skyline visibility.',
  },
];

const CAMERA_VIEWS = [
  'Balcony Sightline · Floor 34',
  'Master Suite Terrace',
  'Grand Double-Height Living',
  'Tower Aerial 360°',
];

const ICONS = [Monitor, Sun, Layers, Eye];

const VisualizationSection = () => {
  const [activeLighting, setActiveLighting] = useState(LIGHTING_PRESETS[0]);
  const [activeView, setActiveView] = useState(CAMERA_VIEWS[0]);

  return (
    <section id="capabilities" className="relative py-32 bg-[#09090b] overflow-hidden">
      {/* Background Architectural Grid & Subtle Radial Glow */}
      <div className="absolute inset-0 bg-arch-grid opacity-30 pointer-events-none" />
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] ${activeLighting.ambientGlow} rounded-full blur-[160px] pointer-events-none transition-colors duration-1000`} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL-TIME ENVIRONMENT SIMULATION · UNREAL ENGINE 5</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            <span className="block font-extralight text-gray-300">Photorealism that responds.</span>
            <span className="block font-medium text-gradient-emerald">Architecture that adapts.</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            Every environment is calculated live on Unreal Engine 5 using real-time Lumen global illumination. Test sun paths, observe balcony shade conditions, and switch between times of day with instant photorealistic feedback.
          </p>
        </div>

        {/* Interactive Lighting & Viewport Studio Showcase */}
        <div className="mb-20 rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d10] shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          
          {/* Top Studio Control Bar */}
          <div className="px-6 py-4 bg-white/[0.02] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-gray-300">
                INTERACTIVE LIGHTING STUDIO · LIVE SIMULATION
              </span>
            </div>

            {/* Camera View Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
              <span className="text-[11px] font-mono text-gray-500 mr-1 hidden sm:inline">VIEWPORT:</span>
              {CAMERA_VIEWS.map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`text-[11px] font-mono px-3 py-1 rounded-md transition-all duration-200 whitespace-nowrap ${
                    activeView === view
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-gray-400 hover:text-white bg-white/[0.02] border border-transparent'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* Viewport Canvas with Dynamic Lighting Effects */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-black select-none">
            {/* Base Photorealistic Render */}
            <img
              src={images.environment}
              alt="Flik Explorer Photorealistic Architectural Lighting and Real-Time Environment Simulation"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-all duration-700 ease-out"
            />

            {/* Dynamic CSS Lighting Overlay reflecting the selected sun position */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${activeLighting.gradientOverlay} transition-all duration-700 pointer-events-none`}
            />

            {/* Top-Right Telemetry Overlay (CAD / Blueprint style) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 luxury-glass rounded-xl p-3.5 text-xs font-mono text-gray-300 border border-white/15 max-w-xs hidden sm:block pointer-events-none">
              <div className="text-emerald-400 text-[10px] uppercase tracking-widest mb-1.5">
                ● LUMEN REAL-TIME TELEMETRY
              </div>
              <div className="space-y-1 text-[11px] text-gray-400">
                <div className="flex justify-between gap-4">
                  <span>TIME OF DAY:</span>
                  <span className="text-white font-medium">{activeLighting.time}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>SOLAR ELEVATION:</span>
                  <span className="text-white font-medium">{activeLighting.elevation}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>COLOR TEMP:</span>
                  <span className="text-emerald-300 font-medium">{activeLighting.temp}</span>
                </div>
                <div className="flex justify-between gap-4 pt-1 border-t border-white/10 text-[10px]">
                  <span>CAMERA:</span>
                  <span className="text-gray-300">{activeView}</span>
                </div>
              </div>
            </div>

            {/* Bottom Floating Notification */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 luxury-glass rounded-lg px-3.5 py-2 text-xs text-gray-300 border border-white/15 max-w-md pointer-events-none">
              <div className="flex items-center gap-2">
                <activeLighting.icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-white font-medium">{activeLighting.label}:</span>
                <span className="text-gray-400 truncate">{activeLighting.description}</span>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Presets Selector */}
          <div className="p-6 bg-white/[0.015] border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                SELECT SOLAR TIME PRESET:
              </span>
              <span className="text-xs text-emerald-400 font-mono">
                Click any condition to trigger instant real-time illumination
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {LIGHTING_PRESETS.map((preset) => {
                const Icon = preset.icon;
                const isActive = activeLighting.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setActiveLighting(preset)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500/15 border border-emerald-500/40 shadow-[0_0_20px_rgba(34,229,90,0.15)]'
                        : 'bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? 'bg-emerald-500 text-black' : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-xs font-medium truncate ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {preset.label}
                      </div>
                      <div className="text-[10px] font-mono text-gray-500">{preset.time}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* 4 Bento Architecture Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visualizationSection.features.map((feature, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/5 hover:border-emerald-500/30 transition-all duration-400"
              >
                {/* Corner Crosshair CAD marker */}
                <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-700 group-hover:text-emerald-500/60 transition-colors">
                  +
                </div>

                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 transition-all duration-400 group-hover:bg-emerald-500/20 group-hover:scale-105">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest mb-1.5">
                  MOD // 0{index + 1}
                </div>

                <h3 className="text-base font-medium text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default VisualizationSection;