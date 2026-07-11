import React from "react";
import Link from "next/link";
import RatingSection from "@/app/product/[id]/RatingSection";

interface ProductDetailsRightProps {
  id: string;
  name: string;
  description: string;
  categoryLabel: string;
  price: number | null;
  clicks: number;
}

export default function ProductDetailsRight({
  id,
  name,
  description,
  categoryLabel,
  price,
  clicks,
}: ProductDetailsRightProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Category + Title */}
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{
            fontFamily: "Geist, sans-serif",
            color: "#767586",
            letterSpacing: "0.08em",
          }}
        >
          {categoryLabel}
        </p>
        <h1
          className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug"
          style={{
            fontFamily: "Geist, system-ui, sans-serif",
            color: "#0b1c30",
            letterSpacing: "-0.03em",
          }}
        >
          {name}
        </h1>

        {/* Curator badge */}
        <div
          className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-xs font-semibold border"
          style={{
            fontFamily: "Geist, sans-serif",
            backgroundColor: "rgba(70,72,212,0.06)",
            color: "#4648d4",
            borderColor: "rgba(70,72,212,0.18)",
          }}
        >
          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          Curator&apos;s Pick — Handpicked &amp; Tested
        </div>

        {/* Price display */}
        {price != null && (
          <div
            className="mt-5 flex items-baseline gap-3 px-5 py-4 rounded-2xl border"
            style={{ backgroundColor: "#eff4ff", borderColor: "rgba(70,72,212,0.12)" }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ fontFamily: "Geist, sans-serif", color: "#767586", letterSpacing: "0.06em" }}
            >
              Price
            </span>
            <span
              className="text-3xl font-bold tracking-tight"
              style={{ fontFamily: "Geist, system-ui, sans-serif", color: "#0b1c30", letterSpacing: "-0.03em" }}
            >
              ₹{price.toLocaleString("en-IN")}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: "rgba(199,196,215,0.4)" }} />

      {/* Description */}
      <div>
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ fontFamily: "Geist, sans-serif", color: "#767586", letterSpacing: "0.08em" }}
        >
          Editorial Notes
        </h2>
        <p
          className="text-base leading-relaxed"
          style={{ color: "#464554", lineHeight: "1.7", letterSpacing: "-0.01em" }}
        >
          {description}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4">
        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.35)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "Geist, sans-serif", color: "#767586", letterSpacing: "0.05em" }}>
            Category
          </p>
          <p className="text-sm font-medium" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}>
            {categoryLabel}
          </p>
        </div>
        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.35)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "Geist, sans-serif", color: "#767586", letterSpacing: "0.05em" }}>
            Total Views
          </p>
          <p className="text-sm font-medium" style={{ fontFamily: "Geist, sans-serif", color: "#4648d4" }}>
            {clicks.toLocaleString()} clicks
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: "rgba(199,196,215,0.4)" }} />

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3">
        <a
          href={`/api/redirect/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-base font-medium transition-all active:scale-[0.98]"
          style={{
            backgroundColor: "#0f172a",
            color: "#ffffff",
            fontFamily: "Geist, sans-serif",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          }}
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
            shopping_bag
          </span>
          View Deal & Buy Now
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
            arrow_outward
          </span>
        </a>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium border transition-all active:scale-[0.98]"
          style={{
            backgroundColor: "transparent",
            color: "#464554",
            fontFamily: "Geist, sans-serif",
            borderColor: "#c7c4d7",
          }}
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
            arrow_back
          </span>
          Browse More Products
        </Link>
      </div>

      {/* Trust indicators */}
      <div
        className="rounded-xl p-4 border flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 justify-between sm:justify-center"
        style={{ backgroundColor: "#eff4ff", borderColor: "rgba(199,196,215,0.3)" }}
      >
        {[
          { icon: "verified_user", label: "Verified Affiliate" },
          { icon: "local_shipping", label: "Direct to Store" },
          { icon: "thumb_up", label: "Curator Approved" },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 justify-center whitespace-nowrap">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ color: "#4648d4", fontVariationSettings: "'FILL' 1" }}
            >
              {icon}
            </span>
            <span className="text-xs font-medium" style={{ color: "#464554", fontFamily: "Geist, sans-serif" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: "rgba(199,196,215,0.4)" }} />

      {/* Rating Section (Client Component) */}
      <RatingSection productId={id} />
    </div>
  );
}
