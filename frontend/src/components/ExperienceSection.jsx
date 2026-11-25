import React, { useState } from 'react';
import { Maximize2, Compass, Boxes, Loader2, ShieldCheck } from 'lucide-react';
import ExperienceModal from './ExperienceModal';
import { telemetry } from '../utils/telemetry';

const EXPERIENCES = [
  {
    id: 'virtual-walkthrough',
    title: 'Virtual Walkthrough',
    subtitle: 'AI Guided Panoramic Tour',
    description:
      'Step inside a fully rendered residence. Explore lighting conditions, finishes, and panoramic sightlines directly in-browser with zero downloads.',
    icon: Compass,
    src:
      process.env.REACT_APP_VIRTUAL_WALKTHROUGH_URL ||
      'https://www.coohom.com/pub/tool/panorama/aiwalking?obsPlanId=3FO3GVEJE5YC&locale=en_US&utm_source=smart720_share&utm_medium=linkcopy&utm_content=3FO3GVEJE5YC',
  },
  {
    id: 'modular-explorer',
    title: 'Modular Explorer',
    subtitle: 'Interactive 3D Model',
    description:
      'Rotate, orbit, and inspect architectural volumes in interactive 3D. Isolate units, inspect elevations, and review floorplans seamlessly.',
    icon: Boxes,
    src:
      process.env.REACT_APP_MODULAR_EXPLORER_URL ||
      'https://www.coohom.com/pub/modelo/viewer/preview/3FO3GVEJE5YC',
  },
];

const ExperienceSection = () => {
  const [selectedId, setSelectedId] = useState('virtual-walkthrough');
  const [modalExp, setModalExp] = useState(null);
  const [loadedMap, setLoadedMap] = useState({});

  const activeExp = EXPERIENCES.find((e) => e.id === selectedId) || EXPERIENCES[0];

  const handleSelectMode = (exp) => {
    setSelectedId(exp.id);
    telemetry.experienceInteract(exp.id, 'switch_theater');
  };

  return (
    <section
      id="experience"
      className="scroll-mt-24 relative py-9 lg:py-11 bg-[#060608] border-t border-white/[0.06] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22E55A]/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[360px] bg-[#22E55A]/[0.05] blur-[150px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[#22E55A] text-[11px] font-mono font-medium uppercase tracking-[0.22em] block mb-2">
              02 · Live Screening Suite
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.65rem] font-light text-white leading-[1.18] tracking-[-0.025em]">
              <span className="block">Step inside the architecture.</span>
              <span className="block mt-1 font-editorial italic font-normal text-gradient-emerald tracking-normal pr-2">
                Explore it on your terms.
              </span>
            </h2>
          </div>

          <div className="inline-flex p-1.5 rounded-2xl bg-[#0b0b0f] border border-white/[0.09] shadow-xl self-start lg:self-auto gap-1">
            {EXPERIENCES.map((exp) => {
              const Icon = exp.icon;
              const active = exp.id === selectedId;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => handleSelectMode(exp)}
                  data-testid={`experience-card-${exp.id}`}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer ${
                    active
                      ? 'bg-[#22E55A] text-black font-semibold shadow-[0_0_25px_rgba(34,229,90,0.28)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{exp.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full-Width Bespoke Architectural Theater Frame */}
        <div className="rounded-3xl bg-[#08080b] border border-white/[0.1] overflow-hidden shadow-[0_32px_90px_-20px_rgba(0,0,0,0.95),0_0_60px_-25px_rgba(34,229,90,0.16),inset_0_1px_0_rgba(255,255,255,0.08)]">
          {/* Top Screening Bar */}
          <div className="px-4 sm:px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.015] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22E55A] animate-pulse" />
              <span>Interactive Cloud Viewport · Zero Plugin</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22E55A]" />
                Sandboxed Stream
              </span>
              <button
                type="button"
                data-testid={`experience-fullscreen-${activeExp.id}`}
                onClick={() => {
                  telemetry.experienceInteract(activeExp.id, 'fullscreen');
                  setModalExp(activeExp);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] hover:bg-[#22E55A] text-white hover:text-black border border-white/10 hover:border-[#22E55A] text-[11px] font-medium transition-all duration-300 cursor-pointer"
                aria-label={`Open ${activeExp.title} fullscreen`}
              >
                <Maximize2 className="w-3 h-3" />
                <span>Fullscreen</span>
              </button>
            </div>
          </div>

          <div className="relative w-full h-[300px] sm:h-[340px] lg:h-[370px] bg-[#040406]">
            {!loadedMap[activeExp.id] && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400 text-xs pointer-events-none z-10">
                <Loader2 className="w-5 h-5 animate-spin text-[#22E55A]" />
                <span className="font-mono tracking-wider uppercase text-[11px]">
                  Initializing {activeExp.title}…
                </span>
              </div>
            )}

            <iframe
              key={activeExp.id}
              data-testid={`experience-iframe-${activeExp.id}`}
              src={activeExp.src}
              title={activeExp.title}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0 relative z-10"
              allowFullScreen
              allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
              onLoad={() => setLoadedMap((prev) => ({ ...prev, [activeExp.id]: true }))}
            />
          </div>

          <div className="px-5 py-3.5 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#09090d]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#22E55A]">
                {activeExp.subtitle}
              </span>
              <h3 className="text-base sm:text-lg font-medium text-white mt-0.5">{activeExp.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed font-light">
              {activeExp.description}
            </p>
          </div>
        </div>
      </div>

      <ExperienceModal
        open={!!modalExp}
        onOpenChange={(next) => !next && setModalExp(null)}
        title={modalExp?.title || ''}
        subtitle={modalExp?.subtitle || ''}
        src={modalExp?.src || ''}
      />
    </section>
  );
};

export default ExperienceSection;
