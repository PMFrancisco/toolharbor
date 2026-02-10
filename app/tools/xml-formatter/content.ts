export const toolInfo = {
  name: 'XML Formatter',
  description:
    'Format, validate, and beautify XML data instantly. Free online XML formatter with syntax validation.',
  slug: 'xml-formatter',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'YAML Formatter', href: '/tools/yaml-formatter' },
  { name: 'SQL Formatter', href: '/tools/sql-formatter' },
  { name: 'HTML Encoder/Decoder', href: '/tools/html-encoder' },
];

export const features = [
  'Format XML with customizable indentation (2 or 4 spaces)',
  'Minify XML to reduce file size',
  'Validate XML syntax with clear error messages',
  'Handles declarations, comments, CDATA, and self-closing tags',
  'Works offline — no data sent to servers',
  'Copy formatted output with one click',
];

export const howToSteps = [
  'Paste your XML data into the input field on the left',
  'Click "Format" to beautify or "Minify" to compress your XML',
  'Choose your preferred indentation size (2 or 4 spaces)',
  'View the formatted output on the right side',
  'Click "Copy" to copy the result to your clipboard',
];

export const examples = [
  {
    title: 'Formatting minified XML',
    input:
      '<catalog><book id="1"><title>XML Guide</title><author>Jane Doe</author><price>29.99</price></book><book id="2"><title>Web Dev</title><author>John Smith</author><price>39.99</price></book></catalog>',
    output: `<catalog>
  <book id="1">
    <title>XML Guide</title>
    <author>Jane Doe</author>
    <price>29.99</price>
  </book>
  <book id="2">
    <title>Web Dev</title>
    <author>John Smith</author>
    <price>39.99</price>
  </book>
</catalog>`,
  },
  {
    title: 'Self-closing tags and attributes',
    input:
      '<config><database host="localhost" port="5432" /><cache enabled="true" /><logging level="info"><output type="file" path="/var/log/app.log" /></logging></config>',
    output: `<config>
  <database host="localhost" port="5432" />
  <cache enabled="true" />
  <logging level="info">
    <output type="file" path="/var/log/app.log" />
  </logging>
</config>`,
  },
];

export const explanation = {
  title: 'What is an XML Formatter?',
  content: [
    'XML (eXtensible Markup Language) is a markup language designed for storing and transporting structured data. It is widely used in web services (SOAP), configuration files, data feeds (RSS/Atom), document formats (SVG, XHTML), and enterprise integrations. Despite the rise of JSON, XML remains essential in many industries including finance, healthcare, and government systems.',
    'An XML formatter (also called an XML beautifier or XML prettifier) takes compact or minified XML and transforms it into a human-readable format with proper indentation and line breaks. When working with API responses, configuration files, or data exports, well-formatted XML makes it dramatically easier to understand the document structure, find specific elements, and debug issues.',
    "Our online XML formatter validates your syntax using the browser's native DOMParser, catching errors like unclosed tags, mismatched elements, missing quotes around attributes, and invalid nesting. This instant validation helps you identify and fix malformed XML before sending it to APIs or deploying configuration changes.",
    'The XML minify feature removes all unnecessary whitespace between tags, reducing file size for production environments. Minified XML transmits faster over networks, uses less storage, and is ideal for API payloads where human readability is not needed. Many developers use both features: beautify for development and debugging, minify for deployment and data transfer.',
    'Unlike online tools that upload your data to remote servers, this XML formatter runs entirely in your browser. Your XML data — which may contain sensitive configuration details, API credentials, or business data — never leaves your computer. No registration, no data collection, just a fast and private formatting tool that works even without an internet connection.',
  ],
};

export const faqItems = [
  {
    question: 'What is XML formatting?',
    answer:
      'XML formatting (or beautifying) adds proper indentation and line breaks to XML data, making the hierarchical tag structure easy to read. Minified XML is compact but difficult to understand; formatted XML clearly shows parent-child relationships between elements.',
  },
  {
    question: 'Is my data safe when using this tool?',
    answer:
      'Yes, completely. This tool runs entirely in your browser using the native DOMParser API. Your XML data is never sent to any server — all processing happens locally on your device.',
  },
  {
    question: 'What causes XML validation errors?',
    answer:
      'Common causes include: unclosed or mismatched tags (e.g. <a></b>), missing quotes around attribute values, unescaped special characters (& < > in text content), missing root element, and invalid characters in tag names.',
  },
  {
    question: 'What is the difference between XML and HTML?',
    answer:
      'XML is strict — every tag must be closed, attribute values must be quoted, and tag names are case-sensitive. HTML is more forgiving and has predefined tags. XML lets you define your own tags and is designed for data storage and transport, while HTML is designed for display.',
  },
  {
    question: 'Can I format large XML files?',
    answer:
      'Yes, this tool handles large XML files efficiently using browser-native parsing. However, extremely large files (several megabytes) may cause temporary slowdowns depending on your device.',
  },
];
