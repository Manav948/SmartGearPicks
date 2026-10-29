"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../ProductCard";
import DeleteProductButton from "./DeleteProductButton";

interface ProductsTableProps {
  products: Product[];
  categoryMap: Record<string, string>;
}

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function ProductsTable({ products, categoryMap }: ProductsTableProps) {
  const { ref, inView } = useInView();
  const [search, setSearch] = useState("");

  const sorted = [...products].sort((a, b) => (b.clicks ?? 0) - (a.clicks ?? 0));
  const filtered = search.trim()
    ? sorted.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (categoryMap[p.category] || p.category).toLowerCase().includes(search.toLowerCase())
      )
    : sorted;

  return (
    <div
      ref={ref}
      className="rounded-[20px] border overflow-hidden bg-white"
      style={{
        borderColor: "rgba(199,196,215,0.28)",
        boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 border-b"
        style={{ borderColor: "rgba(199,196,215,0.25)" }}
      >
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-0.5 text-[#767586]"
            style={{ letterSpacing: "0.1em" }}
          >
            📦 Product library
          </p>
          <h2
            className="text-xl font-bold tracking-tight text-[#0b1c30]"
            style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.025em" }}
          >
            Curated products
            <span className="ml-2 text-sm font-medium text-[#767586]">({products.length})</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-[#767586] pointer-events-none"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              search
            </span>
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 text-xs rounded-xl border outline-none transition-all duration-200 bg-[#f8f9ff] text-[#0b1c30] w-40 sm:w-48"
              style={{
                borderColor: "rgba(199,196,215,0.4)",
                fontFamily: "Geist, sans-serif",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#4648d4"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(70,72,212,0.1)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(199,196,215,0.4)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>

          <Link
            href="/dashboard/add-product"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 bg-[#0b1c30] text-white hover:bg-[#1a2e45]"
            style={{ fontFamily: "Geist, sans-serif", letterSpacing: "0.02em" }}
          >
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              add
            </span>
            Add product
          </Link>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-3">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "rgba(70,72,212,0.06)" }}
          >
            <span className="material-symbols-outlined text-[32px] text-[#c7c4d7]" style={{ fontVariationSettings: "'FILL' 0" }}>
              inventory_2
            </span>
          </div>
          <p className="text-sm text-[#767586]">No products added yet.</p>
          <Link
            href="/dashboard/add-product"
            className="text-xs font-semibold text-[#4648d4] hover:underline"
          >
            Add your first product →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr
                className="text-[9px] font-bold uppercase tracking-widest border-b text-[#767586]"
                style={{ borderColor: "rgba(199,196,215,0.25)", letterSpacing: "0.08em", backgroundColor: "#fafbff" }}
              >
                <th className="px-5 py-3.5">Product</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Clicks</th>
                <th className="px-5 py-3.5">Added</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-[#767586]">
                    No products match &quot;{search}&quot;
                  </td>
                </tr>
              ) : (
                filtered.map((product, rowIdx) => {
                  const catStyle = { bg: "rgba(70,72,212,0.08)", text: "#4648d4" };
                  return (
                    <tr
                      key={product.id}
                      className="border-b group/row transition-colors duration-150 hover:bg-[#f8f9ff]"
                      style={{
                        borderColor: "rgba(199,196,215,0.18)",
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateX(0)" : "translateX(-8px)",
                        transition: `opacity 0.4s ease ${rowIdx * 0.03}s, transform 0.4s ease ${rowIdx * 0.03}s`,
                      }}
                    >
                      {/* Product */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className="relative w-10 h-10 rounded-[10px] border overflow-hidden shrink-0 bg-[#eff4ff]"
                            style={{ borderColor: "rgba(199,196,215,0.3)", position: "relative" }}
                          >
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              sizes="40px"
                              className="object-cover transition-transform duration-500 group-hover/row:scale-110"
                              unoptimized
                            />
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/product/${product.id}`}
                              className="font-semibold text-sm hover:text-[#4648d4] transition-colors line-clamp-1 text-[#0b1c30]"
                              style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.01em" }}
                            >
                              {product.name}
                            </Link>
                            <p className="text-[10px] mt-0.5 line-clamp-1 max-w-[180px] text-[#767586]">
                              {product.description.slice(0, 55)}…
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-3.5">
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor: catStyle.bg,
                            color: catStyle.text,
                            letterSpacing: "0.07em",
                            border: `1px solid ${catStyle.text}20`,
                          }}
                        >
                          {categoryMap[product.category] || product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-3.5">
                        <span
                          className="text-sm font-bold text-[#0b1c30]"
                          style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.01em" }}
                        >
                          {product.price ? `₹${product.price.toLocaleString("en-IN")}` : "—"}
                        </span>
                      </td>

                      {/* Clicks */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-bold text-sm"
                            style={{ color: "#4648d4", fontFamily: "Geist Mono, monospace" }}
                          >
                            {product.clicks ?? 0}
                          </span>
                          {(product.clicks ?? 0) > 0 && (
                            <span
                              className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{ backgroundColor: "rgba(70,72,212,0.08)", color: "#4648d4" }}
                            >
                              active
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Added */}
                      <td className="px-5 py-3.5">
                        <span className="text-[10px] font-medium text-[#767586]" style={{ fontFamily: "Geist Mono, monospace" }}>
                          {new Date(product.createdAt as any).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex justify-end items-center gap-1.5">
                          <Link
                            href={`/dashboard/edit-product/${product.id}`}
                            className="flex items-center justify-center w-8 h-8 rounded-[8px] text-[#767586] border transition-all duration-200 hover:border-[#4648d4] hover:text-[#4648d4] hover:bg-[rgba(70,72,212,0.06)] active:scale-90"
                            style={{ borderColor: "rgba(199,196,215,0.35)" }}
                            title="Edit Product"
                          >
                            <span className="material-symbols-outlined text-[15px]">edit</span>
                          </Link>
                          <DeleteProductButton productId={product.id} productName={product.name} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}



