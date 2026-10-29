"use client";

import React, { useEffect, useRef, useState } from "react";

interface StatCardsProps {
  totalProducts: number;
  totalClicks: number;
  avgClicksPerProduct: number;
  categoriesCount: number;
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

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const duration = 900;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(ease * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, value]);

  return <span onMouseEnter={() => setStarted(true)} style={{ display: "inline" }}>{display}</span>;
}

export default function StatCards({
  totalProducts,
  totalClicks,
  avgClicksPerProduct,
  categoriesCount,
}: StatCardsProps) {
  const { ref, inView } = useInView();
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setTriggered(true), 200);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const stats = [
    {
      label: "Total Products",
      rawValue: totalProducts,
      displayValue: totalProducts > 1000 ? `${(totalProducts / 1000).toFixed(1)}k` : totalProducts,
      isNumber: true,
      icon: "inventory_2",
      sub: "in your collection",
      accent: "#4648d4",
      bg: "linear-gradient(135deg, rgba(70,72,212,0.1) 0%, rgba(70,72,212,0.04) 100%)",
      iconBg: "rgba(70,72,212,0.12)",
      trend: "catalog total",
    },
    {
      label: "Total Clicks",
      rawValue: totalClicks,
      displayValue: totalClicks > 1000 ? `${(totalClicks / 1000).toFixed(1)}k` : totalClicks,
      isNumber: true,
      icon: "touch_app",
      sub: "tracked visits",
      accent: "#3f55bd",
      bg: "linear-gradient(135deg, rgba(63,85,189,0.1) 0%, rgba(63,85,189,0.04) 100%)",
      iconBg: "rgba(63,85,189,0.12)",
      trend: "all time",
    },
    {
      label: "Avg Clicks / Product",
      rawValue: avgClicksPerProduct,
      displayValue: avgClicksPerProduct,
      isNumber: true,
      icon: "analytics",
      sub: "per product",
      accent: "#6366f1",
      bg: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0.04) 100%)",
      iconBg: "rgba(99,102,241,0.12)",
      trend: "per product",
    },
    {
      label: "Categories",
      rawValue: categoriesCount,
      displayValue: categoriesCount,
      isNumber: true,
      icon: "category",
      sub: "currently represented",
      accent: "#818cf8",
      bg: "linear-gradient(135deg, rgba(129,140,248,0.1) 0%, rgba(129,140,248,0.04) 100%)",
      iconBg: "rgba(129,140,248,0.12)",
      trend: "represented categories",
    },
  ];

  return (
    <section
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map(({ label, rawValue, displayValue, isNumber, icon, sub, accent, bg, iconBg, trend }, i) => (
        <div
          key={label}
          className="relative rounded-[18px] p-5 border flex flex-col gap-4 group overflow-hidden cursor-default"
          style={{
            background: "#ffffff",
            borderColor: "rgba(199,196,215,0.28)",
            boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0) scale(1)" : "translateY(22px) scale(0.96)",
            transition: `opacity 0.55s ease ${i * 0.08}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
          }}
        >
          {/* Gradient background fill on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[18px]"
            style={{ background: bg }}
          />

          {/* Animated border glow on hover */}
          <div
            className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 1px ${accent}30` }}
          />

          <div className="relative flex items-start justify-between gap-2">
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: iconBg }}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ color: accent, fontVariationSettings: "'FILL' 0" }}
              >
                {icon}
              </span>
            </div>

            {/* Trend badge */}
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{
                backgroundColor: `${accent}15`,
                color: accent,
                letterSpacing: "0.04em",
              }}
            >
              {trend}
            </span>
          </div>

          <div className="relative">
            <p
              className="text-[10px] font-semibold uppercase tracking-wider mb-1 text-[#767586]"
              style={{ letterSpacing: "0.07em" }}
            >
              {label}
            </p>
            <p
              className="text-3xl font-bold tracking-tight text-[#0b1c30] leading-none"
              style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.04em" }}
            >
              {triggered && isNumber && typeof rawValue === "number" ? (
                rawValue > 999 ? (
                  <>{(rawValue / 1000).toFixed(1)}k</>
                ) : (
                  <AnimatedNumber value={rawValue} />
                )
              ) : (
                displayValue
              )}
            </p>
            <p className="text-[11px] mt-1.5 text-[#767586]">{sub}</p>
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-[18px] transition-all duration-500 opacity-0 group-hover:opacity-100"
            style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
          />
        </div>
      ))}
    </section>
  );
}



