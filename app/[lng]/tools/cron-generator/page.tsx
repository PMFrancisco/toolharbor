import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { CronGeneratorTool } from './CronGeneratorTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Cron Expression Generator',
  description:
    'Generate cron expressions visually. Build crontab schedules with an easy-to-use interface.',
  slug: 'cron-generator',
  keywords: ['cron generator', 'cron builder', 'crontab generator', 'cron schedule builder'],
});

export default function CronGeneratorPage() {
  return <CronGeneratorTool />;
}
