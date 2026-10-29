import React from "react";
import { Lock } from "lucide-react";

export function FooterDisclosure() {
  return (
    <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#E5E1DA] text-[11px] leading-relaxed text-[#6B6B6B] backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#a99a86]/40 to-transparent" />
      <div className="flex items-center gap-2 mb-1.5 text-[#151515] font-semibold">
        <Lock className="w-3.5 h-3.5 text-[#a99a86]" />
        <span>FTC Affiliate Disclosure</span>
      </div>
      SmartGearPicks is an independent product recommendation directory. We earn partner commissions from qualifying purchases made through our external links to Amazon Associates and other affiliate programs. This reader-supported model allows us to operate without intrusive banner advertisements or sponsored bias.
    </div>
  );
}
