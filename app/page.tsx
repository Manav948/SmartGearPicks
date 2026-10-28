import React from "react";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import CurationProcess from "@/components/CurationProcess";
import NewArrivals from "@/components/NewArrivals";
import TopPicks from "@/components/TopPicks";
import CuratedProducts from "@/components/CuratedProducts";
import type { CategoryPreview } from "@/components/CuratedProducts";
import Footer from "@/components/Footer";
import { CATEGORY_MAP, type Product } from "@/components/ProductCard";
import PublicMotionProvider from "@/components/PublicMotionProvider";

export const revalidate = 0;

export default async function HomePage() {
  let newArrivals: Product[] = [];
  let topPicks: Product[] = [];
  let categoryPreviews: CategoryPreview[] = [];

  try {
    const [arrivals, picks, availableCategories] = await Promise.all([
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        take: 3,
        include: { productTags: { select: { tag: true } } },
      }),
      prisma.product.findMany({
        orderBy: [{ clicks: "desc" }, { createdAt: "desc" }],
        take: 4,
        include: { productTags: { select: { tag: true } } },
      }),
      prisma.product.findMany({ distinct: ["category"], select: { category: true } }),
    ]);

    newArrivals = arrivals;
    topPicks = picks;
    const categoryOrder = Object.keys(CATEGORY_MAP);
    availableCategories.sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a.category);
      const bIndex = categoryOrder.indexOf(b.category);
      if (aIndex === -1 && bIndex === -1) return a.category.localeCompare(b.category);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

    categoryPreviews = await Promise.all(availableCategories.map(async ({ category }) => ({
      category,
      products: await prisma.product.findMany({
        where: { category },
        orderBy: { createdAt: "desc" },
        take: 4,
        include: { productTags: { select: { tag: true } } },
      }),
    })));
  } catch (err) {
    console.error("[HomePage] Failed to fetch product previews:", err);
  }

  return (
    <PublicMotionProvider>
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9ff", color: "#0b1c30" }}>
      <Navbar />
      <Hero />
      <Brands />
      <CurationProcess />

      {newArrivals.length > 0 && <NewArrivals products={newArrivals} />}
      {topPicks.length > 0 && <TopPicks products={topPicks} />}

      <CuratedProducts categories={categoryPreviews} />

      <Footer />
    </div>
    </PublicMotionProvider>
  );
}
