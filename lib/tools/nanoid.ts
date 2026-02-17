export interface NanoidOptions {
  length: number;
  alphabet: string;
  count: number;
}

export const ALPHABETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '-_',
} as const;

export type AlphabetKey = keyof typeof ALPHABETS;

export const DEFAULT_OPTIONS: NanoidOptions = {
  length: 21,
  alphabet: ALPHABETS.lowercase + ALPHABETS.uppercase + ALPHABETS.numbers + ALPHABETS.symbols,
  count: 1,
};

/**
 * Build an alphabet string from selected character sets
 */
export function buildAlphabet(keys: AlphabetKey[], custom?: string): string {
  let alphabet = keys.map((k) => ALPHABETS[k]).join('');
  if (custom) alphabet += custom;
  // Remove duplicate characters
  return [...new Set(alphabet.split(''))].join('');
}

/**
 * Generate a single NanoID-style random string
 */
function generateOne(length: number, alphabet: string): string {
  if (alphabet.length === 0) return '';
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);

  const mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1;
  const step = Math.ceil((1.6 * mask * length) / alphabet.length);

  let id = '';
  let idx = 0;

  while (id.length < length) {
    if (idx >= bytes.length) {
      crypto.getRandomValues(bytes);
      idx = 0;
    }
    const byte = bytes[idx] & mask;
    if (byte < alphabet.length) {
      id += alphabet[byte];
    }
    idx++;

    // Safety: regenerate bytes if we've used too many
    if (idx >= step) {
      crypto.getRandomValues(bytes);
      idx = 0;
    }
  }

  return id;
}

/**
 * Generate multiple NanoID-style random strings
 */
export function generateNanoids(options?: Partial<NanoidOptions>): string[] {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const { length, alphabet, count } = opts;

  if (length < 1) return [''];
  if (alphabet.length < 2) return ['Alphabet must have at least 2 characters'];

  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    results.push(generateOne(length, alphabet));
  }
  return results;
}

export const alphabetOptions: { value: AlphabetKey; label: string }[] = [
  { value: 'lowercase', label: 'a-z' },
  { value: 'uppercase', label: 'A-Z' },
  { value: 'numbers', label: '0-9' },
  { value: 'symbols', label: '-_' },
];
