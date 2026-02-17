export type JsonFlattenResult = { success: true; data: string } | { success: false; error: string };

export type FlattenMode = 'flatten' | 'unflatten';

export interface FlattenOptions {
  separator: string;
}

/**
 * Flatten a nested JSON object into dot-notation keys
 */
function flattenObject(
  obj: unknown,
  separator: string,
  prefix: string = '',
  result: Record<string, unknown> = {}
): Record<string, unknown> {
  if (obj === null || obj === undefined) {
    result[prefix] = obj;
    return result;
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      result[prefix] = [];
      return result;
    }
    for (let i = 0; i < obj.length; i++) {
      const key = prefix ? `${prefix}${separator}${i}` : String(i);
      flattenObject(obj[i], separator, key, result);
    }
    return result;
  }

  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) {
      result[prefix] = {};
      return result;
    }
    for (const [key, value] of entries) {
      const newKey = prefix ? `${prefix}${separator}${key}` : key;
      flattenObject(value, separator, newKey, result);
    }
    return result;
  }

  // Primitive value
  result[prefix] = obj;
  return result;
}

/**
 * Unflatten a dot-notation object back into nested structure
 */
function unflattenObject(flat: Record<string, unknown>, separator: string): unknown {
  const result: Record<string, unknown> = {};

  for (const [flatKey, value] of Object.entries(flat)) {
    const keys = flatKey.split(separator);
    let current: Record<string, unknown> = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      const nextKey = keys[i + 1];
      const isNextArray = /^\d+$/.test(nextKey);

      if (!(key in current)) {
        current[key] = isNextArray ? [] : {};
      }

      current = current[key] as Record<string, unknown>;
    }

    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;
  }

  // Check if root should be an array
  const rootKeys = Object.keys(result);
  if (rootKeys.length > 0 && rootKeys.every((k) => /^\d+$/.test(k))) {
    const arr: unknown[] = [];
    for (const k of rootKeys.sort((a, b) => Number(a) - Number(b))) {
      arr[Number(k)] = result[k];
    }
    return arr;
  }

  // Recursively convert numeric-keyed objects to arrays
  return convertArrays(result);
}

/**
 * Recursively convert objects with all-numeric keys to arrays
 */
function convertArrays(obj: unknown): unknown {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(convertArrays);

  const record = obj as Record<string, unknown>;
  const keys = Object.keys(record);

  // Convert children first
  const converted: Record<string, unknown> = {};
  for (const key of keys) {
    converted[key] = convertArrays(record[key]);
  }

  // Check if this object should be an array
  if (keys.length > 0 && keys.every((k) => /^\d+$/.test(k))) {
    const arr: unknown[] = [];
    for (const k of keys.sort((a, b) => Number(a) - Number(b))) {
      arr[Number(k)] = converted[k];
    }
    return arr;
  }

  return converted;
}

/**
 * Flatten JSON to dot-notation keys
 */
export function flattenJson(input: string, options?: Partial<FlattenOptions>): JsonFlattenResult {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  const separator = options?.separator || '.';

  try {
    const parsed = JSON.parse(input);
    const flat = flattenObject(parsed, separator);
    return { success: true, data: JSON.stringify(flat, null, 2) };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Invalid JSON',
    };
  }
}

/**
 * Unflatten dot-notation keys back to nested JSON
 */
export function unflattenJson(input: string, options?: Partial<FlattenOptions>): JsonFlattenResult {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  const separator = options?.separator || '.';

  try {
    const parsed = JSON.parse(input);

    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return { success: false, error: 'Input must be a flat JSON object with dot-notation keys' };
    }

    const nested = unflattenObject(parsed as Record<string, unknown>, separator);
    return { success: true, data: JSON.stringify(nested, null, 2) };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Invalid JSON',
    };
  }
}

export const flattenModeOptions = [
  { value: 'flatten' as FlattenMode, label: 'Flatten' },
  { value: 'unflatten' as FlattenMode, label: 'Unflatten' },
];
