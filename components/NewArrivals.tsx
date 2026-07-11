import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, CATEGORY_MAP } from "@/components/ProductCard";

interface NewArrivalsProps {
  products: Product[];
}

export default function NewArrivals({ products }: NewArrivalsProps) {
  if (products.length === 0) return null;

  const firstArrival = products[0];
  const remainingArrivals = products.slice(1, 3);

  return (
    <section className="py-12 md:py-20 max-w-[1280px] mx-auto px-4 md:px-8 border-b" id="new-arrivals" style={{ borderColor: "rgba(199,196,215,0.3)" }}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3"
            style={{
              backgroundColor: "rgba(70,72,212,0.08)",
              color: "#4648d4",
              border: "1px solid rgba(70,72,212,0.15)",
            }}
          >
            Fresh Finds
          </div>
          <h2
            className="text-3xl font-semibold tracking-tight"
            style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.03em" }}
          >
            New Arrivals
          </h2>
          <p className="text-sm mt-1.5" style={{ color: "#464554" }}>
            The latest handpicked curations added to our library.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[440px]">
        {firstArrival && (
          <Link
            href={`/product/${firstArrival.id}`}
            className="relative rounded-2xl overflow-hidden group flex flex-col md:flex-row h-auto md:h-full shadow-md border hover:shadow-2xl transition-all duration-500 hover:-translate-y-0.5 bg-white"
            style={{ borderColor: "rgba(199,196,215,0.35)" }}
          >
            <div className="relative w-full h-[240px] md:h-full md:w-[52%] shrink-0 bg-[#f8f9ff] overflow-hidden border-b md:border-b-0 md:border-r border-slate-100" style={{ position: "relative" }}>
              <Image
                src={firstArrival.imageUrl}
                alt={firstArrival.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                unoptimized
              />
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(8px)",
                    color: "#4648d4",
                    border: "1px solid rgba(70,72,212,0.15)",
                  }}
                >
                  {CATEGORY_MAP[firstArrival.category] || firstArrival.category}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 md:p-8 flex-1">
              <div>
                <div className="flex items-center gap-1.5 mb-3 text-[#4648d4]">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: "Geist, sans-serif" }}>
                    Featured Arrival
                  </span>
                </div>

                <h3 className="text-[#0b1c30] font-bold text-xl md:text-2xl leading-tight mb-3 group-hover:text-[#4648d4] transition-colors duration-300" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.02em" }}>
                  {firstArrival.name}
                </h3>

                <p className="text-on-surface-variant text-xs md:text-sm line-clamp-3 md:line-clamp-4 leading-relaxed mb-4">
                  {firstArrival.description}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-100">
                {firstArrival.price != null && (
                  <p className="text-[#0b1c30] font-extrabold text-lg md:text-xl" style={{ letterSpacing: "-0.02em" }}>
                    ₹{firstArrival.price.toLocaleString("en-IN")}
                  </p>
                )}
                <span
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 bg-[#0f172a] text-white group-hover:bg-[#4648d4] group-hover:shadow-lg group-hover:shadow-indigo-500/10"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Explore Pick
                  <span className="text-[14px]">→</span>
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="flex flex-col gap-4 md:gap-5 h-auto md:h-full justify-between">
          {remainingArrivals.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="relative rounded-2xl overflow-hidden group flex flex-row h-[140px] sm:h-[160px] md:h-[210px] shadow-md border hover:shadow-2xl transition-all duration-500 hover:-translate-y-0.5 bg-white"
              style={{ borderColor: "rgba(199,196,215,0.35)" }}
            >
              <div className="relative w-[38%] sm:w-[40%] h-full shrink-0 bg-[#f8f9ff] overflow-hidden border-r border-slate-100" style={{ position: "relative" }}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  unoptimized
                />
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span
                    className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(6px)",
                      color: "#4648d4",
                      border: "1px solid rgba(70,72,212,0.15)",
                    }}
                  >
                    {CATEGORY_MAP[product.category] || product.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between p-4 sm:p-5 flex-1">
                <div>
                  <div className="text-[9px] font-bold text-[#4648d4] uppercase tracking-wider mb-1">
                    New Arrival
                  </div>
                  <h3 className="text-[#0b1c30] font-bold text-sm sm:text-base md:text-lg leading-snug line-clamp-2 group-hover:text-[#4648d4] transition-colors duration-300" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.015em" }}>
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-100">
                  {product.price != null && (
                    <p className="text-[#0b1c30] font-extrabold text-sm sm:text-base" style={{ letterSpacing: "-0.02em" }}>
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  )}
                  <span className="text-[#4648d4] text-xs font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-300">
                    View Details <span className="text-[13px]">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
