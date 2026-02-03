export interface UrlEncodeSuccess {
  success: true;
  data: string;
}

export interface UrlEncodeError {
  success: false;
  error: string;
}

export type UrlResult = UrlEncodeSuccess | UrlEncodeError;

/**
 * URL encode a string
 */
export function encodeUrl(input: string): UrlResult {
  if (!input) {
    return { success: true, data: '' };
  }

  try {
    return { success: true, data: encodeURIComponent(input) };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to encode URL',
    };
  }
}

/**
 * URL decode a string
 */
export function decodeUrl(input: string): UrlResult {
  if (!input) {
    return { success: true, data: '' };
  }

  try {
    return { success: true, data: decodeURIComponent(input) };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to decode URL - invalid encoding',
    };
  }
}

/**
 * Encode entire URL (preserving structure)
 */
export function encodeFullUrl(input: string): UrlResult {
  if (!input) {
    return { success: true, data: '' };
  }

  try {
    return { success: true, data: encodeURI(input) };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to encode URL',
    };
  }
}

/**
 * Decode entire URL
 */
export function decodeFullUrl(input: string): UrlResult {
  if (!input) {
    return { success: true, data: '' };
  }

  try {
    return { success: true, data: decodeURI(input) };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to decode URL',
    };
  }
}

/**
 * Parse URL into components
 */
export function parseUrl(input: string): {
  success: boolean;
  data?: {
    protocol: string;
    host: string;
    pathname: string;
    search: string;
    hash: string;
    params: Record<string, string>;
  };
  error?: string;
} {
  if (!input.trim()) {
    return { success: false, error: 'Please enter a URL' };
  }

  try {
    const url = new URL(input);
    const params: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return {
      success: true,
      data: {
        protocol: url.protocol,
        host: url.host,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        params,
      },
    };
  } catch {
    return { success: false, error: 'Invalid URL format' };
  }
}
