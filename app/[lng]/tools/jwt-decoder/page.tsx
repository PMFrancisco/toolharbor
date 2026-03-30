import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { JwtDecoderTool } from './JwtDecoderTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'JWT Decoder',
  description:
    'Decode and inspect JSON Web Tokens online. View JWT header, payload, and claims with expiration checking. Free and private.',
  slug: 'jwt-decoder',
  keywords: ['jwt', 'json web token', 'decoder', 'parser', 'token inspector', 'authentication'],
});

export default function JwtDecoderPage() {
  return <JwtDecoderTool />;
}
