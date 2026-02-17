export const toolInfo = {
  name: 'XML Minifier',
  description:
    'Minify XML data by removing whitespace and line breaks. Validate and compress XML documents instantly.',
  slug: 'xml-minifier',
};

export const relatedTools = [
  { name: 'XML Formatter', href: '/tools/xml-formatter' },
  { name: 'JSON Minifier', href: '/tools/json-minifier' },
  { name: 'HTML Minifier', href: '/tools/html-minifier' },
  { name: 'JSON to YAML Converter', href: '/tools/json-yaml-converter' },
];

export const features = [
  'Remove whitespace and line breaks from XML documents',
  'Validates XML syntax before minifying',
  'See original vs minified size and savings percentage',
  'Works entirely offline — your data never leaves your browser',
  'Copy minified output with one click',
  'Handles large XML files with complex nested structures',
];

export const howToSteps = [
  'Paste your XML data into the input field',
  'Click "Minify" to compress the XML',
  'View the minified output and size savings on the right',
  'Click "Copy" to copy the minified XML to your clipboard',
];

export const examples = [
  {
    title: 'Minifying a simple XML document',
    input: `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="fiction">
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <price>10.99</price>
  </book>
</bookstore>`,
    output:
      '<?xml version="1.0" encoding="UTF-8"?><bookstore><book category="fiction"><title>The Great Gatsby</title><author>F. Scott Fitzgerald</author><price>10.99</price></book></bookstore>',
  },
  {
    title: 'Minifying nested XML',
    input: `<config>
  <database>
    <host>localhost</host>
    <port>5432</port>
    <name>myapp_db</name>
  </database>
  <cache>
    <enabled>true</enabled>
    <ttl>3600</ttl>
  </cache>
</config>`,
    output:
      '<config><database><host>localhost</host><port>5432</port><name>myapp_db</name></database><cache><enabled>true</enabled><ttl>3600</ttl></cache></config>',
  },
];

export const explanation = {
  title: 'What Is XML Minification?',
  content: [
    'XML minification removes all unnecessary whitespace from XML documents — indentation, line breaks, and spaces between tags — to produce the smallest possible file. The minified XML is structurally identical to the original and will be parsed the same way by any XML processor.',
    'XML is still widely used in enterprise systems, SOAP APIs, configuration files (pom.xml, web.xml, .csproj), RSS/Atom feeds, and data interchange formats like SVG. In many of these contexts, file size matters: smaller XML files mean faster parsing, lower bandwidth usage, and reduced storage costs.',
    'This tool validates your XML before minifying it. If the document contains syntax errors — like unclosed tags, mismatched elements, or invalid characters — the tool will catch the error and report it. This makes it a useful quick XML validator as well.',
    'The minification process removes whitespace between tags (> <) and collapses line breaks. It does not modify tag names, attributes, text content, CDATA sections, or processing instructions. The output is a valid XML document that any parser will handle correctly.',
    'All processing happens in your browser using the native DOMParser API. Your XML data — whether it contains configuration secrets, internal schema definitions, or proprietary data formats — is never uploaded to any server. Fast, private, and zero-dependency.',
  ],
};

export const faqItems = [
  {
    question: 'Does XML minification change the document structure?',
    answer:
      'No. Minification only removes insignificant whitespace between tags. All elements, attributes, text content, and the document hierarchy remain exactly the same.',
  },
  {
    question: 'Does this tool validate XML?',
    answer:
      'Yes. The tool validates your XML syntax before minifying. If there are errors like unclosed tags or mismatched elements, it will report the issue instead of producing invalid output.',
  },
  {
    question: 'How much space does XML minification save?',
    answer:
      'Typically 20–40%, depending on how heavily indented the original XML is. Documents with deep nesting and generous formatting see the highest savings.',
  },
  {
    question: 'Does it handle XML declarations and CDATA sections?',
    answer:
      'Yes. XML declarations (<?xml ...?>) are preserved, and the minifier handles CDATA sections, comments, and processing instructions correctly.',
  },
  {
    question: 'Is my XML data sent to a server?',
    answer:
      'No. All processing happens entirely in your browser using the native DOMParser API. Your data never leaves your device.',
  },
];
