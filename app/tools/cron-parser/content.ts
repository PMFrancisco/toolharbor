export const toolInfo = {
  name: 'Cron Expression Parser',
  description:
    'Parse and explain cron expressions in plain English. See the next scheduled run times for any cron schedule.',
  slug: 'cron-parser',
};

export const relatedTools = [
  { name: 'Cron Expression Generator', href: '/tools/cron-generator' },
  { name: 'Timestamp Converter', href: '/tools/timestamp-converter' },
  { name: 'Regex Tester', href: '/tools/regex-tester' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
];

export const features = [
  'Parse any standard 5-field cron expression instantly',
  'Get a human-readable explanation in plain English',
  'See the next 5 scheduled run times from now',
  'View a breakdown of each cron field with its meaning',
  'Quick-click presets for common schedules',
  'Works offline — your expressions never leave your browser',
];

export const howToSteps = [
  'Enter a cron expression in the input field (e.g., */15 * * * *)',
  'Or click a preset button to load a common schedule',
  'Read the plain-English description of what the expression does',
  'Review the field-by-field breakdown table',
  'Check the next 5 scheduled run times',
];

export const examples = [
  {
    title: 'Every 15 minutes',
    input: '*/15 * * * *',
    output: 'Every 15 minutes',
  },
  {
    title: 'Daily at 3:30 AM',
    input: '30 3 * * *',
    output: 'At 3:30 AM',
  },
  {
    title: 'Weekdays at 9 AM',
    input: '0 9 * * 1-5',
    output: 'At 9:00 AM, on Monday through Friday',
  },
  {
    title: 'Monthly on the 1st at midnight',
    input: '0 0 1 * *',
    output: 'At 12:00 AM, on day 1 of the month',
  },
];

export const explanation = {
  title: 'What is a Cron Expression?',
  content: [
    'A cron expression is a string of five fields separated by spaces that defines a schedule for recurring tasks. Originally part of Unix-like operating systems, cron is now used everywhere — from Linux servers and CI/CD pipelines to cloud schedulers like AWS CloudWatch, Google Cloud Scheduler, and Kubernetes CronJobs.',
    'Each of the five fields represents a time unit: minute (0–59), hour (0–23), day of the month (1–31), month (1–12), and day of the week (0–6, where 0 is Sunday). A wildcard (*) means "every possible value," a slash (/) defines a step interval, a dash (-) defines a range, and a comma (,) separates a list of specific values.',
    'For example, the expression "30 3 * * *" means "at minute 30 of hour 3, every day, every month, every weekday" — in plain English, "every day at 3:30 AM." The expression "0 9 * * 1-5" means "at 9:00 AM, Monday through Friday." These compact strings pack a lot of scheduling power into very few characters.',
    'Parsing cron expressions by hand is error-prone, especially with complex combinations of ranges, steps, and lists. A cron parser translates the expression into a human-readable description and calculates the next execution times, so you can verify your schedule before deploying it. This avoids costly mistakes like a backup job running every minute instead of every hour.',
    'This tool supports the standard five-field cron format used by crontab, systemd timers, and most scheduling libraries. It accepts numeric values, ranges (1-5), steps (*/10), lists (1,3,5), and month/weekday names (MON, JAN). Paste any expression and instantly see what it does and when it will run next.',
  ],
};

export const faqItems = [
  {
    question: 'What is the standard cron expression format?',
    answer:
      'The standard cron format uses five fields separated by spaces: minute (0–59), hour (0–23), day of month (1–31), month (1–12), and day of week (0–6). Some systems add a sixth field for seconds, but this tool uses the most common five-field format.',
  },
  {
    question: 'What does the asterisk (*) mean in cron?',
    answer:
      'An asterisk (*) means "every possible value" for that field. For example, * in the hour field means every hour. Combined with other fields, * * * * * means "every minute of every hour of every day."',
  },
  {
    question: 'How do step values work in cron (e.g., */5)?',
    answer:
      'A step value like */5 in the minute field means "every 5th minute" — so minutes 0, 5, 10, 15, and so on. You can also use steps with ranges: 1-30/5 means every 5th minute from 1 through 30.',
  },
  {
    question: 'Can I use month and weekday names?',
    answer:
      'Yes. Most cron implementations accept three-letter abbreviations: JAN–DEC for months and SUN–SAT for days of the week. This tool supports both names and numeric values.',
  },
  {
    question: 'Are the next run times accurate?',
    answer:
      'The next run times are calculated from your current local time and assume a standard cron scheduler. Actual execution may vary slightly depending on server load, timezone configuration, and the specific scheduler implementation.',
  },
];
