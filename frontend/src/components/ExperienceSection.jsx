import React, { useState } from 'react';
import { Maximize2, Compass, Boxes, Loader2 } from 'lucide-react';
import ExperienceModal from './ExperienceModal';
import { telemetry } from '../utils/telemetry';

const EXPERIENCES = [
  {
    id: 'virtual-walkthrough',
    title: 'Virtual Walkthrough',
    subtitle: 'Interactive Residence Tour',
    description:
      'Step inside a furnished apartment directly inside your browser without installing software.',
    icon: Compass,
    src:
      process.env.REACT_APP_VIRTUAL_WALKTHROUGH_URL ||
      'https://www.coohom.com/pub/tool/panorama/aiwalking?obsPlanId=3FO3GVEJE5YC&locale=en_US&utm_source=smart720_share&utm_medium=linkcopy&utm_content=3FO3GVEJE5YC',
  },
  {
    id: 'modular-explorer',
    title: 'Modular Explorer',
    subtitle: 'Architectural Volume Inspection',
    description:
      'Orbit full project layouts, isolate floor plates, and inspect proportions from any direction.',
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
      className="scroll-mt-20 py-16 lg:py-20 bg-neutral-100 border-b border-black/15"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-medium text-black leading-[1.06] tracking-[-0.03em]">
              Try the live unit{' '}
              <span className="underline decoration-[#22E55A] decoration-[4px] underline-offset-[6px]">
                walkthrough yourself.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2.5 max-w-2xl">
              {activeExp.description}
            </p>
          </div>

          <div className="inline-flex border border-black bg-white p-1 self-start lg:self-auto">
            {EXPERIENCES.map((exp) => {
              const Icon = exp.icon;
              const active = exp.id === selectedId;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => handleSelectMode(exp)}
                  data-testid={`experience-card-${exp.id}`}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#22E55A] text-black font-semibold'
                      : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{exp.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Framed Browser Viewport */}
        <div className="border border-black bg-white">
          <div className="px-4 sm:px-5 py-3 border-b border-neutral-200 flex items-center justify-between gap-2 bg-neutral-50">
            <div className="flex items-center gap-2.5 text-xs font-mono text-black">
              <span className="w-2.5 h-2.5 bg-[#22E55A] border border-black" />
              <span>{activeExp.subtitle}</span>
            </div>
            <button
              type="button"
              data-testid={`experience-fullscreen-${activeExp.id}`}
              onClick={() => {
                telemetry.experienceInteract(activeExp.id, 'fullscreen');
                setModalExp(activeExp);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-[#22E55A] text-white hover:text-black text-xs font-medium transition-colors cursor-pointer"
              aria-label={`Open ${activeExp.title} fullscreen`}
            >
              <Maximize2 className="w-3 h-3" />
              <span>Fullscreen</span>
            </button>
          </div>

          <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[460px] bg-black">
            {!loadedMap[activeExp.id] && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-300 text-xs pointer-events-none z-10">
                <Loader2 className="w-5 h-5 animate-spin text-[#22E55A]" />
                <span className="font-mono uppercase text-[11px]">
                  Loading {activeExp.title}
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
