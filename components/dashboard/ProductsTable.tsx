import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../ProductCard";
import DeleteProductButton from "./DeleteProductButton";

interface ProductsTableProps {
  products: Product[];
  categoryMap: Record<string, string>;
}

export default function ProductsTable({
  products,
  categoryMap,
}: ProductsTableProps) {
  return (
    <section className="rounded-2xl border overflow-hidden bg-white" style={{ borderColor: "rgba(199,196,215,0.3)" }}>
      <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: "rgba(199,196,215,0.3)" }}>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[#767586]" style={{ letterSpacing: "0.08em" }}>Catalog</p>
          <h2 className="text-xl font-semibold tracking-tight text-[#0b1c30]" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.02em" }}>
            Affiliate Items
          </h2>
        </div>
        <Link
          href="/dashboard/add-product"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 bg-[#0b1c30] text-white"
          style={{ fontFamily: "Geist, sans-serif", borderTop: "1px solid rgba(255,255,255,0.12)" }}
        >
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>add</span>
          Add Item
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-[56px] mb-4 block text-[#c7c4d7]" style={{ fontVariationSettings: "'FILL' 0" }}>inventory_2</span>
          <p className="text-sm text-[#767586]">No products added yet. Click &quot;Add Item&quot; to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold uppercase tracking-wider border-b text-[#767586]" style={{ borderColor: "rgba(199,196,215,0.3)", letterSpacing: "0.05em" }}>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Clicks</th>
                <th className="px-6 py-3">Added</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...products].sort((a, b) => (b.clicks ?? 0) - (a.clicks ?? 0)).map((product) => (
                <tr
                  key={product.id}
                  className="border-b transition-colors hover:bg-[#f8f9ff]"
                  style={{ borderColor: "rgba(199,196,215,0.2)" }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-xl border overflow-hidden shrink-0 bg-[#eff4ff]" style={{ borderColor: "rgba(199,196,215,0.35)", position: "relative" }}>
                        <Image src={product.imageUrl} alt={product.name} fill sizes="44px" className="object-cover" unoptimized />
                      </div>
                      <div>
                        <Link
                          href={`/product/${product.id}`}
                          className="font-medium text-sm hover:text-[#4648d4] transition-colors line-clamp-1 text-[#0b1c30]"
                          style={{ fontFamily: "Geist, sans-serif" }}
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs mt-0.5 line-clamp-1 max-w-45 text-[#767586]">
                          {product.description.slice(0, 60)}…
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rgba(70,72,212,0.08) text-[#4648d4]"
                      style={{ fontFamily: "Geist, sans-serif", backgroundColor: "rgba(70,72,212,0.08)", letterSpacing: "0.05em" }}
                    >
                      {categoryMap[product.category] || product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-[#0b1c30]">
                      {product.price ? `₹${product.price.toLocaleString("en-IN")}` : "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-sm text-[#4648d4]">{product.clicks ?? 0}</span>
                      {(product.clicks ?? 0) > 0 && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-rgba(70,72,212,0.08) text-[#4648d4]" style={{ backgroundColor: "rgba(70,72,212,0.08)" }}>
                          ↑ active
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-[#767586]">
                    {new Date(product.createdAt as any).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Link
                        href={`/dashboard/edit-product/${product.id}`}
                        className="flex items-center justify-center p-1.5 rounded-lg text-[#767586] bg-transparent border border-transparent hover:border-[#4648d4]/20 hover:bg-[#4648d4]/08 hover:text-[#4648d4] transition-all active:scale-[0.93]"
                        title="Edit Product"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          edit
                        </span>
                      </Link>
                      <DeleteProductButton productId={product.id} productName={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
