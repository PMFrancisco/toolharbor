import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { CronParserTool } from './CronParserTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Cron Expression Parser',
  description:
    'Parse and explain cron expressions in plain English. See next run times for any cron schedule.',
  slug: 'cron-parser',
  keywords: ['cron', 'cron parser', 'cron expression', 'crontab', 'explain cron', 'cron schedule'],
});

export default function CronParserPage() {
  return <CronParserTool />;
}
