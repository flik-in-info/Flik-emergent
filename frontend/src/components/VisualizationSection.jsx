import React from 'react';
import { Monitor, Sun, CloudRain, View } from 'lucide-react';
import { visualizationSection } from '../data/mock';
import Floorplan3DViewer from './3d/Floorplan3DViewer';
import Card3DTilt from './3d/Card3DTilt';

const icons = [Monitor, Sun, CloudRain, View];

const VisualizationSection = () => {
  return (
    <section id="capabilities" className="relative py-32 bg-[#0d0d0e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <div className="mb-6">
          <span className="text-emerald-400 text-sm font-medium uppercase tracking-widest font-mono">
            {visualizationSection.label}
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
          {visualizationSection.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Body */}
        <p className="text-lg text-gray-400 leading-relaxed mb-16 max-w-3xl font-light">
          {visualizationSection.body}
        </p>

        {/* Features Grid with 3D Tilt Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {visualizationSection.features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <Card3DTilt
                key={feature.title}
                maxTilt={6}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-emerald-500/20">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </Card3DTilt>
            );
          })}
        </div>

        {/* Live Interactive 3D Floorplan & Spatial Studio Component */}
        <Floorplan3DViewer />
      </div>
    </section>
  );
};

export default VisualizationSection;
