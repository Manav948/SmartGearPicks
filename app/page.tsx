import React from "react";
import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

// Disable page cache to fetch latest products
export const revalidate = 0;

const CATEGORY_MAP: Record<string, string> = {
  ELECTRONICS: "Electronics",
  FASHION: "Fashion",
  BEAUTY_PERSONAL_CARE: "Beauty & Care",
  HEALTH_FITNESS: "Health & Fitness",
  BOOKS_EDUCATION: "Books & Education",
  HOME_KITCHEN: "Home & Kitchen",
  GAMING: "Gaming",
  SPORTS_OUTDOORS: "Sports & Outdoors",
  TOYS_KIDS: "Toys & Kids",
  AUTOMOTIVE: "Automotive",
  OFFICE_PRODUCTIVITY: "Office & Productivity",
  PET_SUPPLIES: "Pet Supplies",
  FOOD_BEVERAGES: "Food & Beverages",
  GIFT_CATEGORIES: "Gifts",
  TRAVEL: "Travel",
  CREATOR_ESSENTIALS: "Creator Gear",
};

export default async function HomePage() {
  let products: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    affiliateLink: string;
    category: string;
    price: number | null;
    clicks: number;
    createdAt: Date;
    productTags: { tag: string }[];
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
        price: true,
        clicks: true,
        createdAt: true,
        productTags: {
          select: {
            tag: true,
          },
        },
      },
    });
  } catch (err) {
    console.error("[HomePage] Failed to fetch products:", err);
  }

  // New Arrivals — latest 3
  const newArrivals = products.slice(0, 3);
  // Top Picks — most clicked, next 4
  const topPicks = [...products].sort((a, b) => b.clicks - a.clicks).slice(0, 4);

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
            SmartGearPicks
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
            <a
              href="#new-arrivals"
              className="text-sm px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#eff4ff]"
              style={{ color: "#464554", fontFamily: "Geist, sans-serif" }}
            >
              New Arrivals
            </a>
            <a
              href="#trending"
              className="text-sm px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#eff4ff]"
              style={{ color: "#464554", fontFamily: "Geist, sans-serif" }}
            >
              Trending
            </a>
            <a
              href="#products"
              className="text-sm px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#eff4ff]"
              style={{ color: "#464554", fontFamily: "Geist, sans-serif" }}
            >
              Curated Catalog
            </a>
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

      {/* ── New Arrivals — Magazine Layout ──────────────── */}
      {newArrivals.length > 0 && (
        <section className="py-12 md:py-20 max-w-[1280px] mx-auto px-4 md:px-8 border-b" id="new-arrivals" style={{ borderColor: "rgba(199,196,215,0.3)" }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3"
                style={{
                  backgroundColor: "rgba(70,72,212,0.08)",
                  color: "#4648d4",
                  border: "1px solid rgba(70,72,212,0.15)",
                }}
              >
                Fresh Finds
              </div>
              <h2
                className="text-3xl font-semibold tracking-tight"
                style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.03em" }}
              >
                New Arrivals
              </h2>
              <p className="text-sm mt-1.5" style={{ color: "#464554" }}>
                The latest handpicked curations added to our library.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[440px]">
            {/* Large featured card */}
            {newArrivals[0] && (
              <Link
                href={`/product/${newArrivals[0].id}`}
                className="relative rounded-2xl overflow-hidden group block h-[340px] md:h-full shadow-md border hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5"
                style={{ borderColor: "rgba(199,196,215,0.35)" }}
              >
                <Image
                  src={newArrivals[0].imageUrl}
                  alt={newArrivals[0].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  unoptimized
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 85%)" }} />
                {/* Category chip */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4">
                  <span
                    className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2 md:px-2.5 py-0.5 md:py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.3)",
                      letterSpacing: "0.08em"
                    }}
                  >
                    {CATEGORY_MAP[newArrivals[0].category] || newArrivals[0].category}
                  </span>
                </div>
                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col justify-end">
                  <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-snug mb-1 md:mb-1.5" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.02em" }}>
                    {newArrivals[0].name}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm line-clamp-2 mb-3 md:mb-4 max-w-lg" style={{ lineHeight: "1.5" }}>
                    {newArrivals[0].description}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    {newArrivals[0].price != null && (
                      <p className="text-white font-bold text-base md:text-xl" style={{ letterSpacing: "-0.02em" }}>
                        ₹{newArrivals[0].price.toLocaleString("en-IN")}
                      </p>
                    )}
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1.5 md:px-4.5 md:py-2.5 rounded-lg text-xs font-semibold transition-all group-hover:bg-[#4648d4] group-hover:text-white"
                      style={{ backgroundColor: "#ffffff", color: "#0b1c30", fontFamily: "Geist, sans-serif" }}
                    >
                      Explore Pick
                      <span className="text-[14px]">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Two stacked small cards */}
            <div className="flex flex-col gap-4 md:gap-5 h-auto md:h-full justify-between">
              {newArrivals.slice(1, 3).map((product: any) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="relative rounded-2xl overflow-hidden group block h-[180px] sm:h-[200px] md:h-[210px] shadow-md border hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5"
                  style={{ borderColor: "rgba(199,196,215,0.35)" }}
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    unoptimized
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 90%)" }} />
                  {/* Category chip */}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 md:py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.3)",
                        letterSpacing: "0.08em"
                      }}
                    >
                      {CATEGORY_MAP[product.category] || product.category}
                    </span>
                  </div>
                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <h3 className="text-white font-bold text-base md:text-lg leading-snug mb-1" style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.015em" }}>
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between gap-4">
                      {product.price != null && (
                        <p className="text-white/90 text-xs md:text-sm font-semibold">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                      )}
                      <span className="text-white/80 text-xs font-semibold group-hover:text-white transition-colors flex items-center gap-1">
                        View Details <span className="text-[13px]">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Top Picks — Trending Collection ──────────────── */}
      {topPicks.length > 0 && (
        <section className="py-12 md:py-20 max-w-[1280px] mx-auto px-4 md:px-8 border-b" id="trending" style={{ borderColor: "rgba(199,196,215,0.3)" }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3"
                style={{
                  backgroundColor: "rgba(11,122,94,0.08)",
                  color: "#0b7a5e",
                  border: "1px solid rgba(11,122,94,0.15)",
                }}
              >
                Popular Choice
              </div>
              <h2
                className="text-3xl font-semibold tracking-tight"
                style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30", letterSpacing: "-0.03em" }}
              >
                Top Picks
              </h2>
              <p className="text-sm mt-1.5" style={{ color: "#464554" }}>
                Our community&apos;s most viewed and requested curations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topPicks.map((product) => {
              const categoryLabel = CATEGORY_MAP[product.category] || product.category;
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#4648d4]/30"
                  style={{
                    borderColor: "rgba(199,196,215,0.35)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Image wrapper */}
                  <Link
                    href={`/product/${product.id}`}
                    className="relative block overflow-hidden flex-shrink-0"
                    style={{ height: "240px", backgroundColor: "#f0f0f5" }}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      unoptimized
                    />

                    {/* Popular Clicks badge */}
                    {product.clicks > 0 && (
                      <div
                        className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.94)",
                          backdropFilter: "blur(6px)",
                          color: "#4648d4",
                          border: "1px solid rgba(70,72,212,0.15)",
                        }}
                      >
                        <span className="material-symbols-outlined text-[12px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                          trending_up
                        </span>
                        <span>{product.clicks} views</span>
                      </div>
                    )}
                  </Link>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-4 gap-2">
                    <div>
                      <span
                        className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "rgba(70,72,212,0.07)",
                          color: "#4648d4",
                          letterSpacing: "0.05em",
                          border: "1px solid rgba(70,72,212,0.14)",
                        }}
                      >
                        {categoryLabel}
                      </span>
                    </div>

                    <Link href={`/product/${product.id}`}>
                      <h3
                        className="font-semibold leading-snug line-clamp-1 group-hover:text-[#4648d4] transition-colors"
                        style={{
                          fontFamily: "Geist, system-ui, sans-serif",
                          fontSize: "14px",
                          color: "#0d0d14",
                          letterSpacing: "-0.015em",
                        }}
                      >
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: "#767586" }}>
                      {product.description}
                    </p>

                    {product.price != null && (
                      <p
                        className="font-bold text-[15px]"
                        style={{
                          fontFamily: "Geist, sans-serif",
                          color: "#0d0d14",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

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
