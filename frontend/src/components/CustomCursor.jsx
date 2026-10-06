import React, { useRef } from 'react';
import useCursorTracker from '../hooks/useCursorTracker';

/**
 * Premium two-layer cursor for Flik Explore.
 *  - Inner dot:   tracks pointer 1:1 (precise)
 *  - Outer ring:  eased follow (smooth trail), morphs on hoverable elements
 *  - Auto-hides on touch devices and when the pointer leaves the viewport
 *
 * All tracking logic lives in the `useCursorTracker` hook; this component is
 * just the markup shell.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useCursorTracker({ dotRef, ringRef, labelRef });

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
