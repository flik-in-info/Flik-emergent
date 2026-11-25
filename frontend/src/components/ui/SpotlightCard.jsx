import React, { useRef, useCallback } from 'react';

/**
 * Tactile dark-glass card with zero-re-render mouse-tracked emerald/specular rim glow.
 */
const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(34, 229, 90, 0.14)',
  borderGlowColor = 'rgba(34, 229, 90, 0.32)',
  as: Component = 'div',
  ...props
}) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden [--mx:-999px] [--my:-999px] ${className}`}
      {...props}
    >
      {/* Dynamic spotlight aura inside container */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[inherit]"
        style={{
          background: `radial-gradient(520px circle at var(--mx) var(--my), ${spotlightColor}, transparent 42%)`,
        }}
      />
      {/* Specular hairline highlight tracking cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[inherit]"
        style={{
          padding: '1px',
          background: `radial-gradient(360px circle at var(--mx) var(--my), ${borderGlowColor}, transparent 45%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </Component>
  );
};

export default SpotlightCard;
