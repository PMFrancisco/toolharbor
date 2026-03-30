import Link from 'next/link';
import { JsonLd, ToolCard } from '@/components';
import { generateWebsiteJsonLd, generateWebApplicationJsonLd } from '@/lib/seo';
import { tools, type ToolWorkflow } from '@/lib/tools-registry';

const workflowDescriptions: Record<string, { tagline: string; icon: string }> = {
  'Data Inspection & Formatting': {
    tagline: 'Format, validate, diff, and flatten JSON and structured data.',
    icon: '{ }',
  },
  'Auth & Encoding': {
    tagline: 'Decode JWTs, encode Base64, and escape strings safely.',
    icon: '🔑',
  },
  'Request Debugging': {
    tagline: 'Parse URLs, inspect headers, and convert cURL to fetch.',
    icon: '⇄',
  },
  'Patterns & Scheduling': {
    tagline: 'Test regex patterns, parse cron expressions, and convert timestamps.',
    icon: '.*',
  },
};

const coreWorkflows: ToolWorkflow[] = [
  'Data Inspection & Formatting',
  'Auth & Encoding',
  'Request Debugging',
  'Patterns & Scheduling',
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <JsonLd data={[generateWebsiteJsonLd(), generateWebApplicationJsonLd()]} />

      {/* Hero */}
      <section className="mb-20 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
          Fast browser tools for developers
          <br className="hidden sm:block" />
          <span className="text-primary">working with data, APIs, and debugging.</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Inspect JSON, decode tokens, parse URLs, convert formats.
          <br />
          Everything runs locally in your browser — no data leaves your machine.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/tools"
            className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Browse All Tools
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            About ToolHarbor
          </Link>
        </div>
      </section>

      {/* Core Workflow Sections */}
      {coreWorkflows.map((workflow) => {
        const info = workflowDescriptions[workflow];
        const workflowTools = tools.filter((t) => t.workflow === workflow && t.tier === 'core');
        if (workflowTools.length === 0) return null;

        return (
          <section key={workflow} className="mb-16">
            <div className="mb-6">
              <div className="mb-1 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 font-mono text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  aria-hidden="true"
                >
                  {info.icon}
                </span>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{workflow}</h2>
              </div>
              <p className="ml-12 text-sm text-zinc-500 dark:text-zinc-400">{info.tagline}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {workflowTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}

      {/* View all tools link */}
      <div className="mb-20 text-center">
        <Link href="/tools" className="text-primary text-sm font-medium hover:underline">
          View all {tools.length} tools →
        </Link>
      </div>

      {/* Why ToolHarbor */}
      <section className="mb-20">
        <h2 className="mb-8 text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Why developers use ToolHarbor
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Runs locally',
              text: 'All processing happens in your browser. Your data never leaves your machine.',
            },
            {
              title: 'No sign-up',
              text: 'No accounts, no login walls, no tracking. Open a tool and start working.',
            },
            {
              title: 'Fast & focused',
              text: 'Lightweight tools built for developer workflows — not bloated with ads or upsells.',
            },
            {
              title: 'Open source',
              text: 'The full source code is public on GitHub. Inspect it, contribute, or fork it.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supporting workflows preview */}
      <section>
        <h2 className="mb-8 text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          More tools for every workflow
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {(
            [
              'Format Conversion',
              'Code & Markup',
              'Crypto & Hashing',
              'General Utilities',
            ] as ToolWorkflow[]
          ).map((workflow) => {
            const count = tools.filter((t) => t.workflow === workflow).length;
            return (
              <Link
                key={workflow}
                href={`/tools?workflow=${encodeURIComponent(workflow)}`}
                className="group flex flex-col items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-center transition-all hover:bg-white hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                <span className="font-medium text-zinc-700 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-100">
                  {workflow}
                </span>
                <span className="mt-1 text-xs text-zinc-400">{count} tools</span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
