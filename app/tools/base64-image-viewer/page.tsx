import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { Base64ImageViewerTool } from './Base64ImageViewerTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Base64 Image Viewer',
  description:
    'Preview base64 encoded images online. Paste a base64 string or data URL and see the image instantly with format, size, and dimensions.',
  slug: 'base64-image-viewer',
  keywords: [
    'base64 image viewer',
    'base64 to image',
    'base64 image preview',
    'data url viewer',
    'base64 decode image',
    'base64 image converter',
  ],
});

export default function Base64ImageViewerPage() {
  return <Base64ImageViewerTool />;
}
