"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORY_MAP, type Product } from "@/components/ProductCard";
import CircularGallery from "@/components/CircularGallery";

interface NewArrivalsProps {
  products: Product[];
}

export default function NewArrivals({ products }: NewArrivalsProps) {
  if (products.length === 0) return null;

  const galleryProducts = products.filter((product) => Boolean(product.imageUrl));
  const galleryItems = galleryProducts.map((product) => ({
    image: product.imageUrl,
    text: CATEGORY_MAP[product.category] || product.category.replace(/_/g, " "),
    description: [product.name, product.description].filter(Boolean).join(" — "),
    alt: `${CATEGORY_MAP[product.category] || product.category}: ${product.name}`,
  }));

  if (galleryItems.length === 0) return null;

  return (
    <section
      id="new-arrivals"
      aria-labelledby="new-arrivals-heading"
      data-scroll-reveal
      className="border-b border-[#DDDCD3] bg-[#F6F4EF] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          data-scroll-reveal-item
          className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B66F52]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B66F52]">
                FRESH FINDS
              </p>
            </div>
            <h2
              id="new-arrivals-heading"
              className="font-display text-3xl font-medium tracking-tight text-[#22231F] sm:text-4xl"
            >
              New Arrivals
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6B6B66]">
              The latest additions to our curated index, handpicked for quality and everyday utility.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 border-b border-[#DDDCD3] pb-1 text-sm font-medium text-[#22231F] transition-colors hover:border-[#354538] hover:text-[#354538]"
          >
            <span>View all new arrivals</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div data-scroll-reveal-item className="relative mt-4 h-[420px] w-full md:mt-6 md:h-[560px]">
          <CircularGallery
            items={galleryItems}
            bend={2.5}
            textColor="#22231F"
            borderRadius={0.06}
            scrollEase={0.075}
            itemSize={0.9}
            itemAspect={0.76}
            gap={0.3}
            wave={0.65}
            fadeEdges={0.1}
            shadow={0.18}
            scrollSpeed={1.6}
            snap
            grayscale={false}
            showTitles
            openOnClick={false}
            onItemClick={(_, index) => {
              const product = galleryProducts[index];
              if (product) window.location.assign(`/product/${product.id}`);
            }}
            intro
            aria-label="Browse newly added products"
          />
        </div>
      </div>
    </section>
  );
}
