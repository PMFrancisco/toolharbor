export const toolInfo = {
  name: 'Base64 Image Viewer',
  description:
    'Preview base64 encoded images instantly. Supports raw base64 strings and data URLs with auto format detection.',
  slug: 'base64-image-viewer',
};

export const relatedTools = [
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'Color Converter', href: '/tools/color-converter' },
  { name: 'HTML Encoder/Decoder', href: '/tools/html-encoder' },
];

export const features = [
  'Preview base64 images instantly in your browser',
  'Supports raw base64 strings and full data URLs',
  'Auto-detects image format (PNG, JPEG, GIF, WebP, SVG, BMP)',
  'Shows image dimensions, format, and file size',
  'Copy as data URL with one click',
  'Download the decoded image directly',
];

export const howToSteps = [
  'Paste a base64 string or data URL into the input field',
  'The image preview and info appear automatically',
  'View the format, dimensions, and file size below the preview',
  'Click "Copy Data URL" to copy the full data URL',
  'Click "Download" to save the image to your device',
];

export const examples = [
  {
    title: 'Data URL format',
    input: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
    output: 'Renders the PNG image with format, size, and dimensions displayed',
  },
  {
    title: 'Raw base64 string',
    input: 'iVBORw0KGgoAAAANSUhEUg...',
    output: 'Auto-detects the format from magic bytes and renders the image',
  },
];

export const explanation = {
  title: 'What Is Base64 Image Encoding?',
  content: [
    'Base64 is a binary-to-text encoding scheme that represents binary data as ASCII characters. When applied to images, it converts the raw image bytes into a text string that can be embedded directly in HTML, CSS, JSON, or any text-based format. This is commonly used for embedding small images inline without requiring a separate HTTP request.',
    'A base64-encoded image can appear in two forms: as a raw base64 string (just the encoded characters) or as a data URL (with a prefix like "data:image/png;base64,"). Data URLs are used directly in HTML img tags, CSS background-image properties, and JavaScript. This tool accepts both formats and auto-detects the image type from the binary data.',
    'The auto-detection feature reads the first few bytes of the decoded image (called "magic bytes" or file signatures) to identify the format. PNG files start with a specific 8-byte signature, JPEG files start with FF D8 FF, GIF files start with "GIF89a" or "GIF87a", and so on. This means you can paste a raw base64 string without any prefix and the tool will still display it correctly.',
    'Common use cases for base64 images include: embedding icons in CSS to reduce HTTP requests, storing thumbnails in JSON API responses, including images in email HTML, embedding assets in single-file HTML exports, and passing image data through text-only channels. The trade-off is that base64 encoding increases the data size by roughly 33%.',
    'This tool runs entirely in your browser. Your base64 data is never uploaded to any server — the image is decoded and rendered locally using a standard HTML img element. This makes it safe to use with any image data, including screenshots, documents, or private photos.',
  ],
};

export const faqItems = [
  {
    question: 'What image formats are supported?',
    answer:
      'PNG, JPEG, GIF, WebP, SVG, BMP, ICO, TIFF, and AVIF. The tool auto-detects the format from the binary data or from the data URL prefix.',
  },
  {
    question: 'Do I need to include the "data:image/..." prefix?',
    answer:
      'No. You can paste either a raw base64 string or a full data URL. If you paste raw base64, the tool automatically detects the image format and generates the correct data URL.',
  },
  {
    question: 'Why is my base64 string not displaying?',
    answer:
      'Common issues include: the string is not valid base64 (check for extra characters or line breaks), the data does not represent a valid image, or the image format is not supported. Try pasting the full data URL if you have it.',
  },
  {
    question: 'How does the auto-detection work?',
    answer:
      'The tool decodes the first few bytes of the base64 string and checks for known file signatures (magic bytes). For example, PNG files always start with the bytes 89 50 4E 47, JPEG with FF D8 FF, and GIF with 47 49 46 38.',
  },
  {
    question: 'Is my image data sent to a server?',
    answer:
      'No. The image is decoded and rendered entirely in your browser using a standard HTML img element. No data is uploaded or logged.',
  },
];
