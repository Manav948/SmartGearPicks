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
        <h3 className={headingClass}>Company &amp; Explore</h3>
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
            <Link href="/about" className={linkClass}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className={linkClass}>
              Contact Us
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
        <h3 className={headingClass}>Legal &amp; Trust</h3>
        <ul className="space-y-1.5">
          <li>
            <Link href="/privacy" className={linkClass}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms" className={linkClass}>
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href="/disclaimer" className={linkClass}>
              Disclaimer &amp; Affiliates
            </Link>
          </li>
          <li className="pt-2 border-t border-[#DDDCD3]/60">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B66F52] block mb-1">
              Top Categories
            </span>
          </li>
          {topCategories.slice(0, 3).map(([category, label]) => (
            <li key={category}>
              <Link
                href={`/catalog?category=${encodeURIComponent(category)}`}
                className={linkClass}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
