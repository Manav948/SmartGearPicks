import React from "react";
import { Compass, Search, ShoppingBag } from "lucide-react";

const items = [
  { icon: Compass, title: "Thoughtfully Curated", text: "Picks selected to help you discover useful products." },
  { icon: Search, title: "Explore More", text: "Browse products across everyday categories." },
  { icon: ShoppingBag, title: "Shop With Clarity", text: "Follow product links to view details and purchase options." },
];

export function FooterTrustHighlights() {
  return (
    <section aria-label="What to expect from SmartGearPicks" className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0">
      {items.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex items-center gap-3 sm:flex-col sm:border-l sm:border-[#151515]/20 sm:px-3 sm:text-center first:sm:border-l-0">
          <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-[#151515]" strokeWidth={1.5} />
          <div>
            <h3 className="text-xs font-medium">{title}</h3>
            <p className="mt-1 max-w-[11rem] text-[10px] leading-4 text-[#49443d]">{text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
