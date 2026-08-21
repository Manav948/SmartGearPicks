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
        backgroundColor: "#eff4ff",
        borderColor: "rgba(199, 196, 215, 0.5)",
      }}
    >
      <div className="font-semibold flex items-center gap-1.5" style={{ color: "#0b1c30" }}>
        {Icon && <Icon className="w-4 h-4 text-[#4648d4] shrink-0" />}
        <span>{title}</span>
      </div>
      <div className="text-[12.5px] leading-relaxed" style={{ color: "#464554" }}>
        {children}
      </div>
    </div>
  );
}
