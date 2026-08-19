import React from "react";
import { LucideIcon } from "lucide-react";

interface LegalHighlightBoxProps {
  title: string;
  variant?: "rose" | "indigo" | "amber" | "emerald" | "purple";
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function LegalHighlightBox({
  title,
  variant = "indigo",
  icon: Icon,
  children,
}: LegalHighlightBoxProps) {
  const styles = {
    rose: {
      box: "bg-rose-950/20 border-rose-500/25 text-rose-200/90",
      title: "text-rose-300",
    },
    indigo: {
      box: "bg-indigo-950/20 border-indigo-500/25 text-indigo-200/90",
      title: "text-indigo-300",
    },
    amber: {
      box: "bg-amber-950/20 border-amber-500/25 text-amber-200/90",
      title: "text-amber-300",
    },
    emerald: {
      box: "bg-emerald-950/20 border-emerald-500/25 text-emerald-200/90",
      title: "text-emerald-300",
    },
    purple: {
      box: "bg-purple-950/20 border-purple-500/25 text-purple-200/90",
      title: "text-purple-300",
    },
  }[variant];

  return (
    <div className={`border rounded-xl p-4 my-4 text-xs space-y-2 ${styles.box}`}>
      <div className={`font-semibold flex items-center gap-1.5 ${styles.title}`}>
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
        <span>{title}</span>
      </div>
      <div className="text-zinc-300 text-[12.5px] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
