// ─── Types ───────────────────────────────────────────────────────────────────

export interface CronField {
  name: string;
  value: string;
  description: string;
}

export interface CronParseSuccess {
  success: true;
  data: {
    fields: CronField[];
    description: string;
    nextRuns: Date[];
  };
}

export interface CronParseError {
  success: false;
  error: string;
}

export type CronParseResult = CronParseSuccess | CronParseError;

export interface CronPreset {
  label: string;
  expression: string;
  description: string;
}

export interface CronFieldDefinition {
  name: string;
  min: number;
  max: number;
  names?: string[];
}

export interface CronBuildOptions {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const MONTH_ABBREV = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

export const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const WEEKDAY_ABBREV = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const CRON_FIELDS: CronFieldDefinition[] = [
  { name: 'Minute', min: 0, max: 59 },
  { name: 'Hour', min: 0, max: 23 },
  { name: 'Day of Month', min: 1, max: 31 },
  { name: 'Month', min: 1, max: 12, names: MONTH_ABBREV },
  { name: 'Day of Week', min: 0, max: 6, names: WEEKDAY_ABBREV },
];

export const CRON_PRESETS: CronPreset[] = [
  { label: 'Every Minute', expression: '* * * * *', description: 'Runs every minute' },
  { label: 'Every 5 Minutes', expression: '*/5 * * * *', description: 'Runs every 5 minutes' },
  { label: 'Every 15 Minutes', expression: '*/15 * * * *', description: 'Runs every 15 minutes' },
  { label: 'Every 30 Minutes', expression: '*/30 * * * *', description: 'Runs every 30 minutes' },
  { label: 'Hourly', expression: '0 * * * *', description: 'Runs at the start of every hour' },
  {
    label: 'Daily at Midnight',
    expression: '0 0 * * *',
    description: 'Runs every day at midnight',
  },
  { label: 'Daily at Noon', expression: '0 12 * * *', description: 'Runs every day at noon' },
  {
    label: 'Weekly on Monday',
    expression: '0 0 * * 1',
    description: 'Runs every Monday at midnight',
  },
  {
    label: 'Monthly on 1st',
    expression: '0 0 1 * *',
    description: 'Runs on the 1st of every month at midnight',
  },
  {
    label: 'Yearly',
    expression: '0 0 1 1 *',
    description: 'Runs on January 1st at midnight',
  },
  {
    label: 'Weekdays at 9 AM',
    expression: '0 9 * * 1-5',
    description: 'Runs Monday–Friday at 9:00 AM',
  },
];

// ─── Helpers: Name Resolution ────────────────────────────────────────────────

const monthNameToNum: Record<string, number> = {};
MONTH_ABBREV.forEach((name, i) => {
  monthNameToNum[name] = i + 1;
});

const weekdayNameToNum: Record<string, number> = {};
WEEKDAY_ABBREV.forEach((name, i) => {
  weekdayNameToNum[name] = i;
});

function resolveNames(token: string, fieldIndex: number): string {
  if (fieldIndex === 3) {
    // Month field: replace names with numbers
    return token.replace(/[A-Za-z]+/g, (match) => {
      const upper = match.toUpperCase();
      return monthNameToNum[upper] !== undefined ? String(monthNameToNum[upper]) : match;
    });
  }
  if (fieldIndex === 4) {
    // Day of week field: replace names with numbers
    return token.replace(/[A-Za-z]+/g, (match) => {
      const upper = match.toUpperCase();
      return weekdayNameToNum[upper] !== undefined ? String(weekdayNameToNum[upper]) : match;
    });
  }
  return token;
}

// ─── Helpers: Expand Cron Field to Set of Values ─────────────────────────────

function expandField(token: string, min: number, max: number): number[] | null {
  const values = new Set<number>();

  const parts = token.split(',');
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) return null;

