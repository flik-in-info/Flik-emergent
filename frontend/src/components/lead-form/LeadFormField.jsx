import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const inputClass =
  'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-emerald-500/40';

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
    <Label htmlFor={id} className="text-gray-300 text-xs uppercase tracking-wider">
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
