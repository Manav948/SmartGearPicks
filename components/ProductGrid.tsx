"use client";

import React, { useMemo, useState } from "react";
import ProductCard, { Product, CATEGORY_MAP } from "./ProductCard";
import RecommendationProductCard from "@/components/RecommendationProductCard";
import { Search } from "lucide-react";

interface ProductGridProps {
  initialProducts: Product[];
  isAdmin?: boolean;
  initialCategory?: string | null;
  initialSearch?: string;
}

export default function ProductGrid({
  initialProducts,
  isAdmin = false,
  initialCategory = null,
  initialSearch = "",
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const activeCategories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (CATEGORY_MAP[product.category] || product.category).toLowerCase().includes(query);
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const handleDeleteSuccess = (id: string) => {
    setProducts((previous) => previous.filter((product) => product.id !== id));
  };

  const categoryButtonClass =
    "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c6853]";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 pb-1">
        <button
          type="button"
          aria-pressed={!selectedCategory}
          onClick={() => setSelectedCategory(null)}
          className={categoryButtonClass}
          style={{
            fontFamily: "Geist, sans-serif",
            backgroundColor: !selectedCategory ? "#7c6853" : "#FAF8F4",
            color: !selectedCategory ? "#FAF8F4" : "#6B6B6B",
            borderColor: !selectedCategory ? "#7c6853" : "#E5E1DA",
          }}
        >
          All Curations
        </button>
        {activeCategories.map((category) => {
          const selected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => setSelectedCategory(category)}
              className={categoryButtonClass}
              style={{
                fontFamily: "Geist, sans-serif",
                backgroundColor: selected ? "#7c6853" : "#FAF8F4",
                color: selected ? "#FAF8F4" : "#6B6B6B",
                borderColor: selected ? "#7c6853" : "#E5E1DA",
              }}
            >
              {CATEGORY_MAP[category] || category}
            </button>
          );
        })}

        <label className="ml-auto flex min-h-11 min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-[#E5E1DA] bg-[#FAF8F4] px-3 text-[#6B6B6B] transition-colors focus-within:border-[#7c6853] focus-within:ring-2 focus-within:ring-[#7c6853]/10 sm:max-w-xs">
          <Search size={16} aria-hidden="true" className="text-[#7c6853]" />
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products"
            className="min-w-0 flex-1 bg-transparent text-sm text-[#151515] outline-none placeholder:text-[#8a8999]"
          />
        </label>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-[#E5E1DA]/60 bg-[#FAF8F4] py-20 text-center shadow-sm">
          <span
            className="material-symbols-outlined mb-4 block text-[56px] text-[#E5E1DA]"
            style={{ fontVariationSettings: "'FILL' 0" }}
          >
            inventory_2
          </span>
          <h3 className="font-semibold text-lg" style={{ fontFamily: "Geist, sans-serif", color: "#151515" }}>
            No products found
          </h3>
          <p className="mt-2 text-sm text-[#6B6B6B]">
            Try resetting your filters or search criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {filteredProducts.map((product, index) =>
            isAdmin ? (
              <ProductCard
                key={product.id}
                product={product}
                isAdmin
                onDeleteSuccess={handleDeleteSuccess}
              />
            ) : (
              <RecommendationProductCard key={product.id} product={product} index={index} />
            )
          )}
        </div>
      )}
    </div>
  );
}

