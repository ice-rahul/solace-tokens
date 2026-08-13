import { motion } from "motion/react";
import type { ReactNode } from "react";
import { STAGGER, DURATION, EASE } from "@/lib/motion-tokens";

type StaggeredTextProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "span";
  delayStart?: number;
};

const container = (delayStart: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER.words, delayChildren: delayStart },
  },
});

const word = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.out } },
};

// Splits text into words and reveals them in sequence on mount — used for
// the hero headline so the page's first moment feels composed, not static.
export function StaggeredText({ text, className, style, delayStart = 0 }: StaggeredTextProps): ReactNode {
  const words = text.split(" ");
  return (
    <motion.span
      variants={container(delayStart)}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ ...style, display: "inline-block" }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} style={{ display: "inline-block", marginRight: "0.25em" }}>
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}
