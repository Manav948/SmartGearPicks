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
            color: "#6B6B6B",
            letterSpacing: "0.08em",
          }}
        >
          {categoryLabel}
        </p>
        <h1
          className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug"
          style={{
            fontFamily: "Geist, system-ui, sans-serif",
            color: "#151515",
            letterSpacing: "-0.03em",
          }}
        >
          {name}
        </h1>

        {/* Curator badge — Honest editorial phrasing */}
        <div
          className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-xs font-semibold border"
          style={{
            fontFamily: "Geist, sans-serif",
            backgroundColor: "rgba(124,104,83,0.06)",
            color: "#7c6853",
            borderColor: "rgba(124,104,83,0.18)",
          }}
        >
          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          Curator&apos;s Pick — Curated Selection
        </div>

        {/* Price display */}
        {price != null && (
          <div
            className="mt-5 flex items-baseline gap-3 px-5 py-4 rounded-2xl border"
            style={{ backgroundColor: "#F0EDE7", borderColor: "rgba(124,104,83,0.12)" }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ fontFamily: "Geist, sans-serif", color: "#6B6B6B", letterSpacing: "0.06em" }}
            >
              Estimated Price
            </span>
            <span
              className="text-3xl font-bold tracking-tight"
              style={{ fontFamily: "Geist, system-ui, sans-serif", color: "#151515", letterSpacing: "-0.03em" }}
            >
              ₹{price.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-[#6B6B66] ml-auto">
              Subject to retailer updates
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: "rgba(229,225,218,0.4)" }} />

      {/* Structured Editorial Content */}
      <div className="space-y-6">
        <div>
          <h2
            className="text-xs font-semibold uppercase tracking-widest mb-2.5"
            style={{ fontFamily: "Geist, sans-serif", color: "#6B6B6B", letterSpacing: "0.08em" }}
          >
            Editorial Overview
          </h2>
          <p
            className="text-base leading-relaxed text-[#22231F]"
            style={{ lineHeight: "1.7", letterSpacing: "-0.01em" }}
          >
            {description}
          </p>
        </div>

        {/* Practical Considerations Box */}
        <div className="rounded-xl border border-[#DDDCD3] bg-[#FAF8F4] p-4 text-xs space-y-2 text-[#6B6B66]">
          <h3 className="font-semibold text-[#22231F] flex items-center gap-1.5 text-xs">
            <span className="material-symbols-outlined text-[15px] text-[#7c6853]">info</span>
            Curator Notes &amp; Practical Considerations
          </h3>
          <ul className="list-disc pl-4 space-y-1 text-[12px] leading-relaxed">
            <li>Selected for everyday build quality, functional ergonomics, and clean design.</li>
            <li>Referenced price is indicative; always verify the final checkout price and shipping terms on the merchant page.</li>
            <li>Qualifying purchases through our referral links support our independent editorial index at no additional cost to you.</li>
          </ul>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4">
        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: "#FAF8F4", borderColor: "rgba(229,225,218,0.35)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "Geist, sans-serif", color: "#6B6B6B", letterSpacing: "0.05em" }}>
            Category
          </p>
          <p className="text-sm font-medium" style={{ fontFamily: "Geist, sans-serif", color: "#151515" }}>
            {categoryLabel}
          </p>
        </div>
        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: "#FAF8F4", borderColor: "rgba(229,225,218,0.35)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "Geist, sans-serif", color: "#6B6B6B", letterSpacing: "0.05em" }}>
            Engagement
          </p>
          <p className="text-sm font-medium" style={{ fontFamily: "Geist, sans-serif", color: "#7c6853" }}>
            {clicks.toLocaleString()} views
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: "rgba(229,225,218,0.4)" }} />

      {/* CTA Buttons — Non-deceptive referral phrasing */}
      <div className="flex flex-col gap-3">
        <a
          href={`/api/redirect/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-base font-medium transition-all active:scale-[0.98] hover:bg-[#354538]"
          style={{
            backgroundColor: "#191816",
            color: "#FAF8F4",
            fontFamily: "Geist, sans-serif",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          }}
        >
          <span>View on Retailer</span>
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
            arrow_outward
          </span>
        </a>

        <Link
          href="/catalog"
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium border transition-all active:scale-[0.98] hover:bg-[#E5E9E0]"
          style={{
            backgroundColor: "transparent",
            color: "#6B6B6B",
            fontFamily: "Geist, sans-serif",
            borderColor: "#E5E1DA",
          }}
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
            arrow_back
          </span>
          Browse Full Catalog
        </Link>
      </div>

      {/* Trust indicators */}
      <div
        className="rounded-xl p-4 border flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 justify-between sm:justify-center"
        style={{ backgroundColor: "#F0EDE7", borderColor: "rgba(229,225,218,0.3)" }}
      >
        {[
          { icon: "verified_user", label: "Affiliate Link" },
          { icon: "local_shipping", label: "Direct to Retailer" },
          { icon: "thumb_up", label: "Editorially Selected" },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 justify-center whitespace-nowrap">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ color: "#7c6853", fontVariationSettings: "'FILL' 1" }}
            >
              {icon}
            </span>
            <span className="text-xs font-medium" style={{ color: "#6B6B6B", fontFamily: "Geist, sans-serif" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t" style={{ borderColor: "rgba(229,225,218,0.4)" }} />

      {/* Rating Section (Client Component) */}
      <RatingSection productId={id} />
    </div>
  );
}
