import { motion } from "motion/react";
import type { TokenSet } from "@/lib/tokens";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { Swatch } from "@/components/molecules/Swatch";
import { SeedColorPicker } from "@/components/molecules/SeedColorPicker";
import { AccessibilityStat } from "@/components/molecules/AccessibilityStat";
import { STAGGER } from "@/lib/motion-tokens";

type TokensSectionProps = {
  tokens: TokenSet;
  seed: string;
  onSeedChange: (hex: string) => void;
};

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.swatches } },
};

export function TokensSection({ tokens, seed, onSeedChange }: TokensSectionProps) {
  const swatches: { name: string; hex: string; against: string }[] = [
    { name: "Background", hex: tokens.background, against: tokens.textPrimary },
    { name: "Surface", hex: tokens.surface, against: tokens.textPrimary },
    { name: "Text primary", hex: tokens.textPrimary, against: tokens.background },
    { name: "Primary", hex: tokens.primary, against: tokens.primaryText },
    { name: "Accent", hex: tokens.accent, against: tokens.accentText },
    { name: "Success", hex: tokens.success, against: tokens.background },
    { name: "Danger", hex: tokens.danger, against: tokens.background },
    { name: "Border", hex: tokens.border, against: tokens.textPrimary },
    { name: "Text secondary", hex: tokens.textSecondary, against: tokens.background },
  ];

  return (
    <section className="mb-24 sm:mb-32">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-8">
        <SectionLabel index="02" label="Live design tokens" />
      </div>
      <div className="-mt-4 mb-6">
        <AccessibilityStat tokens={tokens} />
      </div>

      <SeedColorPicker seed={seed} tokens={tokens} onChange={onSeedChange} />

      <motion.div layout variants={grid} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {swatches.map((s) => (
          <Swatch key={s.name} name={s.name} hex={s.hex} against={s.against} tokens={tokens} />
        ))}
      </motion.div>

      <div
        className="mt-6 rounded-lg border p-4 font-mono text-[12px] leading-relaxed overflow-x-auto"
        style={{ borderColor: tokens.border, background: tokens.surface, color: tokens.textSecondary }}
      >
        <div>--color-background: {tokens.background};</div>
        <div>--color-primary: {tokens.primary};</div>
        <div>--color-accent: {tokens.accent};</div>
        <div>--color-text-primary: {tokens.textPrimary};</div>
        <div>--mode: &quot;{tokens.mode}&quot;;</div>
      </div>
    </section>
  );
}
