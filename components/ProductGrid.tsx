"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  affiliateLink: string;
  category: string;
  price?: number | null;
  productTags?: { tag: string }[];
}

interface ProductGridProps {
  initialProducts: Product[];
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
  OFFICE_PRODUCTIVITY: "Office",
  PET_SUPPLIES: "Pet Supplies",
  FOOD_BEVERAGES: "Food & Drinks",
  GIFT_CATEGORIES: "Gifts",
  TRAVEL: "Travel",
  CREATOR_ESSENTIALS: "Creator",
};

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const activeCategories = useMemo(() => {
    const cats = new Set(initialProducts.map((p) => p.category));
    return Array.from(cats);
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* ── Filter bar ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        <button
          onClick={() => setSelectedCategory(null)}
          className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 whitespace-nowrap flex-shrink-0"
          style={{
            fontFamily: "Geist, sans-serif",
            backgroundColor: !selectedCategory ? "#0f172a" : "#ffffff",
            color: !selectedCategory ? "#ffffff" : "#464554",
            borderColor: !selectedCategory ? "#0f172a" : "#c7c4d7",
          }}
        >
          All Curations
        </button>
        {activeCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 whitespace-nowrap flex-shrink-0"
            style={{
              fontFamily: "Geist, sans-serif",
              backgroundColor: selectedCategory === cat ? "#0f172a" : "#ffffff",
              color: selectedCategory === cat ? "#ffffff" : "#464554",
              borderColor: selectedCategory === cat ? "#0f172a" : "#c7c4d7",
            }}
          >
            {CATEGORY_MAP[cat] || cat}
          </button>
        ))}

        {/* Sort label — right side */}
        <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
          <span className="text-xs text-[#767586] font-medium" style={{ fontFamily: "Geist, sans-serif" }}>
            Sort by:
          </span>
          <span
            className="text-xs font-semibold"
            style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
          >
            Trending Now ▾
          </span>
        </div>
      </div>

      {/* ── Grid ── */}
      {filteredProducts.length === 0 ? (
        <div
          className="text-center py-20 rounded-2xl border"
          style={{ backgroundColor: "#ffffff", borderColor: "#e2e2e8" }}
        >
          <span
            className="material-symbols-outlined text-[56px] mb-4 block"
            style={{ color: "#c7c4d7", fontVariationSettings: "'FILL' 0" }}
          >
            inventory_2
          </span>
          <h3 className="font-semibold text-lg" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}>
            No products found
          </h3>
          <p className="text-sm mt-2" style={{ color: "#767586" }}>
            Try resetting your filters or search criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const categoryLabel = CATEGORY_MAP[product.category] || product.category;

  /* Collect all label chips: category + up to 2 tags */
  const chips = [
    categoryLabel,
    ...(product.productTags?.slice(0, 2).map((t) =>
      t.tag.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    ) ?? []),
  ];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300"
      style={{
        border: "1px solid #e8e8f0",
        boxShadow: hovered
          ? "0 8px 24px -4px rgba(0,0,0,0.10), 0 2px 8px -2px rgba(0,0,0,0.04)"
          : "0 1px 3px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      {/* ── Image ── */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden flex-shrink-0" style={{ height: "200px", backgroundColor: "#f0f0f5" }}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          priority
          unoptimized
        />

        {/* Hover overlay pill */}
        <div
          className="absolute inset-0 flex items-end justify-center pb-4 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0, background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)" }}
        >
          <span
            className="px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.95)", color: "#0b1c30", fontFamily: "Geist, sans-serif" }}
          >
            View Details →
          </span>
        </div>
      </Link>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Chips row */}
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                fontFamily: "Geist, sans-serif",
                letterSpacing: "0.02em",
                backgroundColor: i === 0 ? "rgba(70,72,212,0.07)" : "#f4f4f8",
                color: i === 0 ? "#4648d4" : "#5c5c72",
                border: i === 0 ? "1px solid rgba(70,72,212,0.14)" : "1px solid #e2e2ec",
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3
            className="font-semibold leading-snug line-clamp-2 transition-colors"
            style={{
              fontFamily: "Geist, system-ui, sans-serif",
              fontSize: "15px",
              color: hovered ? "#4648d4" : "#0d0d14",
              letterSpacing: "-0.015em",
              lineHeight: "1.35",
            }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p
          className="text-xs leading-relaxed line-clamp-2 flex-1"
          style={{ color: "#767586", lineHeight: "1.55" }}
        >
          {product.description}
        </p>

        {/* Price (if set) */}
        {product.price != null && (
          <p
            className="font-bold"
            style={{
              fontFamily: "Geist, sans-serif",
              fontSize: "16px",
              color: "#0d0d14",
              letterSpacing: "-0.02em",
              marginTop: "2px",
            }}
          >
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        )}

        {/* CTA */}
        <a
          href={`/api/redirect/${product.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.98]"
          style={{
            backgroundColor: "#0f172a",
            color: "#ffffff",
            fontFamily: "Geist, sans-serif",
            letterSpacing: "0.01em",
          }}
        >
          {product.affiliateLink.toLowerCase().includes("amazon") ? "View on Amazon" : "View Deal"}
          <span style={{ fontSize: "13px" }}>→</span>
        </a>
      </div>
    </div>
  );
}
