# Solace — Tokens

A live design-token playground, built for the Buffer Senior Design Engineer application.

**What this demonstrates:** given a single seed color, the system derives a full semantic
color palette (background, surface, primary, accent, success, danger, text), computes
WCAG 2.1 contrast ratios for every pairing in real time, auto-corrects any pairing that
fails, and supports independently-derived light/dark modes — all client-side, no backend.

It's built around a fictional brand ("Solace," a calm focus tool) so the token system has
real content to sit inside, rather than floating as an abstract demo.

## Stack

- Next.js 15 (App Router) + TypeScript
- Motion (Framer Motion's successor) for the swatch morph transitions and page-load moments
- Tailwind CSS v4 for layout utilities
- No backend — all color math (`lib/tokens.ts`) runs client-side: HSL derivation, WCAG
  relative-luminance contrast calculation, and iterative lightness correction to force
  failing pairs into AA compliance.

## Fonts

This was built in a sandboxed environment without outbound access to Google Fonts, so
`app/layout.tsx` currently falls back to close system-font equivalents. The intended
type system — **Fraunces** (display), **Inter** (body), **IBM Plex Mono** (token
values) — is commented in `app/layout.tsx` and just needs uncommenting once deployed
somewhere with normal internet access (e.g. Vercel).

## Run locally

```bash
npm install
npm run dev
```

## Structure

- `lib/tokens.ts` — color science: hex/HSL conversion, WCAG contrast math, token derivation
- `app/page.tsx` — the full experience: hero, rationale, live token playground, components
  built from the tokens, composition, and the logo mark
- `app/layout.tsx`, `app/globals.css` — font wiring and base styles (reduced-motion and
  visible-focus support included)

## Architecture notes (v2 revision)

Refactored from an initial single-file draft after review. Changes:

- **Atomic component structure**: `components/atoms` (Button, Input, LogoMark,
  SectionLabel, WcagBadge) → `components/molecules` (Swatch, HuePicker,
  SeedColorPicker, StaggeredText, AccessibilityStat) → `components/organisms`
  (Header, Hero, ResearchSection, TokensSection, ComponentsShowcase,
  CompositionSection, MarkSection). `app/page.tsx` now only holds state
  (seed color, light/dark mode) and composes organisms — no rendering logic
  lives there.
- **No magic numbers**: every animation duration, easing curve, spring
  config, and stagger delay is named in `lib/motion-tokens.ts`. Every
  color-derivation constant (saturation caps, lightness targets, contrast
  correction step size) is named in `lib/tokens.ts`.
- **Real hover/press states**: buttons, swatches, cards, and preset dots all
  have `whileHover`/`whileTap` states with spring physics, not just CSS
  `:hover`.
- **Custom drag interaction**: the seed color picker's primary control is a
  hand-built hue-drag slider (`components/molecules/HuePicker.tsx`), not the
  flat native `<input type="color">` — a native color input is kept
  alongside as a precise fallback.
- **Dynamic, computed text**: the "N / 8 pairs pass WCAG AA" stat in the
  tokens section is computed live from the actual current token set on every
  render — it isn't hardcoded copy, and it would visibly report a failure if
  the derivation logic ever regressed.
- **Staggered entrance**: the hero headline reveals word-by-word on mount
  via `StaggeredText`, instead of appearing all at once.
