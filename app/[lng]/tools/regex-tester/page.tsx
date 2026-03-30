import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { RegexTesterTool } from './RegexTesterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Regex Tester',
  description:
    'Test and debug regular expressions online. Real-time regex matching with highlighted results, capture groups, and JavaScript regex support.',
  slug: 'regex-tester',
  keywords: ['regex', 'regular expression', 'tester', 'pattern matching', 'regexp', 'validator'],
});

export default function RegexTesterPage() {
  return <RegexTesterTool />;
}
