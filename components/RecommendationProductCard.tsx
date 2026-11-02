"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product, CATEGORY_MAP } from "@/components/ProductCard";

interface RecommendationProductCardProps {
  product: Product;
  index?: number;
  adminMode?: boolean;
}

export default function RecommendationProductCard({
  product,
  index = 0,
  adminMode = false,
}: RecommendationProductCardProps) {
  const categoryLabel = CATEGORY_MAP[product.category] || product.category;
  const productDetailHref = `/product/${product.id}`;
  const affiliateActionHref = adminMode
    ? `/dashboard/edit-product/${product.id}`
    : `/api/redirect/${product.id}`;
  const isAmazon = product.affiliateLink?.toLowerCase().includes("amazon");

  return (
    <article
      data-scroll-reveal-item
      className="group flex flex-col overflow-hidden rounded-md border border-[#DDDCD3] bg-[#FFFFFF] transition-all duration-300 hover:border-[#B66F52] hover:shadow-[0_8px_24px_-4px_rgba(34,35,31,0.06)] hover:-translate-y-0.5"
    >
      {/* Product Image Area */}
      <Link
        href={productDetailHref}
        aria-label={`View details of ${product.name}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-[#EBE5DA]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354538]"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
          unoptimized
        />

        {/* Hover quick preview badge */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-gradient-to-t from-[#22231F]/30 to-transparent">
          <span className="rounded-full bg-[#FFFFFF]/95 px-3 py-1 text-[11px] font-medium text-[#22231F] shadow-sm">
            Quick View →
          </span>
        </div>
      </Link>

      {/* Product Details Area */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          {/* Category Chip */}
          <div className="mb-2 flex items-center gap-1.5">
            <span className="inline-block rounded-xs bg-[#E5E9E0] px-2 py-0.5 text-[10px] font-medium tracking-[0.06em] uppercase text-[#354538]">
              {categoryLabel}
            </span>
          </div>

          {/* Title */}
          <Link
            href={productDetailHref}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354538]"
          >
            <h3 className="line-clamp-2 text-sm font-medium leading-snug tracking-[-0.015em] text-[#22231F] transition-colors group-hover:text-[#354538] sm:text-[15px]">
              {product.name}
            </h3>
          </Link>

          {/* Description snippet */}
          {product.description && (
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#6B6B66]">
              {product.description}
            </p>
          )}
        </div>

        {/* Bottom Bar: Price & Affiliate Action */}
        <div className="mt-4 flex flex-col gap-2.5 border-t border-[#DDDCD3]/60 pt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] text-[#6B6B66]">Guide price</span>
            <span className="font-display text-sm font-semibold text-[#22231F]">
              {product.price != null ? (
                `₹${product.price.toLocaleString("en-IN")}`
              ) : (
                <span className="text-xs font-normal text-[#6B6B66]">Check retailer</span>
              )}
            </span>
          </div>

          <a
            href={affiliateActionHref}
            target={adminMode ? "_self" : "_blank"}
            rel={adminMode ? undefined : "noopener noreferrer"}
            className="inline-flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-sm border border-[#DDDCD3] bg-[#F6F4EF] px-3 text-xs font-medium text-[#22231F] transition-all duration-200 hover:border-[#22231F] hover:bg-[#22231F] hover:text-[#F6F4EF] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354538]"
          >
            <span>{adminMode ? "Edit Product" : isAmazon ? "View on Amazon" : "View Product"}</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </article>
  );
}
