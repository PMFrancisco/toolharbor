import Link from 'next/link';
import { Card, CardTitle, CardContent } from '@/components/ui';
import { JsonLd } from '@/components';
import { generateWebsiteJsonLd } from '@/lib/seo';

const tools = [
  {
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    href: '/tools/json-formatter',
  },
  {
    name: 'Base64 Encoder',
    description: 'Encode and decode Base64 strings',
    href: '/tools/base64-encoder',
  },
  {
    name: 'UUID Generator',
    description: 'Generate random UUIDs (v4)',
    href: '/tools/uuid-generator',
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <JsonLd data={generateWebsiteJsonLd()} />

      {/* Hero */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Free Developer Tools
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Fast, simple, and free online tools for developers. No login required. Works offline.
        </p>
      </section>

      {/* Tools Grid */}
      <section>
        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Popular Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full transition-colors hover:border-zinc-400 dark:hover:border-zinc-600">
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
