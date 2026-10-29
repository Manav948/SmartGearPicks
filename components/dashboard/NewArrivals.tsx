"use client";

import Link from "next/link";
import RecommendationProductCard from "@/components/RecommendationProductCard";
import type { Product } from "../ProductCard";

interface NewArrivalsProps {
  newArrivals: Product[];
}

export default function NewArrivals({ newArrivals }: NewArrivalsProps) {
  if (newArrivals.length === 0) return null;

  return (
    <section className="rounded-[24px] border border-[#E5E1DA]/35 bg-[#FAF8F4]/70 p-5 shadow-[0_12px_36px_rgba(80,64,45,0.05)] sm:p-7">
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7c6853]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7c6853]" aria-hidden="true" />
            Just added
          </p>
          <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#151515]" style={{ fontFamily: "Geist, sans-serif" }}>
            Freshly curated for your storefront
          </h2>
          <p className="mt-2 text-sm text-[#6B6B6B]">Review the latest additions and make any final edits.</p>
        </div>
        <Link
          href="/dashboard/store"
          className="group inline-flex min-h-10 w-fit items-center gap-2 border-b border-[#E5E1DA] pb-1 text-xs font-semibold text-[#7c6853] transition-colors hover:border-[#151515] hover:text-[#151515]"
        >
          Open full catalog <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {newArrivals.map((product, index) => (
          <RecommendationProductCard key={product.id} product={product} index={index} adminMode />
        ))}
      </div>
    </section>
  );
}
