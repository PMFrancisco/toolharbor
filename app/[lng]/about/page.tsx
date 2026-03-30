import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';
import { tools } from '@/lib/tools-registry';
import {
  pageInfo,
  heading,
  intro,
  builtBy,
  principles,
  techStack,
  architecture,
  openSource,
  contact,
  backToTools,
} from './content';

const GITHUB_REPO = 'https://github.com/PMFrancisco/toolharbor';
const GITHUB_PROFILE = 'https://github.com/PMFrancisco';

export const metadata: Metadata = generatePageMetadata({
  title: pageInfo.title,
  description: pageInfo.description,
  path: '/about',
  keywords: pageInfo.keywords,
});

export default function AboutPage() {
  const toolCount = tools.length;
  const categories = [...new Set(tools.map((t) => t.category))].length;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {heading}
      </h1>

      <div className="space-y-6 text-zinc-600 dark:text-zinc-400">
        <p className="text-lg">
          ToolHarbor{' '}
          <strong className="text-zinc-900 dark:text-zinc-100">
            {intro.browserBased.replace('{count}', String(toolCount))}
          </strong>{' '}
          {intro.text.replace('{categories}', String(categories))}
        </p>

        <p>
          {builtBy.prefix}{' '}
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-hover font-medium underline"
          >
            Francisco Pérez Muñoz
          </a>
          {builtBy.text}
        </p>
      </div>

      {/* Principles */}
      <section className="mt-12">
        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {principles.heading}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.items.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">{p.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="mt-12">
        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {techStack.heading}
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
          {techStack.items.map((tech, i) => (
            <div
              key={tech.name}
              className={`flex items-center justify-between px-5 py-3 ${
                i !== techStack.items.length - 1
                  ? 'border-b border-zinc-200 dark:border-zinc-800'
                  : ''
              }`}
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{tech.name}</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">{tech.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {architecture.heading}
        </h2>
        <div className="space-y-3 text-zinc-600 dark:text-zinc-400">
          {architecture.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Open source */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {openSource.heading}
        </h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">{openSource.text}</p>
        <a
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          {openSource.button}
        </a>
      </section>

      {/* Contact */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {contact.heading}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          {contact.text}{' '}
          <a
            href={`${GITHUB_REPO}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-hover underline"
          >
            {contact.issueLink}
          </a>{' '}
          {contact.orReachOut}{' '}
          <a
            href="mailto:toolharbordev@gmail.com"
            className="text-primary hover:text-primary-hover underline"
          >
            toolharbordev@gmail.com
          </a>
          .
        </p>
      </section>

      <div className="mt-12 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <Link
          href="/tools"
          className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          {backToTools}
        </Link>
      </div>
    </main>
  );
}
