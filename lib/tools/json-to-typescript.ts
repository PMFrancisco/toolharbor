export type OutputStyle = 'interface' | 'type';

export interface JsonToTsOptions {
  rootName: string;
  style: OutputStyle;
}

export type JsonToTsResult = { success: true; data: string } | { success: false; error: string };

const DEFAULT_OPTIONS: JsonToTsOptions = {
  rootName: 'Root',
  style: 'interface',
};

/**
 * Convert a JSON value to a TypeScript type string
 */
function inferType(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return inferArrayType(value);

  switch (typeof value) {
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    default:
      return 'unknown';
  }
}

/**
 * Infer the type of an array by examining all elements
 */
function inferArrayType(arr: unknown[]): string {
  if (arr.length === 0) return 'unknown[]';

  const types = new Set<string>();
  let hasObject = false;

  for (const item of arr) {
    if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
      hasObject = true;
    } else {
      types.add(inferType(item));
    }
  }

  if (hasObject) {
    // Will be replaced with a named interface/type later
    return '__OBJECT_ARRAY__';
  }

  if (types.size === 0) return 'unknown[]';
  if (types.size === 1) return `${[...types][0]}[]`;
  return `(${[...types].join(' | ')})[]`;
}

/**
 * Convert a name to PascalCase for interface/type names
 */
function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[a-z]/, (char) => char.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Check if a key needs to be quoted in TypeScript
 */
function needsQuotes(key: string): boolean {
  return !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
}

/**
 * Merge multiple object shapes into one (union of all keys)
 */
function mergeObjectShapes(objects: Record<string, unknown>[]): Record<string, unknown[]> {
  const merged: Record<string, unknown[]> = {};

  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj)) {
      if (!merged[key]) merged[key] = [];
      merged[key].push(value);
    }
  }

  return merged;
}

/**
 * Recursively generate TypeScript interfaces/types from a JSON object
 */
function generateTypes(
  value: unknown,
  name: string,
  style: OutputStyle,
  collected: Map<string, string>
): string {
  if (value === null || typeof value !== 'object') {
    return inferType(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return 'unknown[]';

    const objects = value.filter(
      (item): item is Record<string, unknown> =>
        item !== null && typeof item === 'object' && !Array.isArray(item)
    );

    if (objects.length > 0) {
      const itemName = toPascalCase(name) + 'Item';
      const merged = mergeObjectShapes(objects);
      const allKeys = Object.keys(merged);

      const lines: string[] = [];
      for (const key of allKeys) {
        const values = merged[key];
        const isOptional = values.length < objects.length;
        const keyStr = needsQuotes(key) ? `"${key}"` : key;
        const optMark = isOptional ? '?' : '';

        // Determine types for this key across all objects
        const typeSet = new Set<string>();
        for (const v of values) {
          if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
            const nestedName = toPascalCase(key);
            generateTypes(v, nestedName, style, collected);
            typeSet.add(nestedName);
          } else if (Array.isArray(v)) {
            const arrType = generateTypes(v, key, style, collected);
            typeSet.add(arrType);
          } else {
            typeSet.add(inferType(v));
          }
        }

        const typeStr = [...typeSet].join(' | ');
        lines.push(`  ${keyStr}${optMark}: ${typeStr};`);
      }

      if (style === 'interface') {
        collected.set(itemName, `export interface ${itemName} {\n${lines.join('\n')}\n}`);
      } else {
        collected.set(itemName, `export type ${itemName} = {\n${lines.join('\n')}\n};`);
      }

      // Check for non-object items too
      const nonObjects = value.filter(
        (item) => item === null || typeof item !== 'object' || Array.isArray(item)
      );
      if (nonObjects.length > 0) {
        const otherTypes = new Set(nonObjects.map(inferType));
        return `(${itemName} | ${[...otherTypes].join(' | ')})[]`;
      }

      return `${itemName}[]`;
    }

    // Array of primitives or mixed non-objects
    return inferArrayType(value);
  }

  // It's an object
  const obj = value as Record<string, unknown>;
  const typeName = toPascalCase(name);
  const lines: string[] = [];

  for (const [key, val] of Object.entries(obj)) {
    const keyStr = needsQuotes(key) ? `"${key}"` : key;

    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      const nestedName = toPascalCase(key);
      generateTypes(val, nestedName, style, collected);
      lines.push(`  ${keyStr}: ${nestedName};`);
    } else if (Array.isArray(val)) {
      const arrType = generateTypes(val, key, style, collected);
      lines.push(`  ${keyStr}: ${arrType};`);
    } else {
      lines.push(`  ${keyStr}: ${inferType(val)};`);
    }
  }

  if (style === 'interface') {
    collected.set(typeName, `export interface ${typeName} {\n${lines.join('\n')}\n}`);
  } else {
    collected.set(typeName, `export type ${typeName} = {\n${lines.join('\n')}\n};`);
  }

  return typeName;
}

/**
 * Convert JSON string to TypeScript interfaces or type aliases
 */
export function jsonToTypeScript(
  input: string,
  options?: Partial<JsonToTsOptions>
): JsonToTsResult {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };
  const rootName = opts.rootName.trim() || 'Root';

  try {
    const parsed = JSON.parse(input);
    const collected = new Map<string, string>();

    if (Array.isArray(parsed)) {
      const arrType = generateTypes(parsed, rootName, opts.style, collected);

      if (opts.style === 'interface') {
        // Can't have interface for array root, use type alias
        collected.set(
          toPascalCase(rootName),
          `export type ${toPascalCase(rootName)} = ${arrType};`
        );
      } else {
        collected.set(
          toPascalCase(rootName),
          `export type ${toPascalCase(rootName)} = ${arrType};`
        );
      }
    } else if (parsed !== null && typeof parsed === 'object') {
      generateTypes(parsed, rootName, opts.style, collected);
    } else {
      // Primitive root value
      const tsType = inferType(parsed);
      return {
        success: true,
        data: `export type ${toPascalCase(rootName)} = ${tsType};\n`,
      };
    }

    // Build output: nested types first, root type last
    const rootKey = toPascalCase(rootName);
    const entries = [...collected.entries()];
    const rootEntry = entries.find(([key]) => key === rootKey);
    const nested = entries.filter(([key]) => key !== rootKey);

    const parts = [...nested.map(([, v]) => v)];
    if (rootEntry) parts.push(rootEntry[1]);

    return { success: true, data: parts.join('\n\n') + '\n' };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Invalid JSON',
    };
  }
}

export const outputStyleOptions = [
  { value: 'interface' as OutputStyle, label: 'Interface' },
  { value: 'type' as OutputStyle, label: 'Type' },
];
