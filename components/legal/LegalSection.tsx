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
      className="scroll-mt-28 bg-[#FFFFFF] border border-[#DDDCD3] transition-colors duration-200 rounded-md p-6 md:p-8 shadow-xs hover:border-[#354538]/50"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-sm border border-[#DDDCD3] bg-[#E5E9E0] text-[#354538]">
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="font-display text-xl font-semibold tracking-tight text-[#22231F]">
          {title}
        </h2>
      </div>
      <div className="text-sm leading-relaxed space-y-4 font-normal text-[#6B6B66]">
        {children}
      </div>
    </section>
  );
}
