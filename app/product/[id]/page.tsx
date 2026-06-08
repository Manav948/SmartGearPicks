import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import RatingSection from "./RatingSection";
import Footer from "@/components/Footer";
import SimilarProducts from "@/components/SimilarProducts";

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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product = null;
  let similarProducts: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    affiliateLink: string;
    category: string;
    price?: number | null;
  }[] = [];

  try {
    product = await prisma.product.findUnique({
      where: { id },
      include: { productTags: true },
    });

    if (product) {
      similarProducts = await prisma.product.findMany({
        where: {
          category: product.category,
          id: { not: id },
        },
        orderBy: { clicks: "desc" },
        take: 10,
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
          affiliateLink: true,
          category: true,
          price: true,
        },
      });
    }
  } catch {
    // DB not connected
  }

  if (!product) {
    notFound();
  }

  const categoryLabel = CATEGORY_MAP[product.category] || product.category;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9ff", color: "#0b1c30" }}>
      {/* ── Navbar ──────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(248,249,255,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(199,196,215,0.35)",
        }}
      >
        <div className="flex items-center gap-3 px-4 md:px-8 py-3 max-w-[1280px] mx-auto">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter mr-8 select-none"
            style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
          >
            SmartyGearPicks
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm transition-colors hover:text-[#4648d4]"
            style={{ color: "#767586", fontFamily: "Geist, sans-serif" }}
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              arrow_back
            </span>
            Back to All Products
          </Link>
        </div>
      </nav>

      {/* ── Breadcrumb ──────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 text-xs" style={{ color: "#767586", fontFamily: "Geist, sans-serif" }}>
          <Link href="/" className="hover:text-[#4648d4] transition-colors">Home</Link>
          <span>/</span>
          <span>{categoryLabel}</span>
          <span>/</span>
          <span className="truncate max-w-[200px]" style={{ color: "#0b1c30" }}>{product.name}</span>
        </div>
      </div>

      {/* ── Main Product Layout ──────────────────────── */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT — Large Image */}
          <div className="lg:sticky lg:top-24">
            <div
              className="relative rounded-2xl overflow-hidden border"
              style={{
                aspectRatio: "4/5",
                borderColor: "rgba(199,196,215,0.4)",
                backgroundColor: "#e5eeff",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />

              {/* Category badge overlay */}
              <div
                className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full"
                style={{
                  fontFamily: "Geist, sans-serif",
                  letterSpacing: "0.05em",
                  backgroundColor: "rgba(248,249,255,0.92)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  color: "#4648d4",
                  border: "1px solid rgba(199,196,215,0.4)",
                }}
              >
                {categoryLabel}
              </div>

              {/* Clicks badge */}
              <div
                className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{
                  fontFamily: "Geist, sans-serif",
                  backgroundColor: "rgba(248,249,255,0.92)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  color: "#0b1c30",
                  border: "1px solid rgba(199,196,215,0.4)",
                }}
              >
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1", color: "#4648d4" }}>
                  touch_app
                </span>
                {product.clicks} views
              </div>
            </div>

            {/* Tags */}
            {product.productTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.productTags.map((t) => (
                  <span
                    key={t.id}
                    className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                      fontFamily: "Geist, sans-serif",
                      letterSpacing: "0.05em",
                      backgroundColor: "rgba(70,72,212,0.08)",
                      color: "#4648d4",
                      border: "1px solid rgba(70,72,212,0.15)",
                    }}
                  >
                    {t.tag.replace(/_/g, " ")}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Product Details */}
          <div className="flex flex-col gap-8">
            {/* Category + Title */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{
                  fontFamily: "Geist, sans-serif",
                  color: "#767586",
                  letterSpacing: "0.08em",
                }}
              >
                {categoryLabel}
              </p>
              <h1
                className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug"
                style={{
                  fontFamily: "Geist, system-ui, sans-serif",
                  color: "#0b1c30",
                  letterSpacing: "-0.03em",
                }}
              >
                {product.name}
              </h1>

              {/* Curator badge */}
              <div
                className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-xs font-semibold border"
                style={{
                  fontFamily: "Geist, sans-serif",
                  backgroundColor: "rgba(70,72,212,0.06)",
                  color: "#4648d4",
                  borderColor: "rgba(70,72,212,0.18)",
                }}
              >
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                Curator&apos;s Pick — Handpicked &amp; Tested
              </div>

              {/* Price display */}
              {product.price != null && (
                <div
                  className="mt-5 flex items-baseline gap-3 px-5 py-4 rounded-2xl border"
                  style={{ backgroundColor: "#eff4ff", borderColor: "rgba(70,72,212,0.12)" }}
                >
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "Geist, sans-serif", color: "#767586", letterSpacing: "0.06em" }}
                  >
                    Price
                  </span>
                  <span
                    className="text-3xl font-bold tracking-tight"
                    style={{ fontFamily: "Geist, system-ui, sans-serif", color: "#0b1c30", letterSpacing: "-0.03em" }}
                  >
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t" style={{ borderColor: "rgba(199,196,215,0.4)" }} />

            {/* Description */}
            <div>
              <h2
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ fontFamily: "Geist, sans-serif", color: "#767586", letterSpacing: "0.08em" }}
              >
                Editorial Notes
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#464554", lineHeight: "1.7", letterSpacing: "-0.01em" }}
              >
                {product.description}
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-xl p-4 border"
                style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.35)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "Geist, sans-serif", color: "#767586", letterSpacing: "0.05em" }}>
                  Category
                </p>
                <p className="text-sm font-medium" style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}>
                  {categoryLabel}
                </p>
              </div>
              <div
                className="rounded-xl p-4 border"
                style={{ backgroundColor: "#ffffff", borderColor: "rgba(199,196,215,0.35)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "Geist, sans-serif", color: "#767586", letterSpacing: "0.05em" }}>
                  Total Views
                </p>
                <p className="text-sm font-medium" style={{ fontFamily: "Geist, sans-serif", color: "#4648d4" }}>
                  {product.clicks.toLocaleString()} clicks
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t" style={{ borderColor: "rgba(199,196,215,0.4)" }} />

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={`/api/redirect/${product.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-base font-medium transition-all active:scale-[0.98]"
                style={{
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  fontFamily: "Geist, sans-serif",
                  borderTop: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                }}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                  shopping_bag
                </span>
                View Deal & Buy Now
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                  arrow_outward
                </span>
              </a>

              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium border transition-all active:scale-[0.98]"
                style={{
                  backgroundColor: "transparent",
                  color: "#464554",
                  fontFamily: "Geist, sans-serif",
                  borderColor: "#c7c4d7",
                }}
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                  arrow_back
                </span>
                Browse More Products
              </Link>
            </div>

            {/* Trust indicators */}
            <div
              className="rounded-xl p-4 border flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 justify-between sm:justify-center"
              style={{ backgroundColor: "#eff4ff", borderColor: "rgba(199,196,215,0.3)" }}
            >
              {[
                { icon: "verified_user", label: "Verified Affiliate" },
                { icon: "local_shipping", label: "Direct to Store" },
                { icon: "thumb_up", label: "Curator Approved" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 justify-center whitespace-nowrap">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ color: "#4648d4", fontVariationSettings: "'FILL' 1" }}
                  >
                    {icon}
                  </span>
                  <span className="text-xs font-medium" style={{ color: "#464554", fontFamily: "Geist, sans-serif" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t" style={{ borderColor: "rgba(199,196,215,0.4)" }} />

            {/* Rating Section (Client Component) */}
            <RatingSection productId={product.id} />
          </div>
        </div>
      </main>

      {/* ── Similar Products ────────────────────────── */}
      {similarProducts.length > 0 && (
        <section
          className="max-w-[1280px] mx-auto px-4 md:px-8 pb-16"
        >
          <div
            className="border-t pt-10"
            style={{ borderColor: "rgba(199,196,215,0.4)" }}
          >
            <SimilarProducts
              products={similarProducts}
              currentProductId={id}
            />
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
