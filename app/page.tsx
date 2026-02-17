import Link from 'next/link';
import { JsonLd, ToolCard } from '@/components';
import { generateWebsiteJsonLd, generateWebApplicationJsonLd } from '@/lib/seo';
import { getFeaturedTools, tools } from '@/lib/tools-registry';

export default function Home() {
  const featuredTools = getFeaturedTools();

  // Extract unique categories for the navigation section
  const categories = Array.from(new Set(tools.map((t) => t.category))).sort();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <JsonLd data={[generateWebsiteJsonLd(), generateWebApplicationJsonLd()]} />

      {/* Hero Section - Focus on Value Prop */}
      <section className="mb-20 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-100">
          Developer Tools <br className="hidden sm:block" />
          <span className="text-primary">Simplified.</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          A collection of free, fast, and privacy-focused tools.
          <br />
          Everything runs in your browser. No server uploads.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/tools"
            className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            View All Tools
          </Link>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="mb-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Featured Utilities
          </h2>
          <Link href="/tools" className="text-primary text-sm font-medium hover:underline">
            View all &rarr;
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Categories Section - "Hub" Navigation */}
      <section>
        <h2 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/tools?category=${category}`}
              className="group flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-center transition-all hover:bg-white hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <span className="font-medium text-zinc-700 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-100">
                {category}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
