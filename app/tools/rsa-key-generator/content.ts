export const toolInfo = {
  name: 'RSA Key Pair Generator',
  description:
    'Generate RSA public/private key pairs in PEM format using Web Crypto API. Choose 2048 or 4096 bit keys.',
  slug: 'rsa-key-generator',
};

export const relatedTools = [
  { name: 'HMAC Generator', href: '/tools/hmac-generator' },
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'JWT Decoder', href: '/tools/jwt-decoder' },
  { name: 'Password Generator', href: '/tools/password-generator' },
];

export const features = [
  'Generate 2048-bit or 4096-bit RSA key pairs',
  'Output in standard PEM format (PKCS#8 private, SPKI public)',
  'Uses Web Crypto API — cryptographically secure',
  'Keys never leave your browser (no server involved)',
  'Copy public or private key with one click',
  'Download keys as .pem files',
];

export const howToSteps = [
  'Select the key size: 2048 or 4096 bits',
  'Click "Generate Key Pair" to create a new RSA key pair',
  'Copy the public or private key using the Copy button',
  'Optionally download the keys as PEM files',
  'Generate again for a completely new key pair',
];

export const examples = [
  {
    title: 'RSA 2048-bit key pair',
    input: 'Key size: 2048 bits',
    output: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqh...\n-----END PUBLIC KEY-----',
  },
  {
    title: 'RSA 4096-bit key pair',
    input: 'Key size: 4096 bits',
    output: '-----BEGIN PRIVATE KEY-----\nMIIJQgIBADANBg...\n-----END PRIVATE KEY-----',
  },
];

export const explanation = {
  title: 'What Is RSA Key Pair Generation?',
  content: [
    'RSA (Rivest-Shamir-Adleman) is one of the most widely used public-key cryptographic algorithms. It uses a pair of mathematically related keys: a public key for encryption and a private key for decryption. The security of RSA relies on the computational difficulty of factoring the product of two large prime numbers.',
    'Key pairs are essential for many security protocols: TLS/SSL certificates, SSH authentication, digital signatures, JWT signing, and encrypted communication. The public key can be freely shared, while the private key must be kept secret. Data encrypted with the public key can only be decrypted with the corresponding private key, and vice versa.',
    'This tool generates RSA keys using the Web Crypto API built into modern browsers. The keys are exported in PEM format — the standard Base64-encoded representation with BEGIN/END markers. The public key uses SPKI (Subject Public Key Info) format, and the private key uses PKCS#8 format, both compatible with OpenSSL and most cryptographic libraries.',
    'A 2048-bit key provides strong security and is the minimum recommended for most applications today. A 4096-bit key offers additional security margin at the cost of slower operations (key generation, encryption, decryption). For most use cases, 2048 bits is sufficient. Choose 4096 bits if you need long-term security or compliance with strict security requirements.',
    'Important: The keys are generated entirely in your browser using the Web Crypto API. The private key never leaves your device — it is not transmitted to any server. However, for production use, consider generating keys in a controlled environment and storing private keys securely (e.g., hardware security modules or encrypted key stores).',
  ],
};

export const faqItems = [
  {
    question: 'Is it safe to generate keys in the browser?',
    answer:
      'Yes. The Web Crypto API uses a cryptographically secure random number generator and performs all operations locally. The private key never leaves your browser. For production systems, consider generating keys in a controlled server environment.',
  },
  {
    question: 'Should I use 2048 or 4096 bits?',
    answer:
      '2048-bit keys are considered secure through 2030+ and are the standard minimum. 4096-bit keys provide an extra security margin but are slower to generate and use. Choose 4096 for long-lived keys or strict compliance requirements.',
  },
  {
    question: 'What format are the keys in?',
    answer:
      'Keys are exported in PEM format: the public key in SPKI (Subject Public Key Info) format and the private key in PKCS#8 format. Both are Base64-encoded and compatible with OpenSSL, Node.js, and most cryptographic libraries.',
  },
  {
    question: 'Can I use these keys for SSH?',
    answer:
      'The generated keys are in PEM/PKCS#8 format, which differs from OpenSSH format. You can convert them using ssh-keygen: `ssh-keygen -f private.pem -e -m pem`. For SSH, consider generating keys directly with ssh-keygen.',
  },
  {
    question: 'Are the keys truly random?',
    answer:
      "Yes. The Web Crypto API uses the browser's built-in cryptographically secure pseudo-random number generator (CSPRNG), which is seeded from system entropy sources.",
  },
];
