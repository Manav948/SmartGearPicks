import React from "react";
import { Compass, Sparkles, CheckCircle2 } from "lucide-react";

const items = [
  {
    icon: Compass,
    title: "Thoughtful Curation",
    text: "Picks selected to help you discover useful products for work and life.",
  },
  {
    icon: Sparkles,
    title: "Honest Recommendations",
    text: "Clear information and guide prices without fake marketing claims.",
  },
  {
    icon: CheckCircle2,
    title: "Trusted Retailers",
    text: "Follow direct product links to view checkout details and purchase safely.",
  },
];

export function FooterTrustHighlights() {
  return (
    <section
      aria-label="What to expect from SmartGearPicks"
      className="space-y-4 rounded-md border border-[#DDDCD3]/60 bg-[#FFFFFF]/50 p-4 backdrop-blur-xs"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B66F52]">
        OUR PROMISE
      </p>
      <div className="space-y-3.5">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-[#E5E9E0] text-[#354538]">
              <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#22231F]">{title}</h4>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[#6B6B66]">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
