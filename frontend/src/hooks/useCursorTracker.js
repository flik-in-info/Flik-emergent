import { useEffect, useRef } from 'react';

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="hover"], label[for], summary, iframe';

const FOCUSABLE_TAGS = new Set([
  'A',
  'BUTTON',
  'INPUT',
  'TEXTAREA',
  'SELECT',
  'IFRAME',
  'SUMMARY',
]);

const isInteractive = (el) =>
  !!el &&
  (FOCUSABLE_TAGS.has(el.tagName) ||
    el.getAttribute?.('role') === 'button' ||
    el.dataset?.cursor === 'hover');

/**
 * Attach two-layer cursor behavior (precise dot + eased ring) to the given refs.
 * Returns an unsubscribe via the standard `useEffect` cleanup.
 *
 * All listeners are attached to `window`/`document.documentElement`; the refs
 * receive imperative DOM updates (transform + data-attributes) without
 * triggering React re-renders.
 */
export default function useCursorTracker({ dotRef, ringRef, labelRef }) {
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const state = useRef({ visible: false, hovering: false });
  const rafId = useRef(0);

  useEffect(() => {
    // Skip on touch / coarse pointer
    if (window.matchMedia('(any-hover: none)').matches) return undefined;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    const labelEl = labelRef.current;
    if (!dot || !ringEl) return undefined;

    const setVisible = (next) => {
      if (state.current.visible === next) return;
      state.current.visible = next;
      ringEl.dataset.visible = String(next);
      dot.dataset.visible = String(next);
    };

    const setHover = (next, label) => {
      if (next === state.current.hovering) {
        if (labelEl) labelEl.textContent = label || '';
        return;
      }
      state.current.hovering = next;
      ringEl.dataset.state = next ? 'hover' : 'idle';
      dot.dataset.state = next ? 'hover' : 'idle';
      if (labelEl) labelEl.textContent = next ? label || '' : '';
    };

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    const onOver = (e) => {
      const interactive = e.target.closest?.(HOVER_SELECTOR);
      const label =
        interactive?.dataset?.cursorLabel ||
        (interactive?.tagName === 'IFRAME' ? 'Drag' : '');
      setHover(isInteractive(interactive), label);
    };

    const onDown = () => {
      ringEl.dataset.press = 'true';
      dot.dataset.press = 'true';
    };

    const onUp = () => {
      ringEl.dataset.press = 'false';
      dot.dataset.press = 'false';
    };

    const tick = () => {
      // Inner dot snaps to pointer
      const { x: mx, y: my } = mouse.current;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      // Outer ring eased follow (lerp)
      ring.current.x += (mx - ring.current.x) * 0.18;
      ring.current.y += (my - ring.current.y) * 0.18;
      ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.classList.add('cursor-custom');
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove('cursor-custom');
    };
  }, [dotRef, ringRef, labelRef]);
}
