import Link from 'next/link';

interface RelatedTool {
  name: string;
  href: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  relatedTools?: RelatedTool[];
}

export function ToolLayout({ title, description, children, relatedTools }: ToolLayoutProps) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      {/* Tool Header */}
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{description}</p>
      </header>

      {/* Tool Content - sections are composed here */}
      <div className="space-y-10">{children}</div>

      {/* Related Tools */}
      {relatedTools && relatedTools.length > 0 && (
        <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Related Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
