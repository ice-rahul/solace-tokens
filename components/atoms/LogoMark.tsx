import { motion } from "motion/react";
import { DURATION, EASE } from "@/lib/motion-tokens";
import type { TokenSet } from "@/lib/tokens";

const PATH_D = "M6 24 A14 14 0 1 1 20 34";
const PATH_LENGTH_RANGE = [0.85, 1, 0.85]; // breathing amplitude of the arc
const DOT_SCALE_RANGE = [1, 1.15, 1];

export function LogoMark({ tokens, size = 40 }: { tokens: TokenSet; size?: number }) {
  // A simple geometric mark: an arc resolving into a resting dot —
  // "the moment tension settles" — reflects Solace's calm-focus rationale.
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <motion.path
        d={PATH_D}
        stroke={tokens.primary}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        animate={{ pathLength: PATH_LENGTH_RANGE }}
        transition={{ duration: DURATION.ambient, repeat: Infinity, ease: EASE.inOut }}
      />
      <motion.circle
        cx="20"
        cy="34"
        r="3"
        fill={tokens.accent}
        animate={{ scale: DOT_SCALE_RANGE }}
        transition={{ duration: DURATION.ambient, repeat: Infinity, ease: EASE.inOut }}
      />
    </svg>
  );
}
