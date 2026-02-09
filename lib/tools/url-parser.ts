export interface ParsedParam {
  key: string;
  value: string;
}

export interface ParsedUrl {
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
  params: ParsedParam[];
}

export interface UrlParseSuccess {
  success: true;
  data: ParsedUrl;
}

export interface UrlParseError {
  success: false;
  error: string;
}

export type UrlParseResult = UrlParseSuccess | UrlParseError;

/**
 * Parse a URL into its individual components.
 */
export const parseFullUrl = (input: string): UrlParseResult => {
  if (!input.trim()) {
    return { success: false, error: 'Please enter a URL to parse' };
  }

  try {
    const url = new URL(input);

    const params: ParsedParam[] = [];
    url.searchParams.forEach((value, key) => {
      params.push({ key, value });
    });

    return {
      success: true,
      data: {
        protocol: url.protocol,
        host: url.host,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        origin: url.origin,
        params,
      },
    };
  } catch {
    return {
      success: false,
      error: 'Invalid URL. Make sure it includes a protocol (e.g. https://)',
    };
  }
};
