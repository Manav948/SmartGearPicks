import React from "react";
import Link from "next/link";

interface ProductBreadcrumbProps {
  categoryLabel: string;
  productName: string;
}

export default function ProductBreadcrumb({
  categoryLabel,
  productName,
}: ProductBreadcrumbProps) {
  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-6 pb-2">
      <div className="flex items-center gap-2 text-xs" style={{ color: "#6B6B6B", fontFamily: "Geist, sans-serif" }}>
        <Link href="/" className="hover:text-[#7c6853] transition-colors">Home</Link>
        <span>/</span>
        <span>{categoryLabel}</span>
        <span>/</span>
        <span className="truncate max-w-[200px]" style={{ color: "#151515" }}>{productName}</span>
      </div>
    </div>
  );
}
