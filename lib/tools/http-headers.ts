export type HeaderFormatResult =
  | { success: true; data: string }
  | { success: false; error: string };

export type HeaderMode = 'normalize' | 'to-json' | 'from-json';

/**
 * Parse raw HTTP headers into key-value pairs
 */
function parseHeaders(input: string): [string, string][] {
  const headers: [string, string][] = [];
  const lines = input.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Skip HTTP status lines
    if (/^HTTP\/[\d.]+\s+\d+/.test(trimmed)) continue;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx <= 0) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    const value = trimmed.slice(colonIdx + 1).trim();
    headers.push([key, value]);
  }

  return headers;
}

/**
 * Normalize header names to Title-Case
 */
function normalizeHeaderName(name: string): string {
  return name
    .toLowerCase()
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('-');
}

/**
 * Format headers in normalized form
 */
export function normalizeHeaders(input: string): HeaderFormatResult {
  if (!input.trim()) return { success: true, data: '' };

  try {
    const headers = parseHeaders(input);
    if (headers.length === 0) {
      return { success: false, error: 'No valid headers found. Expected format: "Key: Value"' };
    }

    const normalized = headers
      .map(([key, value]) => `${normalizeHeaderName(key)}: ${value}`)
      .join('\n');

    return { success: true, data: normalized };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to normalize headers',
    };
  }
}

/**
 * Convert raw headers to JSON object
 */
export function headersToJson(input: string): HeaderFormatResult {
  if (!input.trim()) return { success: true, data: '' };

  try {
    const headers = parseHeaders(input);
    if (headers.length === 0) {
      return { success: false, error: 'No valid headers found. Expected format: "Key: Value"' };
    }

    const obj: Record<string, string> = {};
    for (const [key, value] of headers) {
      const normalized = normalizeHeaderName(key);
      obj[normalized] = value;
    }

    return { success: true, data: JSON.stringify(obj, null, 2) };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to convert headers' };
  }
}

/**
 * Convert JSON object back to raw headers
 */
export function jsonToHeaders(input: string): HeaderFormatResult {
  if (!input.trim()) return { success: true, data: '' };

  try {
    const parsed = JSON.parse(input);

    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return { success: false, error: 'Input must be a JSON object with header key-value pairs' };
    }

    const lines = Object.entries(parsed as Record<string, unknown>)
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join('\n');

    return { success: true, data: lines };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Invalid JSON' };
  }
}

export const headerModeOptions = [
  { value: 'normalize' as HeaderMode, label: 'Normalize' },
  { value: 'to-json' as HeaderMode, label: 'To JSON' },
  { value: 'from-json' as HeaderMode, label: 'From JSON' },
];
