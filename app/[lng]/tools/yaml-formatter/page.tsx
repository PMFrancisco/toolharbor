import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { YamlFormatterTool } from './YamlFormatterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'YAML Formatter',
  description:
    'Format, validate, and beautify YAML data online. Free YAML formatter with key sorting and customizable indentation.',
  slug: 'yaml-formatter',
  keywords: ['yaml', 'formatter', 'beautifier', 'validator', 'prettifier', 'indentation'],
});

export default function YamlFormatterPage() {
  return <YamlFormatterTool />;
}
