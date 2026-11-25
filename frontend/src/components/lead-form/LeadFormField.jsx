import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const inputClass =
  'bg-neutral-50 border-neutral-200 text-black placeholder:text-neutral-400 focus-visible:ring-[#22E55A]';

const LeadFormField = ({
  id,
  label,
  testId,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-neutral-700 text-xs uppercase tracking-wider font-medium">
      {label}
    </Label>
    <Input
      id={id}
      data-testid={testId}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={inputClass}
    />
  </div>
);

export default LeadFormField;
