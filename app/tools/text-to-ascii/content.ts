export const toolInfo = {
  name: 'Text to ASCII Converter',
  description:
    'Convert text to ASCII codes (decimal, hex, binary, octal) or ASCII codes back to text. See the code value of every character instantly.',
  slug: 'text-to-ascii',
};

export const relatedTools = [
  { name: 'Unicode Escape/Unescape', href: '/tools/unicode-escape' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
  { name: 'Number Base Converter', href: '/tools/number-base-converter' },
  { name: 'HTML Encoder/Decoder', href: '/tools/html-encoder' },
];

export const features = [
  'Convert text to decimal, hexadecimal, binary, or octal ASCII codes',
  'Convert ASCII codes back to readable text',
  'Shows a character table with all formats side by side',
  'Supports full Unicode (not just ASCII 0-127)',
  'Custom separator between code values',
  'Swap between text-to-ASCII and ASCII-to-text modes',
  'Works entirely offline — your text never leaves your browser',
];

export const howToSteps = [
  'Choose "Text → ASCII" or "ASCII → Text" mode',
  'Select the output format: Decimal, Hex, Binary, or Octal',
  'Type or paste your input',
  'The converted result appears instantly',
  'Use the character table to see all formats at once',
  'Copy the result with the Copy button',
];

export const examples = [
  {
    title: 'Text to decimal ASCII codes',
    input: 'Hello',
    output: '72 101 108 108 111',
  },
  {
    title: 'Text to hexadecimal',
    input: 'Hello',
    output: '48 65 6C 6C 6F',
  },
  {
    title: 'Text to binary',
    input: 'Hi',
    output: '01001000 01101001',
  },
  {
    title: 'Decimal ASCII to text',
    input: '72 101 108 108 111',
    output: 'Hello',
  },
];

export const explanation = {
  title: 'What Is ASCII and How Do ASCII Codes Work?',
  content: [
    'ASCII (American Standard Code for Information Interchange) is a character encoding standard that assigns a numeric code to each character. The original ASCII table defines 128 characters (codes 0-127): uppercase and lowercase letters, digits 0-9, punctuation marks, and control characters like newline and tab. For example, the letter "A" has ASCII code 65, "a" is 97, and "0" is 48.',
    'Every piece of text on a computer is ultimately stored as numbers. When you type "Hello", the computer stores the sequence 72, 101, 108, 108, 111 — the decimal ASCII codes for each character. This tool lets you see those underlying numeric values in multiple formats: decimal (base 10), hexadecimal (base 16), binary (base 2), and octal (base 8).',
    'Hexadecimal is the most common format in programming — you will see it in color codes (#48656C), escape sequences (\\x48), memory dumps, and network protocols. Binary is useful for understanding how data is stored at the bit level, which matters for bitwise operations, flags, and low-level programming. Octal is used in Unix file permissions (chmod 755) and some older systems.',
    'This tool goes beyond the original 128-character ASCII table. It supports the full Unicode range, so you can see the code point for any character: accented letters (é = 233), CJK characters (中 = 20013), emoji (🚀 = 128640), and more. The reverse conversion works the same way — enter the numeric codes and get the corresponding text.',
    'All processing happens in your browser. No data is sent to any server. Type, convert, and copy — it is instant and private.',
  ],
};

export const faqItems = [
  {
    question: 'What is the ASCII code for A?',
    answer:
      'The ASCII code for uppercase "A" is 65 (decimal), 41 (hex), 01000001 (binary). Lowercase "a" is 97 (decimal), 61 (hex), 01100001 (binary).',
  },
  {
    question: 'Does this tool support characters beyond ASCII (0-127)?',
    answer:
      'Yes. While classic ASCII only covers codes 0-127, this tool supports the full Unicode range. You can convert any character — accented letters, CJK characters, emoji, and symbols — to its numeric code point.',
  },
  {
    question: 'What separator should I use?',
    answer:
      'Space is the default and most common separator. You can also use commas, dashes, or any custom separator. The same separator is used for both encoding and decoding.',
  },
  {
    question: 'How is this different from Unicode Escape?',
    answer:
      'Text to ASCII shows numeric code values (e.g., 72 for "H"). Unicode Escape converts characters to \\uXXXX escape sequences used in source code (e.g., \\u0048 for "H"). They show similar information in different formats for different use cases.',
  },
  {
    question: 'Is my text sent to a server?',
    answer:
      'No. All processing happens entirely in your browser. Your text never leaves your device.',
  },
];
