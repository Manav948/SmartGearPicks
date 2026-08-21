import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function FooterNavLinks() {
  return (
    <>
    
      <div className="flex flex-col gap-4">
        <h4
          className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4648d4" }} />
          Explore
        </h4>
        <ul className="flex flex-col gap-2.5 text-xs font-medium" style={{ color: "#464554" }}>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#4648d4] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#4648d4] transition-colors" />
              <span>All Products</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#4648d4] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#4648d4] transition-colors" />
              <span>New Arrivals</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#eff4ff] border border-[#c7c4d7]/40 text-[#4648d4]">
                New
              </span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#4648d4] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#4648d4] transition-colors" />
              <span>Trending Gear</span>
            </Link>
          </li>
          <li>
            <Link href="/login" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#4648d4] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#4648d4] transition-colors" />
              <span>Admin Portal</span>
            </Link>
          </li>
        </ul>
      </div>

     
      <div className="flex flex-col gap-4">
        <h4
          className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4648d4" }} />
          Categories
        </h4>
        <ul className="flex flex-col gap-2.5 text-xs font-medium" style={{ color: "#464554" }}>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#4648d4] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#4648d4] transition-colors" />
              <span>Electronics & Tech</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#4648d4] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#4648d4] transition-colors" />
              <span>Creator Setup</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#4648d4] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#4648d4] transition-colors" />
              <span>Office & Desk Essentials</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#4648d4] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#4648d4] transition-colors" />
              <span>Productivity Tools</span>
            </Link>
          </li>
        </ul>
      </div>

     
      <div className="flex flex-col gap-4">
        <h4
          className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4648d4" }} />
          Legal & Policies
        </h4>
        <ul className="flex flex-col gap-2.5 text-xs font-medium" style={{ color: "#464554" }}>
          <li>
            <Link href="/privacy" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#4648d4] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#4648d4] transition-colors" />
              <span>Privacy Policy</span>
            </Link>
          </li>
          <li>
            <Link href="/terms" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#4648d4] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#4648d4] transition-colors" />
              <span>Terms & Conditions</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
