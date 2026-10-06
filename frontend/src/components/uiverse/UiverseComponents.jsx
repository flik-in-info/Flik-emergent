import React, { useRef, useState } from 'react';

/**
 * Uiverse Radiant Glowing Button
 * Features: Running neon border beam, deep emerald backdrop, hover bloom, and arrow slide.
 */
export const UiverseButton = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'glass'
  className = '',
  icon: Icon,
  size = 'md', // 'sm' | 'md' | 'lg'
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3.5 text-sm',
    lg: 'px-8 py-4.5 text-base',
  }[size];

  if (variant === 'primary') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`relative inline-flex items-center justify-center font-semibold text-black rounded-2xl group overflow-hidden transition-all duration-300 transform active:scale-95 shadow-[0_0_30px_rgba(34,229,90,0.35)] hover:shadow-[0_0_50px_rgba(34,229,90,0.6)] ${sizeClasses} ${className}`}
      >
        {/* Animated Conic Border Beam */}
        <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 group-hover:scale-105 transition-transform duration-500" />
        
        {/* Shimmer light streak */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2 font-medium tracking-wide">
          {Icon && <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />}
          <span>{children}</span>
        </span>
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`relative inline-flex items-center justify-center font-medium text-white rounded-2xl p-[1px] group transition-all duration-300 active:scale-95 ${className}`}
      >
        {/* Glowing border gradient */}
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 via-emerald-500/40 to-white/20 group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-500" />
        
        {/* Inner Dark Background */}
        <span className={`relative w-full h-full bg-[#0a0a0f] rounded-2xl flex items-center justify-center gap-2 group-hover:bg-[#12121a] transition-colors ${sizeClasses}`}>
          {Icon && <Icon className="w-4 h-4 text-emerald-400 transition-transform group-hover:rotate-12" />}
          <span>{children}</span>
        </span>
      </button>
    );
  }

  // Glass Variant
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex items-center justify-center font-medium text-gray-200 hover:text-white rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 backdrop-blur-xl transition-all duration-300 active:scale-95 ${sizeClasses} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 mr-2 text-emerald-400" />}
      <span>{children}</span>
    </button>
  );
};

/**
 * Uiverse 3D Interactive Spotlight Card
 * Features: Mouse-tracking spotlight flashlight, 3D tilt perspective, frosted borders.
 */
export const Uiverse3DCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(34, 229, 90, 0.12)',
  glowColor = 'rgba(34, 229, 90, 0.25)',
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Subtle 3D tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered ? 'transform 100ms ease-out' : 'transform 500ms ease-out',
      }}
      className={`relative rounded-3xl bg-[#09090d] border border-white/10 hover:border-emerald-500/40 p-6 overflow-hidden transition-all duration-500 shadow-2xl group ${className}`}
    >
      {/* Radial Spotlight Flashlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 40%)`,
          }}
        />
      )}

      {/* Subtle Top Edge Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Card Content with 3D Depth */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/**
 * Uiverse Holographic Shimmer Pill Badge
 */
export const UiverseBadge = ({ text, highlight = 'LIVE', icon: Icon, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-emerald-500/30 text-xs font-mono text-gray-300 shadow-[0_0_20px_rgba(34,229,90,0.15)] relative overflow-hidden backdrop-blur-xl ${className}`}
    >
      {/* Running Shimmer Light Beam */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent pointer-events-none" />

      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>

      {Icon && <Icon className="w-3.5 h-3.5 text-emerald-400" />}
      <span className="text-emerald-400 font-semibold tracking-wider uppercase">{highlight}</span>
      <span className="text-gray-500">|</span>
      <span className="text-gray-300 font-light">{text}</span>
    </div>
  );
};

/**
 * Uiverse Glowing Metric Display Box
 */
export const UiverseMetricCard = ({ value, label, subtext, icon: Icon, trend }) => {
  return (
    <Uiverse3DCard className="flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">{label}</span>
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mb-2">
        <div className="text-3xl sm:text-4xl font-light text-white tracking-tight font-mono">{value}</div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/5 font-light">
        <span>{subtext}</span>
        {trend && <span className="text-emerald-400 font-mono font-medium">{trend}</span>}
      </div>
    </Uiverse3DCard>
  );
};
