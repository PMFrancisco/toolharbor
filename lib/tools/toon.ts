export interface ToonConvertSuccess {
  success: true;
  data: string;
  stats: ToonStats;
}

export interface ToonConvertError {
  success: false;
  error: string;
}

export type ToonResult = ToonConvertSuccess | ToonConvertError;

export interface ToonStats {
  jsonBytes: number;
  toonBytes: number;
  savedBytes: number;
  savedPercent: string;
}

function escapeValue(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  if (typeof value === 'string') {
    if (/[\t\n,{}[\]]/.test(value) || value === '') {
      return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\t/g, '\\t')}"`;
    }
    return value;
  }
  return String(value);
}

function isPrimitive(value: unknown): boolean {
  return value === null || typeof value !== 'object';
}

function getUniformKeys(arr: unknown[]): string[] | null {
  if (arr.length === 0) return null;
  if (!arr.every((item) => typeof item === 'object' && item !== null && !Array.isArray(item))) {
    return null;
  }

  const firstKeys = Object.keys(arr[0] as Record<string, unknown>).sort();
  const allSameKeys = arr.every((item) => {
    const keys = Object.keys(item as Record<string, unknown>).sort();
    return keys.length === firstKeys.length && keys.every((k, i) => k === firstKeys[i]);
  });

  if (!allSameKeys) return null;

  // Only use table format if all values are primitives
  const allPrimitive = arr.every((item) =>
    Object.values(item as Record<string, unknown>).every(isPrimitive)
  );

  return allPrimitive ? Object.keys(arr[0] as Record<string, unknown>) : null;
}

function encodeTable(arr: unknown[], keys: string[]): string {
  const header = `{${keys.join(',')}}[${arr.length}]`;
  const rows = arr.map((item) => {
    const obj = item as Record<string, unknown>;
    return keys.map((k) => escapeValue(obj[k])).join('\t');
  });
  return [header, ...rows].join('\n');
}

function encodePrimitiveArray(arr: unknown[]): string {
  return `[${arr.length}] ${arr.map(escapeValue).join(', ')}`;
}

function encodeValue(value: unknown, indent: number): string {
  if (isPrimitive(value)) return escapeValue(value);

  const prefix = '  '.repeat(indent);
  const innerPrefix = '  '.repeat(indent + 1);

  if (Array.isArray(value)) {
    if (value.length === 0) return '[0]';
    if (value.every(isPrimitive)) return encodePrimitiveArray(value);

    const uniformKeys = getUniformKeys(value);
    if (uniformKeys) return encodeTable(value, uniformKeys);

    // Mixed or nested array — use indexed lines
    const lines = value.map((item, i) => {
      const encoded = encodeValue(item, indent + 1);
      if (typeof item === 'object' && item !== null) {
        return `${innerPrefix}- ${encoded.trimStart()}`;
      }
      return `${innerPrefix}- ${encoded}`;
    });
    return `[${value.length}]\n${lines.join('\n')}`;
  }

  // Object
  const obj = value as Record<string, unknown>;
  const entries = Object.entries(obj);
  if (entries.length === 0) return '{}';

  const lines = entries.map(([key, val]) => {
    if (typeof val === 'object' && val !== null) {
      const encoded = encodeValue(val, indent + 1);
      if (Array.isArray(val)) {
        return `${innerPrefix}${key}: ${encoded}`;
      }
      return `${innerPrefix}${key}:\n${encoded}`;
    }
    return `${innerPrefix}${key}: ${escapeValue(val)}`;
  });

  return lines.join('\n');
}

export function jsonToToon(input: string): ToonResult {
  if (!input.trim()) {
    return { success: false, error: 'Please enter JSON to convert' };
  }

  try {
    const parsed = JSON.parse(input);
    let toon: string;

    if (Array.isArray(parsed)) {
      if (parsed.length === 0) {
        toon = '[0]';
      } else if (parsed.every(isPrimitive)) {
        toon = encodePrimitiveArray(parsed);
      } else {
        const uniformKeys = getUniformKeys(parsed);
        if (uniformKeys) {
          toon = encodeTable(parsed, uniformKeys);
        } else {
          toon = encodeValue(parsed, 0);
        }
      }
    } else if (typeof parsed === 'object' && parsed !== null) {
      toon = encodeValue(parsed, 0)
        .split('\n')
        .map((l) => l.replace(/^ {2}/, ''))
        .join('\n');
    } else {
      toon = escapeValue(parsed);
    }

    const jsonBytes = new TextEncoder().encode(input.trim()).length;
    const toonBytes = new TextEncoder().encode(toon).length;
    const savedBytes = jsonBytes - toonBytes;
    const savedPercent = jsonBytes > 0 ? ((savedBytes / jsonBytes) * 100).toFixed(1) : '0';

    return {
      success: true,
      data: toon,
      stats: { jsonBytes, toonBytes, savedBytes, savedPercent },
    };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Invalid JSON',
    };
  }
}
