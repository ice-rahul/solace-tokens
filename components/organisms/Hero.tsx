import { motion } from "motion/react";
import type { TokenSet } from "@/lib/tokens";
import { StaggeredText } from "@/components/molecules/StaggeredText";
import { DURATION, EASE } from "@/lib/motion-tokens";

const EYEBROW_DELAY = 0;
const HEADLINE_DELAY = 0.15;
const BODY_DELAY = 0.9;

export function Hero({ tokens }: { tokens: TokenSet }) {
  return (
    <section className="mb-28 sm:mb-36">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: DURATION.base, delay: EYEBROW_DELAY, ease: EASE.out }}
        className="font-mono text-[11px] tracking-[0.15em] uppercase mb-6"
      >
        A design system, built live
      </motion.p>

      <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] tracking-tight mb-6">
        <StaggeredText text="One color in." delayStart={HEADLINE_DELAY} />
        <br />
        <StaggeredText
          text="A whole system out."
          delayStart={HEADLINE_DELAY + 0.35}
          className="italic"
          style={{ color: tokens.primary }}
        />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: DURATION.base, delay: BODY_DELAY, ease: EASE.out }}
        className="text-base sm:text-lg max-w-xl leading-relaxed"
      >
        This page is Solace — a fictional focus tool for people who feel overstimulated
        by their own software — and also a working demonstration: drag the hue strip
        below and watch the palette, contrast checks, and every component on this page
        recompute in real time.
      </motion.p>
    </section>
  );
}
