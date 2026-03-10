import { tools, type Tool } from './tools-registry';

interface RelatedTool {
  name: string;
  href: string;
}

function seededShuffle(items: Tool[], seed: string): Tool[] {
  let hash = 0;
  for (const ch of seed) hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;

  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    hash = (hash * 16807 + 11) % 2147483647;
    const j = Math.abs(hash) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRelatedTools(
  currentSlug: string,
  manualPicks: RelatedTool[] = [],
  count = 5
): RelatedTool[] {
  if (manualPicks.length >= count) return manualPicks.slice(0, count);

  const current = tools.find((t) => t.slug === currentSlug);
  if (!current) return manualPicks;

  const manualSlugs = new Set(manualPicks.map((t) => t.href.replace('/tools/', '')));

  const candidates = tools.filter((t) => t.slug !== currentSlug && !manualSlugs.has(t.slug));

  const sameCategory = seededShuffle(
    candidates.filter((t) => t.category === current.category),
    currentSlug
  );
  const otherCategory = seededShuffle(
    candidates.filter((t) => t.category !== current.category),
    currentSlug
  );

  const autoFill = [...sameCategory, ...otherCategory]
    .slice(0, count - manualPicks.length)
    .map((t) => ({ name: t.name, href: `/tools/${t.slug}` }));

  return [...manualPicks, ...autoFill];
}
