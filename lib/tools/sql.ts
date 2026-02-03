export interface SqlFormatSuccess {
  success: true;
  data: string;
}

export interface SqlFormatError {
  success: false;
  error: string;
}

export type SqlResult = SqlFormatSuccess | SqlFormatError;

// SQL keywords for formatting
const KEYWORDS = [
  'SELECT',
  'FROM',
  'WHERE',
  'AND',
  'OR',
  'NOT',
  'IN',
  'IS',
  'NULL',
  'LIKE',
  'BETWEEN',
  'EXISTS',
  'HAVING',
  'GROUP BY',
  'ORDER BY',
  'ASC',
  'DESC',
  'LIMIT',
  'OFFSET',
  'JOIN',
  'INNER JOIN',
  'LEFT JOIN',
  'RIGHT JOIN',
  'FULL JOIN',
  'OUTER JOIN',
  'CROSS JOIN',
  'ON',
  'AS',
  'UNION',
  'UNION ALL',
  'INTERSECT',
  'EXCEPT',
  'INSERT INTO',
  'VALUES',
  'UPDATE',
  'SET',
  'DELETE FROM',
  'CREATE TABLE',
  'ALTER TABLE',
  'DROP TABLE',
  'CREATE INDEX',
  'DROP INDEX',
  'TRUNCATE',
  'DISTINCT',
  'CASE',
  'WHEN',
  'THEN',
  'ELSE',
  'END',
  'CAST',
  'COALESCE',
  'NULLIF',
  'WITH',
  'RECURSIVE',
  'PRIMARY KEY',
  'FOREIGN KEY',
  'REFERENCES',
  'CONSTRAINT',
  'DEFAULT',
  'AUTO_INCREMENT',
  'NOT NULL',
  'UNIQUE',
];

// Keywords that should start on a new line
const NEWLINE_KEYWORDS = [
  'SELECT',
  'FROM',
  'WHERE',
  'AND',
  'OR',
  'JOIN',
  'INNER JOIN',
  'LEFT JOIN',
  'RIGHT JOIN',
  'FULL JOIN',
  'OUTER JOIN',
  'CROSS JOIN',
  'GROUP BY',
  'ORDER BY',
  'HAVING',
  'LIMIT',
  'OFFSET',
  'UNION',
  'UNION ALL',
  'INTERSECT',
  'EXCEPT',
  'INSERT INTO',
  'VALUES',
  'UPDATE',
  'SET',
  'DELETE FROM',
  'ON',
  'WHEN',
  'ELSE',
  'END',
];

/**
 * Format SQL query with proper indentation
 */
export function formatSql(input: string, indent: number = 2): SqlResult {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  try {
    let sql = input.trim();
    const indentStr = ' '.repeat(indent);

    // Normalize whitespace
    sql = sql.replace(/\s+/g, ' ');

    // Uppercase keywords
    KEYWORDS.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      sql = sql.replace(regex, keyword);
    });

    // Add newlines before keywords
    NEWLINE_KEYWORDS.forEach((keyword) => {
      const regex = new RegExp(`\\s*\\b(${keyword})\\b`, 'gi');
      sql = sql.replace(regex, `\n$1`);
    });

    // Handle commas - put each column on new line after SELECT
    sql = sql.replace(/,\s*/g, ',\n' + indentStr);

    // Indent lines after SELECT, SET, VALUES
    const lines = sql.split('\n');
    const result: string[] = [];
    let indentLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) continue;

      // Decrease indent for certain keywords
      if (/^(FROM|WHERE|GROUP BY|ORDER BY|HAVING|LIMIT|OFFSET|SET|VALUES)\b/i.test(line)) {
        indentLevel = 0;
      }

      // Apply current indent
      if (
        indentLevel > 0 &&
        !/^(SELECT|FROM|WHERE|JOIN|AND|OR|GROUP|ORDER|HAVING|LIMIT|OFFSET|UNION|INSERT|UPDATE|DELETE|SET|VALUES)/i.test(
          line
        )
      ) {
        line = indentStr + line;
      }

      // Increase indent after SELECT
      if (/^SELECT\b/i.test(line)) {
        indentLevel = 1;
      }

      // Indent AND/OR
      if (/^(AND|OR)\b/i.test(line)) {
        line = indentStr + line;
      }

      result.push(line);
    }

    return { success: true, data: result.join('\n') };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to format SQL',
    };
  }
}

/**
 * Minify SQL by removing unnecessary whitespace
 */
export function minifySql(input: string): SqlResult {
  if (!input.trim()) {
    return { success: true, data: '' };
  }

  try {
    let sql = input.trim();
    // Preserve strings
    const strings: string[] = [];
    sql = sql.replace(/'[^']*'/g, (match) => {
      strings.push(match);
      return `__STRING_${strings.length - 1}__`;
    });

    // Normalize whitespace
    sql = sql.replace(/\s+/g, ' ');

    // Remove spaces around operators
    sql = sql.replace(/\s*([(),=<>!])\s*/g, '$1');

    // Restore strings
    strings.forEach((str, i) => {
      sql = sql.replace(`__STRING_${i}__`, str);
    });

    return { success: true, data: sql.trim() };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to minify SQL',
    };
  }
}
