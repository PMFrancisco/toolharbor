export const toolInfo = {
  name: 'Color Converter',
  description:
    'Convert colors between HEX, RGB, and HSL formats instantly. Includes a live color preview and one-click copy.',
  slug: 'color-converter',
};

export const relatedTools = [
  { name: 'HTML Encoder', href: '/tools/html-encoder' },
  { name: 'Case Converter', href: '/tools/case-converter' },
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'Slug Generator', href: '/tools/slug-generator' },
];

export const features = [
  'Convert between HEX, RGB, and HSL color formats',
  'Auto-detects input format (HEX, RGB, or HSL)',
  'Live color preview swatch',
  'Supports shorthand HEX (#abc), rgba(), and hsla()',
  'Copy any format with one click',
  'Works offline — no server requests',
];

export const howToSteps = [
  'Enter a color in any format: HEX (#ff6600), RGB (rgb(255, 102, 0)), or HSL (hsl(24, 100%, 50%))',
  'The color is instantly parsed and converted to all three formats',
  'View the live color preview swatch',
  'Copy any format using its Copy button',
  'Try plain numbers too: 255, 102, 0',
];

export const examples = [
  {
    title: 'HEX to RGB and HSL',
    input: '#3b82f6',
    output: 'RGB: rgb(59, 130, 246) | HSL: hsl(217, 91%, 60%)',
  },
  {
    title: 'RGB to HEX and HSL',
    input: 'rgb(34, 197, 94)',
    output: 'HEX: #22C55E | HSL: hsl(142, 71%, 45%)',
  },
  {
    title: 'HSL to HEX and RGB',
    input: 'hsl(0, 84%, 60%)',
    output: 'HEX: #EF4444 | RGB: rgb(239, 68, 68)',
  },
];

export const explanation = {
  title: 'What Is a Color Converter?',
  content: [
    'A color converter translates colors between different notation systems used in web development and design. The three most common formats are HEX (hexadecimal), RGB (Red, Green, Blue), and HSL (Hue, Saturation, Lightness). Each format represents the same color differently, and developers frequently need to switch between them.',
    'HEX colors are the most widely used format in CSS and web design. They represent colors as a six-character hexadecimal string preceded by #, like #ff6600 for orange. Shorthand notation (#f60) is also supported. HEX is compact and easy to copy-paste, but not intuitive for adjusting colors mentally.',
    'RGB defines colors by their red, green, and blue channel values, each ranging from 0 to 255. For example, rgb(255, 102, 0) is the same orange as #ff6600. RGB is intuitive when you think in terms of light mixing and is the native format for screens and digital displays.',
    'HSL defines colors by hue (0-360 degrees on the color wheel), saturation (0-100%), and lightness (0-100%). For example, hsl(24, 100%, 50%) is the same orange. HSL is the most human-friendly format — it is easy to create color variations by adjusting saturation or lightness without changing the hue.',
    'This tool automatically detects which format you enter and converts it to all three. It also shows a live preview swatch so you can visually confirm the color. All processing happens in your browser — your color values are never sent to any server.',
  ],
};

export const faqItems = [
  {
    question: 'What color formats are supported?',
    answer:
      'The tool accepts HEX (#ff6600 or #f60), RGB (rgb(255, 102, 0) or plain 255, 102, 0), and HSL (hsl(24, 100%, 50%)). It also handles rgba() and hsla() with an alpha channel.',
  },
  {
    question: 'Does it support shorthand HEX?',
    answer: 'Yes. #abc is automatically expanded to #aabbcc before conversion.',
  },
  {
    question: 'How do I enter plain RGB values?',
    answer:
      'You can type just the three numbers separated by commas: 255, 102, 0. The tool will recognize this as RGB.',
  },
  {
    question: 'What is the difference between RGB and HSL?',
    answer:
      'RGB defines colors by mixing red, green, and blue light (0-255 each). HSL defines colors by hue (color wheel angle), saturation (intensity), and lightness (brightness). HSL is easier for humans to reason about when creating color palettes.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All color conversions happen in your browser using client-side JavaScript. Nothing is sent to a server.',
  },
];
