"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CATEGORY_MAP, Product } from "@/components/ProductCard";
import RecommendationProductCard from "@/components/RecommendationProductCard";

export interface CategoryPreview {
  category: string;
  products: Product[];
}

export default function CuratedProducts({ categories }: { categories: CategoryPreview[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="products" className="border-b border-[#E5E1DA] bg-[#F7F6F2]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b5845]">The Collection</p>
            <h2 className="font-display text-3xl font-medium tracking-[-0.04em] text-[#151515] sm:text-4xl">
              Curated Products
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B6B6B]">
              Explore thoughtful picks across categories, selected to make discovery easier.
            </p>
          </div>
          <Link
            href="/catalog"
            className="inline-flex min-h-10 w-fit items-center gap-2 border-b border-[#a99a86] pb-1 text-sm font-medium text-[#332b23] transition-colors hover:border-[#151515] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#625e54]"
          >
            Explore All <span aria-hidden="true">↗</span>
          </Link>
        </motion.header>

        {categories.length === 0 ? (
          <p className="border-t border-[#E5E1DA] py-8 text-sm text-[#6B6B6B]">No products are available yet. Please check back soon.</p>
        ) : (
          <div className="space-y-12 md:space-y-14">
            {categories.map(({ category, products }, rowIndex) => (
              <motion.section
                key={category}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : rowIndex * 0.04, ease: "easeOut" }}
                aria-labelledby={`category-${category}`}
                className="border-t border-[#E5E1DA] pt-6"
              >
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <h3 id={`category-${category}`} className="font-display text-xl font-medium tracking-[-0.03em] text-[#151515] sm:text-2xl">
                    {CATEGORY_MAP[category] || category}
                  </h3>
                  <Link
                    href={`/catalog?category=${encodeURIComponent(category)}`}
                    className="inline-flex min-h-9 items-center gap-2 text-xs font-medium text-[#6B6B6B] transition-colors hover:text-[#151515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#625e54]"
                  >
                    View all <span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 md:grid-cols-3 md:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
                  {products.slice(0, 4).map((product, index) => (
                    <RecommendationProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
