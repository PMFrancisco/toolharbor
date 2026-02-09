export const toolInfo = {
  name: 'Query String Builder',
  description:
    'Build URL query strings from key-value pairs or parse existing query strings into editable parameters.',
  slug: 'query-string-builder',
};

export const relatedTools = [
  { name: 'URL Parser', href: '/tools/url-parser' },
  { name: 'URL Encoder/Decoder', href: '/tools/url-encoder-decoder' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
];

export const features = [
  'Build query strings from key-value pairs visually',
  'Parse existing URLs or query strings into editable rows',
  'Add, remove, and reorder parameters easily',
  'Automatically encodes special characters',
  'Combine with a base URL for a complete link',
  'Copy the generated URL with one click',
];

export const howToSteps = [
  'Optionally enter a base URL (e.g. https://api.example.com/search)',
  'Add key-value pairs using the parameter rows',
  'Click "+ Add Parameter" to add more rows',
  'The generated URL updates in real time',
  'Or paste an existing URL and click "Parse URL" to import its parameters',
];

export const examples = [
  {
    title: 'API search query',
    input: 'Base: https://api.example.com/search | q=hello world, lang=en, page=2',
    output: 'https://api.example.com/search?q=hello+world&lang=en&page=2',
  },
  {
    title: 'Tracking link',
    input:
      'Base: https://example.com/landing | utm_source=google, utm_medium=cpc, utm_campaign=spring',
    output: 'https://example.com/landing?utm_source=google&utm_medium=cpc&utm_campaign=spring',
  },
];

export const explanation = {
  title: 'What Is a Query String?',
  content: [
    'A query string is the part of a URL that comes after the question mark (?). It contains key-value pairs separated by ampersands (&), like ?name=John&age=30. Query strings are used to pass data to web servers — search queries, filters, pagination, tracking codes, and API parameters all use this format.',
    'This tool lets you build query strings visually instead of typing them manually. Add key-value pairs using the form, enter a base URL, and the tool generates the complete URL with properly encoded parameters. Special characters like spaces, ampersands, and equals signs are automatically encoded so the URL works correctly.',
    'You can also work in reverse — paste an existing URL and the tool will parse its query parameters into editable rows. This is useful when you need to modify a complex URL, add new parameters, or understand what an existing link is passing to the server.',
    'URL encoding (also called percent-encoding) is applied automatically. A space becomes +, an ampersand becomes %26, and other special characters are converted to their percent-encoded equivalents. This ensures the generated URL is valid and safe to use in browsers, API calls, and redirects.',
    'Everything runs in your browser. Your URLs and parameters are never sent to a server, making this tool safe for building API calls with authentication tokens, internal URLs, and sensitive query parameters.',
  ],
};

export const faqItems = [
  {
    question: 'Do I need to enter a base URL?',
    answer:
      'No. If you only need the query string portion (?key=value&key2=value2), leave the base URL empty. The tool will generate just the query string.',
  },
  {
    question: 'Are special characters encoded automatically?',
    answer:
      'Yes. The tool uses the standard URLSearchParams API to encode values. Spaces become +, and special characters like & = ? are percent-encoded automatically.',
  },
  {
    question: 'Can I parse an existing URL?',
    answer:
      'Yes. Paste a URL with query parameters into the base URL field and click "Parse URL". The tool will extract the parameters into editable rows.',
  },
  {
    question: 'How do I add empty parameters?',
    answer:
      'Add a row with a key but leave the value empty. The parameter will appear in the URL as key= (with an empty value).',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All query string building and parsing happens in your browser using client-side JavaScript. Your data never leaves your device.',
  },
];
