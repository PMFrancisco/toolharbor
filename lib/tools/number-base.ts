export interface NumberBaseValues {
  binary: string;
  octal: string;
  decimal: string;
  hexadecimal: string;
}

export type BaseType = keyof NumberBaseValues;

export interface NumberBaseResult {
  success: true;
  data: NumberBaseValues;
}

export interface NumberBaseError {
  success: false;
  error: string;
}

export type NumberBaseConversion = NumberBaseResult | NumberBaseError;

const BASE_MAP: Record<BaseType, number> = {
  binary: 2,
  octal: 8,
  decimal: 10,
  hexadecimal: 16,
};

const VALID_CHARS: Record<BaseType, RegExp> = {
  binary: /^-?[01]+$/,
  octal: /^-?[0-7]+$/,
  decimal: /^-?\d+$/,
  hexadecimal: /^-?[0-9a-fA-F]+$/,
};

const BASE_LABELS: Record<BaseType, string> = {
  binary: 'Binary',
  octal: 'Octal',
  decimal: 'Decimal',
  hexadecimal: 'Hexadecimal',
};

/**
 * Convert a number from one base to all other bases
 */
export function convertBase(value: string, fromBase: BaseType): NumberBaseConversion {
  const trimmed = value.trim();

  if (!trimmed) {
    return {
      success: true,
      data: { binary: '', octal: '', decimal: '', hexadecimal: '' },
    };
  }

  if (!VALID_CHARS[fromBase].test(trimmed)) {
    return {
      success: false,
      error: `Invalid ${BASE_LABELS[fromBase].toLowerCase()} number`,
    };
  }

  try {
    // Handle negative numbers
    const isNegative = trimmed.startsWith('-');
    const absValue = isNegative ? trimmed.slice(1) : trimmed;

    // Parse to decimal first
    const decimalValue = parseInt(absValue, BASE_MAP[fromBase]);

    if (Number.isNaN(decimalValue)) {
      return { success: false, error: 'Invalid number' };
    }

    if (!Number.isSafeInteger(decimalValue)) {
      return { success: false, error: 'Number is too large for safe conversion' };
    }

    const sign = isNegative ? '-' : '';

    return {
      success: true,
      data: {
        binary: sign + decimalValue.toString(2),
        octal: sign + decimalValue.toString(8),
        decimal: sign + decimalValue.toString(10),
        hexadecimal: sign + decimalValue.toString(16).toUpperCase(),
      },
    };
  } catch {
    return { success: false, error: 'Failed to convert number' };
  }
}

export { BASE_LABELS };
