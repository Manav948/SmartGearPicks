"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  affiliateLink: string;
  category: string;
  price?: number | null;
  productTags?: { tag: string }[];
  clicks?: number;
  createdAt?: string | Date;
}

export const CATEGORY_MAP: Record<string, string> = {
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
  OFFICE_PRODUCTIVITY: "Office & Workspace",
  PET_SUPPLIES: "Pet Supplies",
  FOOD_BEVERAGES: "Food & Drinks",
  GIFT_CATEGORIES: "Gifts",
  TRAVEL: "Travel & Luggage",
  CREATOR_ESSENTIALS: "Creator Gear",
};

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onDeleteSuccess?: (id: string) => void;
}

export default function ProductCard({
  product,
  isAdmin = false,
  onDeleteSuccess,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoryLabel = CATEGORY_MAP[product.category] || product.category;
  const isAmazon = product.affiliateLink?.toLowerCase().includes("amazon");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const chips = [
    categoryLabel,
    ...(product.productTags?.slice(0, 1).map((t) =>
      t.tag.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    ) ?? []),
  ];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-md border border-[#DDDCD3] bg-[#FFFFFF] transition-all duration-300 hover:border-[#B66F52] hover:shadow-[0_8px_24px_-4px_rgba(34,35,31,0.06)] hover:-translate-y-0.5"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-[#EBE5DA]/25">
        <Link href={`/product/${product.id}`} className="relative block h-full w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 ease-out"
            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
            priority={false}
            unoptimized
          />

          {/* Quick view hover badge */}
          <div
            className="absolute inset-x-0 bottom-0 flex items-center justify-center p-3 transition-opacity duration-200 bg-gradient-to-t from-[#22231F]/30 to-transparent"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            <span className="rounded-full bg-[#FFFFFF]/95 px-3 py-1 text-[11px] font-medium text-[#22231F] shadow-sm">
              View Details →
            </span>
          </div>
        </Link>

        {/* Admin Menu */}
        {isAdmin && (
          <div className="absolute right-2.5 top-2.5 z-20" ref={dropdownRef}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDropdown((prev) => !prev);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DDDCD3] bg-[#FFFFFF]/95 text-[#22231F] shadow-sm transition hover:bg-[#F6F4EF] active:scale-95"
              title="Actions"
            >
              <MoreVertical size={16} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-1.5 w-36 overflow-hidden rounded-md border border-[#DDDCD3] bg-[#FFFFFF] py-1 shadow-lg z-30">
                <Link
                  href={`/dashboard/edit-product/${product.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(false);
                  }}
                  className="flex items-center gap-2 border-b border-[#DDDCD3]/50 px-3 py-2 text-xs font-medium text-[#22231F] hover:bg-[#F6F4EF]"
                >
                  <Edit2 size={13} />
                  <span>Edit Item</span>
                </Link>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!window.confirm(`Delete "${product.name}"?`)) {
                      setShowDropdown(false);
                      return;
                    }
                    const toastId = toast.loading("Deleting product...");
                    try {
                      const response = await fetch(`/api/products/${product.id}`, {
                        method: "DELETE",
                      });
                      if (!response.ok) throw new Error("Failed to delete");
                      toast.success("Product deleted", { id: toastId });
                      if (onDeleteSuccess) onDeleteSuccess(product.id);
                    } catch (err: any) {
                      toast.error(err.message || "Failed to delete", { id: toastId });
                    } finally {
                      setShowDropdown(false);
                    }
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-[#ba1a1a] hover:bg-[#ffdad6]/20"
                >
                  <Trash2 size={13} />
                  <span>Delete Item</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          {/* Chips */}
          <div className="mb-2 flex flex-wrap gap-1.5">
            {chips.map((chip, i) => (
              <span
                key={chip}
                className="rounded-xs bg-[#E5E9E0] px-2 py-0.5 text-[10px] font-medium tracking-[0.06em] uppercase text-[#354538]"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Title */}
          <Link href={`/product/${product.id}`}>
            <h3 className="line-clamp-2 text-sm sm:text-[15px] font-medium leading-snug tracking-[-0.015em] text-[#22231F] transition-colors group-hover:text-[#354538]">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          {product.description && (
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#6B6B66]">
              {product.description}
            </p>
          )}
        </div>

        {/* Bottom Bar: Price & Affiliate CTA */}
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
            href={`/api/redirect/${product.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-sm border border-[#DDDCD3] bg-[#F6F4EF] px-3 text-xs font-medium text-[#22231F] transition-all duration-200 hover:border-[#22231F] hover:bg-[#22231F] hover:text-[#F6F4EF] active:scale-[0.98]"
          >
            <span>{isAmazon ? "View on Amazon" : "View Product"}</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
