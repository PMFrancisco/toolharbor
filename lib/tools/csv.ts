export interface CsvConvertSuccess {
  success: true;
  data: string;
}

export interface CsvConvertError {
  success: false;
  error: string;
}

export type CsvResult = CsvConvertSuccess | CsvConvertError;

/**
 * Parse a CSV string into an array of objects
 */
function parseCsv(csv: string, delimiter: string = ','): Record<string, string>[] {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) {
    throw new Error('CSV must have at least a header row and one data row');
  }

  const headers = parseCsvLine(lines[0], delimiter);
  const result: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const values = parseCsvLine(lines[i], delimiter);
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim() ?? '';
    });

    result.push(row);
  }

  return result;
}

/**
 * Parse a single CSV line handling quoted values
 */
function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        current += '"';
        i++; // Skip next quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === delimiter) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
  }

  result.push(current);
  return result;
}

/**
 * Convert CSV to JSON
 */
export function csvToJson(csv: string, delimiter: string = ','): CsvResult {
  if (!csv.trim()) {
    return { success: true, data: '[]' };
  }

  try {
    const data = parseCsv(csv, delimiter);
    return { success: true, data: JSON.stringify(data, null, 2) };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to parse CSV',
    };
  }
}

/**
 * Convert JSON array to CSV
 */
export function jsonToCsv(json: string, delimiter: string = ','): CsvResult {
  if (!json.trim()) {
    return { success: true, data: '' };
  }

  try {
    const data = JSON.parse(json);

    if (!Array.isArray(data)) {
      return { success: false, error: 'JSON must be an array of objects' };
    }

    if (data.length === 0) {
      return { success: true, data: '' };
    }

    // Get all unique keys from all objects
    const headers = new Set<string>();
    data.forEach((item) => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach((key) => headers.add(key));
      }
    });

    const headerArray = Array.from(headers);

    // Escape and quote CSV values
    const escapeCsvValue = (value: unknown): string => {
      if (value === null || value === undefined) return '';
      const str = typeof value === 'object' ? JSON.stringify(value) : String(value);
      if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const lines = [
      headerArray.map(escapeCsvValue).join(delimiter),
      ...data.map((row) =>
        headerArray.map((header) => escapeCsvValue(row[header])).join(delimiter)
      ),
    ];

    return { success: true, data: lines.join('\n') };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to parse JSON',
    };
  }
}
