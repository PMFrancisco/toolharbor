import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { PasswordGeneratorTool } from './PasswordGeneratorTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Password Generator',
  description:
    'Generate strong, secure random passwords online. Customize length and characters with entropy analysis.',
  slug: 'password-generator',
  keywords: [
    'password generator',
    'random password',
    'secure password',
    'strong password',
    'password creator',
  ],
});

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorTool />;
}
