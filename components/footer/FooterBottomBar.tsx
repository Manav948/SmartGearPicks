import React from "react";
import Link from "next/link";

export function FooterBottomBar() {
  return (
    <div className="flex flex-col gap-3 text-[11px] font-medium text-[#6B6B66] sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} SmartGearPicks. All rights reserved.</p>
      <nav aria-label="Legal and compliance links" className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link
          href="/about"
          className="transition-colors hover:text-[#22231F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354538]"
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className="transition-colors hover:text-[#22231F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354538]"
        >
          Contact Us
        </Link>
        <Link
          href="/privacy"
          className="transition-colors hover:text-[#22231F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354538]"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className="transition-colors hover:text-[#22231F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354538]"
        >
          Terms of Service
        </Link>
        <Link
          href="/disclaimer"
          className="transition-colors hover:text-[#22231F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354538]"
        >
          Disclaimer
        </Link>
      </nav>
    </div>
  );
}
