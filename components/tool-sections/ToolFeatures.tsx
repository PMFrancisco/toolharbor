interface ToolFeaturesProps {
  features: string[];
}

export function ToolFeatures({ features }: ToolFeaturesProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Features</h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1 text-green-600">✓</span>
            <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
