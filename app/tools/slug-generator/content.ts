export const toolInfo = {
  name: 'Slug Generator',
  description:
    'Generate clean, URL-friendly slugs from any text. Supports custom separators, max length, and accent transliteration.',
  slug: 'slug-generator',
};

export const relatedTools = [
  { name: 'Case Converter', href: '/tools/case-converter' },
  { name: 'URL Encoder/Decoder', href: '/tools/url-encoder-decoder' },
  { name: 'URL Parser', href: '/tools/url-parser' },
  { name: 'Word Counter', href: '/tools/word-counter' },
];

export const features = [
  'Convert any text to a URL-friendly slug instantly',
  'Choose between hyphen, underscore, or dot separators',
  'Transliterates accented characters (é → e, ñ → n, ü → u)',
  'Optional max length with clean truncation',
  'Supports multi-line input for batch slug generation',
  'Copy results with one click',
];

export const howToSteps = [
  'Type or paste your text in the input field',
  'Choose a separator style (hyphen, underscore, or dot)',
  'Optionally set a max length to keep slugs short',
  'The slug appears instantly in the output field',
  'Copy the result using the Copy button',
];

export const examples = [
  {
    title: 'Blog post title',
    input: 'How to Build a REST API with Node.js',
    output: 'how-to-build-a-rest-api-with-node-js',
  },
  {
    title: 'Accented characters',
    input: 'Café résumé naïve',
    output: 'cafe-resume-naive',
  },
  {
    title: 'Special characters removed',
    input: "What's New in TypeScript 5.0?",
    output: 'whats-new-in-typescript-5-0',
  },
  {
    title: 'Underscore separator',
    input: 'user profile settings',
    output: 'user_profile_settings',
  },
];

export const explanation = {
  title: 'What Is a URL Slug?',
  content: [
    'A URL slug is the human-readable part of a web address that identifies a specific page. For example, in the URL "example.com/blog/how-to-use-git", the slug is "how-to-use-git". Slugs are important for both SEO and user experience — a clean, descriptive slug helps search engines understand what a page is about and helps users know what to expect before clicking.',
    'Good slugs are lowercase, use hyphens to separate words, and contain only alphanumeric characters. Special characters, spaces, and accented letters need to be removed or converted. This tool handles all of that automatically: it strips punctuation, transliterates accents (so "café" becomes "cafe"), collapses multiple spaces, and joins words with your chosen separator.',
    'The hyphen (-) is the most common separator for URL slugs and is recommended by Google. Underscores (_) are sometimes used for file names, database identifiers, and internal references. Dots (.) are less common but used in some package naming conventions. This tool lets you pick whichever format your project requires.',
    'The optional max length setting is useful when slugs need to fit a database column limit or when you want to keep URLs concise. The truncation is clean — it never cuts a word in half or leaves a trailing separator. Multi-line input lets you batch-generate slugs for an entire list of titles or headings at once.',
    'Everything runs in your browser. Your text is never sent to a server. Whether you are building a blog, an e-commerce store, or a documentation site, this slug generator gives you consistent, SEO-friendly URLs in seconds.',
  ],
};

export const faqItems = [
  {
    question: 'What characters are allowed in a URL slug?',
    answer:
      'URL slugs should contain only lowercase letters (a-z), numbers (0-9), and hyphens (-). All other characters — spaces, punctuation, accents — should be removed or converted.',
  },
  {
    question: 'Should I use hyphens or underscores in slugs?',
    answer:
      'Hyphens are recommended for URL slugs. Google treats hyphens as word separators but treats underscores as word joiners. For SEO purposes, "my-blog-post" is better than "my_blog_post".',
  },
  {
    question: 'How does accent transliteration work?',
    answer:
      'The tool converts accented characters to their closest ASCII equivalents. For example, é becomes e, ñ becomes n, ü becomes u, and ß becomes ss. This ensures slugs work in any URL without encoding.',
  },
  {
    question: 'Can I generate slugs for multiple titles at once?',
    answer:
      'Yes. Enter each title on a separate line and the tool will generate a slug for each line independently.',
  },
  {
    question: 'Is my text sent to a server?',
    answer:
      'No. All slug generation happens in your browser using client-side JavaScript. Your text never leaves your device.',
  },
];
