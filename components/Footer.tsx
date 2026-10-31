import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FooterImageCopy } from "./footer/FooterImageCopy";
import { FooterNavLinks } from "./footer/FooterNavLinks";
import { FooterBottomBar } from "./footer/FooterBottomBar";
import { FooterNewsletter } from "./footer/FooterNewsletter";
import { FooterTrustHighlights } from "./footer/FooterTrustHighlights";
import { FooterDisclosure } from "./footer/FooterDisclosure";

export default function Footer() {
  return (
    <footer className="relative isolate w-full overflow-hidden border-t border-[#E5E1DA] bg-[#eee3d1] text-[#151515]">
      <Image
        src="/footerbg.png"
        alt=""
        fill
        sizes="100vw"
        quality={75}
        loading="eager"
        className="-z-20 object-cover object-[65%_center]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#F7F6F2]/75 sm:bg-[#F7F6F2]/60 xl:bg-[#F7F6F2]/42" />

      <div className="relative mx-auto max-w-[1600px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <FooterImageCopy />

        <div data-scroll-reveal className="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-[#151515]/20 pt-8 sm:grid-cols-2 lg:gap-x-10 xl:grid-cols-12">
          <div data-scroll-reveal-item className="sm:col-span-1 xl:col-span-3">
            <Link href="/" aria-label="SmartGearPicks home" className="inline-flex items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7c6853]">
              <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center border border-[#151515]/50 font-display text-lg font-semibold">S</span>
              <span className="font-display text-xl font-semibold tracking-[-0.04em]">SmartGearPicks</span>
            </Link>
            <p className="mt-3 text-sm font-medium">Curated products. Smarter choices.</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#49443d]">Useful products and thoughtful discoveries to make your next find a little easier.</p>
            <a href="mailto:privacy@smartgearpicks.com" className="mt-4 inline-block text-xs text-[#49443d] underline decoration-[#151515]/30 underline-offset-4 transition hover:text-[#151515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7c6853]">Contact: privacy@smartgearpicks.com</a>
          </div>

          <nav data-scroll-reveal-item aria-label="Footer navigation" className="grid grid-cols-2 gap-5 sm:col-span-1 xl:col-span-3">
            <FooterNavLinks />
          </nav>

          <div data-scroll-reveal-item className="sm:col-span-2 xl:col-span-3">
            <FooterNewsletter />
          </div>

          <div data-scroll-reveal-item className="sm:col-span-2 xl:col-span-3">
            <FooterTrustHighlights />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[#151515]/20 pt-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl xl:max-w-[44%]">
            <FooterDisclosure />
          </div>
          <FooterBottomBar />
        </div>
      </div>
    </footer>
  );
}
