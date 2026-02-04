export const toolInfo = {
  name: 'Hash Generator',
  description:
    'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly. Free online hash calculator for developers.',
  slug: 'hash-generator',
};

export const relatedTools = [
  { name: 'UUID Generator', href: '/tools/uuid-generator' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
  { name: 'JWT Decoder', href: '/tools/jwt-decoder' },
];

export const features = [
  'Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes',
  'Real-time hash calculation as you type',
  'View all hash algorithms at once',
  'Copy any hash with one click',
  'Works entirely offline in your browser',
  'Uses secure Web Crypto API for SHA algorithms',
];

export const howToSteps = [
  'Enter or paste your text in the input field',
  'Select a specific algorithm or view all hashes',
  'Hash is calculated automatically as you type',
  'Click "Copy" to copy the hash to clipboard',
  'Use "Clear" to reset and start over',
];

export const examples = [
  {
    title: 'MD5 Hash',
    input: 'Hello, World!',
    output: '65a8e27d8879283831b664bd8b7f0ad4',
  },
  {
    title: 'SHA-256 Hash',
    input: 'Hello, World!',
    output: 'dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f',
  },
  {
    title: 'SHA-512 Hash',
    input: 'Hello, World!',
    output:
      '374d794a95cdcfd8b35993185fef9ba368f160d8daf432d08ba9f1ed1e5abe6cc69291e0fa2fe0006a52570ef18c19def4e617c33ce52ef0a6e5fbe318cb0387',
  },
];

export const explanation = {
  title: 'What is a Hash Function?',
  content: [
    'A cryptographic hash function is a mathematical algorithm that maps data of arbitrary size to a fixed-size bit string. The output, called a hash or digest, acts as a unique fingerprint of the input data. Hash functions are fundamental to modern computing, used for data integrity verification, password storage, digital signatures, and blockchain technology.',
    'This tool supports five popular hash algorithms: MD5 (128-bit), SHA-1 (160-bit), SHA-256 (256-bit), SHA-384 (384-bit), and SHA-512 (512-bit). SHA-256 and SHA-512 are part of the SHA-2 family, designed by the NSA, and are considered cryptographically secure for most applications. MD5 and SHA-1, while still widely used for checksums, are no longer recommended for security purposes.',
    'Hash functions have several key properties: they are deterministic (same input always produces the same output), fast to compute, irreversible (you cannot derive the original input from the hash), and collision-resistant (extremely unlikely for two different inputs to produce the same hash). These properties make them ideal for verifying file integrity and storing passwords securely.',
    'Common use cases include: verifying downloaded files match the original (checksum), storing password hashes instead of plain text, creating digital signatures, generating unique identifiers, and building data structures like hash tables. When you download software, the provided SHA-256 hash lets you verify the file was not corrupted or tampered with.',
    'Our hash generator runs entirely in your browser using the Web Crypto API for SHA algorithms, ensuring your data never leaves your device. The MD5 implementation is included for legacy compatibility, as many systems still use MD5 checksums. For security-sensitive applications, we recommend using SHA-256 or SHA-512.',
  ],
};

export const faqItems = [
  {
    question: 'Which hash algorithm should I use?',
    answer:
      'For security purposes (passwords, signatures), use SHA-256 or SHA-512. For simple checksums and non-security file verification, MD5 or SHA-1 are faster but less secure. SHA-256 offers a good balance of security and performance for most use cases.',
  },
  {
    question: 'Is MD5 still safe to use?',
    answer:
      'MD5 should not be used for security purposes as it has known collision vulnerabilities. However, it remains useful for non-cryptographic purposes like checksums, cache keys, and detecting accidental file corruption. For security, use SHA-256 or higher.',
  },
  {
    question: 'Can I reverse a hash to get the original text?',
    answer:
      'No, cryptographic hash functions are designed to be one-way. You cannot mathematically reverse a hash. However, common passwords can be looked up in "rainbow tables" of precomputed hashes, which is why passwords should be salted before hashing.',
  },
  {
    question: 'Why do different texts sometimes produce similar-looking hashes?',
    answer:
      'They do not - even a single character change produces a completely different hash (this is called the avalanche effect). Hashes may appear similar because they use the same hexadecimal characters (0-9, a-f), but the actual values are entirely different.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No, all hash calculations happen entirely in your browser using the Web Crypto API. Your text never leaves your device, making this tool safe for sensitive data.',
  },
];
