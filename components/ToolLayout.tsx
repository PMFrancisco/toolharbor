import Link from 'next/link';
import {
  AdSlot,
  ToolFeatures,
  HowToUse,
  ToolExamples,
  ToolExplanation,
  ToolFAQ,
} from './tool-sections';

interface RelatedTool {
  name: string;
  href: string;
}

interface Example {
  title: string;
  input: string;
  output: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolContent {
  features: string[];
  howToSteps: string[];
  examples: Example[];
  explanation: {
    title: string;
    content: string | string[];
  };
  faqItems: FAQItem[];
}

interface AdSlotConfig {
  /** Ad slot ID from AdSense dashboard - shows after tool UI */
  afterToolUI?: string;
  /** Ad slot ID from AdSense dashboard - shows before related tools */
  beforeRelated?: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  /** The interactive tool UI component */
  toolUI: React.ReactNode;
  /** SEO content sections data */
  content: ToolContent;
  relatedTools?: RelatedTool[];
  /** Optional ad slot IDs - ads show in dev mode as placeholders */
  adSlots?: AdSlotConfig;
}

export function ToolLayout({
  title,
  description,
  toolUI,
  content,
  relatedTools,
  adSlots,
}: ToolLayoutProps) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      {/* Tool Header */}
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{description}</p>
      </header>

      {/* Tool UI - Always above the fold */}
      <section className="mb-10">{toolUI}</section>

      {/* Ad after tool UI */}
      <AdSlot slot={adSlots?.afterToolUI} format="horizontal" className="mb-10" />

      {/* SEO Content Sections */}
      <div className="space-y-10">
        <ToolFeatures features={content.features} />
        <HowToUse steps={content.howToSteps} />
        <ToolExamples examples={content.examples} />
        <ToolExplanation title={content.explanation.title} content={content.explanation.content} />
        <ToolFAQ items={content.faqItems} />
      </div>

      {/* Ad before related tools */}
      <AdSlot slot={adSlots?.beforeRelated} format="horizontal" className="mt-10" />

      {/* Related Tools */}
      {relatedTools && relatedTools.length > 0 && (
        <section className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
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
