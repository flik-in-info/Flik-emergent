import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const inputClass =
  'bg-slate-50 border-slate-200 text-[#0b1020] placeholder:text-slate-400 focus-visible:ring-[#0F766E]/35';

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
    <Label htmlFor={id} className="text-slate-700 text-xs uppercase tracking-wider font-medium">
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
