import Link from 'next/link';
import { Card, CardTitle, CardContent } from '@/components/ui';
import type { Tool } from '@/lib/tools-registry';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`} className="group">
      <Card className="h-full transition-all group-hover:border-zinc-400 group-hover:shadow-md dark:group-hover:border-zinc-600">
        <div className="mb-2 flex items-start justify-between gap-2">
          <CardTitle className="text-base">{tool.name}</CardTitle>
          {tool.featured && (
            <span className="bg-badge-bg text-badge-text shrink-0 rounded-full px-2 py-0.5 text-xs font-medium">
              Featured
            </span>
          )}
        </div>
        <CardContent className="p-0">
          <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
            {tool.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
