export const toolInfo = {
  name: 'User Agent Parser',
  description:
    'Parse any user agent string into browser, OS, device, and engine details instantly.',
  slug: 'user-agent-parser',
};

export const relatedTools = [
  { name: 'JWT Decoder', href: '/tools/jwt-decoder' },
  { name: 'URL Parser', href: '/tools/url-parser' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
];

export const features = [
  'Detect browser name and version from any user agent string',
  'Identify operating system and version including Windows, macOS, Linux, Android, and iOS',
  'Classify device type as Desktop, Mobile, Tablet, or Bot/Crawler',
  'Recognize rendering engine (Blink, Gecko, WebKit, Trident, EdgeHTML)',
  'Detect bots and crawlers like Googlebot, Bingbot, and more',
  'One-click "Detect My Browser" to parse your own user agent instantly',
];

export const howToSteps = [
  'Paste a user agent string into the input field, or click "Detect My Browser" to use your own',
  'The parser instantly identifies the browser, version, and rendering engine',
  'View the operating system, version, and device type in the result cards',
  'Check whether the user agent belongs to a known bot or crawler',
  'Copy the raw user agent or parsed summary to your clipboard',
];

export const examples = [
  {
    title: 'Chrome on Windows 10',
    input:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    output:
      'Browser: Chrome 120.0.0.0\nEngine: Blink 120.0.0.0\nOS: Windows 10/11\nDevice: Desktop\nBot: No',
  },
  {
    title: 'Safari on iPhone (iOS)',
    input:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
    output: 'Browser: Safari 17.2\nEngine: WebKit 605.1.15\nOS: iOS 17.2\nDevice: Mobile\nBot: No',
  },
  {
    title: 'Googlebot crawler',
    input: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    output: 'Browser: Unknown\nEngine: Unknown\nOS: Unknown\nDevice: Bot/Crawler\nBot: Yes',
  },
];

export const explanation = {
  title: 'What is a User Agent String?',
  content: [
    'A user agent string is a text identifier that web browsers and HTTP clients send with every request via the User-Agent header. It tells the server what browser, operating system, and device is making the request. Servers use this information to serve optimized content, track analytics, and enforce compatibility rules.',
    'User agent strings follow a loosely standardized format that has evolved over decades. A typical UA string includes the browser name and version, the rendering engine (like Blink or Gecko), the operating system (Windows, macOS, Android, iOS), and sometimes the device model. Unfortunately, many browsers disguise themselves by including tokens from other browsers for compatibility reasons, making parsing non-trivial.',
    'Parsing user agents is essential for web developers, QA engineers, and security professionals. Developers use UA parsing to debug browser-specific issues, serve responsive layouts, or detect feature support. Security teams analyze UAs to identify bot traffic, block scrapers, and detect automated attacks. Analytics platforms rely on UA parsing to report browser and device statistics.',
    'Bot and crawler detection is another critical use case. Search engine crawlers like Googlebot, Bingbot, and Yandex identify themselves through their user agent strings. Detecting these bots helps website owners understand how search engines index their content and lets them serve optimized responses to crawlers for better SEO performance.',
    'This tool parses user agent strings entirely in your browser using regex-based detection. No data is sent to any server, making it safe to analyze production user agents. It recognizes all major browsers (Chrome, Firefox, Safari, Edge, Opera, Samsung Internet), rendering engines, operating systems, and common bot signatures.',
  ],
};

export const faqItems = [
  {
    question: 'Why do most user agents start with "Mozilla/5.0"?',
    answer:
      'This is a historical artifact. In the early web, servers would only send advanced content to Mozilla-compatible browsers. Other browsers started including "Mozilla" in their UA strings for compatibility. Today, virtually all browsers include "Mozilla/5.0" as a prefix, making it meaningless for identification.',
  },
  {
    question: 'How accurate is user agent parsing?',
    answer:
      'Regex-based UA parsing is highly accurate for standard browsers and well-known bots. However, some clients spoof or customize their user agent strings, which can lead to misidentification. For most analytics and debugging use cases, UA parsing provides reliable results.',
  },
  {
    question: 'Is my user agent string sent to a server?',
    answer:
      'No. This tool runs entirely in your browser. When you click "Detect My Browser", it reads navigator.userAgent locally. No data is transmitted anywhere. You can safely analyze production or sensitive user agent strings.',
  },
  {
    question: 'What is the difference between a browser and a rendering engine?',
    answer:
      'The browser is the application you interact with (Chrome, Firefox, Safari), while the rendering engine is the underlying component that draws web pages. Chrome and Edge use Blink, Firefox uses Gecko, and Safari uses WebKit. Multiple browsers can share the same engine.',
  },
  {
    question: 'Can I detect if a visitor is using a mobile device from the user agent?',
    answer:
      'Yes, mobile devices include identifiers like "Mobile", "iPhone", "Android", and "iPad" in their user agent strings. This tool classifies devices as Desktop, Mobile, Tablet, or Bot/Crawler based on these patterns. However, for responsive design, using CSS media queries is more reliable than UA detection.',
  },
];
