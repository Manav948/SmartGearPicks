import React from "react";
import Link from "next/link";
import { Product } from "../ProductCard";

interface PerformanceMetricsProps {
  chartProducts: Product[];
  maxClicks: number;
  catBreakdown: Record<string, number>;
  totalProducts: number;
  categoryMap: Record<string, string>;
}

export default function PerformanceMetrics({
  chartProducts,
  maxClicks,
  catBreakdown,
  totalProducts,
  categoryMap,
}: PerformanceMetricsProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
      <div className="lg:col-span-2 rounded-2xl p-6 border flex flex-col bg-white" style={{ borderColor: "rgba(199,196,215,0.3)" }}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[#767586]" style={{ letterSpacing: "0.08em" }}>Performance</p>
            <h2 className="text-xl font-semibold tracking-tight text-[#0b1c30]" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.02em" }}>
              Click Performance
            </h2>
          </div>
        </div>
        {chartProducts.length === 0 ? (
          <div className="flex-1 flex items-center justify-center min-h-50">
            <p className="text-sm text-[#c7c4d7]">No data yet — add products to see clicks here.</p>
          </div>
        ) : (
          <div className="flex-1">
            <div className="flex items-end gap-3 h-45">
              {chartProducts.map((p, i) => {
                const clicks = p.clicks ?? 0;
                const pct = maxClicks > 0 ? Math.max(4, (clicks / maxClicks) * 100) : 4;
                return (
                  <div key={p.id} className="flex-1 flex flex-col items-center gap-1 group/bar">
                    <span className="text-xs font-semibold opacity-0 group-hover/bar:opacity-100 transition-opacity text-[#4648d4]">
                      {clicks}
                    </span>
                    <Link href={`/product/${p.id}`} className="w-full" title={p.name}>
                      <div
                        className="w-full rounded-t-lg transition-all duration-300 cursor-pointer"
                        style={{
                          height: `${(pct / 100) * 150}px`,
                          minHeight: "8px",
                          backgroundColor: i === 0 ? "#4648d4" : `rgba(70,72,212,${0.65 - i * 0.07})`,
                        }}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3 mt-3 border-t pt-3" style={{ borderColor: "rgba(199,196,215,0.3)" }}>
              {chartProducts.map((p) => (
                <div key={p.id} className="flex-1 text-center">
                  <span className="text-[10px] leading-tight block truncate text-[#767586]" title={p.name}>
                    {p.name.split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

     
      <div className="rounded-2xl p-6 border flex flex-col bg-white" style={{ borderColor: "rgba(199,196,215,0.3)" }}>
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[#767586]" style={{ letterSpacing: "0.08em" }}>Breakdown</p>
          <h2 className="text-xl font-semibold tracking-tight text-[#0b1c30]" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.02em" }}>
            By Category
          </h2>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          {Object.entries(catBreakdown).length === 0 ? (
            <p className="text-sm text-center m-auto text-[#c7c4d7]">No categories yet</p>
          ) : (
            Object.entries(catBreakdown)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, count]) => {
                const pct = Math.round((count / totalProducts) * 100);
                return (
                  <div key={cat}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ fontFamily: "Geist, sans-serif", color: "#464554", fontWeight: 500 }}>
                        {categoryMap[cat] || cat}
                      </span>
                      <span className="text-[#767586]">{count} item{count !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(199,196,215,0.3)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, backgroundColor: "#4648d4" }}
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
