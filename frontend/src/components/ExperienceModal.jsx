import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';

const ExperienceModal = ({ open, onOpenChange, title, subtitle, src }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      data-testid="experience-modal"
      className="!max-w-none w-screen h-screen sm:rounded-none p-0 gap-0 border-0 bg-[#0a0a0b] left-0 top-0 translate-x-0 translate-y-0 data-[state=closed]:slide-out-to-left-0 data-[state=closed]:slide-out-to-top-0 data-[state=open]:slide-in-from-left-0 data-[state=open]:slide-in-from-top-0"
    >
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <DialogDescription className="sr-only">{subtitle}</DialogDescription>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <p className="text-emerald-400 text-xs font-medium uppercase tracking-widest mb-1">
            {subtitle}
          </p>
          <h2 className="text-white text-xl font-light">{title}</h2>
        </div>
      </div>

      {/* Iframe */}
      <iframe
        data-testid="experience-iframe"
        src={open ? src : 'about:blank'}
        title={title}
        className="w-full h-full border-0"
        allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope; magnetometer; camera; microphone"
        allowFullScreen
      />
    </DialogContent>
  </Dialog>
);

export default ExperienceModal;
