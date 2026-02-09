export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface ColorResult {
  hex: string;
  rgb: RgbColor;
  hsl: HslColor;
  rgbString: string;
  hslString: string;
  hexString: string;
}

export interface ColorParseSuccess {
  success: true;
  data: ColorResult;
}

export interface ColorParseError {
  success: false;
  error: string;
}

export type ColorParseResult = ColorParseSuccess | ColorParseError;

// --- Conversion helpers ---

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex: string): RgbColor | null {
  const clean = hex.replace('#', '');
  let full = clean;

  // Handle shorthand (#abc → #aabbcc)
  if (full.length === 3) {
    full = full[0] + full[0] + full[1] + full[1] + full[2] + full[2];
  }

  if (full.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(full)) return null;

  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function rgbToHsl(r: number, g: number, b: number): HslColor {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    if (max === rn) h = ((gn - bn) / delta + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / delta + 2) / 6;
    else h = ((rn - gn) / delta + 4) / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): RgbColor {
  const sn = s / 100;
  const ln = l / 100;
  const hn = ((h % 360) + 360) % 360;

  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((hn / 60) % 2) - 1));
  const m = ln - c / 2;

  let rn = 0,
    gn = 0,
    bn = 0;

  if (hn < 60) [rn, gn, bn] = [c, x, 0];
  else if (hn < 120) [rn, gn, bn] = [x, c, 0];
  else if (hn < 180) [rn, gn, bn] = [0, c, x];
  else if (hn < 240) [rn, gn, bn] = [0, x, c];
  else if (hn < 300) [rn, gn, bn] = [x, 0, c];
  else [rn, gn, bn] = [c, 0, x];

  return {
    r: Math.round((rn + m) * 255),
    g: Math.round((gn + m) * 255),
    b: Math.round((bn + m) * 255),
  };
}

// --- Build result from RGB ---

function buildResult(rgb: RgbColor): ColorResult {
  const { r, g, b } = rgb;
  const hex = rgbToHex(r, g, b);
  const hsl = rgbToHsl(r, g, b);

  return {
    hex,
    rgb,
    hsl,
    hexString: hex.toUpperCase(),
    rgbString: `rgb(${r}, ${g}, ${b})`,
    hslString: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
  };
}

// --- Parse any color format ---

export const parseColor = (input: string): ColorParseResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { success: false, error: 'Please enter a color value' };
  }

  // Try HEX
  if (/^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(trimmed)) {
    const rgb = hexToRgb(trimmed);
    if (rgb) return { success: true, data: buildResult(rgb) };
  }

  // Try rgb(r, g, b)
  const rgbMatch = trimmed.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*[\d.]+\s*)?\)$/i
  );
  if (rgbMatch) {
    const r = clamp(parseInt(rgbMatch[1], 10), 0, 255);
    const g = clamp(parseInt(rgbMatch[2], 10), 0, 255);
    const b = clamp(parseInt(rgbMatch[3], 10), 0, 255);
    return { success: true, data: buildResult({ r, g, b }) };
  }

  // Try hsl(h, s%, l%)
  const hslMatch = trimmed.match(
    /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?\s*(?:,\s*[\d.]+\s*)?\)$/i
  );
  if (hslMatch) {
    const h = parseInt(hslMatch[1], 10) % 360;
    const s = clamp(parseInt(hslMatch[2], 10), 0, 100);
    const l = clamp(parseInt(hslMatch[3], 10), 0, 100);
    const rgb = hslToRgb(h, s, l);
    return { success: true, data: buildResult(rgb) };
  }

  // Try plain numbers: 255, 128, 0
  const numMatch = trimmed.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/);
  if (numMatch) {
    const r = clamp(parseInt(numMatch[1], 10), 0, 255);
    const g = clamp(parseInt(numMatch[2], 10), 0, 255);
    const b = clamp(parseInt(numMatch[3], 10), 0, 255);
    return { success: true, data: buildResult({ r, g, b }) };
  }

  return {
    success: false,
    error:
      'Unrecognized format. Try HEX (#ff6600), RGB (rgb(255, 102, 0)), or HSL (hsl(24, 100%, 50%))',
  };
};
