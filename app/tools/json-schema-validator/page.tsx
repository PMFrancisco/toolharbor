import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { JsonSchemaValidatorTool } from './JsonSchemaValidatorTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'JSON Schema Validator',
  description:
    'Validate JSON data against a JSON Schema. Check if your JSON conforms to the expected structure.',
  slug: 'json-schema-validator',
  keywords: [
    'json schema',
    'json validator',
    'schema validation',
    'json schema validator',
    'validate json',
  ],
});

export default function JsonSchemaValidatorPage() {
  return <JsonSchemaValidatorTool />;
}
