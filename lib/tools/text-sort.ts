export type SortMode = 'az' | 'za' | 'length-asc' | 'length-desc' | 'random';

export interface TextSortOptions {
  sortMode: SortMode;
  caseSensitive: boolean;
  trimWhitespace: boolean;
  ignoreEmpty: boolean;
}

export interface TextSortResult {
  output: string;
  lineCount: number;
}

export interface SortModeOption {
  value: SortMode;
  label: string;
}

export const sortModeOptions: SortModeOption[] = [
  { value: 'az', label: 'A → Z' },
  { value: 'za', label: 'Z → A' },
  { value: 'length-asc', label: 'Shortest first' },
  { value: 'length-desc', label: 'Longest first' },
  { value: 'random', label: 'Random shuffle' },
];

const defaultOptions: TextSortOptions = {
  sortMode: 'az',
  caseSensitive: true,
  trimWhitespace: false,
  ignoreEmpty: false,
};

/**
 * Sort lines of text by various criteria.
 */
export const sortText = (input: string, options: Partial<TextSortOptions> = {}): TextSortResult => {
  const { sortMode, caseSensitive, trimWhitespace, ignoreEmpty } = {
    ...defaultOptions,
    ...options,
  };

  if (!input.trim()) {
    return { output: '', lineCount: 0 };
  }

  let lines = input.split('\n');

  if (trimWhitespace) {
    lines = lines.map((line) => line.trim());
  }

  if (ignoreEmpty) {
    lines = lines.filter((line) => line.length > 0);
  }

  const compare = (a: string, b: string): number => {
    const valA = caseSensitive ? a : a.toLowerCase();
    const valB = caseSensitive ? b : b.toLowerCase();
    return valA.localeCompare(valB);
  };

  switch (sortMode) {
    case 'az':
      lines.sort(compare);
      break;
    case 'za':
      lines.sort((a, b) => compare(b, a));
      break;
    case 'length-asc':
      lines.sort((a, b) => a.length - b.length || compare(a, b));
      break;
    case 'length-desc':
      lines.sort((a, b) => b.length - a.length || compare(a, b));
      break;
    case 'random':
      for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lines[i], lines[j]] = [lines[j], lines[i]];
      }
      break;
  }

  return {
    output: lines.join('\n'),
    lineCount: lines.length,
  };
};
