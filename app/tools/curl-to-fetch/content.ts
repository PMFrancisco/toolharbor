export const toolInfo = {
  name: 'cURL to Fetch Converter',
  description:
    'Convert curl commands to JavaScript fetch() code. Parses headers, body, method, and auth automatically.',
  slug: 'curl-to-fetch',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'URL Encoder/Decoder', href: '/tools/url-encoder-decoder' },
  { name: 'HTTP Status Code Lookup', href: '/tools/http-status-lookup' },
  { name: 'JSON to TypeScript', href: '/tools/json-to-typescript' },
];

export const features = [
  'Convert curl commands to modern JavaScript fetch() code',
  'Parses headers (-H), method (-X), data (-d), and basic auth (-u)',
  'Handles multiline curl commands with line continuations',
  'Auto-detects JSON bodies and wraps them in JSON.stringify()',
  'Works entirely offline — your commands never leave your browser',
  'Copy the generated fetch code with one click',
];

export const howToSteps = [
  'Paste your curl command into the input field',
  'Click "Convert" to generate JavaScript fetch code',
  'View the generated code on the right panel',
  'Click "Copy" to copy the fetch code to your clipboard',
];

export const examples = [
  {
    title: 'Simple GET request',
    input: 'curl https://api.example.com/users',
    output: `const response = await fetch("https://api.example.com/users");
const data = await response.json();`,
  },
  {
    title: 'POST with JSON body',
    input: `curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John","email":"john@example.com"}'`,
    output: `const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({"name":"John","email":"john@example.com"}),
});

const data = await response.json();`,
  },
];

export const explanation = {
  title: 'Why Convert cURL to Fetch?',
  content: [
    'cURL is the universal command-line tool for making HTTP requests. It is available on virtually every operating system and is the default way API documentation shows example requests. But when you need to integrate those API calls into a JavaScript application, you need to translate the curl syntax into fetch() code — which is where this tool saves you time.',
    'The JavaScript Fetch API is the modern standard for making HTTP requests in browsers and Node.js. It uses Promises, supports streaming, and integrates naturally with async/await. Converting from curl to fetch manually is tedious because you need to restructure headers from -H flags into an object, parse the -d body, map the -X method, and handle authentication differently.',
    'This tool parses the curl command structure automatically: it extracts the URL, HTTP method (-X), headers (-H), request body (-d, --data, --data-raw), and basic authentication (-u). It also handles common curl flags like --compressed, -L (follow redirects), and -k (insecure) — which have no fetch equivalent but should not block the conversion.',
    'JSON bodies are automatically detected and wrapped in JSON.stringify() for clean output. Multiline curl commands with backslash continuations are normalized before parsing. The generated code uses modern async/await syntax with proper formatting that you can paste directly into your project.',
    'Everything runs in your browser. Your curl commands — which may contain API keys, auth tokens, or internal endpoints — are never sent to any server. The parsing happens entirely in client-side JavaScript.',
  ],
};

export const faqItems = [
  {
    question: 'What curl flags are supported?',
    answer:
      'The converter supports -X (method), -H (headers), -d/--data/--data-raw (body), -u (basic auth), and common no-op flags like -k, -s, -L, -v, and --compressed. Unsupported flags are silently skipped.',
  },
  {
    question: 'Does it handle multiline curl commands?',
    answer:
      'Yes. Backslash line continuations (\\) are automatically joined before parsing. You can paste curl commands copied directly from terminal or documentation.',
  },
  {
    question: 'What about authentication?',
    answer:
      'Basic auth (-u user:password) is converted to an Authorization header with Base64 encoding. Bearer tokens passed via -H are preserved as-is.',
  },
  {
    question: 'Does the generated code work in both browser and Node.js?',
    answer:
      'Yes. The Fetch API is available in all modern browsers and Node.js 18+. The generated code uses standard async/await syntax.',
  },
  {
    question: 'Is my curl command sent to a server?',
    answer:
      'No. All parsing happens entirely in your browser. Your curl commands and any credentials they contain never leave your device.',
  },
];
