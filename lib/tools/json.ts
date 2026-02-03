export interface JsonFormatResult {
  success: true;
  data: string;
}

export interface JsonFormatError {
  success: false;
  error: string;
}

export type JsonResult = JsonFormatResult | JsonFormatError;

/**
 * Validate if a string is valid JSON
 */
export function validateJson(input: string): boolean {
  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
}

/**
 * Format JSON with specified indentation
 */
export function formatJson(input: string, indent: number = 2): JsonResult {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, indent);
    return { success: true, data: formatted };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Invalid JSON',
    };
  }
}

/**
 * Minify JSON by removing whitespace
 */
export function minifyJson(input: string): JsonResult {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  try {
    const parsed = JSON.parse(input);
    const minified = JSON.stringify(parsed);
    return { success: true, data: minified };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Invalid JSON',
    };
  }
}
