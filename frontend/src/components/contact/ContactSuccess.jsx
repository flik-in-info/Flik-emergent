import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

const ContactSuccess = ({ email, onReset }) => (
  <div className="text-center py-12" data-testid="contact-success">
    <div className="mx-auto w-14 h-14 rounded-full bg-[#f4fbfa] border border-[#0F766E]/25 flex items-center justify-center mb-5">
      <CheckCircle2 className="w-7 h-7 text-[#0F766E]" />
    </div>
    <h3 className="text-2xl font-medium text-[#0b1020] mb-3 font-display">Message sent.</h3>
    <p className="text-slate-600 max-w-md mx-auto mb-8 leading-relaxed text-sm">
      Your enquiry just landed in{' '}
      <span className="text-[#0F766E] font-medium">{email}</span>. A Flik specialist will
      respond within one business day.
    </p>
    <Button
      data-testid="contact-send-another"
      variant="outline"
      onClick={onReset}
      className="border-slate-200 text-[#0b1020] hover:bg-slate-50"
    >
      Send another enquiry
    </Button>
  </div>
);

export default ContactSuccess;
