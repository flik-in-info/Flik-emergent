import React from 'react';
import { Button } from './ui/button';
import { MessageSquare } from 'lucide-react';
import { useDemoDialog } from '../context/DemoDialogContext';
import { telemetry } from '../utils/telemetry';
import { contactData } from '../data/mock';

const MobileStickyCTA = () => {
  const { open: openDemoDialog, isOpen } = useDemoDialog();

  if (isOpen) {
    return null;
  }

  return (
    <div
      data-testid="mobile-sticky-action-dock"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] px-4 py-2.5 flex items-center justify-between gap-3"
      style={{
        paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="min-w-0">
        <div className="text-xs font-semibold text-[#0b1020] truncate">Flik Explorer</div>
        <div className="text-[10px] font-mono text-slate-500 truncate">Hastok Enterprise Pvt. Ltd.</div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <a
          href={`https://wa.me/${contactData.phoneRaw}?text=${encodeURIComponent(contactData.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => telemetry.ctaClick('WhatsApp', 'mobile_sticky_dock')}
          aria-label="Chat on WhatsApp"
          className="w-9 h-9 border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:border-[#0F766E] hover:text-[#0F766E] rounded-lg transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
        </a>

        <Button
          data-testid="mobile-sticky-request-demo"
          onClick={() => {
            telemetry.ctaClick('Request Demo', 'mobile_sticky_dock');
            openDemoDialog('mobile_sticky_dock');
          }}
          className="bg-[#0b1020] hover:bg-[#0F766E] text-white font-medium text-xs h-9 px-4 rounded-lg"
        >
          Request Demo
        </Button>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
