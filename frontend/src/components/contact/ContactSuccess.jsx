import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

const ContactSuccess = ({ email, onReset }) => (
  <div className="text-center py-12" data-testid="contact-success">
    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-6">
      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
    </div>
    <h3 className="text-3xl font-light text-white mb-4">Message ready.</h3>
    <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
      Your email client just opened with your enquiry pre-filled and addressed to{' '}
      <span className="text-emerald-400">{email}</span>. Send it off and a Flik
      specialist will respond within one business day.
    </p>
    <Button
      data-testid="contact-send-another"
      variant="outline"
      onClick={onReset}
      className="border-white/20 text-white hover:bg-white/10"
    >
      Send another enquiry
    </Button>
  </div>
);

export default ContactSuccess;
