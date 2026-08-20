import React from "react";
import { FooterNavLinks } from "./footer/FooterNavLinks";
import { FooterBottomBar } from "./footer/FooterBottomBar";

export default function Footer() {
  return (
    <footer className="w-full mt-24 border-t border-zinc-200 bg-white text-zinc-900 selection:bg-zinc-200 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 flex flex-col gap-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column with 'S' Logo */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {/* Minimal White & Black 'S' Logo */}
              <div className="w-10 h-10 rounded-xl bg-black text-white font-extrabold text-xl flex items-center justify-center shadow-sm select-none border border-black" style={{ fontFamily: "Geist, sans-serif" }}>
                S
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-zinc-900" style={{ fontFamily: "Geist, sans-serif" }}>
                  SmartGearPicks
                </span>
                <span className="text-[11px] text-zinc-500 font-medium">
                  Curated Equipment & Tech Recommendations
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed max-w-md mt-1">
              Skip the noise. We curate and recommend top-tier workspace gear, productivity tools, and tech essentials built for modern creators.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <FooterNavLinks />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-200 pt-8">
          <FooterBottomBar />
        </div>
      </div>
    </footer>
  );
}
