"use client";

import RecommendationProductCard from "@/components/RecommendationProductCard";
import type { Product } from "../ProductCard";

interface TopPicksProps {
  topPicks: Product[];
}

export default function TopPicks({ topPicks }: TopPicksProps) {
  if (topPicks.length === 0) return null;

  return (
    <section className="rounded-[24px] border border-[#E5E1DA]/35 bg-[#FAF8F4]/70 p-5 shadow-[0_12px_36px_rgba(80,64,45,0.05)] sm:p-7">
      <header className="mb-7">
        <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7c6853]">
          <span aria-hidden="true">✦</span>
          Most explored
        </p>
        <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#151515]" style={{ fontFamily: "Geist, sans-serif" }}>
          Products shoppers visit most
        </h2>
        <p className="mt-2 text-sm text-[#6B6B6B]">Your highest-clicked picks, ready for a quick update.</p>
      </header>

      <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
        {topPicks.map((product, index) => (
          <div key={product.id}>
            <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#E5E1DA] bg-[#F0EDE7] px-2.5 py-1 text-[10px] font-semibold text-[#7c6853]">
              <span className="material-symbols-outlined text-[13px]" aria-hidden="true">touch_app</span>
              {product.clicks ?? 0} clicks
            </p>
            <RecommendationProductCard product={product} index={index} adminMode />
          </div>
        ))}
      </div>
    </section>
  );
}
