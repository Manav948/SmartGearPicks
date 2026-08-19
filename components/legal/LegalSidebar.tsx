import React from "react";
import { FileText, ChevronRight, ShieldCheck, LucideIcon } from "lucide-react";

export interface LegalSectionItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface LegalSidebarProps {
  sections: LegalSectionItem[];
  title?: string;
  badgeTitle?: string;
  badgeDescription?: string;
}

export function LegalSidebar({
  sections,
  title = "Document Navigation",
  badgeTitle = "Verified & Compliant",
  badgeDescription = "Compliant with Pinterest Developer policies, affiliate network disclosures, GDPR, and CCPA standards.",
}: LegalSidebarProps) {
  return (
    <aside className="lg:col-span-4 hidden lg:block">
      <div className="sticky top-28 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-lg">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-400" />
          {title}
        </h3>
        <nav className="flex flex-col gap-1 text-xs font-medium">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="group flex items-center justify-between p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/70 transition-all duration-150"
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                  <span>{sec.label}</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>
            );
          })}
        </nav>

        <div className="mt-6 pt-6 border-t border-zinc-800/80">
          <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-4 text-xs text-zinc-300">
            <div className="font-semibold text-indigo-300 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              {badgeTitle}
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              {badgeDescription}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
