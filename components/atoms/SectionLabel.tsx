export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="font-mono text-[11px] tracking-[0.15em] opacity-50">{index}</span>
      <span className="font-mono text-[11px] tracking-[0.15em] uppercase opacity-50">{label}</span>
      <span className="h-px flex-1" style={{ background: "currentColor", opacity: 0.12 }} />
    </div>
  );
}
