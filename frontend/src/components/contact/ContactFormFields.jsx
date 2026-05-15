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
  'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-emerald-500/40';

const labelClass = 'text-gray-300 text-xs uppercase tracking-wider';

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
          className="bg-white/5 border-white/10 text-white focus:ring-emerald-500/40 data-[placeholder]:text-gray-600"
        >
          <SelectValue placeholder="What are you interested in?" />
        </SelectTrigger>
        <SelectContent className="bg-[#0e0e10] border-white/10 text-white">
          {interestOptions.map((option) => (
            <SelectItem
              key={option}
              value={option}
              data-testid={`contact-interest-${option.toLowerCase().replace(/\s+/g, '-')}`}
              className="focus:bg-emerald-500/10 focus:text-emerald-400"
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
  </>
);

export default ContactFormFields;
