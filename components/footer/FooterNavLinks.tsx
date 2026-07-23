import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function FooterNavLinks() {
  return (
    <>
      {/* Links Column 1: Explore */}
      <div className="md:col-span-2 col-span-1 flex flex-col gap-4">
        <h4
          className="text-xs font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          Explore
        </h4>
        <ul className="flex flex-col gap-2.5 text-xs text-zinc-400 font-medium">
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
              <span>All Products</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
              <span>New Arrivals</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                New
              </span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
              <span>Trending Gear</span>
            </Link>
          </li>
          <li>
            <Link href="/login" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
              <span>Admin Portal</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Links Column 2: Categories */}
      <div className="md:col-span-2 col-span-1 flex flex-col gap-4">
        <h4
          className="text-xs font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          Categories
        </h4>
        <ul className="flex flex-col gap-2.5 text-xs text-zinc-400 font-medium">
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-purple-400 transition-colors" />
              <span>Electronics & Tech</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-purple-400 transition-colors" />
              <span>Creator Setup</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-purple-400 transition-colors" />
              <span>Office & Desk Essentials</span>
            </Link>
          </li>
          <li>
            <Link href="/#products" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-purple-400 transition-colors" />
              <span>Productivity Tools</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Links Column 3: Trust & Editorial */}
      <div className="md:col-span-3 col-span-1 flex flex-col gap-4">
        <h4
          className="text-xs font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Editorial & Trust
        </h4>
        <ul className="flex flex-col gap-2.5 text-xs text-zinc-400 font-medium">
          <li>
            <Link href="#" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              <span>Editorial Guidelines</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              <span>Referral Policy</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              <span>Privacy Policy</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-white hover:translate-x-1">
              <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              <span>Terms & Conditions</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
