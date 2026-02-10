export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

export type PasswordStrength = 'very-weak' | 'weak' | 'fair' | 'strong' | 'very-strong';

export interface PasswordResult {
  password: string;
  strength: PasswordStrength;
  entropy: number;
  crackTime: string;
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";
const AMBIGUOUS = new Set(['O', '0', 'l', '1', 'I', '|']);

function buildCharset(options: PasswordOptions): string {
  let charset = '';

  if (options.uppercase) charset += UPPERCASE;
  if (options.lowercase) charset += LOWERCASE;
  if (options.numbers) charset += NUMBERS;
  if (options.symbols) charset += SYMBOLS;

  // Default to lowercase if nothing selected
  if (charset.length === 0) charset += LOWERCASE;

  if (options.excludeAmbiguous) {
    charset = charset
      .split('')
      .filter((c) => !AMBIGUOUS.has(c))
      .join('');
  }

  return charset;
}

function secureRandom(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function calculateEntropy(length: number, charsetSize: number): number {
  if (charsetSize <= 1) return 0;
  return length * Math.log2(charsetSize);
}

function entropyToStrength(entropy: number): PasswordStrength {
  if (entropy < 28) return 'very-weak';
  if (entropy < 36) return 'weak';
  if (entropy < 60) return 'fair';
  if (entropy < 128) return 'strong';
  return 'very-strong';
}

function formatCrackTime(seconds: number): string {
  if (!isFinite(seconds) || seconds > 1e30) return 'centuries';

  const units: [number, string][] = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [365, 'day'],
    [1000, 'year'],
    [1000, 'thousand years'],
    [1000, 'million years'],
    [1000, 'billion years'],
  ];

  if (seconds < 0.001) return 'instant';
  if (seconds < 1) return '< 1 second';

  let value = seconds;

  for (const [divisor, name] of units) {
    if (value < divisor) {
      const rounded = Math.floor(value);
      return `${rounded.toLocaleString()} ${name}${rounded !== 1 ? 's' : ''}`;
    }
    value /= divisor;
  }

  return 'centuries';
}

function estimateCrackTime(entropy: number): string {
  // Assume 10 billion guesses per second (modern GPU cluster)
  const guessesPerSecond = 1e10;
  const totalGuesses = Math.pow(2, entropy);
  // Average case: half the keyspace
  const seconds = totalGuesses / 2 / guessesPerSecond;
  return formatCrackTime(seconds);
}

/**
 * Calculate the strength of a given password
 */
export function calculateStrength(password: string): {
  strength: PasswordStrength;
  entropy: number;
  crackTime: string;
} {
  // Determine the effective charset size from the password characters
  let charsetSize = 0;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  if (hasUpper) charsetSize += 26;
  if (hasLower) charsetSize += 26;
  if (hasNumber) charsetSize += 10;
  if (hasSymbol) charsetSize += 30;

  const entropy = calculateEntropy(password.length, charsetSize);
  const strength = entropyToStrength(entropy);
  const crackTime = estimateCrackTime(entropy);

  return { strength, entropy, crackTime };
}

/**
 * Generate a single password with the given options
 */
export function generatePassword(options: PasswordOptions): PasswordResult {
  const charset = buildCharset(options);
  const length = Math.max(1, Math.min(options.length, 128));

  const chars: string[] = [];
  for (let i = 0; i < length; i++) {
    chars.push(charset[secureRandom(charset.length)]);
  }

  const password = chars.join('');
  const entropy = calculateEntropy(length, charset.length);
  const strength = entropyToStrength(entropy);
  const crackTime = estimateCrackTime(entropy);

  return { password, strength, entropy, crackTime };
}

/**
 * Generate multiple passwords with the given options
 */
export function generatePasswords(options: PasswordOptions, count: number): PasswordResult[] {
  const safeCount = Math.max(1, Math.min(count, 100));
  return Array.from({ length: safeCount }, () => generatePassword(options));
}

/**
 * Get default password options
 */
export function getDefaultOptions(): PasswordOptions {
  return {
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    excludeAmbiguous: false,
  };
}
