export type NumberFormat = 'dot' | 'paren' | 'colon' | 'tab' | 'space';

export interface LineNumberOptions {
  startNumber: number;
  format: NumberFormat;
  padNumbers: boolean;
  skipEmpty: boolean;
}

export interface LineNumberResult {
  output: string;
  lineCount: number;
}

export interface NumberFormatOption {
  value: NumberFormat;
  label: string;
  separator: string;
}

export const numberFormatOptions: NumberFormatOption[] = [
  { value: 'dot', label: '1. Line', separator: '. ' },
  { value: 'paren', label: '1) Line', separator: ') ' },
  { value: 'colon', label: '1: Line', separator: ': ' },
  { value: 'tab', label: '1 ⇥ Line (tab)', separator: '\t' },
  { value: 'space', label: '1 Line (space)', separator: ' ' },
];

const defaultOptions: LineNumberOptions = {
  startNumber: 1,
  format: 'dot',
  padNumbers: true,
  skipEmpty: false,
};

/**
 * Add line numbers to each line of input text.
 */
export const addLineNumbers = (
  input: string,
  options: Partial<LineNumberOptions> = {}
): LineNumberResult => {
  const { startNumber, format, padNumbers, skipEmpty } = {
    ...defaultOptions,
    ...options,
  };

  if (!input.trim()) {
    return { output: '', lineCount: 0 };
  }

  const lines = input.split('\n');
  const separator = numberFormatOptions.find((opt) => opt.value === format)?.separator ?? '. ';

  let currentNumber = startNumber;
  const totalLines = skipEmpty
    ? lines.filter((line) => line.trim().length > 0).length
    : lines.length;
  const maxDigits = String(startNumber + totalLines - 1).length;

  const numbered = lines.map((line) => {
    if (skipEmpty && line.trim().length === 0) {
      return '';
    }

    const numStr = padNumbers
      ? String(currentNumber).padStart(maxDigits, ' ')
      : String(currentNumber);
    currentNumber++;

    return `${numStr}${separator}${line}`;
  });

  return {
    output: numbered.join('\n'),
    lineCount: totalLines,
  };
};
