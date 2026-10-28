import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { CATEGORY_MAP, Product } from "@/components/ProductCard";
import PublicMotionProvider from "@/components/PublicMotionProvider";

export const revalidate = 0;

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

  return (
    <PublicMotionProvider>
    <div className="min-h-screen bg-[#F7F6F2] text-[#151515]">
      <Navbar />
      <main id="products" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b5845]">The Collection</p>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#E5E1DA] pb-6">
          <div>
            <h1 className="font-display text-3xl font-medium tracking-[-0.04em] sm:text-4xl">Explore all products</h1>
            <p className="mt-2 text-sm text-[#6B6B6B]">Browse the complete collection by category.</p>
          </div>
          {initialCategory && (
            <p className="text-sm text-[#6B6B6B]">Showing {CATEGORY_MAP[initialCategory] || initialCategory}</p>
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
