import { motion } from "motion/react";
import type { TokenSet } from "@/lib/tokens";
import { HuePicker } from "@/components/molecules/HuePicker";
import { SPRING, PRESS_SCALE } from "@/lib/motion-tokens";

export const SEED_PRESETS = ["#2F6F64", "#5B3A8E", "#B24D3E", "#2E5C8A"] as const;

type SeedColorPickerProps = {
  seed: string;
  tokens: TokenSet;
  onChange: (hex: string) => void;
};

export function SeedColorPicker({ seed, tokens, onChange }: SeedColorPickerProps) {
  return (
    <div
      className="rounded-xl border p-5 sm:p-7 mb-8"
      style={{ borderColor: tokens.border, background: tokens.surface }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
        <HuePicker seedHex={seed} onChange={onChange} />

        <label className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wide opacity-60 whitespace-nowrap">
            Exact
          </span>
          <input
            type="color"
            value={seed}
            onChange={(e) => onChange(e.target.value)}
            className="w-9 h-9 rounded-md cursor-pointer border"
            style={{ borderColor: tokens.border }}
            aria-label="Choose exact seed color"
          />
          <span className="font-mono text-sm">{seed}</span>
        </label>

        <div className="flex gap-2">
          {SEED_PRESETS.map((preset) => (
            <motion.button
              key={preset}
              onClick={() => onChange(preset)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: PRESS_SCALE }}
              transition={SPRING.snappy}
              className="w-7 h-7 rounded-full border-2 hover:cursor-pointer"
              style={{
                background: preset,
                borderColor: seed === preset ? tokens.textPrimary : "transparent",
              }}
              aria-label={`Use ${preset} as seed`}
            />
          ))}
        </div>
      </div>
      <p className="font-mono text-[11px] opacity-50 mt-4 leading-relaxed">
        Every swatch below is derived from this single value — tint, shade, and semantic
        role are computed with HSL math, then each pairing is checked against its
        background for WCAG AA contrast.
      </p>
    </div>
  );
}
