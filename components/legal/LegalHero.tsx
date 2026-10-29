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
        backgroundColor: "#F7F6F2",
        color: "#151515",
        borderColor: "rgba(229, 225, 218, 0.4)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-5 font-medium" style={{ color: "#6B6B6B" }}>
          <Link href="/" className="hover:text-[#7c6853] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#817e75]" />
          <span className="font-semibold" style={{ color: "#151515" }}>{title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 shadow-xs"
              style={{
                backgroundColor: "#F0EDE7",
                borderColor: "rgba(229, 225, 218, 0.4)",
                color: "#7c6853",
              }}
            >
              <Icon className="w-3.5 h-3.5 text-[#7c6853]" />
              <span>{category}</span>
            </div>
            <h1
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "Geist, sans-serif", color: "#151515" }}
            >
              {title}
            </h1>
            <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: "#6B6B6B" }}>
              {subtitle}
            </p>
          </div>

          <div
            className="flex items-center gap-3 bg-[#FAF8F4] border px-4 py-2.5 rounded-xl text-xs shadow-xs self-start md:self-auto"
            style={{ borderColor: "rgba(229, 225, 218, 0.4)", color: "#6B6B6B" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#6b5845] animate-pulse" />
            <span>Last Updated: <strong style={{ color: "#151515" }}>{lastUpdated}</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
}
