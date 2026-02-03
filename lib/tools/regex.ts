export interface RegexMatch {
  match: string;
  index: number;
  length: number;
  groups?: Record<string, string>;
}

export interface RegexTestSuccess {
  success: true;
  matches: RegexMatch[];
  isValid: boolean;
}

export interface RegexTestError {
  success: false;
  error: string;
}

export type RegexResult = RegexTestSuccess | RegexTestError;

/**
 * Test a regex pattern against input text
 */
export function testRegex(pattern: string, testString: string, flags: string = 'g'): RegexResult {
  if (!pattern) {
    return { success: true, matches: [], isValid: true };
  }

  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];

    if (flags.includes('g')) {
      let match;
      while ((match = regex.exec(testString)) !== null) {
        matches.push({
          match: match[0],
          index: match.index,
          length: match[0].length,
          groups: match.groups,
        });
        // Prevent infinite loop for zero-length matches
        if (match[0].length === 0) {
          regex.lastIndex++;
        }
      }
    } else {
      const match = regex.exec(testString);
      if (match) {
        matches.push({
          match: match[0],
          index: match.index,
          length: match[0].length,
          groups: match.groups,
        });
      }
    }

    return { success: true, matches, isValid: true };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Invalid regex pattern',
    };
  }
}

/**
 * Validate if a regex pattern is valid
 */
export function isValidRegex(pattern: string, flags: string = ''): boolean {
  try {
    new RegExp(pattern, flags);
    return true;
  } catch {
    return false;
  }
}

/**
 * Escape special regex characters in a string
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
