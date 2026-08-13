import { motion, AnimatePresence } from "motion/react";
import { checkWcag, type TokenSet } from "@/lib/tokens";
import { DURATION } from "@/lib/motion-tokens";

type Pair = { name: string; hex: string; against: string };

function buildPairs(tokens: TokenSet): Pair[] {
  return [
    { name: "Background / Text primary", hex: tokens.background, against: tokens.textPrimary },
    { name: "Surface / Text primary", hex: tokens.surface, against: tokens.textPrimary },
    { name: "Primary / Primary text", hex: tokens.primary, against: tokens.primaryText },
    { name: "Accent / Accent text", hex: tokens.accent, against: tokens.accentText },
    { name: "Success / Background", hex: tokens.success, against: tokens.background },
    { name: "Danger / Background", hex: tokens.danger, against: tokens.background },
    { name: "Border / Text primary", hex: tokens.border, against: tokens.textPrimary },
    { name: "Text secondary / Background", hex: tokens.textSecondary, against: tokens.background },
  ];
}

// This count is computed live from the actual current token set — it is
// not hardcoded copy. If the derivation logic ever regresses and produces
// a failing pair, this number will visibly say so.
export function AccessibilityStat({ tokens }: { tokens: TokenSet }) {
  const pairs = buildPairs(tokens);
  const passing = pairs.filter((p) => checkWcag(p.hex, p.against).aaNormal).length;
  const allPass = passing === pairs.length;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${passing}-${pairs.length}-${tokens.mode}`}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: DURATION.fast }}
        className="font-mono text-[11px] inline-flex items-center gap-1.5"
        style={{ color: allPass ? "#3C8C6B" : "#B3261E" }}
      >
        {allPass ? "✓" : "!"} {passing} / {pairs.length} pairs pass WCAG AA in {tokens.mode} mode
      </motion.div>
    </AnimatePresence>
  );
}
