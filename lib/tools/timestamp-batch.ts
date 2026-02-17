export interface BatchTimestampEntry {
  input: string;
  success: boolean;
  unix?: number;
  iso?: string;
  utc?: string;
  local?: string;
  relative?: string;
  error?: string;
}

export type TimezoneMode = 'utc' | 'local';

/**
 * Calculate relative time string
 */
function getRelative(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const abs = Math.abs(diff);
  const future = diff < 0;

  const seconds = Math.floor(abs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let str: string;
  if (seconds < 60) str = `${seconds}s`;
  else if (minutes < 60) str = `${minutes}m`;
  else if (hours < 24) str = `${hours}h`;
  else if (days < 30) str = `${days}d`;
  else if (months < 12) str = `${months}mo`;
  else str = `${years}y`;

  return future ? `in ${str}` : `${str} ago`;
}

/**
 * Parse a single timestamp string (unix seconds, unix ms, or ISO date)
 */
function parseOne(input: string): BatchTimestampEntry {
  const trimmed = input.trim();
  if (!trimmed) return { input: trimmed, success: false, error: 'Empty input' };

  let date: Date;

  // Try as numeric (unix timestamp)
  const num = Number(trimmed);
  if (!isNaN(num) && trimmed.length > 0) {
    // Detect seconds vs milliseconds
    if (num > 1e12) {
      date = new Date(num); // milliseconds
    } else {
      date = new Date(num * 1000); // seconds
    }
  } else {
    // Try as ISO/date string
    date = new Date(trimmed);
  }

  if (isNaN(date.getTime())) {
    return { input: trimmed, success: false, error: 'Invalid timestamp' };
  }

  return {
    input: trimmed,
    success: true,
    unix: Math.floor(date.getTime() / 1000),
    iso: date.toISOString(),
    utc: date.toUTCString(),
    local: date.toLocaleString(),
    relative: getRelative(date),
  };
}

/**
 * Parse multiple timestamps (one per line)
 */
export function parseBatchTimestamps(input: string): BatchTimestampEntry[] {
  if (!input.trim()) return [];

  return input
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map(parseOne);
}

/**
 * Format batch results as copyable text
 */
export function formatBatchResults(entries: BatchTimestampEntry[], mode: TimezoneMode): string {
  return entries
    .map((e) => {
      if (!e.success) return `${e.input} → Error: ${e.error}`;
      const time = mode === 'utc' ? e.iso : e.local;
      return `${e.input} → ${time}`;
    })
    .join('\n');
}

export const timezoneModeOptions = [
  { value: 'utc' as TimezoneMode, label: 'UTC' },
  { value: 'local' as TimezoneMode, label: 'Local' },
];
