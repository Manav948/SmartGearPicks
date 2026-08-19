import React from "react";
import Link from "next/link";
import { ChevronRight, LucideIcon } from "lucide-react";

interface LegalHeroProps {
  title: string;
  subtitle: string;
  category: string;
  lastUpdated: string;
  icon: LucideIcon;
  badgeColor?: "indigo" | "purple" | "emerald";
}

export function LegalHero({
  title,
  subtitle,
  category,
  lastUpdated,
  icon: Icon,
  badgeColor = "indigo",
}: LegalHeroProps) {
  const colorStyles = {
    indigo: {
      badge: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
      icon: "text-indigo-400",
      accent: "text-indigo-400",
      glow: "bg-indigo-600/15",
      gradient: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(99,102,241,0.15), rgba(255,255,255,0))",
    },
    purple: {
      badge: "bg-purple-500/10 border-purple-500/20 text-purple-300",
      icon: "text-purple-400",
      accent: "text-purple-400",
      glow: "bg-purple-600/15",
      gradient: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(168,85,247,0.15), rgba(255,255,255,0))",
    },
    emerald: {
      badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
      icon: "text-emerald-400",
      accent: "text-emerald-400",
      glow: "bg-emerald-600/15",
      gradient: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(16,185,129,0.15), rgba(255,255,255,0))",
    },
  }[badgeColor];

  return (
    <header className="relative border-b border-zinc-800/80 bg-[#08080d] overflow-hidden py-14 md:py-20">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: colorStyles.gradient }} />
      <div className={`absolute top-0 right-1/4 w-96 h-96 ${colorStyles.glow} rounded-full blur-[130px] pointer-events-none`} />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-5 font-medium">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className={colorStyles.accent}>{title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${colorStyles.badge}`}>
              <Icon className={`w-3.5 h-3.5 ${colorStyles.icon}`} />
              <span>{category}</span>
            </div>
            <h1
              className="text-3xl md:text-5xl font-bold tracking-tight text-white"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              {title}
            </h1>
            <p className="mt-3 text-sm md:text-base text-zinc-400 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800/90 px-4 py-2.5 rounded-xl text-xs text-zinc-400 backdrop-blur-md self-start md:self-auto shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Last Updated: <strong className="text-zinc-200">{lastUpdated}</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
}
