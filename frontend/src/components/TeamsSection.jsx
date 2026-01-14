import React from 'react';
import { Building, TrendingUp, Palette } from 'lucide-react';
import { teamsSection, images } from '../data/mock';

const icons = [Building, TrendingUp, Palette];

const TeamsSection = () => {
  return (
    <section className="relative py-32 bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-6">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest">
            {teamsSection.label}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-16">
          {teamsSection.headline.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Teams Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {teamsSection.teams.map((team, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden"
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/5 rounded-2xl transition-all duration-500 group-hover:border-emerald-500/30" />
                
                {/* Content */}
                <div className="relative p-8">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-emerald-500/20 group-hover:scale-110">
                    <Icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-4">{team.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{team.description}</p>
                </div>
                
                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>

        {/* Showroom Image */}
        <div className="mt-20 relative rounded-2xl overflow-hidden">
          <img
            src={images.showroom}
            alt="Flik Experience Center"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;