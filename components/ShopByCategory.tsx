"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CATEGORY_MAP } from "@/components/ProductCard";

export interface CategoryCardData {
  category: string;
  count: number;
  imageUrl?: string;
}

const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  FASHION: "/hero-extracted/handbag.png",
  ELECTRONICS: "/hero-extracted/headphones.png",
  OFFICE_PRODUCTIVITY: "/Hero/test_extracted/luxury_0.png",
  CREATOR_ESSENTIALS: "/Hero/test_extracted/luxury_1.png",
  TRAVEL: "/Hero/test_extracted/luxury_2.png",
  HOME_KITCHEN: "/Hero/test_extracted/luxury_3.png",
  SPORTS_OUTDOORS: "/Hero/test_extracted/catalog_4.png",
  HEALTH_FITNESS: "/Hero/test_extracted/catalog_3.png",
  BEAUTY_PERSONAL_CARE: "/hero-extracted/sunglasses.png",
  GAMING: "/Hero/test_extracted/luxury_4.png",
};

export default function ShopByCategory({
  categories,
}: {
  categories: CategoryCardData[];
}) {
  if (categories.length === 0) return null;

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      data-scroll-reveal
      className="border-b border-[#DDDCD3] bg-[#F6F4EF] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          data-scroll-reveal-item
          className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B66F52]">
              CURATED DEPARTMENTS
            </p>
            <h2
              id="categories-heading"
              className="font-display text-3xl font-medium tracking-tight text-[#22231F] sm:text-4xl"
            >
              Shop by Category
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6B6B66]">
              Explore our handpicked selections organized by everyday purpose and utility.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 border-b border-[#DDDCD3] pb-1 text-sm font-medium text-[#22231F] transition-colors hover:border-[#354538] hover:text-[#354538]"
          >
            <span>View all categories</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div
          data-scroll-reveal-item
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6"
        >
          {categories.map((cat) => {
            const label = CATEGORY_MAP[cat.category] || cat.category;
            const imageSrc = cat.imageUrl || DEFAULT_CATEGORY_IMAGES[cat.category] || "/hero-extracted/handbag.png";

            return (
              <Link
                key={cat.category}
                href={`/catalog?category=${encodeURIComponent(cat.category)}`}
                className="group relative flex flex-col overflow-hidden rounded-md border border-[#DDDCD3] bg-[#FFFFFF] transition-all duration-300 hover:border-[#B66F52] hover:shadow-[0_8px_20px_-4px_rgba(34,35,31,0.06)] hover:-translate-y-0.5"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EBE5DA]/30 p-3">
                  <Image
                    src={imageSrc}
                    alt={label}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                    unoptimized
                  />
                </div>

                {/* Card Info */}
                <div className="flex flex-1 flex-col justify-between p-3">
                  <div>
                    <h3 className="font-display text-xs sm:text-sm font-semibold tracking-[-0.01em] text-[#22231F] transition-colors group-hover:text-[#354538]">
                      {label}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-[#6B6B66]">
                      {cat.count} {cat.count === 1 ? "item" : "items"}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-[#B66F52] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span>Explore</span>
                    <ArrowUpRight size={11} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

