import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { UserAgentParserTool } from './UserAgentParserTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'User Agent Parser',
  description:
    'Parse user agent strings to identify browser, OS, device type, and rendering engine. Free online UA parser.',
  slug: 'user-agent-parser',
  keywords: [
    'user agent',
    'user agent parser',
    'ua parser',
    'browser detection',
    'user agent string',
  ],
});

export default function UserAgentParserPage() {
  return <UserAgentParserTool />;
}
