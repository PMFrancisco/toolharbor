export interface QueryParam {
  id: string;
  key: string;
  value: string;
}

/**
 * Generate a unique ID for a query parameter row.
 */
export const createParam = (key = '', value = ''): QueryParam => ({
  id: Math.random().toString(36).slice(2, 10),
  key,
  value,
});

/**
 * Build a query string from key-value pairs.
 */
export const buildQueryString = (baseUrl: string, params: QueryParam[]): string => {
  const validParams = params.filter((p) => p.key.trim());

  if (!baseUrl.trim() && validParams.length === 0) return '';

  const searchParams = new URLSearchParams();
  for (const param of validParams) {
    searchParams.append(param.key.trim(), param.value);
  }

  const query = searchParams.toString();
  const base = baseUrl.trim();

  if (!base) return query ? `?${query}` : '';
  if (!query) return base;

  // Remove existing query string from base if present
  const cleanBase = base.split('?')[0].split('#')[0];
  return `${cleanBase}?${query}`;
};

/**
 * Parse a URL or query string into key-value pairs.
 */
export const parseQueryString = (input: string): QueryParam[] => {
  if (!input.trim()) return [];

  try {
    // Extract query portion
    let queryPart = input;
    if (input.includes('?')) {
      queryPart = input.split('?').slice(1).join('?');
    }
    // Remove hash
    queryPart = queryPart.split('#')[0];

    if (!queryPart) return [];

    const params = new URLSearchParams(queryPart);
    const result: QueryParam[] = [];
    params.forEach((value, key) => {
      result.push(createParam(key, value));
    });
    return result;
  } catch {
    return [];
  }
};
