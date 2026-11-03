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
  badgeTitle = "Verified & Transparent",
  badgeDescription = "Compliant with Google AdSense Publisher Policies, Amazon Associates Guidelines, GDPR, and CCPA standards.",
}: LegalSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Table of Contents Accordion */}
      <div className="lg:hidden col-span-1 mb-2">
        <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-md p-4 shadow-xs">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider cursor-pointer text-[#22231F]"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#354538]" />
              <span>{title}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#E5E9E0] border border-[#DDDCD3] text-[#354538] text-[10px] lowercase font-normal">
                {sections.length} sections
              </span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#6B6B66] transition-transform duration-200 ${
                mobileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileOpen && (
            <div className="mt-4 pt-3 border-t border-[#DDDCD3] flex flex-col gap-1.5 text-xs">
              {sections.map((sec) => {
                const Icon = getLegalIcon(sec.iconName);
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-2 rounded-sm transition-colors font-medium text-[#6B6B66] hover:bg-[#E5E9E0] hover:text-[#22231F]"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#354538]" />
                      <span>{sec.label}</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#DDDCD3]" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sticky Sidebar */}
      <aside className="lg:col-span-4 hidden lg:block">
        <div className="sticky top-28 bg-[#FFFFFF] border border-[#DDDCD3] rounded-md p-6 shadow-xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2 text-[#22231F]">
            <FileText className="w-4 h-4 text-[#354538]" />
            {title}
          </h3>
          <nav className="flex flex-col gap-1 text-xs font-medium">
            {sections.map((sec) => {
              const Icon = getLegalIcon(sec.iconName);
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="group flex items-center justify-between p-2.5 rounded-sm transition-all duration-150 text-[#6B6B66] hover:bg-[#E5E9E0] hover:text-[#22231F]"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#6B6B66] group-hover:text-[#354538] transition-colors" />
                    <span>{sec.label}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#DDDCD3] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-[#DDDCD3]">
            <div className="bg-[#F6F4EF] border border-[#DDDCD3] rounded-sm p-4 text-xs">
              <div className="font-semibold mb-1 flex items-center gap-1.5 text-[#22231F]">
                <ShieldCheck className="w-4 h-4 text-[#354538]" />
                {badgeTitle}
              </div>
              <p className="text-[11px] leading-relaxed text-[#6B6B66]">
                {badgeDescription}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
