export interface ImageInfo {
  format: string;
  mimeType: string;
  dataUrl: string;
  sizeBytes: number;
  sizeFormatted: string;
}

export type Base64ImageResult =
  | { success: true; data: ImageInfo }
  | { success: false; error: string };

const MIME_MAP: Record<string, string> = {
  'image/png': 'PNG',
  'image/jpeg': 'JPEG',
  'image/jpg': 'JPEG',
  'image/gif': 'GIF',
  'image/webp': 'WebP',
  'image/svg+xml': 'SVG',
  'image/bmp': 'BMP',
  'image/x-icon': 'ICO',
  'image/vnd.microsoft.icon': 'ICO',
  'image/tiff': 'TIFF',
  'image/avif': 'AVIF',
};

/**
 * Format byte size to human-readable string
 */
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Detect MIME type from base64 data by reading magic bytes
 */
function detectMimeFromBase64(base64: string): string | null {
  try {
    const bytes = atob(base64.slice(0, 16));
    const hex = Array.from(bytes, (c) => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');

    if (hex.startsWith('89504e47')) return 'image/png';
    if (hex.startsWith('ffd8ff')) return 'image/jpeg';
    if (hex.startsWith('47494638')) return 'image/gif';
    if (hex.startsWith('52494646') && hex.slice(16, 24) === '57454250') return 'image/webp';
    if (hex.startsWith('424d')) return 'image/bmp';
    if (hex.startsWith('00000100') || hex.startsWith('00000200')) return 'image/x-icon';

    // SVG detection (starts with < or whitespace then <)
    const text = atob(base64.slice(0, 100));
    if (text.trimStart().startsWith('<svg') || text.trimStart().startsWith('<?xml')) {
      return 'image/svg+xml';
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Check if a string is valid base64
 */
function isValidBase64(str: string): boolean {
  try {
    atob(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Parse base64 input (raw base64 or data URL) and return image info
 */
export function parseBase64Image(input: string): Base64ImageResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { success: false, error: 'Please enter a base64 string or data URL' };
  }

  let dataUrl: string;
  let mimeType: string;
  let base64Data: string;

  if (trimmed.startsWith('data:')) {
    // Full data URL
    const match = trimmed.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,([\s\S]+)$/);
    if (!match) {
      return {
        success: false,
        error: 'Invalid data URL format. Expected: data:image/type;base64,DATA',
      };
    }
    mimeType = match[1].toLowerCase();
    base64Data = match[2].replace(/\s/g, '');
    dataUrl = `data:${mimeType};base64,${base64Data}`;
  } else {
    // Raw base64 — strip whitespace and detect type
    base64Data = trimmed.replace(/\s/g, '');

    if (!isValidBase64(base64Data)) {
      return { success: false, error: 'Invalid base64 string. Could not decode the input.' };
    }

    const detected = detectMimeFromBase64(base64Data);
    if (!detected) {
      return {
        success: false,
        error:
          'Could not detect image format. Try using a full data URL (data:image/png;base64,...)',
      };
    }

    mimeType = detected;
    dataUrl = `data:${mimeType};base64,${base64Data}`;
  }

  const format = MIME_MAP[mimeType] || mimeType.replace('image/', '').toUpperCase();

  // Calculate size: base64 encodes 3 bytes as 4 chars
  const padding = (base64Data.match(/=+$/) || [''])[0].length;
  const sizeBytes = Math.floor((base64Data.length * 3) / 4) - padding;

  return {
    success: true,
    data: {
      format,
      mimeType,
      dataUrl,
      sizeBytes,
      sizeFormatted: formatSize(sizeBytes),
    },
  };
}

/**
 * Convert raw base64 to a full data URL
 */
export function toDataUrl(input: string): string | null {
  const trimmed = input.trim();
  if (trimmed.startsWith('data:')) return trimmed;

  const base64 = trimmed.replace(/\s/g, '');
  const mime = detectMimeFromBase64(base64);
  if (!mime) return null;

  return `data:${mime};base64,${base64}`;
}
