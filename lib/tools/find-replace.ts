export interface FindReplaceOptions {
  caseSensitive: boolean;
  useRegex: boolean;
  wholeWord: boolean;
}

export interface FindReplaceResult {
  output: string;
  matchCount: number;
}

const defaultOptions: FindReplaceOptions = {
  caseSensitive: false,
  useRegex: false,
  wholeWord: false,
};

/**
 * Escape special regex characters in a string.
 */
function escapeForRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Build a RegExp from find string and options.
 * Returns null if the regex is invalid.
 */
export function buildPattern(
  find: string,
  options: Partial<FindReplaceOptions> = {}
): RegExp | null {
  const { caseSensitive, useRegex, wholeWord } = { ...defaultOptions, ...options };

  if (!find) return null;

  let pattern = useRegex ? find : escapeForRegex(find);

  if (wholeWord) {
    pattern = `\\b${pattern}\\b`;
  }

  const flags = `g${caseSensitive ? '' : 'i'}`;

  try {
    return new RegExp(pattern, flags);
  } catch {
    return null;
  }
}

/**
 * Find and replace all occurrences in the input text.
 */
export const findAndReplace = (
  input: string,
  find: string,
  replace: string,
  options: Partial<FindReplaceOptions> = {}
): FindReplaceResult => {
  if (!input || !find) {
    return { output: input, matchCount: 0 };
  }

  const regex = buildPattern(find, options);
  if (!regex) {
    return { output: input, matchCount: 0 };
  }

  // Count matches first
  const matches = input.match(regex);
  const matchCount = matches ? matches.length : 0;

  // Perform replacement
  const output = input.replace(regex, replace);

  return { output, matchCount };
};

/**
 * Count matches without replacing.
 */
export const countMatches = (
  input: string,
  find: string,
  options: Partial<FindReplaceOptions> = {}
): number => {
  if (!input || !find) return 0;

  const regex = buildPattern(find, options);
  if (!regex) return 0;

  const matches = input.match(regex);
  return matches ? matches.length : 0;
};
