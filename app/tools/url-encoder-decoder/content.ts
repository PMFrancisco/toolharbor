export const toolInfo = {
  name: 'URL Encoder/Decoder',
  description:
    'Encode and decode URLs and query strings. Convert special characters to percent-encoded format and back.',
  slug: 'url-encoder-decoder',
};

export const relatedTools = [
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'Regex Tester', href: '/tools/regex-tester' },
];

export const features = [
  'Encode special characters for URLs',
  'Decode percent-encoded strings',
  'Full URL encoding (preserves structure)',
  'Component encoding (encodes everything)',
  'Parse URLs into components',
  'Works offline - no data sent to servers',
];

export const howToSteps = [
  'Paste your URL or text in the input field',
  'Choose between Encode or Decode',
  'Select encoding type (Component or Full URL)',
  'View the encoded/decoded result instantly',
  'Copy the result to your clipboard',
];

export const examples = [
  {
    title: 'Encode query parameter',
    input: 'Hello World! How are you?',
    output: 'Hello%20World!%20How%20are%20you%3F',
  },
  {
    title: 'Decode URL',
    input: 'https%3A%2F%2Fexample.com%2Fpath%3Fq%3Dhello%20world',
    output: 'https://example.com/path?q=hello world',
  },
  {
    title: 'Encode special characters',
    input: 'name=John Doe&city=New York',
    output: 'name%3DJohn%20Doe%26city%3DNew%20York',
  },
];

export const explanation = {
  title: 'What is URL Encoding?',
  content: [
    'URL encoding (also called percent-encoding) is a mechanism for encoding special characters in URLs and query strings. URLs can only contain a limited set of characters from the ASCII character set. Characters outside this set, or characters with special meaning in URLs (like & or =), must be encoded to be transmitted safely.',
    'When a character is URL encoded, it is replaced with a percent sign (%) followed by two hexadecimal digits representing the ASCII code of the character. For example, a space becomes %20, and an ampersand becomes %26. This allows any character to be safely included in a URL without breaking its structure.',
    'There are two types of URL encoding. Component encoding (encodeURIComponent) encodes all special characters including those with URL meaning like / and ?. This is used for query string values. Full URL encoding (encodeURI) preserves the URL structure, only encoding characters that are invalid in any part of a URL.',
    'URL encoding is essential when building URLs programmatically, especially when including user input in query strings. Without proper encoding, special characters can break URLs or create security vulnerabilities like URL injection. It is also needed when transmitting data via GET requests or when working with APIs.',
    'This tool handles both encoding and decoding, with options for both component and full URL modes. All processing happens locally in your browser, making it safe to use with sensitive URLs containing authentication tokens or personal data. The tool works offline and has no character limits.',
  ],
};

export const faqItems = [
  {
    question: 'What is the difference between encodeURI and encodeURIComponent?',
    answer:
      'encodeURI (Full URL) preserves URL structure characters like /, ?, #, and &. encodeURIComponent (Component) encodes everything except alphanumerics and - _ . ~. Use Component for query values, Full URL for complete URLs.',
  },
  {
    question: 'Why is my space encoded as %20 sometimes and + other times?',
    answer:
      'Both are valid. %20 is standard URL encoding. The + sign is specifically for application/x-www-form-urlencoded format (HTML forms). Modern APIs typically expect %20.',
  },
  {
    question: 'What characters need to be URL encoded?',
    answer:
      'Reserved characters (: / ? # [ ] @ ! $ & \' ( ) * + , ; =), unsafe characters (space < > { } | \\ ^ ~ ` "), and non-ASCII characters (like é or 中) all need encoding.',
  },
  {
    question: 'Can I encode/decode entire URLs safely?',
    answer:
      'Use Full URL mode for complete URLs to preserve the structure. Component mode will encode the slashes and colons, breaking the URL. Always use Component mode for individual query parameter values.',
  },
  {
    question: 'Is URL encoding the same as Base64?',
    answer:
      'No. URL encoding converts special characters to %XX format for safe URL transmission. Base64 converts binary data to ASCII text. They serve different purposes, though both are used for data encoding.',
  },
];
