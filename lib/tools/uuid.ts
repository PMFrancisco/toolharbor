export interface UuidOptions {
  uppercase?: boolean;
  noDashes?: boolean;
}

/**
 * Generate a random UUID v4
 */
export function generateUUID(): string {
  // Use crypto.randomUUID if available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Generate multiple UUIDs
 */
export function generateUUIDs(count: number): string[] {
  return Array.from({ length: count }, () => generateUUID());
}

/**
 * Format a UUID with options
 */
export function formatUUID(uuid: string, options: UuidOptions = {}): string {
  let result = uuid;

  if (options.uppercase) {
    result = result.toUpperCase();
  }

  if (options.noDashes) {
    result = result.replace(/-/g, '');
  }

  return result;
}

/**
 * Validate if a string is a valid UUID
 */
export function isValidUUID(input: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(input);
}
