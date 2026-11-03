"use client";

import React from "react";
import { Compass, LayoutGrid, Sparkles, ShoppingBag } from "lucide-react";

const VALUES = [
  {
    icon: Compass,
    title: "Independent Selection",
    description: "Handpicked recommendations focused on materials, durability, and practical utility.",
  },
  {
    icon: LayoutGrid,
    title: "Organized Catalog",
    description: "Structured collections across workspace gear, audio tech, home goods, and travel.",
  },
  {
    icon: Sparkles,
    title: "Editorial Clarity",
    description: "Objective product information and verified specifications without paid placements.",
  },
  {
    icon: ShoppingBag,
    title: "Verified Retailers",
    description: "Direct links to trusted merchant checkouts with full affiliate transparency.",
  },
];

export default function TrustValueStrip() {
  return (
    <section
      aria-label="Core values and shopping clarity"
      data-scroll-reveal
      className="border-y border-[#DDDCD3] bg-[#FFFFFF] py-6 sm:py-8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-scroll-reveal-item
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0"
        >
          {VALUES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-start gap-3.5 sm:px-4 lg:px-6 ${
                  index !== 0 ? "lg:border-l lg:border-[#DDDCD3]" : ""
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#E5E9E0] text-[#354538]">
                  <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold tracking-[-0.01em] text-[#22231F]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#6B6B66]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
