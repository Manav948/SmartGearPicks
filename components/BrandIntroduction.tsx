"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import ParticleText from "@/components/ParticleText";

export default function BrandIntroduction() {
  return (
    <section
      aria-label="Brand introduction"
      data-scroll-reveal
      className="overflow-hidden border-b border-[#DDDCD3] bg-[#F6F4EF] py-20 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-scroll-reveal-item
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B66F52] sm:hidden">
              CURATED GEAR. BETTER CHOICES.
            </p>
            <div className="hidden h-[100px] w-full sm:block md:h-[132px]" aria-label="Curated gear for daily life">
              <ParticleText
                text="CURATED GEAR FOR DAILY LIFE"
                particleSize={2.2}
                density={5}
                color="#354538"
                highlightColor="#B66F52"
                highlightMode="gradient"
                intro="gather"
                scatter={80}
                gatherDuration={1400}
                stagger={90}
                clickBurst={false}
                pointerRepel={12}
                repelRadius={72}
                idleDrift={0.18}
                trigger="view"
                fontSize="clamp(1.8rem, 4.6vw, 3.8rem)"
                fontWeight={650}
                fontFamily="Geist, system-ui, sans-serif"
                glow={false}
                className="h-full w-full"
              />
            </div>
          </div>

          {/* Headline — distinct from Footer */}
          <h2 className="font-display text-3xl font-medium tracking-tight text-[#22231F] sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.1] text-balance">
            Tools and essentials{" "}
            <span className="italic font-normal font-serif text-[#354538]">
              built for everyday use.
            </span>
          </h2>

          {/* Description — no em-dash reveal */}
          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-[#6B6B66]">
            Explore practical products, workspace essentials, and daily gear organized in one focused catalog.
          </p>

          {/* Value points — plain direct English */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-[#22231F]">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#354538]" />
              No paid placements
            </span>
            <span className="hidden sm:inline text-[#DDDCD3]">•</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#354538]" />
              Handpicked selections
            </span>
            <span className="hidden sm:inline text-[#DDDCD3]">•</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#354538]" />
              Direct retailer links
            </span>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 rounded-sm bg-[#22231F] px-6 py-3 text-sm font-medium text-[#F6F4EF] transition-all hover:bg-[#354538] hover:translate-y-[-1px] shadow-sm active:scale-95"
            >
              <span>Explore the Catalog</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
