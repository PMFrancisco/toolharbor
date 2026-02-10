export const toolInfo = {
  name: 'JWT Generator',
  description:
    'Generate and sign JSON Web Tokens (JWT) for testing. Create HS256, HS384, and HS512 tokens instantly in your browser.',
  slug: 'jwt-generator',
};

export const relatedTools = [
  { name: 'JWT Decoder', href: '/tools/jwt-decoder' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'Timestamp Converter', href: '/tools/timestamp-converter' },
];

export const features = [
  'Sign JWTs with HS256, HS384, or HS512 algorithms',
  'Custom payload with any JSON claims',
  'Set your own secret key for signing',
  'Load sample payload with standard claims',
  'Copy generated token with one click',
  'Runs entirely in your browser — no server needed',
];

export const howToSteps = [
  'Select the HMAC algorithm (HS256, HS384, or HS512)',
  'Enter your secret key for signing',
  'Write or paste a JSON payload with your claims',
  'Click "Generate JWT" to create the signed token',
  'Copy the token and use it for testing',
];

export const examples = [
  {
    title: 'Basic user token',
    input:
      '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022,\n  "exp": 1516242622\n}',
    output:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.{signature}',
  },
  {
    title: 'Token with roles',
    input: '{\n  "sub": "user-42",\n  "roles": ["admin", "editor"],\n  "iss": "my-app"\n}',
    output:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTQyIiwicm9sZXMiOlsiYWRtaW4iLCJlZGl0b3IiXSwiaXNzIjoibXktYXBwIn0.{signature}',
  },
  {
    title: 'API service token',
    input: '{\n  "service": "payment-api",\n  "scope": "read write",\n  "exp": 1700000000\n}',
    output:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlIjoicGF5bWVudC1hcGkiLCJzY29wZSI6InJlYWQgd3JpdGUiLCJleHAiOjE3MDAwMDAwMDB9.{signature}',
  },
];

export const explanation = {
  title: 'What is a JWT Generator?',
  content: [
    'A JSON Web Token (JWT) generator creates signed tokens that can be used for testing authentication flows, API authorization, and microservice communication. JWTs are an open standard (RFC 7519) for securely transmitting information between parties as a compact, URL-safe JSON object. This tool lets you generate HMAC-signed tokens directly in your browser.',
    'The generator supports three HMAC algorithms: HS256 (HMAC-SHA256), HS384 (HMAC-SHA384), and HS512 (HMAC-SHA512). HMAC algorithms use a shared secret key to both sign and verify the token. HS256 is by far the most commonly used algorithm for JWTs and provides strong security for most applications. HS384 and HS512 offer longer signatures for additional security margin.',
    'A JWT consists of three parts separated by dots: the header, payload, and signature. The header specifies the algorithm and token type. The payload contains claims — statements about the user or entity and additional metadata. Standard claims include sub (subject), iss (issuer), exp (expiration time), iat (issued at), and aud (audience). You can also include any custom claims your application needs.',
    'This tool uses the Web Crypto API to perform HMAC signing directly in your browser. Your secret key and payload never leave your device. However, this tool is designed for testing and development purposes only. In production, JWT generation should happen server-side where the signing key is securely stored and never exposed to clients.',
    'Common use cases for a JWT generator include testing API endpoints that require authentication, verifying your backend correctly validates and decodes tokens, creating mock tokens for frontend development, and learning how JWTs work by experimenting with different payloads and algorithms.',
  ],
};

export const faqItems = [
  {
    question: 'Is it safe to generate JWTs in the browser?',
    answer:
      'For testing purposes, yes. All signing happens locally using the Web Crypto API — your secret key never leaves your browser. However, never use this for production token generation. In production, JWTs should be signed server-side where the secret key is securely stored.',
  },
  {
    question: 'What is the difference between HS256, HS384, and HS512?',
    answer:
      'All three are HMAC algorithms using different SHA hash functions. HS256 uses SHA-256 (256-bit), HS384 uses SHA-384 (384-bit), and HS512 uses SHA-512 (512-bit). HS256 is the most common and sufficient for most use cases. The higher variants produce longer signatures and provide a larger security margin.',
  },
  {
    question: 'Why should I not use real secrets in this tool?',
    answer:
      'While processing happens locally, client-side code can be inspected. For testing, use a dummy secret. Real signing secrets should only exist on your server, stored securely in environment variables or a secrets manager, never in browser code.',
  },
  {
    question: 'How can I verify the generated token?',
    answer:
      'Use our JWT Decoder tool to inspect the header and payload. To verify the signature, you need the same secret key and algorithm on your server. Libraries like jsonwebtoken (Node.js), PyJWT (Python), or java-jwt (Java) can verify HMAC-signed tokens.',
  },
  {
    question: 'What claims should I include in the payload?',
    answer:
      'At minimum, include "sub" (subject/user ID) and "exp" (expiration time as Unix timestamp). Common claims are "iss" (issuer), "aud" (audience), "iat" (issued at), and "jti" (unique token ID). You can also add custom claims like "roles" or "permissions" specific to your application.',
  },
];
