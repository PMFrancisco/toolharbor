export type XmlFormatResult = { success: true; data: string } | { success: false; error: string };

/**
 * Validate XML using DOMParser and return any error message
 */
function getXmlError(input: string): string | null {
  if (typeof DOMParser === 'undefined') return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(input, 'application/xml');
  const errorNode = doc.querySelector('parsererror');

  if (errorNode) {
    // Extract readable error message from parsererror
    const text = errorNode.textContent || 'Invalid XML';
    // Browser parsererror messages vary; try to get the first useful line
    const lines = text.split('\n').filter((l) => l.trim());
    return lines[0] || 'Invalid XML';
  }

  return null;
}

/**
 * Format XML with proper indentation
 */
export function formatXml(input: string, indent: number = 2): XmlFormatResult {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  // Validate first
  const error = getXmlError(input);
  if (error) {
    return { success: false, error };
  }

  try {
    const indentStr = ' '.repeat(indent);
    let formatted = '';
    let level = 0;

    // Normalize: remove existing whitespace between tags
    const xml = input
      .replace(/>\s+</g, '><')
      .replace(/\s*xmlns/g, ' xmlns')
      .trim();

    // Split into tokens: tags and text content
    const tokens = xml.match(/(<[^>]+>)|([^<]+)/g) || [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      if (!token) continue;

      if (token.startsWith('<?')) {
        // XML declaration
        formatted += token + '\n';
      } else if (token.startsWith('<!--')) {
        // Comment
        formatted += indentStr.repeat(level) + token + '\n';
      } else if (token.startsWith('</')) {
        // Closing tag
        level--;
        formatted += indentStr.repeat(level) + token + '\n';
      } else if (token.startsWith('<') && token.endsWith('/>')) {
        // Self-closing tag
        formatted += indentStr.repeat(level) + token + '\n';
      } else if (token.startsWith('<')) {
        // Opening tag
        formatted += indentStr.repeat(level) + token + '\n';
        level++;
      } else {
        // Text content — check if next token is a closing tag
        // If so, put text inline with the opening tag
        const nextToken = i + 1 < tokens.length ? tokens[i + 1].trim() : '';
        if (nextToken.startsWith('</')) {
          // Remove the last newline and append text + closing tag inline
          formatted = formatted.replace(/\n$/, '');
          formatted += token + nextToken + '\n';
          level--;
          i++; // Skip the closing tag
        } else {
          formatted += indentStr.repeat(level) + token + '\n';
        }
      }
    }

    return { success: true, data: formatted.trimEnd() };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to format XML',
    };
  }
}

/**
 * Minify XML by removing unnecessary whitespace
 */
export function minifyXml(input: string): XmlFormatResult {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  const error = getXmlError(input);
  if (error) {
    return { success: false, error };
  }

  try {
    const minified = input
      .replace(/>\s+</g, '><')
      .replace(/\s*\n\s*/g, '')
      .trim();

    return { success: true, data: minified };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to minify XML',
    };
  }
}

/**
 * Validate if a string is valid XML
 */
export function validateXml(input: string): boolean {
  if (!input.trim()) return true;
  return getXmlError(input) === null;
}
