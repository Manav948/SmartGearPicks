"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  affiliateLink: string;
  category: string;
  price?: number | null;
}

const CATEGORY_MAP: Record<string, string> = {
  ELECTRONICS: "Electronics",
  FASHION: "Fashion",
  BEAUTY_PERSONAL_CARE: "Beauty & Care",
  HEALTH_FITNESS: "Health & Fitness",
  BOOKS_EDUCATION: "Books & Education",
  HOME_KITCHEN: "Home & Kitchen",
  GAMING: "Gaming",
  SPORTS_OUTDOORS: "Sports & Outdoors",
  TOYS_KIDS: "Toys & Kids",
  AUTOMOTIVE: "Automotive",
  OFFICE_PRODUCTIVITY: "Office & Productivity",
  PET_SUPPLIES: "Pet Supplies",
  FOOD_BEVERAGES: "Food & Beverages",
  GIFT_CATEGORIES: "Gifts",
  TRAVEL: "Travel",
  CREATOR_ESSENTIALS: "Creator Gear",
};

interface SimilarProductsProps {
  products: Product[];
  currentProductId: string;
}

export default function SimilarProducts({
  products,
  currentProductId,
}: SimilarProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filtered = products.filter((p) => p.id !== currentProductId);

  if (filtered.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  return (
    <section className="w-full">
      {/* ── Header row ── */}
      <div className="flex items-center justify-between mb-5">
        <h2
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: "Geist, system-ui, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}
        >
          Similar Products
        </h2>

        {/* Arrow controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              backgroundColor: canScrollLeft ? "#0f172a" : "#ffffff",
              borderColor: canScrollLeft ? "#0f172a" : "#c7c4d7",
              color: canScrollLeft ? "#ffffff" : "#767586",
            }}
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              chevron_left
            </span>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              backgroundColor: canScrollRight ? "#0f172a" : "#ffffff",
              borderColor: canScrollRight ? "#0f172a" : "#c7c4d7",
              color: canScrollRight ? "#ffffff" : "#767586",
            }}
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              chevron_right
            </span>
          </button>
        </div>
      </div>

      {/* ── Scrollable row ── */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filtered.map((product) => (
          <SimilarCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function SimilarCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const label = CATEGORY_MAP[product.category] || product.category;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 flex flex-col rounded-2xl overflow-hidden border transition-all duration-300"
      style={{
        width: "192px",
        backgroundColor: "#ffffff",
        borderColor: hovered ? "rgba(70,72,212,0.28)" : "rgba(199,196,215,0.4)",
        boxShadow: hovered
          ? "0 12px 28px -8px rgba(70,72,212,0.14), 0 4px 8px -4px rgba(0,0,0,0.05)"
          : "0 1px 4px 0 rgba(0,0,0,0.03)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden" style={{ height: "220px", backgroundColor: "#e5eeff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />

        {/* Category chip on image */}
        <span
          className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{
            fontFamily: "Geist, sans-serif",
            backgroundColor: "rgba(248,249,255,0.92)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#4648d4",
            border: "1px solid rgba(70,72,212,0.15)",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </span>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0, background: "rgba(11,28,48,0.08)" }}
        >
          <div
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md"
            style={{ backgroundColor: "#ffffff", color: "#0b1c30", fontFamily: "Geist, sans-serif" }}
          >
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              visibility
            </span>
            Quick View
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        {/* Name */}
        <Link href={`/product/${product.id}`}>
          <h3
            className="text-sm font-semibold leading-snug line-clamp-2 transition-colors"
            style={{
              fontFamily: "Geist, sans-serif",
              color: hovered ? "#4648d4" : "#0b1c30",
              letterSpacing: "-0.01em",
              lineHeight: "1.35",
            }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Description – single line */}
        <p
          className="text-xs line-clamp-1"
          style={{ color: "#767586", fontFamily: "Geist, sans-serif", lineHeight: "1.4" }}
        >
          {product.description}
        </p>

        {/* Price */}
        {product.price != null && (
          <div className="flex items-baseline gap-1">
            <span
              className="text-base font-bold tracking-tight"
              style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
            >
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <a
          href={`/api/redirect/${product.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 w-full flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold transition-all active:scale-[0.97]"
          style={{
            backgroundColor: "#0f172a",
            color: "#ffffff",
            fontFamily: "Geist, sans-serif",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {product.affiliateLink.toLowerCase().includes("amazon") ? "View on Amazon" : "View Deal"}
          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 0" }}>
            arrow_outward
          </span>
        </a>
      </div>
    </div>
  );
}
