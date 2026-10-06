import React from 'react';
import { Building, TrendingUp, Palette, Sparkles, MonitorPlay } from 'lucide-react';
import { teamsSection, images } from '../data/mock';

const ICONS = [Building, TrendingUp, Palette];

const TeamsSection = () => {
  return (
    <section className="relative py-32 bg-[#09090b] overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-arch-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WHO IT&apos;S FOR · PURPOSE-BUILT FOR REAL ESTATE STAKEHOLDERS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            <span className="block font-extralight text-gray-300">{teamsSection.headline[0]}</span>
            <span className="block font-medium text-gradient-emerald">
              {teamsSection.headline[1]}
            </span>
          </h2>
        </div>

        {/* Teams Bento Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {teamsSection.teams.map((team, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={team.title}
                className="group relative p-8 rounded-2xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.07] hover:border-emerald-500/40 transition-all duration-400 flex flex-col justify-between"
              >
                {/* CAD marker */}
                <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-700 group-hover:text-emerald-500/60 transition-colors">
                  +
                </div>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 transition-all duration-400 group-hover:bg-emerald-500/20 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>

                  <div className="text-[10px] font-mono text-emerald-400/90 uppercase tracking-widest mb-2">
                    STAKEHOLDER // 0{index + 1}
                  </div>

                  <h3 className="text-2xl font-light text-white mb-4 group-hover:text-emerald-300 transition-colors">
                    {team.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    {team.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                  <span>DEPLOYMENT READY</span>
                  <span className="text-emerald-400/80">ACCELERATED ROI</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Showroom / Experience Center Image */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d10] shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          <div className="px-6 py-3.5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-gray-300 uppercase tracking-wider">
                PHYSICAL EXPERIENCE CENTER & LARGE-FORMAT VIDEO WALL INTEGRATION
              </span>
            </div>
            <span className="text-gray-400 text-[11px]">SALES GALLERY DEPLOYMENT</span>
          </div>

          <div className="relative">
            <img
              src={images.showroom}
              alt="Flik Experience Center & Digital Sales Gallery Deployment for Indian Developers"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 luxury-glass rounded-xl p-4 text-xs font-mono text-gray-300 border border-white/15 max-w-md hidden sm:block">
              <div className="text-emerald-400 text-[10px] uppercase tracking-wider mb-1">
                ● SALES GALLERY SHOWROOM
              </div>
              <div className="text-gray-400 text-[11px] leading-relaxed">
                Transform sales galleries with interactive 4K video walls and iPads running the Flik Explorer digital twin platform.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TeamsSection;