export const toolInfo = {
  name: 'HTML Minifier',
  description:
    'Minify HTML code by removing whitespace, line breaks, and unnecessary characters. Reduce page size instantly.',
  slug: 'html-minifier',
};

export const relatedTools = [
  { name: 'HTML Formatter', href: '/tools/html-formatter' },
  { name: 'HTML Encoder/Decoder', href: '/tools/html-encoder' },
  { name: 'CSS Minifier', href: '/tools/css-minifier' },
  { name: 'JSON Minifier', href: '/tools/json-minifier' },
];

export const features = [
  'Remove unnecessary whitespace and line breaks from HTML',
  'See original vs minified size and savings percentage',
  'Preserves functionality — no tags or attributes are removed',
  'Works entirely offline — your code never leaves your browser',
  'Copy minified output with one click',
  'Handles large HTML documents',
];

export const howToSteps = [
  'Paste your HTML code into the input field',
  'Click "Minify" to compress the HTML',
  'View the minified output and size savings on the right',
  'Click "Copy" to copy the minified HTML to your clipboard',
];

export const examples = [
  {
    title: 'Minifying a simple page structure',
    input: `<div class="container">
  <h1>Hello World</h1>
  <p>This is a paragraph.</p>
</div>`,
    output: '<div class="container"><h1>Hello World</h1><p>This is a paragraph.</p></div>',
  },
  {
    title: 'Minifying nested elements',
    input: `<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>`,
    output:
      '<nav><ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/contact">Contact</a></li></ul></nav>',
  },
];

export const explanation = {
  title: 'What Is HTML Minification?',
  content: [
    'HTML minification is the process of removing all non-essential characters from HTML source code without altering how the browser renders the page. This includes extra whitespace, line breaks, indentation, and spaces between tags. The result is a compact document that loads faster and consumes less bandwidth.',
    'Every character in an HTML document adds to its file size. While a few extra spaces seem negligible, they add up across entire pages — especially on content-heavy sites. A typical well-formatted HTML page can shrink by 15–30% through minification alone, which translates directly into faster page loads for your visitors.',
    'Minified HTML is particularly important for performance-critical applications: landing pages, e-commerce product pages, and mobile web apps where every millisecond of load time affects conversion rates. Google also considers page speed as a ranking factor, so smaller HTML files can indirectly improve your search rankings.',
    'This tool strips whitespace between tags while preserving the HTML structure and attributes. It does not remove any tags, attributes, or content — your page will render identically before and after minification. For deeper optimization, you can combine HTML minification with CSS and JavaScript minification.',
    'Everything runs in your browser. Your HTML code — whether it contains proprietary templates, client data, or internal markup — is never uploaded to any server. The minification happens instantly using client-side JavaScript, making it safe and private.',
  ],
};

export const faqItems = [
  {
    question: 'Does HTML minification break my page?',
    answer:
      'No. Minification only removes whitespace between tags. All HTML tags, attributes, content, and scripts remain intact. Your page will render exactly the same in the browser.',
  },
  {
    question: 'How much space does HTML minification save?',
    answer:
      'Typically 15–30%, depending on how much indentation and whitespace your original HTML contains. Pages with deeply nested structures and generous formatting save the most.',
  },
  {
    question: 'Should I minify HTML for production?',
    answer:
      'Yes. Minified HTML reduces page size, which improves load times and saves bandwidth. Most build tools and CDNs can handle this automatically, but this tool is useful for quick manual minification or testing.',
  },
  {
    question: 'Does this remove HTML comments?',
    answer:
      'This tool focuses on whitespace removal. HTML comments are preserved. For comment removal, consider combining this with a build-time minification tool in your deployment pipeline.',
  },
  {
    question: 'Is my HTML code sent to a server?',
    answer:
      'No. All processing happens entirely in your browser using JavaScript. Your code never leaves your device.',
  },
];
