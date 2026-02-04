import { type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type ReadOnlyTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'readOnly'>;

export function ReadOnlyTextarea({ className, ...props }: ReadOnlyTextareaProps) {
  return (
    <textarea
      readOnly
      className={cn(
        'min-h-[200px] w-full resize-y rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2',
        'font-mono text-sm text-zinc-900',
        'dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100',
        className
      )}
      {...props}
    />
  );
}
