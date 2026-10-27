"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../ProductCard";

interface TopPicksProps {
  topPicks: Product[];
  categoryMap: Record<string, string>;
}

function useInView(threshold = 0.1) {
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

export default function TopPicks({ topPicks, categoryMap }: TopPicksProps) {
  if (topPicks.length === 0) return null;
  const { ref, inView } = useInView();

  return (
    <section ref={ref}>
      {/* Section header */}
      <div
        className="flex items-end justify-between mb-6"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="relative h-8 w-1 rounded-full overflow-hidden"
            style={{ background: "rgba(124,58,237,0.15)" }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 rounded-full"
              style={{
                background: "linear-gradient(to top, #7c3aed, #c4b5fd)",
                height: inView ? "100%" : "0%",
                transition: "height 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            />
          </div>
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest text-[#7c3aed]"
              style={{ letterSpacing: "0.14em" }}
            >
              ★ Top Picks
            </p>
            <h2
              className="text-2xl font-bold tracking-tight text-[#0b1c30] mt-0.5"
              style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.035em" }}
            >
              Your highest performing products.
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topPicks.map((product, i) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group block rounded-[18px] overflow-hidden border bg-white"
            style={{
              borderColor: "rgba(199,196,215,0.28)",
              boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
              transition: `opacity 0.55s ease ${0.1 + i * 0.09}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.09}s`,
            }}
          >
            {/* Image section */}
            <div
              className="relative overflow-hidden"
              style={{ height: "190px", backgroundColor: "#e5eeff", position: "relative" }}
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-600 group-hover:scale-[1.07]"
                unoptimized
              />

              {/* Overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  background: "linear-gradient(to top, rgba(7,5,25,0.4) 0%, transparent 60%)",
                }}
              />

              {/* Rank badge */}
              <div
                className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black"
                style={{
                  background: i === 0
                    ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                    : i === 1
                    ? "linear-gradient(135deg, #94a3b8, #64748b)"
                    : i === 2
                    ? "linear-gradient(135deg, #cd7c53, #a0522d)"
                    : "rgba(255,255,255,0.85)",
                  color: i < 3 ? "#fff" : "#0b1c30",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                #{i + 1}
              </div>

              {/* Clicks badge */}
              <div
                className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(6px)",
                  color: "#7c3aed",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"
                  style={{ boxShadow: "0 0 4px #a78bfa" }}
                />
                {product.clicks ?? 0} clicks
              </div>
            </div>

            {/* Card body */}
            <div className="p-3.5">
              <span
                className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full inline-block"
                style={{
                  backgroundColor: "rgba(124,58,237,0.08)",
                  color: "#7c3aed",
                  letterSpacing: "0.08em",
                  border: "1px solid rgba(124,58,237,0.15)",
                }}
              >
                {categoryMap[product.category] || product.category}
              </span>

              <h3
                className="text-sm font-bold mt-2 line-clamp-1 text-[#0b1c30] group-hover:text-[#7c3aed] transition-colors duration-300"
                style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.01em" }}
              >
                {product.name}
              </h3>

              <div className="flex items-center justify-between mt-1.5">
                {product.price && (
                  <p className="text-sm font-bold text-[#0b1c30]">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                )}
                <span
                  className="text-[10px] font-semibold text-[#767586] group-hover:text-[#7c3aed] transition-colors flex items-center gap-0.5"
                >
                  View →
                </span>
              </div>

              {/* Mini performance bar */}
              <div
                className="mt-3 h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(199,196,215,0.25)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: inView ? `${Math.min(100, ((product.clicks ?? 0) / (topPicks[0]?.clicks ?? 1)) * 100)}%` : "0%",
                    background: i === 0
                      ? "linear-gradient(to right, #7c3aed, #a78bfa)"
                      : "linear-gradient(to right, #a78bfa, #c4b5fd)",
                    transitionDelay: `${0.3 + i * 0.1}s`,
                  }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
