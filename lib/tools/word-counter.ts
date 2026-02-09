export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: string;
  speakingTime: string;
}

export interface KeywordEntry {
  word: string;
  count: number;
  density: string;
}

export interface TextAnalysis {
  stats: TextStats;
  topKeywords: KeywordEntry[];
}

/** Common English stop words to exclude from keyword analysis */
const STOP_WORDS = new Set([
  'a',
  'an',
  'the',
  'and',
  'or',
  'but',
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'with',
  'by',
  'from',
  'is',
  'it',
  'as',
  'be',
  'was',
  'are',
  'were',
  'been',
  'has',
  'have',
  'had',
  'do',
  'does',
  'did',
  'will',
  'would',
  'could',
  'should',
  'may',
  'might',
  'can',
  'shall',
  'not',
  'no',
  'nor',
  'so',
  'if',
  'then',
  'than',
  'too',
  'very',
  'just',
  'about',
  'up',
  'out',
  'that',
  'this',
  'these',
  'those',
  'i',
  'me',
  'my',
  'we',
  'our',
  'you',
  'your',
  'he',
  'she',
  'they',
  'them',
  'his',
  'her',
  'its',
  'who',
  'what',
  'which',
  'when',
  'where',
  'how',
  'all',
  'each',
  'every',
  'both',
  'few',
  'more',
  'most',
  'some',
  'any',
  'also',
  'into',
  'over',
  'after',
  'before',
  'between',
  'under',
  'am',
]);

function formatTime(minutes: number): string {
  if (minutes < 1) return '< 1 min';
  if (minutes < 60) return `${Math.ceil(minutes)} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = Math.ceil(minutes % 60);
  return mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`;
}

/**
 * Analyze text and return stats + top keywords.
 */
export const analyzeText = (input: string): TextAnalysis => {
  if (!input.trim()) {
    return {
      stats: {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        readingTime: '0 min',
        speakingTime: '0 min',
      },
      topKeywords: [],
    };
  }

  const characters = input.length;
  const charactersNoSpaces = input.replace(/\s/g, '').length;

  const words = input.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Sentences: split on . ! ? followed by space or end of string
  const sentences = input.split(/[.!?]+(?:\s|$)/).filter((s) => s.trim().length > 0).length;

  // Paragraphs: blocks separated by one or more blank lines
  const paragraphs =
    input.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || (input.trim() ? 1 : 0);

  const lines = input.split('\n').length;

  // Average reading speed: 238 wpm, speaking: 150 wpm
  const readingTime = formatTime(wordCount / 238);
  const speakingTime = formatTime(wordCount / 150);

  // Top keywords (excluding stop words, min 2 chars)
  const freq: Record<string, number> = {};
  for (const word of words) {
    const clean = word.toLowerCase().replace(/[^a-z0-9'-]/g, '');
    if (clean.length < 2 || STOP_WORDS.has(clean)) continue;
    freq[clean] = (freq[clean] || 0) + 1;
  }

  const topKeywords: KeywordEntry[] = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({
      word,
      count,
      density: wordCount > 0 ? ((count / wordCount) * 100).toFixed(1) + '%' : '0%',
    }));

  return {
    stats: {
      characters,
      charactersNoSpaces,
      words: wordCount,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
    },
    topKeywords,
  };
};

/**
 * Format all stats as a plain text summary for clipboard.
 */
export const formatStatsSummary = (analysis: TextAnalysis): string => {
  const { stats, topKeywords } = analysis;
  const lines = [
    `Words: ${stats.words}`,
    `Characters: ${stats.characters}`,
    `Characters (no spaces): ${stats.charactersNoSpaces}`,
    `Sentences: ${stats.sentences}`,
    `Paragraphs: ${stats.paragraphs}`,
    `Lines: ${stats.lines}`,
    `Reading time: ${stats.readingTime}`,
    `Speaking time: ${stats.speakingTime}`,
  ];

  if (topKeywords.length > 0) {
    lines.push('', 'Top Keywords:');
    topKeywords.forEach((kw, i) => {
      lines.push(`  ${i + 1}. "${kw.word}" — ${kw.count}× (${kw.density})`);
    });
  }

  return lines.join('\n');
};
