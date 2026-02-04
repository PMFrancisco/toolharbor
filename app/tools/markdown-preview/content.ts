export const toolInfo = {
  name: 'Markdown Preview',
  description:
    'Preview Markdown as rendered HTML in real-time. Write and format documentation with instant visual feedback.',
  slug: 'markdown-preview',
};

export const relatedTools = [
  { name: 'SQL Formatter', href: '/tools/sql-formatter' },
  { name: 'JSON to YAML Converter', href: '/tools/json-yaml-converter' },
  { name: 'Regex Tester', href: '/tools/regex-tester' },
];

export const features = [
  'Real-time Markdown to HTML preview',
  'Support for common Markdown syntax',
  'Code blocks with syntax highlighting',
  'Tables, lists, and blockquotes',
  'Copy rendered HTML output',
  'Works offline - no data sent to servers',
];

export const howToSteps = [
  'Type or paste Markdown in the left editor',
  'View the rendered preview instantly on the right',
  'Use the sample to see supported syntax',
  'Copy the HTML output if needed',
  'Toggle between preview and HTML source',
];

export const examples = [
  {
    title: 'Headers and text',
    input: '# Heading 1\n## Heading 2\n\nRegular paragraph with **bold** and *italic* text.',
    output:
      '<h1 style="font-size:1.5em;font-weight:600;margin:0 0 0.5em">Heading 1</h1><h2 style="font-size:1.25em;font-weight:600;margin:0 0 0.5em">Heading 2</h2><p>Regular paragraph with <strong>bold</strong> and <em>italic</em> text.</p>',
    renderHtml: true,
  },
  {
    title: 'Lists',
    input: '- Item 1\n- Item 2\n  - Nested item\n\n1. First\n2. Second',
    output:
      '<ul style="padding-left:1.5em;margin:0.5em 0;list-style:disc"><li>Item 1</li><li>Item 2<ul style="padding-left:1.5em;margin:0.25em 0;list-style:circle"><li>Nested item</li></ul></li></ul><ol style="padding-left:1.5em;margin:0.5em 0;list-style:decimal"><li>First</li><li>Second</li></ol>',
    renderHtml: true,
  },
  {
    title: 'Code blocks',
    input: '```javascript\nconst greeting = "Hello";\nconsole.log(greeting);\n```',
    output:
      '<pre style="background:#27272a;padding:0.75em;border-radius:6px;overflow-x:auto"><code style="font-family:monospace;font-size:0.85em">const greeting = "Hello";\nconsole.log(greeting);</code></pre>',
    renderHtml: true,
  },
];

export const explanation = {
  title: 'What is Markdown?',
  content: [
    'Markdown is a lightweight markup language created by John Gruber in 2004. It allows you to write formatted text using a plain-text syntax that is easy to read and write. Markdown is widely used for documentation, README files, blog posts, forums, and anywhere you need formatted text without a full word processor.',
    'The beauty of Markdown is its simplicity. You use characters like # for headings, * for emphasis, and - for lists. This plain-text approach means Markdown files are readable even without rendering, version control friendly, and portable across different platforms and editors.',
    'A Markdown preview tool renders your Markdown as HTML in real-time, showing you exactly how your formatted text will appear. This immediate feedback makes writing documentation faster and helps catch formatting issues before publishing. It is essential for writing README files, documentation, and blog posts.',
    'Our Markdown preview supports the core syntax including headings, emphasis (bold/italic), lists (ordered and unordered), links, images, code blocks, blockquotes, and tables. The preview updates as you type, giving you instant visual feedback on your formatting.',
    'All conversion happens locally in your browser. Your Markdown content is never sent to any server, making it safe to preview private documentation, notes, or any sensitive content. The tool works completely offline once the page is loaded.',
  ],
};

export const faqItems = [
  {
    question: 'What Markdown syntax is supported?',
    answer:
      'We support standard Markdown including headings (#), emphasis (*bold*, _italic_), lists (- or 1.), links [text](url), images ![alt](url), code blocks (```), blockquotes (>), tables, and horizontal rules (---).',
  },
  {
    question: 'Does this support GitHub Flavored Markdown (GFM)?',
    answer:
      'We support common GFM features like tables, task lists ([x] and [ ]), strikethrough (~~text~~), and fenced code blocks with language hints. Some advanced features may differ slightly.',
  },
  {
    question: 'Can I export the rendered HTML?',
    answer:
      'Yes. You can view and copy the raw HTML output using the HTML view toggle. This is useful when you need to embed the rendered content in websites or other applications.',
  },
  {
    question: 'Why does my preview look different from GitHub?',
    answer:
      'Different Markdown renderers have slightly different styles and feature support. Our preview uses standard HTML rendering. The structure will be the same, but fonts, spacing, and colors may vary.',
  },
  {
    question: 'Is there a file size limit?',
    answer:
      'There is no hard limit, but very large documents may cause the preview to lag. For best performance, keep documents under 100KB. The tool handles typical README and documentation sizes easily.',
  },
];
