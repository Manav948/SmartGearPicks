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
  OFFICE_PRODUCTIVITY: "Office & Productivity",
  PET_SUPPLIES: "Pet Supplies",
  FOOD_BEVERAGES: "Food & Beverages",
  GIFT_CATEGORIES: "Gifts",
  TRAVEL: "Travel",
  CREATOR_ESSENTIALS: "Creator Gear",
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
    <div className="space-y-8">
      {/* ── Search & Filter Bar ─────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div
          className="relative w-full md:max-w-sm flex items-center px-4 py-2.5 rounded-full border transition-colors focus-within:border-[#4648d4]"
          style={{ backgroundColor: "#eff4ff", borderColor: "rgba(199,196,215,0.5)" }}
        >
          <span
            className="material-symbols-outlined text-[20px] mr-2 select-none"
            style={{ color: "#767586", fontVariationSettings: "'FILL' 0" }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Search curated products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#767586]"
            style={{ color: "#0b1c30" }}
          />
        </div>

        {/* Category chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 whitespace-nowrap"
            style={{
              fontFamily: "Geist, sans-serif",
              letterSpacing: "0.02em",
              backgroundColor: !selectedCategory ? "#0f172a" : "#ffffff",
              color: !selectedCategory ? "#ffffff" : "#464554",
              borderColor: !selectedCategory ? "#0f172a" : "#c7c4d7",
            }}
          >
            All Items
          </button>
          {activeCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 whitespace-nowrap"
              style={{
                fontFamily: "Geist, sans-serif",
                letterSpacing: "0.02em",
                backgroundColor: selectedCategory === category ? "#0f172a" : "#ffffff",
                color: selectedCategory === category ? "#ffffff" : "#464554",
                borderColor: selectedCategory === category ? "#0f172a" : "#c7c4d7",
              }}
            >
              {CATEGORY_MAP[category] || category}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ────────────────────────────────────── */}
      {filteredProducts.length === 0 ? (
        <div
          className="text-center py-20 rounded-2xl border"
          style={{ backgroundColor: "#ffffff", borderColor: "#c7c4d7" }}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: "#ffffff",
        borderColor: hovered ? "rgba(199,196,215,0.8)" : "rgba(199,196,215,0.35)",
        boxShadow: hovered
          ? "0 12px 20px -8px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)"
          : "0 1px 3px 0 rgba(0,0,0,0.02)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Clickable image → product detail */}
      <Link href={`/product/${product.id}`} className="block">
        <div
          className="relative overflow-hidden"
          style={{ height: "230px", backgroundColor: "#e5eeff" }}
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
            priority
            unoptimized
          />

          {/* Quick-view hover overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black/10"
            style={{
              opacity: hovered ? 1 : 0,
            }}
          >
            <div
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shadow-md transition-all active:scale-95"
              style={{
                backgroundColor: "#ffffff",
                color: "#0b1c30",
                fontFamily: "Geist, sans-serif",
              }}
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              View Details
            </div>
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Category & Tags Row (Below Image) */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            <span
              className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded"
              style={{
                fontFamily: "Geist, sans-serif",
                backgroundColor: "rgba(70,72,212,0.06)",
                color: "#4648d4",
                border: "1px solid rgba(70,72,212,0.12)",
              }}
            >
              {CATEGORY_MAP[product.category] || product.category}
            </span>
            {product.productTags?.slice(0, 1).map((t, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded"
                style={{
                  fontFamily: "Geist, sans-serif",
                  backgroundColor: "#eff4ff",
                  color: "#464554",
                  border: "1px solid rgba(199,196,215,0.45)",
                }}
              >
                {t.tag.replace(/_/g, " ").toLowerCase()}
              </span>
            ))}
          </div>

          {/* Title */}
          <Link href={`/product/${product.id}`}>
            <h3
              className="font-semibold text-base leading-snug line-clamp-1 transition-colors mt-2"
              style={{
                fontFamily: "Geist, sans-serif",
                color: hovered ? "#4648d4" : "#0b1c30",
                letterSpacing: "-0.01em",
              }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm mt-1.5 leading-relaxed line-clamp-2" style={{ color: "#464554" }}>
            {product.description}
          </p>
        </div>

        {/* Single Fill CTA Button */}
        <div className="mt-5">
          <a
            href={`/api/redirect/${product.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98]"
            style={{
              backgroundColor: "#0b1c30",
              color: "#ffffff",
              fontFamily: "Geist, sans-serif",
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {product.affiliateLink.toLowerCase().includes("amazon") ? "View on Amazon" : "View Deal"}{" "}
            <span className="font-sans ml-0.5">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
