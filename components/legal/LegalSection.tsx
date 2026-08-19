import React from "react";
import { LucideIcon } from "lucide-react";

interface LegalSectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  iconColor?: "indigo" | "purple" | "emerald" | "rose" | "amber" | "blue" | "teal";
  children: React.ReactNode;
}

export function LegalSection({
  id,
  title,
  icon: Icon,
  iconColor = "indigo",
  children,
}: LegalSectionProps) {
  const iconColorStyles = {
    indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    rose: "bg-rose-500/10 border-rose-500/20 text-rose-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    teal: "bg-teal-500/10 border-teal-500/20 text-teal-400",
  }[iconColor];

  return (
    <section
      id={id}
      className="scroll-mt-28 bg-zinc-900/40 border border-zinc-800/70 hover:border-zinc-700/80 transition-colors duration-200 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-sm"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2.5 rounded-xl border ${iconColorStyles}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h2
          className="text-xl font-semibold text-white tracking-tight"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          {title}
        </h2>
      </div>
      <div className="text-sm text-zinc-300 leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}
