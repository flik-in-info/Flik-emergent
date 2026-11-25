import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

const ContactSuccess = ({ email, onReset }) => (
  <div className="text-center py-12" data-testid="contact-success">
    <div className="mx-auto w-14 h-14 rounded-full bg-black text-[#22E55A] flex items-center justify-center mb-5">
      <CheckCircle2 className="w-7 h-7" />
    </div>
    <h3 className="text-2xl font-medium text-black mb-3 font-display">Message sent.</h3>
    <p className="text-neutral-600 max-w-md mx-auto mb-8 leading-relaxed text-sm">
      Your enquiry just landed in{' '}
      <span className="text-black font-semibold">{email}</span>. A Flik specialist from Hastok Enterprise Pvt. Ltd. will
      respond within one business day.
    </p>
    <Button
      data-testid="contact-send-another"
      variant="outline"
      onClick={onReset}
      className="border-neutral-300 text-black hover:bg-neutral-100"
    >
      Send another enquiry
    </Button>
  </div>
);

export default ContactSuccess;
