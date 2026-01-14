import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Phone, Shield, Server, Globe } from 'lucide-react';
import { closingSection, images } from '../data/mock';

const trustIcons = [Shield, Server, Server, Globe];

const ClosingCTA = () => {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={images.showroom}
          alt="Flik Experience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/90 to-[#0a0a0b]/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight mb-8">
          {closingSection.headline.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Subheadline */}
        <p className="text-lg lg:text-xl text-gray-400 leading-relaxed mb-12 max-w-2xl mx-auto">
          {closingSection.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium px-10 py-6 text-base transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 group"
          >
            {closingSection.primaryCta}
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 font-medium px-10 py-6 text-base transition-all duration-300 group"
          >
            <Phone className="mr-2 w-5 h-5" />
            {closingSection.secondaryCta}
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {closingSection.trustIndicators.map((indicator, index) => {
            const Icon = trustIcons[index];
            return (
              <div key={index} className="flex items-center gap-2 text-gray-500">
                <Icon className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">{indicator}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;