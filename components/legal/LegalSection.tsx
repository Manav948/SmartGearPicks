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
      className="scroll-mt-28 bg-white border border-zinc-200 hover:border-zinc-300 transition-colors duration-200 rounded-2xl p-6 md:p-8 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl border border-zinc-300 bg-zinc-100 text-zinc-900">
          <Icon className="w-5 h-5" />
        </div>
        <h2
          className="text-xl font-semibold text-zinc-900 tracking-tight"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          {title}
        </h2>
      </div>
      <div className="text-sm text-zinc-700 leading-relaxed space-y-4 font-normal">
        {children}
      </div>
    </section>
  );
}
