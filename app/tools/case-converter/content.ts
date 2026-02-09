export const toolInfo = {
  name: 'Case Converter',
  description:
    'Convert text between camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, and more.',
  slug: 'case-converter',
};

export const relatedTools = [
  { name: 'Slug Generator', href: '/tools/slug-generator' },
  { name: 'URL Encoder/Decoder', href: '/tools/url-encoder-decoder' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
];

export const features = [
  'Convert between 8 popular naming conventions',
  'Supports camelCase, PascalCase, snake_case, kebab-case, and more',
  'Handles multi-line input — each line converted independently',
  'Automatically detects word boundaries in any format',
  'Real-time conversion as you type',
  'Copy results with one click',
];

export const howToSteps = [
  'Select a target case format from the toggle buttons',
  'Paste or type your text in the input field',
  'The converted result appears instantly in the output',
  'Copy the result using the Copy button',
  'Try different cases by switching the toggle',
];

export const examples = [
  {
    title: 'Text to camelCase',
    input: 'hello world example',
    output: 'helloWorldExample',
  },
  {
    title: 'camelCase to snake_case',
    input: 'myVariableName',
    output: 'my_variable_name',
  },
  {
    title: 'Mixed input to kebab-case',
    input: 'Some_mixed-Input String',
    output: 'some-mixed-input-string',
  },
  {
    title: 'Text to CONSTANT_CASE',
    input: 'api base url',
    output: 'API_BASE_URL',
  },
];

export const explanation = {
  title: 'What Is a Case Converter?',
  content: [
    'A case converter transforms text between different naming conventions used in programming, writing, and web development. Each convention has specific rules about capitalization, word separators, and formatting. Developers constantly switch between these styles when working across languages, frameworks, and configuration files.',
    'camelCase starts with a lowercase letter and capitalizes each subsequent word — widely used in JavaScript, TypeScript, and Java for variable and function names. PascalCase is similar but capitalizes the first letter too, making it the standard for class names in most languages and component names in React.',
    'snake_case separates words with underscores and uses all lowercase letters. It is the dominant convention in Python, Ruby, and database column names. CONSTANT_CASE (or SCREAMING_SNAKE_CASE) is the uppercase variant, used for constants and environment variables across nearly every language.',
    'kebab-case uses hyphens between lowercase words. It is the standard for CSS class names, URL slugs, HTML attributes, and CLI flags. Title Case capitalizes the first letter of every word and is used in headings, titles, and display text.',
    'This tool automatically detects word boundaries regardless of the input format. Whether you paste camelCase, snake_case, plain text, or a mix of conventions, the converter splits the words correctly and reassembles them in your chosen format. Multi-line input is supported — each line is converted independently, making it easy to batch-convert lists of variable names, constants, or identifiers.',
  ],
};

export const faqItems = [
  {
    question: 'What naming conventions does this tool support?',
    answer:
      'The tool supports 8 formats: camelCase, PascalCase, snake_case, CONSTANT_CASE, kebab-case, Title Case, lowercase, and UPPERCASE. These cover the vast majority of programming and writing conventions.',
  },
  {
    question: 'Can I convert camelCase to snake_case?',
    answer:
      'Yes. The tool detects camelCase word boundaries automatically. Just paste your camelCase text, select snake_case, and the result appears instantly.',
  },
  {
    question: 'Does it handle multi-line input?',
    answer:
      'Yes. Each line is converted independently, so you can paste a list of variable names and convert all of them at once.',
  },
  {
    question: 'How does it detect word boundaries?',
    answer:
      'The converter recognizes spaces, underscores, hyphens, dots, and camelCase/PascalCase transitions as word boundaries. This means it works correctly regardless of the input format.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All conversions happen entirely in your browser using client-side JavaScript. Your text never leaves your device.',
  },
];
