export type LoremUnit = 'paragraphs' | 'sentences' | 'words';

export interface LoremOptions {
  count: number;
  unit: LoremUnit;
  startWithLorem: boolean;
}

export interface LoremUnitOption {
  value: LoremUnit;
  label: string;
}

export const loremUnitOptions: LoremUnitOption[] = [
  { value: 'paragraphs', label: 'Paragraphs' },
  { value: 'sentences', label: 'Sentences' },
  { value: 'words', label: 'Words' },
];

const WORDS = [
  'lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'sed',
  'do',
  'eiusmod',
  'tempor',
  'incididunt',
  'ut',
  'labore',
  'et',
  'dolore',
  'magna',
  'aliqua',
  'enim',
  'ad',
  'minim',
  'veniam',
  'quis',
  'nostrud',
  'exercitation',
  'ullamco',
  'laboris',
  'nisi',
  'aliquip',
  'ex',
  'ea',
  'commodo',
  'consequat',
  'duis',
  'aute',
  'irure',
  'in',
  'reprehenderit',
  'voluptate',
  'velit',
  'esse',
  'cillum',
  'fugiat',
  'nulla',
  'pariatur',
  'excepteur',
  'sint',
  'occaecat',
  'cupidatat',
  'non',
  'proident',
  'sunt',
  'culpa',
  'qui',
  'officia',
  'deserunt',
  'mollit',
  'anim',
  'id',
  'est',
  'laborum',
  'ac',
  'ante',
  'bibendum',
  'blandit',
  'congue',
  'cras',
  'cursus',
  'diam',
  'dignissim',
  'donec',
  'dui',
  'efficitur',
  'eget',
  'eleifend',
  'elementum',
  'eu',
  'facilisis',
  'faucibus',
  'felis',
  'fermentum',
  'finibus',
  'gravida',
  'habitant',
  'hendrerit',
  'iaculis',
  'imperdiet',
  'integer',
  'interdum',
  'justo',
  'lacinia',
  'lacus',
  'laoreet',
  'lectus',
  'leo',
  'libero',
  'ligula',
  'lobortis',
  'luctus',
  'maecenas',
  'massa',
  'mattis',
  'mauris',
  'maximus',
  'metus',
  'mi',
  'morbi',
  'nam',
  'nec',
  'neque',
  'nibh',
  'nisl',
  'nullam',
  'nunc',
  'odio',
  'orci',
  'ornare',
  'pellentesque',
  'pharetra',
  'placerat',
  'porta',
  'porttitor',
  'posuere',
  'praesent',
  'pretium',
  'proin',
  'pulvinar',
  'purus',
  'quam',
  'quisque',
  'rhoncus',
  'risus',
  'rutrum',
  'sagittis',
  'sapien',
  'scelerisque',
  'semper',
  'sollicitudin',
  'suscipit',
  'tellus',
  'tincidunt',
  'tortor',
  'tristique',
  'turpis',
  'ultrices',
  'ultricies',
  'urna',
  'varius',
  'vehicula',
  'vel',
  'vestibulum',
  'vitae',
  'vivamus',
  'viverra',
  'volutpat',
  'vulputate',
];

const LOREM_OPENING = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateSentence(): string {
  const length = randomInt(6, 14);
  const words: string[] = [];
  for (let i = 0; i < length; i++) {
    words.push(randomWord());
  }
  return capitalize(words.join(' ')) + '.';
}

function generateParagraph(): string {
  const sentenceCount = randomInt(4, 8);
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(' ');
}

/**
 * Generate lorem ipsum placeholder text.
 */
export const generateLoremIpsum = (options: Partial<LoremOptions> = {}): string => {
  const { count = 3, unit = 'paragraphs', startWithLorem = true } = options;

  if (count <= 0) return '';

  switch (unit) {
    case 'paragraphs': {
      const paragraphs: string[] = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph());
      }
      if (startWithLorem && paragraphs.length > 0) {
        const rest = paragraphs[0].split('. ').slice(1).join('. ');
        paragraphs[0] = rest ? `${LOREM_OPENING} ${rest}` : LOREM_OPENING;
      }
      return paragraphs.join('\n\n');
    }

    case 'sentences': {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence());
      }
      if (startWithLorem && sentences.length > 0) {
        sentences[0] = LOREM_OPENING;
      }
      return sentences.join(' ');
    }

    case 'words': {
      const words: string[] = [];
      for (let i = 0; i < count; i++) {
        words.push(randomWord());
      }
      if (startWithLorem && words.length >= 2) {
        words[0] = 'lorem';
        words[1] = 'ipsum';
      } else if (startWithLorem && words.length === 1) {
        words[0] = 'lorem';
      }
      return words.join(' ');
    }

    default:
      return '';
  }
};
