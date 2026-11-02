import React from "react";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustValueStrip from "@/components/TrustValueStrip";
import BrandIntroduction from "@/components/BrandIntroduction";
import ShopByCategory from "@/components/ShopByCategory";
import NewArrivals from "@/components/NewArrivals";
import TopPicks from "@/components/TopPicks";
import CuratedProducts from "@/components/CuratedProducts";
import type { CategoryPreview } from "@/components/CuratedProducts";
import EditorialDiscoveryBanner from "@/components/EditorialDiscoveryBanner";
import CurationProcess from "@/components/CurationProcess";
import FAQSection from "@/components/FAQSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import { CATEGORY_MAP, type Product } from "@/components/ProductCard";
import PublicMotionProvider from "@/components/PublicMotionProvider";
import DriftWall from "@/components/ui/DriftWall";

export const revalidate = 0;

export default async function HomePage() {
  let allProducts: Product[] = [];
  let availableCategories: { category: string; count: number; imageUrl?: string }[] = [];
  let categoryPreviews: CategoryPreview[] = [];

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { productTags: { select: { tag: true } } },
    });
    allProducts = products;

    // Aggregate unique categories with counts and primary image
    const categoryCountMap = new Map<string, { count: number; imageUrl?: string }>();
    for (const prod of products) {
      const existing = categoryCountMap.get(prod.category);
      if (existing) {
        existing.count += 1;
      } else {
        categoryCountMap.set(prod.category, { count: 1, imageUrl: prod.imageUrl });
      }
    }

    const categoryOrder = Object.keys(CATEGORY_MAP);
    availableCategories = Array.from(categoryCountMap.entries())
      .map(([category, info]) => ({
        category,
        count: info.count,
        imageUrl: info.imageUrl,
      }))
      .sort((a, b) => {
        const aIndex = categoryOrder.indexOf(a.category);
        const bIndex = categoryOrder.indexOf(b.category);
        if (aIndex === -1 && bIndex === -1) return a.category.localeCompare(b.category);
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });

    categoryPreviews = availableCategories.map(({ category }) => ({
      category,
      products: allProducts.filter((p) => p.category === category).slice(0, 4),
    }));
  } catch (err) {
    console.error("[HomePage] Failed to fetch product data:", err);
  }

  // Derive New Arrivals and Top Picks
  const newArrivals = allProducts.slice(0, 8);
  const topPicks = [...allProducts]
    .sort((a, b) => (b.clicks ?? 0) - (a.clicks ?? 0))
    .slice(0, 4);
  const seenImages = new Set<string>();
  const wallItems = allProducts.flatMap((product) => {
    if (!product.imageUrl || seenImages.has(product.imageUrl)) return [];
    seenImages.add(product.imageUrl);
    return [{ image: product.imageUrl, title: product.name, href: `/product/${product.id}` }];
  }).slice(0, 36);

  return (
    <PublicMotionProvider>
      <div className="min-h-screen bg-[#F6F4EF] text-[#22231F] selection:bg-[#E5E9E0]">
        {/* 1. Navbar */}
        <Navbar />

        {/* 2. Hero — Full-screen sticky parallax transformation */}
        <Hero />

        {/* 3. Trust and Value Strip */}
        <TrustValueStrip />

        {/* 4. Brand Introduction */}
        <BrandIntroduction />

        {/* 5. Shop by Category */}
        {availableCategories.length > 0 && (
          <ShopByCategory categories={availableCategories} />
        )}

        {/* 6. New Arrivals */}
        {newArrivals.length > 0 && (
          <NewArrivals products={newArrivals} />
        )}

        {/* 7. Top Recommendations */}
        {topPicks.length > 0 && (
          <TopPicks products={topPicks} />
        )}

        {/* 8. Curated Products */}
        {categoryPreviews.length > 0 && (
          <CuratedProducts categories={categoryPreviews} />
        )}

        {wallItems.length > 0 && (
          <section
            aria-label="Browse products from the collection"
            data-scroll-reveal
            className="h-[75svh] min-h-[480px] w-full overflow-hidden border-b border-[#DDDCD3] bg-[#F6F4EF]"
          >
            <DriftWall
              items={wallItems}
              columns={Math.min(6, wallItems.length)}
              tileWidth={188}
              tileHeight={246}
              gap={14}
              radius={8}
              tilt={9}
              turn={-8}
              perspective={1100}
              depth={90}
              speed={20}
              variance={0.18}
              parallax={0.28}
              pauseOnHover
              lift={38}
              fade={0.96}
              dim={0.96}
              overlayOpacity={0.12}
              overlayColor="#7c6853"
              className="h-full w-full"
            />
          </section>
        )}

        {/* 9. Editorial Discovery Banner */}
        <EditorialDiscoveryBanner />

        {/* 10. How We Curate */}
        <CurationProcess />

        {/* 11. FAQ Section */}
        <FAQSection />

        {/* 12. Newsletter */}
        <NewsletterSection />

        {/* 13. Footer */}
        <Footer />
      </div>
    </PublicMotionProvider>
  );
}
