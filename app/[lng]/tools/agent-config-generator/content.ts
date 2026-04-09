export const toolInfo = {
  name: 'AI Agent Config Generator',
  description:
    'Generate config files for AI coding agents — CLAUDE.md, .cursorrules, copilot-instructions.md, .windsurfrules, and AGENTS.md.',
  slug: 'agent-config-generator',
};

export const relatedTools = [
  { name: 'Prompt Template Formatter', href: '/tools/prompt-template-formatter' },
  { name: 'LLM Token Counter', href: '/tools/token-counter' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
];

export const features = [
  'Generate config files for 5 AI coding agents at once',
  'Supports Claude Code (CLAUDE.md), Cursor (.cursorrules), GitHub Copilot, Windsurf, and Codex (AGENTS.md)',
  'Pick your framework, language, styling, package manager, and test runner',
  'Toggle coding conventions with checkboxes',
  'Quick-start presets for common stacks (Next.js, React + Vite, Astro, Express)',
  'Copy individual files or all configs at once',
];

export const howToSteps = [
  'Choose a preset or manually select your tech stack from the dropdowns',
  'Toggle the coding conventions that match your project style',
  'Switch between tabs to preview each config file',
  'Copy individual files with the copy button next to the filename',
  'Use "Copy All" to get every config file in one clipboard paste',
];

export const examples = [
  {
    title: 'Next.js + TypeScript project',
    input: 'Framework: Next.js | Language: TypeScript | Styling: Tailwind | PM: npm',
    output:
      'Generates CLAUDE.md, .cursorrules, copilot-instructions.md, .windsurfrules, and AGENTS.md with your stack details, conventions, and commands.',
  },
  {
    title: 'Express API backend',
    input: 'Framework: Express | Language: TypeScript | Testing: Jest | PM: npm',
    output:
      'Generates config files with backend-focused conventions, no styling section, and test commands included.',
  },
];

export const explanation = {
  title: 'Why Generate AI Agent Config Files?',
  content: [
    'AI coding assistants like Claude Code, Cursor, GitHub Copilot, Windsurf, and Codex all support project-level configuration files that tell the AI about your tech stack, coding conventions, and project structure. These files dramatically improve the quality of AI-generated code by giving the assistant context it would otherwise have to guess.',
    'Each tool uses a different filename — Claude Code reads CLAUDE.md, Cursor looks for .cursorrules, GitHub Copilot checks .github/copilot-instructions.md, Windsurf reads .windsurfrules, and OpenAI Codex uses AGENTS.md. The content is largely the same: what stack you use, how you want code formatted, and what commands to run. This tool generates all five files from a single set of inputs.',
    'Without a config file, AI assistants default to generic patterns that may not match your project. They might suggest npm when you use pnpm, write class components when you use functional ones, or add semicolons when your codebase omits them. A config file eliminates these mismatches from the start.',
    'Presets let you generate configs instantly for common stacks. If you are starting a new Next.js project with TypeScript and Tailwind, one click gives you production-ready config files for every AI assistant your team might use. You can then customize the conventions to match your specific style.',
    'All generation happens in your browser. Your project details and conventions are never sent to any server. The generated files are standard Markdown that you can edit further before committing to your repository.',
  ],
};

export const faqItems = [
  {
    question: 'Which AI coding assistants are supported?',
    answer:
      'The tool generates config files for Claude Code (CLAUDE.md), Cursor (.cursorrules), GitHub Copilot (.github/copilot-instructions.md), Windsurf (.windsurfrules), and OpenAI Codex (AGENTS.md). These cover the most widely used AI coding assistants as of 2026.',
  },
  {
    question: 'Are the generated files identical?',
    answer:
      'The core content (stack, conventions, commands) is the same across all files since the information is universal. The filenames and minor formatting differences match what each tool expects. Claude Code and Codex files include a top-level heading, while .cursorrules and .windsurfrules start directly with the content.',
  },
  {
    question: 'Should I edit the generated files?',
    answer:
      'Yes — treat the output as a starting point. Add project-specific details like folder structure, naming patterns, API conventions, or deployment notes that are unique to your codebase. The more specific the config, the better the AI assistant performs.',
  },
  {
    question: 'Where do I put these files in my project?',
    answer:
      'CLAUDE.md, .cursorrules, .windsurfrules, and AGENTS.md go in the project root directory. The copilot-instructions.md file goes inside a .github folder in the root. All files should be committed to version control so the entire team benefits.',
  },
  {
    question: 'Do presets override my convention selections?',
    answer:
      'Yes. Clicking a preset replaces all current settings with the preset values, including conventions. You can then modify individual settings after applying a preset.',
  },
];
