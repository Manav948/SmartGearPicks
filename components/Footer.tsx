import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FooterImageCopy } from "./footer/FooterImageCopy";
import { FooterNavLinks } from "./footer/FooterNavLinks";
import { FooterBottomBar } from "./footer/FooterBottomBar";
import { FooterTrustHighlights } from "./footer/FooterTrustHighlights";
import { FooterDisclosure } from "./footer/FooterDisclosure";

export default function Footer() {
  return (
    <footer className="relative isolate w-full overflow-hidden border-t border-[#DDDCD3] bg-[#EBE5DA] text-[#22231F]">
      {/* Background Graphic Asset */}
      <Image
        src="/footerbg.png"
        alt=""
        fill
        sizes="100vw"
        quality={80}
        loading="lazy"
        className="-z-20 object-cover object-[60%_center]"
      />
      {/* Visual Transition Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F6F4EF] via-[#F6F4EF]/85 to-[#F6F4EF]/70"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Big Editorial Heading */}
        <FooterImageCopy />

        {/* Multi-column Grid */}
        <div
          data-scroll-reveal
          className="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-[#DDDCD3] pt-10 sm:grid-cols-2 lg:grid-cols-12"
        >
          {/* Brand Col */}
          <div data-scroll-reveal-item className="sm:col-span-1 lg:col-span-4 space-y-3">
            <Link
              href="/"
              aria-label="SmartGearPicks home"
              className="inline-flex items-center gap-2.5 font-display text-xl font-semibold tracking-[-0.03em] text-[#22231F]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#354538] text-[12px] font-bold text-[#F6F4EF]">
                S
              </span>
              <span>SmartGearPicks</span>
            </Link>
            <p className="text-sm font-medium text-[#22231F]">
              Curated products. Smarter choices.
            </p>
            <p className="max-w-sm text-xs leading-relaxed text-[#6B6B66]">
              Useful products, practical tools, and thoughtful discoveries to make your next purchase clear and confident.
            </p>
            <div className="pt-2">
              <a
                href="mailto:contact@smartgearpicks.com"
                className="text-xs font-medium text-[#354538] underline decoration-[#DDDCD3] underline-offset-4 transition hover:text-[#22231F]"
              >
                contact@smartgearpicks.com
              </a>
            </div>
          </div>

          {/* Navigation & Departments */}
          <nav
            data-scroll-reveal-item
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-6 sm:col-span-1 lg:col-span-4"
          >
            <FooterNavLinks />
          </nav>

          {/* Trust Highlights */}
          <div data-scroll-reveal-item className="sm:col-span-2 lg:col-span-4">
            <FooterTrustHighlights />
          </div>
        </div>

        {/* Legal & Amazon Affiliate Disclosure Bar */}
        <div className="mt-10 flex flex-col gap-5 border-t border-[#DDDCD3] pt-6">
          <FooterDisclosure />
          <FooterBottomBar />
        </div>
      </div>
    </footer>
  );
}
