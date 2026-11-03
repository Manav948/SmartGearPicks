import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { CATEGORY_MAP, Product } from "@/components/ProductCard";
import PublicMotionProvider from "@/components/PublicMotionProvider";

export const revalidate = 0;

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  FASHION: "Durable accessories, leather goods, and refined everyday pieces chosen for craftsmanship and longevity.",
  ELECTRONICS: "Personal audio, charging hubs, and mobile tech accessories selected for reliability and performance.",
  OFFICE_PRODUCTIVITY: "Desk organization, mechanical keyboards, ergonomic accessories, and tools built for daily focus.",
  CREATOR_ESSENTIALS: "Studio lighting, optical equipment, microphones, and creative desk accessories.",
  TRAVEL: "Durable luggage, packing organizers, and portable everyday carry gear for short and long journeys.",
  HOME_KITCHEN: "Practical kitchen tools, drinkware, and functional home goods designed to last.",
  SPORTS_OUTDOORS: "Active accessories, hydration gear, and outdoor essentials built for everyday movement.",
  HEALTH_FITNESS: "Recovery tools, movement equipment, and wellness gear selected for practical daily utility.",
  BEAUTY_PERSONAL_CARE: "Thoughtful grooming tools and personal care essentials with clean formulations.",
  GAMING: "Desk peripherals, ergonomic controllers, and gaming audio equipment for workspace and play.",
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; q?: string | string[] }>;
}): Promise<Metadata> {
  const query = await searchParams;
  const requestedCategory = Array.isArray(query.category) ? query.category[0] : query.category;
  const categoryName = requestedCategory ? CATEGORY_MAP[requestedCategory] || requestedCategory : null;

  return {
    title: categoryName ? `${categoryName} – Curated Gear Index` : "Product Catalog – Curated Gear & Everyday Tools",
    description: categoryName
      ? `Explore curated recommendations in ${categoryName}. Evaluated gear with direct retailer pricing and specifications.`
      : "Browse the complete SmartGearPicks product catalog across workspace essentials, technology, audio, lifestyle, and everyday gear.",
    alternates: {
      canonical: requestedCategory ? `/catalog?category=${encodeURIComponent(requestedCategory)}` : "/catalog",
    },
    openGraph: {
      title: categoryName ? `${categoryName} | SmartGearPicks` : "Product Catalog | SmartGearPicks",
      description: categoryName
        ? `Explore curated recommendations in ${categoryName} on SmartGearPicks.`
        : "Browse the complete curated product catalog on SmartGearPicks.",
      url: requestedCategory ? `/catalog?category=${encodeURIComponent(requestedCategory)}` : "/catalog",
    },
  };
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; q?: string | string[] }>;
}) {
  const query = await searchParams;
  const requestedCategory = Array.isArray(query.category) ? query.category[0] : query.category;
  const requestedSearch = Array.isArray(query.q) ? query.q[0] : query.q;
  let products: Product[] = [];

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { productTags: { select: { tag: true } } },
    });
  } catch (error) {
    console.error("[CatalogPage] Failed to fetch products:", error);
  }

  const categories = new Set(products.map((product) => product.category));
  const initialCategory = requestedCategory && categories.has(requestedCategory) ? requestedCategory : null;
  const categoryLabel = initialCategory ? CATEGORY_MAP[initialCategory] || initialCategory : null;
  const categoryDesc = initialCategory ? CATEGORY_DESCRIPTIONS[initialCategory] : null;

  return (
    <PublicMotionProvider>
      <div className="min-h-screen bg-[#F6F4EF] text-[#22231F]">
        <Navbar />
        <main id="products" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B66F52]">
            Curated Index
          </p>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#DDDCD3] pb-6">
            <div>
              <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl text-[#22231F]">
                {categoryLabel ? categoryLabel : "Explore All Products"}
              </h1>
              <p className="mt-2 text-sm text-[#6B6B66] max-w-2xl leading-relaxed">
                {categoryDesc ||
                  "Browse our independent catalog of everyday gear, technology, and lifestyle essentials selected for utility and design."}
              </p>
            </div>
            {categoryLabel && (
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#E5E9E0] text-[#354538] border border-[#DDDCD3]">
                Category: {categoryLabel}
              </span>
            )}
          </div>
          <ProductGrid
            key={`${initialCategory || "all"}:${requestedSearch || ""}`}
            initialProducts={products}
            initialCategory={initialCategory}
            initialSearch={requestedSearch || ""}
          />
        </main>
        <Footer />
      </div>
    </PublicMotionProvider>
  );
}
