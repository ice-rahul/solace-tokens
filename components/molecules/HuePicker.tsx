"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { hslToHex, hexToHsl } from "@/lib/tokens";
import { SPRING } from "@/lib/motion-tokens";

const TRACK_HEIGHT = 14; // px
const HANDLE_SIZE = 22; // px
const PICKER_SATURATION = 55; // % — fixed sat/lightness for the hue strip itself
const PICKER_LIGHTNESS = 48;

type HuePickerProps = {
  seedHex: string;
  onChange: (hex: string) => void;
};

// A horizontal drag strip across the full hue wheel (0–360°). Dragging the
// handle recomputes the seed color live — this is the primary, "designed"
// way to choose a brand color, with the native <input type="color"> kept
// alongside as a precise fallback (see SeedColorPicker).
export function HuePicker({ seedHex, onChange }: HuePickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const currentHue = hexToHsl(seedHex).h;
  const x = useMotionValue(0);

  const hueGradient =
    "linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)";

  function handleDrag(clientX: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const hue = ratio * 360;
    const { s, l } = hexToHsl(seedHex);
    onChange(hslToHex({ h: hue, s: s || PICKER_SATURATION, l: l === 0 || l === 100 ? PICKER_LIGHTNESS : l }));
  }

  const handlePosition = useTransform(x, () => currentHue);

  return (
    <div className="flex-1 flex flex-col gap-1.5">
      <span className="font-mono text-[11px] uppercase tracking-wide opacity-60">Drag to choose a hue</span>
      <div
        ref={trackRef}
        role="slider"
        aria-label="Seed hue"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={Math.round(currentHue)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") handleDrag((trackRef.current?.getBoundingClientRect().left ?? 0) + ((currentHue + 5) / 360) * (trackRef.current?.getBoundingClientRect().width ?? 0));
          if (e.key === "ArrowLeft") handleDrag((trackRef.current?.getBoundingClientRect().left ?? 0) + ((currentHue - 5) / 360) * (trackRef.current?.getBoundingClientRect().width ?? 0));
        }}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          handleDrag(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) handleDrag(e.clientX);
        }}
        className="relative rounded-full cursor-pointer select-none"
        style={{ height: TRACK_HEIGHT, background: hueGradient }}
      >
        <motion.div
          className="absolute top-1/2 rounded-full border-2 border-white shadow-md"
          style={{
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
            left: `${(handlePosition.get() / 360) * 100}%`,
            translateX: "-50%",
            translateY: "-50%",
            background: seedHex,
          }}
          animate={{ left: `${(currentHue / 360) * 100}%` }}
          transition={SPRING.snappy}
        />
      </div>
    </div>
  );
}
