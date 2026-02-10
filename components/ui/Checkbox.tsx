'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId =
      id || (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const checkbox = (
      <input
        ref={ref}
        type="checkbox"
        id={inputId}
        className={cn(
          'h-4 w-4 rounded border-zinc-300 bg-white text-zinc-900 accent-zinc-900',
          'focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'dark:border-zinc-700 dark:bg-zinc-950 dark:accent-zinc-100',
          className
        )}
        {...props}
      />
    );

    if (!label) return checkbox;

    return (
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600 select-none dark:text-zinc-400"
      >
        {checkbox}
        {label}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
