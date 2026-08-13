import { motion } from "motion/react";
import type { ReactNode } from "react";
import { SPRING, PRESS_SCALE, HOVER_LIFT } from "@/lib/motion-tokens";
import type { TokenSet } from "@/lib/tokens";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: ReactNode;
  tokens: TokenSet;
  variant?: ButtonVariant;
  onClick?: () => void;
};

export function Button({ children, tokens, variant = "primary", onClick }: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: HOVER_LIFT, filter: "brightness(1.06)" }}
      whileTap={{ scale: PRESS_SCALE, y: 0 }}
      transition={SPRING.snappy}
      className="px-4 py-2 rounded-lg text-sm font-medium hover:cursor-pointer"
      style={
        isPrimary
          ? { background: tokens.primary, color: tokens.primaryText }
          : { background: "transparent", color: tokens.textPrimary, border: `1px solid ${tokens.border}` }
      }
    >
      {children}
    </motion.button>
  );
}
