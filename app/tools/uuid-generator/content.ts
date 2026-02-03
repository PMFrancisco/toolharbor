export const toolInfo = {
  name: 'UUID Generator',
  description:
    'Generate random UUIDs (v4) instantly. Free online tool with bulk generation and formatting options.',
  slug: 'uuid-generator',
};

export const relatedTools = [
  { name: 'Timestamp Converter', href: '/tools/timestamp-converter' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
];

export const features = [
  'Generate cryptographically random UUIDs',
  'Bulk generation (up to 100 at once)',
  'Uppercase and no-dashes formatting options',
  'Copy individual or all UUIDs',
  'Works offline using Web Crypto API',
  'RFC 4122 compliant version 4 UUIDs',
];

export const howToSteps = [
  'Select how many UUIDs you need (1 to 100)',
  'Choose formatting options: uppercase or no dashes',
  'Click "Generate" to create new UUIDs',
  'Click "Copy" next to any UUID to copy it',
  'Use "Copy All" to copy all UUIDs at once',
];

export const examples = [
  {
    title: 'Standard UUID v4',
    input: 'Generate 1 UUID',
    output: '550e8400-e29b-41d4-a716-446655440000',
  },
  {
    title: 'Uppercase format',
    input: 'Generate with uppercase option',
    output: '550E8400-E29B-41D4-A716-446655440000',
  },
  {
    title: 'Without dashes',
    input: 'Generate with no-dashes option',
    output: '550e8400e29b41d4a716446655440000',
  },
];

export const explanation = {
  title: 'What is a UUID?',
  content: [
    'A UUID (Universally Unique Identifier), also known as GUID (Globally Unique Identifier), is a 128-bit identifier that is guaranteed to be unique across all space and time. UUIDs are widely used in software development for database primary keys, session identifiers, transaction IDs, and distributed system coordination. This UUID generator creates random identifiers you can use immediately in your projects.',
    'This tool generates version 4 UUIDs, which are created using random or pseudo-random numbers. The format follows RFC 4122: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, where x is any hexadecimal digit and y is one of 8, 9, A, or B. The "4" in the third group indicates version 4, and y indicates the UUID variant. This standardized format is recognized by virtually all programming languages and databases.',
    'UUID v4 uses 122 random bits, providing approximately 5.3 × 10^36 possible unique values. The probability of generating two identical UUIDs is astronomically low — you would need to generate 1 billion UUIDs per second for about 85 years to have a 50% chance of a collision. This makes UUIDs perfect for scenarios where coordination between systems is impractical.',
    'Our UUID generator supports bulk generation of up to 100 UUIDs at once, with options for uppercase formatting and removing dashes. Whether you need a single unique identifier or a batch for seeding a database, this tool handles it instantly. The generated UUIDs are RFC 4122 compliant and suitable for production use.',
    'Modern browsers provide the crypto.randomUUID() method which uses a cryptographically secure random number generator (CSPRNG). This UUID generator leverages that API when available, falling back to a secure alternative for older browsers. All UUIDs are generated entirely in your browser — nothing is sent to any server, ensuring complete privacy.',
  ],
};

export const faqItems = [
  {
    question: 'What is the difference between UUID and GUID?',
    answer:
      'UUID and GUID refer to the same thing - a 128-bit unique identifier. UUID is the term used in the RFC specification and most of the industry, while GUID (Globally Unique Identifier) is the term Microsoft uses. They are interchangeable.',
  },
  {
    question: 'Are these UUIDs truly unique?',
    answer:
      'While not mathematically guaranteed, UUID v4 has such a large random space (122 bits) that collisions are practically impossible. You could generate trillions of UUIDs and still have virtually no chance of duplicates.',
  },
  {
    question: 'Can I use these UUIDs in production?',
    answer:
      'Yes, this tool uses the Web Crypto API which provides cryptographically secure random numbers. The generated UUIDs are suitable for production use in databases, APIs, and applications.',
  },
  {
    question: 'Why use UUIDs instead of auto-increment IDs?',
    answer:
      'UUIDs can be generated without database coordination, making them ideal for distributed systems. They also hide information about record count and creation order, and allow generating IDs on the client before inserting to the database.',
  },
  {
    question: 'What does version 4 mean?',
    answer:
      'UUID version 4 means the identifier is generated using random numbers. Other versions use different methods: v1 uses timestamp and MAC address, v3/v5 use namespace and name hashing. Version 4 is the most commonly used.',
  },
];
