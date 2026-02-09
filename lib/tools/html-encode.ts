export interface HtmlEncodeResult {
  success: true;
  data: string;
}

export interface HtmlEncodeError {
  success: false;
  error: string;
}

export type HtmlResult = HtmlEncodeResult | HtmlEncodeError;

const encodeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#96;',
};

const decodeMap: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x27;': "'",
  '&#x2F;': '/',
  '&#96;': '`',
  '&apos;': "'",
  '&nbsp;': ' ',
};

/**
 * Encode special characters to HTML entities.
 */
export const encodeHtml = (input: string): HtmlResult => {
  if (!input) return { success: false, error: 'Please enter text to encode' };

  try {
    const encoded = input.replace(/[&<>"'`/]/g, (ch) => encodeMap[ch] || ch);
    return { success: true, data: encoded };
  } catch {
    return { success: false, error: 'Failed to encode HTML entities' };
  }
};

/**
 * Decode HTML entities back to characters.
 */
export const decodeHtml = (input: string): HtmlResult => {
  if (!input) return { success: false, error: 'Please enter text to decode' };

  try {
    // Decode named and numeric entities
    let decoded = input;

    // Named entities
    for (const [entity, char] of Object.entries(decodeMap)) {
      decoded = decoded.replaceAll(entity, char);
    }

    // Decimal numeric entities: &#123;
    decoded = decoded.replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));

    // Hex numeric entities: &#x1F4A9;
    decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );

    return { success: true, data: decoded };
  } catch {
    return { success: false, error: 'Failed to decode HTML entities' };
  }
};
