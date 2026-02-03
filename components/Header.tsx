import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          ToolHarbor
        </Link>
        <nav>
          <Link
            href="/tools"
            className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            All Tools
          </Link>
        </nav>
      </div>
    </header>
  );
}
