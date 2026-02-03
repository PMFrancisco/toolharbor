interface AdSlotProps {
  slot?: 'horizontal' | 'square';
  className?: string;
}

/**
 * Placeholder for future ad integration (Google AdSense)
 * Currently renders nothing - will be configured when ads are enabled
 */
export function AdSlot({ slot = 'horizontal', className = '' }: AdSlotProps) {
  // TODO: Integrate Google AdSense when ready
  // For now, return null to avoid empty space
  // Uncomment below to see placeholder during development

  const isDev = process.env.NODE_ENV === 'development';

  if (!isDev) {
    return null;
  }

  return (
    <div
      className={`flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-100 text-sm text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800/50 ${
        slot === 'horizontal' ? 'h-24' : 'h-64 w-64'
      } ${className}`}
    >
      Ad Slot ({slot})
    </div>
  );
}
