export const toolInfo = {
  name: 'Password Generator',
  description:
    'Generate strong, secure random passwords with customizable length and character options.',
  slug: 'password-generator',
};

export const relatedTools = [
  { name: 'UUID Generator', href: '/tools/uuid-generator' },
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
  { name: 'JWT Generator', href: '/tools/jwt-generator' },
];

export const features = [
  'Cryptographically secure randomness using Web Crypto API',
  'Customizable length from 4 to 128 characters',
  'Toggle uppercase, lowercase, numbers, and symbols independently',
  'Exclude ambiguous characters (O, 0, l, 1, I) for readability',
  'Real-time entropy analysis with strength indicator and crack time estimate',
  'Bulk generation — create up to 25 passwords at once',
];

export const howToSteps = [
  'Set the desired password length using the slider (default is 16)',
  'Choose which character types to include: uppercase, lowercase, numbers, symbols',
  'Optionally enable "Exclude Ambiguous" to avoid confusing characters like O/0 and l/1',
  'Click "Generate" to create your passwords',
  'Copy individual passwords or use "Copy All" for bulk generation',
];

export const examples = [
  {
    title: 'Strong 16-character password',
    input: 'Length: 16 | Uppercase, Lowercase, Numbers',
    output: 'kR7mXp2vNq4bYw9T',
  },
  {
    title: 'Maximum security with symbols',
    input: 'Length: 32 | All character types enabled',
    output: 'aG3$kP!mX7@nR2&vBq9#wL5*yT8^zF0',
  },
  {
    title: 'Readable password (no ambiguous)',
    input: 'Length: 20 | Exclude Ambiguous enabled',
    output: 'FhX3nRv7KbWq9YmT2pZs',
  },
];

export const explanation = {
  title: 'Why Use a Random Password Generator?',
  content: [
    'Passwords are the first line of defense for your online accounts, servers, and sensitive data. Weak or reused passwords are responsible for the majority of data breaches. A random password generator creates truly unpredictable credentials that are virtually impossible to guess through brute force or dictionary attacks, giving you a critical security advantage.',
    "This tool uses the Web Crypto API (crypto.getRandomValues) to produce cryptographically secure random numbers. Unlike Math.random(), which is predictable and unsuitable for security purposes, the Web Crypto API draws from the operating system's entropy source. Every password generated here is as random as the hardware allows, making it suitable for production systems, databases, API keys, and personal accounts.",
    'Password entropy — measured in bits — quantifies how unpredictable a password is. A 16-character password using uppercase, lowercase, and numbers has about 95 bits of entropy, meaning an attacker with a GPU cluster doing 10 billion guesses per second would need millions of years to crack it. The strength indicator on each generated password gives you an instant visual assessment of how secure your choice is.',
    'For best security practices, use a unique password for every account, aim for at least 16 characters, and include multiple character types. If you need passwords that are easy to read or type (for example, WiFi passwords shared verbally), enable the "Exclude Ambiguous" option to remove characters that look similar, like O/0 and l/1/I. Store your passwords in a reputable password manager rather than writing them down or reusing them.',
    'All passwords are generated entirely in your browser. Nothing is sent to any server, stored in any database, or logged anywhere. You can even use this tool offline once the page has loaded. For organizations handling sensitive infrastructure, client-side generation ensures your credentials never leave your machine.',
  ],
};

export const faqItems = [
  {
    question: 'How long should my password be?',
    answer:
      'For most purposes, 16 characters is a strong minimum. For highly sensitive accounts or encryption keys, aim for 24–32 characters. Longer passwords exponentially increase the time needed for brute-force attacks.',
  },
  {
    question: 'Is this password generator secure?',
    answer:
      'Yes. It uses crypto.getRandomValues(), the Web Crypto API built into modern browsers, which provides cryptographically secure random numbers. Passwords are generated entirely in your browser and never transmitted over the network.',
  },
  {
    question: 'What does "entropy" mean for passwords?',
    answer:
      'Entropy measures the unpredictability of a password in bits. Higher entropy means more possible combinations an attacker must try. A password with 80+ bits of entropy is considered strong against modern hardware. The formula is: entropy = length × log₂(charset size).',
  },
  {
    question: 'Should I include symbols in my passwords?',
    answer:
      'Including symbols increases the character set size and therefore the entropy per character. However, some systems restrict which symbols are allowed. If a service limits special characters, focus on increasing the password length instead — length is more effective than complexity.',
  },
  {
    question: 'How should I store generated passwords?',
    answer:
      'Use a reputable password manager like Bitwarden, 1Password, or KeePass. Never store passwords in plain text files, emails, or sticky notes. A password manager encrypts your vault and lets you use a unique, strong password for every account without memorizing each one.',
  },
];
