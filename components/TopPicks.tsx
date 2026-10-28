"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Product, CATEGORY_MAP } from "@/components/ProductCard";

interface TopPicksProps {
  products: Product[];
}

export default function TopPicks({ products }: TopPicksProps) {
  const reduceMotion = useReducedMotion();
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl border-b border-[#dedbd2] px-4 py-14 sm:px-6 md:py-20 lg:px-8" id="trending">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#827f77]">The Edit</p>
          <h2 className="font-display text-3xl font-medium tracking-[-0.04em] text-[#171714] sm:text-4xl">
            Top Recommendations
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#6c6a64]">
            Standout finds selected for quality, usefulness, and everyday appeal.
          </p>
        </div>
        <Link
          href="#products"
          className="inline-flex min-h-10 w-fit items-center gap-2 border-b border-[#aaa69c] pb-1 text-sm font-medium text-[#25241f] transition-colors hover:border-[#171714] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#625e54]"
        >
          View all <span aria-hidden="true">↗</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 md:grid-cols-3 md:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {products.map((product, index) => {
          const categoryLabel = CATEGORY_MAP[product.category] || product.category;
          return (
            <motion.article
              key={product.id}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.07, ease: "easeOut" }}
              className="group flex min-w-0 flex-col"
            >
              <Link
                href={`/product/${product.id}`}
                aria-label={`View ${product.name}`}
                className="relative mb-4 block aspect-[4/5] overflow-hidden border border-[#e8e5de] bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#625e54]"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 23vw"
                  className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
                  unoptimized
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#817e75]">{categoryLabel}</p>
                <Link href={`/product/${product.id}`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#625e54]">
                  <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-medium leading-[1.4] tracking-[-0.015em] text-[#22211d] transition-colors group-hover:text-[#625e54] sm:text-[15px]">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-3 flex flex-1 flex-col justify-end gap-4 border-t border-[#eeece7] pt-3">
                  <p className="text-sm font-semibold text-[#25241f]">
                    {product.price != null ? `₹${product.price.toLocaleString("en-IN")}` : <span className="font-normal text-[#77746d]">Price unavailable</span>}
                  </p>
                  <Link
                    href={`/api/redirect/${product.id}`}
                    className="inline-flex min-h-10 items-center justify-between border border-[#d9d6ce] px-3 text-xs font-medium text-[#282721] transition-colors hover:border-[#25241f] hover:bg-[#25241f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#625e54]"
                  >
                    View deal <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
