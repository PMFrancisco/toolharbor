export const toolInfo = {
  name: 'URL Parser',
  description:
    'Parse any URL into its components: protocol, host, path, query parameters, and hash. Inspect URLs instantly.',
  slug: 'url-parser',
};

export const relatedTools = [
  { name: 'Query String Builder', href: '/tools/query-string-builder' },
  { name: 'URL Encoder/Decoder', href: '/tools/url-encoder-decoder' },
  { name: 'Slug Generator', href: '/tools/slug-generator' },
  { name: 'HTML Encoder', href: '/tools/html-encoder' },
];

export const features = [
  'Break any URL into protocol, host, port, path, query, and hash',
  'Display query parameters as a structured key-value table',
  'Copy individual components with one click',
  'Validates URL format with clear error messages',
  'Real-time parsing as you type',
  'Works offline — no server requests',
];

export const howToSteps = [
  'Paste or type a full URL in the input field',
  'The URL is parsed instantly into its components',
  'View query parameters as a structured table',
  'Copy any component using its Copy button',
  'Try different URLs to inspect their structure',
];

export const examples = [
  {
    title: 'Full URL with query params',
    input: 'https://example.com/search?q=hello+world&lang=en&page=2#results',
    output:
      'Protocol: https: | Host: example.com | Path: /search | Params: q, lang, page | Hash: #results',
  },
  {
    title: 'URL with port',
    input: 'http://localhost:3000/api/users?limit=10',
    output:
      'Protocol: http: | Host: localhost:3000 | Port: 3000 | Path: /api/users | Params: limit',
  },
];

export const explanation = {
  title: 'What Is a URL Parser?',
  content: [
    'A URL (Uniform Resource Locator) is made up of several distinct parts: the protocol (http, https), the hostname (example.com), an optional port number, the pathname (/page/subpage), a query string (?key=value&key2=value2), and a fragment or hash (#section). A URL parser breaks a URL down into these individual components so you can inspect, debug, or modify them.',
    'Query parameters are the key-value pairs after the ? in a URL. They are used to pass data to the server — search terms, pagination, filters, tracking codes, and more. This tool extracts each parameter and displays it in a clean table with the key and decoded value, making it easy to understand what data a URL is carrying.',
    'Developers frequently need to parse URLs when debugging API calls, analyzing tracking links, inspecting redirect chains, or building integrations. Instead of manually splitting strings or writing code, this tool gives you an instant visual breakdown of any URL you paste.',
    "The parser uses the browser's built-in URL API, which follows the WHATWG URL Standard. This ensures accurate parsing of edge cases like encoded characters, IPv6 addresses, usernames in URLs, and complex query strings with repeated keys.",
    'Everything runs in your browser. Your URLs are never sent to a server, making this tool safe for inspecting internal API endpoints, staging URLs, or links containing authentication tokens.',
  ],
};

export const faqItems = [
  {
    question: 'What URL formats are supported?',
    answer:
      'Any valid URL with a protocol (http://, https://, ftp://, etc.) is supported. URLs without a protocol will show an error — add https:// to the beginning.',
  },
  {
    question: 'Does it decode URL-encoded characters?',
    answer:
      'Yes. Query parameter values are automatically decoded. For example, %20 is shown as a space and %26 is shown as &.',
  },
  {
    question: 'Can it handle URLs with multiple values for the same key?',
    answer:
      'Yes. If a URL has repeated keys (like ?tag=a&tag=b), each occurrence is shown as a separate row in the parameters table.',
  },
  {
    question: 'Why am I getting an "invalid URL" error?',
    answer:
      'Make sure your URL includes a protocol (https://). The parser follows the WHATWG URL Standard, which requires a protocol to be present.',
  },
  {
    question: 'Is my URL sent to a server?',
    answer:
      'No. All parsing happens in your browser using the native URL API. Your URL never leaves your device.',
  },
];
