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
      className="scroll-mt-28 bg-[#FAF8F4] border transition-colors duration-200 rounded-2xl p-6 md:p-8 shadow-xs hover:border-[#7c6853]/40"
      style={{ borderColor: "rgba(229, 225, 218, 0.4)" }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl border bg-[#F0EDE7] border-[#E5E1DA]/40 text-[#7c6853]">
          <Icon className="w-5 h-5" />
        </div>
        <h2
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: "Geist, sans-serif", color: "#151515" }}
        >
          {title}
        </h2>
      </div>
      <div className="text-sm leading-relaxed space-y-4 font-normal" style={{ color: "#6B6B6B" }}>
        {children}
      </div>
    </section>
  );
}
