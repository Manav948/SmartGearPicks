import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ProductNavbar from "@/components/ProductNavbar";
import ProductBreadcrumb from "@/components/ProductBreadcrumb";
import ProductDetailsLeft from "@/components/ProductDetailsLeft";
import ProductDetailsRight from "@/components/ProductDetailsRight";
import SimilarProducts from "@/components/SimilarProducts";
import Footer from "@/components/Footer";
import { CATEGORY_MAP } from "@/components/ProductCard";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      return {
        title: "Product Not Found | SmartGearPicks",
      };
    }
    return {
      title: `${product.name} – SmartGearPicks`,
      description: product.description.substring(0, 160),
      openGraph: {
        title: `${product.name} | SmartGearPicks`,
        description: product.description.substring(0, 155),
        images: [
          {
            url: product.imageUrl,
            alt: product.name,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} | SmartGearPicks`,
        description: product.description.substring(0, 155),
        images: [product.imageUrl],
      },
    };
  } catch (error) {
    return {
      title: "SmartGearPicks",
    };
  }
}

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
      <ProductNavbar />
      <ProductBreadcrumb categoryLabel={categoryLabel} productName={product.name} />

      <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <ProductDetailsLeft
            imageUrl={product.imageUrl}
            name={product.name}
            clicks={product.clicks}
            categoryLabel={categoryLabel}
            productTags={product.productTags}
          />
          <ProductDetailsRight
            id={product.id}
            name={product.name}
            description={product.description}
            categoryLabel={categoryLabel}
            price={product.price}
            clicks={product.clicks}
          />
        </div>
      </main>

      {similarProducts.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-4 md:px-8 pb-16">
          <div className="border-t pt-10" style={{ borderColor: "rgba(199,196,215,0.4)" }}>
            <SimilarProducts products={similarProducts} currentProductId={id} />
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
