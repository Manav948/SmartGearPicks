"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function BrandIntroduction() {
  return (
    <section
      aria-label="Brand introduction"
      data-scroll-reveal
      className="overflow-hidden border-b border-[#DDDCD3] bg-[#F6F4EF] py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-scroll-reveal-item
          className="mx-auto max-w-3xl text-center"
        >
          {/* Eyebrow */}
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B66F52]">
            THE SMARTER WAY TO DISCOVER
          </p>

          {/* Headline */}
          <h2 className="font-display text-3xl font-medium tracking-tight text-[#22231F] sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.1] text-balance">
            Find what{" "}
            <span className="italic font-normal font-serif text-[#354538]">
              fits your life.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-[#6B6B66]">
            Explore useful products, thoughtful recommendations, and everyday discoveries—all in one place.
          </p>

          {/* Value points */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-[#22231F]">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#354538]" />
              Zero sponsored clutter
            </span>
            <span className="hidden sm:inline text-[#DDDCD3]">•</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#354538]" />
              Authentic handpicked finds
            </span>
            <span className="hidden sm:inline text-[#DDDCD3]">•</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#354538]" />
              Direct retailer checkout
            </span>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 rounded-sm bg-[#22231F] px-6 py-3 text-sm font-medium text-[#F6F4EF] transition-all hover:bg-[#354538] hover:translate-y-[-1px] shadow-sm active:scale-95"
            >
              <span>Explore Our Collection</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

