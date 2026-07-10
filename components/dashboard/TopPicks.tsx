import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../ProductCard";

interface TopPicksProps {
  topPicks: Product[];
  categoryMap: Record<string, string>;
}

export default function TopPicks({
  topPicks,
  categoryMap,
}: TopPicksProps) {
  if (topPicks.length === 0) return null;

  return (
    <section>
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[#4648d4]" style={{ letterSpacing: "0.1em" }}>
            Top Picks
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-[#0b1c30]" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.03em" }}>
            Your highest performing products.
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {topPicks.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group block rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white"
            style={{ borderColor: "rgba(199,196,215,0.3)" }}
          >
            <div className="relative overflow-hidden" style={{ height: "180px", backgroundColor: "#e5eeff", position: "relative" }}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
          
              <div
                className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)", color: "#4648d4" }}
              >
                ↑ {product.clicks ?? 0}
              </div>
            </div>
            <div className="p-3">
              <span
                className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "rgba(70,72,212,0.08)", color: "#4648d4", letterSpacing: "0.07em" }}
              >
                {categoryMap[product.category] || product.category}
              </span>
              <h3 className="text-sm font-semibold mt-2 line-clamp-1 text-[#0b1c30]" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.01em" }}>
                {product.name}
              </h3>
              {product.price && (
                <p className="text-sm font-bold mt-0.5 text-[#0b1c30]">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
