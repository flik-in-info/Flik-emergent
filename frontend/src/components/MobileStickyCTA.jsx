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
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-black/95 backdrop-blur-md border-t border-white/15 px-4 py-2.5 flex items-center justify-between gap-3"
      style={{
        paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="min-w-0">
        <div className="text-xs font-medium text-white truncate">Flik Explorer</div>
        <div className="text-[10px] font-mono text-gray-400 truncate">Hastok Enterprise Pvt. Ltd.</div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <a
          href={`https://wa.me/${contactData.phoneRaw}?text=${encodeURIComponent(contactData.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => telemetry.ctaClick('WhatsApp', 'mobile_sticky_dock')}
          aria-label="Chat on WhatsApp"
          className="w-9 h-9 border border-white/20 bg-black flex items-center justify-center text-white hover:border-[#22E55A] hover:text-[#22E55A] rounded-md transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
        </a>

        <Button
          data-testid="mobile-sticky-request-demo"
          onClick={() => {
            telemetry.ctaClick('Request Demo', 'mobile_sticky_dock');
            openDemoDialog('mobile_sticky_dock');
          }}
          className="bg-[#22E55A] hover:bg-emerald-400 text-black font-semibold text-xs h-9 px-4 rounded-md"
        >
          Request Demo
        </Button>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
