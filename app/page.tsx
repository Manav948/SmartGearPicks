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
import DriftWall from "@/components/ui/DriftWall";

export const revalidate = 0;

export default async function HomePage() {
  let newArrivals: Product[] = [];
  let topPicks: Product[] = [];
  let categoryPreviews: CategoryPreview[] = [];
  let wallProducts: { id: string; imageUrl: string; name: string }[] = [];

  try {
    const [arrivals, picks, availableCategories, wallItems] = await Promise.all([
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        take: 12,
        include: { productTags: { select: { tag: true } } },
      }),
      prisma.product.findMany({
        orderBy: [{ clicks: "desc" }, { createdAt: "desc" }],
        take: 4,
        include: { productTags: { select: { tag: true } } },
      }),
      prisma.product.findMany({ distinct: ["category"], select: { category: true } }),
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        take: 36,
        select: { id: true, imageUrl: true, name: true },
      }),
    ]);

    newArrivals = arrivals;
    topPicks = picks;
    wallProducts = wallItems;
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

  const usedImages = new Set<string>();
  const items = wallProducts.flatMap((product) => {
    if (!product.imageUrl || usedImages.has(product.imageUrl)) return [];
    usedImages.add(product.imageUrl);
    return [{ image: product.imageUrl, title: product.name, href: `/product/${product.id}` }];
  });

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
        {items.length > 0 && (
          <section
            aria-label="Moving wall of products from the collection"
            data-scroll-reveal className="h-[100svh] min-h-[520px] w-full overflow-hidden bg-[#eef0ff]"
          >
            <div data-scroll-reveal-item className="h-full w-full md:hidden">
              <DriftWall
                items={items}
                columns={Math.min(4, items.length)}
                tileWidth={136}
                tileHeight={184}
                gap={12}
                radius={7}
                tilt={7}
                turn={-6}
                perspective={1000}
                depth={64}
                speed={16}
                variance={0.14}
                parallax={0.2}
                pauseOnHover
                lift={30}
                fade={0.96}
                dim={0.96}
                overlayOpacity={0.12}
                overlayColor="#4648d4"
                className="h-full w-full"
              />
            </div>
            <div data-scroll-reveal-item className="hidden h-full w-full md:block">
              <DriftWall
                items={items}
                columns={Math.min(6, items.length)}
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
                overlayColor="#4648d4"
                className="h-full w-full"
              />
            </div>
          </section>
        )}
        <Footer />
      </div>
    </PublicMotionProvider>
  );
}