    // Step: */N or N-M/S
    const stepMatch = trimmed.match(/^(\*|(\d+)-(\d+))\/(\d+)$/);
    if (stepMatch) {
      const step = parseInt(stepMatch[4], 10);
      if (step <= 0) return null;
      let start = min;
      let end = max;
      if (stepMatch[2] !== undefined && stepMatch[3] !== undefined) {
        start = parseInt(stepMatch[2], 10);
        end = parseInt(stepMatch[3], 10);
      }
      if (start < min || end > max || start > end) return null;
      for (let i = start; i <= end; i += step) {
        values.add(i);
      }
      continue;
    }

    // Wildcard
    if (trimmed === '*') {
      for (let i = min; i <= max; i++) {
        values.add(i);
      }
      continue;
    }

    // Range: N-M
    const rangeMatch = trimmed.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      if (start < min || end > max || start > end) return null;
      for (let i = start; i <= end; i++) {
        values.add(i);
      }
      continue;
    }

    // Single value
    if (/^\d+$/.test(trimmed)) {
      const val = parseInt(trimmed, 10);
      if (val < min || val > max) return null;
      values.add(val);
      continue;
    }

    // Unknown token
    return null;
  }

  return Array.from(values).sort((a, b) => a - b);
}

// ─── Describe Individual Field ───────────────────────────────────────────────

function describeField(token: string, fieldIndex: number): string {
  const def = CRON_FIELDS[fieldIndex];

  if (token === '*') {
    return `every ${def.name.toLowerCase()}`;
  }

  // Step: */N
  const globalStep = token.match(/^\*\/(\d+)$/);
  if (globalStep) {
    return `every ${globalStep[1]} ${def.name.toLowerCase()}${parseInt(globalStep[1]) > 1 ? 's' : ''}`;
  }

  // Range/step: N-M/S
  const rangeStep = token.match(/^(\d+)-(\d+)\/(\d+)$/);
  if (rangeStep) {
    const start = formatFieldValue(parseInt(rangeStep[1]), fieldIndex);
    const end = formatFieldValue(parseInt(rangeStep[2]), fieldIndex);
    return `every ${rangeStep[3]} ${def.name.toLowerCase()}s from ${start} through ${end}`;
  }

  // Range: N-M
  const range = token.match(/^(\d+)-(\d+)$/);
  if (range) {
    const start = formatFieldValue(parseInt(range[1]), fieldIndex);
    const end = formatFieldValue(parseInt(range[2]), fieldIndex);
    return `${start} through ${end}`;
  }

  // List: N,M,...
  if (token.includes(',')) {
    const parts = token.split(',').map((v) => formatFieldValue(parseInt(v.trim()), fieldIndex));
    if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
    return parts.slice(0, -1).join(', ') + ', and ' + parts[parts.length - 1];
  }

  // Single value
  if (/^\d+$/.test(token)) {
    return formatFieldValue(parseInt(token), fieldIndex);
  }

  return token;
}

function formatFieldValue(value: number, fieldIndex: number): string {
  if (fieldIndex === 3) {
    // Month
    return MONTH_NAMES[value - 1] || String(value);
  }
  if (fieldIndex === 4) {
    // Day of week
    return WEEKDAY_NAMES[value] || String(value);
  }
  return String(value);
}

// ─── Build Human-Readable Description ────────────────────────────────────────

function buildDescription(fields: string[]): string {
  const [minute, hour, dom, month, dow] = fields;

  // Every minute
  if (fields.every((f) => f === '*')) {
    return 'Every minute';
  }

  const parts: string[] = [];

  // Time description
  if (minute === '*' && hour === '*') {
    parts.push('Every minute');
  } else if (minute.startsWith('*/')) {
    parts.push(`Every ${minute.slice(2)} minutes`);
  } else if (hour === '*' && /^\d+$/.test(minute)) {
    parts.push(`At minute ${minute} of every hour`);
  } else if (/^\d+$/.test(minute) && /^\d+$/.test(hour)) {
    const h = parseInt(hour);
    const m = parseInt(minute);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const displayMin = m.toString().padStart(2, '0');
    parts.push(`At ${displayHour}:${displayMin} ${period}`);
  } else if (/^\d+$/.test(minute) && hour.startsWith('*/')) {
    parts.push(`At minute ${minute} past every ${hour.slice(2)} hours`);
  } else {
    // Complex time
    if (minute !== '*') parts.push(`minute ${describeField(minute, 0)}`);
    if (hour !== '*') parts.push(`hour ${describeField(hour, 1)}`);
  }

  // Day of month
  if (dom !== '*') {
    if (/^\d+$/.test(dom)) {
      parts.push(`on day ${dom} of the month`);
    } else {
      parts.push(`on ${describeField(dom, 2)} of the month`);
    }
  }

  // Month
  if (month !== '*') {
    parts.push(`in ${describeField(month, 3)}`);
  }

  // Day of week
  if (dow !== '*') {
    parts.push(`on ${describeField(dow, 4)}`);
  }

  // Fallback for every day
  if (dom === '*' && month === '*' && dow === '*' && parts.length === 1) {
    // nothing extra needed
  }

  return parts.join(', ') || 'Every minute';
}

