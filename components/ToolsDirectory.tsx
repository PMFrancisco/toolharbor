'use client';

import { useState, useMemo } from 'react';
import { Input, CategoryFilter } from '@/components/ui';
import { ToolCard } from './ToolCard';
import type { Tool, ToolCategory } from '@/lib/tools-registry';

interface ToolsDirectoryProps {
  tools: Tool[];
  initialCategory?: string | null;
}

export function ToolsDirectory({ tools, initialCategory = null }: ToolsDirectoryProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  const categories = useMemo(() => {
    return Array.from(new Set(tools.map((t) => t.category))).sort();
  }, [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      if (selectedCategory && tool.category !== selectedCategory) {
        return false;
      }

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
        <div className="mx-auto max-w-2xl">
          <Input
            placeholder="Search tools (e.g., json, base64, converter)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 text-base shadow-sm"
          />
        </div>

        <CategoryFilter
          options={categories.map((cat) => ({ value: cat, label: cat }))}
          value={selectedCategory}
          onChange={setSelectedCategory}
          allLabel="All Tools"
          className="justify-center"
        />
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
