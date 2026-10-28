"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Product } from "@/components/ProductCard";
import RecommendationProductCard from "@/components/RecommendationProductCard";

interface TopPicksProps {
  products: Product[];
}

export default function TopPicks({ products }: TopPicksProps) {
  const reduceMotion = useReducedMotion();
  if (products.length === 0) return null;

  return (
    <section className="border-b border-[#ded8cc] bg-[#f5f2eb]" id="trending">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b5845]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#7c6853]" />
            The Edit
          </p>
          <h2 className="font-display text-3xl font-medium tracking-[-0.04em] text-[#171714] sm:text-4xl">
            Top Recommendations
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#6c6a64]">
            Standout finds selected for quality, usefulness, and everyday appeal.
          </p>
        </div>
        <Link
          href="/catalog"
          className="inline-flex min-h-10 w-fit items-center gap-2 border-b border-[#a99a86] pb-1 text-sm font-medium text-[#332b23] transition-colors hover:border-[#171714] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#625e54]"
        >
          View all <span aria-hidden="true">↗</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 md:grid-cols-3 md:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {products.map((product, index) => (
          <RecommendationProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
      </div>
    </section>
  );
}
