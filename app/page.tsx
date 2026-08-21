import React from "react";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import NewArrivals from "@/components/NewArrivals";
import TopPicks from "@/components/TopPicks";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

export const revalidate = 0;

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

  const newArrivals = products.slice(0, 3);
  const topPicks = [...products].sort((a, b) => b.clicks - a.clicks).slice(0, 4);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9ff", color: "#0b1c30" }}>
      <Navbar />
      <Hero />
      <Brands />

      {newArrivals.length > 0 && <NewArrivals products={newArrivals} />}
      {topPicks.length > 0 && <TopPicks products={topPicks} />}

      <main className="py-10 md:py-16 max-w-7xl mx-auto px-4 md:px-8" id="products">
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
        <ProductGrid initialProducts={products} />
      </main>

      <Footer />
    </div>
  );
}
