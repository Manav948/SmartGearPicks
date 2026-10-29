"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Product, CATEGORY_MAP } from "@/components/ProductCard";

export default function RecommendationProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const reduceMotion = useReducedMotion();
  const categoryLabel = CATEGORY_MAP[product.category] || product.category;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.05, ease: "easeOut" }}
      className="group flex h-full min-w-0 flex-col rounded-2xl border border-[#c7c4d7]/50 bg-white p-2.5 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-3"
    >
      <Link
        href={`/product/${product.id}`}
        aria-label={`View ${product.name}`}
        className="relative mb-3 block aspect-[4/5] overflow-hidden rounded-xl border border-indigo-100/70 bg-[#eef0ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4648d4]"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 23vw"
          className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none sm:p-4"
          unoptimized
        />
      </Link>
      <div className="flex flex-1 flex-col px-1 pb-1">
        <p className="mb-2 w-fit rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#4648d4] sm:text-[10px]">
          {categoryLabel}
        </p>
        <Link href={`/product/${product.id}`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4648d4]">
          <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-semibold leading-[1.4] tracking-[-0.015em] text-[#0b1c30] transition-colors group-hover:text-[#4648d4] sm:text-[15px]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-3 flex flex-1 flex-col justify-end gap-3 border-t border-[#e8e8f0] pt-3">
          <p className="text-sm font-bold text-[#0b1c30]">
            {product.price != null ? `₹${product.price.toLocaleString("en-IN")}` : <span className="font-normal text-[#767586]">Price unavailable</span>}
          </p>
          <Link
            href={`/api/redirect/${product.id}`}
            className="inline-flex min-h-10 items-center justify-between rounded-lg bg-[#4648d4] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#3638bd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4648d4]"
          >
            View deal <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
