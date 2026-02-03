import Link from 'next/link';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  relatedTools?: { name: string; href: string }[];
}

export function ToolLayout({ title, description, children, relatedTools }: ToolLayoutProps) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* Tool Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      {/* Tool UI */}
      <div className="mb-12">{children}</div>

      {/* Related Tools */}
      {relatedTools && relatedTools.length > 0 && (
        <section className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
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
