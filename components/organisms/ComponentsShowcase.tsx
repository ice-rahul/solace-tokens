import { motion } from "motion/react";
import type { TokenSet } from "@/lib/tokens";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { SPRING } from "@/lib/motion-tokens";

export function ComponentsShowcase({ tokens }: { tokens: TokenSet }) {
  return (
    <section className="mb-24 sm:mb-32">
      <SectionLabel index="03" label="Components, built from the tokens" />
      <div className="grid sm:grid-cols-2 gap-6">
        <div
          className="rounded-xl border p-6 flex flex-col gap-4"
          style={{ borderColor: tokens.border, background: tokens.surface }}
        >
          <span className="font-mono text-[11px] uppercase tracking-wide opacity-50">Button</span>
          <div className="flex flex-wrap gap-3">
            <Button tokens={tokens} variant="primary">Start a session</Button>
            <Button tokens={tokens} variant="secondary">Learn more</Button>
          </div>
        </div>

        <div
          className="rounded-xl border p-6 flex flex-col gap-3"
          style={{ borderColor: tokens.border, background: tokens.surface }}
        >
          <span className="font-mono text-[11px] uppercase tracking-wide opacity-50">Input</span>
          <Input placeholder="What are you focusing on?" tokens={tokens} />
        </div>

        <motion.div
          whileHover={{ y: -3 }}
          transition={SPRING.gentle}
          className="rounded-xl border p-6 sm:col-span-2"
          style={{ borderColor: tokens.border, background: tokens.surface }}
        >
          <span className="font-mono text-[11px] uppercase tracking-wide opacity-50 block mb-3">Card</span>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-display text-lg mb-1">Deep work, 50 minutes</h4>
              <p className="text-sm opacity-70">Notifications paused. Nothing else asks for you until it ends.</p>
            </div>
            <span
              className="font-mono text-[11px] px-2 py-1 rounded-full whitespace-nowrap"
              style={{ background: tokens.accent, color: tokens.accentText }}
            >
              Active
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
