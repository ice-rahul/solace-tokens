import { motion } from "motion/react";
import type { TokenSet } from "@/lib/tokens";
import { DURATION } from "@/lib/motion-tokens";

type InputProps = {
  placeholder: string;
  tokens: TokenSet;
};

export function Input({ placeholder, tokens }: InputProps) {
  return (
    <motion.input
      placeholder={placeholder}
      whileFocus={{ borderColor: tokens.primary }}
      transition={{ duration: DURATION.fast }}
      className="w-full px-3 py-2 rounded-lg border bg-transparent text-sm outline-none"
      style={{ borderColor: tokens.border, color: tokens.textPrimary }}
    />
  );
}
