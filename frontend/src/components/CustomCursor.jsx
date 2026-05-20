import React, { useEffect, useRef } from 'react';

/**
 * Premium two-layer cursor for Flik Explore.
 *  - Inner dot:   tracks pointer 1:1 (precise)
 *  - Outer ring:  eased follow (smooth trail), morphs on hoverable elements
 *  - Auto-hides on touch devices and when the pointer leaves the viewport
 */
const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="hover"], label[for], summary, iframe';

const FocusableTag = (el) => {
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === 'A' ||
    tag === 'BUTTON' ||
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    tag === 'IFRAME' ||
    tag === 'SUMMARY' ||
    el.getAttribute?.('role') === 'button' ||
    el.dataset?.cursor === 'hover'
  );
};

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  // animation refs (avoid re-renders)
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef(0);
  const visible = useRef(false);
  const hovering = useRef(false);
  const pressing = useRef(false);

  useEffect(() => {
    // Touch / coarse-pointer: skip entirely
    if (window.matchMedia('(any-hover: none)').matches) return undefined;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    const labelEl = labelRef.current;
    if (!dot || !ringEl) return undefined;

    const setHoverState = (next, label) => {
      if (next === hovering.current) {
        if (label && labelEl) labelEl.textContent = label;
        return;
      }
      hovering.current = next;
      ringEl.dataset.state = next ? 'hover' : 'idle';
      dot.dataset.state = next ? 'hover' : 'idle';
      if (labelEl) labelEl.textContent = next ? (label || '') : '';
    };

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        ringEl.dataset.visible = 'true';
        dot.dataset.visible = 'true';
      }
    };

    const onLeave = () => {
      visible.current = false;
      ringEl.dataset.visible = 'false';
      dot.dataset.visible = 'false';
    };

    const onOver = (e) => {
      const interactive = e.target.closest?.(HOVER_SELECTOR);
      const label =
        interactive?.dataset?.cursorLabel ||
        (interactive?.tagName === 'IFRAME' ? 'Drag' : '');
      setHoverState(!!interactive && FocusableTag(interactive), label);
    };

    const onDown = () => {
      pressing.current = true;
      ringEl.dataset.press = 'true';
      dot.dataset.press = 'true';
    };

    const onUp = () => {
      pressing.current = false;
      ringEl.dataset.press = 'false';
      dot.dataset.press = 'false';
    };

    const tick = () => {
      // Inner dot: snap to mouse
      dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;

      // Outer ring: eased follow
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;
      ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    rafId.current = requestAnimationFrame(tick);

    document.documentElement.classList.add('cursor-custom');

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove('cursor-custom');
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        data-testid="custom-cursor-ring"
        data-state="idle"
        data-visible="false"
        data-press="false"
        className="custom-cursor-ring"
        aria-hidden="true"
      >
        <span ref={labelRef} className="custom-cursor-label" />
      </div>
      <div
        ref={dotRef}
        data-testid="custom-cursor-dot"
        data-state="idle"
        data-visible="false"
        data-press="false"
        className="custom-cursor-dot"
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
