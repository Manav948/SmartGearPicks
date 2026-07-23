import React from "react";
import { FooterTrustHighlights } from "./footer/FooterTrustHighlights";
import { FooterNewsletter } from "./footer/FooterNewsletter";
import { FooterNavLinks } from "./footer/FooterNavLinks";
import { FooterDisclosure } from "./footer/FooterDisclosure";
import { FooterBottomBar } from "./footer/FooterBottomBar";

export default function Footer() {
  return (
    <footer
      className="w-full mt-24 border-t border-zinc-800/80 relative overflow-hidden bg-[#030303] text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #0d0d12 0%, #050505 50%, #000000 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[3.5rem_3.5rem] pointer-events-none opacity-60" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-87.5 bg-linear-to-r from-indigo-600/15 via-purple-600/15 to-pink-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-112.5 h-112.5 bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-112.5 h-112.5 bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-pruple-500/40 via-purple-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col gap-16 relative z-10">

        <FooterTrustHighlights />


        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-6 border-t border-zinc-800/60">
          <FooterNewsletter />
          <FooterNavLinks />
        </div>

        <div className="border-t border-zinc-800/80 pt-8 flex flex-col gap-8">
          <FooterDisclosure />
          <FooterBottomBar />
        </div>
      </div>
    </footer>
  );
}
