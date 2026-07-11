import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, CATEGORY_MAP } from "@/components/ProductCard";

interface TopPicksProps {
  products: Product[];
}

export default function TopPicks({ products }: TopPicksProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-12 md:py-20 max-w-[1280px] mx-auto px-4 md:px-8 border-b" id="trending" style={{ borderColor: "rgba(199,196,215,0.3)" }}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "rgba(11,122,94,0.08)",
              color: "#0b7a5e",
              border: "1px solid rgba(11,122,94,0.15)",
            }}
          >
            Popular Choice
          </div>
          <h2
            className="text-3xl font-semibold tracking-tight"
            style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.03em" }}
          >
            Top Picks
          </h2>
          <p className="text-sm mt-1.5" style={{ color: "#464554" }}>
            Our community&apos;s most viewed and requested curations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const categoryLabel = CATEGORY_MAP[product.category] || product.category;
          const clicksCount = product.clicks ?? 0;
          return (
            <div
              key={product.id}
              className="group relative flex flex-col bg-white rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#4648d4]/30"
              style={{
                borderColor: "rgba(199,196,215,0.35)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <Link
                href={`/product/${product.id}`}
                className="relative block overflow-hidden shrink-0"
                style={{ height: "240px", backgroundColor: "#f0f0f5", position: "relative" }}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  unoptimized
                />

                {clicksCount > 0 && (
                  <div
                    className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.94)",
                      backdropFilter: "blur(6px)",
                      color: "#4648d4",
                      border: "1px solid rgba(70,72,212,0.15)",
                    }}
                  >
                    <span className="material-symbols-outlined text-[12px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                      trending_up
                    </span>
                    <span>{clicksCount} views</span>
                  </div>
                )}
              </Link>

              <div className="flex flex-col flex-1 p-4 gap-2">
                <div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(70,72,212,0.07)",
                      color: "#4648d4",
                      letterSpacing: "0.05em",
                      border: "1px solid rgba(70,72,212,0.14)",
                    }}
                  >
                    {categoryLabel}
                  </span>
                </div>

                <Link href={`/product/${product.id}`}>
                  <h3
                    className="font-semibold leading-snug line-clamp-1 group-hover:text-[#4648d4] transition-colors"
                    style={{
                      fontFamily: "Geist, system-ui, sans-serif",
                      fontSize: "14px",
                      color: "#0d0d14",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {product.name}
                  </h3>
                </Link>

                <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: "#767586" }}>
                  {product.description}
                </p>

                {product.price != null && (
                  <p
                    className="font-bold text-[15px]"
                    style={{
                      fontFamily: "Geist, sans-serif",
                      color: "#0d0d14",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
