import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardTitle, CardContent } from '@/components/ui';
import { generatePageMetadata } from '@/lib/seo';
import { tools } from '@/lib/tools-registry';

export const metadata: Metadata = generatePageMetadata({
  title: 'All Developer Tools',
  description:
    'Browse all free online developer tools. JSON formatter, Base64 encoder, UUID generator, and more. Fast, simple, no login required.',
  path: '/tools',
  keywords: [
    'developer tools',
    'online tools',
    'free tools',
    'web tools',
    'programming tools',
    'code tools',
  ],
});

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          All Developer Tools
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Free online tools to help you code faster. No sign-up, no tracking, just tools that work.
        </p>
      </header>

      {/* Tools Grid */}
      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`}>
              <Card className="h-full transition-colors hover:border-zinc-400 dark:hover:border-zinc-600">
                <div className="mb-1">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
                    {tool.category}
                  </span>
                </div>
                <CardTitle>{tool.name}</CardTitle>
                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
