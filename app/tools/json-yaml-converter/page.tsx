import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { JsonYamlConverterTool } from './JsonYamlConverterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'JSON to YAML Converter',
  description:
    'Convert JSON to YAML and YAML to JSON online. Free converter for configuration files, API data, and DevOps workflows.',
  slug: 'json-yaml-converter',
  keywords: ['json', 'yaml', 'converter', 'config', 'kubernetes', 'docker', 'devops'],
});

export default function JsonYamlConverterPage() {
  return <JsonYamlConverterTool />;
}
