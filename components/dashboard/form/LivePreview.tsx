import React from "react";
import { SECTION_TITLE_STYLE, TAGS } from "./constants";

interface LivePreviewProps {
  name: string;
  imagePreview: string | null;
  featured: boolean;
  selectedCategoryLabel: string;
  selectedTags: string[];
  description: string;
  price: string;
}

export default function LivePreview({
  name,
  imagePreview,
  featured,
  selectedCategoryLabel,
  selectedTags,
  description,
  price,
}: LivePreviewProps) {
  return (
    <section>
      <h2
        className="mb-3 flex items-center gap-1.5"
        style={SECTION_TITLE_STYLE}
      >
        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>
          visibility
        </span>
        Live Grid Preview
      </h2>

      <div
        className="rounded-xl overflow-hidden border group shadow-sm bg-white"
        style={{ borderColor: "rgba(199,196,215,0.4)" }}
      >
        <div
          className="relative aspect-4/5 overflow-hidden"
          style={{ backgroundColor: "#e5eeff" }}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[64px]"
                style={{ color: "#c7c4d7", fontVariationSettings: "'FILL' 0" }}
              >
                imagesmode
              </span>
            </div>
          )}

          {featured && (
            <div
              className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full shadow-sm border text-[10px] font-semibold uppercase z-10"
              style={{
                backgroundColor: "rgba(248,249,255,0.9)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderColor: "rgba(255,255,255,0.5)",
                color: "#4648d4",
                fontFamily: "Geist, sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              Featured
            </div>
          )}

          <div
            className="absolute inset-x-0 bottom-0 p-4 flex justify-end transition-all duration-300 opacity-0 group-hover:opacity-100"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "#ffffff", color: "#0b1c30" }}
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                shopping_bag
              </span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3
              className="text-base font-medium leading-snug line-clamp-1"
              style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.01em" }}
            >
              {name || "Product Name"}
            </h3>
            <span
              className="material-symbols-outlined text-[18px] shrink-0"
              style={{ color: "rgba(118,117,134,0.4)", fontVariationSettings: "'FILL' 0" }}
            >
              open_in_new
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2">
            <span
              className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                fontFamily: "Geist, sans-serif",
                letterSpacing: "0.02em",
                backgroundColor: "rgba(70,72,212,0.07)",
                color: "#4648d4",
                border: "1px solid rgba(70,72,212,0.14)",
              }}
            >
              {selectedCategoryLabel}
            </span>
            {selectedTags.map((tagVal) => {
              const tagLabel = TAGS.find((t) => t.value === tagVal)?.label || tagVal;
              return (
                <span
                  key={tagVal}
                  className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    fontFamily: "Geist, sans-serif",
                    letterSpacing: "0.02em",
                    backgroundColor: "#f4f4f8",
                    color: "#5c5c72",
                    border: "1px solid #e2e2ec",
                  }}
                >
                  {tagLabel}
                </span>
              );
            })}
          </div>
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#767586" }}>
            {description || "Your editorial description will appear here, giving context to why you picked this item."}
          </p>
          {price && (
            <div className="mt-3 flex items-baseline gap-1.5">
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
              >
                ₹{parseFloat(price).toLocaleString("en-IN")}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
