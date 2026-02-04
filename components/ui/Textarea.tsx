'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ErrorMessage } from './ErrorMessage';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'min-h-[120px] w-full resize-y rounded-lg border bg-white px-3 py-2',
            'font-mono text-sm text-zinc-900',
            'placeholder:text-zinc-400',
            'focus:ring-2 focus:ring-offset-2 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-zinc-300 focus:ring-zinc-900 dark:border-zinc-700 dark:focus:ring-zinc-400',
            'dark:bg-zinc-900 dark:text-zinc-100',
            className
          )}
          {...props}
        />
        <ErrorMessage message={error} />
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