// ─── Calculate Next Run Times ────────────────────────────────────────────────

function getNextRuns(fields: string[], count: number, from?: Date): Date[] {
  const now = from || new Date();
  const runs: Date[] = [];

  const resolvedFields = fields.map((f, i) => resolveNames(f, i));

  const minuteVals = expandField(resolvedFields[0], 0, 59);
  const hourVals = expandField(resolvedFields[1], 0, 23);
  const domVals = expandField(resolvedFields[2], 1, 31);
  const monthVals = expandField(resolvedFields[3], 1, 12);
  const dowVals = expandField(resolvedFields[4], 0, 6);

  if (!minuteVals || !hourVals || !domVals || !monthVals || !dowVals) {
    return [];
  }

  // Start from the next minute
  const candidate = new Date(now);
  candidate.setSeconds(0, 0);
  candidate.setMinutes(candidate.getMinutes() + 1);

  const maxIterations = 525960; // ~1 year of minutes
  let iterations = 0;

  while (runs.length < count && iterations < maxIterations) {
    iterations++;

    const cMonth = candidate.getMonth() + 1;
    const cDom = candidate.getDate();
    const cDow = candidate.getDay();
    const cHour = candidate.getHours();
    const cMinute = candidate.getMinutes();

    if (
      monthVals.includes(cMonth) &&
      domVals.includes(cDom) &&
      dowVals.includes(cDow) &&
      hourVals.includes(cHour) &&
      minuteVals.includes(cMinute)
    ) {
      runs.push(new Date(candidate));
    }

    candidate.setMinutes(candidate.getMinutes() + 1);
  }

  return runs;
}

// ─── Validate Single Field Token ─────────────────────────────────────────────

function validateFieldToken(token: string, min: number, max: number): boolean {
  // Wildcard
  if (token === '*') return true;

  // Step with wildcard: */N
  if (/^\*\/\d+$/.test(token)) {
    const step = parseInt(token.split('/')[1]);
    return step > 0 && step <= max;
  }

  const parts = token.split(',');
  for (const part of parts) {
    const trimmed = part.trim();

    // Range with step: N-M/S
    const rs = trimmed.match(/^(\d+)-(\d+)\/(\d+)$/);
    if (rs) {
      const s = parseInt(rs[1]);
      const e = parseInt(rs[2]);
      const st = parseInt(rs[3]);
      if (s < min || e > max || s > e || st <= 0) return false;
      continue;
    }

    // Range: N-M
    const r = trimmed.match(/^(\d+)-(\d+)$/);
    if (r) {
      const s = parseInt(r[1]);
      const e = parseInt(r[2]);
      if (s < min || e > max || s > e) return false;
      continue;
    }

    // Single value
    if (/^\d+$/.test(trimmed)) {
      const v = parseInt(trimmed);
      if (v < min || v > max) return false;
      continue;
    }

    return false;
  }

  return true;
}

// ─── Main: Parse Cron Expression ─────────────────────────────────────────────

