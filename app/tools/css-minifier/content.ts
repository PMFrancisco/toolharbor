export const toolInfo = {
  name: 'CSS Minifier',
  description:
    'Minify CSS code by removing comments, whitespace, and unnecessary characters. Reduce stylesheet size instantly.',
  slug: 'css-minifier',
};

export const relatedTools = [
  { name: 'HTML Minifier', href: '/tools/html-minifier' },
  { name: 'JSON Minifier', href: '/tools/json-minifier' },
  { name: 'HTML Formatter', href: '/tools/html-formatter' },
  { name: 'Color Converter', href: '/tools/color-converter' },
];

export const features = [
  'Remove comments, whitespace, and line breaks from CSS',
  'Strip last semicolons before closing braces for extra savings',
  'See original vs minified size and savings percentage',
  'Works entirely offline — your code never leaves your browser',
  'Copy minified output with one click',
  'Handles large stylesheets with complex selectors',
];

export const howToSteps = [
  'Paste your CSS code into the input field',
  'Click "Minify" to compress the CSS',
  'View the minified output and size savings on the right',
  'Click "Copy" to copy the minified CSS to your clipboard',
];

export const examples = [
  {
    title: 'Minifying basic styles',
    input: `body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}`,
    output:
      'body{margin:0;padding:0;font-family:Arial,sans-serif}.container{max-width:1200px;margin:0 auto;padding:20px}',
  },
  {
    title: 'Removing comments',
    input: `/* Main header styles */
.header {
  background: #1a1a2e;
  color: white;
  /* Fixed positioning */
  position: fixed;
  top: 0;
  width: 100%;
}`,
    output: '.header{background:#1a1a2e;color:white;position:fixed;top:0;width:100%}',
  },
];

export const explanation = {
  title: 'What Is CSS Minification?',
  content: [
    'CSS minification is the process of removing all unnecessary characters from CSS source code to reduce its file size. This includes comments, whitespace, line breaks, indentation, and redundant semicolons. The browser interprets the minified CSS identically to the original — the visual result is the same, but the file downloads faster.',
    'Stylesheets are one of the most impactful assets for page load performance because they are render-blocking. The browser cannot display content until it has downloaded and parsed the CSS. A smaller CSS file means the browser can start rendering sooner, which directly improves First Contentful Paint (FCP) and Largest Contentful Paint (LCP) metrics.',
    'This tool performs several optimizations: it strips all CSS comments (both single-line and multi-line), collapses whitespace around selectors and properties, removes trailing semicolons before closing braces, and eliminates unnecessary spaces around operators. These are safe transformations that never change how your styles are applied.',
    'For production websites, CSS minification is a standard best practice. Build tools like PostCSS, cssnano, and esbuild handle this automatically in CI/CD pipelines. However, this tool is useful when you need to quickly minify a snippet, check the size savings for a specific stylesheet, or minify CSS outside a build system.',
    'All minification happens in your browser using client-side JavaScript. Whether your CSS contains proprietary design tokens, internal class names, or custom properties, it never leaves your device. No data is uploaded, no logs are kept — just instant, private CSS compression.',
  ],
};

export const faqItems = [
  {
    question: 'Does CSS minification break my styles?',
    answer:
      'No. Minification only removes characters that have no effect on how CSS is parsed: whitespace, comments, and trailing semicolons. All selectors, properties, and values remain unchanged.',
  },
  {
    question: 'How much space does CSS minification save?',
    answer:
      'Typically 20–50%, depending on how heavily commented and formatted the original CSS is. Well-documented stylesheets with many comments can see even higher savings.',
  },
  {
    question: 'Should I minify CSS for development or only production?',
    answer:
      'Keep CSS readable during development for easier debugging. Minify only for production. Most build tools handle this automatically so you never have to choose — your source stays readable while the deployed version is minified.',
  },
  {
    question: 'Does this tool handle CSS variables and modern syntax?',
    answer:
      'Yes. The minifier works on the text level — it removes whitespace and comments regardless of CSS features used. Custom properties (--variables), nesting, @container queries, and any valid CSS syntax are preserved correctly.',
  },
  {
    question: 'Is my CSS code sent to a server?',
    answer:
      'No. All processing happens entirely in your browser. Your CSS code never leaves your device.',
  },
];
