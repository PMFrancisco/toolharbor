interface HowToUseProps {
  steps: string[];
}

export function HowToUse({ steps }: HowToUseProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">How to Use</h2>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
              {index + 1}
            </span>
            <span className="text-zinc-700 dark:text-zinc-300">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
