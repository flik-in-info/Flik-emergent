import React, { useEffect, useRef, useState } from 'react';

/**
 * Architectural Ambient Spotlight Cursor.
 * - Keeps native OS cursor 100% natural, sharp, and instantaneous (0ms latency).
 * - Smoothly glides a subtle ambient radial glow behind the pointer.
 * - Displays a contextual micro-pill beside the cursor only over interactive 3D viewports.
 * - Disables automatically on touch devices.
 */
const CustomCursor = () => {
  const spotlightRef = useRef(null);
  const badgeRef = useRef(null);
  const [badgeText, setBadgeText] = useState('');
  const pos = useRef({ x: -200, y: -200 });
  const rafId = useRef(0);

  useEffect(() => {
    // Only enable on desktop with mouse pointer
    if (window.matchMedia('(any-hover: none)').matches) return undefined;

    const spotlight = spotlightRef.current;
    const badge = badgeRef.current;
    if (!spotlight) return undefined;

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      spotlight.dataset.visible = 'true';
    };

    const onLeave = () => {
      spotlight.dataset.visible = 'false';
      if (badge) badge.dataset.visible = 'false';
    };

    const onOver = (e) => {
      const target = e.target;
      const interactive = target.closest('button, a, [role="button"], input, textarea');
      const threeD = target.closest('[data-cursor-label], iframe');

      spotlight.dataset.state = interactive ? 'hover' : 'idle';

      if (threeD && badge) {
        const label = threeD.getAttribute('data-cursor-label') || 'Click & Drag 3D';
        setBadgeText(label);
        badge.dataset.visible = 'true';
      } else if (badge) {
        badge.dataset.visible = 'false';
      }
    };

    const tick = () => {
      const { x, y } = pos.current;
      spotlight.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (badge) {
        badge.style.transform = `translate3d(${x + 14}px, ${y + 14}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Ambient Spotlight Glow (Hardware accelerated) */}
      <div
        ref={spotlightRef}
        data-visible="false"
        data-state="idle"
        className="ambient-cursor-spotlight pointer-events-none"
        aria-hidden="true"
      />

      {/* Contextual Pill for 3D Viewports */}
      <div
        ref={badgeRef}
        data-visible="false"
        className="cursor-context-badge pointer-events-none hidden sm:block"
        aria-hidden="true"
      >
        <div className="px-2.5 py-1 rounded-full bg-black/90 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono text-emerald-300 shadow-xl flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{badgeText || 'Drag to Explore'}</span>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
