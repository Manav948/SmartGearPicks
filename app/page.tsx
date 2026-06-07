import React from "react";
import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

// Disable page cache to fetch latest products
export const revalidate = 0;

export default async function HomePage() {
  let products: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    affiliateLink: string;
    category: string;
    productTags?: { tag: string }[];
  }[] = [];

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        affiliateLink: true,
        category: true,
        productTags: {
          select: {
            tag: true,
          },
        },
      },
    });
  } catch {
    // DATABASE_URL not configured — render empty state gracefully
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9ff", color: "#0b1c30" }}>
      {/* ── Top Navigation ─────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(248, 249, 255, 0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(199, 196, 215, 0.35)",
        }}
      >
        <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-[1280px] mx-auto w-full">
          {/* Logo */}
          <div
            className="text-2xl font-bold tracking-tighter flex-shrink-0 mr-8 select-none"
            style={{ fontFamily: "Geist, system-ui, sans-serif", color: "#0b1c30" }}
          >
            SmartyGearPicks
          </div>

          {/* Nav links */}
          <div className="hidden md:flex flex-1 items-center gap-1">
            <a
              href="#"
              className="text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
              style={{ color: "#4648d4", borderBottom: "2px solid #4648d4", fontFamily: "Geist, sans-serif" }}
            >
              Discover
            </a>
            {["New Arrivals", "Trending", "Collections"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#eff4ff]"
                style={{ color: "#464554", fontFamily: "Geist, sans-serif" }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div
              className="hidden md:flex items-center px-4 py-2 rounded-full border w-64 transition-colors focus-within:border-[#4648d4]"
              style={{
                backgroundColor: "#eff4ff",
                borderColor: "rgba(199, 196, 215, 0.4)",
              }}
            >
              <span
                className="material-symbols-outlined mr-2 text-[20px] select-none"
                style={{ color: "#767586", fontVariationSettings: "'FILL' 0" }}
              >
                search
              </span>
              <input
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#767586]"
                placeholder="Search curated products..."
                type="text"
                style={{ color: "#0b1c30" }}
              />
            </div>

            <a
              href="/login"
              className="text-sm px-3 py-2 hidden sm:block transition-colors hover:text-[#4648d4]"
              style={{ color: "#464554", fontFamily: "Geist, sans-serif", fontWeight: 500 }}
            >
              Admin
            </a>

            <a
              href="#products"
              className="text-sm px-5 py-2.5 rounded-lg transition-all active:scale-95 shadow-sm"
              style={{
                backgroundColor: "#0f172a",
                color: "#ffffff",
                fontFamily: "Geist, sans-serif",
                fontWeight: 500,
                borderTop: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              Explore
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ───────────────────────────────── */}
      <header className="relative pt-10 md:pt-20 pb-16 md:pb-28 px-4 md:px-8 overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left column */}
          <div className="lg:col-span-6 z-10 space-y-8">
            {/* Badge */}
            <div
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border tracking-wider uppercase"
              style={{
                backgroundColor: "rgba(70,72,212,0.08)",
                color: "#4648d4",
                borderColor: "rgba(70,72,212,0.2)",
                fontFamily: "Geist, sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              <span
                className="material-symbols-outlined text-[16px] mr-1.5"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              Curated Excellence
            </div>

            {/* Headline */}
            <h1
              className="text-balance leading-[1.05] tracking-tight"
              style={{
                fontFamily: "Geist, system-ui, sans-serif",
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: "#0b1c30",
              }}
            >
              Handpicked Products Worth Buying
            </h1>

            <p className="text-lg leading-relaxed max-w-lg" style={{ color: "#464554", letterSpacing: "-0.01em" }}>
              Skip the endless scrolling and confusing reviews. We discover, test, and curate only the exceptional
              tools, lifestyle objects, and tech that elevate your daily routine.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#products"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-sm font-medium transition-all active:scale-95 shadow-sm"
                style={{
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  fontFamily: "Geist, sans-serif",
                  borderTop: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                Explore Collection
              </a>
              <button
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-sm font-medium border transition-all active:scale-95"
                style={{
                  backgroundColor: "#f8f9ff",
                  color: "#0b1c30",
                  borderColor: "#c7c4d7",
                  fontFamily: "Geist, sans-serif",
                }}
              >
                Our Curation Process
              </button>
            </div>
          </div>

          {/* Right column — hero image */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0">
            <div
              className="absolute inset-0 rounded-[40px] transform rotate-3 scale-105 -z-10"
              style={{ backgroundColor: "rgba(70,72,212,0.05)" }}
            />
            <div
              className="relative rounded-[32px] overflow-hidden border aspect-[4/5] md:aspect-auto md:h-[580px] w-full group shadow-2xl"
              style={{
                borderColor: "rgba(199,196,215,0.25)",
                boxShadow: "0 25px 50px -12px rgba(70,72,212,0.12)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero.png"
                alt="Workspace Essentials"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/40 via-black/10 to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase px-2 py-1 rounded"
                    style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#fff", fontFamily: "Geist, sans-serif" }}
                  >
                    Workspace Essentials
                  </span>
                </div>
                <h3 className="text-white text-xl font-semibold" style={{ fontFamily: "Geist, sans-serif" }}>
                  Curated For Excellence
                </h3>
                <p className="text-white/80 text-sm mt-1">Discover our editor&apos;s top picks</p>
              </div>

              {/* Floating Editor's Choice badge */}
              <div
                className="absolute bottom-8 left-8 p-4 rounded-xl flex items-center gap-3 max-w-[240px]"
                style={{
                  background: "rgba(248,249,255,0.82)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(199,196,215,0.4)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: "#4648d4" }}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
                  >
                    Editor&apos;s Choice
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: "#464554" }}>
                    Handpicked Excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Trust / Brands Strip ───────────────────────── */}
      <section
        className="py-8 border-y"
        style={{
          backgroundColor: "rgba(239,244,255,0.5)",
          borderColor: "rgba(199,196,215,0.3)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col items-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ color: "#767586", fontFamily: "Geist, sans-serif", letterSpacing: "0.08em" }}
          >
            Trusted by creators at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 opacity-50 grayscale">
            {["LINEAR", "NOTION", "FIGMA", "RAYCAST", "STRIPE"].map((brand) => (
              <span
                key={brand}
                className="text-xl font-bold tracking-tighter"
                style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Product Section ────────────────────────── */}
      <main className="py-10 md:py-16 max-w-[1280px] mx-auto px-4 md:px-8" id="products">
        {/* Section header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2
              className="text-2xl font-medium tracking-tight"
              style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.02em" }}
            >
              Curated Products
            </h2>
            <p className="mt-1 text-sm" style={{ color: "#464554" }}>
              Every pick is tested and verified by our editorial team.
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid initialProducts={products} />
      </main>

      <Footer />
    </div>
  );
}
