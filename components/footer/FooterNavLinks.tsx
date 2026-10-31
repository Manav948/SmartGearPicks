import React from "react";
import Link from "next/link";

const linkClass = "group inline-flex min-h-7 items-center gap-1 text-[13px] font-medium text-[#302a23] transition-colors hover:text-[#151515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c6853]";
const headingClass = "mb-2 text-[13px] font-bold text-[#151515]";

export function FooterNavLinks() {
  return (
    <>
      <div>
        <h3 className={headingClass}>Quick Links</h3>
        <ul className="space-y-1">
          <li><Link href="/" className={linkClass}>Home</Link></li>
          <li><Link href="/catalog" className={linkClass}>All Products</Link></li>
          <li><Link href="/#trending" className={linkClass}>Top Recommendations</Link></li>
          <li><Link href="/catalog" className={linkClass}>Categories</Link></li>
        </ul>
      </div>
      <div>
        <h3 className={headingClass}>Helpful Info</h3>
        <ul className="space-y-1">
          <li><Link href="/privacy#affiliate-disclosure" className={linkClass}>Affiliate Disclosure</Link></li>
          <li><Link href="/privacy" className={linkClass}>Privacy Policy</Link></li>
          <li><Link href="/terms" className={linkClass}>Terms of Service</Link></li>
        </ul>
      </div>
    </>
  );
}
