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
      {/* Mobile Table of Contents Accordion */}
      <div className="lg:hidden col-span-1 mb-2">
        <div className="bg-[#FAF8F4] border rounded-2xl p-4 shadow-xs" style={{ borderColor: "rgba(229, 225, 218, 0.4)" }}>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider cursor-pointer"
            style={{ color: "#151515" }}
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7c6853]" />
              <span>{title}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#F0EDE7] border border-[#E5E1DA]/40 text-[#7c6853] text-[10px] lowercase font-normal">
                {sections.length} sections
              </span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#817e75] transition-transform duration-200 ${
                mobileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileOpen && (
            <div className="mt-4 pt-3 border-t flex flex-col gap-1.5 text-xs" style={{ borderColor: "rgba(229, 225, 218, 0.4)" }}>
              {sections.map((sec) => {
                const Icon = getLegalIcon(sec.iconName);
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg transition-colors font-medium hover:bg-[#F0EDE7] hover:text-[#7c6853]"
                    style={{ color: "#6B6B6B" }}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#7c6853]" />
                      <span>{sec.label}</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#817e75]" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sticky Sidebar */}
      <aside className="lg:col-span-4 hidden lg:block">
        <div className="sticky top-28 bg-[#FAF8F4] border rounded-2xl p-6 shadow-xs" style={{ borderColor: "rgba(229, 225, 218, 0.4)" }}>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "#151515" }}>
            <FileText className="w-4 h-4 text-[#7c6853]" />
            {title}
          </h3>
          <nav className="flex flex-col gap-1 text-xs font-medium">
            {sections.map((sec) => {
              const Icon = getLegalIcon(sec.iconName);
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="group flex items-center justify-between p-2.5 rounded-lg transition-all duration-150 hover:bg-[#F0EDE7] hover:text-[#7c6853]"
                  style={{ color: "#6B6B6B" }}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#817e75] group-hover:text-[#7c6853] transition-colors" />
                    <span>{sec.label}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#817e75] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t" style={{ borderColor: "rgba(229, 225, 218, 0.4)" }}>
            <div className="bg-[#F0EDE7] border border-[#E5E1DA]/40 rounded-xl p-4 text-xs">
              <div className="font-semibold mb-1 flex items-center gap-1.5" style={{ color: "#151515" }}>
                <ShieldCheck className="w-4 h-4 text-[#7c6853]" />
                {badgeTitle}
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "#6B6B6B" }}>
                {badgeDescription}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
