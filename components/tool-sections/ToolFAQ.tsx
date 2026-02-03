'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolFAQProps {
  items: FAQItem[];
}

export function ToolFAQ({ items }: ToolFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.question}</span>
              <span className="ml-4 shrink-0 text-zinc-500">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4">
                <p className="text-zinc-600 dark:text-zinc-400">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
