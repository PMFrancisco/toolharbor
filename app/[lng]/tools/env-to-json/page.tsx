import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { EnvToJsonTool } from './EnvToJsonTool';

export const metadata: Metadata = generateToolMetadata({
  name: '.env to JSON Converter',
  description:
    'Convert .env environment variable files to JSON format and back. Free online converter.',
  slug: 'env-to-json',
  keywords: ['env', 'dotenv', 'json', 'converter', 'environment variables', '.env to json'],
});

export default function EnvToJsonPage() {
  return <EnvToJsonTool />;
}
