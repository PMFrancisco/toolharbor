import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type InfoBoxVariant = 'default' | 'tip';

export interface InfoBoxProps {
  variant?: InfoBoxVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function InfoBox({ variant = 'default', title, children, className }: InfoBoxProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800',
        className
      )}
    >
      {(title || variant === 'tip') && (
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {variant === 'tip' && <strong>Tip: </strong>}
          {title}
        </h3>
      )}
      <div className={cn('text-sm text-zinc-600 dark:text-zinc-400', title && 'mt-1')}>
        {children}
      </div>
    </div>
  );
}
