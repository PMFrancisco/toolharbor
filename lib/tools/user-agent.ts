// ─── Types ───────────────────────────────────────────────────────────────────

export interface UserAgentData {
  browser: { name: string; version: string };
  engine: { name: string; version: string };
  os: { name: string; version: string };
  device: { type: string };
  isBot: boolean;
  raw: string;
}

export interface UserAgentSuccess {
  success: true;
  data: UserAgentData;
}

export interface UserAgentError {
  success: false;
  error: string;
}

export type UserAgentResult = UserAgentSuccess | UserAgentError;

// ─── Bot patterns ────────────────────────────────────────────────────────────

const BOT_PATTERNS: RegExp[] = [
  /Googlebot/i,
  /Bingbot/i,
  /Slurp/i, // Yahoo
  /DuckDuckBot/i,
  /Baiduspider/i,
  /YandexBot/i,
  /Sogou/i,
  /facebookexternalhit/i,
  /Twitterbot/i,
  /LinkedInBot/i,
  /WhatsApp/i,
  /Applebot/i,
  /AhrefsBot/i,
  /SemrushBot/i,
  /MJ12bot/i,
  /DotBot/i,
  /PetalBot/i,
  /bot/i,
  /crawl/i,
  /spider/i,
  /headless/i,
  /puppet/i,
  /phantomjs/i,
];

// ─── Browser detection (order matters!) ──────────────────────────────────────

interface BrowserRule {
  name: string;
  test: RegExp;
  version: RegExp;
}

