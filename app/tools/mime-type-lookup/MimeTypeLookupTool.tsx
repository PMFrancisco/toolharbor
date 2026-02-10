'use client';

import { useState, useMemo } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Input, Badge, CopyButton, CategoryFilter } from '@/components/ui';
import type { BadgeVariant } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { searchMimeTypes, mimeCategoryInfo, getMimeCategories } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function MimeTypeLookupUI() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const searchResults = useMemo(() => searchMimeTypes(search), [search]);

  const filteredTypes = useMemo(() => {
    if (!activeCategory) return searchResults;
    return searchResults.filter((m) => m.category === activeCategory);
  }, [searchResults, activeCategory]);

  const categories = getMimeCategories();

  const categoryOptions = useMemo(
    () =>
      categories
        .map((cat) => ({
          value: cat,
          label: mimeCategoryInfo[cat].label,
          count: searchResults.filter((m) => m.category === cat).length,
        }))
        .filter((opt) => opt.count > 0),
    [categories, searchResults]
  );

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search by extension, MIME type, or description... (e.g. .json, image/png)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-base"
      />

      {/* Category filter buttons */}
      <CategoryFilter
        options={categoryOptions}
        value={activeCategory}
        onChange={setActiveCategory}
        allLabel="All"
        allCount={searchResults.length}
      />

      {/* Results count */}
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Showing {filteredTypes.length} MIME type{filteredTypes.length !== 1 ? 's' : ''}
      </p>

      {/* MIME type cards */}
      <div className="space-y-2">
        {filteredTypes.map((mime, index) => {
          const catInfo = mimeCategoryInfo[mime.category];
          return (
            <div
              key={`${mime.extension}-${mime.mimeType}-${index}`}
              className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="min-w-[5ch] font-mono text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {mime.extension}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <code className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
                    {mime.mimeType}
                  </code>
                  <Badge variant={catInfo.variant as BadgeVariant}>{catInfo.label}</Badge>
                  <CopyButton text={mime.mimeType} size="sm" label="Copy" />
                </div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{mime.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTypes.length === 0 && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">No MIME types match your search.</p>
        </div>
      )}
    </div>
  );
}

export function MimeTypeLookupTool() {
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
        toolUI={<MimeTypeLookupUI />}
        content={{ features, howToSteps, examples, explanation, faqItems }}
        relatedTools={relatedTools}
      />
    </>
  );
}
