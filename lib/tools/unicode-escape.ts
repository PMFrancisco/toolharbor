export type UnicodeEscapeResult =
  | { success: true; data: string }
  | { success: false; error: string };

export type EscapeMode = 'escape' | 'unescape';

/**
 * Escape text to Unicode \uXXXX sequences
 * Only escapes non-ASCII characters and common control characters
 */
export function escapeUnicode(input: string, escapeAll: boolean = false): UnicodeEscapeResult {
  if (!input) return { success: true, data: '' };

  try {
    let result = '';
    for (const char of input) {
      const code = char.codePointAt(0)!;
      if (escapeAll && code > 31) {
        if (code > 0xffff) {
          // Surrogate pair for characters outside BMP
          const hi = Math.floor((code - 0x10000) / 0x400) + 0xd800;
          const lo = ((code - 0x10000) % 0x400) + 0xdc00;
          result += `\\u${hi.toString(16).padStart(4, '0')}\\u${lo.toString(16).padStart(4, '0')}`;
        } else {
          result += `\\u${code.toString(16).padStart(4, '0')}`;
        }
      } else if (code > 127) {
        if (code > 0xffff) {
          const hi = Math.floor((code - 0x10000) / 0x400) + 0xd800;
          const lo = ((code - 0x10000) % 0x400) + 0xdc00;
          result += `\\u${hi.toString(16).padStart(4, '0')}\\u${lo.toString(16).padStart(4, '0')}`;
        } else {
          result += `\\u${code.toString(16).padStart(4, '0')}`;
        }
      } else {
        // Keep ASCII printable as-is, escape control chars
        switch (char) {
          case '\n':
            result += '\\n';
            break;
          case '\r':
            result += '\\r';
            break;
          case '\t':
            result += '\\t';
            break;
          case '\0':
            result += '\\0';
            break;
          default:
            result += char;
        }
      }
    }
    return { success: true, data: result };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to escape text' };
  }
}

/**
 * Unescape \uXXXX sequences back to text
 */
export function unescapeUnicode(input: string): UnicodeEscapeResult {
  if (!input) return { success: true, data: '' };

  try {
    const result = input
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\0/g, '\0')
      .replace(/\\\\/g, '\\');

    return { success: true, data: result };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to unescape text' };
  }
}

export const escapeModeOptions = [
  { value: 'escape' as EscapeMode, label: 'Escape' },
  { value: 'unescape' as EscapeMode, label: 'Unescape' },
];