const BROWSER_RULES: BrowserRule[] = [
  // Edge (new Chromium-based)
  { name: 'Edge', test: /Edg(e|A|iOS)?\//, version: /Edg(?:e|A|iOS)?\/(\d+[\d.]*)/ },
  // Opera / Opera GX
  { name: 'Opera', test: /OPR\/|Opera\//, version: /(?:OPR|Opera)[\s/](\d+[\d.]*)/ },
  // Samsung Internet
  {
    name: 'Samsung Internet',
    test: /SamsungBrowser\//,
    version: /SamsungBrowser\/(\d+[\d.]*)/,
  },
  // UC Browser
  { name: 'UC Browser', test: /UCBrowser\//, version: /UCBrowser\/(\d+[\d.]*)/ },
  // Vivaldi
  { name: 'Vivaldi', test: /Vivaldi\//, version: /Vivaldi\/(\d+[\d.]*)/ },
  // Brave (identifies itself via Chrome but we can check navigator.brave; regex fallback)
  { name: 'Brave', test: /Brave\//, version: /Brave\/(\d+[\d.]*)/ },
  // Firefox
  { name: 'Firefox', test: /Firefox\//, version: /Firefox\/(\d+[\d.]*)/ },
  // Chrome (must come after Edge, Opera, Samsung, UC, Vivaldi, Brave)
  {
    name: 'Chrome',
    test: /Chrome\/(?!.*(?:Edg|OPR|SamsungBrowser|UCBrowser|Vivaldi|Brave))/,
    version: /Chrome\/(\d+[\d.]*)/,
  },
  // Safari (must come after Chrome)
  {
    name: 'Safari',
    test: /Safari\/(?!.*(?:Chrome|Chromium|CriOS))/,
    version: /Version\/(\d+[\d.]*)/,
  },
  // IE 11
  { name: 'Internet Explorer', test: /Trident\//, version: /rv:(\d+[\d.]*)/ },
  // IE 10 and below
  { name: 'Internet Explorer', test: /MSIE\s/, version: /MSIE\s(\d+[\d.]*)/ },
];

// ─── Engine detection ────────────────────────────────────────────────────────

interface EngineRule {
  name: string;
  test: RegExp;
  version: RegExp;
}

const ENGINE_RULES: EngineRule[] = [
  // Blink (used by Chrome 28+, Edge 79+, Opera 15+)
  { name: 'Blink', test: /Chrome\/(?:[2-9]\d|[1-9]\d{2,})\./, version: /Chrome\/(\d+[\d.]*)/ },
  // EdgeHTML (legacy Edge)
  { name: 'EdgeHTML', test: /Edge\//, version: /Edge\/(\d+[\d.]*)/ },
  // Gecko (Firefox)
  { name: 'Gecko', test: /Gecko\//, version: /rv:(\d+[\d.]*)/ },
  // WebKit (Safari, older Chrome)
  { name: 'WebKit', test: /AppleWebKit\//, version: /AppleWebKit\/(\d+[\d.]*)/ },
  // Trident (IE)
  { name: 'Trident', test: /Trident\//, version: /Trident\/(\d+[\d.]*)/ },
  // Presto (old Opera)
  { name: 'Presto', test: /Presto\//, version: /Presto\/(\d+[\d.]*)/ },
];

// ─── OS detection ────────────────────────────────────────────────────────────

interface OsRule {
  name: string;
  test: RegExp;
  version: (ua: string) => string;
}

function extractVersion(ua: string, re: RegExp): string {
  const m = ua.match(re);
  return m ? m[1].replace(/_/g, '.') : '';
}

const WINDOWS_VERSION_MAP: Record<string, string> = {
  '10.0': '10/11',
  '6.3': '8.1',
  '6.2': '8',
  '6.1': '7',
  '6.0': 'Vista',
  '5.1': 'XP',
  '5.0': '2000',
};

const OS_RULES: OsRule[] = [
  // Chrome OS
  {
    name: 'Chrome OS',
    test: /CrOS/,
    version: (ua) => extractVersion(ua, /Chrome\/(\d+[\d.]*)/),
  },
  // iOS
  {
    name: 'iOS',
    test: /(?:iPhone|iPad|iPod)/,
    version: (ua) => extractVersion(ua, /OS (\d+[_.\d]*)/),
  },
  // Android
  {
    name: 'Android',
    test: /Android/,
    version: (ua) => extractVersion(ua, /Android\s(\d+[\d.]*)/),
  },
  // Windows
  {
    name: 'Windows',
    test: /Windows/,
    version: (ua) => {
      const raw = extractVersion(ua, /Windows NT (\d+[\d.]*)/);
      return WINDOWS_VERSION_MAP[raw] || raw;
    },
  },
  // macOS
  {
    name: 'macOS',
    test: /Macintosh|Mac OS X/,
    version: (ua) => extractVersion(ua, /Mac OS X (\d+[_.\d]*)/),
  },
  // Linux (generic, no version usually)
  {
    name: 'Linux',
    test: /Linux(?!.*Android)/,
    version: () => '',
  },
  // Ubuntu
  {
    name: 'Ubuntu',
    test: /Ubuntu/,
    version: () => '',
  },
  // FreeBSD
  {
    name: 'FreeBSD',
    test: /FreeBSD/,
    version: () => '',
  },
];

// ─── Device type detection ───────────────────────────────────────────────────

function detectDeviceType(ua: string, isBot: boolean): string {
  if (isBot) return 'Bot/Crawler';

  // Tablets: iPad or Android without "Mobile"
  if (/iPad/i.test(ua)) return 'Tablet';
  if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return 'Tablet';
  if (/Tablet/i.test(ua)) return 'Tablet';

  // Mobile
  if (/Mobile|iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|Opera Mini|IEMobile/i.test(ua))
    return 'Mobile';

  // Smart TV / Console
  if (/SmartTV|Smart-TV|SMART-TV|GoogleTV|AppleTV|HbbTV|BRAVIA|CrKey/i.test(ua)) return 'TV';

  return 'Desktop';
}

// ─── Main parser ─────────────────────────────────────────────────────────────

export function parseUserAgent(ua: string): UserAgentResult {
  const trimmed = ua.trim();

  if (!trimmed) {
    return { success: false, error: 'Please enter a user agent string.' };
  }

  if (trimmed.length > 2048) {
    return { success: false, error: 'User agent string is too long (max 2048 characters).' };
  }

  // Bot detection
  const isBot = BOT_PATTERNS.some((re) => re.test(trimmed));

  // Browser
  let browserName = 'Unknown';
  let browserVersion = '';
  for (const rule of BROWSER_RULES) {
    if (rule.test.test(trimmed)) {
      browserName = rule.name;
      const m = trimmed.match(rule.version);
      browserVersion = m ? m[1] : '';
      break;
    }
  }

  // Engine
  let engineName = 'Unknown';
  let engineVersion = '';
  for (const rule of ENGINE_RULES) {
    if (rule.test.test(trimmed)) {
      engineName = rule.name;
      const m = trimmed.match(rule.version);
      engineVersion = m ? m[1] : '';
      break;
    }
  }

  // OS
  let osName = 'Unknown';
  let osVersion = '';
  for (const rule of OS_RULES) {
    if (rule.test.test(trimmed)) {
      osName = rule.name;
      osVersion = rule.version(trimmed);
      break;
    }
  }

  // Device
  const deviceType = detectDeviceType(trimmed, isBot);

  return {
    success: true,
    data: {
      browser: { name: browserName, version: browserVersion },
      engine: { name: engineName, version: engineVersion },
      os: { name: osName, version: osVersion },
      device: { type: deviceType },
      isBot,
      raw: trimmed,
    },
  };
}

// ─── Helper ──────────────────────────────────────────────────────────────────

export function getCurrentUserAgent(): string {
  if (typeof window !== 'undefined' && navigator?.userAgent) {
    return navigator.userAgent;
  }
  return '';
}