export function parseCronExpression(expression: string): CronParseResult {
  const trimmed = expression.trim();

  if (!trimmed) {
    return { success: false, error: 'Please enter a cron expression.' };
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length !== 5) {
    return {
      success: false,
      error: `Expected 5 fields (minute hour day-of-month month day-of-week), got ${parts.length}.`,
    };
  }

  // Resolve names to numbers for validation
  const resolved = parts.map((p, i) => resolveNames(p, i));

  // Validate each field
  for (let i = 0; i < 5; i++) {
    const def = CRON_FIELDS[i];
    if (!validateFieldToken(resolved[i], def.min, def.max)) {
      return {
        success: false,
        error: `Invalid ${def.name} field: "${parts[i]}". Expected ${def.min}–${def.max}${def.names ? ` or names (${def.names.join(', ')})` : ''}.`,
      };
    }
  }

  // Build field descriptions
  const fields: CronField[] = CRON_FIELDS.map((def, i) => ({
    name: def.name,
    value: parts[i],
    description: describeField(resolved[i], i),
  }));

  // Build human-readable description
  const description = buildDescription(resolved);

  // Calculate next runs
  const nextRuns = getNextRuns(resolved, 5);

  return {
    success: true,
    data: {
      fields,
      description,
      nextRuns,
    },
  };
}

// ─── Main: Build Cron Expression ─────────────────────────────────────────────

export function buildCronExpression(options: CronBuildOptions): string {
  return `${options.minute} ${options.hour} ${options.dayOfMonth} ${options.month} ${options.dayOfWeek}`;
}

// ─── Select Options for Generator UI ─────────────────────────────────────────

export interface CronSelectOption {
  value: string;
  label: string;
}

export function getMinuteOptions(): CronSelectOption[] {
  const options: CronSelectOption[] = [
    { value: '*', label: 'Every minute (*)' },
    { value: '*/5', label: 'Every 5 minutes (*/5)' },
    { value: '*/10', label: 'Every 10 minutes (*/10)' },
    { value: '*/15', label: 'Every 15 minutes (*/15)' },
    { value: '*/30', label: 'Every 30 minutes (*/30)' },
  ];
  for (let i = 0; i <= 59; i++) {
    options.push({ value: String(i), label: `At minute ${i}` });
  }
  return options;
}

export function getHourOptions(): CronSelectOption[] {
  const options: CronSelectOption[] = [
    { value: '*', label: 'Every hour (*)' },
    { value: '*/2', label: 'Every 2 hours (*/2)' },
    { value: '*/3', label: 'Every 3 hours (*/3)' },
    { value: '*/4', label: 'Every 4 hours (*/4)' },
    { value: '*/6', label: 'Every 6 hours (*/6)' },
    { value: '*/12', label: 'Every 12 hours (*/12)' },
  ];
  for (let i = 0; i <= 23; i++) {
    const period = i >= 12 ? 'PM' : 'AM';
    const display = i === 0 ? 12 : i > 12 ? i - 12 : i;
    options.push({ value: String(i), label: `At ${display}:00 ${period} (${i})` });
  }
  return options;
}

export function getDayOfMonthOptions(): CronSelectOption[] {
  const options: CronSelectOption[] = [
    { value: '*', label: 'Every day (*)' },
    { value: '1,15', label: '1st and 15th (1,15)' },
  ];
  for (let i = 1; i <= 31; i++) {
    const suffix = getOrdinalSuffix(i);
    options.push({ value: String(i), label: `${i}${suffix} of month` });
  }
  return options;
}

export function getMonthOptions(): CronSelectOption[] {
  const options: CronSelectOption[] = [{ value: '*', label: 'Every month (*)' }];
  for (let i = 1; i <= 12; i++) {
    options.push({ value: String(i), label: `${MONTH_NAMES[i - 1]} (${i})` });
  }
  return options;
}

export function getDayOfWeekOptions(): CronSelectOption[] {
  const options: CronSelectOption[] = [
    { value: '*', label: 'Every day (*)' },
    { value: '1-5', label: 'Weekdays (1-5)' },
    { value: '0,6', label: 'Weekends (0,6)' },
  ];
  for (let i = 0; i <= 6; i++) {
    options.push({ value: String(i), label: `${WEEKDAY_NAMES[i]} (${i})` });
  }
  return options;
}

function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
