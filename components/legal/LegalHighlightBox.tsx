import React from "react";
import { getLegalIcon } from "./legalIcons";

interface LegalHighlightBoxProps {
  title: string;
  iconName?: string;
  children: React.ReactNode;
}

export function LegalHighlightBox({
  title,
  iconName,
  children,
}: LegalHighlightBoxProps) {
  const Icon = iconName ? getLegalIcon(iconName) : null;

  return (
    <div className="border border-[#DDDCD3] rounded-sm p-4 my-4 text-xs space-y-2 bg-[#E5E9E0]/40">
      <div className="font-semibold flex items-center gap-1.5 text-[#22231F]">
        {Icon && <Icon className="w-4 h-4 text-[#B66F52] shrink-0" />}
        <span>{title}</span>
      </div>
      <div className="text-[12.5px] leading-relaxed text-[#6B6B66]">
        {children}
      </div>
    </div>
  );
}
