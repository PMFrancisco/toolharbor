export type NdjsonResult = { success: true; data: string } | { success: false; error: string };

export type NdjsonMode = 'json-to-ndjson' | 'ndjson-to-json';

/**
 * Convert a JSON array to NDJSON (one JSON object per line)
 */
export function jsonToNdjson(input: string): NdjsonResult {
  if (!input.trim()) return { success: true, data: '' };

  try {
    const parsed = JSON.parse(input);

    if (!Array.isArray(parsed)) {
      return { success: false, error: 'Input must be a JSON array' };
    }

    const lines = parsed.map((item) => JSON.stringify(item));
    return { success: true, data: lines.join('\n') };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Invalid JSON' };
  }
}

/**
 * Convert NDJSON (one JSON object per line) to a JSON array
 */
export function ndjsonToJson(input: string, pretty: boolean = true): NdjsonResult {
  if (!input.trim()) return { success: true, data: '' };

  try {
    const lines = input
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const items: unknown[] = [];
    const errors: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      try {
        items.push(JSON.parse(lines[i]));
      } catch {
        errors.push(`Line ${i + 1}: Invalid JSON`);
      }
    }

    if (errors.length > 0) {
      return { success: false, error: errors.join('\n') };
    }

    const indent = pretty ? 2 : undefined;
    return { success: true, data: JSON.stringify(items, null, indent) };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to parse NDJSON' };
  }
}

export const ndjsonModeOptions = [
  { value: 'json-to-ndjson' as NdjsonMode, label: 'JSON → NDJSON' },
  { value: 'ndjson-to-json' as NdjsonMode, label: 'NDJSON → JSON' },
];
