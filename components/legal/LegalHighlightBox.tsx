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
    <div
      className="border rounded-xl p-4 my-4 text-xs space-y-2"
      style={{
        backgroundColor: "#F0EDE7",
        borderColor: "rgba(229, 225, 218, 0.5)",
      }}
    >
      <div className="font-semibold flex items-center gap-1.5" style={{ color: "#151515" }}>
        {Icon && <Icon className="w-4 h-4 text-[#7c6853] shrink-0" />}
        <span>{title}</span>
      </div>
      <div className="text-[12.5px] leading-relaxed" style={{ color: "#6B6B6B" }}>
        {children}
      </div>
    </div>
  );
}
