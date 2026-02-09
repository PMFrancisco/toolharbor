export type SortOrder = 'original' | 'asc' | 'desc';

export interface DeduplicateOptions {
  trimWhitespace: boolean;
  caseInsensitive: boolean;
  ignoreEmpty: boolean;
  sortOrder: SortOrder;
}

export interface DeduplicateResult {
  output: string;
  originalCount: number;
  uniqueCount: number;
  removedCount: number;
}

export interface SortOption {
  value: SortOrder;
  label: string;
}

export const sortOptions: SortOption[] = [
  { value: 'original', label: 'Original order' },
  { value: 'asc', label: 'A → Z' },
  { value: 'desc', label: 'Z → A' },
];

const defaultOptions: DeduplicateOptions = {
  trimWhitespace: true,
  caseInsensitive: false,
  ignoreEmpty: true,
  sortOrder: 'original',
};

/**
 * Remove duplicate lines from input text.
 */
export const removeDuplicates = (
  input: string,
  options: Partial<DeduplicateOptions> = {}
): DeduplicateResult => {
  const { trimWhitespace, caseInsensitive, ignoreEmpty, sortOrder } = {
    ...defaultOptions,
    ...options,
  };

  if (!input.trim()) {
    return { output: '', originalCount: 0, uniqueCount: 0, removedCount: 0 };
  }

  let lines = input.split('\n');
  const originalCount = lines.length;

  // Trim whitespace per line
  if (trimWhitespace) {
    lines = lines.map((line) => line.trim());
  }

  // Remove empty lines
  if (ignoreEmpty) {
    lines = lines.filter((line) => line.length > 0);
  }

  // Deduplicate
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const line of lines) {
    const key = caseInsensitive ? line.toLowerCase() : line;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(line);
    }
  }

  // Sort
  let sorted = unique;
  if (sortOrder === 'asc') {
    sorted = [...unique].sort((a, b) => a.localeCompare(b));
  } else if (sortOrder === 'desc') {
    sorted = [...unique].sort((a, b) => b.localeCompare(a));
  }

  return {
    output: sorted.join('\n'),
    originalCount,
    uniqueCount: sorted.length,
    removedCount: originalCount - sorted.length,
  };
};
