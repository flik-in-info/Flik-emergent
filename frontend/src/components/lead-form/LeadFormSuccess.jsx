import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

const LeadFormSuccess = ({ onClose }) => (
  <div className="py-6 text-center" data-testid="lead-form-success">
    <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mb-5">
      <CheckCircle2 className="w-7 h-7 text-emerald-400" />
    </div>
    <h3 className="text-2xl font-light mb-3">Request received.</h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
      A Flik specialist will reach out within one business day to schedule your personalized walkthrough.
    </p>
    <Button
      data-testid="lead-form-close-success"
      onClick={onClose}
      className="bg-white text-gray-900 hover:bg-gray-100"
    >
      Close
    </Button>
  </div>
);

export default LeadFormSuccess;
