import React from "react";
import { getLegalIcon } from "./legalIcons";

interface LegalSectionProps {
  id: string;
  title: string;
  iconName?: string;
  children: React.ReactNode;
}

export function LegalSection({
  id,
  title,
  iconName = "file",
  children,
}: LegalSectionProps) {
  const Icon = getLegalIcon(iconName);

  return (
    <section
      id={id}
      className="scroll-mt-28 bg-white border transition-colors duration-200 rounded-2xl p-6 md:p-8 shadow-xs hover:border-[#4648d4]/40"
      style={{ borderColor: "rgba(199, 196, 215, 0.4)" }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl border bg-[#eff4ff] border-[#c7c4d7]/40 text-[#4648d4]">
          <Icon className="w-5 h-5" />
        </div>
        <h2
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
        >
          {title}
        </h2>
      </div>
      <div className="text-sm leading-relaxed space-y-4 font-normal" style={{ color: "#464554" }}>
        {children}
      </div>
    </section>
  );
}
