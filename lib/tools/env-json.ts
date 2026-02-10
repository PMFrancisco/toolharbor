export interface EnvJsonResult {
  success: true;
  data: string;
}

export interface EnvJsonError {
  success: false;
  error: string;
}

export type EnvJsonResponse = EnvJsonResult | EnvJsonError;

/**
 * Parse a single .env line and extract key-value pair
 * Handles: KEY=VALUE, export KEY=VALUE, quoted values, inline comments
 */
function parseEnvLine(line: string): { key: string; value: string } | null {
  // Skip empty lines and comments
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return null;

  // Remove optional 'export ' prefix
  const cleaned = trimmed.startsWith('export ') ? trimmed.slice(7).trimStart() : trimmed;

  // Find the first '=' sign
  const eqIndex = cleaned.indexOf('=');
  if (eqIndex === -1) return null;

  const key = cleaned.slice(0, eqIndex).trim();
  if (!key) return null;

  let value = cleaned.slice(eqIndex + 1);

  // Handle quoted values
  if (
    (value.startsWith('"') && value.includes('"', 1)) ||
    (value.startsWith("'") && value.includes("'", 1))
  ) {
    const quote = value[0];
    // Find the closing quote
    const closingIndex = value.indexOf(quote, 1);
    if (closingIndex !== -1) {
      const inner = value.slice(1, closingIndex);
      // For double quotes, process escape sequences
      if (quote === '"') {
        return {
          key,
          value: inner
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t')
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, '\\'),
        };
      }
      // Single quotes are literal
      return { key, value: inner };
    }
  }

  // Unquoted value: strip inline comments (space + #)
  const commentIndex = value.indexOf(' #');
  if (commentIndex !== -1) {
    value = value.slice(0, commentIndex);
  }

  return { key, value: value.trim() };
}

/**
 * Convert .env formatted string to JSON
 */
export function envToJson(input: string): EnvJsonResponse {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  try {
    const lines = input.split('\n');
    const result: Record<string, string> = {};
    let hasEntries = false;

    for (const line of lines) {
      const parsed = parseEnvLine(line);
      if (parsed) {
        result[parsed.key] = parsed.value;
        hasEntries = true;
      }
    }

    if (!hasEntries) {
      return {
        success: false,
        error: 'No valid KEY=VALUE pairs found. Expected format: KEY=value',
      };
    }

    return { success: true, data: JSON.stringify(result, null, 2) };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to parse .env content',
    };
  }
}

/**
 * Convert JSON string to .env format
 */
export function jsonToEnv(input: string): EnvJsonResponse {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  try {
    const data = JSON.parse(input);

    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      return {
        success: false,
        error: 'Expected a JSON object with string values (e.g. { "KEY": "value" })',
      };
    }

    const lines: string[] = [];

    for (const [key, value] of Object.entries(data)) {
      const strValue = String(value ?? '');

      // Determine if value needs quoting
      const needsQuotes =
        strValue === '' ||
        strValue.includes(' ') ||
        strValue.includes('#') ||
        strValue.includes('"') ||
        strValue.includes("'") ||
        strValue.includes('\n') ||
        strValue.includes('\r') ||
        strValue.includes('\t') ||
        strValue.includes('=') ||
        strValue.startsWith(' ') ||
        strValue.endsWith(' ');

      if (needsQuotes) {
        // Use double quotes with escape sequences
        const escaped = strValue
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"')
          .replace(/\n/g, '\\n')
          .replace(/\r/g, '\\r')
          .replace(/\t/g, '\\t');
        lines.push(`${key}="${escaped}"`);
      } else {
        lines.push(`${key}=${strValue}`);
      }
    }

    return { success: true, data: lines.join('\n') };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to parse JSON',
    };
  }
}
