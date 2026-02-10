export const toolInfo = {
  name: 'HTTP Status Code Lookup',
  description:
    'Look up any HTTP status code. Search by code number or name to see descriptions and categories.',
  slug: 'http-status-lookup',
};

export const relatedTools = [
  { name: 'URL Parser', href: '/tools/url-parser' },
  { name: 'User Agent Parser', href: '/tools/user-agent-parser' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'JWT Decoder', href: '/tools/jwt-decoder' },
];

export const features = [
  'Complete reference of all standard HTTP status codes from 100 to 511',
  'Instant search by code number, name, or description keyword',
  'Filter by category: Informational, Success, Redirection, Client Error, Server Error',
  'Clear descriptions explaining when and why each status code is used',
  'Color-coded category badges for quick visual identification',
  'Works entirely in your browser with zero external requests',
];

export const howToSteps = [
  'Type a status code number (e.g. 404), name (e.g. "Not Found"), or keyword into the search box',
  'Use the category filter buttons to narrow results to 1xx, 2xx, 3xx, 4xx, or 5xx codes',
  'Browse the filtered list to find the status code you need',
  'Read the description to understand when the status code is used and what it means',
  'Combine search and category filters to quickly find exactly what you need',
];

export const examples = [
  {
    title: 'Search by code number',
    input: '404',
    output:
      '404 Not Found — The server cannot find the requested resource. The URL is not recognized or the resource does not exist.',
  },
  {
    title: 'Search by name keyword',
    input: 'timeout',
    output:
      '408 Request Timeout — The server timed out waiting for the request from the client.\n504 Gateway Timeout — The server is acting as a gateway and did not get a response in time.',
  },
  {
    title: 'Filter by category',
    input: '2xx (Success)',
    output: '200 OK, 201 Created, 202 Accepted, 204 No Content, 206 Partial Content, and more.',
  },
];

export const explanation = {
  title: 'What are HTTP Status Codes?',
  content: [
    'HTTP status codes are three-digit numbers returned by a web server in response to a client request. They are part of the HTTP protocol and indicate whether a request was successful, redirected, or resulted in an error. Every time your browser loads a page, makes an API call, or fetches a resource, the server responds with one of these codes along with the actual content.',
    'Status codes are grouped into five categories based on their first digit. 1xx codes are informational and indicate the request was received and processing continues. 2xx codes signal success — the most common being 200 OK. 3xx codes handle redirection, telling the client to look elsewhere for the resource. 4xx codes represent client errors like the famous 404 Not Found, meaning the request itself was problematic. 5xx codes indicate server errors where the server failed to fulfill a valid request.',
    'For developers building REST APIs, choosing the right status code is critical for clear communication between client and server. Returning a 201 Created after a successful POST, a 204 No Content after a DELETE, or a 422 Unprocessable Entity for validation errors makes your API predictable and self-documenting. Incorrect status codes lead to confusion, broken error handling, and poor developer experience for API consumers.',
    'HTTP status codes also play an important role in debugging and monitoring. When a website goes down, a 502 Bad Gateway or 503 Service Unavailable tells the operations team exactly where the problem lies. Rate limiting returns 429 Too Many Requests to protect servers from abuse. Understanding these codes helps developers diagnose issues faster and build more resilient applications.',
    'This tool provides a complete reference of all standard HTTP status codes defined in RFC 7231, RFC 6585, RFC 4918 (WebDAV), and other specifications. Use the search and filter features to quickly find any code and understand its meaning, whether you are building an API, debugging a production issue, or studying the HTTP protocol.',
  ],
};

export const faqItems = [
  {
    question: 'What is the difference between 401 and 403?',
    answer:
      '401 Unauthorized means the request lacks valid authentication credentials — the server does not know who you are. 403 Forbidden means the server knows your identity but you do not have permission to access the resource. In short, 401 is "who are you?" and 403 is "you can\'t do that."',
  },
  {
    question: 'When should I use 404 vs 410?',
    answer:
      '404 Not Found means the resource does not exist or the URL is wrong, but it might exist in the future. 410 Gone means the resource existed before but has been permanently deleted with no forwarding address. Use 410 when you want search engines to remove the page from their index.',
  },
  {
    question: "What does 418 I'm a Teapot mean?",
    answer:
      '418 is an April Fools joke defined in RFC 2324, the "Hyper Text Coffee Pot Control Protocol." It was never intended for real use, but it has become a beloved Easter egg in the developer community. Some APIs use it humorously to reject nonsensical requests.',
  },
  {
    question: 'What is the most common HTTP status code?',
    answer:
      '200 OK is by far the most common status code. It indicates that the request succeeded and the server is returning the requested content. For web pages, API responses, and static assets, 200 is the standard success response.',
  },
  {
    question: 'Why do I see 502 Bad Gateway errors?',
    answer:
      'A 502 Bad Gateway error means a server acting as a gateway or proxy received an invalid response from the upstream server. This commonly happens when a reverse proxy like Nginx cannot reach the application server behind it, often due to the app crashing, restarting, or being overloaded.',
  },
];
