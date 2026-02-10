export type MimeCategory = 'application' | 'audio' | 'font' | 'image' | 'text' | 'video' | 'other';

export interface MimeType {
  extension: string;
  mimeType: string;
  category: MimeCategory;
  description: string;
}

export interface MimeCategoryInfo {
  label: string;
  variant: 'default' | 'info' | 'success' | 'warning' | 'error';
}

export const mimeCategoryInfo: Record<MimeCategory, MimeCategoryInfo> = {
  application: { label: 'Application', variant: 'info' },
  audio: { label: 'Audio', variant: 'success' },
  font: { label: 'Font', variant: 'default' },
  image: { label: 'Image', variant: 'warning' },
  text: { label: 'Text', variant: 'default' },
  video: { label: 'Video', variant: 'error' },
  other: { label: 'Other', variant: 'default' },
};

export const mimeTypes: MimeType[] = [
  // Application
  {
    extension: '.json',
    mimeType: 'application/json',
    category: 'application',
    description: 'JSON data',
  },
  {
    extension: '.xml',
    mimeType: 'application/xml',
    category: 'application',
    description: 'XML data',
  },
  {
    extension: '.pdf',
    mimeType: 'application/pdf',
    category: 'application',
    description: 'PDF document',
  },
  {
    extension: '.zip',
    mimeType: 'application/zip',
    category: 'application',
    description: 'ZIP archive',
  },
  {
    extension: '.gz',
    mimeType: 'application/gzip',
    category: 'application',
    description: 'Gzip archive',
  },
  {
    extension: '.tar',
    mimeType: 'application/x-tar',
    category: 'application',
    description: 'Tape archive',
  },
  {
    extension: '.7z',
    mimeType: 'application/x-7z-compressed',
    category: 'application',
    description: '7-Zip archive',
  },
  {
    extension: '.rar',
    mimeType: 'application/vnd.rar',
    category: 'application',
    description: 'RAR archive',
  },
  {
    extension: '.js',
    mimeType: 'application/javascript',
    category: 'application',
    description: 'JavaScript',
  },
  {
    extension: '.mjs',
    mimeType: 'application/javascript',
    category: 'application',
    description: 'JavaScript module',
  },
  {
    extension: '.wasm',
    mimeType: 'application/wasm',
    category: 'application',
    description: 'WebAssembly',
  },
  {
    extension: '.doc',
    mimeType: 'application/msword',
    category: 'application',
    description: 'Microsoft Word',
  },
  {
    extension: '.docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    category: 'application',
    description: 'Microsoft Word (OpenXML)',
  },
  {
    extension: '.xls',
    mimeType: 'application/vnd.ms-excel',
    category: 'application',
    description: 'Microsoft Excel',
  },
  {
    extension: '.xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    category: 'application',
    description: 'Microsoft Excel (OpenXML)',
  },
  {
    extension: '.ppt',
    mimeType: 'application/vnd.ms-powerpoint',
    category: 'application',
    description: 'Microsoft PowerPoint',
  },
  {
    extension: '.pptx',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    category: 'application',
    description: 'Microsoft PowerPoint (OpenXML)',
  },
  {
    extension: '.odt',
    mimeType: 'application/vnd.oasis.opendocument.text',
    category: 'application',
    description: 'OpenDocument text',
  },
  {
    extension: '.ods',
    mimeType: 'application/vnd.oasis.opendocument.spreadsheet',
    category: 'application',
    description: 'OpenDocument spreadsheet',
  },
  {
    extension: '.bin',
    mimeType: 'application/octet-stream',
    category: 'application',
    description: 'Binary data',
  },
  {
    extension: '.exe',
    mimeType: 'application/octet-stream',
    category: 'application',
    description: 'Windows executable',
  },
  {
    extension: '.dmg',
    mimeType: 'application/octet-stream',
    category: 'application',
    description: 'macOS disk image',
  },
  {
    extension: '.iso',
    mimeType: 'application/octet-stream',
    category: 'application',
    description: 'ISO disc image',
  },
  {
    extension: '.swf',
    mimeType: 'application/x-shockwave-flash',
    category: 'application',
    description: 'Adobe Flash',
  },
  {
    extension: '.rtf',
    mimeType: 'application/rtf',
    category: 'application',
    description: 'Rich Text Format',
  },
  {
    extension: '.yaml',
    mimeType: 'application/x-yaml',
    category: 'application',
    description: 'YAML data',
  },
  {
    extension: '.yml',
    mimeType: 'application/x-yaml',
    category: 'application',
    description: 'YAML data',
  },
  {
    extension: '.graphql',
    mimeType: 'application/graphql',
    category: 'application',
    description: 'GraphQL query',
  },
  {
    extension: '.sql',
    mimeType: 'application/sql',
    category: 'application',
    description: 'SQL query',
  },
  {
    extension: '.woff',
    mimeType: 'application/font-woff',
    category: 'font',
    description: 'Web Open Font Format',
  },
  {
    extension: '.woff2',
    mimeType: 'font/woff2',
    category: 'font',
    description: 'Web Open Font Format 2',
  },

  // Text
  { extension: '.html', mimeType: 'text/html', category: 'text', description: 'HTML document' },
  { extension: '.htm', mimeType: 'text/html', category: 'text', description: 'HTML document' },
  { extension: '.css', mimeType: 'text/css', category: 'text', description: 'CSS stylesheet' },
  {
    extension: '.csv',
    mimeType: 'text/csv',
    category: 'text',
    description: 'Comma-separated values',
  },
  { extension: '.txt', mimeType: 'text/plain', category: 'text', description: 'Plain text' },
  {
    extension: '.md',
    mimeType: 'text/markdown',
    category: 'text',
    description: 'Markdown document',
  },
  { extension: '.ts', mimeType: 'text/typescript', category: 'text', description: 'TypeScript' },
  { extension: '.tsx', mimeType: 'text/tsx', category: 'text', description: 'TypeScript JSX' },
  { extension: '.jsx', mimeType: 'text/jsx', category: 'text', description: 'React JSX' },
  { extension: '.ics', mimeType: 'text/calendar', category: 'text', description: 'iCalendar' },
  { extension: '.vcf', mimeType: 'text/vcard', category: 'text', description: 'vCard' },
  { extension: '.log', mimeType: 'text/plain', category: 'text', description: 'Log file' },
  {
    extension: '.env',
    mimeType: 'text/plain',
    category: 'text',
    description: 'Environment variables',
  },

  // Image
  { extension: '.png', mimeType: 'image/png', category: 'image', description: 'PNG image' },
  { extension: '.jpg', mimeType: 'image/jpeg', category: 'image', description: 'JPEG image' },
  { extension: '.jpeg', mimeType: 'image/jpeg', category: 'image', description: 'JPEG image' },
  { extension: '.gif', mimeType: 'image/gif', category: 'image', description: 'GIF image' },
  { extension: '.webp', mimeType: 'image/webp', category: 'image', description: 'WebP image' },
  {
    extension: '.svg',
    mimeType: 'image/svg+xml',
    category: 'image',
    description: 'SVG vector image',
  },
  { extension: '.ico', mimeType: 'image/x-icon', category: 'image', description: 'Icon format' },
  { extension: '.avif', mimeType: 'image/avif', category: 'image', description: 'AVIF image' },
  { extension: '.bmp', mimeType: 'image/bmp', category: 'image', description: 'Bitmap image' },
  { extension: '.tiff', mimeType: 'image/tiff', category: 'image', description: 'TIFF image' },
  { extension: '.tif', mimeType: 'image/tiff', category: 'image', description: 'TIFF image' },
  {
    extension: '.heic',
    mimeType: 'image/heic',
    category: 'image',
    description: 'HEIC image (Apple)',
  },
  { extension: '.heif', mimeType: 'image/heif', category: 'image', description: 'HEIF image' },

  // Audio
  { extension: '.mp3', mimeType: 'audio/mpeg', category: 'audio', description: 'MP3 audio' },
  { extension: '.wav', mimeType: 'audio/wav', category: 'audio', description: 'WAV audio' },
  { extension: '.ogg', mimeType: 'audio/ogg', category: 'audio', description: 'Ogg audio' },
  { extension: '.flac', mimeType: 'audio/flac', category: 'audio', description: 'FLAC audio' },
  { extension: '.aac', mimeType: 'audio/aac', category: 'audio', description: 'AAC audio' },
  { extension: '.m4a', mimeType: 'audio/mp4', category: 'audio', description: 'MPEG-4 audio' },
  { extension: '.weba', mimeType: 'audio/webm', category: 'audio', description: 'WebM audio' },
  { extension: '.midi', mimeType: 'audio/midi', category: 'audio', description: 'MIDI audio' },
  { extension: '.mid', mimeType: 'audio/midi', category: 'audio', description: 'MIDI audio' },

  // Video
  { extension: '.mp4', mimeType: 'video/mp4', category: 'video', description: 'MP4 video' },
  { extension: '.webm', mimeType: 'video/webm', category: 'video', description: 'WebM video' },
  { extension: '.avi', mimeType: 'video/x-msvideo', category: 'video', description: 'AVI video' },
  {
    extension: '.mov',
    mimeType: 'video/quicktime',
    category: 'video',
    description: 'QuickTime video',
  },
  {
    extension: '.mkv',
    mimeType: 'video/x-matroska',
    category: 'video',
    description: 'Matroska video',
  },
  { extension: '.flv', mimeType: 'video/x-flv', category: 'video', description: 'Flash video' },
  {
    extension: '.wmv',
    mimeType: 'video/x-ms-wmv',
    category: 'video',
    description: 'Windows Media Video',
  },
  { extension: '.m4v', mimeType: 'video/mp4', category: 'video', description: 'MPEG-4 video' },
  { extension: '.3gp', mimeType: 'video/3gpp', category: 'video', description: '3GPP video' },

  // Font
  { extension: '.ttf', mimeType: 'font/ttf', category: 'font', description: 'TrueType font' },
  { extension: '.otf', mimeType: 'font/otf', category: 'font', description: 'OpenType font' },
  {
    extension: '.eot',
    mimeType: 'application/vnd.ms-fontobject',
    category: 'font',
    description: 'Embedded OpenType',
  },
];

export function searchMimeTypes(query: string): MimeType[] {
  if (!query.trim()) return mimeTypes;
  const q = query.toLowerCase().trim();
  const qWithDot = q.startsWith('.') ? q : `.${q}`;
  return mimeTypes.filter(
    (m) =>
      m.extension.toLowerCase().includes(q) ||
      m.extension.toLowerCase() === qWithDot ||
      m.mimeType.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q)
  );
}

export function getMimeByExtension(ext: string): MimeType | undefined {
  const normalized = ext.startsWith('.') ? ext.toLowerCase() : `.${ext.toLowerCase()}`;
  return mimeTypes.find((m) => m.extension === normalized);
}

export function getMimeByType(type: string): MimeType[] {
  return mimeTypes.filter((m) => m.mimeType === type.toLowerCase());
}

export function getMimeCategories(): MimeCategory[] {
  return ['application', 'text', 'image', 'audio', 'video', 'font'];
}
