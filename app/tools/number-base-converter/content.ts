export const toolInfo = {
  name: 'Number Base Converter',
  description:
    'Convert numbers between binary, decimal, hexadecimal, and octal instantly. Free online base converter.',
  slug: 'number-base-converter',
};

export const relatedTools = [
  { name: 'Color Converter', href: '/tools/color-converter' },
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'Timestamp Converter', href: '/tools/timestamp-converter' },
  { name: 'HTML Encoder/Decoder', href: '/tools/html-encoder' },
];

export const features = [
  'Convert between binary, octal, decimal, and hexadecimal',
  'Type in any field and all others update instantly',
  'Supports negative numbers',
  'Validates input characters for each base',
  'Copy any result with one click',
  'Works offline — no data sent to servers',
];

export const howToSteps = [
  'Type a number in any of the four input fields (binary, octal, decimal, or hex)',
  'All other fields update in real-time as you type',
  'Use the Copy button to copy any converted value',
  'Click "Load Sample" to see an example conversion',
  'Click "Clear" to reset all fields',
];

export const examples = [
  {
    title: 'Decimal 255 in all bases',
    input: '255',
    output: 'Binary: 11111111 | Octal: 377 | Hex: FF',
  },
  {
    title: 'Binary 10101010 to other bases',
    input: '10101010 (binary)',
    output: 'Decimal: 170 | Octal: 252 | Hex: AA',
  },
  {
    title: 'Hexadecimal FF00 to other bases',
    input: 'FF00 (hex)',
    output: 'Decimal: 65280 | Binary: 1111111100000000 | Octal: 177400',
  },
];

export const explanation = {
  title: 'What is a Number Base Converter?',
  content: [
    'A number base converter (also called a radix converter) translates numbers between different numeral systems. The four most commonly used systems in programming and computer science are binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16). Each system represents the same value using different sets of digits.',
    'Binary (base 2) uses only 0 and 1. It is the fundamental language of computers — every piece of data, from text to images to programs, is ultimately stored as binary. Developers work with binary when dealing with bitwise operations, network masks, file permissions, and low-level hardware programming.',
    'Hexadecimal (base 16) uses digits 0–9 and letters A–F. It is a compact way to represent binary data: each hex digit maps to exactly 4 binary digits (bits). This makes hex popular for memory addresses, color codes (#FF6600), MAC addresses, and debugging. A single byte (8 bits) is represented by exactly two hex digits.',
    'Octal (base 8) uses digits 0–7 and was historically important in early computing. Today it is still used for Unix file permissions (chmod 755), some programming language literals (0o755 in JavaScript/Python), and certain embedded systems. Each octal digit represents exactly 3 binary bits.',
    'Decimal (base 10) is the standard human number system using digits 0–9. While computers work in binary internally, most user-facing values are displayed in decimal. This converter helps you quickly move between the human-readable decimal form and the machine-oriented binary, hex, and octal forms that developers encounter daily.',
  ],
};

export const faqItems = [
  {
    question: 'What number bases are supported?',
    answer:
      'This tool supports binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16) — the four most common bases in programming and computer science.',
  },
  {
    question: 'Can I convert negative numbers?',
    answer:
      'Yes. Simply prefix your number with a minus sign (-). The negative sign is preserved across all base conversions.',
  },
  {
    question: 'What is the maximum number I can convert?',
    answer:
      'This tool safely handles integers up to 2^53 - 1 (9,007,199,254,740,991) which is the maximum safe integer in JavaScript. Numbers larger than this may lose precision.',
  },
  {
    question: 'Why is hexadecimal useful for developers?',
    answer:
      'Hexadecimal is a compact representation of binary — each hex digit maps to exactly 4 bits. This makes it ideal for memory addresses, color codes (like #FF6600), byte values, and debugging. It is much shorter than binary while still being easy to convert mentally.',
  },
  {
    question: 'What are common uses for binary numbers?',
    answer:
      'Binary is used in bitwise operations, network subnet masks, file permission flags, hardware registers, and understanding how data is stored at the lowest level. Knowing binary helps debug bit manipulation, understand protocols, and work with embedded systems.',
  },
];
