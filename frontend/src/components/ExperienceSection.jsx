import React, { useState } from 'react';
import { Maximize2, Compass, Boxes, Loader2, Sparkles, Move3d, Radio } from 'lucide-react';
import ExperienceModal from './ExperienceModal';

const EXPERIENCES = [
  {
    id: 'virtual-walkthrough',
    title: 'Virtual Walkthrough',
    subtitle: 'AI Guided Spatial Tour',
    badge: '360° Interior Panorama',
    description:
      'Step inside a fully rendered luxury residence. Seamlessly navigate between living suites, bedrooms, and terraces with natural daylight simulation—no plugins, zero downloads.',
    icon: Compass,
    src: process.env.REACT_APP_VIRTUAL_WALKTHROUGH_URL,
    fps: '60 FPS',
  },
  {
    id: 'modular-explorer',
    title: 'Modular Explorer',
    subtitle: 'Interactive 3D Architectural Model',
    badge: 'Real-Time Orbit & Floor Isolate',
    description:
      'Rotate, orbit and dissect the tower architecture in true 3D space. Toggle individual floors, isolate specific unit layouts, and inspect construction modules live.',
    icon: Boxes,
    src: process.env.REACT_APP_MODULAR_EXPLORER_URL,
    fps: '60 FPS',
  },
];

const ExperienceCard = ({ experience, onFullscreen }) => {
  const Icon = experience.icon;
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      data-testid={`experience-card-${experience.id}`}
      className="group relative rounded-2xl overflow-hidden bg-[#0d0d10] border border-white/10 hover:border-emerald-500/40 transition-all duration-500 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.8)] card-3d-tilt"
    >
      {/* Top HUD Bar */}
      <div className="px-5 py-3 bg-white/[0.02] border-b border-white/10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-gray-300 uppercase tracking-wider">{experience.badge}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500 text-[11px]">
          <span className="text-emerald-400/90">{experience.fps}</span>
          <span>● TOUCH & DRAG ACTIVE</span>
        </div>
      </div>

      {/* Live iframe area */}
      <div className="relative aspect-[16/10] bg-black overflow-hidden" data-cursor="hover" data-cursor-label="Drag to explore">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#09090b] z-0">
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                Streaming 3D instance…
              </span>
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
          data-cursor-label="Fullscreen"
          onClick={() => onFullscreen(experience)}
          className="absolute top-3 right-3 z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-emerald-500 hover:text-black backdrop-blur-md border border-white/15 hover:border-emerald-400 text-white text-xs font-medium transition-all duration-300 shadow-lg"
          aria-label={`Open ${experience.title} fullscreen`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="text-[11px] font-mono uppercase">Fullscreen</span>
        </button>
      </div>

      {/* Caption & Metadata */}
      <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between bg-white/[0.01]">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center transition-all duration-500 group-hover:bg-emerald-500/20 group-hover:scale-110">
              <Icon className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-emerald-400 text-xs font-mono uppercase tracking-widest">
              {experience.subtitle}
            </p>
          </div>
          <h3 className="text-2xl font-light text-white mb-2 group-hover:text-emerald-300 transition-colors">
            {experience.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed font-light">
            {experience.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
          <span>ZERO APP DOWNLOADS</span>
          <span className="text-emerald-400/90">INTERACTIVE 3D RUNNING</span>
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const [active, setActive] = useState(null);

  return (
    <section id="experience" className="relative py-32 bg-[#09090b] overflow-hidden">
      {/* Background Subtle Mesh and Blueprint Grid */}
      <div className="absolute inset-0 bg-arch-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIVE INTERACTIVE SHOWCASE · TEST DRIVE IN-BROWSER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            <span className="block font-extralight text-gray-300">Step inside the architecture.</span>
            <span className="block font-medium text-gradient-emerald">
              Explore it on your terms.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
            Two real, interactive experiences running directly in your browser. Drag to look around, inspect floor details, or click fullscreen for complete spatial immersion.
          </p>
        </div>

        {/* 2 Big Live Showcases */}
        <div className="grid md:grid-cols-2 gap-8">
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
