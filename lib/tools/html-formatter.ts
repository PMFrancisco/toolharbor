export type HtmlFormatResult = { success: true; data: string } | { success: false; error: string };

/**
 * HTML void elements that don't have closing tags
 */
const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

/**
 * Inline elements that should not force newlines
 */
const INLINE_ELEMENTS = new Set([
  'a',
  'abbr',
  'b',
  'bdo',
  'br',
  'cite',
  'code',
  'dfn',
  'em',
  'i',
  'kbd',
  'mark',
  'q',
  's',
  'samp',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'time',
  'u',
  'var',
  'wbr',
]);

/**
 * Elements whose content should be preserved as-is (no formatting inside)
 */
const PRESERVE_CONTENT = new Set(['pre', 'code', 'script', 'style', 'textarea']);

/**
 * Extract the tag name from an opening or closing tag
 */
function getTagName(tag: string): string {
  const match = tag.match(/^<\/?([a-zA-Z][a-zA-Z0-9-]*)/);
  return match ? match[1].toLowerCase() : '';
}

/**
 * Format HTML with proper indentation
 */
export function formatHtml(input: string, indent: number = 2): HtmlFormatResult {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  try {
    const indentStr = ' '.repeat(indent);
    let formatted = '';
    let level = 0;
    let preserveDepth = 0;

    // Normalize whitespace between tags (but not inside text)
    const html = input.replace(/>\s+</g, '><').trim();

    // Tokenize: tags (including comments, doctype) and text content
    const tokens = html.match(/(<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<[^>]+>|[^<]+)/gi) || [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const trimmed = token.trim();
      if (!trimmed) continue;

      // Inside a preserve block — output as-is
      if (preserveDepth > 0) {
        if (trimmed.startsWith('</')) {
          const tagName = getTagName(trimmed);
          if (PRESERVE_CONTENT.has(tagName)) {
            preserveDepth--;
            if (preserveDepth === 0) {
              formatted += trimmed + '\n';
              level--;
              continue;
            }
          }
        } else if (trimmed.startsWith('<') && !trimmed.startsWith('<!')) {
          const tagName = getTagName(trimmed);
          if (PRESERVE_CONTENT.has(tagName)) {
            preserveDepth++;
          }
        }
        formatted += trimmed;
        continue;
      }

      // DOCTYPE declaration
      if (trimmed.toUpperCase().startsWith('<!DOCTYPE')) {
        formatted += trimmed + '\n';
        continue;
      }

      // Comment
      if (trimmed.startsWith('<!--')) {
        formatted += indentStr.repeat(level) + trimmed + '\n';
        continue;
      }

      // Closing tag
      if (trimmed.startsWith('</')) {
        level = Math.max(0, level - 1);
        formatted += indentStr.repeat(level) + trimmed + '\n';
        continue;
      }

      // Opening or self-closing tag
      if (trimmed.startsWith('<')) {
        const tagName = getTagName(trimmed);
        const isSelfClosing = trimmed.endsWith('/>');
        const isVoid = VOID_ELEMENTS.has(tagName);

        // Check if this is a tag with inline text content
        if (!isSelfClosing && !isVoid && !PRESERVE_CONTENT.has(tagName)) {
          const nextToken = i + 1 < tokens.length ? tokens[i + 1] : '';
          const nextTrimmed = nextToken.trim();
          const afterNext = i + 2 < tokens.length ? tokens[i + 2] : '';
          const afterNextTrimmed = afterNext.trim();

          // Pattern: <tag>text</tag> — keep inline
          if (
            nextTrimmed &&
            !nextTrimmed.startsWith('<') &&
            afterNextTrimmed.startsWith('</') &&
            getTagName(afterNextTrimmed) === tagName
          ) {
            formatted += indentStr.repeat(level) + trimmed + nextTrimmed + afterNextTrimmed + '\n';
            i += 2;
            continue;
          }
        }

        formatted += indentStr.repeat(level) + trimmed + '\n';

        // Check if entering a preserve block
        if (PRESERVE_CONTENT.has(tagName) && !isSelfClosing) {
          preserveDepth++;
          level++;
          continue;
        }

        // Increase indent for non-void, non-self-closing tags
        if (!isSelfClosing && !isVoid) {
          level++;
        }

        continue;
      }

      // Text content
      const nextToken = i + 1 < tokens.length ? tokens[i + 1].trim() : '';
      if (nextToken.startsWith('</')) {
        // Text followed by closing tag — put inline
        formatted = formatted.replace(/\n$/, '');
        formatted += trimmed + nextToken + '\n';
        level = Math.max(0, level - 1);
        i++;
      } else {
        formatted += indentStr.repeat(level) + trimmed + '\n';
      }
    }

    return { success: true, data: formatted.trimEnd() };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to format HTML',
    };
  }
}

/**
 * Minify HTML by removing unnecessary whitespace
 */
export function minifyHtml(input: string): HtmlFormatResult {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  try {
    const minified = input
      .replace(/>\s+</g, '><')
      .replace(/\s*\n\s*/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();

    return { success: true, data: minified };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to minify HTML',
    };
  }
}
