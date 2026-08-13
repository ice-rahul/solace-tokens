import { motion } from "motion/react";
import { checkWcag, type TokenSet } from "@/lib/tokens";
import { WcagBadge } from "@/components/atoms/WcagBadge";
import { DURATION, EASE, HOVER_LIFT, SPRING } from "@/lib/motion-tokens";

type SwatchProps = {
  name: string;
  hex: string;
  against: string;
  tokens: TokenSet;
};

export function Swatch({ name, hex, against, tokens }: SwatchProps) {
  const wcag = checkWcag(hex, against);
  return (
    <motion.div
      layout
      whileHover={{ y: HOVER_LIFT }}
      transition={SPRING.gentle}
      className="flex flex-col gap-2 rounded-lg overflow-hidden border cursor-default"
      style={{ borderColor: tokens.border }}
    >
      <motion.div
        layout
        animate={{ backgroundColor: hex }}
        transition={{ duration: DURATION.base, ease: EASE.inOut }}
        className="h-20 w-full"
      />
      <div className="px-3 pb-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{name}</span>
          <span className="font-mono text-[11px] opacity-60">{hex}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <WcagBadge ratio={wcag.ratio} pass={wcag.aaNormal} label="AA" />
          <WcagBadge ratio={wcag.ratio} pass={wcag.aaLarge} label="AA Large" />
        </div>
      </div>
    </motion.div>
  );
}
