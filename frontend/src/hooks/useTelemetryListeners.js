import { useEffect, useRef } from 'react';
import { telemetry, trackEvent } from '../utils/telemetry';

const SCROLL_THRESHOLDS = [25, 50, 75, 90, 100];
const DWELL_MILESTONES = [15, 30, 60, 120, 180, 300, 600];

export default function useTelemetryListeners() {
  const firedScrolls = useRef(new Set());
  const firedDwells = useRef(new Set());
  const activeSecondsRef = useRef(0);

  useEffect(() => {
    // 1. Initial Page View
    telemetry.pageView(window.location.pathname);

    // 2. Active Dwell Time Clock (only ticks when tab is visible)
    const dwellInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        activeSecondsRef.current += 1;
        const currentSecs = activeSecondsRef.current;

        // Check milestones
        for (const milestone of DWELL_MILESTONES) {
          if (currentSecs >= milestone && !firedDwells.current.has(milestone)) {
            firedDwells.current.add(milestone);
            trackEvent('dwell_time_milestone', {
              seconds: milestone,
              label: `${milestone}s active dwell`,
            });
          }
        }
      }
    }, 1000);

    // 3. Scroll Depth Observer
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) return;

      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !firedScrolls.current.has(threshold)) {
          firedScrolls.current.add(threshold);
          telemetry.scrollDepth(threshold);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 4. Section Visibility Observer (IntersectionObserver)
    const sectionIds = [
      'platform',
      'capabilities',
      'experience',
      'intelligence',
      'technology',
      'teams',
      'metrics',
      'difference',
      'faq',
      'contact',
    ];

    let observer = null;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              const id = entry.target.id;
              if (id) {
                telemetry.sectionView(id);
              }
            }
          });
        },
        { threshold: [0.3] }
      );

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }

    // 5. Global Link Interceptor (WhatsApp, Phone, Email, PDF)
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';

      if (href.includes('wa.me')) {
        telemetry.whatsAppClick(anchor.getAttribute('data-telemetry-loc') || 'link');
      } else if (href.includes('presentation.pdf') || href.includes('FLIK_presentation.pdf')) {
        telemetry.presentationViewed(href);
      } else if (href.startsWith('tel:')) {
        telemetry.contactDirectClick('phone', href);
      } else if (href.startsWith('mailto:')) {
        telemetry.contactDirectClick('email', href);
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });

    return () => {
      clearInterval(dwellInterval);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleGlobalClick, { capture: true });
      if (observer) observer.disconnect();
    };
  }, []);
}
