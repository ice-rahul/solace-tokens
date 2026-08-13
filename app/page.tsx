"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { deriveTokens } from "@/lib/tokens";
import { DURATION, EASE } from "@/lib/motion-tokens";
import { Header } from "@/components/organisms/Header";
import { Hero } from "@/components/organisms/Hero";
import { ResearchSection } from "@/components/organisms/ResearchSection";
import { TokensSection } from "@/components/organisms/TokensSection";
import { ComponentsShowcase } from "@/components/organisms/ComponentsShowcase";
import { CompositionSection, MarkSection } from "@/components/organisms/CompositionAndMark";

const DEFAULT_SEED = "#2F6F64"; // Pine — the considered default brand color

export default function Home() {
  const [seed, setSeed] = useState(DEFAULT_SEED);
  const [mode, setMode] = useState<"light" | "dark">("light");

  const tokens = useMemo(() => deriveTokens(seed, mode), [seed, mode]);

  return (
    <motion.div
      animate={{ background: tokens.background, color: tokens.textPrimary }}
      transition={{ duration: DURATION.base, ease: EASE.inOut }}
      className="min-h-screen font-body"
    >
      <Header tokens={tokens} mode={mode} onToggleMode={() => setMode((m) => (m === "light" ? "dark" : "light"))} />

      <main className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
        <Hero tokens={tokens} />
        <ResearchSection />
        <TokensSection tokens={tokens} seed={seed} onSeedChange={setSeed} />
        <ComponentsShowcase tokens={tokens} />
        <CompositionSection tokens={tokens} />
        <MarkSection tokens={tokens} />

        <footer className="pt-10 border-t font-mono text-[11px] opacity-50" style={{ borderColor: tokens.border }}>
          Built by Rahul Agrawal · Next.js, TypeScript, Motion · tokens computed client-side, no backend
        </footer>
      </main>
    </motion.div>
  );
}
