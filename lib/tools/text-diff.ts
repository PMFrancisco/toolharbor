export interface DiffOptions {
  ignoreCase: boolean;
  trimWhitespace: boolean;
  ignoreEmpty: boolean;
}

export type DiffLineType = 'equal' | 'added' | 'removed';

export interface DiffLine {
  type: DiffLineType;
  text: string;
  lineNumber?: number;
}

export interface DiffResult {
  lines: DiffLine[];
  addedCount: number;
  removedCount: number;
  unchangedCount: number;
}

const defaultOptions: DiffOptions = {
  ignoreCase: false,
  trimWhitespace: false,
  ignoreEmpty: false,
};

/**
 * Simple line-by-line diff using the LCS (Longest Common Subsequence) approach.
 */
export const computeDiff = (
  original: string,
  modified: string,
  options: Partial<DiffOptions> = {}
): DiffResult => {
  const { ignoreCase, trimWhitespace, ignoreEmpty } = { ...defaultOptions, ...options };

  if (!original && !modified) {
    return { lines: [], addedCount: 0, removedCount: 0, unchangedCount: 0 };
  }

  let origLines = original.split('\n');
  let modLines = modified.split('\n');

  // Preprocess lines
  const preprocess = (lines: string[]): string[] => {
    let result = lines;
    if (trimWhitespace) {
      result = result.map((l) => l.trim());
    }
    if (ignoreEmpty) {
      result = result.filter((l) => l.length > 0);
    }
    return result;
  };

  origLines = preprocess(origLines);
  modLines = preprocess(modLines);

  const normalize = (s: string) => (ignoreCase ? s.toLowerCase() : s);

  // Build LCS table
  const m = origLines.length;
  const n = modLines.length;

  // Use 1D optimization for memory efficiency
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (normalize(origLines[i - 1]) === normalize(modLines[j - 1])) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to produce diff
  const lines: DiffLine[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && normalize(origLines[i - 1]) === normalize(modLines[j - 1])) {
      lines.unshift({ type: 'equal', text: modLines[j - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      lines.unshift({ type: 'added', text: modLines[j - 1] });
      j--;
    } else {
      lines.unshift({ type: 'removed', text: origLines[i - 1] });
      i--;
    }
  }

  // Assign line numbers
  let origNum = 1;
  let modNum = 1;
  for (const line of lines) {
    if (line.type === 'equal') {
      line.lineNumber = origNum;
      origNum++;
      modNum++;
    } else if (line.type === 'removed') {
      line.lineNumber = origNum;
      origNum++;
    } else {
      line.lineNumber = modNum;
      modNum++;
    }
  }

  return {
    lines,
    addedCount: lines.filter((l) => l.type === 'added').length,
    removedCount: lines.filter((l) => l.type === 'removed').length,
    unchangedCount: lines.filter((l) => l.type === 'equal').length,
  };
};
