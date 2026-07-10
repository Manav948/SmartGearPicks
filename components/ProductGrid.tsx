"use client";

import React, { useState, useMemo, useEffect } from "react";
import ProductCard, { Product, CATEGORY_MAP } from "./ProductCard";

interface ProductGridProps {
  initialProducts: Product[];
  isAdmin?: boolean;
}

export default function ProductGrid({ initialProducts, isAdmin = false }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const activeCategories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleDeleteSuccess = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        <button
          onClick={() => setSelectedCategory(null)}
          className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 whitespace-nowrap shrink-0"
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
            className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 whitespace-nowrap shrink-0"
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

       
        <div className="ml-auto flex items-center gap-1.5 shrink-0">
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
            <ProductCard
              key={product.id}
              product={product}
              isAdmin={isAdmin}
              onDeleteSuccess={handleDeleteSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
}
