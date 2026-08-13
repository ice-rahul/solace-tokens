// Centralized motion values. Every duration, easing curve, and spring
// config used across the app is named here — nothing is inlined as a
// bare number at the call site.

export const DURATION = {
  instant: 0.15,
  fast: 0.25,
  base: 0.4,
  slow: 0.6,
  ambient: 4, // for slow looping/ambient motion (e.g. the logo mark)
} as const;

export const EASE = {
  standard: [0.4, 0, 0.2, 1] as const, // material-style standard easing
  out: "easeOut" as const,
  inOut: "easeInOut" as const,
};

export const SPRING = {
  snappy: { type: "spring" as const, stiffness: 420, damping: 28 },
  gentle: { type: "spring" as const, stiffness: 220, damping: 24 },
};

export const STAGGER = {
  swatches: 0.035, // delay between each swatch's entrance
  words: 0.045, // delay between each word in the staggered headline
};

export const VIEWPORT_MARGIN = "-80px"; // how early whileInView triggers before an element enters view

export const HOVER_LIFT = -2; // px, subtle upward lift on hover for interactive cards/buttons
export const PRESS_SCALE = 0.97; // scale on active/press state
