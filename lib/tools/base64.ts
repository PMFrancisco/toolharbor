export interface Base64Result {
  success: true;
  data: string;
}

export interface Base64Error {
  success: false;
  error: string;
}

export type Base64Response = Base64Result | Base64Error;

/**
 * Encode a string to Base64 (UTF-8 safe)
 */
export function encodeBase64(input: string): Base64Response {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  try {
    // Handle UTF-8 characters properly
    const encoded = btoa(
      encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
    return { success: true, data: encoded };
  } catch {
    return { success: false, error: 'Failed to encode input' };
  }
}

/**
 * Decode a Base64 string (UTF-8 safe)
 */
export function decodeBase64(input: string): Base64Response {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  try {
    // Handle UTF-8 characters properly
    const decoded = decodeURIComponent(
      Array.prototype.map
        .call(atob(input.trim()), (c: string) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return { success: true, data: decoded };
  } catch {
    return { success: false, error: 'Invalid Base64 string' };
  }
}

/**
 * Check if a string is valid Base64
 */
export function isValidBase64(input: string): boolean {
  if (!input.trim()) return true;

  try {
    atob(input.trim());
    return true;
  } catch {
    return false;
  }
}
