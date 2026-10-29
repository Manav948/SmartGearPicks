import React from "react";

export default function Brands() {
  return (
    <section
      data-scroll-reveal
      className="py-8 border-y"
      style={{
        backgroundColor: "rgba(240,237,231,0.72)",
        borderColor: "rgba(229,225,218,0.3)",
      }}
    >
      <div data-scroll-reveal-item className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ color: "#6B6B6B", fontFamily: "Geist, sans-serif", letterSpacing: "0.08em" }}
        >
          Trusted by creators at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 opacity-50 grayscale">
          {["LINEAR", "NOTION", "FIGMA", "RAYCAST", "STRIPE"].map((brand) => (
            <span
              key={brand}
              className="text-xl font-bold tracking-tighter"
              style={{ fontFamily: "Geist, sans-serif", color: "#151515" }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
