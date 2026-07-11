import React from "react";
import Link from "next/link";

export default function ProductNavbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(248, 249, 255, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(199, 196, 215, 0.35)",
      }}
    >
      <div className="flex items-center gap-3 px-4 md:px-8 py-3 max-w-[1280px] mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter mr-8 select-none"
          style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
        >
          SmartGearPicks
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm transition-colors hover:text-[#4648d4]"
          style={{ color: "#767586", fontFamily: "Geist, sans-serif" }}
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
            arrow_back
          </span>
          Back to All Products
        </Link>
      </div>
    </nav>
  );
}
