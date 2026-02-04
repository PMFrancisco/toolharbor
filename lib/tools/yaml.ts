export interface YamlConvertSuccess {
  success: true;
  data: string;
}

export interface YamlConvertError {
  success: false;
  error: string;
}

export type YamlResult = YamlConvertSuccess | YamlConvertError;

/**
 * Simple YAML stringifier for basic JSON structures
 * Handles objects, arrays, strings, numbers, booleans, and null
 */
function stringifyYaml(value: unknown, indent: number = 0): string {
  const spaces = '  '.repeat(indent);

  if (value === null || value === undefined) {
    return 'null';
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (typeof value === 'number') {
    if (Number.isNaN(value)) return '.nan';
    if (!Number.isFinite(value)) return value > 0 ? '.inf' : '-.inf';
    return String(value);
  }

  if (typeof value === 'string') {
    // Check if string needs quoting
    if (
      value === '' ||
      value === 'null' ||
      value === 'true' ||
      value === 'false' ||
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
    ) {
      // Use double quotes and escape special characters
      const escaped = value
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
      return `"${escaped}"`;
    }
    return value;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';

    const items = value.map((item) => {
      const itemStr = stringifyYaml(item, indent + 1);
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        // Object items need special formatting
        const lines = itemStr.split('\n');
        return `${spaces}- ${lines[0]}\n${lines
          .slice(1)
          .map((l) => `${spaces}  ${l}`)
          .join('\n')}`;
      }
      return `${spaces}- ${itemStr}`;
    });

    return items.join('\n').replace(/\n+/g, '\n').trim();
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) return '{}';

    const lines = entries.map(([key, val]) => {
      // Quote key if needed
      const safeKey =
        key.includes(':') || key.includes('#') || key.includes(' ') ? `"${key}"` : key;

      if (val === null || val === undefined) {
        return `${spaces}${safeKey}: null`;
      }

      if (typeof val === 'object' && !Array.isArray(val) && Object.keys(val).length > 0) {
        return `${spaces}${safeKey}:\n${stringifyYaml(val, indent + 1)}`;
      }

      if (Array.isArray(val) && val.length > 0) {
        return `${spaces}${safeKey}:\n${stringifyYaml(val, indent + 1)}`;
      }

      return `${spaces}${safeKey}: ${stringifyYaml(val, indent)}`;
    });

    return lines.join('\n');
  }

  return String(value);
}

/**
 * Simple YAML parser for basic structures
 * Handles objects, arrays, strings, numbers, booleans, and null
 */
