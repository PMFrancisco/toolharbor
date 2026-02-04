/**
 * Process markdown lists with proper nesting support
 */
function processLists(html: string): string {
  const lines = html.split('\n');
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const ulMatch = line.match(/^(\s*)([-*+])\s+(.*)$/);
    const olMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/);

    if (ulMatch || olMatch) {
      // Start of a list - collect all consecutive list items
      const listLines: { indent: number; content: string; ordered: boolean }[] = [];

      while (i < lines.length) {
        const currentLine = lines[i];
        const ulCurrent = currentLine.match(/^(\s*)([-*+])\s+(.*)$/);
        const olCurrent = currentLine.match(/^(\s*)(\d+)\.\s+(.*)$/);

        if (ulCurrent) {
          listLines.push({
            indent: ulCurrent[1].length,
            content: ulCurrent[3],
            ordered: false,
          });
          i++;
        } else if (olCurrent) {
          listLines.push({
            indent: olCurrent[1].length,
            content: olCurrent[3],
            ordered: true,
          });
          i++;
        } else if (currentLine.trim() === '') {
          // Empty line might end the list or be between items
          // Check if next non-empty line is a list item
          let j = i + 1;
          while (j < lines.length && lines[j].trim() === '') j++;
          if (j < lines.length) {
            const nextUl = lines[j].match(/^(\s*)([-*+])\s+(.*)$/);
            const nextOl = lines[j].match(/^(\s*)(\d+)\.\s+(.*)$/);
            if (nextUl || nextOl) {
              i++;
              continue;
            }
          }
          break;
        } else {
          break;
        }
      }

      // Build nested list HTML
      result.push(buildNestedList(listLines));
    } else {
      result.push(line);
      i++;
    }
  }

  return result.join('\n');
}

/**
 * Build nested HTML list from parsed list items
 */
function buildNestedList(items: { indent: number; content: string; ordered: boolean }[]): string {
  if (items.length === 0) return '';

  const result: string[] = [];
  const stack: { indent: number; ordered: boolean }[] = [];

  for (const item of items) {
    // Close lists that are deeper than current indent
    while (stack.length > 0 && stack[stack.length - 1].indent >= item.indent) {
      const popped = stack.pop()!;
      result.push(popped.ordered ? '</ol>' : '</ul>');
      result.push('</li>');
    }

    // Check if we need to open a new list
    const needNewList =
      stack.length === 0 ||
      stack[stack.length - 1].indent < item.indent ||
      stack[stack.length - 1].ordered !== item.ordered;

    if (needNewList) {
      if (stack.length > 0 && stack[stack.length - 1].indent < item.indent) {
        // Nested list - don't close parent li yet
        result.push(item.ordered ? '<ol>' : '<ul>');
      } else if (stack.length === 0) {
        result.push(item.ordered ? '<ol>' : '<ul>');
      }
      stack.push({ indent: item.indent, ordered: item.ordered });
    }

    result.push(`<li>${item.content}`);

    // Check if next item is nested (will be handled in next iteration)
    const nextIndex = items.indexOf(item) + 1;
    if (nextIndex >= items.length || items[nextIndex].indent <= item.indent) {
      result.push('</li>');
    }
  }

  // Close remaining open lists
  while (stack.length > 0) {
    const popped = stack.pop()!;
    result.push(popped.ordered ? '</ol>' : '</ul>');
  }

  return result.join('');
}

/**
 * Convert Markdown to HTML
 * Simple implementation without external dependencies
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown.trim()) {
    return '';
  }

  let html = markdown;

  // Escape HTML first
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Code blocks (must be before inline code)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="language-${lang || 'plaintext'}">${code.trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headers
  html = html.replace(/^######\s+(.*)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.*)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');

  // Horizontal rule
  html = html.replace(/^---+$/gm, '<hr>');
  html = html.replace(/^\*\*\*+$/gm, '<hr>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>'
  );

  // Images
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" style="max-width:100%">'
  );

  // Blockquotes
  html = html.replace(/^>\s+(.*)$/gm, '<blockquote>$1</blockquote>');
  // Merge consecutive blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n');

  // Process lists with proper nesting
  html = processLists(html);

  // Task lists
  html = html.replace(/<li>\s*\[\s*\]\s*/g, '<li><input type="checkbox" disabled> ');
  html = html.replace(/<li>\s*\[x\]\s*/gi, '<li><input type="checkbox" checked disabled> ');

  // Tables
  html = html.replace(/^\|(.+)\|$/gm, (match, content) => {
    const cells = content.split('|').map((cell: string) => cell.trim());
    if (cells.every((cell: string) => /^[-:]+$/.test(cell))) {
      return ''; // Skip separator row
    }
    const cellHtml = cells.map((cell: string) => `<td>${cell}</td>`).join('');
    return `<tr>${cellHtml}</tr>`;
  });
  html = html.replace(/(<tr>.*<\/tr>\n?)+/g, '<table>$&</table>');

  // Paragraphs - wrap remaining text
  const lines = html.split('\n');
  const result: string[] = [];
  let inParagraph = false;

  for (const line of lines) {
    const trimmed = line.trim();
    const isBlock =
      /^<(h[1-6]|ul|ol|li|blockquote|pre|hr|table|tr)/.test(trimmed) ||
      /<\/(h[1-6]|ul|ol|blockquote|pre|table)>$/.test(trimmed);

    if (!trimmed) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      result.push('');
    } else if (isBlock) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      result.push(trimmed);
    } else {
      if (!inParagraph) {
        result.push('<p>');
        inParagraph = true;
      }
      result.push(trimmed);
    }
  }

  if (inParagraph) {
    result.push('</p>');
  }

  return result
    .join('\n')
    .replace(/<p>\s*<\/p>/g, '')
    .trim();
}

/**
 * Get preview-safe HTML (for iframe)
 */
export function getPreviewHtml(markdown: string): string {
  const html = markdownToHtml(markdown);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      padding: 1rem;
      max-width: 100%;
      margin: 0;
    }
    h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 600; }
    h1 { font-size: 2em; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    h3 { font-size: 1.25em; }
    p { margin: 1em 0; }
    a { color: #0066cc; }
    code {
      background: #f4f4f4;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-size: 0.9em;
      font-family: 'SF Mono', Monaco, Consolas, monospace;
    }
    pre {
      background: #f4f4f4;
      padding: 1em;
      border-radius: 6px;
      overflow-x: auto;
    }
    pre code { background: none; padding: 0; }
    blockquote {
      margin: 1em 0;
      padding: 0.5em 1em;
      border-left: 4px solid #ddd;
      color: #666;
    }
    ul, ol { padding-left: 2em; margin: 0.5em 0; }
    li { margin: 0.25em 0; }
    li > ul, li > ol { margin-top: 0.25em; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    td, th { border: 1px solid #ddd; padding: 0.5em; text-align: left; }
    hr { border: none; border-top: 1px solid #eee; margin: 2em 0; }
    img { max-width: 100%; height: auto; }
    @media (prefers-color-scheme: dark) {
      body { background: #1a1a1a; color: #e5e5e5; }
      code, pre { background: #2d2d2d; }
      blockquote { border-color: #444; color: #aaa; }
      td, th { border-color: #444; }
      hr, h1, h2 { border-color: #333; }
      a { color: #66b3ff; }
    }
  </style>
</head>
<body>${html}</body>
</html>`;
}
