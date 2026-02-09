export type CaseType =
  | 'camelCase'
  | 'PascalCase'
  | 'snake_case'
  | 'CONSTANT_CASE'
  | 'kebab-case'
  | 'Title Case'
  | 'lowercase'
  | 'UPPERCASE';

export interface CaseOption {
  value: CaseType;
  label: string;
}

export const caseOptions: CaseOption[] = [
  { value: 'camelCase', label: 'camelCase' },
  { value: 'PascalCase', label: 'PascalCase' },
  { value: 'snake_case', label: 'snake_case' },
  { value: 'CONSTANT_CASE', label: 'CONSTANT_CASE' },
  { value: 'kebab-case', label: 'kebab-case' },
  { value: 'Title Case', label: 'Title Case' },
  { value: 'lowercase', label: 'lowercase' },
  { value: 'UPPERCASE', label: 'UPPERCASE' },
];

/**
 * Split any string into words, handling:
 * - spaces, tabs, newlines
 * - underscores, hyphens, dots
 * - camelCase / PascalCase boundaries
 */
function splitWords(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // camelCase boundary
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // ACRONYMWord boundary
    .replace(/[_\-.\s]+/g, ' ') // separators → space
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

const toCamelCase = (words: string[]): string =>
  words
    .map((w, i) =>
      i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join('');

const toPascalCase = (words: string[]): string =>
  words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');

const toSnakeCase = (words: string[]): string => words.map((w) => w.toLowerCase()).join('_');

const toConstantCase = (words: string[]): string => words.map((w) => w.toUpperCase()).join('_');

const toKebabCase = (words: string[]): string => words.map((w) => w.toLowerCase()).join('-');

const toTitleCase = (words: string[]): string =>
  words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

const toLowerCase = (words: string[]): string => words.map((w) => w.toLowerCase()).join(' ');

const toUpperCase = (words: string[]): string => words.map((w) => w.toUpperCase()).join(' ');

const converters: Record<CaseType, (words: string[]) => string> = {
  camelCase: toCamelCase,
  PascalCase: toPascalCase,
  snake_case: toSnakeCase,
  CONSTANT_CASE: toConstantCase,
  'kebab-case': toKebabCase,
  'Title Case': toTitleCase,
  lowercase: toLowerCase,
  UPPERCASE: toUpperCase,
};

/**
 * Convert a string to the specified case type.
 * Processes each line independently to preserve line breaks.
 */
export const convertCase = (input: string, caseType: CaseType): string => {
  if (!input.trim()) return '';

  const converter = converters[caseType];

  return input
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      const words = splitWords(trimmed);
      if (words.length === 0) return '';
      return converter(words);
    })
    .join('\n');
};
