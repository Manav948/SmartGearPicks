import React from "react";

interface ProductDetailsLeftProps {
  imageUrl: string;
  name: string;
  clicks: number;
  categoryLabel: string;
  productTags: { id: string; tag: string }[];
}

export default function ProductDetailsLeft({
  imageUrl,
  name,
  clicks,
  categoryLabel,
  productTags,
}: ProductDetailsLeftProps) {
  return (
    <div className="lg:sticky lg:top-24">
      <div
        className="relative rounded-2xl overflow-hidden border"
        style={{
          aspectRatio: "4/5",
          borderColor: "rgba(199,196,215,0.4)",
          backgroundColor: "#e5eeff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />

        {/* Category badge overlay */}
        <div
          className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full"
          style={{
            fontFamily: "Geist, sans-serif",
            letterSpacing: "0.05em",
            backgroundColor: "rgba(248,249,255,0.92)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#4648d4",
            border: "1px solid rgba(199,196,215,0.4)",
          }}
        >
          {categoryLabel}
        </div>

        {/* Clicks badge */}
        <div
          className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{
            fontFamily: "Geist, sans-serif",
            backgroundColor: "rgba(248,249,255,0.92)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#0b1c30",
            border: "1px solid rgba(199,196,215,0.4)",
          }}
        >
          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1", color: "#4648d4" }}>
            touch_app
          </span>
          {clicks} views
        </div>
      </div>

      {/* Tags */}
      {productTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {productTags.map((t) => (
            <span
              key={t.id}
              className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{
                fontFamily: "Geist, sans-serif",
                letterSpacing: "0.05em",
                backgroundColor: "rgba(70,72,212,0.08)",
                color: "#4648d4",
                border: "1px solid rgba(70,72,212,0.15)",
              }}
            >
              {t.tag.replace(/_/g, " ")}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
