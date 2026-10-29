"use client";

import React, { useRef, useState } from "react";
import RecommendationProductCard from "@/components/RecommendationProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  affiliateLink: string;
  category: string;
  price?: number | null;
}



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
          style={{ fontFamily: "Geist, system-ui, sans-serif", color: "#151515", letterSpacing: "-0.02em" }}
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
              backgroundColor: canScrollLeft ? "#191816" : "#FAF8F4",
              borderColor: canScrollLeft ? "#191816" : "#E5E1DA",
              color: canScrollLeft ? "#FAF8F4" : "#6B6B6B",
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
              backgroundColor: canScrollRight ? "#191816" : "#FAF8F4",
              borderColor: canScrollRight ? "#191816" : "#E5E1DA",
              color: canScrollRight ? "#FAF8F4" : "#6B6B6B",
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
        {filtered.map((product, index) => (
          <div key={product.id} className="w-[192px] shrink-0 sm:w-[220px]">
            <RecommendationProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}


