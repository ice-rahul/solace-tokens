import { motion } from "motion/react";
import { DURATION } from "@/lib/motion-tokens";

type WcagBadgeProps = {
  ratio: number;
  pass: boolean;
  label: string;
};

// Colors are semantic constants, not re-derived from tokens, because a
// pass/fail signal needs to stay legible regardless of the active seed color.
const PASS_BG = "rgba(60,140,107,0.15)";
const PASS_FG = "#3C8C6B";
const FAIL_BG = "rgba(179,38,30,0.15)";
const FAIL_FG = "#B3261E";

export function WcagBadge({ ratio, pass, label }: WcagBadgeProps) {
  return (
    <motion.span
      layout
      initial={false}
      animate={{
        backgroundColor: pass ? PASS_BG : FAIL_BG,
        color: pass ? PASS_FG : FAIL_FG,
      }}
      transition={{ duration: DURATION.fast }}
      className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm inline-flex items-center gap-1"
    >
      {pass ? "✓" : "✕"} {label} {ratio.toFixed(1)}:1
    </motion.span>
  );
}
