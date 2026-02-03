export interface TimestampData {
  unix: number;
  unixMs: number;
  iso: string;
  utc: string;
  local: string;
  relative: string;
  date: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    dayOfWeek: string;
  };
}

export interface TimestampSuccess {
  success: true;
  data: TimestampData;
}

export interface TimestampError {
  success: false;
  error: string;
}

export type TimestampResult = TimestampSuccess | TimestampError;

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Get relative time string
 */
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (Math.abs(diffSec) < 60) {
    return diffSec === 0
      ? 'now'
      : diffSec > 0
        ? `in ${diffSec} seconds`
        : `${Math.abs(diffSec)} seconds ago`;
  }
  if (Math.abs(diffMin) < 60) {
    return diffMin > 0 ? `in ${diffMin} minutes` : `${Math.abs(diffMin)} minutes ago`;
  }
  if (Math.abs(diffHour) < 24) {
    return diffHour > 0 ? `in ${diffHour} hours` : `${Math.abs(diffHour)} hours ago`;
  }
  return diffDay > 0 ? `in ${diffDay} days` : `${Math.abs(diffDay)} days ago`;
}

/**
 * Parse a timestamp from various formats
 */
export function parseTimestamp(input: string): TimestampResult {
  if (!input.trim()) {
    return { success: false, error: 'Please enter a timestamp' };
  }

  let date: Date;
  const trimmed = input.trim();

  // Try parsing as Unix timestamp (seconds or milliseconds)
  if (/^\d+$/.test(trimmed)) {
    const num = parseInt(trimmed, 10);
    // If number is too large for seconds, assume milliseconds
    if (num > 9999999999) {
      date = new Date(num);
    } else {
      date = new Date(num * 1000);
    }
  } else {
    // Try parsing as ISO or other date string
    date = new Date(trimmed);
  }

  if (isNaN(date.getTime())) {
    return { success: false, error: 'Invalid timestamp format' };
  }

  return {
    success: true,
    data: {
      unix: Math.floor(date.getTime() / 1000),
      unixMs: date.getTime(),
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      relative: getRelativeTime(date),
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millisecond: date.getMilliseconds(),
        dayOfWeek: DAYS[date.getDay()],
      },
    },
  };
}

/**
 * Get current timestamp
 */
export function getCurrentTimestamp(): TimestampData {
  const result = parseTimestamp(Date.now().toString());
  if (result.success) {
    return result.data;
  }
  throw new Error('Failed to get current timestamp');
}

/**
 * Convert date components to timestamp
 */
export function dateToTimestamp(
  year: number,
  month: number,
  day: number,
  hour: number = 0,
  minute: number = 0,
  second: number = 0
): TimestampResult {
  try {
    const date = new Date(year, month - 1, day, hour, minute, second);
    if (isNaN(date.getTime())) {
      return { success: false, error: 'Invalid date' };
    }
    return parseTimestamp(date.getTime().toString());
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to create date',
    };
  }
}
