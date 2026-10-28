"use client";

import React, { useState, useMemo } from "react";
import ProductCard, { Product, CATEGORY_MAP } from "./ProductCard";
import { Search } from "lucide-react";

interface ProductGridProps {
  initialProducts: Product[];
  isAdmin?: boolean;
  initialCategory?: string | null;
  initialSearch?: string;
}

export default function ProductGrid({ initialProducts, isAdmin = false, initialCategory = null, initialSearch = "" }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const activeCategories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch = !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (CATEGORY_MAP[product.category] || product.category).toLowerCase().includes(query);
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const handleDeleteSuccess = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 pb-1">
        <button
          type="button"
          aria-pressed={!selectedCategory}
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
            type="button"
            aria-pressed={selectedCategory === cat}
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

       
        <label className="ml-auto flex min-h-10 min-w-[220px] flex-1 items-center gap-2 border border-[#E5E1DA] bg-white px-3 text-[#6B6B6B] focus-within:border-[#a99a86] sm:max-w-xs">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products"
            className="min-w-0 flex-1 bg-transparent text-sm text-[#151515] outline-none placeholder:text-[#88847d]"
          />
        </label>
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
