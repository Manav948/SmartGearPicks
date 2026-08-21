import React from "react";

export default function Brands() {
  return (
    <section
      className="py-8 border-y"
      style={{
        backgroundColor: "rgba(239,244,255,0.5)",
        borderColor: "rgba(199,196,215,0.3)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ color: "#767586", fontFamily: "Geist, sans-serif", letterSpacing: "0.08em" }}
        >
          Trusted by creators at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 opacity-50 grayscale">
          {["LINEAR", "NOTION", "FIGMA", "RAYCAST", "STRIPE"].map((brand) => (
            <span
              key={brand}
              className="text-xl font-bold tracking-tighter"
              style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
