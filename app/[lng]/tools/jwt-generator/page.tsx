import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { JwtGeneratorTool } from './JwtGeneratorTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'JWT Generator',
  description:
    'Generate and sign JSON Web Tokens (JWT) for testing. Create HS256, HS384, HS512 tokens instantly.',
  slug: 'jwt-generator',
  keywords: ['jwt generator', 'jwt creator', 'sign jwt', 'jwt token generator', 'json web token'],
});

export default function JwtGeneratorPage() {
  return <JwtGeneratorTool />;
}
