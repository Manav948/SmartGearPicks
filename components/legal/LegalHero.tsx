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
    <header className="border-b border-[#DDDCD3] bg-[#F6F4EF] py-12 md:py-16 text-[#22231F] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs mb-5 font-medium text-[#6B6B66]"
        >
          <Link href="/" className="hover:text-[#354538] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#DDDCD3]" />
          <span className="font-semibold text-[#22231F]">{title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#DDDCD3] bg-[#E5E9E0] text-xs font-semibold mb-3 text-[#354538]">
              <Icon className="w-3.5 h-3.5 text-[#B66F52]" />
              <span>{category}</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-[#22231F]">
              {title}
            </h1>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-[#6B6B66]">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#FFFFFF] border border-[#DDDCD3] px-4 py-2.5 rounded-md text-xs text-[#6B6B66] shadow-xs self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#B66F52] animate-pulse" />
            <span>
              Last Updated: <strong className="text-[#22231F]">{lastUpdated}</strong>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
