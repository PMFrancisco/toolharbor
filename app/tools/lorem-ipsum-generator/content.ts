export const toolInfo = {
  name: 'Lorem Ipsum Generator',
  description:
    'Generate lorem ipsum placeholder text by paragraphs, sentences, or words. Free online tool for designers and developers.',
  slug: 'lorem-ipsum-generator',
};

export const relatedTools = [
  { name: 'Word Counter', href: '/tools/word-counter' },
  { name: 'Text Sorter', href: '/tools/text-sorter' },
  { name: 'Slug Generator', href: '/tools/slug-generator' },
  { name: 'UUID Generator', href: '/tools/uuid-generator' },
];

export const features = [
  'Generate placeholder text by paragraphs, sentences, or words',
  'Configurable count — generate exactly what you need',
  'Option to start with classic "Lorem ipsum dolor sit amet..."',
  'One-click copy to clipboard',
  'No signup or server calls — runs entirely in your browser',
  'Perfect for mockups, wireframes, and prototypes',
];

export const howToSteps = [
  'Choose the unit: paragraphs, sentences, or words',
  'Set the desired count',
  'Toggle "Start with Lorem ipsum" if you want the classic opening',
  'Click Generate to create the placeholder text',
  'Copy the result using the Copy button',
];

export const examples = [
  {
    title: '1 paragraph',
    input: 'Count: 1, Unit: Paragraphs',
    output:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis vehicula porta dignissim morbi lacus eu. Nisl viverra interdum purus nunc vestibulum quam lobortis.',
  },
  {
    title: '3 sentences',
    input: 'Count: 3, Unit: Sentences',
    output:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta dignissim morbi lacus eu nisl viverra. Interdum purus nunc vestibulum quam lobortis.',
  },
  {
    title: '10 words',
    input: 'Count: 10, Unit: Words',
    output: 'lorem ipsum sagittis vehicula porta dignissim morbi lacus eu nisl',
  },
];

export const explanation = {
  title: 'What is Lorem Ipsum and Why Use It?',
  content: [
    'Lorem ipsum is the standard placeholder text used in the design and typesetting industry. It has been the industry default since the 1500s, when an unknown printer scrambled a passage from Cicero\'s "De Finibus Bonorum et Malorum" to create a type specimen book. Its enduring popularity comes from its roughly normal distribution of letters, making it look like readable English without being distracting.',
    'Designers use lorem ipsum to fill layouts with realistic-looking text before the final copy is ready. This lets teams evaluate visual hierarchy, spacing, font choices, and overall page balance without being distracted by meaningful content. It is the standard in tools like Figma, Sketch, and Adobe XD.',
    'Developers use placeholder text to populate prototypes, test responsive layouts, stress-test text containers, and create realistic demo data. Having a quick generator saves time compared to manually copying text from external websites or writing nonsense by hand.',
    'This generator lets you choose exactly how much text you need — by paragraphs for full page mockups, by sentences for component-level testing, or by individual words for short labels and badges. The classic "Lorem ipsum dolor sit amet" opening is optional, so you can start with the recognizable phrase or go fully random.',
    'All text is generated client-side in your browser. No API calls, no signup, no tracking. Just fast, standard placeholder text whenever you need it.',
  ],
};

export const faqItems = [
  {
    question: 'Is this real Latin?',
    answer:
      'Not exactly. Lorem ipsum is derived from a 45 BC Latin text by Cicero, but the words have been altered, added, and randomized over centuries. It resembles Latin but is not grammatically correct.',
  },
  {
    question: 'Why not just use "test test test"?',
    answer:
      'Lorem ipsum has a natural distribution of word lengths and letter frequencies, so it visually mimics real text. Repeated words like "test" create unnatural visual patterns that do not represent how actual content will look.',
  },
  {
    question: 'Can I generate a specific number of words?',
    answer:
      'Yes. Switch the unit to "Words" and set your desired count. You can generate anywhere from 1 to 500 words.',
  },
  {
    question: 'Does the text change each time?',
    answer:
      'Yes. Each time you click Generate, the tool produces a new random arrangement of lorem ipsum words (except for the optional classic opening sentence).',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. The text is generated entirely in your browser using client-side JavaScript. Nothing is sent to any server.',
  },
];
