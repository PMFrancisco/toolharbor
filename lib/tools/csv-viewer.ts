import { parseCsvLine } from './csv';

export interface CsvTableData {
  headers: string[];
  rows: string[][];
  rowCount: number;
  columnCount: number;
}

export type CsvViewerResult =
  | { success: true; data: CsvTableData }
  | { success: false; error: string };

/**
 * Parse CSV into table data (headers + rows) for rendering
 */
export function parseCsvTable(
  input: string,
  options: { delimiter?: string; hasHeader?: boolean } = {}
): CsvViewerResult {
  const { delimiter = ',', hasHeader = true } = options;

  if (!input.trim()) {
    return { success: true, data: { headers: [], rows: [], rowCount: 0, columnCount: 0 } };
  }

  try {
    const lines = input
      .trim()
      .split(/\r?\n/)
      .filter((l) => l.trim());

    if (lines.length === 0) {
      return { success: false, error: 'No data found' };
    }

    const allRows = lines.map((line) => parseCsvLine(line, delimiter));
    const columnCount = Math.max(...allRows.map((r) => r.length));

    // Normalize all rows to same column count
    const normalized = allRows.map((row) => {
      while (row.length < columnCount) row.push('');
      return row.map((cell) => cell.trim());
    });

    let headers: string[];
    let rows: string[][];

    if (hasHeader && normalized.length > 0) {
      headers = normalized[0];
      rows = normalized.slice(1);
    } else {
      headers = Array.from({ length: columnCount }, (_, i) => `Column ${i + 1}`);
      rows = normalized;
    }

    return {
      success: true,
      data: {
        headers,
        rows,
        rowCount: rows.length,
        columnCount,
      },
    };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to parse CSV',
    };
  }
}