function parseYaml(yaml: string): unknown {
  const lines = yaml.split('\n');
  let index = 0;

  function getIndent(line: string): number {
    const match = line.match(/^(\s*)/);
    return match ? match[1].length : 0;
  }

  function parseValue(value: string): unknown {
    value = value.trim();

    // Empty or null
    if (value === '' || value === 'null' || value === '~') return null;

    // Booleans
    if (value === 'true' || value === 'True' || value === 'TRUE') return true;
    if (value === 'false' || value === 'False' || value === 'FALSE') return false;

    // Special floats
    if (value === '.nan' || value === '.NaN' || value === '.NAN') return NaN;
    if (value === '.inf' || value === '.Inf' || value === '.INF') return Infinity;
    if (value === '-.inf' || value === '-.Inf' || value === '-.INF') return -Infinity;

    // Quoted strings
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      const inner = value.slice(1, -1);
      return inner
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\\\/g, '\\');
    }

    // Inline array
    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1).trim();
      if (inner === '') return [];
      return inner.split(',').map((v) => parseValue(v.trim()));
    }

    // Inline object
    if (value.startsWith('{') && value.endsWith('}')) {
      const inner = value.slice(1, -1).trim();
      if (inner === '') return {};
      const result: Record<string, unknown> = {};
      const pairs = inner.split(',');
      for (const pair of pairs) {
        const colonIndex = pair.indexOf(':');
        if (colonIndex !== -1) {
          const key = pair
            .slice(0, colonIndex)
            .trim()
            .replace(/^["']|["']$/g, '');
          const val = pair.slice(colonIndex + 1).trim();
          result[key] = parseValue(val);
        }
      }
      return result;
    }

    // Numbers
    if (/^-?\d+$/.test(value)) return parseInt(value, 10);
    if (/^-?\d*\.?\d+(?:[eE][+-]?\d+)?$/.test(value)) return parseFloat(value);

    // Plain string
    return value;
  }

  function parseBlock(baseIndent: number): unknown {
    // Skip empty lines
    while (index < lines.length && lines[index].trim() === '') {
      index++;
    }

    if (index >= lines.length) return null;

    const currentLine = lines[index];
    const currentIndent = getIndent(currentLine);
    const trimmed = currentLine.trim();

    // Check if it's an array
    if (trimmed.startsWith('- ')) {
      const array: unknown[] = [];

      while (index < lines.length) {
        const line = lines[index];
        const indent = getIndent(line);
        const content = line.trim();

        if (content === '') {
          index++;
          continue;
        }

        if (indent < currentIndent) break;
        if (indent > currentIndent && !content.startsWith('-')) {
          // This is a nested value
          break;
        }

        if (content.startsWith('- ')) {
          const afterDash = content.slice(2);

          if (afterDash.includes(':') && !afterDash.startsWith('"') && !afterDash.startsWith("'")) {
            // Array item is an object
            index++;
            const obj: Record<string, unknown> = {};
            const colonIndex = afterDash.indexOf(':');
            const key = afterDash.slice(0, colonIndex).trim();
            const val = afterDash.slice(colonIndex + 1).trim();

            if (val === '') {
              // Nested value
              obj[key] = parseBlock(indent + 2);
            } else {
              obj[key] = parseValue(val);
            }

            // Check for more keys at same level
            while (index < lines.length) {
              const nextLine = lines[index];
              const nextIndent = getIndent(nextLine);
              const nextContent = nextLine.trim();

              if (nextContent === '') {
                index++;
                continue;
              }

              if (nextIndent <= indent || nextContent.startsWith('-')) break;

              if (nextContent.includes(':')) {
                const colonIdx = nextContent.indexOf(':');
                const nextKey = nextContent.slice(0, colonIdx).trim();
                const nextVal = nextContent.slice(colonIdx + 1).trim();
                index++;

                if (nextVal === '') {
                  obj[nextKey] = parseBlock(nextIndent + 2);
                } else {
                  obj[nextKey] = parseValue(nextVal);
                }
              } else {
                break;
              }
            }

            array.push(obj);
          } else {
            index++;
            array.push(parseValue(afterDash));
          }
        } else {
          break;
        }
      }

      return array;
    }

    // Check if it's an object
    if (trimmed.includes(':')) {
      const obj: Record<string, unknown> = {};

      while (index < lines.length) {
        const line = lines[index];
        const indent = getIndent(line);
        const content = line.trim();

        if (content === '') {
          index++;
          continue;
        }

        if (indent < currentIndent) break;
        if (indent > currentIndent) break;

        if (!content.includes(':') || content.startsWith('-')) break;

        const colonIndex = content.indexOf(':');
        let key = content.slice(0, colonIndex).trim();
        const val = content.slice(colonIndex + 1).trim();

        // Remove quotes from key
        key = key.replace(/^["']|["']$/g, '');

        index++;

        if (val === '') {
          // Nested value
          obj[key] = parseBlock(indent + 2);
        } else {
          obj[key] = parseValue(val);
        }
      }

      return obj;
    }

    // Simple value
    index++;
    return parseValue(trimmed);
  }

  return parseBlock(0);
}

/**
 * Convert JSON string to YAML
 */
export function jsonToYaml(json: string): YamlResult {
  if (!json.trim()) {
    return { success: true, data: '' };
  }

  try {
    const data = JSON.parse(json);
    const yaml = stringifyYaml(data);
    return { success: true, data: yaml };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to parse JSON',
    };
  }
}

/**
 * Convert YAML string to JSON
 */
export function yamlToJson(yaml: string): YamlResult {
  if (!yaml.trim()) {
    return { success: true, data: '' };
  }

  try {
    const data = parseYaml(yaml);
    return { success: true, data: JSON.stringify(data, null, 2) };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to parse YAML',
    };
  }
}
