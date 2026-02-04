import { cn } from '@/lib/utils';

export interface ErrorMessageProps {
  message: string | undefined | null;
  className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <p role="alert" className={cn('text-sm text-red-600 dark:text-red-400', className)}>
      {message}
    </p>
  );
}
