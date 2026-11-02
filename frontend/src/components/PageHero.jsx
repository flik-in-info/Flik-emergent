import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PageHero = ({ badge, title, subtitle, breadcrumb = "Overview" }) => {
  return (
    <div className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-white/5">
      {/* Background Volumetric Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[350px] bg-emerald-500/[0.04] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-emerald-400 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Home</span>
          <span className="text-white/20">/</span>
          <span className="text-gray-400 group-hover:text-emerald-300">{breadcrumb}</span>
        </Link>

        {/* Live Status Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium tracking-wider mb-6 block w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight max-w-4xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-5 text-base sm:text-lg text-gray-400 font-light leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHero;
