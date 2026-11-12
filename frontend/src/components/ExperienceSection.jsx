import React, { useState } from 'react';
import { Maximize2, Compass, Boxes, Loader2 } from 'lucide-react';
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
      className="scroll-mt-20 relative py-14 lg:py-18 bg-[#08080b] border-t border-white/[0.06]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-emerald-400 text-xs font-medium uppercase tracking-[0.2em] block mb-2.5">
              Live Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight">
              <span className="block">Step inside the architecture.</span>
              <span className="block bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Explore it on your terms.
              </span>
            </h2>
          </div>

          <div className="inline-flex p-1.5 rounded-2xl bg-[#101015] border border-white/10 shadow-xl self-start lg:self-auto gap-1">
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
                      ? 'bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/25'
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

        {/* Full-Width Luxury Theater Frame */}
        <div className="rounded-3xl bg-[#0b0b0f] border border-white/10 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85),0_0_40px_-20px_rgba(16,185,129,0.18)]">
          <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[500px] bg-[#060608]">
            {!loadedMap[activeExp.id] && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400 text-xs pointer-events-none z-10">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                <span>Initializing {activeExp.title}…</span>
              </div>
            )}

            <iframe
              key={activeExp.id}
              data-testid={`experience-iframe-${activeExp.id}`}
              src={activeExp.src}
              title={activeExp.title}
              className="w-full h-full border-0 relative z-10"
              allowFullScreen
              allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
              onLoad={() => setLoadedMap((prev) => ({ ...prev, [activeExp.id]: true }))}
            />

            <button
              type="button"
              data-testid={`experience-fullscreen-${activeExp.id}`}
              onClick={() => {
                telemetry.experienceInteract(activeExp.id, 'fullscreen');
                setModalExp(activeExp);
              }}
              className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/75 hover:bg-emerald-500 text-white hover:text-black backdrop-blur-md border border-white/15 hover:border-emerald-400 text-xs font-medium transition-all duration-300 cursor-pointer shadow-lg"
              aria-label={`Open ${activeExp.title} fullscreen`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fullscreen</span>
            </button>
          </div>

          <div className="px-6 py-4 sm:px-7 sm:py-5 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0c0c10]">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-widest text-emerald-400">
                {activeExp.subtitle}
              </span>
              <h3 className="text-lg font-medium text-white mt-0.5">{activeExp.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed">
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
