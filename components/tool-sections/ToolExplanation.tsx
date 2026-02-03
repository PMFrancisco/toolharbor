interface ToolExplanationProps {
  title: string;
  content: string | string[];
}

export function ToolExplanation({ title, content }: ToolExplanationProps) {
  const paragraphs = Array.isArray(content) ? content : [content];

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
