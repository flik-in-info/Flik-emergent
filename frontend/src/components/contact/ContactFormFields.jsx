import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const inputClass =
  'bg-neutral-50 border-neutral-200 text-black placeholder:text-neutral-400 focus-visible:ring-[#22E55A]';

const labelClass = 'text-neutral-700 text-xs uppercase tracking-wider font-medium';

const ContactFormFields = ({ form, update, onInterestChange, interestOptions }) => (
  <>
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="contact-name" className={labelClass}>Full Name</Label>
        <Input
          id="contact-name"
          data-testid="contact-fullname"
          value={form.fullName}
          onChange={update('fullName')}
          placeholder="Your full name"
          required
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-phone" className={labelClass}>Phone</Label>
        <Input
          id="contact-phone"
          data-testid="contact-phone"
          type="tel"
          value={form.phone}
          onChange={update('phone')}
          placeholder="+91 98xx-xxxxxx"
          className={inputClass}
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="contact-email" className={labelClass}>Email</Label>
      <Input
        id="contact-email"
        data-testid="contact-email"
        type="email"
        value={form.email}
        onChange={update('email')}
        placeholder="you@company.com"
        required
        className={inputClass}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="contact-interest" className={labelClass}>Interest</Label>
      <Select value={form.interest} onValueChange={onInterestChange}>
        <SelectTrigger
          id="contact-interest"
          data-testid="contact-interest"
          className="bg-neutral-50 border-neutral-200 text-black focus:ring-[#22E55A] data-[placeholder]:text-neutral-400"
        >
          <SelectValue placeholder="What are you interested in?" />
        </SelectTrigger>
        <SelectContent className="bg-white border-neutral-200 text-black">
          {interestOptions.map((option) => (
            <SelectItem
              key={option}
              value={option}
              data-testid={`contact-interest-${option.toLowerCase().replace(/\s+/g, '-')}`}
              className="focus:bg-[#22E55A] focus:text-black"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label htmlFor="contact-message" className={labelClass}>Message</Label>
      <Textarea
        id="contact-message"
        data-testid="contact-message"
        value={form.message}
        onChange={update('message')}
        placeholder="Tell us about your project, timeline, towers, integrations…"
        rows={4}
        className={`${inputClass} resize-none`}
      />
    </div>

    {/* Anti-spam honeypot trap - invisible to humans, catches automated bots */}
    <input
      type="text"
      name="botcheck"
      value={form.botcheck || ''}
      onChange={update('botcheck')}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }}
    />
  </>
);

export default ContactFormFields;
