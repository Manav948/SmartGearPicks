import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function FooterNavLinks() {
  return (
    <>
    
      <div className="flex flex-col gap-4">
        <h4
          className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          style={{ fontFamily: "Geist, sans-serif", color: "#151515" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#7c6853" }} />
          Explore
        </h4>
        <ul className="flex flex-col gap-2.5 text-xs font-medium" style={{ color: "#6B6B6B" }}>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#7c6853] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-[#817e75] group-hover:text-[#7c6853] transition-colors" />
              <span>All Products</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#7c6853] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-[#817e75] group-hover:text-[#7c6853] transition-colors" />
              <span>New Arrivals</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#F0EDE7] border border-[#E5E1DA]/40 text-[#7c6853]">
                New
              </span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#7c6853] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-[#817e75] group-hover:text-[#7c6853] transition-colors" />
              <span>Trending Gear</span>
            </Link>
          </li>
          <li>
            <Link href="/login" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#7c6853] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-[#817e75] group-hover:text-[#7c6853] transition-colors" />
              <span>Admin Portal</span>
            </Link>
          </li>
        </ul>
      </div>

     
      <div className="flex flex-col gap-4">
        <h4
          className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          style={{ fontFamily: "Geist, sans-serif", color: "#151515" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#7c6853" }} />
          Categories
        </h4>
        <ul className="flex flex-col gap-2.5 text-xs font-medium" style={{ color: "#6B6B6B" }}>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#7c6853] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-[#817e75] group-hover:text-[#7c6853] transition-colors" />
              <span>Electronics & Tech</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#7c6853] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-[#817e75] group-hover:text-[#7c6853] transition-colors" />
              <span>Creator Setup</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#7c6853] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-[#817e75] group-hover:text-[#7c6853] transition-colors" />
              <span>Office & Desk Essentials</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#7c6853] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-[#817e75] group-hover:text-[#7c6853] transition-colors" />
              <span>Productivity Tools</span>
            </Link>
          </li>
        </ul>
      </div>

     
      <div className="flex flex-col gap-4">
        <h4
          className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          style={{ fontFamily: "Geist, sans-serif", color: "#151515" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#7c6853" }} />
          Legal & Policies
        </h4>
        <ul className="flex flex-col gap-2.5 text-xs font-medium" style={{ color: "#6B6B6B" }}>
          <li>
            <Link href="/privacy" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#7c6853] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-[#817e75] group-hover:text-[#7c6853] transition-colors" />
              <span>Privacy Policy</span>
            </Link>
          </li>
          <li>
            <Link href="/terms" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#7c6853] hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-[#817e75] group-hover:text-[#7c6853] transition-colors" />
              <span>Terms & Conditions</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
