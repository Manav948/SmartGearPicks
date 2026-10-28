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
import Link from "next/link";
import DriftWall from "@/components/ui/DriftWall";
import type { DriftWallItem } from "@/components/ui/DriftWall";

export const revalidate = 0;

export default async function HomePage() {
  let newArrivals: Product[] = [];
  let topPicks: Product[] = [];
  let categoryPreviews: CategoryPreview[] = [];
  let driftWallItems: DriftWallItem[] = [];

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
    driftWallItems = categoryPreviews.flatMap(({ products }) => {
      const product = products[0];
      return product
        ? [{ image: product.imageUrl, title: product.name, href: `/product/${product.id}` }]
        : [];
    });
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

      {driftWallItems.length > 0 && (
        <section data-scroll-reveal className="overflow-hidden border-b border-[#E5E1DA] bg-[#F7F6F2]">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 md:gap-12 md:py-20 lg:grid-cols-2 lg:px-8">
            <div data-scroll-reveal-item className="relative h-[380px] overflow-hidden sm:h-[480px] lg:h-[520px]">
              <DriftWall
                items={driftWallItems}
                columns={3}
                tileWidth={140}
                tileHeight={180}
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
                fade={0.38}
                dim={0.62}
                overlayColor="#211d18"
                className="h-full"
              />
            </div>
            <div data-scroll-reveal-item className="max-w-xl lg:justify-self-end">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b5845]">The Collection, In Motion</p>
              <h2 className="font-display text-3xl font-medium leading-tight tracking-[-0.04em] text-[#151515] sm:text-4xl">
                Objects worth a closer look.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[#6B6B6B] sm:text-base">
                A moving view of products from across the collection. Select an image to open its product details.
              </p>
              <Link
                href="/catalog"
                className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[#a99a86] text-sm font-medium text-[#332b23] transition-colors hover:border-[#151515] hover:text-[#151515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#625e54]"
              >
                Explore the collection <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
    </PublicMotionProvider>
  );
}
