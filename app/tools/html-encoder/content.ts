export const toolInfo = {
  name: 'HTML Encoder/Decoder',
  description:
    'Encode special characters to HTML entities or decode entities back to text. Prevent XSS and display HTML safely.',
  slug: 'html-encoder',
};

export const relatedTools = [
  { name: 'URL Encoder/Decoder', href: '/tools/url-encoder-decoder' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
  { name: 'Markdown Preview', href: '/tools/markdown-preview' },
  { name: 'Color Converter', href: '/tools/color-converter' },
];

export const features = [
  'Encode special characters to HTML entities',
  'Decode HTML entities back to readable text',
  'Handles named, decimal, and hexadecimal entities',
  'Prevents XSS by escaping dangerous characters',
  'Swap between input and output instantly',
  'Works offline — no server requests',
];

export const howToSteps = [
  'Select "Encode" or "Decode" mode',
  'Paste or type your text in the input field',
  'The converted result appears instantly',
  'Copy the result using the Copy button',
  'Use Swap to quickly reverse the operation',
];

export const examples = [
  {
    title: 'Encoding HTML tags',
    input: '<div class="alert">Hello & welcome!</div>',
    output: '&lt;div class=&quot;alert&quot;&gt;Hello &amp; welcome!&lt;&#x2F;div&gt;',
  },
  {
    title: 'Encoding special characters',
    input: "5 > 3 && 2 < 4 | it's true",
    output: '5 &gt; 3 &amp;&amp; 2 &lt; 4 | it&#39;s true',
  },
  {
    title: 'Decoding entities',
    input: '&lt;p&gt;Hello &amp; welcome&lt;/p&gt;',
    output: '<p>Hello & welcome</p>',
  },
];

export const explanation = {
  title: 'What Is HTML Encoding?',
  content: [
    'HTML encoding converts special characters into their corresponding HTML entities. Characters like <, >, &, and " have special meaning in HTML — they define tags, attributes, and entities. If you include these characters directly in your HTML, the browser will interpret them as markup instead of displaying them as text.',
    'The most common HTML entities are &lt; for <, &gt; for >, &amp; for &, and &quot; for double quotes. These are called named entities. HTML also supports decimal entities (&#60; for <) and hexadecimal entities (&#x3C; for <). This tool handles all three formats when decoding.',
    'HTML encoding is critical for security. Cross-site scripting (XSS) attacks work by injecting malicious HTML or JavaScript into web pages. By encoding user input before displaying it, you prevent browsers from executing injected code. Every web framework includes HTML encoding for this reason.',
    'Common use cases include displaying code snippets in blog posts, safely rendering user-generated content, preparing text for HTML emails, and escaping strings for use in HTML attributes. This tool encodes the six most dangerous characters: < > & " \' / and `.',
    'All encoding and decoding runs in your browser. Your text is never sent to a server, making this tool safe for sensitive content like code snippets with API keys or private HTML templates.',
  ],
};

export const faqItems = [
  {
    question: 'What characters get encoded?',
    answer:
      'The encoder converts these characters to entities: < (&lt;), > (&gt;), & (&amp;), " (&quot;), \' (&#39;), / (&#x2F;), and ` (&#96;). These are the characters that can break HTML or enable XSS attacks.',
  },
  {
    question: 'What is the difference between HTML encoding and URL encoding?',
    answer:
      'HTML encoding converts characters to HTML entities (like &lt;) for safe display in web pages. URL encoding converts characters to percent-encoded format (like %3C) for safe use in URLs. They solve different problems.',
  },
  {
    question: 'Does this tool handle numeric entities?',
    answer:
      'Yes. The decoder handles named entities (&lt;), decimal entities (&#60;), and hexadecimal entities (&#x3C;). The encoder produces named entities where available.',
  },
  {
    question: 'Can I use this to prevent XSS?',
    answer:
      'Encoding user input before rendering it in HTML is one of the primary defenses against XSS. However, a complete security strategy also includes Content Security Policy headers and input validation.',
  },
  {
    question: 'Is my text sent to a server?',
    answer:
      'No. All encoding and decoding happens in your browser using client-side JavaScript. Your text never leaves your device.',
  },
];
