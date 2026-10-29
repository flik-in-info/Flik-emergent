import React from 'react';
import { Building, TrendingUp, Palette } from 'lucide-react';
import { teamsSection, images } from '../data/mock';
import Card3DTilt from './3d/Card3DTilt';

const icons = [Building, TrendingUp, Palette];

const TeamsSection = () => {
  return (
    <section className="relative py-32 bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-6">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest font-mono">
            {teamsSection.label}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-16">
          {teamsSection.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Teams Grid with 3D Tilt */}
        <div className="grid lg:grid-cols-3 gap-8">
          {teamsSection.teams.map((team, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Card3DTilt
                key={team.title}
                maxTilt={7}
                className="rounded-3xl p-8 bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:scale-110">
                    <Icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-4">{team.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-light text-sm sm:text-base">{team.description}</p>
                </div>
              </Card3DTilt>
            );
          })}
        </div>

        {/* Showroom Image */}
        <div className="mt-20 relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src={images.showroom}
            alt="Flik Experience Center & Digital Sales Gallery Deployment for Indian Developers"
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
