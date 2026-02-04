export const toolInfo = {
  name: 'JWT Decoder',
  description:
    'Decode and inspect JSON Web Tokens (JWT) instantly. View header, payload, and signature without verification.',
  slug: 'jwt-decoder',
};

export const relatedTools = [
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'Timestamp Converter', href: '/tools/timestamp-converter' },
];

export const features = [
  'Decode JWT header and payload instantly',
  'View expiration and issued-at timestamps',
  'Check if token is expired',
  'Display all claims in formatted JSON',
  'Copy decoded sections with one click',
  'Works offline - your tokens stay private',
];

export const howToSteps = [
  'Paste your JWT token in the input field',
  'View the decoded header showing algorithm and type',
  'Inspect the payload with all claims formatted',
  'Check expiration status and timestamps',
  'Copy any section to your clipboard',
];

export const examples = [
  {
    title: 'Standard JWT structure',
    input:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    output:
      'Header: { "alg": "HS256", "typ": "JWT" }\nPayload: { "sub": "1234567890", "name": "John Doe", "iat": 1516239022 }',
  },
  {
    title: 'Token with expiration',
    input: 'A JWT with exp claim shows expiration status',
    output: 'Expires: 2024-12-31 23:59:59\nStatus: Valid (not expired)',
  },
];

export const explanation = {
  title: 'What is a JWT Decoder?',
  content: [
    'JSON Web Tokens (JWT) are a compact, URL-safe way to represent claims between two parties. They are widely used for authentication and information exchange in web applications. A JWT consists of three parts: a header, a payload, and a signature, each encoded in Base64URL format and separated by dots.',
    'The header typically contains the token type (JWT) and the signing algorithm (like HS256 or RS256). The payload contains claims - statements about the user and additional metadata. Standard claims include iss (issuer), sub (subject), exp (expiration), iat (issued at), and custom claims specific to your application.',
    'A JWT decoder parses the token and displays its contents in a readable format. This is useful for debugging authentication issues, inspecting token claims, and understanding what data your tokens contain. Note that decoding is different from verification - anyone can decode a JWT, but only the server with the secret key can verify its authenticity.',
    'Our JWT decoder extracts and formats the header and payload as JSON, making it easy to read the claims. It also interprets timestamp claims like exp and iat, converting Unix timestamps to human-readable dates. The tool shows whether the token has expired based on the current time.',
    'Since JWTs often contain sensitive information like user IDs, roles, and permissions, privacy is important. This decoder runs entirely in your browser - your tokens are never sent to any server. This makes it safe to decode production tokens without risk of exposure.',
  ],
};

export const faqItems = [
  {
    question: 'Does this tool verify JWT signatures?',
    answer:
      'No, this tool only decodes and displays the JWT contents. Signature verification requires the secret key or public key, which should never be shared with client-side tools. Use your backend to verify token authenticity.',
  },
  {
    question: 'Is it safe to paste my JWT here?',
    answer:
      'Yes. All processing happens locally in your browser. Your token is never sent to any server. You can even use this tool offline. However, never share JWTs in public places like chat or code repositories.',
  },
  {
    question: 'What do the standard JWT claims mean?',
    answer:
      'iss (issuer) identifies who issued the token. sub (subject) identifies the user. exp (expiration) is when the token expires. iat (issued at) is when it was created. aud (audience) identifies the intended recipient.',
  },
  {
    question: 'Why does my JWT show as expired?',
    answer:
      'The exp claim is compared to your current local time. If exp is in the past, the token is expired. Make sure your computer clock is accurate. Servers may also have a small grace period for clock skew.',
  },
  {
    question: 'Can I decode tokens from any provider?',
    answer:
      "Yes, as long as it's a valid JWT format (three Base64URL-encoded segments separated by dots). This includes tokens from Auth0, Firebase, AWS Cognito, Okta, and custom implementations.",
  },
];
