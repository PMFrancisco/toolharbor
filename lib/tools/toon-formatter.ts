export interface ToonFormatSuccess {
  success: true;
  data: string;
}

export interface ToonFormatError {
  success: false;
  error: string;
}

export type ToonFormatResult = ToonFormatSuccess | ToonFormatError;

/**
 * Parse a TOON table (uniform array of objects) back to JSON.
 * Format: {field1,field2}[N]\nval1\tval2\nval3\tval4
 */
function parseTable(header: string, rows: string[]): unknown[] {
  const fieldsMatch = header.match(/^\{([^}]+)\}\[(\d+)\]$/);
  if (!fieldsMatch) throw new Error('Invalid table header');

  const fields = fieldsMatch[1].split(',');
  const expectedCount = parseInt(fieldsMatch[2], 10);

  if (rows.length !== expectedCount) {
    throw new Error(`Expected ${expectedCount} rows but found ${rows.length}`);
  }

  return rows.map((row, i) => {
    const values = row.split('\t');
    if (values.length !== fields.length) {
      throw new Error(`Row ${i + 1}: expected ${fields.length} values but found ${values.length}`);
    }
    const obj: Record<string, unknown> = {};
    fields.forEach((field, j) => {
      obj[field] = parsePrimitive(values[j]);
    });
    return obj;
  });
}

function parsePrimitive(value: string): unknown {
  const trimmed = value.trim();
  if (trimmed === 'null') return null;
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;

  // Quoted string
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed
      .slice(1, -1)
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }

  // Number
  const num = Number(trimmed);
  if (trimmed !== '' && !isNaN(num)) return num;

  return trimmed;
}

/**
 * Parse a TOON key-value block into an object.
 */
function parseKeyValue(lines: string[], startIndent: number): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const indent = line.search(/\S/);
    if (indent < startIndent) break;
    if (indent > startIndent) {
      i++;
      continue;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) {
      i++;
      continue;
    }

    const key = line.slice(indent, colonIdx).trim();
    const valueStr = line.slice(colonIdx + 1).trim();

    if (valueStr) {
      obj[key] = parsePrimitive(valueStr);
    } else {
      // Nested value — collect indented lines
      const childLines: string[] = [];
      i++;
      while (i < lines.length) {
        const childIndent = lines[i].search(/\S/);
        if (childIndent <= startIndent && lines[i].trim()) break;
        if (lines[i].trim()) childLines.push(lines[i]);
        i++;
      }
      if (childLines.length > 0) {
        const firstChild = childLines[0].trim();
        if (firstChild.startsWith('{') && firstChild.includes('}[')) {
          // Nested table
          const tableRows = childLines.slice(1).map((l) => l.trim());
          obj[key] = parseTable(firstChild, tableRows);
        } else {
          const childIndent = childLines[0].search(/\S/);
          obj[key] = parseKeyValue(childLines, childIndent);
        }
      }
      continue;
    }
    i++;
  }

  return obj;
}

export function toonToJson(input: string): ToonFormatResult {
  if (!input.trim()) {
    return { success: false, error: 'Please enter TOON data to convert' };
  }

  try {
    const lines = input.split('\n');
    const firstLine = lines[0].trim();

    // Table format: {fields}[N]
    if (firstLine.match(/^\{[^}]+\}\[\d+\]$/)) {
      const rows = lines.slice(1).filter((l) => l.trim());
      const result = parseTable(firstLine, rows);
      return { success: true, data: JSON.stringify(result, null, 2) };
    }

    // Primitive array: [N] val1, val2
    const primArrayMatch = firstLine.match(/^\[(\d+)\]\s+(.+)$/);
    if (primArrayMatch) {
      const values = primArrayMatch[2].split(',').map((v) => parsePrimitive(v.trim()));
      return { success: true, data: JSON.stringify(values, null, 2) };
    }

    // Key-value object
    if (firstLine.includes(':')) {
      const result = parseKeyValue(lines, 0);
      return { success: true, data: JSON.stringify(result, null, 2) };
    }

    // Single primitive
    const result = parsePrimitive(firstLine);
    return { success: true, data: JSON.stringify(result, null, 2) };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Invalid TOON',
    };
  }
}

export function validateToon(input: string): ToonFormatResult {
  const result = toonToJson(input);
  if (result.success) {
    return { success: true, data: 'Valid TOON' };
  }
  return result;
}
