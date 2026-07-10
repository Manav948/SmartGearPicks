import React from "react";

interface StatCardsProps {
  totalProducts: number;
  totalClicks: number;
  avgClicksPerProduct: number;
  categoriesCount: number;
}

export default function StatCards({
  totalProducts,
  totalClicks,
  avgClicksPerProduct,
  categoriesCount,
}: StatCardsProps) {
  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: "inventory_2",
      color: "#4648d4",
      bg: "rgba(70,72,212,0.08)",
      sub: `${totalProducts} live`,
    },
    {
      label: "Total Clicks",
      value: totalClicks > 1000 ? `${(totalClicks / 1000).toFixed(1)}k` : String(totalClicks),
      icon: "touch_app",
      color: "#0b7a5e",
      bg: "rgba(11,122,94,0.08)",
      sub: "affiliate traffic",
    },
    {
      label: "Avg Clicks / Product",
      value: avgClicksPerProduct,
      icon: "analytics",
      color: "#c47d00",
      bg: "rgba(196,125,0,0.08)",
      sub: "per listing",
    },
    {
      label: "Categories",
      value: categoriesCount,
      icon: "category",
      color: "#6644d4",
      bg: "rgba(102,68,212,0.08)",
      sub: "active categories",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map(({ label, value, icon, color, bg, sub }) => (
        <div
          key={label}
          className="rounded-2xl p-5 border flex flex-col gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md bg-white"
          style={{ borderColor: "rgba(199,196,215,0.3)" }}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
              <span className="material-symbols-outlined text-[22px]" style={{ color, fontVariationSettings: "'FILL' 0" }}>
                {icon}
              </span>
            </div>
            <span className="text-xs font-medium text-[#767586]">{sub}</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-1 text-[#767586]" style={{ letterSpacing: "0.06em" }}>{label}</p>
            <p className="text-3xl font-bold tracking-tight text-[#0b1c30]" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.03em" }}>
              {value}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
