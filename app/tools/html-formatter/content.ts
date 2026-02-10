export const toolInfo = {
  name: 'HTML Formatter',
  description:
    'Format, beautify, and minify HTML code instantly. Free online HTML formatter with proper indentation.',
  slug: 'html-formatter',
};

export const relatedTools = [
  { name: 'XML Formatter', href: '/tools/xml-formatter' },
  { name: 'HTML Encoder/Decoder', href: '/tools/html-encoder' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'YAML Formatter', href: '/tools/yaml-formatter' },
];

export const features = [
  'Format HTML with customizable indentation (2 or 4 spaces)',
  'Minify HTML to reduce file size',
  'Handles void elements (br, img, input, hr, etc.) correctly',
  'Preserves content inside pre, code, script, and style tags',
  'Keeps inline text content on the same line as its tag',
  'Works offline — no data sent to servers',
];

export const howToSteps = [
  'Paste your HTML code into the input field on the left',
  'Click "Format" to beautify or "Minify" to compress your HTML',
  'Choose your preferred indentation size (2 or 4 spaces)',
  'View the formatted output on the right side',
  'Click "Copy" to copy the result to your clipboard',
];

export const examples = [
  {
    title: 'Formatting minified HTML',
    input:
      '<div class="container"><header><h1>Hello World</h1><nav><a href="/">Home</a><a href="/about">About</a></nav></header><main><p>Welcome to my site.</p></main></div>',
    output: `<div class="container">
  <header>
    <h1>Hello World</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <p>Welcome to my site.</p>
  </main>
</div>`,
  },
  {
    title: 'Void elements and self-closing tags',
    input:
      '<form><label>Name</label><input type="text" name="name" /><br><label>Email</label><input type="email" name="email" /><hr><button type="submit">Send</button></form>',
    output: `<form>
  <label>Name</label>
  <input type="text" name="name" />
  <br>
  <label>Email</label>
  <input type="email" name="email" />
  <hr>
  <button type="submit">Send</button>
</form>`,
  },
];

export const explanation = {
  title: 'What is an HTML Formatter?',
  content: [
    'HTML (HyperText Markup Language) is the standard language for creating web pages and web applications. Every website you visit is built with HTML, from simple blogs to complex web applications. As projects grow, HTML files can become messy and hard to read, especially when multiple developers are working on the same codebase or when HTML is generated dynamically.',
    'An HTML formatter (also called an HTML beautifier or HTML prettifier) takes messy, minified, or inconsistently indented HTML and transforms it into a clean, properly indented document. Well-formatted HTML makes it easier to understand the document structure, spot missing closing tags, identify nesting issues, and collaborate with other developers.',
    "Our HTML formatter understands the unique rules of HTML that make it different from XML. It correctly handles void elements like <br>, <img>, and <input> that don't need closing tags. It preserves content inside <pre>, <code>, <script>, and <style> tags where whitespace matters. And it intelligently keeps short inline text on the same line as its parent tag for cleaner output.",
    'The minify feature removes all unnecessary whitespace, comments, and line breaks from your HTML. Minified HTML loads faster because there is less data to transfer over the network. This is a common optimization step in web development — developers write formatted HTML for readability and serve minified HTML in production for performance.',
    'This HTML formatter runs entirely in your browser with no server-side processing. Your HTML code — which may contain sensitive template logic, API endpoints, or proprietary markup — stays completely private on your machine. No uploads, no accounts, no tracking. Just paste, format, and copy.',
  ],
};

export const faqItems = [
  {
    question: 'What is HTML formatting?',
    answer:
      'HTML formatting adds proper indentation and line breaks to HTML code, making the tag hierarchy visually clear. This helps developers read, debug, and maintain HTML documents more efficiently.',
  },
  {
    question: 'What are void elements in HTML?',
    answer:
      "Void elements are HTML tags that cannot have child content and don't need a closing tag. Examples include <br>, <hr>, <img>, <input>, <meta>, and <link>. Our formatter handles these correctly without adding unnecessary closing tags.",
  },
  {
    question: 'Does formatting change how HTML renders?',
    answer:
      'In most cases, no. Browsers collapse multiple whitespace characters into a single space when rendering HTML. However, whitespace inside <pre> tags is preserved, which is why our formatter does not modify content inside <pre>, <code>, and similar elements.',
  },
  {
    question: 'Should I minify HTML for production?',
    answer:
      'Yes, minifying HTML removes unnecessary characters (whitespace, comments) that reduce file size and improve page load speed. Most build tools and CDNs can minify HTML automatically, but this tool is useful for quick one-off minification.',
  },
  {
    question: 'Is my HTML code safe when using this tool?',
    answer:
      'Yes, completely. This tool runs entirely in your browser. Your HTML code is never sent to any server — all formatting happens locally on your device with zero data transmission.',
  },
];
