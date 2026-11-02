"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function EditorialDiscoveryBanner() {
  return (
    <section
      aria-label="Editorial Discovery"
      data-scroll-reveal
      className="border-b border-[#DDDCD3] bg-[#FFFFFF] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-scroll-reveal-item
          className="overflow-hidden rounded-lg border border-[#DDDCD3] bg-[#EBE5DA]/30 grid grid-cols-1 lg:grid-cols-12 items-stretch"
        >
          {/* Left Editorial Text Column */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <div className="mb-3 flex items-center gap-2">
                <Sparkles size={13} className="text-[#B66F52]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B66F52]">
                  A BETTER WAY TO DISCOVER
                </p>
              </div>

              {/* Headline */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight text-[#22231F] leading-[1.12]">
                Less searching.{" "}
                <span className="italic font-normal font-serif text-[#354538]">
                  More discovering.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#6B6B66] max-w-md">
                Explore thoughtful product picks across everyday essentials, technology, lifestyle, and more.
              </p>
            </div>

            {/* CTA & Trust tag */}
            <div className="mt-8 pt-6 border-t border-[#DDDCD3]/70 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-sm bg-[#22231F] px-6 py-3 text-sm font-medium text-[#F6F4EF] transition-all hover:bg-[#354538] hover:translate-y-[-1px] shadow-sm active:scale-95"
              >
                <span>Explore All Products</span>
                <ArrowUpRight size={15} />
              </Link>

              <span className="text-[11px] font-medium text-[#6B6B66]">
                Curated weekly • Direct retailer access
              </span>
            </div>
          </div>

          {/* Right Editorial Photography Column */}
          <div className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-full lg:col-span-6 bg-[#E5E9E0]/40 overflow-hidden">
            <Image
              src="/Hero/Luxury Tech and Fashion Product Collection.png"
              alt="Curated luxury technology and lifestyle products"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
            />
            {/* Subtle warm overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(235, 229, 218, 0.4) 0%, transparent 40%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

