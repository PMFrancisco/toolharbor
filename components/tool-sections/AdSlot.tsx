'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSlotProps {
  /** Ad unit slot ID from AdSense dashboard (e.g., "1234567890") */
  slot?: string;
  /** Ad format: horizontal (banner) or square */
  format?: 'horizontal' | 'square';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Google AdSense ad unit component
 * - In development: shows placeholder
 * - In production without config: renders nothing
 * - In production with config: renders real ads
 */
export function AdSlot({ slot, format = 'horizontal', className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isInitialized = useRef(false);

  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    // Only initialize once and only in production with valid config
    if (!isDev && adsenseId && slot && !isInitialized.current && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isInitialized.current = true;
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [isDev, adsenseId, slot]);

  // Development mode: show placeholder
  if (isDev) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-100 text-sm text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800/50 ${
          format === 'horizontal' ? 'h-24 w-full' : 'h-64 w-64'
        } ${className}`}
      >
        Ad Slot {slot ? `(${slot})` : `(${format})`}
      </div>
    );
  }

  // Production without AdSense config or slot: render nothing
  if (!adsenseId || !slot) {
    return null;
  }

  // Production with config: render real ad
  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          minHeight: format === 'horizontal' ? '90px' : '250px',
        }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
