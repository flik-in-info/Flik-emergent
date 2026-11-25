import React from 'react';
import { Loader2 } from 'lucide-react';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import LeadFormField from './LeadFormField';

const LEAD_FIELDS = [
  { id: 'lead-name', testId: 'lead-form-name', name: 'name', label: 'Name', placeholder: 'Your full name', required: true },
  { id: 'lead-email', testId: 'lead-form-email', name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com', required: true },
  { id: 'lead-company', testId: 'lead-form-company', name: 'company', label: 'Company', placeholder: 'Developer / brokerage' },
  { id: 'lead-project', testId: 'lead-form-project', name: 'project', label: 'Project', placeholder: 'Project or city' },
];

const LeadFormBody = ({ form, onFieldChange, onSubmit, onCancel, submitting }) => (
  <form onSubmit={onSubmit} data-testid="lead-form">
    <DialogHeader>
      <DialogTitle className="text-2xl font-medium tracking-tight text-[#0b1020] font-display">
        Request a private demo
      </DialogTitle>
      <DialogDescription className="text-slate-500">
        Tell us about your project. We will prepare a tailored walkthrough of Flik Explorer by Hastok Enterprise Pvt. Ltd.
      </DialogDescription>
    </DialogHeader>

    <div className="grid gap-4 py-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {LEAD_FIELDS.slice(0, 2).map((field) => (
          <LeadFormField
            key={field.name}
            id={field.id}
            testId={field.testId}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            value={form[field.name]}
            onChange={onFieldChange(field.name)}
          />
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {LEAD_FIELDS.slice(2).map((field) => (
          <LeadFormField
            key={field.name}
            id={field.id}
            testId={field.testId}
            label={field.label}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={onFieldChange(field.name)}
          />
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-message" className="text-slate-700 text-xs uppercase tracking-wider font-medium">
          What would you like to see?
        </Label>
        <Textarea
          id="lead-message"
          data-testid="lead-form-message"
          value={form.message}
          onChange={onFieldChange('message')}
          placeholder="Towers, units, integrations, timelines…"
          rows={3}
          className="bg-slate-50 border-slate-200 text-[#0b1020] placeholder:text-slate-400 focus-visible:ring-[#0F766E]/35 resize-none"
        />
      </div>

      {/* Anti-spam honeypot trap - catches automated bot submissions */}
      <input
        type="text"
        name="botcheck"
        value={form.botcheck || ''}
        onChange={onFieldChange('botcheck')}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }}
      />
    </div>

    <DialogFooter className="gap-2 sm:gap-0">
      <Button
        type="button"
        variant="ghost"
        data-testid="lead-form-cancel"
        onClick={onCancel}
        className="text-slate-500 hover:text-[#0b1020] hover:bg-slate-100"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        data-testid="lead-form-submit"
        disabled={submitting}
        className="bg-[#0b1020] hover:bg-[#0F766E] text-white font-medium px-6 rounded-lg transition-colors"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Sending
          </>
        ) : (
          'Request Demo'
        )}
      </Button>
    </DialogFooter>
  </form>
);

export default LeadFormBody;
