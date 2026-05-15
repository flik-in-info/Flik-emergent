import React, { useState } from 'react';
import { ArrowUpRight, Compass, Boxes } from 'lucide-react';
import ExperienceModal from './ExperienceModal';

const EXPERIENCES = [
  {
    id: 'virtual-walkthrough',
    title: 'Virtual Walkthrough',
    subtitle: 'AI Guided Panoramic Tour',
    description:
      'Step inside a fully rendered space. AI guides you through each room, lighting condition and viewpoint—no plug-ins, no downloads.',
    cta: 'Launch walkthrough',
    icon: Compass,
    src: 'https://www.coohom.com/pub/tool/panorama/aiwalking?obsPlanId=3FO3GVEJE5YC&locale=en_US&utm_source=smart720_share&utm_medium=linkcopy&utm_content=3FO3GVEJE5YC',
  },
  {
    id: 'modular-explorer',
    title: 'Modular Explorer',
    subtitle: 'Interactive 3D Model',
    description:
      'Rotate, orbit and dissect the architecture in true 3D. Toggle floors, isolate units, and inspect the build module by module.',
    cta: 'Open 3D model',
    icon: Boxes,
    src: 'https://www.coohom.com/pub/modelo/viewer/preview/3FO3GVEJE5YC',
  },
];

const ExperienceCard = ({ experience, onOpen }) => {
  const Icon = experience.icon;
  return (
    <button
      type="button"
      data-testid={`experience-card-${experience.id}`}
      onClick={() => onOpen(experience)}
      className="group relative text-left rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 transition-all duration-500 p-8 lg:p-10 hover:bg-white/[0.04]"
    >
      {/* Hover glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative">
        <div className="flex items-start justify-between mb-8">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center transition-all duration-500 group-hover:bg-emerald-500/20 group-hover:scale-110">
            <Icon className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10">
            <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <p className="text-emerald-400 text-xs font-medium uppercase tracking-widest mb-3">
          {experience.subtitle}
        </p>
        <h3 className="text-2xl lg:text-3xl font-light text-white mb-4">
          {experience.title}
        </h3>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
          {experience.description}
        </p>

        <span className="inline-flex items-center text-sm font-medium text-white border-b border-emerald-500/40 pb-1 transition-all duration-300 group-hover:border-emerald-400 group-hover:text-emerald-300">
          {experience.cta}
        </span>
      </div>
    </button>
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
          Two real, working experiences powered by Flik Explore. No installs, no waiting—launch a guided panoramic tour or pivot into a full 3D model with a single click.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {EXPERIENCES.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} onOpen={setActive} />
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
