export type SlugSeparator = '-' | '_' | '.';

export interface SlugOptions {
  separator: SlugSeparator;
  maxLength: number;
  lowercase: boolean;
}

export interface SlugSeparatorOption {
  value: SlugSeparator;
  label: string;
}

export const slugSeparatorOptions: SlugSeparatorOption[] = [
  { value: '-', label: 'hyphen (-)' },
  { value: '_', label: 'underscore (_)' },
  { value: '.', label: 'dot (.)' },
];

const defaultOptions: SlugOptions = {
  separator: '-',
  maxLength: 0,
  lowercase: true,
};

/**
 * Transliterate common accented characters to ASCII equivalents.
 */
function transliterate(str: string): string {
  const map: Record<string, string> = {
    à: 'a',
    á: 'a',
    â: 'a',
    ã: 'a',
    ä: 'a',
    å: 'a',
    æ: 'ae',
    ç: 'c',
    è: 'e',
    é: 'e',
    ê: 'e',
    ë: 'e',
    ì: 'i',
    í: 'i',
    î: 'i',
    ï: 'i',
    ð: 'd',
    ñ: 'n',
    ò: 'o',
    ó: 'o',
    ô: 'o',
    õ: 'o',
    ö: 'o',
    ø: 'o',
    ù: 'u',
    ú: 'u',
    û: 'u',
    ü: 'u',
    ý: 'y',
    ÿ: 'y',
    þ: 'th',
    ß: 'ss',
  };

  return str.replace(/[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿþß]/g, (ch) => map[ch] || ch);
}

/**
 * Generate a URL-friendly slug from input text.
 * Processes each line independently.
 */
export const generateSlug = (input: string, options: Partial<SlugOptions> = {}): string => {
  const { separator, maxLength, lowercase } = { ...defaultOptions, ...options };

  if (!input.trim()) return '';

  return input
    .split('\n')
    .map((line) => {
      let slug = line.trim();
      if (!slug) return '';

      // Transliterate accented characters
      slug = transliterate(slug);

      // Remove non-alphanumeric characters (keep spaces for now)
      slug = slug.replace(/[^\w\s-]/g, '');

      // Replace whitespace and existing separators with the chosen separator
      slug = slug.replace(/[\s_-]+/g, separator);

      // Remove leading/trailing separators
      slug = slug.replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '');

      // Apply case
      if (lowercase) {
        slug = slug.toLowerCase();
      }

      // Truncate at word boundary if maxLength is set
      if (maxLength > 0 && slug.length > maxLength) {
        slug = slug.substring(0, maxLength);
        // Don't end with a separator
        slug = slug.replace(new RegExp(`\\${separator}+$`), '');
      }

      return slug;
    })
    .join('\n');
};
