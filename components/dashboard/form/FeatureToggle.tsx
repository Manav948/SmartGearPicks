import React from "react";

interface FeatureToggleProps {
  featured: boolean;
  setFeatured: (val: boolean) => void;
}

export default function FeatureToggle({
  featured,
  setFeatured,
}: FeatureToggleProps) {
  return (
    <section
      className="rounded-xl p-5 border flex items-center justify-between"
      style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.4)" }}
    >
      <div>
        <p className="text-sm font-medium" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}>
          Feature on Profile
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#767586" }}>
          Pin this item to the top of your grid.
        </p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        <div
          className="w-11 h-6 rounded-full transition-all peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
          style={{ backgroundColor: featured ? "#4648d4" : "#d3e4fe" }}
        />
      </label>
    </section>
  );
}
