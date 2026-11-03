"use client";

import React from "react";
import { Search, Eye, SlidersHorizontal, ShoppingBag } from "lucide-react";

const STEPS = [
  {
    step: "01",
    label: "RESEARCH",
    desc: "We monitor product releases, category trends, and verified customer feedback.",
    icon: Search,
  },
  {
    step: "02",
    label: "EVALUATE",
    desc: "We analyze materials, ergonomics, practical utility, and build quality.",
    icon: Eye,
  },
  {
    step: "03",
    label: "INDEX",
    desc: "We organize selected items into categorized collections with guide pricing.",
    icon: SlidersHorizontal,
  },
  {
    step: "04",
    label: "REFER",
    desc: "We provide direct links to trusted merchant checkouts with full affiliate disclosure.",
    icon: ShoppingBag,
  },
];

export default function CurationProcess() {
  return (
    <section
      id="how-we-curate"
      aria-labelledby="how-we-curate-heading"
      data-scroll-reveal
      className="border-b border-[#DDDCD3] bg-[#F6F4EF] py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          data-scroll-reveal-item
          className="mx-auto max-w-2xl text-center mb-12 sm:mb-16"
        >
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B66F52]">
            EDITORIAL STANDARDS
          </p>
          <h2
            id="how-we-curate-heading"
            className="font-display text-3xl font-medium tracking-tight text-[#22231F] sm:text-4xl"
          >
            How We Curate
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#6B6B66]">
            A transparent workflow to help you discover and evaluate quality gear from verified retailers.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div
          data-scroll-reveal-item
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="group relative flex flex-col justify-between rounded-md border border-[#DDDCD3] bg-[#FFFFFF] p-6 sm:p-7 transition-all duration-300 hover:border-[#354538] hover:shadow-[0_8px_20px_-4px_rgba(34,35,31,0.06)] hover:-translate-y-0.5"
              >
                <div>
                  {/* Step Header */}
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#B66F52]">
                      {step.step}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#E5E9E0] text-[#354538] transition-colors group-hover:bg-[#354538] group-hover:text-[#F6F4EF]">
                      <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="font-display text-base font-semibold tracking-[-0.01em] text-[#22231F]">
                    {step.label}
                  </h3>

                  {/* Step Description */}
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#6B6B66]">
                    {step.desc}
                  </p>
                </div>

                {/* Subtle indicator bar */}
                <div className="mt-6 h-[2px] w-full bg-[#EBE5DA] overflow-hidden rounded-full">
                  <div className="h-full w-0 bg-[#354538] transition-all duration-500 ease-out group-hover:w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
