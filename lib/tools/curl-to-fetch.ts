export type CurlToFetchResult = { success: true; data: string } | { success: false; error: string };

interface ParsedCurl {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
  isFormData?: boolean;
}

/**
 * Tokenize a curl command string, handling quoted strings
 */
function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let inSingle = false;
  let inDouble = false;
  let escaped = false;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (escaped) {
      current += ch;
      escaped = false;
      continue;
    }

    if (ch === '\\' && !inSingle) {
      escaped = true;
      continue;
    }

    if (ch === "'" && !inDouble) {
      inSingle = !inSingle;
      continue;
    }

    if (ch === '"' && !inSingle) {
      inDouble = !inDouble;
      continue;
    }

    if (/\s/.test(ch) && !inSingle && !inDouble) {
      if (current) {
        tokens.push(current);
        current = '';
      }
      continue;
    }

    current += ch;
  }

  if (current) tokens.push(current);
  return tokens;
}

/**
 * Parse a curl command into its components
 */
function parseCurl(input: string): ParsedCurl {
  // Normalize: remove line continuations and extra whitespace
  let cmd = input
    .replace(/\\\s*\n/g, ' ')
    .replace(/\\\s*\r\n/g, ' ')
    .trim();

  // Remove leading 'curl' keyword
  if (cmd.toLowerCase().startsWith('curl')) {
    cmd = cmd.slice(4).trim();
  }

  const tokens = tokenize(cmd);
  const result: ParsedCurl = {
    url: '',
    method: 'GET',
    headers: {},
  };

  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];

    if (token === '-X' || token === '--request') {
      i++;
      if (i < tokens.length) result.method = tokens[i].toUpperCase();
    } else if (token === '-H' || token === '--header') {
      i++;
      if (i < tokens.length) {
        const header = tokens[i];
        const colonIdx = header.indexOf(':');
        if (colonIdx > 0) {
          const key = header.slice(0, colonIdx).trim();
          const value = header.slice(colonIdx + 1).trim();
          result.headers[key] = value;
        }
      }
    } else if (
      token === '-d' ||
      token === '--data' ||
      token === '--data-raw' ||
      token === '--data-binary'
    ) {
      i++;
      if (i < tokens.length) {
        result.body = tokens[i];
        if (result.method === 'GET') result.method = 'POST';
      }
    } else if (token === '--data-urlencode') {
      i++;
      if (i < tokens.length) {
        result.body = tokens[i];
        result.isFormData = true;
        if (result.method === 'GET') result.method = 'POST';
      }
    } else if (token === '-u' || token === '--user') {
      i++;
      if (i < tokens.length) {
        const encoded = btoa(tokens[i]);
        result.headers['Authorization'] = `Basic ${encoded}`;
      }
    } else if (
      token === '-k' ||
      token === '--insecure' ||
      token === '-s' ||
      token === '--silent' ||
      token === '-S' ||
      token === '--show-error' ||
      token === '-v' ||
      token === '--verbose' ||
      token === '-L' ||
      token === '--location' ||
      token === '-i' ||
      token === '--include' ||
      token === '--compressed'
    ) {
      // Skip flags without values
    } else if (token.startsWith('-')) {
      // Unknown flag — skip it and its potential value
      if (i + 1 < tokens.length && !tokens[i + 1].startsWith('-')) {
        i++;
      }
    } else {
      // Must be the URL
      result.url = token;
    }

    i++;
  }

  return result;
}

/**
 * Generate fetch code from parsed curl
 */
function generateFetch(parsed: ParsedCurl): string {
  const lines: string[] = [];
  const hasHeaders = Object.keys(parsed.headers).length > 0;
  const hasBody = !!parsed.body;
  const isSimpleGet = parsed.method === 'GET' && !hasHeaders && !hasBody;

  if (isSimpleGet) {
    lines.push(`const response = await fetch("${parsed.url}");`);
    lines.push('const data = await response.json();');
    return lines.join('\n');
  }

  lines.push(`const response = await fetch("${parsed.url}", {`);
  lines.push(`  method: "${parsed.method}",`);

  if (hasHeaders) {
    lines.push('  headers: {');
    const entries = Object.entries(parsed.headers);
    entries.forEach(([key, value], idx) => {
      const comma = idx < entries.length - 1 ? ',' : '';
      lines.push(`    "${key}": "${value}"${comma}`);
    });
    lines.push('  },');
  }

  if (hasBody) {
    // Try to detect if it's JSON
    let bodyStr: string;
    try {
      const bodyObj = JSON.parse(parsed.body!);
      bodyStr = `JSON.stringify(${JSON.stringify(bodyObj, null, 2)
        .split('\n')
        .map((l, i) => (i === 0 ? l : '  ' + l))
        .join('\n')})`;
    } catch {
      bodyStr = `"${parsed.body!.replace(/"/g, '\\"')}"`;
    }
    lines.push(`  body: ${bodyStr},`);
  }

  lines.push('});');
  lines.push('');
  lines.push('const data = await response.json();');

  return lines.join('\n');
}

/**
 * Convert a curl command to JavaScript fetch code
 */
export function curlToFetch(input: string): CurlToFetchResult {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  try {
    const parsed = parseCurl(input);

    if (!parsed.url) {
      return { success: false, error: 'Could not find a URL in the curl command' };
    }

    const code = generateFetch(parsed);
    return { success: true, data: code };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to parse curl command',
    };
  }
}
