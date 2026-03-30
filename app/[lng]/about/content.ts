export const pageInfo = {
  title: 'About',
  description:
    'ToolHarbor is a curated collection of browser-based developer tools built by Francisco Pérez Muñoz. Open source, privacy-first, no sign-up required.',
  keywords: ['about toolharbor', 'developer tools', 'open source', 'browser tools'],
};

export const heading = 'About ToolHarbor';

export const intro = {
  browserBased: '{count} browser-based',
  text: 'developer tools across {categories} categories. Every tool is free, runs locally, and requires no sign-up.',
};

export const builtBy = {
  prefix: 'Built by',
  text: ', a developer based in Spain. This project started as a way to build the tools I actually needed while working — and to have a real, production-quality codebase to showcase how I approach software engineering.',
};

export const principles = {
  heading: 'Design principles',
  items: [
    {
      title: 'Client-side first',
      description:
        'Every tool runs in your browser. Your data never leaves your machine — there is no backend processing, no API calls, no telemetry.',
    },
    {
      title: 'No barriers',
      description:
        'No accounts, no login walls, no usage limits. Open a tool and start working. Developer tools should not require a sign-up flow.',
    },
    {
      title: 'Open source',
      description:
        'The entire codebase is public. You can inspect how every tool works, report issues, or contribute improvements.',
    },
    {
      title: 'Fast and focused',
      description:
        'Static site generation, minimal JavaScript, no heavy frameworks. Pages load fast and tools respond instantly.',
    },
  ],
};

export const techStack = {
  heading: 'Built with',
  items: [
    { name: 'Next.js', role: 'App Router with static generation' },
    { name: 'TypeScript', role: 'Strict mode, end to end' },
    { name: 'Tailwind CSS', role: 'Utility-first styling' },
    { name: 'Vercel', role: 'Hosting and edge delivery' },
  ],
};

export const architecture = {
  heading: 'Architecture',
  paragraphs: [
    'The project follows a registry-driven architecture. A single tool registry automatically propagates each tool to the index page, sitemap, homepage, and related-tool suggestions.',
    'Every tool follows the same three-file pattern: a server component for metadata, a client component for interactivity, and a content module for SEO text. Tool logic lives in pure functions with no React dependencies — separated from the UI and independently testable.',
    'The site is fully statically generated at build time. No server-side runtime, no database, no API routes.',
  ],
};

export const openSource = {
  heading: 'Open source',
  text: 'The full source code is available on GitHub. Contributions, issues, and feedback are welcome.',
  button: 'View on GitHub',
};

export const contact = {
  heading: 'Contact',
  text: 'Have feedback, found a bug, or want to suggest a tool? Open an',
  issueLink: 'issue on GitHub',
  orReachOut: 'or reach out at',
};

export const backToTools = '← Browse All Tools';
