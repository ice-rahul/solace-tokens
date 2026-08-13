import { motion } from "motion/react";
import type { TokenSet } from "@/lib/tokens";
import { LogoMark } from "@/components/atoms/LogoMark";
import { SPRING, PRESS_SCALE } from "@/lib/motion-tokens";

type HeaderProps = {
  tokens: TokenSet;
  mode: "light" | "dark";
  onToggleMode: () => void;
};

export function Header({ tokens, mode, onToggleMode }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-20 backdrop-blur-sm border-b flex items-center justify-between px-6 sm:px-10 py-4"
      style={{ borderColor: tokens.border, background: `${tokens.background}CC` }}
    >
      <div className="flex items-center gap-2.5">
        <LogoMark tokens={tokens} />
        <span className="font-display text-lg tracking-tight">Solace</span>
      </div>
      <motion.button
        onClick={onToggleMode}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: PRESS_SCALE }}
        transition={SPRING.snappy}
        className="font-mono text-[11px] tracking-wide uppercase px-3 py-1.5 rounded-full border hover:cursor-pointer"
        style={{ borderColor: tokens.border }}
      >
        {mode === "light" ? "◐ Dark mode" : "◑ Light mode"}
      </motion.button>
    </header>
  );
}
