import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getLegalIcon } from "./legalIcons";

interface LegalHeroProps {
  title: string;
  subtitle: string;
  category: string;
  lastUpdated: string;
  iconName?: string;
}

export function LegalHero({
  title,
  subtitle,
  category,
  lastUpdated,
  iconName = "shield",
}: LegalHeroProps) {
  const Icon = getLegalIcon(iconName);

  return (
    <header
      className="border-b py-12 md:py-16 relative"
      style={{
        backgroundColor: "#f8f9ff",
        color: "#0b1c30",
        borderColor: "rgba(199, 196, 215, 0.4)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-5 font-medium" style={{ color: "#767586" }}>
          <Link href="/" className="hover:text-[#4648d4] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold" style={{ color: "#0b1c30" }}>{title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 shadow-xs"
              style={{
                backgroundColor: "#eff4ff",
                borderColor: "rgba(199, 196, 215, 0.4)",
                color: "#4648d4",
              }}
            >
              <Icon className="w-3.5 h-3.5 text-[#4648d4]" />
              <span>{category}</span>
            </div>
            <h1
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
            >
              {title}
            </h1>
            <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: "#464554" }}>
              {subtitle}
            </p>
          </div>

          <div
            className="flex items-center gap-3 bg-white border px-4 py-2.5 rounded-xl text-xs shadow-xs self-start md:self-auto"
            style={{ borderColor: "rgba(199, 196, 215, 0.4)", color: "#464554" }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Last Updated: <strong style={{ color: "#0b1c30" }}>{lastUpdated}</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
}
