"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../ProductCard";

interface NewArrivalsProps {
  newArrivals: Product[];
  categoryMap: Record<string, string>;
}

function useInView(threshold = 0.15) {
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

export default function NewArrivals({ newArrivals, categoryMap }: NewArrivalsProps) {
  if (newArrivals.length === 0) return null;

  const featured = newArrivals[0];
  const remaining = newArrivals.slice(1, 3);
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative">
      {/* Section header */}
      <div
        className="flex items-end justify-between mb-6"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Animated accent bar */}
          <div
            className="relative h-8 w-1 rounded-full overflow-hidden"
            style={{ background: "rgba(70,72,212,0.15)" }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 rounded-full"
              style={{
                background: "linear-gradient(to top, #4648d4, #a5b4fc)",
                height: inView ? "100%" : "0%",
                transition: "height 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            />
          </div>
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest text-[#4648d4]"
              style={{ letterSpacing: "0.14em" }}
            >
              ✦ New Arrivals
            </p>
            <h2
              className="text-2xl font-bold tracking-tight text-[#0b1c30] mt-0.5"
              style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.035em" }}
            >
              Latest additions to your library.
            </h2>
          </div>
        </div>
        <Link
          href="/dashboard/store"
          className="group flex items-center gap-1.5 text-xs font-semibold text-[#767586] hover:text-[#4648d4] transition-colors whitespace-nowrap ml-4"
        >
          View All storefront
          <span
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            style={{ fontSize: "13px" }}
          >
            →
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-auto md:h-[440px]">

        {/* Featured (large) card */}
        {featured && (
          <Link
            href={`/product/${featured.id}`}
            className="relative rounded-[20px] overflow-hidden group block h-[340px] md:h-full"
            style={{
              boxShadow: "0 2px 12px rgba(70,72,212,0.08), 0 1px 4px rgba(0,0,0,0.06)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.98)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <Image
              src={featured.imageUrl}
              alt={featured.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              unoptimized
            />

            {/* Multi-layer gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(7,5,25,0.92) 0%, rgba(7,5,25,0.45) 45%, transparent 80%)",
              }}
            />

            {/* Shimmer sweep on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
              }}
            />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span
                className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(70,72,212,0.75)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  border: "1px solid rgba(120,122,255,0.4)",
                  letterSpacing: "0.1em",
                }}
              >
                {categoryMap[featured.category] || featured.category}
              </span>
            </div>

            {/* NEW badge */}
            <div className="absolute top-4 right-4">
              <span
                className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
                  style={{ boxShadow: "0 0 5px #34d399" }}
                />
                New
              </span>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <h3
                className="text-white font-bold text-xl md:text-2xl leading-tight mb-2"
                style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.025em" }}
              >
                {featured.name}
              </h3>
              <p className="text-white/70 text-xs md:text-sm line-clamp-2 mb-4 max-w-md" style={{ lineHeight: "1.6" }}>
                {featured.description}
              </p>
              <div className="flex items-center justify-between gap-3">
                {featured.price != null && (
                  <p
                    className="text-white font-bold text-lg md:text-xl"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    ₹{featured.price.toLocaleString("en-IN")}
                  </p>
                )}
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 group-hover:bg-[#4648d4] group-hover:text-white bg-white text-[#0b1c30]"
                  style={{ letterSpacing: "0.02em" }}
                >
                  View Details
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Right column — two stacked cards */}
        <div className="flex flex-col gap-4 md:gap-5 h-auto md:h-full">
          {remaining.map((product, idx) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="relative rounded-[20px] overflow-hidden group block flex-1"
              style={{
                minHeight: "160px",
                boxShadow: "0 2px 10px rgba(70,72,212,0.07), 0 1px 3px rgba(0,0,0,0.05)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.98)",
                transition: `opacity 0.6s ease ${0.2 + idx * 0.12}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.2 + idx * 0.12}s`,
              }}
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                unoptimized
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,5,25,0.88) 0%, rgba(7,5,25,0.3) 55%, transparent 90%)",
                }}
              />

              {/* Hover shimmer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.04) 50%, transparent 80%)",
                }}
              />

              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span
                  className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(70,72,212,0.75)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    border: "1px solid rgba(120,122,255,0.4)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {categoryMap[product.category] || product.category}
                </span>
              </div>

              {/* Click indicator */}
              {(product.clicks ?? 0) > 0 && (
                <div className="absolute top-3 right-3">
                  <span
                    className="text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    ↑ {product.clicks} clicks
                  </span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3
                  className="text-white font-bold text-base md:text-lg leading-tight mb-1.5"
                  style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.018em" }}
                >
                  {product.name}
                </h3>
                <div className="flex items-center justify-between gap-3">
                  {product.price != null && (
                    <p className="text-white/90 text-sm font-bold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  )}
                  <span className="text-white/70 text-xs font-semibold group-hover:text-white transition-colors flex items-center gap-1">
                    View Details <span className="transition-transform duration-300 group-hover:translate-x-0.5 text-[12px]">→</span>
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
