export type CssMinifyResult = { success: true; data: string } | { success: false; error: string };

/**
 * Minify CSS by removing comments, whitespace, and unnecessary characters
 */
export function minifyCss(input: string): CssMinifyResult {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  try {
    let css = input;

    // Remove comments (/* ... */)
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');

    // Remove newlines and carriage returns
    css = css.replace(/[\r\n]+/g, '');

    // Remove whitespace around selectors and braces
    css = css.replace(/\s*([{}:;,>~+])\s*/g, '$1');

    // Remove whitespace around !important
    css = css.replace(/\s*!important/g, '!important');

    // Collapse multiple spaces into one
    css = css.replace(/\s{2,}/g, ' ');

    // Remove space after opening brace
    css = css.replace(/\{\s+/g, '{');

    // Remove space before closing brace
    css = css.replace(/\s+\}/g, '}');

    // Remove last semicolon before closing brace
    css = css.replace(/;}/g, '}');

    // Remove leading/trailing whitespace
    css = css.trim();

    return { success: true, data: css };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to minify CSS',
    };
  }
}

/**
 * Calculate byte size of a string (UTF-8)
 */
export function getByteSize(input: string): number {
  return new TextEncoder().encode(input).length;
}
