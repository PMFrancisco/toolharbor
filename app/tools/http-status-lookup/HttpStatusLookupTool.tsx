'use client';

import { useState, useMemo } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Input, Badge, CategoryFilter } from '@/components/ui';
import type { BadgeVariant } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { searchHttpStatus, categoryInfo, getCategories } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

// ─── Tool UI ──────────────────────────────────────────────────────────────────

function HttpStatusLookupUI() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const searchResults = useMemo(() => searchHttpStatus(search), [search]);

  const filteredCodes = useMemo(() => {
    if (!activeCategory) return searchResults;
    return searchResults.filter((s) => s.category === activeCategory);
  }, [searchResults, activeCategory]);

  const categories = getCategories();

  const categoryOptions = useMemo(
    () =>
      categories.map((cat) => ({
        value: cat,
        label: `${cat} ${categoryInfo[cat].label}`,
        count: searchResults.filter((s) => s.category === cat).length,
      })),
    [categories, searchResults]
  );

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search by code, name, or description... (e.g. 404, Not Found)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-base"
      />

      {/* Category filter */}
      <CategoryFilter
        options={categoryOptions}
        value={activeCategory}
        onChange={setActiveCategory}
        allLabel="All"
        allCount={searchResults.length}
      />

      {/* Results count */}
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Showing {filteredCodes.length} status code{filteredCodes.length !== 1 ? 's' : ''}
      </p>

      {/* Status code cards */}
      <div className="space-y-2">
        {filteredCodes.map((status) => {
          const catInfo = categoryInfo[status.category];
          return (
            <div
              key={status.code}
              className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="min-w-[4ch] font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {status.code}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{status.name}</h3>
                  <Badge variant={catInfo.variant as BadgeVariant}>
                    {status.category} {catInfo.label}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {status.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCodes.length === 0 && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">No status codes match your search.</p>
        </div>
      )}
    </div>
  );
}

// ─── Exported wrapper ─────────────────────────────────────────────────────────

export function HttpStatusLookupTool() {
  return (
    <>
      <JsonLd
        data={[
          generateToolJsonLd(toolInfo),
          generateBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
            { name: toolInfo.name, path: `/tools/${toolInfo.slug}` },
          ]),
        ]}
      />
      <ToolLayout
        title={toolInfo.name}
        description={toolInfo.description}
        toolUI={<HttpStatusLookupUI />}
        content={{
          features,
          howToSteps,
          examples,
          explanation,
          faqItems,
        }}
        relatedTools={relatedTools}
      />
    </>
  );
}
