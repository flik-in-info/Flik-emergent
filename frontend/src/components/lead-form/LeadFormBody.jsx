import React from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
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
      <DialogTitle className="text-2xl font-light tracking-tight">
        Request a private demo
      </DialogTitle>
      <DialogDescription className="text-gray-400">
        Tell us about your project. We'll prepare a tailored walkthrough of Flik Explore.
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
        <Label htmlFor="lead-message" className="text-gray-300 text-xs uppercase tracking-wider">
          What would you like to see?
        </Label>
        <Textarea
          id="lead-message"
          data-testid="lead-form-message"
          value={form.message}
          onChange={onFieldChange('message')}
          placeholder="Towers, units, integrations, timelines…"
          rows={3}
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-emerald-500/40 resize-none"
        />
      </div>
    </div>

    <DialogFooter className="gap-2 sm:gap-0">
      <Button
        type="button"
        variant="ghost"
        data-testid="lead-form-cancel"
        onClick={onCancel}
        className="text-gray-400 hover:text-white hover:bg-white/5"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        data-testid="lead-form-submit"
        disabled={submitting}
        className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium group"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Request demo
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </DialogFooter>
  </form>
);

export default LeadFormBody;
