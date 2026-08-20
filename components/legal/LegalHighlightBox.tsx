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
    <div className="border border-zinc-300 bg-zinc-50 rounded-xl p-4 my-4 text-xs space-y-2">
      <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
        {Icon && <Icon className="w-4 h-4 text-zinc-700 shrink-0" />}
        <span>{title}</span>
      </div>
      <div className="text-zinc-700 text-[12.5px] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
