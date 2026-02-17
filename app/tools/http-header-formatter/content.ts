export const toolInfo = {
  name: 'HTTP Header Formatter',
  description: 'Normalize HTTP headers to Title-Case, convert between raw headers and JSON format.',
  slug: 'http-header-formatter',
};

export const relatedTools = [
  { name: 'HTTP Status Code Lookup', href: '/tools/http-status-lookup' },
  { name: 'cURL to Fetch Converter', href: '/tools/curl-to-fetch' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'URL Parser', href: '/tools/url-parser' },
];

export const features = [
  'Normalize header names to standard Title-Case format',
  'Convert raw headers to JSON object',
  'Convert JSON object back to raw headers',
  'Skips HTTP status lines automatically',
  'Works with headers copied from DevTools or curl',
  'Works entirely offline — your headers never leave your browser',
];

export const howToSteps = [
  'Choose a mode: Normalize, To JSON, or From JSON',
  'Paste your headers into the input field',
  'Click "Format" to process the headers',
  'Copy the formatted result from the output panel',
];

export const examples = [
  {
    title: 'Normalizing headers',
    input:
      'content-type: application/json\nauthorization: Bearer token123\ncache-control: no-cache',
    output:
      'Content-Type: application/json\nAuthorization: Bearer token123\nCache-Control: no-cache',
  },
  {
    title: 'Converting to JSON',
    input: 'Content-Type: application/json\nX-Request-Id: abc123',
    output: '{\n  "Content-Type": "application/json",\n  "X-Request-Id": "abc123"\n}',
  },
];

export const explanation = {
  title: 'What Are HTTP Headers?',
  content: [
    'HTTP headers are key-value pairs sent between a client and server as part of every HTTP request and response. They carry metadata about the communication: content type, authentication credentials, caching directives, cookies, and much more. Understanding and working with headers is a fundamental part of web development and API integration.',
    'Headers are case-insensitive by specification (RFC 7230), but they are conventionally written in Title-Case (e.g., Content-Type, Authorization, Cache-Control). When copying headers from different sources — browser DevTools, curl output, server logs — they may use inconsistent casing. This tool normalizes them to the standard format for clean, consistent documentation.',
    'Converting headers to JSON is useful when you need to use them in JavaScript fetch() calls, Postman collections, API testing tools, or configuration files. The JSON format is also easier to programmatically modify, merge, and version-control. Converting from JSON back to raw headers is the reverse operation for when you need the original text format.',
    'The tool automatically skips HTTP status lines (like "HTTP/1.1 200 OK") that often appear when copying from browser DevTools or curl verbose output. It also handles multiple headers with the same name and preserves the original values exactly as they were — only the header names are normalized.',
    'Everything runs in your browser. Your headers — which may contain authorization tokens, cookies, or internal API endpoints — are never sent to any server.',
  ],
};

export const faqItems = [
  {
    question: 'Are HTTP header names case-sensitive?',
    answer:
      'No. According to the HTTP specification (RFC 7230), header field names are case-insensitive. However, Title-Case (e.g., Content-Type) is the standard convention used in documentation and most HTTP libraries.',
  },
  {
    question: 'What format should I paste headers in?',
    answer:
      'Paste headers in the standard "Key: Value" format, one per line. The tool also handles headers copied from browser DevTools or curl output, including HTTP status lines which are automatically skipped.',
  },
  {
    question: 'Does it handle duplicate headers?',
    answer:
      'When normalizing, duplicate headers are preserved. When converting to JSON, later values overwrite earlier ones for the same key (since JSON objects cannot have duplicate keys).',
  },
  {
    question: 'Can I convert JSON back to raw headers?',
    answer:
      'Yes. Use the "From JSON" mode to convert a JSON object of key-value pairs back to raw "Key: Value" header format.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All processing happens entirely in your browser. Your headers and their values never leave your device.',
  },
];
