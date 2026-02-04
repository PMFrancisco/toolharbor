'use client';

import { cn } from '@/lib/utils';

export interface ModeToggleOption<T extends string> {
  value: T;
  label: string;
}

export interface ModeToggleProps<T extends string> {
  options: ModeToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function ModeToggle<T extends string>({
  options,
  value,
  onChange,
  className,
}: ModeToggleProps<T>) {
  return (
    <div
      className={cn(
        'inline-flex rounded-lg border border-zinc-300 p-1 dark:border-zinc-700',
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'rounded-md px-4 py-2 text-sm font-medium transition-colors',
            value === option.value
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
