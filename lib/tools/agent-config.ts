export interface AgentConfigOptions {
  framework: string;
  language: string;
  styling: string;
  packageManager: string;
  testRunner: string;
  conventions: string[];
}

export interface ConfigFile {
  filename: string;
  label: string;
  content: string;
}

export interface AgentConfigPreset {
  label: string;
  options: AgentConfigOptions;
}

export const FRAMEWORK_OPTIONS = [
  { value: 'nextjs', label: 'Next.js (App Router)' },
  { value: 'nextjs-pages', label: 'Next.js (Pages Router)' },
  { value: 'react-vite', label: 'React + Vite' },
  { value: 'astro', label: 'Astro' },
  { value: 'svelte', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'express', label: 'Express' },
  { value: 'fastify', label: 'Fastify' },
  { value: 'none', label: 'None / Custom' },
];

export const LANGUAGE_OPTIONS = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
];

export const STYLING_OPTIONS = [
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'css-modules', label: 'CSS Modules' },
  { value: 'styled-components', label: 'Styled Components' },
  { value: 'vanilla', label: 'Vanilla CSS' },
  { value: 'none', label: 'None' },
];

export const PACKAGE_MANAGER_OPTIONS = [
  { value: 'npm', label: 'npm' },
  { value: 'pnpm', label: 'pnpm' },
  { value: 'yarn', label: 'yarn' },
  { value: 'bun', label: 'bun' },
];

export const TEST_RUNNER_OPTIONS = [
  { value: 'vitest', label: 'Vitest' },
  { value: 'jest', label: 'Jest' },
  { value: 'playwright', label: 'Playwright' },
  { value: 'pytest', label: 'pytest' },
  { value: 'none', label: 'None' },
];

export const CONVENTION_OPTIONS = [
  { value: 'strict-types', label: 'Strict TypeScript (no any)' },
  { value: 'functional', label: 'Functional components only' },
  { value: 'no-classes', label: 'No classes' },
  { value: 'pure-functions', label: 'Pure functions in lib/' },
  { value: 'barrel-exports', label: 'Barrel exports (index.ts)' },
  { value: 'client-side-only', label: 'Client-side only (no backend)' },
  { value: 'no-default-exports', label: 'Named exports only' },
  { value: 'small-files', label: 'Small files (< 200 lines)' },
  { value: 'single-quotes', label: 'Single quotes' },
  { value: 'semicolons', label: 'Semicolons' },
  { value: 'trailing-commas', label: 'Trailing commas' },
  { value: '2-space-indent', label: '2-space indentation' },
];

export const CONFIG_PRESETS: AgentConfigPreset[] = [
  {
    label: 'Next.js + TypeScript',
    options: {
      framework: 'nextjs',
      language: 'typescript',
      styling: 'tailwind',
      packageManager: 'npm',
      testRunner: 'vitest',
      conventions: ['strict-types', 'functional', 'pure-functions', 'single-quotes', 'semicolons'],
    },
  },
  {
    label: 'React + Vite',
    options: {
      framework: 'react-vite',
      language: 'typescript',
      styling: 'tailwind',
      packageManager: 'pnpm',
      testRunner: 'vitest',
      conventions: ['strict-types', 'functional', 'small-files'],
    },
  },
  {
    label: 'Astro + Svelte',
    options: {
      framework: 'astro',
      language: 'typescript',
      styling: 'tailwind',
      packageManager: 'pnpm',
      testRunner: 'vitest',
      conventions: ['strict-types', 'small-files', 'single-quotes'],
    },
  },
  {
    label: 'Express API',
    options: {
      framework: 'express',
      language: 'typescript',
      styling: 'none',
      packageManager: 'npm',
      testRunner: 'jest',
      conventions: ['strict-types', 'pure-functions', 'barrel-exports', 'no-classes'],
    },
  },
];

function getFrameworkLabel(value: string): string {
  return FRAMEWORK_OPTIONS.find((f) => f.value === value)?.label || value;
}

function getLanguageLabel(value: string): string {
  return LANGUAGE_OPTIONS.find((l) => l.value === value)?.label || value;
}

function getStylingLabel(value: string): string {
  return STYLING_OPTIONS.find((s) => s.value === value)?.label || value;
}

function getPmLabel(value: string): string {
  return PACKAGE_MANAGER_OPTIONS.find((p) => p.value === value)?.label || value;
}

function getTestLabel(value: string): string {
  return TEST_RUNNER_OPTIONS.find((t) => t.value === value)?.label || value;
}

function getConventionLabels(values: string[]): string[] {
  return values.map((v) => CONVENTION_OPTIONS.find((c) => c.value === v)?.label || v);
}

function buildCoreSections(opts: AgentConfigOptions): string {
  const lines: string[] = [];

  lines.push('## Tech Stack', '');
  lines.push(`- Framework: ${getFrameworkLabel(opts.framework)}`);
  lines.push(`- Language: ${getLanguageLabel(opts.language)}`);
  if (opts.styling !== 'none') lines.push(`- Styling: ${getStylingLabel(opts.styling)}`);
  lines.push(`- Package Manager: ${getPmLabel(opts.packageManager)}`);
  if (opts.testRunner !== 'none') lines.push(`- Testing: ${getTestLabel(opts.testRunner)}`);

  if (opts.conventions.length > 0) {
    lines.push('', '## Conventions', '');
    for (const label of getConventionLabels(opts.conventions)) {
      lines.push(`- ${label}`);
    }
  }

  lines.push('', '## Commands', '');
  lines.push(`\`\`\`bash`);
  lines.push(`${opts.packageManager} install`);
  lines.push(`${opts.packageManager} run dev`);
  lines.push(`${opts.packageManager} run build`);
  if (opts.testRunner !== 'none') {
    lines.push(`${opts.packageManager} run test`);
  }
  lines.push(`\`\`\``);

  return lines.join('\n');
}

export function generateConfigFiles(opts: AgentConfigOptions): ConfigFile[] {
  const core = buildCoreSections(opts);

  const files: ConfigFile[] = [
    {
      filename: 'CLAUDE.md',
      label: 'Claude Code',
      content: `# CLAUDE.md\n\n${core}`,
    },
    {
      filename: '.cursorrules',
      label: 'Cursor',
      content: core,
    },
    {
      filename: '.github/copilot-instructions.md',
      label: 'GitHub Copilot',
      content: core,
    },
    {
      filename: '.windsurfrules',
      label: 'Windsurf',
      content: core,
    },
    {
      filename: 'AGENTS.md',
      label: 'Codex',
      content: `# AGENTS.md\n\n${core}`,
    },
  ];

  return files;
}

export function getDefaultOptions(): AgentConfigOptions {
  return {
    framework: 'nextjs',
    language: 'typescript',
    styling: 'tailwind',
    packageManager: 'npm',
    testRunner: 'vitest',
    conventions: [],
  };
}
