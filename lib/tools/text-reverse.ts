export type ReverseMode = 'characters' | 'words' | 'lines';

export interface ReverseModeOption {
  value: ReverseMode;
  label: string;
}

export const reverseModeOptions: ReverseModeOption[] = [
  { value: 'characters', label: 'Characters' },
  { value: 'words', label: 'Words' },
  { value: 'lines', label: 'Lines' },
];

/**
 * Reverse text by characters, words, or lines.
 */
export const reverseText = (input: string, mode: ReverseMode): string => {
  if (!input) return '';

  switch (mode) {
    case 'characters':
      // Use Array.from to handle Unicode characters correctly
      return Array.from(input).reverse().join('');

    case 'words':
      return input
        .split('\n')
        .map((line) => line.split(/(\s+)/).reverse().join(''))
        .join('\n');

    case 'lines':
      return input.split('\n').reverse().join('\n');

    default:
      return input;
  }
};
