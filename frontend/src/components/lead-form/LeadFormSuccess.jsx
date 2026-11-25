import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

const LeadFormSuccess = ({ onClose }) => (
  <div className="py-6 text-center" data-testid="lead-form-success">
    <div className="mx-auto w-14 h-14 rounded-full bg-[#f4fbfa] border border-[#0F766E]/25 flex items-center justify-center mb-5">
      <CheckCircle2 className="w-7 h-7 text-[#0F766E]" />
    </div>
    <h3 className="text-2xl font-medium text-[#0b1020] mb-3 font-display">Request received.</h3>
    <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
      A Flik specialist from Hastok Enterprise Pvt. Ltd. will reach out within one business day to schedule your walkthrough.
    </p>
    <Button
      data-testid="lead-form-close-success"
      onClick={onClose}
      className="bg-[#0b1020] text-white hover:bg-[#0F766E]"
    >
      Close
    </Button>
  </div>
);

export default LeadFormSuccess;
