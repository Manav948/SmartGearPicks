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
      style={{ backgroundColor: "#FAF8F4", borderColor: "rgba(229,225,218,0.4)" }}
    >
      <div>
        <p className="text-sm font-medium" style={{ fontFamily: "Geist, sans-serif", color: "#151515" }}>
          Feature on Profile
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#6B6B6B" }}>
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
          className="w-11 h-6 rounded-full transition-all peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-[#FAF8F4] after:rounded-full after:h-5 after:w-5 after:transition-all"
          style={{ backgroundColor: featured ? "#7c6853" : "#E5E1DA" }}
        />
      </label>
    </section>
  );
}
