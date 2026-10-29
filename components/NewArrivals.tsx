import CircularGallery from "@/components/CircularGallery";
import type { Product } from "@/components/ProductCard";

interface NewArrivalsProps {
  products: Product[];
}

export default function NewArrivals({ products }: NewArrivalsProps) {
  if (products.length === 0) return null;

  const galleryItems = products
    .filter((product) => Boolean(product.imageUrl))
    .map((product) => ({
      image: product.imageUrl,
      text: product.name,
      description: product.description,
      alt: product.name,
    }));

  if (galleryItems.length === 0) return null;

  return (
    <section
      id="new-arrivals"
      aria-labelledby="new-arrivals-heading"
      className="overflow-hidden py-12 md:py-16"
      style={{ backgroundColor: "#f8f9ff", color: "#0b1c30" }}
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="mb-2 text-center">
          <span className="inline-flex items-center rounded-full border border-indigo-200/70 bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#4648d4]">
            Fresh Finds
          </span>
          <h2
            id="new-arrivals-heading"
            className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl"
            style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.03em" }}
          >
            New Arrivals
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#464554] md:text-base">
            Take a look at the latest products added to our collection.
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-4 h-[420px] w-full md:mt-6 md:h-[560px]">
        <CircularGallery
          items={galleryItems}
          bend={2.5}
          textColor="#0b1c30"
          borderRadius={0.06}
          scrollEase={0.075}
          itemSize={0.9}
          itemAspect={0.76}
          gap={0.3}
          wave={0.65}
          fadeEdges={0.1}
          shadow={0.18}
          scrollSpeed={1.6}
          autoScroll={0}
          snap
          grayscale={false}
          showTitles
          openOnClick
          intro
          aria-label="Browse newly added products"
        />
      </div>
    </section>
  );
}
