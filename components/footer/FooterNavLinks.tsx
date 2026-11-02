import React from "react";
import Link from "next/link";
import { CATEGORY_MAP } from "@/components/ProductCard";

const linkClass =
  "group inline-flex min-h-6 items-center gap-1 text-[13px] text-[#6B6B66] transition-colors hover:text-[#22231F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354538]";
const headingClass = "mb-2.5 font-display text-[13px] font-semibold tracking-[-0.01em] text-[#22231F]";

export function FooterNavLinks() {
  const topCategories = Object.entries(CATEGORY_MAP).slice(0, 5);

  return (
    <>
      <div>
        <h3 className={headingClass}>Explore</h3>
        <ul className="space-y-1.5">
          <li>
            <Link href="/" className={linkClass}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/catalog" className={linkClass}>
              All Products
            </Link>
          </li>
          <li>
            <Link href="/#trending" className={linkClass}>
              Top Recommendations
            </Link>
          </li>
          <li>
            <Link href="/#how-we-curate" className={linkClass}>
              How We Curate
            </Link>
          </li>
          <li>
            <Link href="/#faq" className={linkClass}>
              FAQ
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className={headingClass}>Departments</h3>
        <ul className="space-y-1.5">
          {topCategories.map(([category, label]) => (
            <li key={category}>
              <Link
                href={`/catalog?category=${encodeURIComponent(category)}`}
                className={linkClass}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/catalog" className={linkClass}>
              More Categories →
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
