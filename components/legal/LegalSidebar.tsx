"use client";

import React, { useState } from "react";
import { FileText, ChevronRight, ChevronDown, ShieldCheck } from "lucide-react";
import { getLegalIcon } from "./legalIcons";

export interface LegalSectionItem {
  id: string;
  label: string;
  iconName?: string;
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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
     
      <div className="lg:hidden col-span-1 mb-2">
        <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-900 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-zinc-900" />
              <span>{title}</span>
              <span className="px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 text-[10px] lowercase font-normal">
                {sections.length} sections
              </span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
                mobileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileOpen && (
            <div className="mt-4 pt-3 border-t border-zinc-200 flex flex-col gap-1.5 text-xs">
              {sections.map((sec) => {
                const Icon = getLegalIcon(sec.iconName);
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 hover:text-black transition-colors font-medium"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-zinc-800" />
                      <span>{sec.label}</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

 
      <aside className="lg:col-span-4 hidden lg:block">
        <div className="sticky top-28 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-zinc-900" />
            {title}
          </h3>
          <nav className="flex flex-col gap-1 text-xs font-medium">
            {sections.map((sec) => {
              const Icon = getLegalIcon(sec.iconName);
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="group flex items-center justify-between p-2.5 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-100 transition-all duration-150"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-zinc-500 group-hover:text-black transition-colors" />
                    <span>{sec.label}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-zinc-200">
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-800">
              <div className="font-semibold text-zinc-900 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-zinc-900" />
                {badgeTitle}
              </div>
              <p className="text-zinc-600 text-[11px] leading-relaxed">
                {badgeDescription}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
