import { SectionLabel } from "@/components/atoms/SectionLabel";

const CARDS = [
  {
    title: "Why teal, why now",
    body:
      "Solace is for people whose day is already loud — notifications, dashboards, tabs. The brand needed to be the quiet room, not another voice. A desaturated pine teal reads as grounded and trustworthy without the corporate coldness of pure blue, or the urgency of warmer hues.",
  },
  {
    title: "Type as two moods",
    body:
      "Fraunces carries the brand's warmth in headlines — a serif with just enough personality to feel human. Inter handles the actual work of reading. A monospace face appears only where it's honest: token values and measurements, because those really are code.",
  },
  {
    title: "Accessibility as a constraint, not a checklist",
    body:
      "Every color pair on this page is checked against WCAG 2.1 contrast thresholds as it's generated — not audited afterward. If a derived shade fails, the system nudges its lightness until it passes. That constraint is built into Section 02, live.",
    wide: true,
  },
];

export function ResearchSection() {
  return (
    <section className="mb-24 sm:mb-32">
      <SectionLabel index="01" label="Research & Rationale" />
      <div className="grid sm:grid-cols-2 gap-8 text-[15px] leading-relaxed opacity-80">
        {CARDS.map((card) => (
          <div key={card.title} className={card.wide ? "sm:col-span-2" : undefined}>
            <h3 className="font-display text-lg mb-2 opacity-100">{card.title}</h3>
            <p>{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
