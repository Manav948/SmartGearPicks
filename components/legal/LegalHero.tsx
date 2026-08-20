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
    <header className="border-b border-zinc-200 bg-white text-zinc-900 py-14 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-5 font-medium">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-900 font-semibold">{title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 bg-zinc-100 text-zinc-900 text-xs font-semibold mb-3">
              <Icon className="w-3.5 h-3.5 text-zinc-900" />
              <span>{category}</span>
            </div>
            <h1
              className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              {title}
            </h1>
            <p className="mt-3 text-sm md:text-base text-zinc-600 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-zinc-200 px-4 py-2.5 rounded-xl text-xs text-zinc-600 shadow-sm self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Last Updated: <strong className="text-zinc-900">{lastUpdated}</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
}
