import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { tools } from '@/lib/tools-registry';
import { ToolsDirectory } from '@/components/ToolsDirectory';

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
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          All Developer Tools
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Free online tools to help you code faster. No sign-up, no tracking, just tools that work.
        </p>
      </header>

      {/* Interactive Tools Directory */}
      <ToolsDirectory tools={tools} />
    </main>
  );
}
