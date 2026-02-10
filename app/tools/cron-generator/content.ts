export const toolInfo = {
  name: 'Cron Expression Generator',
  description:
    'Generate cron expressions visually. Build crontab schedules with an easy-to-use interface — no memorization needed.',
  slug: 'cron-generator',
};

export const relatedTools = [
  { name: 'Cron Expression Parser', href: '/tools/cron-parser' },
  { name: 'Timestamp Converter', href: '/tools/timestamp-converter' },
  { name: 'Regex Tester', href: '/tools/regex-tester' },
  { name: 'UUID Generator', href: '/tools/uuid-generator' },
];

export const features = [
  'Build cron expressions with visual dropdown selectors',
  'Quick-click presets for the most common schedules',
  'See the generated expression update in real time',
  'Get a human-readable description of the schedule',
  'Preview the next 5 execution times',
  'Copy the expression with one click',
];

export const howToSteps = [
  'Select a preset or choose values for each cron field using the dropdowns',
  'Review the generated cron expression at the bottom',
  'Read the plain-English description to verify it matches your intent',
  'Check the next 5 run times to confirm the schedule',
  'Copy the expression to use in crontab, CI/CD, or your application',
];

export const examples = [
  {
    title: 'Run a backup every night at 2 AM',
    input: 'Minute: 0 | Hour: 2 | Day: * | Month: * | Weekday: *',
    output: '0 2 * * *',
  },
  {
    title: 'Send a report every Monday at 9 AM',
    input: 'Minute: 0 | Hour: 9 | Day: * | Month: * | Weekday: 1',
    output: '0 9 * * 1',
  },
  {
    title: 'Clear cache every 15 minutes',
    input: 'Minute: */15 | Hour: * | Day: * | Month: * | Weekday: *',
    output: '*/15 * * * *',
  },
  {
    title: 'Monthly billing on the 1st at midnight',
    input: 'Minute: 0 | Hour: 0 | Day: 1 | Month: * | Weekday: *',
    output: '0 0 1 * *',
  },
];

export const explanation = {
  title: 'How to Build a Cron Expression',
  content: [
    'Cron expressions are the universal language of scheduled tasks. Whether you are setting up a crontab job on a Linux server, scheduling a GitHub Actions workflow, or configuring a Kubernetes CronJob, you need a valid cron expression. The problem is that the syntax is compact and easy to get wrong — a misplaced number can turn a daily job into one that runs every minute.',
    'A cron expression generator lets you build schedules visually by selecting values for each of the five fields: minute, hour, day of month, month, and day of week. Instead of memorizing that "0 */6 * * *" means every 6 hours, you simply pick "Every 6 hours" from a dropdown and let the tool produce the expression.',
    'The five fields work together to define when a task runs. The minute field (0–59) and hour field (0–23) set the time of day. The day-of-month field (1–31) and month field (1–12) control the calendar date. The day-of-week field (0–6, where 0 is Sunday) adds weekday filtering. When both day-of-month and day-of-week are set, the task runs when either condition is true.',
    'Common patterns include: "0 * * * *" for hourly on the hour, "0 0 * * *" for daily at midnight, "0 0 * * 0" for weekly on Sunday, and "0 0 1 * *" for monthly on the 1st. Steps like "*/15" mean every 15 units, ranges like "1-5" mean Monday through Friday, and lists like "1,15" mean the 1st and 15th of the month.',
    'After generating your expression, always verify it by checking the human-readable description and previewing the next execution times. This tool calculates both so you can confirm the schedule before deploying. Once you are satisfied, copy the expression and paste it into your crontab, scheduler configuration, or application code.',
  ],
};

export const faqItems = [
  {
    question: 'What is a cron expression generator?',
    answer:
      'A cron expression generator is a visual tool that helps you build valid cron expressions by selecting values from dropdowns instead of writing the syntax manually. It reduces errors and saves time, especially for complex schedules.',
  },
  {
    question: 'How many fields does a cron expression have?',
    answer:
      'The standard cron expression has five fields: minute, hour, day of month, month, and day of week. Some systems (like Quartz) use six or seven fields that include seconds and/or year, but five fields is the most common format.',
  },
  {
    question: 'What is the difference between * and */5?',
    answer:
      'An asterisk (*) means "every value" in that field. The expression */5 means "every 5th value starting from the minimum." So in the minute field, * triggers every minute while */5 triggers at minutes 0, 5, 10, 15, and so on.',
  },
  {
    question: 'Can I generate expressions for seconds-level schedules?',
    answer:
      'This tool generates standard five-field cron expressions, which have a minimum resolution of one minute. If you need second-level scheduling, you will need a system that supports the extended six-field format (like Spring or Quartz).',
  },
  {
    question: 'Where can I use the generated cron expression?',
    answer:
      'Cron expressions work in crontab (Linux/macOS), systemd timers, Kubernetes CronJobs, GitHub Actions, AWS EventBridge, Google Cloud Scheduler, Azure Functions, Jenkins, and virtually any task scheduler that follows the standard format.',
  },
];
