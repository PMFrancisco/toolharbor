export type AsciiFormat = 'decimal' | 'hex' | 'binary' | 'octal';
export type AsciiMode = 'text-to-ascii' | 'ascii-to-text';

export interface CharCode {
  char: string;
  decimal: number;
  hex: string;
  binary: string;
  octal: string;
}

export type TextToAsciiResult =
  | { success: true; data: string; chars?: CharCode[] }
  | { success: false; error: string };

/**
 * Convert text to ASCII/Unicode code values
 */
export function textToAscii(
  input: string,
  format: AsciiFormat = 'decimal',
  separator: string = ' '
): TextToAsciiResult {
  if (!input) return { success: true, data: '', chars: [] };

  try {
    const chars: CharCode[] = [];

    for (const char of input) {
      const code = char.codePointAt(0)!;
      chars.push({
        char,
        decimal: code,
        hex: code.toString(16).toUpperCase().padStart(2, '0'),
        binary: code.toString(2).padStart(8, '0'),
        octal: code.toString(8),
      });
    }

    let data: string;
    switch (format) {
      case 'decimal':
        data = chars.map((c) => c.decimal).join(separator);
        break;
      case 'hex':
        data = chars.map((c) => c.hex).join(separator);
        break;
      case 'binary':
        data = chars.map((c) => c.binary).join(separator);
        break;
      case 'octal':
        data = chars.map((c) => c.octal).join(separator);
        break;
    }

    return { success: true, data, chars };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to convert text' };
  }
}

/**
 * Convert ASCII code values back to text
 */
export function asciiToText(
  input: string,
  format: AsciiFormat = 'decimal',
  separator: string = ' '
): TextToAsciiResult {
  if (!input.trim()) return { success: true, data: '' };

  try {
    const sep = separator || ' ';
    const parts = input
      .trim()
      .split(sep)
      .filter((p) => p.length > 0);
    const base = format === 'decimal' ? 10 : format === 'hex' ? 16 : format === 'binary' ? 2 : 8;

    let text = '';
    for (let i = 0; i < parts.length; i++) {
      const num = parseInt(parts[i], base);
      if (isNaN(num)) {
        return {
          success: false,
          error: `Invalid ${format} value at position ${i + 1}: "${parts[i]}"`,
        };
      }
      if (num < 0 || num > 0x10ffff) {
        return { success: false, error: `Code point out of range at position ${i + 1}: ${num}` };
      }
      text += String.fromCodePoint(num);
    }

    return { success: true, data: text };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to convert codes' };
  }
}

export const asciiFormatOptions = [
  { value: 'decimal' as AsciiFormat, label: 'Decimal' },
  { value: 'hex' as AsciiFormat, label: 'Hexadecimal' },
  { value: 'binary' as AsciiFormat, label: 'Binary' },
  { value: 'octal' as AsciiFormat, label: 'Octal' },
];

export const asciiModeOptions = [
  { value: 'text-to-ascii' as AsciiMode, label: 'Text → ASCII' },
  { value: 'ascii-to-text' as AsciiMode, label: 'ASCII → Text' },
];
