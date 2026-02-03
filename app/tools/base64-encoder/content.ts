export const toolInfo = {
  name: 'Base64 Encoder/Decoder',
  description:
    'Encode text to Base64 or decode Base64 strings instantly. Free online converter with UTF-8 support.',
  slug: 'base64-encoder',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'UUID Generator', href: '/tools/uuid-generator' },
];

export const features = [
  'Encode any text to Base64 format',
  'Decode Base64 back to plain text',
  'Full UTF-8 and Unicode support',
  'Works offline - no server requests',
  'Swap between input and output instantly',
  'Copy results with one click',
];

export const howToSteps = [
  'Select "Encode" or "Decode" mode using the toggle buttons',
  'Paste or type your text in the input field',
  'Click the action button to convert',
  'Copy the result using the Copy button',
  'Use Swap to quickly reverse the operation',
];

export const examples = [
  {
    title: 'Encoding plain text',
    input: 'Hello, World!',
    output: 'SGVsbG8sIFdvcmxkIQ==',
  },
  {
    title: 'Encoding with special characters',
    input: 'User: admin@example.com',
    output: 'VXNlcjogYWRtaW5AZXhhbXBsZS5jb20=',
  },
  {
    title: 'Decoding Base64',
    input: 'VG9vbEhhcmJvciByb2NrcyE=',
    output: 'ToolHarbor rocks!',
  },
];

export const explanation = {
  title: 'What is Base64 Encoding?',
  content: [
    'Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64 ASCII characters. It was designed to safely transmit binary data over systems that only support text, such as email attachments, data URLs, and API payloads. The Base64 encoder converts any input into a safe string that can travel through text-only channels without corruption.',
    'The Base64 alphabet consists of uppercase letters (A-Z), lowercase letters (a-z), digits (0-9), and two additional characters (+ and /). The = character is used for padding when the input length is not divisible by 3. This encoding increases the data size by approximately 33%, but ensures safe transmission across all text-based protocols. URL-safe variants replace + and / with - and _ for use in URLs.',
    'Common use cases for Base64 encoding include embedding images directly in HTML or CSS (data URIs), encoding authentication credentials in HTTP headers (Basic Auth), storing binary data in JSON or XML documents, and transmitting files through APIs that only accept text. Many JWT tokens also use Base64 encoding for their payload sections.',
    'Our Base64 encoder and decoder handles UTF-8 text properly, meaning you can encode and decode text containing special characters, emojis, and characters from any language. Whether you need to encode a simple string or decode a complex payload, this tool processes it instantly.',
    'The encoding and decoding happens entirely in your browser using client-side JavaScript. Your data is never sent to any server, making this Base64 converter safe for sensitive information like passwords, API keys, or personal data. No registration required — just paste, convert, and copy.',
  ],
};

export const faqItems = [
  {
    question: 'What is Base64 encoding used for?',
    answer:
      'Base64 is commonly used to embed binary data (like images) in text formats, encode credentials for HTTP Basic Authentication, transmit data through text-only protocols, and store binary data in JSON or databases that only support text.',
  },
  {
    question: 'Is Base64 encryption?',
    answer:
      'No, Base64 is encoding, not encryption. It transforms data into a different format but provides no security. Anyone can decode Base64 data. For security, use proper encryption algorithms like AES.',
  },
  {
    question: 'Why does Base64 increase file size?',
    answer:
      'Base64 represents 3 bytes of binary data using 4 ASCII characters, resulting in approximately 33% size increase. This is the trade-off for being able to safely transmit binary data as text.',
  },
  {
    question: 'Can I encode images with this tool?',
    answer:
      'This tool is designed for text encoding. For images, you would need to first read the image as binary data. We may add file upload support in a future update.',
  },
  {
    question: 'Why am I getting an error when decoding?',
    answer:
      'Decoding errors usually occur when the input is not valid Base64. Check for extra spaces, line breaks, or invalid characters. Valid Base64 only contains A-Z, a-z, 0-9, +, /, and = (for padding).',
  },
];
