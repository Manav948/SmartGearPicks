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
      style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.4)" }}
    >
      <h2
        className="pb-2 mb-5 border-b"
        style={{ ...SECTION_TITLE_STYLE, borderColor: "rgba(199,196,215,0.3)" }}
      >
        Curator Notes & Links
      </h2>
      <div className="relative">
        <label
          htmlFor="product-description"
          className="absolute left-3 -top-2 px-1 text-[10px] font-semibold uppercase tracking-wider z-10"
          style={{
            backgroundColor: "#ffffff",
            color: "#767586",
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
          className="w-full border rounded-lg px-4 py-3 text-sm outline-none transition-all resize-y placeholder:text-[#767586]/60 focus:border-[#4648d4] focus:ring-1 focus:ring-[#4648d4]"
          style={{ borderColor: "#c7c4d7", color: "#0b1c30", backgroundColor: "transparent" }}
        />
      </div>
    </section>
  );
}
