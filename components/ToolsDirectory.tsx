'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui';
import { ToolCard } from './ToolCard';
import type { Tool, ToolCategory } from '@/lib/tools-registry';

interface ToolsDirectoryProps {
  tools: Tool[];
}

function ToolsDirectoryContent({ tools }: ToolsDirectoryProps) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl || null);

  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(tools.map((t) => t.category))).sort();
  }, [tools]);

  // Filter tools based on search query and selected category
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // Category filter
      if (selectedCategory && tool.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (search) {
        const query = search.toLowerCase();
        return (
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [tools, search, selectedCategory]);

  // Group tools by category
  const groupedTools = useMemo(() => {
    const groups: Record<ToolCategory, Tool[]> = {} as Record<ToolCategory, Tool[]>;

    filteredTools.forEach((tool) => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }
      groups[tool.category].push(tool);
    });

    return groups;
  }, [filteredTools]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="mx-auto max-w-2xl">
          <Input
            placeholder="Search tools (e.g., json, base64, converter)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 text-base shadow-sm"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
            }`}
          >
            All Tools
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredTools.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            No tools found matching &ldquo;{search}&rdquo;
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory(null);
            }}
            className="text-primary mt-4 text-sm font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(groupedTools).map(([category, categoryTools]) => (
            <section key={category}>
              <h2 className="mb-6 border-b border-zinc-200 pb-2 text-xl font-semibold text-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
                {category}
                <span className="ml-2 text-sm font-normal text-zinc-500">
                  ({categoryTools.length})
                </span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export function ToolsDirectory({ tools }: ToolsDirectoryProps) {
  return (
    <Suspense
      fallback={
        <div className="space-y-8">
          <div className="mx-auto max-w-2xl">
            <div className="h-12 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            ))}
          </div>
        </div>
      }
    >
      <ToolsDirectoryContent tools={tools} />
    </Suspense>
  );
}
