import { motion } from "motion/react";
import type { TokenSet } from "@/lib/tokens";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { LogoMark } from "@/components/atoms/LogoMark";
import { Button } from "@/components/atoms/Button";
import { DURATION, EASE, VIEWPORT_MARGIN } from "@/lib/motion-tokens";

export function CompositionSection({ tokens }: { tokens: TokenSet }) {
  return (
    <section className="mb-24 sm:mb-32">
      <SectionLabel index="04" label="Coming together" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: VIEWPORT_MARGIN }}
        transition={{ duration: DURATION.slow, ease: EASE.out }}
        className="rounded-2xl border p-10 sm:p-14 text-center flex flex-col items-center gap-5"
        style={{ borderColor: tokens.border, background: tokens.surface }}
      >
        <LogoMark tokens={tokens} />
        <h3 className="font-display text-2xl sm:text-3xl max-w-md">
          The room stays quiet.
          <br />
          <span className="italic" style={{ color: tokens.primary }}>You do the work.</span>
        </h3>
        <Button tokens={tokens} variant="primary">Try Solace</Button>
      </motion.div>
    </section>
  );
}

export function MarkSection({ tokens }: { tokens: TokenSet }) {
  return (
    <section className="mb-16">
      <SectionLabel index="05" label="The mark" />
      <p className="text-[15px] leading-relaxed opacity-70 max-w-xl mb-6">
        An arc that never quite closes, settling into a single resting point — the shape
        of a held breath letting go. It redraws itself slowly, always finishing in the
        same place, in whichever seed color the system is holding.
      </p>
      <div
        className="rounded-xl border p-10 flex items-center justify-center"
        style={{ borderColor: tokens.border, background: tokens.surface }}
      >
        <LogoMark tokens={tokens} size={88} />
      </div>
    </section>
  );
}
