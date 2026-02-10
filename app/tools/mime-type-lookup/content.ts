export const toolInfo = {
  name: 'MIME Type Lookup',
  description:
    'Look up MIME types by file extension or search by content type. Find the right Content-Type for any file.',
  slug: 'mime-type-lookup',
};

export const relatedTools = [
  { name: 'URL Parser', href: '/tools/url-parser' },
  { name: 'User Agent Parser', href: '/tools/user-agent-parser' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
];

export const features = [
  'Search MIME types by file extension, content type, or description instantly',
  'Filter results by category: Application, Text, Image, Audio, Video, and Font',
  'Covers 80+ common file extensions used in web development and beyond',
  'One-click copy of any MIME type string for use in Content-Type headers',
  'Fully client-side lookup with zero external requests or dependencies',
  'Complete developer reference for HTTP Content-Type and Accept headers',
];

export const howToSteps = [
  'Type a file extension (e.g. .json, .png), MIME type (e.g. image/png), or keyword into the search box',
  'Browse results or narrow them down by selecting a category filter like Image, Audio, or Text',
  'Find the MIME type you need and click "Copy" to copy the full content type string',
  'Use the copied MIME type in your Content-Type headers, server configuration, or upload validation',
  'Clear the search to browse the full reference of all supported MIME types',
];

export const examples = [
  {
    title: 'Search for JSON',
    input: 'json',
    output: '.json → application/json (JSON data)',
  },
  {
    title: 'Search for image types',
    input: 'image',
    output:
      '.png → image/png, .jpg → image/jpeg, .gif → image/gif, .webp → image/webp, .svg → image/svg+xml, and more',
  },
  {
    title: 'Look up by extension',
    input: '.pdf',
    output: '.pdf → application/pdf (PDF document)',
  },
];

export const explanation = {
  title: 'What are MIME Types?',
  content: [
    'MIME types (Multipurpose Internet Mail Extensions) are standardized identifiers that describe the format and nature of a file or data stream. Originally designed for email attachments, MIME types are now fundamental to the web. Every HTTP response includes a Content-Type header with a MIME type that tells the browser how to interpret and render the data it receives.',
    'A MIME type consists of two parts separated by a slash: a type and a subtype. The type indicates the general category (such as text, image, audio, video, or application), while the subtype specifies the exact format. For example, "image/png" tells the browser the content is an image in PNG format, while "application/json" indicates structured JSON data. Some MIME types also include parameters like charset (e.g. "text/html; charset=utf-8").',
    'Web servers rely on MIME types to serve files correctly. When a server sends a CSS file with the wrong Content-Type (say "text/plain" instead of "text/css"), browsers may refuse to apply the styles. Similarly, serving JavaScript with an incorrect MIME type can cause script execution to fail in strict environments. Configuring correct MIME types in your web server (Apache, Nginx, or CDN) is essential for a functioning website.',
    'Developers frequently encounter MIME types when building file upload features, configuring API responses, setting up download endpoints, or working with the Fetch API and XMLHttpRequest. Knowing the right MIME type for each file format helps you set correct Accept and Content-Type headers, validate uploaded files on the client side, and configure static file serving in frameworks like Express, Next.js, or Django.',
    'This tool provides a searchable reference of the most common MIME types used in web development. It covers documents, images, audio, video, fonts, and application formats. All lookups happen instantly in your browser with no server calls, so you can use it as a quick reference anytime you need the correct content type string.',
  ],
};

export const faqItems = [
  {
    question: 'What is the difference between MIME type and Content-Type?',
    answer:
      'They are closely related. A MIME type (like "application/json") describes the media format. The Content-Type is the HTTP header that carries a MIME type along with optional parameters like charset. For example, the Content-Type header might be "text/html; charset=utf-8", where "text/html" is the MIME type and "charset=utf-8" is a parameter.',
  },
  {
    question: 'Why does my browser refuse to load my CSS or JavaScript file?',
    answer:
      'Modern browsers enforce strict MIME type checking. If your server sends a CSS file with a MIME type other than "text/css", or a JavaScript file without "application/javascript" or "text/javascript", the browser will block it. Make sure your web server or CDN is configured to send the correct Content-Type header for each file extension.',
  },
  {
    question: 'What MIME type should I use for JSON API responses?',
    answer:
      'Use "application/json" for all JSON API responses. This is the standard MIME type for JSON data and is required by most HTTP clients and frameworks to properly parse the response. Avoid using "text/plain" or "text/html" for JSON data.',
  },
  {
    question: 'How do I set the correct MIME type on my server?',
    answer:
      'Most web servers and frameworks handle common MIME types automatically. In Nginx, use the "types" directive or include the default mime.types file. In Apache, use the "AddType" directive. In Express.js, the static middleware handles it automatically. For custom endpoints, set the Content-Type header explicitly in your response.',
  },
  {
    question: 'What is application/octet-stream?',
    answer:
      'application/octet-stream is the default MIME type for binary files when the actual type is unknown. It tells the browser to treat the content as raw binary data, which typically triggers a file download. Servers use it as a fallback when they cannot determine the correct MIME type for a file.',
  },
];
