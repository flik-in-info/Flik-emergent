import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';
import { contactData } from '../data/mock';

const MobileStickyCTA = () => {
  const { open: openDemoDialog } = useDemoDialog();

  const handleOpenDemo = () => {
    telemetry.ctaClick('Request Demo', 'mobile_sticky_dock');
    openDemoDialog('mobile_sticky_dock');
  };

  const handleWhatsApp = () => {
    telemetry.ctaClick('WhatsApp', 'mobile_sticky_dock');
  };

  return (
    <div
      data-testid="mobile-sticky-action-dock"
      className="lg:hidden fixed bottom-3 inset-x-3 z-40 max-w-md mx-auto pointer-events-auto transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
      style={{
        paddingBottom: 'max(0px, env(safe-area-inset-bottom))'
      }}
    >
      <div className="bg-[#0b0b0e]/92 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 sm:p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(16,185,129,0.22)] flex items-center justify-between gap-2.5">
        {/* Live Availability Pill */}
        <div className="flex items-center gap-2 pl-2 flex-shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-white tracking-tight leading-tight flex items-center gap-1">
              Live Digital Twin
            </span>
            <span className="text-[9px] font-mono text-emerald-400/90 leading-tight">
              Instant 3D Access
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 flex-1 justify-end">
          {/* Quick WhatsApp Consultation */}
          <a
            href={`https://wa.me/${contactData.phoneRaw}?text=${encodeURIComponent(contactData.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
            aria-label="Chat on WhatsApp"
            className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-500/30 active:scale-95 transition-all flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
          </a>

          {/* Primary Request Demo Button */}
          <Button
            data-testid="mobile-sticky-request-demo"
            onClick={handleOpenDemo}
            className="flex-1 max-w-[170px] bg-emerald-500 hover:bg-emerald-400 text-white font-medium text-xs sm:text-sm h-9 px-3.5 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.35)] active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Request Demo</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
