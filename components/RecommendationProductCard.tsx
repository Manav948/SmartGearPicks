"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Product, CATEGORY_MAP } from "@/components/ProductCard";

export default function RecommendationProductCard({ product, index = 0, adminMode = false }: { product: Product; index?: number; adminMode?: boolean }) {
  const reduceMotion = useReducedMotion();
  const categoryLabel = CATEGORY_MAP[product.category] || product.category;
  const productHref = adminMode ? "/dashboard/edit-product/" + product.id : "/product/" + product.id;
  const actionHref = adminMode ? productHref : "/api/redirect/" + product.id;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.05, ease: "easeOut" }}
      className="group flex min-w-0 flex-col"
    >
      <Link
        href={productHref}
        aria-label={adminMode ? "Edit " + product.name : "View " + product.name}
        className="relative mb-4 block aspect-[4/5] overflow-hidden border border-[#e8e5de] bg-[#FAF8F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#625e54]"
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
        <Link href={productHref} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#625e54]">
          <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-medium leading-[1.4] tracking-[-0.015em] text-[#22211d] transition-colors group-hover:text-[#625e54] sm:text-[15px]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-3 flex flex-1 flex-col justify-end gap-4 border-t border-[#eeece7] pt-3">
          <p className="text-sm font-semibold text-[#25241f]">
            {product.price != null ? "₹" + product.price.toLocaleString("en-IN") : <span className="font-normal text-[#77746d]">Price unavailable</span>}
          </p>
          <Link
            href={actionHref}
            className="inline-flex min-h-10 items-center justify-between border border-[#d9d6ce] px-3 text-xs font-medium text-[#282721] transition-colors hover:border-[#25241f] hover:bg-[#25241f] hover:text-[#F7F6F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#625e54]"
          >
            {adminMode ? "Edit product" : "View deal"} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
