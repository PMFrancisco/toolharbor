import { parseYaml } from './yaml';

export type YamlFormatResult = { success: true; data: string } | { success: false; error: string };

export interface YamlFormatOptions {
  indent?: number;
  sortKeys?: boolean;
}

/**
 * Check if a YAML string value needs quoting
 */
function needsQuoting(value: string): boolean {
  return (
    value === '' ||
    value === 'null' ||
    value === 'true' ||
    value === 'false' ||
    value === 'True' ||
    value === 'False' ||
    value === 'NULL' ||
    value === 'TRUE' ||
    value === 'FALSE' ||
    value.includes(':') ||
    value.includes('#') ||
    value.includes('\n') ||
    value.includes('"') ||
    value.includes("'") ||
    value.startsWith(' ') ||
    value.endsWith(' ') ||
    value.startsWith('-') ||
    value.startsWith('[') ||
    value.startsWith('{') ||
    /^[\d.+-]/.test(value)
  );
}

/**
 * Escape special characters in a YAML string
 */
function escapeString(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

/**
 * Stringify a JS value to YAML with configurable options
 */
function yamlStringify(
  value: unknown,
  indentStr: string,
  sortKeys: boolean,
  level: number = 0
): string {
  const spaces = indentStr.repeat(level);

  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';

  if (typeof value === 'number') {
    if (Number.isNaN(value)) return '.nan';
    if (!Number.isFinite(value)) return value > 0 ? '.inf' : '-.inf';
    return String(value);
  }

  if (typeof value === 'string') {
    return needsQuoting(value) ? `"${escapeString(value)}"` : value;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';

    const items = value.map((item) => {
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        // Object items: first key shares line with dash, rest are indented
        const nested = yamlStringify(item, indentStr, sortKeys, 0);
        const lines = nested.split('\n');
        const first = `${spaces}- ${lines[0]}`;
        const rest = lines
          .slice(1)
          .map((l) => `${spaces}${indentStr}${l}`)
          .join('\n');
        return rest ? `${first}\n${rest}` : first;
      }
      return `${spaces}- ${yamlStringify(item, indentStr, sortKeys, level + 1)}`;
    });

    return items.join('\n');
  }

  if (typeof value === 'object') {
    let entries = Object.entries(value);
    if (entries.length === 0) return '{}';

    if (sortKeys) {
      entries = entries.sort((a, b) => a[0].localeCompare(b[0]));
    }

    const lines = entries.map(([key, val]) => {
      const safeKey =
        key.includes(':') || key.includes('#') || key.includes(' ') ? `"${key}"` : key;

      if (val === null || val === undefined) {
        return `${spaces}${safeKey}: null`;
      }

      if (typeof val === 'object' && !Array.isArray(val) && Object.keys(val).length > 0) {
        return `${spaces}${safeKey}:\n${yamlStringify(val, indentStr, sortKeys, level + 1)}`;
      }

      if (Array.isArray(val) && val.length > 0) {
        return `${spaces}${safeKey}:\n${yamlStringify(val, indentStr, sortKeys, level + 1)}`;
      }

      return `${spaces}${safeKey}: ${yamlStringify(val, indentStr, sortKeys, level)}`;
    });

    return lines.join('\n');
  }

  return String(value);
}

/**
 * Format YAML with configurable indentation and optional key sorting
 */
export function formatYaml(input: string, options: YamlFormatOptions = {}): YamlFormatResult {
  const { indent = 2, sortKeys = false } = options;

  if (!input.trim()) {
    return { success: true, data: '' };
  }

  try {
    const parsed = parseYaml(input);
    const indentStr = ' '.repeat(indent);
    const formatted = yamlStringify(parsed, indentStr, sortKeys);
    return { success: true, data: formatted };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Invalid YAML',
    };
  }
}

/**
 * Compact YAML with minimal 1-space indentation
 */
export function compactYaml(input: string): YamlFormatResult {
  return formatYaml(input, { indent: 1 });
}

/**
 * Validate if a string is valid YAML
 */
export function validateYaml(input: string): boolean {
  if (!input.trim()) return true;
  try {
    parseYaml(input);
    return true;
  } catch {
    return false;
  }
}
