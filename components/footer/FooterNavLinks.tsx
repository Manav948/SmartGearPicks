import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function FooterNavLinks() {
  return (
    <>
      {/* Links Column 1: Explore */}
      <div className="flex flex-col gap-4">
        <h4
          className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          Explore
        </h4>
        <ul className="flex flex-col gap-2.5 text-xs text-zinc-600 font-medium">
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-black hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-400 group-hover:text-black transition-colors" />
              <span>All Products</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-black hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-400 group-hover:text-black transition-colors" />
              <span>New Arrivals</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-zinc-100 border border-zinc-300 text-zinc-800">
                New
              </span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-black hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-400 group-hover:text-black transition-colors" />
              <span>Trending Gear</span>
            </Link>
          </li>
          <li>
            <Link href="/login" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-black hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-400 group-hover:text-black transition-colors" />
              <span>Admin Portal</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Links Column 2: Categories */}
      <div className="flex flex-col gap-4">
        <h4
          className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          Categories
        </h4>
        <ul className="flex flex-col gap-2.5 text-xs text-zinc-600 font-medium">
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-black hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-400 group-hover:text-black transition-colors" />
              <span>Electronics & Tech</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-black hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-400 group-hover:text-black transition-colors" />
              <span>Creator Setup</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-black hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-400 group-hover:text-black transition-colors" />
              <span>Office & Desk Essentials</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-black hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-400 group-hover:text-black transition-colors" />
              <span>Productivity Tools</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Links Column 3: Legal & Policies */}
      <div className="flex flex-col gap-4">
        <h4
          className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          Legal & Policies
        </h4>
        <ul className="flex flex-col gap-2.5 text-xs text-zinc-600 font-medium">
          <li>
            <Link href="/privacy" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-black hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-400 group-hover:text-black transition-colors" />
              <span>Privacy Policy</span>
            </Link>
          </li>
          <li>
            <Link href="/terms" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-black hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-400 group-hover:text-black transition-colors" />
              <span>Terms & Conditions</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
