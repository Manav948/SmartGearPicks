"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
  OFFICE_PRODUCTIVITY: "Office",
  PET_SUPPLIES: "Pet Supplies",
  FOOD_BEVERAGES: "Food & Drinks",
  GIFT_CATEGORIES: "Gifts",
  TRAVEL: "Travel",
  CREATOR_ESSENTIALS: "Creator",
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
    ...(product.productTags?.slice(0, 2).map((t) =>
      t.tag.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    ) ?? []),
  ];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300 relative"
      style={{
        border: "1px solid #e8e8f0",
        boxShadow: hovered
          ? "0 8px 24px -4px rgba(0,0,0,0.10), 0 2px 8px -2px rgba(0,0,0,0.04)"
          : "0 1px 3px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      
      <div className="relative overflow-hidden shrink-0" style={{ height: "260px", backgroundColor: "#f0f0f5" }}>
        <Link href={`/product/${product.id}`} className="block w-full h-full relative" style={{ position: "relative" }}>
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

        
          <div
            className="absolute inset-0 flex items-end justify-center pb-4 transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0, background: "linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 55%)" }}
          >
            <span
              className="px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.95)", color: "#0b1c30", fontFamily: "Geist, sans-serif" }}
            >
              View Details →
            </span>
          </div>
        </Link>

        
        {isAdmin && (
          <div className="absolute top-2.5 right-2.5 z-20" ref={dropdownRef}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDropdown((prev) => !prev);
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-white ext-on-surface-variant hover:text-[#ba1a1a] shadow-md border border-gray-100 transition-all active:scale-[0.93]"
              title="Actions"
            >
              <span className="material-symbols-outlined text-[18px] select-none">
                more_vert
              </span>
            </button>

            {showDropdown && (
              <div
                className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-[#e8e8f0] py-1 z-30"
                style={{
                  transformOrigin: "top right"
                }}
              >
                <Link
                  href={`/dashboard/edit-product/${product.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs font-semibold text-[#0b1c30] hover:bg-gray-50 transition-colors flex items-center gap-1.5 border-b border-[#e8e8f0]"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    edit
                  </span>
                  Edit Item
                </Link>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const confirmDelete = window.confirm(
                      `Are you sure you want to delete "${product.name}"?`
                    );
                    if (!confirmDelete) {
                      setShowDropdown(false);
                      return;
                    }

                    const toastId = toast.loading(`Deleting "${product.name}"...`);

                    try {
                      const response = await fetch(`/api/products/${product.id}`, {
                        method: "DELETE",
                      });

                      const data = await response.json();

                      if (!response.ok) {
                        throw new Error(data.error || "Failed to delete product");
                      }

                      toast.success(`"${product.name}" deleted successfully`, { id: toastId });
                      if (onDeleteSuccess) {
                        onDeleteSuccess(product.id);
                      }
                    } catch (err: any) {
                      console.error("Delete product error:", err);
                      toast.error(err.message || "Failed to delete product", { id: toastId });
                    } finally {
                      setShowDropdown(false);
                    }
                  }}
                  className="w-full px-3 py-2 text-left text-xs font-semibold text-[#ba1a1a] hover:bg-[#ba1a1a]/08 transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    delete
                  </span>
                  Delete Item
                </button>
              </div>
            )}
          </div>
        )}
      </div>

     
      <div className="flex flex-col flex-1 p-4 gap-2">
       
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

       
        <p
          className="text-xs leading-relaxed line-clamp-2 flex-1"
          style={{ color: "#767586", lineHeight: "1.55" }}
        >
          {product.description}
        </p>

     
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
