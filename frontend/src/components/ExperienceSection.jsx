import React, { useState } from 'react';
import { Maximize2, Compass, Boxes, Loader2 } from 'lucide-react';
import ExperienceModal from './ExperienceModal';

const EXPERIENCES = [
  {
    id: 'virtual-walkthrough',
    title: 'Virtual Walkthrough',
    subtitle: 'AI Guided Panoramic Tour',
    description:
      'Step inside a fully rendered space. AI guides you through each room, lighting condition and viewpoint — no plug-ins, no downloads.',
    icon: Compass,
    src: 'https://www.coohom.com/pub/tool/panorama/aiwalking?obsPlanId=3FO3GVEJE5YC&locale=en_US&utm_source=smart720_share&utm_medium=linkcopy&utm_content=3FO3GVEJE5YC',
  },
  {
    id: 'modular-explorer',
    title: 'Modular Explorer',
    subtitle: 'Interactive 3D Model',
    description:
      'Rotate, orbit and dissect the architecture in true 3D. Toggle floors, isolate units, and inspect the build module by module.',
    icon: Boxes,
    src: 'https://www.coohom.com/pub/modelo/viewer/preview/3FO3GVEJE5YC',
  },
];

const ExperienceCard = ({ experience, onFullscreen }) => {
  const Icon = experience.icon;
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      data-testid={`experience-card-${experience.id}`}
      className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 transition-all duration-500 flex flex-col"
    >
      {/* Live iframe area */}
      <div className="relative aspect-[16/10] bg-black overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0b] z-0">
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
              <span className="text-xs uppercase tracking-widest">Loading experience…</span>
            </div>
          </div>
        )}
        <iframe
          data-testid={`experience-iframe-${experience.id}`}
          src={experience.src}
          title={experience.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full border-0 z-[1]"
          allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope; magnetometer; camera; microphone"
          allowFullScreen
        />

        {/* Fullscreen button */}
        <button
          type="button"
          data-testid={`experience-fullscreen-${experience.id}`}
          onClick={() => onFullscreen(experience)}
          className="absolute top-3 right-3 z-10 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-black/70 hover:bg-emerald-500/90 backdrop-blur-md border border-white/10 hover:border-emerald-400 text-white text-xs font-medium transition-all duration-300"
          aria-label={`Open ${experience.title} fullscreen`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Fullscreen</span>
        </button>
      </div>

      {/* Caption */}
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center transition-all duration-500 group-hover:bg-emerald-500/20">
            <Icon className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-emerald-400 text-xs font-medium uppercase tracking-widest">
            {experience.subtitle}
          </p>
        </div>
        <h3 className="text-2xl font-light text-white mb-3">{experience.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{experience.description}</p>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const [active, setActive] = useState(null);

  return (
    <section id="experience" className="relative py-32 bg-[#0d0d0e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-6">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest">
            Live Experiences
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
          <span className="block">Step inside the architecture.</span>
          <span className="block">Explore it on your terms.</span>
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed mb-16 max-w-3xl">
          Two real, working experiences powered by Flik Explore — running live below. Tap fullscreen to launch the immersive view.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {EXPERIENCES.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} onFullscreen={setActive} />
          ))}
        </div>
      </div>

      <ExperienceModal
        open={!!active}
        onOpenChange={(next) => !next && setActive(null)}
        title={active?.title || ''}
        subtitle={active?.subtitle || ''}
        src={active?.src || ''}
      />
    </section>
  );
};

export default ExperienceSection;
