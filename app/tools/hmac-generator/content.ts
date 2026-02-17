export const toolInfo = {
  name: 'HMAC Generator',
  description:
    'Generate HMAC-SHA256, HMAC-SHA384, and HMAC-SHA512 message authentication codes with a secret key.',
  slug: 'hmac-generator',
};

export const relatedTools = [
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'JWT Decoder', href: '/tools/jwt-decoder' },
  { name: 'JWT Generator', href: '/tools/jwt-generator' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
];

export const features = [
  'Generate HMAC-SHA256, HMAC-SHA384, and HMAC-SHA512 hashes',
  'Real-time calculation as you type',
  'Uses the secure Web Crypto API',
  'Enter any secret key and message',
  'Copy any HMAC with one click',
  'Works entirely offline — your data never leaves your browser',
];

export const howToSteps = [
  'Enter your message in the message input field',
  'Enter your secret key in the key input field',
  'HMAC hashes are calculated automatically for all algorithms',
  'Click "Copy" to copy any HMAC to your clipboard',
];

export const examples = [
  {
    title: 'HMAC-SHA256',
    input: 'Message: "Hello, World!" | Key: "secret"',
    output: 'dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f',
  },
  {
    title: 'HMAC-SHA512',
    input: 'Message: "Hello, World!" | Key: "secret"',
    output: '8a3a84bcd0d0065e97f175d370447c7d02e00973f7cdcc...',
  },
];

export const explanation = {
  title: 'What Is HMAC?',
  content: [
    'HMAC (Hash-based Message Authentication Code) is a mechanism for calculating a message authentication code using a cryptographic hash function combined with a secret key. It provides both data integrity and authentication — the receiver can verify that the message has not been altered and that it was sent by someone who knows the shared secret key.',
    'Unlike a plain hash (like SHA-256), an HMAC requires a secret key. This means that even if an attacker knows the message, they cannot compute the correct HMAC without the key. This property makes HMAC essential for webhook signature verification, API authentication, JWT signing (HS256/HS384/HS512), and secure token generation.',
    'This tool supports three HMAC algorithms: HMAC-SHA256 (256-bit output), HMAC-SHA384 (384-bit output), and HMAC-SHA512 (512-bit output). HMAC-SHA256 is the most commonly used — it is the algorithm behind JWT HS256 signatures, AWS Signature v4, Stripe webhook verification, and many other authentication systems.',
    'The HMAC computation follows RFC 2104: the key is padded and XORed with inner and outer padding constants, then combined with the message in two rounds of hashing. The Web Crypto API implements this securely in the browser, avoiding any need for custom cryptographic code.',
    'All HMAC calculations happen in your browser using the Web Crypto API. Your secret keys and messages are never transmitted to any server. This makes the tool safe for computing HMACs with production API keys, webhook secrets, and other sensitive credentials.',
  ],
};

export const faqItems = [
  {
    question: 'What is the difference between HMAC and a regular hash?',
    answer:
      'A regular hash (SHA-256) takes only a message as input. HMAC takes both a message and a secret key. This means HMAC proves that the message came from someone who knows the key, while a plain hash only proves the message has not been altered.',
  },
  {
    question: 'Which HMAC algorithm should I use?',
    answer:
      'HMAC-SHA256 is the most common choice and is used by JWT (HS256), AWS, Stripe, and many other services. Use HMAC-SHA512 when you need a longer hash. All three algorithms supported here are considered secure.',
  },
  {
    question: 'Is HMAC-SHA256 the same as JWT HS256?',
    answer:
      'Yes. JWT HS256 uses HMAC-SHA256 to sign the token. The HMAC is computed over the Base64-encoded header and payload, using the shared secret as the key.',
  },
  {
    question: 'Can I use this to verify webhook signatures?',
    answer:
      'Yes. Many services (Stripe, GitHub, Twilio) sign webhook payloads with HMAC-SHA256. You can paste the payload and secret here to compute the expected signature and compare it with the one received.',
  },
  {
    question: 'Is my secret key safe?',
    answer:
      'Yes. All HMAC calculations happen entirely in your browser using the Web Crypto API. Your secret key and message are never sent to any server.',
  },
];
