import React from "react";
import { SECTION_TITLE_STYLE } from "./constants";

interface CuratorNotesProps {
  description: string;
  setDescription: (val: string) => void;
}

export default function CuratorNotes({
  description,
  setDescription,
}: CuratorNotesProps) {
  return (
    <section
      className="rounded-xl p-6 border transition-shadow hover:shadow-sm"
      style={{ backgroundColor: "#FAF8F4", borderColor: "rgba(229,225,218,0.4)" }}
    >
      <h2
        className="pb-2 mb-5 border-b"
        style={{ ...SECTION_TITLE_STYLE, borderColor: "rgba(229,225,218,0.3)" }}
      >
        Curator Notes & Links
      </h2>
      <div className="relative">
        <label
          htmlFor="product-description"
          className="absolute left-3 -top-2 px-1 text-[10px] font-semibold uppercase tracking-wider z-10"
          style={{
            backgroundColor: "#FAF8F4",
            color: "#6B6B6B",
            fontFamily: "Geist, sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          Editorial Description
        </label>
        <textarea
          id="product-description"
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Why do you recommend this? Share your authentic thoughts..."
          className="w-full border rounded-lg px-4 py-3 text-sm outline-none transition-all resize-y placeholder:text-[#6B6B6B]/60 focus:border-[#7c6853] focus:ring-1 focus:ring-[#7c6853]"
          style={{ borderColor: "#E5E1DA", color: "#151515", backgroundColor: "transparent" }}
        />
      </div>
    </section>
  );
}
