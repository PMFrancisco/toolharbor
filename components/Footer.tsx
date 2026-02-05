import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} ToolHarbor. Free developer tools.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/privacy-policy"
              className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
