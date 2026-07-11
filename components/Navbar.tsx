import React from "react";

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(248, 249, 255, 0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(199, 196, 215, 0.35)",
      }}
    >
      <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-[1280px] mx-auto w-full">
        <div
          className="text-2xl font-bold tracking-tighter shrink-0 mr-8 select-none"
          style={{ fontFamily: "Geist, system-ui, sans-serif", color: "#0b1c30" }}
        >
          SmartGearPicks
        </div>

        <div className="hidden md:flex flex-1 items-center gap-1">
          <a
            href="#"
            className="text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
            style={{ color: "#4648d4", borderBottom: "2px solid #4648d4", fontFamily: "Geist, sans-serif" }}
          >
            Discover
          </a>
          <a
            href="#new-arrivals"
            className="text-sm px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#eff4ff]"
            style={{ color: "#464554", fontFamily: "Geist, sans-serif" }}
          >
            New Arrivals
          </a>
          <a
            href="#trending"
            className="text-sm px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#eff4ff]"
            style={{ color: "#464554", fontFamily: "Geist, sans-serif" }}
          >
            Trending
          </a>
          <a
            href="#products"
            className="text-sm px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#eff4ff]"
            style={{ color: "#464554", fontFamily: "Geist, sans-serif" }}
          >
            Curated Catalog
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden md:flex items-center px-4 py-2 rounded-full border w-64 transition-colors focus-within:border-[#4648d4]"
            style={{
              backgroundColor: "#eff4ff",
              borderColor: "rgba(199, 196, 215, 0.4)",
            }}
          >
            <span
              className="material-symbols-outlined mr-2 text-[20px] select-none"
              style={{ color: "#767586", fontVariationSettings: "'FILL' 0" }}
            >
              search
            </span>
            <input
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#767586]"
              placeholder="Search curated products..."
              type="text"
              style={{ color: "#0b1c30" }}
            />
          </div>

          <a
            href="/login"
            className="text-sm px-3 py-2 hidden sm:block transition-colors hover:text-[#4648d4]"
            style={{ color: "#464554", fontFamily: "Geist, sans-serif", fontWeight: 500 }}
          >
            Admin
          </a>

          <a
            href="#products"
            className="text-sm px-5 py-2.5 rounded-lg transition-all active:scale-95 shadow-sm"
            style={{
              backgroundColor: "#0f172a",
              color: "#ffffff",
              fontFamily: "Geist, sans-serif",
              fontWeight: 500,
              borderTop: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Explore
          </a>
        </div>
      </div>
    </nav>
  );
}
