import React from "react";
import { Lock } from "lucide-react";

export function FooterDisclosure() {
  return (
    <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-[11px] leading-relaxed text-zinc-400 backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
      <div className="flex items-center gap-2 mb-1.5 text-zinc-200 font-semibold">
        <Lock className="w-3.5 h-3.5 text-indigo-400" />
        <span>FTC Affiliate Disclosure</span>
      </div>
      SmartGearPicks is an independent product recommendation directory. We earn partner commissions from qualifying purchases made through our external links to Amazon Associates and other affiliate programs. This reader-supported model allows us to operate without intrusive banner advertisements or sponsored bias.
    </div>
  );
}
