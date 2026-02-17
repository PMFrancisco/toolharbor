export const toolInfo = {
  name: 'Unicode Escape/Unescape',
  description:
    'Escape text to \\uXXXX Unicode sequences or unescape encoded strings back to readable text. Convert non-ASCII characters to escape codes.',
  slug: 'unicode-escape',
};

export const relatedTools = [
  { name: 'Text to ASCII Converter', href: '/tools/text-to-ascii' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
  { name: 'URL Encoder/Decoder', href: '/tools/url-encoder-decoder' },
  { name: 'HTML Encoder/Decoder', href: '/tools/html-encoder' },
];

export const features = [
  'Escape non-ASCII characters to \\uXXXX sequences',
  'Unescape \\uXXXX sequences back to readable text',
  'Option to escape all characters (including ASCII)',
  'Handles surrogate pairs for characters outside the Basic Multilingual Plane',
  'Swap between escape and unescape modes instantly',
  'Works entirely offline — your text never leaves your browser',
];

export const howToSteps = [
  'Choose "Escape" or "Unescape" mode',
  'Paste or type your text in the input field',
  'The escaped or unescaped result appears automatically',
  'Use the swap button to quickly reverse the operation',
  'Copy the result with the Copy button',
];

export const examples = [
  {
    title: 'Escaping special characters',
    input: 'Café résumé naïve',
    output: 'Caf\\u00e9 r\\u00e9sum\\u00e9 na\\u00efve',
  },
  {
    title: 'Escaping CJK characters',
    input: '你好世界',
    output: '\\u4f60\\u597d\\u4e16\\u754c',
  },
  {
    title: 'Escaping emoji',
    input: 'Hello 🌍',
    output: 'Hello \\ud83c\\udf0d',
  },
];

export const explanation = {
  title: 'What Is Unicode Escaping?',
  content: [
    'Unicode escaping converts non-ASCII characters into \\uXXXX escape sequences, where XXXX is the hexadecimal Unicode code point. This representation is commonly used in JSON strings, JavaScript source code, Java, C#, and many other programming languages where literal non-ASCII characters might cause encoding issues. If you need decimal ASCII codes for individual characters instead, see our Text to ASCII Converter.',
    'For example, the character "é" (Latin small letter e with acute) has the Unicode code point U+00E9, so it is escaped as \\u00e9. Characters outside the Basic Multilingual Plane (above U+FFFF), like emoji, are represented using surrogate pairs — two \\uXXXX sequences that together encode the full code point.',
    'Unicode escaping is essential when working with systems that only support ASCII safely: older protocols, certain database configurations, log files, and configuration formats. By converting non-ASCII text into ASCII-safe \\uXXXX sequences, you ensure compatibility across any system. It is also useful for debugging encoding issues — seeing the exact code points makes it easy to identify mojibake, invisible characters, or unexpected byte sequences.',
    'The unescape operation reverses the process: it finds all \\uXXXX sequences in the input and replaces them with the corresponding Unicode characters. It also handles common escape sequences like \\n (newline), \\t (tab), and \\r (carriage return).',
    'Everything runs in your browser. Your text is never sent to any server — the conversion happens entirely in client-side JavaScript using native string operations.',
  ],
};

export const faqItems = [
  {
    question: 'What characters are escaped?',
    answer:
      'By default, only non-ASCII characters (code points above 127) and control characters (newline, tab, carriage return) are escaped. ASCII letters, numbers, and punctuation are preserved as-is. You can enable "Escape all" to escape every character.',
  },
  {
    question: 'How are emoji handled?',
    answer:
      'Emoji and other characters above U+FFFF are encoded as surrogate pairs — two \\uXXXX sequences. For example, 🌍 (U+1F30D) becomes \\ud83c\\udf0d.',
  },
  {
    question: 'Is this the same as Text to ASCII?',
    answer:
      'No. "Text to ASCII" typically converts each character to its decimal code (e.g., A = 65). Unicode escaping converts non-ASCII characters to \\uXXXX hex sequences used in source code. For decimal ASCII codes, use our Text to ASCII Converter.',
  },
  {
    question: 'Is this the same as URL encoding?',
    answer:
      'No. URL encoding uses percent signs (%XX) to encode bytes, while Unicode escaping uses \\uXXXX to encode code points. They serve different purposes: URL encoding for URLs, Unicode escaping for source code and data formats.',
  },
  {
    question: 'Does this handle \\n, \\t, and other escape sequences?',
    answer:
      'Yes. The unescape mode converts \\n to newline, \\t to tab, \\r to carriage return, and \\0 to null, in addition to \\uXXXX sequences.',
  },
  {
    question: 'Is my text sent to a server?',
    answer:
      'No. All processing happens entirely in your browser. Your text never leaves your device.',
  },
];
