// Color science: hex <-> HSL conversion, WCAG contrast calculation,
// and derivation of a full semantic token set from a single seed color.

export type HSL = { h: number; s: number; l: number };
export type RGB = { r: number; g: number; b: number };

export function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (v: number) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  h /= 360;
  s /= 100;
  l /= 100;
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r: r * 255, g: g * 255, b: b * 255 };
}

export function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex));
}

export function hslToHex(hsl: HSL): string {
  return rgbToHex(hslToRgb(hsl));
}

// --- WCAG contrast math ---

function relativeLuminance({ r, g, b }: RGB): number {
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const R = channel(r);
  const G = channel(g);
  const B = channel(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function contrastRatio(hexA: string, hexB: string): number {
  const lumA = relativeLuminance(hexToRgb(hexA));
  const lumB = relativeLuminance(hexToRgb(hexB));
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

export type WcagResult = {
  ratio: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
};

// WCAG 2.1 contrast thresholds, named once and referenced everywhere else —
// never re-typed as a bare number at the call site.
export const WCAG_AA_NORMAL_RATIO = 4.5;
export const WCAG_AA_LARGE_RATIO = 3;
export const WCAG_AAA_NORMAL_RATIO = 7;

export function checkWcag(hexA: string, hexB: string): WcagResult {
  const ratio = contrastRatio(hexA, hexB);
  return {
    ratio,
    aaNormal: ratio >= WCAG_AA_NORMAL_RATIO,
    aaLarge: ratio >= WCAG_AA_LARGE_RATIO,
    aaaNormal: ratio >= WCAG_AAA_NORMAL_RATIO,
  };
}

// How far, in lightness %, each correction step nudges a color, and how
// many steps we allow before giving up rather than looping forever.
const CONTRAST_STEP_L = 1.5;
const CONTRAST_MAX_STEPS = 60;
const POLE_DARK = "#0B0E0D";
const POLE_LIGHT = "#FFFFFF";

// Pick whichever of white/near-black gives better contrast against a background,
// rather than nudging a fixed starting color — this avoids the case where the
// "correct" direction is to flip poles entirely (e.g. white text is already
// maxed out but black would actually contrast far better).
export function pickTextColor(against: string, darkText = POLE_DARK, lightText = POLE_LIGHT): string {
  const darkRatio = contrastRatio(darkText, against);
  const lightRatio = contrastRatio(lightText, against);
  return darkRatio >= lightRatio ? darkText : lightText;
}

// Given a background color, guarantee there's a text color (black or white pole)
// that clears the target ratio — if neither pole clears it yet (can happen for
// saturated mid-luminance backgrounds), push the background's own lightness
// toward whichever pole is winning until it does. Returns both the adjusted
// background and the text color to use on it.
export function ensureReadablePair(
  bgHex: string,
  targetRatio: number = WCAG_AA_NORMAL_RATIO
): { background: string; text: string } {
  let bg = bgHex;
  let text = pickTextColor(bg);
  let ratio = contrastRatio(text, bg);
  let guard = 0;

  while (ratio < targetRatio && guard < CONTRAST_MAX_STEPS) {
    const hsl = hexToHsl(bg);
    const pushLighter = text === POLE_DARK;
    const nextL = pushLighter ? Math.min(100, hsl.l + CONTRAST_STEP_L) : Math.max(0, hsl.l - CONTRAST_STEP_L);
    if (nextL === hsl.l) break; // hit the bound, can't push further
    bg = hslToHex({ ...hsl, l: nextL });
    text = pickTextColor(bg);
    ratio = contrastRatio(text, bg);
    guard++;
  }

  return { background: bg, text };
}

export function ensureContrast(hex: string, against: string, targetRatio: number = WCAG_AA_NORMAL_RATIO): string {
  let hsl = hexToHsl(hex);
  let current = hslToHex(hsl);
  if (contrastRatio(current, against) >= targetRatio) return current;

  const againstLum = relativeLuminance(hexToRgb(against));
  const darkenDirection = againstLum > 0.5; // if background is light, darken the text color

  for (let i = 0; i < CONTRAST_MAX_STEPS; i++) {
    hsl = {
      ...hsl,
      l: darkenDirection ? Math.max(0, hsl.l - CONTRAST_STEP_L) : Math.min(100, hsl.l + CONTRAST_STEP_L),
    };
    current = hslToHex(hsl);
    if (contrastRatio(current, against) >= targetRatio) break;
    if (hsl.l <= 0 || hsl.l >= 100) break;
  }
  return current;
}

// --- Semantic token derivation from a single seed color ---

// Every tuning constant used to derive the palette lives here, named,
// instead of as inline numbers inside deriveTokens.
const PALETTE = {
  light: {
    backgroundL: 97,
    backgroundSatCap: 12,
    backgroundSatFactor: 0.15,
    surfaceL: 100,
    surfaceSatCap: 10,
    surfaceSatFactor: 0.12,
    textPrimaryL: 12,
    textPrimarySatCap: 15,
    textPrimarySatFactor: 0.25,
    textSecondaryL: 38,
    textSecondarySatCap: 12,
    textSecondarySatFactor: 0.2,
    primaryLCap: 42,
    borderL: 88,
    borderSatCap: 12,
    borderSatFactor: 0.15,
  },
  dark: {
    backgroundL: 9,
    backgroundSatCap: 18,
    backgroundSatFactor: 0.2,
    surfaceL: 13,
    surfaceSatCap: 20,
    surfaceSatFactor: 0.22,
    textPrimaryL: 95,
    textPrimarySatCap: 8,
    textPrimarySatFactor: 0.1,
    textSecondaryL: 68,
    textSecondarySatCap: 10,
    textSecondarySatFactor: 0.15,
    primaryLFloor: 58,
    primarySatFloor: 35,
    primarySatFactor: 0.85,
    borderL: 22,
    borderSatCap: 15,
    borderSatFactor: 0.2,
  },
};

const ACCENT_HUE_SHIFT = 45; // degrees — warm counterweight to the seed hue
const ACCENT_SAT_BOOST = 10;
const ACCENT_SAT_CAP_LIGHT = 70;
const ACCENT_SAT_CAP_DARK = 65;
const ACCENT_L_LIGHT = 45;
const ACCENT_L_DARK = 60;

const READABLE_TARGET_RATIO_UI = 3; // large/graphical elements: WCAG "large text" threshold is enough
const SUCCESS_SEED_LIGHT = "#2E7D5B";
const SUCCESS_SEED_DARK = "#4FBE8E";
const DANGER_SEED_LIGHT = "#B3261E";
const DANGER_SEED_DARK = "#FF7A6E";

export type TokenSet = {
  seed: string;
  mode: "light" | "dark";
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  primaryText: string; // text color safe to place ON primary
  accent: string;
  accentText: string;
  success: string;
  danger: string;
  border: string;
};

export function deriveTokens(seedHex: string, mode: "light" | "dark"): TokenSet {
  const seed = hexToHsl(seedHex);
  const p = mode === "light" ? PALETTE.light : PALETTE.dark;

  const background = hslToHex({ h: seed.h, s: Math.min(seed.s * p.backgroundSatFactor, p.backgroundSatCap), l: p.backgroundL });
  const surface = hslToHex({ h: seed.h, s: Math.min(seed.s * p.surfaceSatFactor, p.surfaceSatCap), l: p.surfaceL });
  const textPrimary = hslToHex({ h: seed.h, s: Math.min(seed.s * p.textPrimarySatFactor, p.textPrimarySatCap), l: p.textPrimaryL });
  const textSecondary = hslToHex({ h: seed.h, s: Math.min(seed.s * p.textSecondarySatFactor, p.textSecondarySatCap), l: p.textSecondaryL });
  const border = hslToHex({ h: seed.h, s: Math.min(seed.s * p.borderSatFactor, p.borderSatCap), l: p.borderL });

  // Primary = the seed itself, tuned for the mode
  let primary = mode === "light"
    ? hslToHex({ h: seed.h, s: seed.s, l: Math.min(seed.l, PALETTE.light.primaryLCap) })
    : hslToHex({ h: seed.h, s: Math.max(seed.s * PALETTE.dark.primarySatFactor, PALETTE.dark.primarySatFloor), l: Math.max(seed.l, PALETTE.dark.primaryLFloor) });
  primary = ensureContrast(primary, background, READABLE_TARGET_RATIO_UI);
  const primaryPair = ensureReadablePair(primary, WCAG_AA_NORMAL_RATIO);
  primary = primaryPair.background;
  const primaryText = primaryPair.text;

  // Accent = hue-shifted, warm counterweight to the seed
  const accentHue = (seed.h + ACCENT_HUE_SHIFT) % 360;
  let accent = mode === "light"
    ? hslToHex({ h: accentHue, s: Math.min(seed.s + ACCENT_SAT_BOOST, ACCENT_SAT_CAP_LIGHT), l: ACCENT_L_LIGHT })
    : hslToHex({ h: accentHue, s: Math.min(seed.s + ACCENT_SAT_BOOST, ACCENT_SAT_CAP_DARK), l: ACCENT_L_DARK });
  accent = ensureContrast(accent, background, READABLE_TARGET_RATIO_UI);
  const accentPair = ensureReadablePair(accent, WCAG_AA_NORMAL_RATIO);
  accent = accentPair.background;
  const accentText = accentPair.text;

  const success = ensureContrast(mode === "light" ? SUCCESS_SEED_LIGHT : SUCCESS_SEED_DARK, background, READABLE_TARGET_RATIO_UI);
  const danger = ensureContrast(mode === "light" ? DANGER_SEED_LIGHT : DANGER_SEED_DARK, background, READABLE_TARGET_RATIO_UI);

  return {
    seed: seedHex,
    mode,
    background,
    surface,
    textPrimary,
    textSecondary,
    primary,
    primaryText,
    accent,
    accentText,
    success,
    danger,
    border,
  };
}
