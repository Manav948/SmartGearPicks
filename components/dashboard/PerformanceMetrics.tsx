"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Product } from "../ProductCard";

interface PerformanceMetricsProps {
  chartProducts: Product[];
  maxClicks: number;
  catBreakdown: Record<string, number>;
  totalProducts: number;
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

const BAR_COLORS = [
  "linear-gradient(to top, #4648d4, #818cf8)",
  "linear-gradient(to top, #4648d4cc, #818cf8aa)",
  "linear-gradient(to top, #4648d4aa, #818cf888)",
  "linear-gradient(to top, #4648d488, #818cf866)",
  "linear-gradient(to top, #4648d466, #818cf855)",
  "linear-gradient(to top, #4648d444, #818cf844)",
  "linear-gradient(to top, #4648d433, #818cf833)",
];

export default function PerformanceMetrics({
  chartProducts,
  maxClicks,
  catBreakdown,
  totalProducts,
  categoryMap,
}: PerformanceMetricsProps) {
  const { ref, inView } = useInView();
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-3 gap-5"
    >
      {/* Product engagement Chart */}
      <div
        className="lg:col-span-2 rounded-[20px] p-6 border flex flex-col bg-white overflow-hidden relative"
        style={{
          borderColor: "rgba(199,196,215,0.28)",
          boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Decorative bg */}
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(70,72,212,0.05) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />

        <div className="flex justify-between items-start mb-8 relative">
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-1 text-[#767586]"
              style={{ letterSpacing: "0.1em" }}
            >
              📊 Performance
            </p>
            <h2
              className="text-xl font-bold tracking-tight text-[#0b1c30]"
              style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.025em" }}
            >
              Product engagement
            </h2>
          </div>
          {chartProducts.length > 0 && (
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "linear-gradient(135deg, #4648d4, #818cf8)", boxShadow: "0 0 6px rgba(70,72,212,0.5)" }}
              />
              <span className="text-[10px] text-[#767586] font-medium">Tracked product clicks</span>
            </div>
          )}
        </div>

        {chartProducts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[160px] gap-3">
            <span className="material-symbols-outlined text-[48px] text-[#c7c4d7]" style={{ fontVariationSettings: "'FILL' 0" }}>
              bar_chart
            </span>
            <p className="text-sm text-[#c7c4d7] text-center">No data yet — add products to see clicks here.</p>
          </div>
        ) : (
          <div className="flex-1">
            {/* Chart bars */}
            <div className="flex items-end gap-2 h-[160px] px-1">
              {chartProducts.map((p, i) => {
                const clicks = p.clicks ?? 0;
                const pct = maxClicks > 0 ? Math.max(5, (clicks / maxClicks) * 100) : 5;
                const isHovered = hoveredBar === i;
                return (
                  <div
                    key={p.id}
                    className="flex-1 flex flex-col items-center gap-1.5 group/bar cursor-pointer"
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip */}
                    <div
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-md transition-all duration-200 whitespace-nowrap"
                      style={{
                        backgroundColor: isHovered ? "#0b1c30" : "transparent",
                        color: isHovered ? "#fff" : "transparent",
                        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                      }}
                    >
                      {clicks}
                    </div>
                    <Link href={`/product/${p.id}`} className="w-full" title={p.name}>
                      <div
                        className="w-full rounded-t-[6px] transition-all duration-500"
                        style={{
                          height: inView ? `${(pct / 100) * 150}px` : "4px",
                          minHeight: "4px",
                          background: isHovered
                            ? "linear-gradient(to top, #0b1c30, #4648d4)"
                            : BAR_COLORS[i] || BAR_COLORS[BAR_COLORS.length - 1],
                          transitionDelay: inView ? `${i * 0.07}s` : "0s",
                          transform: isHovered ? "scaleX(1.05)" : "scaleX(1)",
                          boxShadow: isHovered ? "0 -4px 12px rgba(70,72,212,0.35)" : "none",
                        }}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Labels */}
            <div
              className="flex gap-2 mt-3 border-t pt-3"
              style={{ borderColor: "rgba(199,196,215,0.25)" }}
            >
              {chartProducts.map((p, i) => (
                <div key={p.id} className="flex-1 text-center">
                  <span
                    className="text-[9px] leading-tight block truncate font-medium"
                    style={{ color: hoveredBar === i ? "#4648d4" : "#767586" }}
                    title={p.name}
                  >
                    {p.name.split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category Breakdown */}
      <div
        className="rounded-[20px] p-6 border flex flex-col bg-white overflow-hidden relative"
        style={{
          borderColor: "rgba(199,196,215,0.28)",
          boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease 0.12s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.12s",
        }}
      >
        {/* Decorative bg */}
        <div
          className="absolute bottom-0 left-0 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="mb-6 relative">
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-1 text-[#767586]"
            style={{ letterSpacing: "0.1em" }}
          >
            🗂 Breakdown
          </p>
          <h2
            className="text-xl font-bold tracking-tight text-[#0b1c30]"
            style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.025em" }}
          >
            Catalog mix
          </h2>
        </div>

        <div className="flex flex-col gap-3.5 flex-1 relative">
          {Object.entries(catBreakdown).length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-2">
              <span className="material-symbols-outlined text-[40px] text-[#c7c4d7]" style={{ fontVariationSettings: "'FILL' 0" }}>
                category
              </span>
              <p className="text-sm text-[#c7c4d7] text-center">No categories yet</p>
            </div>
          ) : (
            Object.entries(catBreakdown)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, count], idx) => {
                const pct = Math.round((count / totalProducts) * 100);
                const catColors = ["#4648d4", "#5b63df", "#7179e9", "#818cf8"];
                const color = catColors[idx % catColors.length];
                return (
                  <div key={cat} className="group/cat">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span
                        className="font-semibold"
                        style={{ fontFamily: "Geist, sans-serif", color: "#464554" }}
                      >
                        {categoryMap[cat] || cat}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#767586]">{count} item{count !== 1 ? "s" : ""}</span>
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ backgroundColor: `${color}15`, color }}
                        >
                          {pct}%
                        </span>
                      </div>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: "rgba(199,196,215,0.2)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: inView ? `${pct}%` : "0%",
                          background: `linear-gradient(to right, ${color}cc, ${color})`,
                          transitionDelay: `${0.2 + idx * 0.08}s`,
                          boxShadow: `0 0 6px ${color}40`,
                        }}
                      />
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </section>
  );
}

