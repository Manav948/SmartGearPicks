"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/components/ProductCard";
import RecommendationProductCard from "@/components/RecommendationProductCard";

interface TopPicksProps {
  products: Product[];
}

export default function TopPicks({ products }: TopPicksProps) {
  if (products.length === 0) return null;

  return (
    <section
      id="trending"
      aria-labelledby="top-recommendations-heading"
      data-scroll-reveal
      className="border-b border-[#DDDCD3] bg-[#FFFFFF] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          data-scroll-reveal-item
          className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#354538]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#354538]">
                THE EDIT
              </p>
            </div>
            <h2
              id="top-recommendations-heading"
              className="font-display text-3xl font-medium tracking-tight text-[#22231F] sm:text-4xl"
            >
              Top Recommendations
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6B6B66]">
              Standout finds selected for quality, usefulness, and everyday appeal.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 border-b border-[#DDDCD3] pb-1 text-sm font-medium text-[#22231F] transition-colors hover:border-[#354538] hover:text-[#354538]"
          >
            <span>View all recommendations</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {products.map((product, index) => (
            <RecommendationProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
