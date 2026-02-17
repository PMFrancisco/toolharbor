export type DiffType = 'added' | 'removed' | 'changed' | 'unchanged';

export interface JsonDiffEntry {
  path: string;
  type: DiffType;
  oldValue?: string;
  newValue?: string;
}

export interface JsonDiffResult {
  success: true;
  entries: JsonDiffEntry[];
  addedCount: number;
  removedCount: number;
  changedCount: number;
  unchangedCount: number;
}

export interface JsonDiffError {
  success: false;
  error: string;
  target: 'original' | 'modified' | 'both';
}

export type JsonDiffResponse = JsonDiffResult | JsonDiffError;

export interface JsonDiffOptions {
  sortKeys: boolean;
  ignoreWhitespace: boolean;
}

/**
 * Format a value for display (truncate long strings)
 */
function formatValue(value: unknown): string {
  if (value === undefined) return 'undefined';
  const str = JSON.stringify(value);
  if (str.length > 80) return str.slice(0, 77) + '...';
  return str;
}

/**
 * Get all keys from an object, optionally sorted
 */
function getKeys(obj: Record<string, unknown>, sorted: boolean): string[] {
  const keys = Object.keys(obj);
  return sorted ? keys.sort() : keys;
}

/**
 * Recursively diff two JSON values
 */
function diffValues(
  a: unknown,
  b: unknown,
  path: string,
  entries: JsonDiffEntry[],
  sortKeys: boolean
): void {
  // Both null/undefined
  if (a === b) {
    entries.push({ path, type: 'unchanged', oldValue: formatValue(a), newValue: formatValue(b) });
    return;
  }

  // Type mismatch
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    entries.push({ path, type: 'changed', oldValue: formatValue(a), newValue: formatValue(b) });
    return;
  }

  // Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    const maxLen = Math.max(a.length, b.length);
    for (let i = 0; i < maxLen; i++) {
      const itemPath = `${path}[${i}]`;
      if (i >= a.length) {
        entries.push({ path: itemPath, type: 'added', newValue: formatValue(b[i]) });
      } else if (i >= b.length) {
        entries.push({ path: itemPath, type: 'removed', oldValue: formatValue(a[i]) });
      } else {
        diffValues(a[i], b[i], itemPath, entries, sortKeys);
      }
    }
    return;
  }

  // Objects
  if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;
    const allKeys = new Set([...getKeys(objA, sortKeys), ...getKeys(objB, sortKeys)]);

    for (const key of allKeys) {
      const keyPath = path ? `${path}.${key}` : key;
      if (!(key in objA)) {
        entries.push({ path: keyPath, type: 'added', newValue: formatValue(objB[key]) });
      } else if (!(key in objB)) {
        entries.push({ path: keyPath, type: 'removed', oldValue: formatValue(objA[key]) });
      } else {
        diffValues(objA[key], objB[key], keyPath, entries, sortKeys);
      }
    }
    return;
  }

  // Primitives
  if (a !== b) {
    entries.push({ path, type: 'changed', oldValue: formatValue(a), newValue: formatValue(b) });
  } else {
    entries.push({ path, type: 'unchanged', oldValue: formatValue(a), newValue: formatValue(b) });
  }
}

/**
 * Compare two JSON strings and return a semantic diff
 */
export function diffJson(
  original: string,
  modified: string,
  options?: Partial<JsonDiffOptions>
): JsonDiffResponse {
  const { sortKeys = false, ignoreWhitespace = false } = options || {};

  const origTrimmed = original.trim();
  const modTrimmed = modified.trim();

  if (!origTrimmed && !modTrimmed) {
    return {
      success: true,
      entries: [],
      addedCount: 0,
      removedCount: 0,
      changedCount: 0,
      unchangedCount: 0,
    };
  }

  let parsedA: unknown;
  let parsedB: unknown;

  try {
    parsedA = JSON.parse(ignoreWhitespace ? origTrimmed.replace(/\s+/g, ' ') : origTrimmed);
  } catch {
    return { success: false, error: 'Invalid JSON in original input', target: 'original' };
  }

  try {
    parsedB = JSON.parse(ignoreWhitespace ? modTrimmed.replace(/\s+/g, ' ') : modTrimmed);
  } catch {
    return { success: false, error: 'Invalid JSON in modified input', target: 'modified' };
  }

  const entries: JsonDiffEntry[] = [];
  diffValues(parsedA, parsedB, '', entries, sortKeys);

  // If root is a primitive, use "$" as path
  if (entries.length === 1 && entries[0].path === '') {
    entries[0].path = '$';
  }

  return {
    success: true,
    entries,
    addedCount: entries.filter((e) => e.type === 'added').length,
    removedCount: entries.filter((e) => e.type === 'removed').length,
    changedCount: entries.filter((e) => e.type === 'changed').length,
    unchangedCount: entries.filter((e) => e.type === 'unchanged').length,
  };
}
