"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORY_MAP, Product } from "@/components/ProductCard";
import RecommendationProductCard from "@/components/RecommendationProductCard";

export interface CategoryPreview {
  category: string;
  products: Product[];
}

export default function CuratedProducts({
  categories,
}: {
  categories: CategoryPreview[];
}) {
  if (categories.length === 0) return null;

  // Filter out any categories without products, and show top 4 categories to keep homepage crisp
  const populatedCategories = categories
    .filter((c) => c.products.length > 0)
    .slice(0, 4);

  if (populatedCategories.length === 0) return null;

  return (
    <section
      id="products"
      aria-labelledby="curated-collection-heading"
      data-scroll-reveal
      className="border-b border-[#DDDCD3] bg-[#F6F4EF] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          data-scroll-reveal-item
          className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B66F52]">
              THE ARCHIVE
            </p>
            <h2
              id="curated-collection-heading"
              className="font-display text-3xl font-medium tracking-tight text-[#22231F] sm:text-4xl"
            >
              Curated Collections
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6B6B66]">
              Explore thoughtful picks across select categories, carefully chosen to simplify discovery.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 border-b border-[#DDDCD3] pb-1 text-sm font-medium text-[#22231F] transition-colors hover:border-[#354538] hover:text-[#354538]"
          >
            <span>Explore all categories</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Categories Loop */}
        <div className="space-y-14 sm:space-y-16">
          {populatedCategories.map(({ category, products }) => {
            const label = CATEGORY_MAP[category] || category;

            return (
              <div
                key={category}
                data-scroll-reveal-item
                className="border-t border-[#DDDCD3] pt-8"
              >
                {/* Category Header */}
                <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-[#22231F] sm:text-2xl">
                      {label}
                    </h3>
                    <span className="text-xs text-[#6B6B66]">
                      ({products.length} {products.length === 1 ? "item" : "items"})
                    </span>
                  </div>

                  <Link
                    href={`/catalog?category=${encodeURIComponent(category)}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#6B6B66] transition-colors hover:text-[#22231F]"
                  >
                    <span>View all {label}</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>

                {/* 4 Products Desktop Max */}
                <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                  {products.slice(0, 4).map((product, index) => (
                    <RecommendationProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
